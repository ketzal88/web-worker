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
const clip = (v, n = 200) => String(v || '').trim().slice(0, n);

async function lead(req, env) {
  if (req.method !== 'POST') return json({ ok: false }, 405);
  const origin = req.headers.get('Origin') || '';
  if (!/^https:\/\/((www\.)?(worker\.ar|workermkt\.com)|[a-z0-9-]+\.gabriel-256\.workers\.dev)$/.test(origin)) return json({ ok: false }, 403);
  let b; try { b = await req.json(); } catch { return json({ ok: false, error: 'json' }, 400); }
  const via = b.via === 'mail' ? 'mail' : 'wa';
  const lang = b.lang === 'en' ? 'en' : 'es';
  const web = clip(b.web), inv = clip(b.inv, 60), email = clip(b.email, 120).toLowerCase();
  const digits = String(b.tel || '').replace(/\D/g, '');
  let phone = '';
  if (digits) phone = lang === 'es' ? (digits.startsWith('54') ? '+' + digits : '+549' + digits.replace(/^0/, '')) : '+' + digits;
  if (!web || !inv) return json({ ok: false, error: 'faltan datos' }, 400);
  if (via === 'mail' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return json({ ok: false, error: 'mail' }, 400);
  if (via === 'wa' && digits.length < 8) return json({ ok: false, error: 'tel' }, 400);
  if (!env.GHL_TOKEN) return json({ ok: false, error: 'config' }, 500);
  const H = { Authorization: 'Bearer ' + env.GHL_TOKEN, Version: '2021-07-28', 'Content-Type': 'application/json', Accept: 'application/json' };
  const customFields = [{ id: CF.sitio_web, field_value: web }, { id: CF.presupuesto, field_value: inv }];
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) if (b[k]) customFields.push({ id: CF[k], field_value: clip(b[k], 150) });
  const contact = { locationId: LOCATION, website: web, source: 'worker.ar (' + lang + ')', customFields };
  if (email) contact.email = email;
  if (phone) contact.phone = phone;
  if (lang === 'es') contact.country = 'AR';
  // Si el contacto ya existe no se pisan sus campos: solo se suman tags y nota (el form es publico).
  const dq = new URLSearchParams({ locationId: LOCATION }); if (email) dq.set('email', email); else dq.set('number', phone);
  const dup = await fetch(GHL + '/contacts/search/duplicate?' + dq, { headers: H }).then(r => r.json()).catch(() => ({}));
  let id = dup.contact && dup.contact.id;
  if (!id) {
    const up = await fetch(GHL + '/contacts/', { method: 'POST', headers: H, body: JSON.stringify(contact) });
    const upJ = await up.json().catch(() => ({}));
    id = (upJ.contact && upJ.contact.id) || (upJ.meta && upJ.meta.contactId);
    if (!id) { console.log('ghl create', up.status, JSON.stringify(upJ).slice(0, 300)); return json({ ok: false, error: 'crm' }, 502); }
  }
  const tags = ['web-diagnostico', via === 'mail' ? 'web-mail' : 'web-whatsapp'];
  const note = ['Formulario de diagnóstico en worker.ar (' + lang + ')', 'Canal elegido: ' + (via === 'mail' ? 'mail' : 'WhatsApp'), 'Web: ' + web, 'Inversión mensual: ' + inv,
    b.page ? 'Página: ' + clip(b.page) : '', b.ref ? 'Referrer: ' + clip(b.ref) : ''].filter(Boolean).join('\n');
  const [t, n] = await Promise.all([
    fetch(GHL + '/contacts/' + id + '/tags', { method: 'POST', headers: H, body: JSON.stringify({ tags }) }),
    fetch(GHL + '/contacts/' + id + '/notes', { method: 'POST', headers: H, body: JSON.stringify({ body: note }) }),
  ]);
  if (!t.ok || !n.ok) console.log('ghl tags/notes', t.status, n.status);
  return json({ ok: true });
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
      const lang = cookieLang(req) || (BOT.test(ua) ? 'es' : browserLang(req));
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
