// Generador del blog de Worker. Node puro, sin dependencias.
//   npm run build
// Lee content/blog/{es,en}/*.md y escribe en public/:
//   blog/...            (ES, worker.ar)        en/blog/...  (EN, workermkt.com; el worker lo sirve como /blog/*)
//   sitemap-{es,en}.xml, llms-{es,en}.txt, llms-full-{es,en}.txt, og-default.png
// Los articulos con `draft: true` no se publican.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { INV_OPTIONS } from '../src/lead-utils.js';
import {
  ROOT, PUBLIC, HOSTS, LANGS, PILLARS, PILLAR_KEYS, TOOLS, escapeHtml, loadAll, isDraft, frontmatterErrors, toArticle,
} from './lib.mjs';

const GTM = "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MKVW3542');</script>";
const FONTS = 'https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap';
const SOCIAL = [
  ['Instagram', 'https://www.instagram.com/worker.mkt/'],
  ['LinkedIn', 'https://www.linkedin.com/company/wkr'],
  ['TikTok', 'https://www.tiktok.com/@worker.mkt'],
];
const WA = 'https://wa.me/5491177163453';

const INV = {
  es: ['menos de USD 2.000', 'USD 2.000 a 5.000', 'USD 5.000 a 20.000', 'más de USD 20.000'],
  en: ['under USD 2,000', 'USD 2,000 to 5,000', 'USD 5,000 to 20,000', 'over USD 20,000'],
};
for (const l of LANGS) for (const o of INV[l]) if (!INV_OPTIONS.has(o)) throw new Error('Opcion de inversion fuera de INV_OPTIONS: ' + o);

const S = {
  es: {
    locale: 'es_AR', htmlLang: 'es', inLang: 'es-AR', home: 'Worker', blog: 'Blog', skip: 'Saltar al contenido', logoAlt: 'Worker',
    navs: [['Servicios', '/#servicios'], ['Casos', '/#casos'], ['Agencia y Brain', '/#formas'], ['Blog', '/blog/'], ['Preguntas', '/#faq']],
    navCta: 'Pedir diagnóstico →', toc: 'En este artículo', tldr: 'En corto', faq: 'Preguntas frecuentes',
    pub: 'Publicado el', upd: 'Actualizado el', min: 'min de lectura', related: 'Seguí leyendo',
    toolsH: 'Herramientas de Worker Brain', toolsP: 'Usalas para hacer los números de tu cuenta.',
    cardH: '¿Te pasa esto en tu cuenta?', cardP: 'Pedí el diagnóstico y te decimos qué tocaríamos primero.', cardBtn: 'Pedir diagnóstico',
    role: 'director de Worker', stk: 'Pedir diagnóstico gratis',
    ctaK: 'Diagnóstico gratis', ctaH: 'Mandanos tu cuenta y te decimos qué tocaríamos primero.',
    ctaP: 'Conectamos tus datos a Brain y te devolvemos qué está fallando y por dónde crecer. Te quedás con el diagnóstico, trabajes con nosotros o no.',
    fWeb: 'Tu sitio web', fWebPh: 'tumarca.com', fInv: 'Inversión mensual en anuncios', fInvPh: 'Elegí una opción', fVia: 'Cómo te escribimos',
    fWa: 'WhatsApp', fMail: 'Mail', fTel: 'Tu WhatsApp', fTelPre: '+54 9', fTelPh: '11 2345 6789', fMailL: 'Tu mail', fMailPh: 'tu@tumarca.com',
    fBtn: 'Pedir diagnóstico gratis', fPriv: 'Usamos tus datos solo para el diagnóstico. Respondemos en 24 h hábiles.', defVia: 'wa',
    nWeb: 'tu web', nInv: 'cuánto invertís', nTel: 'tu WhatsApp', nMail: 'tu mail', miss1: 'Brain · Me falta ', miss2: ' para armarte el diagnóstico.', and: ' y ',
    okWa: 'Listo. Seguimos la charla por WhatsApp.', okMail: 'Recibido. Te escribimos por mail en menos de 24 h hábiles.',
    fail: 'Brain · No pude enviarlo. Escribinos a escalar@worker.ar.',
    waText: 'Hola Worker, quiero el diagnóstico. Nuestra web es {web} y invertimos {inv} por mes en anuncios.',
    idxTitle: 'Blog de Worker', idxMeta: 'Notas sobre Meta Ads, métricas, IA y automatización para tiendas online y empresas B2B.',
    idxH: 'Blog de Worker', idxLead: 'Notas sobre Meta Ads, métricas, IA y automatización para tiendas online y empresas B2B.',
    emptyH: 'Pronto los primeros artículos', emptyP: 'Estamos preparando las primeras notas. Mientras tanto, podés pedir tu diagnóstico gratis.',
    all: 'Todos', band: '¿Querés que miremos tu cuenta?', bandBtn: 'Pedir diagnóstico gratis', read: 'Leer',
    months: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
    fmtDate: (d, m, y, mo) => `${d} de ${mo[m]} de ${y}`, otherLang: 'English', pillarTitle: (n) => `${n} | Blog de Worker`,
  },
  en: {
    locale: 'en_US', htmlLang: 'en', inLang: 'en', home: 'Worker', blog: 'Blog', skip: 'Skip to content', logoAlt: 'Worker',
    navs: [['Services', '/#servicios'], ['Case studies', '/#casos'], ['Agency and Brain', '/#formas'], ['Blog', '/blog/'], ['FAQ', '/#faq']],
    navCta: 'Get an audit →', toc: 'In this article', tldr: 'In short', faq: 'Frequently asked questions',
    pub: 'Published', upd: 'Updated', min: 'min read', related: 'Keep reading',
    cardH: 'Does this sound like your account?', cardP: "Ask for the audit and we'll tell you what we'd fix first.", cardBtn: 'Get an audit',
    role: 'director at Worker', stk: 'Get a free audit',
    ctaK: 'Free audit', ctaH: "Send us your account and we'll tell you what we'd fix first.",
    ctaP: "We connect your data to Brain and tell you what's failing and where to grow. You keep the audit, whether you work with us or not.",
    fWeb: 'Your website', fWebPh: 'yourbrand.com', fInv: 'Monthly ad spend', fInvPh: 'Pick one', fVia: 'How we reach you',
    fWa: 'WhatsApp', fMail: 'Email', fTel: 'Your WhatsApp with country code', fTelPre: '+', fTelPh: '1 555 123 4567', fMailL: 'Your email', fMailPh: 'you@yourbrand.com',
    fBtn: 'Get a free audit', fPriv: 'We only use your details for the audit. We reply within 24 business hours.', defVia: 'mail',
    nWeb: 'your website', nInv: 'how much you spend', nTel: 'your WhatsApp', nMail: 'your email', miss1: 'Brain · I still need ', miss2: ' to put your audit together.', and: ' and ',
    okWa: "Done. Let's keep talking on WhatsApp.", okMail: "Got it. We'll email you within 24 business hours.",
    fail: 'Brain · I could not send it. Email us at escalar@worker.ar.',
    waText: 'Hi Worker, I want the audit. Our website is {web} and we spend {inv} a month on ads.',
    idxTitle: 'Worker Blog', idxMeta: 'Notes on Meta Ads, metrics, AI and automation for online stores and B2B companies.',
    idxH: 'Worker Blog', idxLead: 'Notes on Meta Ads, metrics, AI and automation for online stores and B2B companies.',
    emptyH: 'The first articles are coming soon', emptyP: "We're getting the first posts ready. In the meantime, you can ask for your free audit.",
    all: 'All', band: 'Want us to look at your account?', bandBtn: 'Get a free audit', read: 'Read',
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fmtDate: (d, m, y, mo) => `${mo[m]} ${d}, ${y}`, otherLang: 'Español', pillarTitle: (n) => `${n} | Worker Blog`,
  },
};

// ---------- helpers ----------

const fmtDate = (iso, lang) => {
  const [y, m, d] = iso.split('-').map(Number);
  return S[lang].fmtDate(d, m - 1, y, S[lang].months);
};
const jsonScript = (o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const stripInline = (s) => String(s).replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*`]/g, '').replace(/(^|\s)_([^_]+)_(?=\s|[.,;:!?)]|$)/g, '$1$2');
const xml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const css = fs.readFileSync(path.join(ROOT, 'scripts', 'blog.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ').replace(/\s*([{};:,>])\s*/g, '$1').trim();

const urlPath = (a) => `/blog/${a.pillar}/${a.slug}/`;
const abs = (lang, p) => HOSTS[lang] + p;
const outDir = (lang) => (lang === 'es' ? path.join(PUBLIC, 'blog') : path.join(PUBLIC, 'en', 'blog'));

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

// ---------- carga y validacion ----------

const items = loadAll();
const byLang = { es: [], en: [] };
const problems = [];
let drafts = 0;
for (const it of items) {
  if (isDraft(it)) { drafts++; continue; }
  const errs = frontmatterErrors(it);
  if (errs.length) { problems.push(`${it.rel}: ${errs.join('; ')}`); continue; }
  byLang[it.lang].push(toArticle(it));
}
for (const lang of LANGS) {
  const seen = new Set();
  for (const a of byLang[lang]) {
    if (seen.has(a.slug)) problems.push(`slug duplicado en ${lang}: ${a.slug}`);
    seen.add(a.slug);
  }
}
if (problems.length) {
  console.error('El build se frena: hay articulos con errores.\n - ' + problems.join('\n - '));
  process.exit(1);
}
for (const lang of LANGS) byLang[lang].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));

// Pares de traduccion: vale que cualquiera de los dos lados lo declare.
function partnerOf(a) {
  const other = a.lang === 'es' ? 'en' : 'es';
  return byLang[other].find((b) => (a.translation && a.translation === b.slug) || (b.translation && b.translation === a.slug)) || null;
}

// ---------- OG por defecto (PNG 1200x630 generado, sin dependencias) ----------

function crc32(buf) {
  let crc = 0xffffffff;
  for (const byte of buf) {
    let c = (crc ^ byte) & 0xff;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    crc = (crc >>> 8) ^ c;
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}
function ogPng() {
  const W = 1200, H = 630;
  const paper = [0xee, 0xed, 0xe9], ink = [0x14, 0x14, 0x12], yellow = [0xf5, 0xc4, 0x00];
  const px = Buffer.alloc(W * H * 3);
  const rect = (x, y, w, h, c) => {
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) { const o = (j * W + i) * 3; px[o] = c[0]; px[o + 1] = c[1]; px[o + 2] = c[2]; }
  };
  rect(0, 0, W, H, paper);
  rect(0, H - 36, W, 36, yellow);
  const G = {
    W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
    O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
    R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
    K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
    E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  };
  const word = 'WORKER', s = 22, gap = s;
  const total = word.length * 5 * s + (word.length - 1) * gap + gap + s;
  let x = Math.round((W - total) / 2);
  const y = Math.round((H - 36 - 7 * s) / 2);
  for (const ch of word) {
    G[ch].forEach((row, r) => [...row].forEach((v, c) => { if (v === '1') rect(x + c * s, y + r * s, s, s, ink); }));
    x += 5 * s + gap;
  }
  rect(x, y + 6 * s, s, s, yellow);
  const raw = Buffer.alloc(H * (1 + W * 3));
  for (let j = 0; j < H; j++) { raw[j * (1 + W * 3)] = 0; px.copy(raw, j * (1 + W * 3) + 1, j * W * 3, (j + 1) * W * 3); }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 2;
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

// ---------- layout comun ----------

function ogImage(lang, a) {
  if (a && a.image) return a.image.startsWith('http') ? a.image : abs(lang, a.image.startsWith('/') ? a.image : '/' + a.image);
  return abs(lang, '/og-default.png');
}

function layout({ lang, title, description, canonical, alternates = [], robots, ogType = 'website', image, article, jsonld = [], body, bodyClass = '', alts }) {
  const t = S[lang];
  const metaArticle = article
    ? `<meta property="article:published_time" content="${article.date}"><meta property="article:modified_time" content="${article.dateModified}"><meta property="article:section" content="${escapeHtml(PILLARS[article.pillar][lang].name)}">`
    : '';
  const hrefl = alternates.map((x) => `<link rel="alternate" hreflang="${x.hreflang}" href="${x.href}">`).join('');
  return `<!doctype html>
<html lang="${t.htmlLang}">
<head>
<meta charset="utf-8">
${GTM}
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeHtml(description)}">
<link rel="canonical" href="${canonical}">
${hrefl}
${robots ? `<meta name="robots" content="${robots}">` : ''}
<meta property="og:type" content="${ogType}"><meta property="og:site_name" content="Worker"><meta property="og:locale" content="${t.locale}">
<meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Worker">
${metaArticle}
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${image}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${FONTS}">
<style>${css}</style>
${jsonld.map(jsonScript).join('\n')}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
<a class="skip" href="#contenido">${t.skip}</a>
${header(lang, article ? '#diagnostico' : '/#diagnostico')}
${body}
${footer(lang, alts)}
</body>
</html>
`;
}

function header(lang, ctaHref) {
  const t = S[lang];
  const nav = t.navs.map(([label, href]) => `<a href="${href}"${href === '/blog/' ? ' aria-current="true"' : ''}>${label}</a>`).join('');
  return `<header class="hd"><div class="wrap"><a class="logo" href="/" aria-label="${t.logoAlt}">Worker<i>.</i></a><nav class="nav" aria-label="${lang === 'es' ? 'Principal' : 'Main'}">${nav}</nav><a class="btn" href="${ctaHref}">${t.navCta}</a></div></header>`;
}

function footer(lang, alts) {
  const t = S[lang];
  const other = lang === 'es' ? 'en' : 'es';
  const langLink = alts && alts[other] ? `<a href="${alts[other]}" hreflang="${other}" lang="${other}">${t.otherLang}</a>` : '';
  const social = SOCIAL.map(([n, u]) => `<a href="${u}" rel="noopener">${n}</a>`).join('');
  return `<footer class="ft"><div class="wrap"><span>Worker</span><nav aria-label="${lang === 'es' ? 'Pie de página' : 'Footer'}"><a href="/">${lang === 'es' ? 'Inicio' : 'Home'}</a><a href="/blog/">Blog</a>${social}<a href="mailto:escalar@worker.ar">escalar@worker.ar</a>${langLink}</nav></div></footer>`;
}

function crumbs(lang, trail) {
  // trail: [[label, href|null], ...]
  const lis = trail.map(([label, href], i) => (href && i < trail.length - 1
    ? `<li><a href="${href}">${escapeHtml(label)}</a></li>` : `<li aria-current="page">${escapeHtml(label)}</li>`)).join('');
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${lis}</ol></nav>`;
}

function breadcrumbLd(lang, trail) {
  return {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, href], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(lang, href) })),
  };
}

function formSection(lang, slug) {
  const t = S[lang];
  const wa = t.defVia === 'wa';
  const cfg = {
    lang, page: 'blog/' + slug, nWeb: t.nWeb, nInv: t.nInv, nTel: t.nTel, nMail: t.nMail, miss1: t.miss1, miss2: t.miss2, and: t.and,
    okWa: t.okWa, okMail: t.okMail, fail: t.fail, waText: t.waText,
  };
  const opts = INV[lang].map((o) => `<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`).join('');
  const js = `(function(){var C=${JSON.stringify(cfg).replace(/</g, '\\u003c')},f=document.getElementById('ctaF');if(!f)return;
var g=function(i){return document.getElementById(i)},web=g('ctaWeb'),inv=g('ctaInv'),tel=g('ctaTel'),mail=g('ctaMail'),telL=g('ctaTelL'),mailL=g('ctaMailL'),err=g('ctaErr'),ok=g('ctaOk'),btn=g('ctaB'),busy=false;
var via=function(){return f.querySelector('input[name=via]:checked').value};
var sync=function(){var v=via();telL.hidden=v!=='wa';mailL.hidden=v!=='mail';err.hidden=true};
sync();
f.addEventListener('change',function(e){if(e.target.name==='via'){sync();(via()==='wa'?tel:mail).focus()}});
[web,inv,tel,mail].forEach(function(x){x.addEventListener('input',function(){x.removeAttribute('aria-invalid');err.hidden=true})});
f.addEventListener('submit',function(e){
e.preventDefault();if(busy)return;
var v=via(),miss=[];
[web,inv,tel,mail].forEach(function(x){x.removeAttribute('aria-invalid')});
if(!web.value.trim())miss.push([web,C.nWeb]);
if(!inv.value)miss.push([inv,C.nInv]);
if(v==='mail'?!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(mail.value.trim()):tel.value.replace(/\\D/g,'').length<8)miss.push(v==='mail'?[mail,C.nMail]:[tel,C.nTel]);
if(miss.length){miss.forEach(function(m){m[0].setAttribute('aria-invalid','true')});var n=miss.map(function(m){return m[1]});err.textContent=C.miss1+(n.length>1?n.slice(0,-1).join(', ')+C.and+n[n.length-1]:n[0])+C.miss2;err.hidden=false;miss[0][0].focus();return}
err.hidden=true;
var q=new URLSearchParams(location.search),b={web:web.value.trim(),inv:inv.value,via:v,tel:v==='wa'?tel.value:'',email:v==='mail'?mail.value.trim():'',lang:C.lang,page:C.page,ref:'blog',hp:f.elements.hp.value||''};
['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach(function(k){if(q.get(k))b[k]=q.get(k)});
var post=function(o){return fetch('/api/lead',Object.assign({method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)},o||{}))};
var done=function(){try{window.dataLayer=window.dataLayer||[];dataLayer.push({event:'lead_diagnostico',canal:v});window.gtag=window.gtag||function(){dataLayer.push(arguments)};gtag('event','generate_lead',{send_to:'G-9FWZKLT40S',canal:v});if(window.fbq)fbq('track','Lead',{content_name:'diagnostico',canal:v})}catch(_){}ok.textContent=v==='wa'?C.okWa:C.okMail;ok.hidden=false;f.hidden=true;ok.focus()};
if(v==='wa'){var s=function(){return post({keepalive:true}).then(function(r){if(!r.ok)throw 0})};s().catch(function(){setTimeout(function(){s().catch(function(){})},1500)});window.open('${WA}?text='+encodeURIComponent(C.waText.replace('{web}',function(){return b.web}).replace('{inv}',function(){return b.inv})),'_blank','noopener');done();return}
busy=true;btn.disabled=true;
post().then(function(r){if(!r.ok)throw 0;done()}).catch(function(){err.textContent=C.fail;err.hidden=false}).finally(function(){busy=false;btn.disabled=false});
});})();`;
  return `<section class="cta" id="diagnostico" aria-labelledby="ctaH"><div class="wrap cta-in">
<div><span class="k">${t.ctaK}</span><h2 id="ctaH">${t.ctaH}</h2><p>${t.ctaP}</p></div>
<div>
<form id="ctaF" aria-labelledby="ctaH" novalidate>
<input type="text" name="hp" id="ctaHp" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
<label class="fld"><span>${t.fWeb}</span><input type="text" id="ctaWeb" placeholder="${t.fWebPh}" autocomplete="url"></label>
<label class="fld"><span>${t.fInv}</span><select id="ctaInv"><option value="">${t.fInvPh}</option>${opts}</select></label>
<fieldset class="fld"><legend>${t.fVia}</legend><div class="via"><label><input type="radio" name="via" value="wa"${wa ? ' checked' : ''}><span>${t.fWa}</span></label><label><input type="radio" name="via" value="mail"${wa ? '' : ' checked'}><span>${t.fMail}</span></label></div></fieldset>
<label class="fld" id="ctaTelL"${wa ? '' : ' hidden'}><span>${t.fTel}</span><span class="pre"><b aria-hidden="true">${t.fTelPre}</b><input type="tel" id="ctaTel" placeholder="${t.fTelPh}" autocomplete="${lang === 'es' ? 'tel-national' : 'tel'}" inputmode="tel"></span></label>
<label class="fld" id="ctaMailL"${wa ? ' hidden' : ''}><span>${t.fMailL}</span><input type="email" id="ctaMail" placeholder="${t.fMailPh}" autocomplete="email" inputmode="email"></label>
<button type="submit" class="btn y" id="ctaB">${t.fBtn}</button>
<p class="err" id="ctaErr" role="alert" hidden></p>
<small class="priv">${t.fPriv}</small>
</form>
<div class="ok" id="ctaOk" role="status" tabindex="-1" hidden></div>
</div></div>
<script>${js}</script>
</section>`;
}

function card(lang, a) {
  const t = S[lang];
  return `<li><a class="cd" href="${urlPath(a)}"><span class="k">${escapeHtml(PILLARS[a.pillar][lang].name)}</span><span class="t">${escapeHtml(a.title)}</span><span class="d">${escapeHtml(a.description)}</span><span class="m">${fmtDate(a.date, lang)} · ${a.minutes} ${t.min}</span></a></li>`;
}

// ---------- articulo ----------

function articlePage(a) {
  const lang = a.lang, t = S[lang], host = HOSTS[lang];
  const p = urlPath(a), canonical = abs(lang, p);
  const pName = PILLARS[a.pillar][lang].name;
  const partner = partnerOf(a);
  const alternates = [];
  const alts = {};
  if (partner) {
    const es = lang === 'es' ? a : partner, en = lang === 'en' ? a : partner;
    alternates.push({ hreflang: 'es', href: abs('es', urlPath(es)) }, { hreflang: 'en', href: abs('en', urlPath(en)) }, { hreflang: 'x-default', href: abs('es', urlPath(es)) });
    alts.es = abs('es', urlPath(es)); alts.en = abs('en', urlPath(en));
  }
  const trail = [[t.home, '/'], [t.blog, '/blog/'], [pName, `/blog/${a.pillar}/`], [a.title, p]];
  const image = ogImage(lang, a);
  const authorDefault = a.author === 'Gabri' + 'el Uccello';
  const initials = a.author.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();

  const tocItems = a.headings.filter((h) => h.level === 2);
  const toc = tocItems.length >= 2 || a.faq.length
    ? `<nav class="toc" aria-labelledby="tocH"><h2 id="tocH">${t.toc}</h2><ol>${tocItems.map((h) => `<li><a href="#${h.id}">${escapeHtml(h.text)}</a></li>`).join('')}<li><a href="#faq">${t.faq}</a></li></ol></nav>`
    : '';

  const tldr = `<section class="tldr" aria-labelledby="tldrH"><h2 id="tldrH">${t.tldr}</h2><ul>${a.tldr.map((x) => `<li>${inlineSafe(x)}</li>`).join('')}</ul></section>`;
  const lm = a.leadMagnet
    ? `<aside class="lm" aria-label="${escapeHtml(a.leadMagnet.titulo)}"><h2>${escapeHtml(a.leadMagnet.titulo)}</h2><p>${escapeHtml(a.leadMagnet.texto)}</p><a class="btn" href="${escapeHtml(a.leadMagnet.url)}">${escapeHtml(a.leadMagnet.boton || (lang === 'es' ? 'Ver más' : 'Learn more'))}</a></aside>`
    : '';
  const tools = lang === 'es' && a.tools.length
    ? `<aside class="tools" aria-labelledby="toolsH"><h2 id="toolsH">${t.toolsH}</h2><p>${t.toolsP}</p><ul>${a.tools.map((x) => `<li><a href="${x.url}">${x.name}</a></li>`).join('')}</ul></aside>`
    : '';
  const faq = `<section class="faq" id="faq" aria-labelledby="faqH"><h2 id="faqH">${t.faq}</h2>${a.faq.map((x) => `<details><summary>${inlineSafe(x.q)}</summary><p>${inlineSafe(x.a)}</p></details>`).join('')}</section>`;

  const related = byLang[lang].filter((b) => b.pillar === a.pillar && b.slug !== a.slug).slice(0, 3);
  const relHtml = related.length
    ? `<section class="rel" aria-labelledby="relH"><div class="wrap"><h2 id="relH">${t.related}</h2><ul class="grid">${related.map((b) => card(lang, b)).join('')}</ul></div></section>`
    : '';

  const body = `<div class="prog" aria-hidden="true"></div>
<main id="contenido"><article>
<div class="wrap">
${crumbs(lang, trail)}
<header class="hero"><a class="pill" href="/blog/${a.pillar}/">${escapeHtml(pName)}</a><h1>${escapeHtml(a.title)}</h1><p class="lead">${escapeHtml(a.description)}</p>
<div class="by"><span class="av" aria-hidden="true">${escapeHtml(initials)}</span><div><p><strong>${escapeHtml(a.author)}</strong>${authorDefault ? ', ' + t.role : ''}</p><p class="m">${t.pub} <time datetime="${a.date}">${fmtDate(a.date, lang)}</time> · ${t.upd} <time datetime="${a.dateModified}">${fmtDate(a.dateModified, lang)}</time> · ${a.minutes} ${t.min}</p></div></div></header>
<div class="cols">
<aside class="side">${toc}<div class="card-d"><h2>${t.cardH}</h2><p>${t.cardP}</p><a class="btn y" href="#diagnostico">${t.cardBtn}</a></div></aside>
<div class="prose">
${tldr}
${a.html}
${lm}
${tools}
${faq}
</div></div></div>
</article>
${relHtml}
${formSection(lang, a.slug)}
</main>
<div class="stk"><a class="btn y" href="#diagnostico">${t.stk}</a></div>`;

  const ld = [
    {
      '@context': 'https://schema.org', '@type': 'BlogPosting', headline: a.title, description: a.description,
      datePublished: a.date, dateModified: a.dateModified, inLanguage: t.inLang, keywords: a.keyword, articleSection: pName,
      image: [image], mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      author: { '@type': 'Person', name: a.author, url: host + '/' },
      publisher: { '@type': 'Organization', name: 'Worker', url: host + '/', logo: { '@type': 'ImageObject', url: host + '/logo.svg' } },
    },
    {
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: a.faq.map((x) => ({ '@type': 'Question', name: stripInline(x.q), acceptedAnswer: { '@type': 'Answer', text: stripInline(x.a) } })),
    },
    breadcrumbLd(lang, trail),
  ];

  return layout({ lang, title: `${a.title} | Worker`, description: a.description, canonical, alternates, ogType: 'article', image, article: a, jsonld: ld, body, bodyClass: 'has-stk', alts });
}

// inline() para tldr y faq (permite negrita, links y codigo)
import { inline } from './lib.mjs';
function inlineSafe(s) { return inline(s); }

// ---------- markdown crudo por articulo ----------

function articleMarkdown(a) {
  const t = S[a.lang];
  const lines = [
    `# ${a.title}`, '', `> ${a.description}`, '',
    `${t.pub} ${a.date} · ${t.upd} ${a.dateModified} · ${a.author} · ${abs(a.lang, urlPath(a))}`, '',
    `## ${t.tldr}`, '', ...a.tldr.map((x) => `- ${x}`), '',
    a.body.trim(), '',
    `## ${t.faq}`, '',
  ];
  for (const x of a.faq) lines.push(`### ${x.q}`, '', x.a, '');
  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}

// ---------- indice y pilares ----------

function listingPage(lang, { pillar }) {
  const t = S[lang], host = HOSTS[lang];
  const all = byLang[lang];
  const list = pillar ? all.filter((a) => a.pillar === pillar) : all;
  const empty = !list.length;
  const pName = pillar ? PILLARS[pillar][lang].name : '';
  const p = pillar ? `/blog/${pillar}/` : '/blog/';
  const canonical = abs(lang, p);
  const title = pillar ? t.pillarTitle(pName) : `${t.idxTitle} | Worker`;
  const description = pillar ? PILLARS[pillar][lang].desc : t.idxMeta;
  const trail = pillar ? [[t.home, '/'], [t.blog, '/blog/'], [pName, p]] : [[t.home, '/'], [t.blog, '/blog/']];

  const other = lang === 'es' ? 'en' : 'es';
  const otherList = pillar ? byLang[other].filter((a) => a.pillar === pillar) : byLang[other];
  const alternates = [], alts = {};
  if (!empty && otherList.length) {
    alternates.push({ hreflang: 'es', href: abs('es', p) }, { hreflang: 'en', href: abs('en', p) }, { hreflang: 'x-default', href: abs('es', p) });
    alts.es = abs('es', p); alts.en = abs('en', p);
  }

  const active = PILLAR_KEYS.filter((k) => all.some((a) => a.pillar === k));
  const chips = active.length > 1 || pillar
    ? `<ul class="chips"><li><a class="chip" href="/blog/"${pillar ? '' : ' aria-current="true"'}>${t.all}</a></li>${active.map((k) => `<li><a class="chip" href="/blog/${k}/"${k === pillar ? ' aria-current="true"' : ''}>${escapeHtml(PILLARS[k][lang].name)}</a></li>`).join('')}</ul>`
    : '';
  const main = empty
    ? `<div class="empty"><h2>${t.emptyH}</h2><p>${t.emptyP}</p></div>`
    : `<ul class="grid">${list.map((a) => card(lang, a)).join('')}</ul>`;
  const body = `<main id="contenido"><div class="wrap">
${crumbs(lang, trail)}
<header class="hero"><h1>${escapeHtml(pillar ? pName : t.idxH)}</h1><p class="lead">${escapeHtml(pillar ? description : t.idxLead)}</p></header>
<div class="idx">${chips}${main}</div></div>
<section class="band"><div class="wrap"><p>${t.band}</p><a class="btn" href="/#diagnostico">${t.bandBtn}</a></div></section>
</main>`;
  const ld = [{
    '@context': 'https://schema.org', '@type': 'CollectionPage', name: title.replace(/ \| .*$/, ''), description, url: canonical, inLanguage: t.inLang,
    isPartOf: { '@type': 'WebSite', name: 'Worker', url: host + '/' },
  }, breadcrumbLd(lang, trail)];
  return {
    empty,
    html: layout({ lang, title, description, canonical, alternates, robots: empty ? 'noindex,follow' : '', image: ogImage(lang), jsonld: empty ? [breadcrumbLd(lang, trail)] : ld, body, alts }),
  };
}

// ---------- sitemaps ----------

function sitemap(lang) {
  const urls = [];
  const alt = (pairs) => pairs.map(([hl, href]) => `<xhtml:link rel="alternate" hreflang="${hl}" href="${href}"/>`).join('');
  const homePairs = [['es', HOSTS.es + '/'], ['en', HOSTS.en + '/'], ['x-default', HOSTS.es + '/']];
  urls.push({ loc: HOSTS[lang] + '/', alt: alt(homePairs) });
  const all = byLang[lang];
  const maxMod = (list) => list.map((a) => a.dateModified).sort().pop();
  const other = lang === 'es' ? 'en' : 'es';
  if (all.length) {
    const otherAll = byLang[other];
    urls.push({ loc: abs(lang, '/blog/'), lastmod: maxMod(all), alt: otherAll.length ? alt([['es', abs('es', '/blog/')], ['en', abs('en', '/blog/')], ['x-default', abs('es', '/blog/')]]) : '' });
    for (const k of PILLAR_KEYS) {
      const list = all.filter((a) => a.pillar === k);
      if (!list.length) continue;
      const hasOther = otherAll.some((a) => a.pillar === k);
      urls.push({ loc: abs(lang, `/blog/${k}/`), lastmod: maxMod(list), alt: hasOther ? alt([['es', abs('es', `/blog/${k}/`)], ['en', abs('en', `/blog/${k}/`)], ['x-default', abs('es', `/blog/${k}/`)]]) : '' });
    }
    for (const a of all) {
      const partner = partnerOf(a);
      let alts = '';
      if (partner) {
        const es = lang === 'es' ? a : partner, en = lang === 'en' ? a : partner;
        alts = alt([['es', abs('es', urlPath(es))], ['en', abs('en', urlPath(en))], ['x-default', abs('es', urlPath(es))]]);
      }
      urls.push({ loc: abs(lang, urlPath(a)), lastmod: a.dateModified, alt: alts });
    }
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`
    + urls.map((u) => `<url><loc>${xml(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}${u.alt}</url>`).join('\n') + '\n</urlset>\n';
}

// ---------- llms.txt / llms-full.txt ----------

const SERVICES = {
  es: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'Mercado Libre Ads', 'ChatGPT Ads', 'Creatividades', 'CRO y tienda', 'Email y WhatsApp', 'Worker Brain'],
  en: ['Meta Ads', 'Google Ads', 'TikTok Ads', 'Mercado Libre Ads', 'ChatGPT Ads', 'Creative', 'CRO and store', 'Email and WhatsApp', 'Worker Brain'],
};

function llmsHead(lang) {
  const host = HOSTS[lang];
  const es = lang === 'es';
  const out = [
    '# Worker', '',
    es
      ? '> Agencia de marketing digital argentina. Especialistas en Meta Ads, Google Ads, creatividades y email, con Worker Brain revisando tus números todos los días.'
      : '> Argentine digital marketing agency. Specialists in Meta Ads, Google Ads, creative and email, with Worker Brain checking your numbers every day.',
    '',
    es
      ? 'Trabajamos con ecommerce que ya venden y quieren crecer, y con empresas B2B que consiguen clientes en línea. Worker Brain viene incluido para los clientes de la agencia y también se puede contratar solo. El diagnóstico inicial es gratis.'
      : 'We work with ecommerce brands that already sell and want to grow, and with B2B companies that win clients online. Worker Brain is included for agency clients and can also be hired on its own. The initial audit is free.',
    '',
    es ? '## Servicios' : '## Services', '',
    ...SERVICES[lang].map((s) => `- [${s}](${host}/#servicios)`), '',
    es ? '## Contacto' : '## Contact', '',
    `- [${es ? 'Pedir diagnóstico gratis' : 'Get a free audit'}](${host}/#diagnostico)`,
    '- [escalar@worker.ar](mailto:escalar@worker.ar)',
    `- [WhatsApp](${WA})`, '',
  ];
  if (es) out.push('## Herramientas', '', ...TOOLS.map((x) => `- [${x.name}](${x.url})`), '');
  return out;
}

function llmsTxt(lang) {
  const all = byLang[lang];
  const out = llmsHead(lang);
  if (all.length) {
    out.push(lang === 'es' ? '## Artículos' : '## Articles', '');
    for (const a of all) out.push(`- [${a.title}](${abs(lang, `/blog/${a.pillar}/${a.slug}.md`)}): ${a.description}`);
    out.push('');
  }
  return out.join('\n').trimEnd() + '\n';
}

function llmsFull(lang) {
  const all = byLang[lang];
  const out = llmsHead(lang);
  if (all.length) {
    out.push(lang === 'es' ? '## Artículos' : '## Articles', '');
    for (const a of all) {
      out.push('---', '', `Fuente: ${abs(lang, urlPath(a))}`.replace('Fuente', lang === 'es' ? 'Fuente' : 'Source'), '', articleMarkdown(a).trimEnd(), '');
    }
  }
  return out.join('\n').trimEnd() + '\n';
}

// ---------- escritura ----------

for (const lang of LANGS) fs.rmSync(outDir(lang), { recursive: true, force: true });
const written = [];
const emit = (file, content) => { write(file, content); written.push(path.relative(ROOT, file).replace(/\\/g, '/')); };

emit(path.join(PUBLIC, 'og-default.png'), ogPng());

for (const lang of LANGS) {
  const dir = outDir(lang);
  const idx = listingPage(lang, {});
  emit(path.join(dir, 'index.html'), idx.html);
  for (const k of PILLAR_KEYS) {
    if (!byLang[lang].some((a) => a.pillar === k)) continue;
    emit(path.join(dir, k, 'index.html'), listingPage(lang, { pillar: k }).html);
  }
  for (const a of byLang[lang]) {
    const base = path.join(dir, a.pillar, a.slug);
    const md = articleMarkdown(a);
    emit(path.join(base, 'index.html'), articlePage(a));
    emit(path.join(base, 'index.md'), md);
    emit(base + '.md', md);
  }
  emit(path.join(PUBLIC, `sitemap-${lang}.xml`), sitemap(lang));
  emit(path.join(PUBLIC, `llms-${lang}.txt`), llmsTxt(lang));
  emit(path.join(PUBLIC, `llms-full-${lang}.txt`), llmsFull(lang));
}

console.log(`Build ok: ${byLang.es.length} articulos ES, ${byLang.en.length} EN, ${drafts} borradores omitidos.`);
for (const f of written) console.log('  ' + f);
