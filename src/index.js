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

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
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
      const enOnly = url.hostname.endsWith('workermkt.com');
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
