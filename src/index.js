import { INV_OPTIONS, clip, EMAIL_RE, normalizePhone, phoneOk } from './lead-utils.js';

// Idioma de la home: cookie elegida > workermkt.com (EN) > bots (sin redirect) > Accept-Language.
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|preview|lighthouse|headless/i;
const COOKIE = 'lang';

function cookieLang(req) {
  const m = (req.headers.get('Cookie') || '').match(/(?:^|;\s*)lang=(es|en)/);
  return m ? m[1] : null;
}

function browserLang(req) {
  const al = req.headers.get('Accept-Language');
  if (!al) return 'es';
  const first = al.split(',')
    .map(p => { const [tag, q] = p.trim().split(';q='); return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 }; })
    .sort((a, b) => b.q - a.q)[0];
  return first && first.tag.startsWith('es') ? 'es' : 'en';
}

function redirect(url, extraHeaders = {}) {
  return new Response(null, { status: 302, headers: { Location: url, 'Cache-Control': 'private, no-store', Vary: 'Accept-Language, Cookie', ...extraHeaders } });
}

// Lead del formulario de diagnostico -> contacto en GHL (location Worker) con tags y nota.
const GHL = 'https://services.leadconnectorhq.com';
const LOCATION = 'Zwjvo9JT2X190h2yTfhT';
const CF = { sitio_web: 'zhTIyrTDVsTEVPRj94Ss', presupuesto: 'BETc0hQc1kiPnHG6cNbk', utm_source: 'G2H9JxuYeYne28W6FX4A', utm_medium: 'mX1tYnfi83ytqc90nw8H', utm_campaign: 'FJKFw6W62jV1v666qrRP', utm_content: 'fC9ZGYUkix5Wdpc0ogfp', utm_term: 'ztp6foWzGC9YJEncWZj8' };
const json = (o, status = 200) => new Response(JSON.stringify(o), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });
const MAX_BODY = 4096;
const GHL_TIMEOUT_MS = 8000;

// Llamada a GHL con timeout. Si GHL se cuelga, la request falla en vez de quedar abierta.
const ghl = (env, path, init = {}) => fetch(GHL + path, {
  ...init,
  headers: { Authorization: 'Bearer ' + env.GHL_TOKEN, Version: '2021-07-28', 'Content-Type': 'application/json', Accept: 'application/json' },
  signal: AbortSignal.timeout(GHL_TIMEOUT_MS),
});

// POST con un reintento. Devuelve true si GHL respondio 2xx. Solo se loguea el status (nunca el cuerpo: puede traer datos del lead).
async function ghlPost(env, path, body, label) {
  let status = 'error';
  for (let i = 0; i < 2; i++) {
    try {
      const r = await ghl(env, path, { method: 'POST', body: JSON.stringify(body) });
      if (r.ok) return true;
      status = r.status;
    } catch { status = 'error'; }
  }
  console.error('ghl ' + label + ' fallo', status);
  return false;
}

async function lead(req, env) {
  if (req.method !== 'POST') return json({ ok: false }, 405);
  const origin = req.headers.get('Origin') || '';
  if (!/^https:\/\/((www\.)?(worker\.ar|workermkt\.com)|[a-z0-9-]+\.gabriel-256\.workers\.dev)$/.test(origin)) return json({ ok: false }, 403);
  if (parseInt(req.headers.get('Content-Length') || '0', 10) > MAX_BODY) return json({ ok: false, error: 'size' }, 413);
  let b;
  try {
    const raw = await req.text();
    if (raw.length > MAX_BODY) return json({ ok: false, error: 'size' }, 413);
    b = JSON.parse(raw);
  } catch { return json({ ok: false, error: 'json' }, 400); }
  if (!b || typeof b !== 'object' || Array.isArray(b)) return json({ ok: false, error: 'json' }, 400);
  // Honeypot: el campo esta oculto en el form; si viene con algo es un bot. Se responde ok sin tocar GHL.
  if (b.hp) return json({ ok: true });
  const via = b.via === 'mail' ? 'mail' : 'wa';
  const lang = b.lang === 'en' ? 'en' : 'es';
  const web = clip(b.web), inv = clip(b.inv, 60), email = clip(b.email, 120).toLowerCase();
  const phone = normalizePhone(b.tel, lang);
  if (!web || !inv) return json({ ok: false, error: 'faltan datos' }, 400);
  if (!INV_OPTIONS.has(inv)) return json({ ok: false, error: 'inv' }, 400);
  if (via === 'mail' && !EMAIL_RE.test(email)) return json({ ok: false, error: 'mail' }, 400);
  if (via === 'wa' && !phoneOk(phone)) return json({ ok: false, error: 'tel' }, 400);
  if (!env.GHL_TOKEN) return json({ ok: false, error: 'config' }, 500);
  const customFields = [{ id: CF.sitio_web, field_value: web }, { id: CF.presupuesto, field_value: inv }];
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) if (b[k]) customFields.push({ id: CF[k], field_value: clip(b[k], 150) });
  const contact = { locationId: LOCATION, website: web, source: 'worker.ar (' + lang + ')', customFields };
  if (email) contact.email = email;
  if (phoneOk(phone)) contact.phone = phone;
  if (lang === 'es') contact.country = 'AR';
  // El form es publico: si el contacto ya existe no se pisan sus campos ni se le ponen tags (podrian disparar
  // automatizaciones). Solo se suma una nota fija marcada como "sin verificar".
  const dq = new URLSearchParams({ locationId: LOCATION }); if (email) dq.set('email', email); else dq.set('number', phone);
  let id, existing = false;
  try {
    const r = await ghl(env, '/contacts/search/duplicate?' + dq);
    if (r.ok) { const dup = await r.json().catch(() => ({})); id = dup.contact && dup.contact.id; }
    else if (r.status !== 404) { console.error('ghl duplicate fallo', r.status); return json({ ok: false, error: 'crm' }, 502); }
  } catch { console.error('ghl duplicate fallo', 'error'); return json({ ok: false, error: 'crm' }, 502); }
  if (id) existing = true;
  if (!id) {
    let up, upJ = {};
    try { up = await ghl(env, '/contacts/', { method: 'POST', body: JSON.stringify(contact) }); upJ = await up.json().catch(() => ({})); }
    catch { console.error('ghl create fallo', 'error'); return json({ ok: false, error: 'crm' }, 502); }
    id = upJ.contact && upJ.contact.id;
    if (!id && upJ.meta && upJ.meta.contactId) { id = upJ.meta.contactId; existing = true; }
    if (!id) { console.error('ghl create fallo', up.status); return json({ ok: false, error: 'crm' }, 502); }
  }
  const channel = via === 'mail' ? 'mail' : 'WhatsApp';
  let tagsOk = true, noteOk;
  if (existing) {
    const note = ['Nuevo envío del formulario de worker.ar (' + lang + '). Datos sin verificar, el contacto ya existía.', 'Canal elegido: ' + channel, 'Inversión mensual: ' + inv].join('\n');
    noteOk = await ghlPost(env, '/contacts/' + id + '/notes', { body: note }, 'nota');
  } else {
    const note = ['Formulario de diagnóstico en worker.ar (' + lang + ')', 'Canal elegido: ' + channel, 'Web: ' + web, 'Inversión mensual: ' + inv,
      b.page ? 'Página: ' + clip(b.page) : '', b.ref ? 'Referrer: ' + clip(b.ref) : ''].filter(Boolean).join('\n');
    const tags = ['web-diagnostico', via === 'mail' ? 'web-mail' : 'web-whatsapp'];
    [tagsOk, noteOk] = await Promise.all([ghlPost(env, '/contacts/' + id + '/tags', { tags }, 'tags'), ghlPost(env, '/contacts/' + id + '/notes', { body: note }, 'nota')]);
  }
  // El contacto quedo creado: si fallaron tags o nota (tras reintentar) se avisa con partial y queda el console.error.
  return json(tagsOk && noteOk ? { ok: true } : { ok: true, partial: true });
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/api/lead') return lead(req, env);
    const isHome = url.pathname === '/' || url.pathname === '/index.html';
    const isEn = url.pathname === '/en' || url.pathname === '/en.html' || url.pathname === '/en/';

    // Cambio manual de idioma: guarda la eleccion y limpia la URL.
    const pick = url.searchParams.get('lang');
    if ((isHome || isEn) && (pick === 'es' || pick === 'en')) {
      url.searchParams.delete('lang');
      url.pathname = pick === 'en' ? '/en' : '/';
      return redirect(url.toString(), { 'Set-Cookie': `${COOKIE}=${pick}; Path=/; Max-Age=31536000; SameSite=Lax; Secure` });
    }

    if (isHome) {
      const enOnly = url.hostname.endsWith('workermkt.com') && cookieLang(req) !== 'es';
      if (enOnly) {
        const r = await env.ASSETS.fetch(new Request(new URL('/en', url), req));
        return r;
      }
      const ua = req.headers.get('User-Agent') || '';
      // Fetchers que no son navegando (Sec-Fetch-Dest distinto de document) y bots reciben la version en espanol.
      const dest = req.headers.get('Sec-Fetch-Dest');
      const lang = cookieLang(req) || (BOT.test(ua) || (dest && dest !== 'document') ? 'es' : browserLang(req));
      if (lang === 'en') { url.pathname = '/en'; return redirect(url.toString()); }
    }

    const res = await env.ASSETS.fetch(req);
    if (isHome) {
      const h = new Headers(res.headers); h.set('Vary', 'Accept-Language, Cookie');
      return new Response(res.body, { status: res.status, headers: h });
    }
    return res;
  },
};
