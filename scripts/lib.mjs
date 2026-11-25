// Utilidades compartidas por build.mjs y lint-blog.mjs. Node puro, sin dependencias.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const CONTENT = path.join(ROOT, 'content', 'blog');
export const PUBLIC = path.join(ROOT, 'public');

export const HOSTS = { es: 'https://worker.ar', en: 'https://workermkt.com' };
export const LANGS = ['es', 'en'];

export const PILLARS = {
  'meta-ads': {
    es: { name: 'Meta Ads', desc: 'Cómo armar, medir y escalar campañas de Meta Ads en tiendas online y empresas B2B.' },
    en: { name: 'Meta Ads', desc: 'How to build, measure and scale Meta Ads campaigns for online stores and B2B companies.' },
  },
  metricas: {
    es: { name: 'Métricas', desc: 'Qué números mirar, cómo calcularlos y cómo decidir con ellos: ROAS, CAC, margen y atribución.' },
    en: { name: 'Metrics', desc: 'Which numbers to watch, how to calculate them and how to decide with them: ROAS, CAC, margin and attribution.' },
  },
  ia: {
    es: { name: 'IA', desc: 'Cómo usar inteligencia artificial en el trabajo diario de marketing, con criterio y sin humo.' },
    en: { name: 'AI', desc: 'How to use artificial intelligence in day-to-day marketing work, with judgment and without hype.' },
  },
  automatizacion: {
    es: { name: 'Automatización', desc: 'Automatizaciones de email, WhatsApp y seguimiento de leads para marketing y ventas.' },
    en: { name: 'Automation', desc: 'Email, WhatsApp and lead follow-up automations for marketing and sales teams.' },
  },
  fechas: {
    es: { name: 'Fechas comerciales', desc: 'Planificación de Hot Sale, Black Friday, Cyber Monday y otras fechas clave del ecommerce.' },
    en: { name: 'Sales calendar', desc: 'Planning for Black Friday, Cyber Monday and other key dates in ecommerce.' },
  },
  b2b: {
    es: { name: 'B2B', desc: 'Generación de leads y campañas para empresas que venden a otras empresas.' },
    en: { name: 'B2B', desc: 'Lead generation and campaigns for companies that sell to other companies.' },
  },
  noticias: {
    es: { name: 'Noticias', desc: 'Cambios en las plataformas de publicidad y qué hacer con cada uno.' },
    en: { name: 'News', desc: 'Changes in the ad platforms and what to do about each one.' },
  },
};
export const PILLAR_KEYS = Object.keys(PILLARS);

// Herramientas de Brain (solo ES). En el frontmatter, `tools: true` muestra las cuatro;
// `tools: [rentabilidad, conversion]` muestra solo esas (vale el id corto o el slug de la URL).
export const TOOLS = [
  { id: 'rentabilidad', slug: 'calculadora-rentabilidad', url: 'https://brain.worker.ar/herramientas/calculadora-rentabilidad', name: 'Calculadora de rentabilidad' },
  { id: 'diagnostico', slug: 'diagnostico-ecommerce', url: 'https://brain.worker.ar/herramientas/diagnostico-ecommerce', name: 'Diagnóstico de ecommerce' },
  { id: 'conversion', slug: 'calculadora-conversion', url: 'https://brain.worker.ar/herramientas/calculadora-conversion', name: 'Calculadora de conversión' },
  { id: 'whatsapp', slug: 'calculadora-whatsapp', url: 'https://brain.worker.ar/herramientas/calculadora-whatsapp', name: 'Calculadora de WhatsApp' },
];
export const findTool = (k) => TOOLS.find((t) => t.id === k || t.slug === k);

export const FORBIDDEN = [
  'en el dinamico ecosistema', 'marca un hito', 'sin lugar a dudas', 'solucion integral', 'potencia tu negocio',
  'lleva al siguiente nivel', 'cabe destacar', 'en este sentido', 'es importante mencionar', 'excelente pregunta',
  'espero que te sea util',
];

export const norm = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

export const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const slugify = (s) => norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'seccion';

// ---------- YAML minimo (escalares, listas, mapas, listas de mapas, [a, b]) ----------

function scalar(raw) {
  const s = raw.trim();
  if (s === 'true') return true;
  if (s === 'false') return false;
  if (s === '' || s === 'null' || s === '~') return '';
  if (s[0] === '"' && s[s.length - 1] === '"' && s.length >= 2) {
    try { return JSON.parse(s); } catch { return s.slice(1, -1).replace(/\\"/g, '"'); }
  }
  if (s[0] === "'" && s[s.length - 1] === "'" && s.length >= 2) return s.slice(1, -1).replace(/''/g, "'");
  if (s[0] === '[' && s[s.length - 1] === ']') {
    const inner = s.slice(1, -1).trim();
    return inner ? inner.split(',').map(scalar) : [];
  }
  return s;
}

export function parseYaml(src) {
  const lines = src.split(/\r?\n/).filter((l) => l.trim() && !l.trim().startsWith('#'));
  let i = 0;
  const indentOf = (l) => l.match(/^ */)[0].length;

  function parseNode(indent) {
    return lines[i].trim().startsWith('- ') || lines[i].trim() === '-' ? parseList(indent) : parseMap(indent);
  }

  function parseList(indent) {
    const out = [];
    while (i < lines.length && indentOf(lines[i]) === indent && /^-(\s|$)/.test(lines[i].trim())) {
      const rest = lines[i].trim().slice(1).trim();
      if (/^[A-Za-z_][\w-]*:(\s|$)/.test(rest) && !/^["'\[]/.test(rest)) {
        // item tipo mapa: la primera clave va en la linea del guion
        lines[i] = ' '.repeat(indent + 2) + rest;
        out.push(parseMap(indent + 2));
      } else {
        out.push(scalar(rest));
        i++;
      }
    }
    return out;
  }

  function parseMap(indent) {
    const out = {};
    while (i < lines.length && indentOf(lines[i]) === indent) {
      const m = lines[i].trim().match(/^([A-Za-z_][\w-]*):(?:\s+(.*))?$/);
      if (!m) throw new Error('YAML no soportado en la linea: ' + lines[i]);
      const key = m[1];
      const val = m[2];
      i++;
      if (val !== undefined && val !== '') {
        out[key] = scalar(val);
      } else if (i < lines.length && (indentOf(lines[i]) > indent || (indentOf(lines[i]) === indent && /^-(\s|$)/.test(lines[i].trim())))) {
        out[key] = parseNode(indentOf(lines[i]));
      } else {
        out[key] = '';
      }
    }
    return out;
  }

  if (!lines.length) return {};
  return parseMap(indentOf(lines[0]));
}

export function splitFrontmatter(raw) {
  const text = raw.replace(/^﻿/, '').replace(/\r\n/g, '\n');
  if (!text.startsWith('---\n')) return { fm: null, body: text };
  const end = text.indexOf('\n---', 4);
  if (end === -1) return { fm: null, body: text };
  const fmSrc = text.slice(4, end);
  const body = text.slice(end + 4).replace(/^\n/, '');
  return { fm: parseYaml(fmSrc), body };
}

// ---------- Markdown minimo ----------

const SAFE_URL = /^(https?:\/\/|\/|#|mailto:)/i;

export function inline(src) {
  const codes = [];
  let s = src.replace(/`([^`]+)`/g, (_, c) => { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
  s = escapeHtml(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, t, u) => (SAFE_URL.test(u) ? `<a href="${u}">${t}</a>` : t));
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*\w])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>');
  s = s.replace(/(^|[\s(])_([^_]+)_(?=[\s).,;:!?]|$)/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, n) => `<code>${escapeHtml(codes[Number(n)])}</code>`);
}

const LIST_RE = /^(\s*)([-*]|\d+\.)\s+(.*)$/;
const TABLE_SEP = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;
const HEADING_RE = /^(#{1,4})\s+(.+?)\s*#*\s*$/;
const HR_RE = /^\s*(-{3,}|\*{3,})\s*$/;

const splitRow = (l) => l.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((c) => c.trim());

function buildList(items, i, indent) {
  const tag = items[i].ordered ? 'ol' : 'ul';
  let html = `<${tag}>`;
  while (i < items.length && items[i].indent === indent) {
    let li = inline(items[i].text);
    i++;
    if (i < items.length && items[i].indent > indent) {
      const [sub, ni] = buildList(items, i, items[i].indent);
      li += sub;
      i = ni;
    }
    html += `<li>${li}</li>`;
  }
  return [html + `</${tag}>`, i];
}

// Devuelve { html, headings: [{level, text, id}] }
export function renderMarkdown(md, opts = {}) {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const headings = [];
  const used = new Map();
  const out = [];
  let i = 0;

  const isBlockStart = (l, next) => !l.trim() || HEADING_RE.test(l) || /^```/.test(l) || LIST_RE.test(l) || /^>/.test(l) || HR_RE.test(l)
    || (l.includes('|') && next !== undefined && TABLE_SEP.test(next));

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i++; continue; }

    if (/^```/.test(line)) {
      const buf = [];
      i++;
      while (i < lines.length && !/^```/.test(lines[i])) buf.push(lines[i++]);
      i++;
      out.push(`<pre><code>${escapeHtml(buf.join('\n'))}</code></pre>`);
      continue;
    }

    const h = line.match(HEADING_RE);
    if (h) {
      const level = h[1].length <= 2 ? 2 : 3;
      const text = h[2].replace(/[*_`]/g, '');
      let id = slugify(text);
      const n = used.get(id) || 0;
      used.set(id, n + 1);
      if (n) id += '-' + (n + 1);
      headings.push({ level, text, id });
      out.push(`<h${level} id="${id}">${inline(h[2])}</h${level}>`);
      i++;
      continue;
    }

    if (HR_RE.test(line)) { out.push('<hr>'); i++; continue; }

    if (line.includes('|') && i + 1 < lines.length && TABLE_SEP.test(lines[i + 1])) {
      const head = splitRow(line);
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].trim() && lines[i].includes('|')) rows.push(splitRow(lines[i++]));
      out.push('<div class="tbl"><table><thead><tr>' + head.map((c) => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>'
        + rows.map((r) => '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') + '</tbody></table></div>');
      continue;
    }

    if (/^>/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>/.test(lines[i])) buf.push(lines[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote>${renderMarkdown(buf.join('\n'), { quiet: true }).html}</blockquote>`);
      continue;
    }

    if (LIST_RE.test(line)) {
      const items = [];
      while (i < lines.length) {
        const m = lines[i].match(LIST_RE);
        if (m) {
          items.push({ indent: m[1].length, ordered: /\d/.test(m[2]), text: m[3] });
          i++;
        } else if (lines[i].trim() && /^\s+\S/.test(lines[i]) && items.length) {
          items[items.length - 1].text += ' ' + lines[i].trim();
          i++;
        } else break;
      }
      let k = 0;
      while (k < items.length) {
        const [html, nk] = buildList(items, k, items[k].indent);
        out.push(html);
        k = nk;
      }
      continue;
    }

    const buf = [line.trim()];
    i++;
    while (i < lines.length && !isBlockStart(lines[i], lines[i + 1])) buf.push(lines[i++].trim());
    out.push(`<p>${inline(buf.join(' '))}</p>`);
  }

  return { html: out.join('\n'), headings: opts.quiet ? [] : headings };
}

export function plainText(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#>|]/g, ' ')
    .replace(/^\s*[-\d.]+\s+/gm, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export const wordCount = (md) => { const t = plainText(md); return t ? t.split(' ').length : 0; };

export const readingMinutes = (md) => Math.max(1, Math.ceil(wordCount(md) / 200));

// ---------- Carga de articulos ----------

export const REQUIRED = ['title', 'description', 'slug', 'pillar', 'keyword', 'date', 'dateModified', 'tldr', 'faq'];
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function loadAll() {
  const items = [];
  for (const lang of LANGS) {
    const dir = path.join(CONTENT, lang);
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.md')).sort()) {
      const file = path.join(dir, f);
      const raw = fs.readFileSync(file, 'utf8');
      let fm = null, body = raw, parseError = null;
      try { ({ fm, body } = splitFrontmatter(raw)); } catch (e) { parseError = e.message; }
      items.push({ lang, file, rel: path.relative(ROOT, file).replace(/\\/g, '/'), raw, fm, body, parseError });
    }
  }
  return items;
}

export const isDraft = (it) => !!(it.fm && it.fm.draft === true);

// Errores de frontmatter de un articulo (lista de strings; vacia si esta bien)
export function frontmatterErrors(it) {
  const errs = [];
  if (it.parseError) return ['frontmatter ilegible: ' + it.parseError];
  if (!it.fm) return ['falta el frontmatter (--- ... ---)'];
  const fm = it.fm;
  for (const k of REQUIRED) {
    const v = fm[k];
    if (v === undefined || v === '' || (Array.isArray(v) && !v.length)) errs.push(`falta o esta vacio: ${k}`);
  }
  if (fm.description && String(fm.description).length > 155) errs.push(`description de ${String(fm.description).length} caracteres (maximo 155)`);
  if (fm.slug && !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(fm.slug)) errs.push('slug invalido (solo minusculas, numeros y guiones)');
  if (fm.pillar && !PILLAR_KEYS.includes(fm.pillar)) errs.push(`pillar invalido: ${fm.pillar} (validos: ${PILLAR_KEYS.join(', ')})`);
  for (const k of ['date', 'dateModified']) if (fm[k] && !DATE_RE.test(String(fm[k]))) errs.push(`${k} debe ser AAAA-MM-DD`);
  if (fm.date && fm.dateModified && DATE_RE.test(fm.date) && DATE_RE.test(fm.dateModified) && fm.dateModified < fm.date) errs.push('dateModified es anterior a date');
  if (fm.tldr !== undefined && fm.tldr !== '' && !Array.isArray(fm.tldr)) errs.push('tldr debe ser una lista');
  if (Array.isArray(fm.tldr) && fm.tldr.some((x) => typeof x !== 'string' || !x.trim())) errs.push('tldr tiene items vacios o que no son texto (si un item tiene ":" ponelo entre comillas)');
  if (fm.faq !== undefined && fm.faq !== '') {
    if (!Array.isArray(fm.faq)) errs.push('faq debe ser una lista de {q, a}');
    else if (fm.faq.some((x) => !x || typeof x !== 'object' || !x.q || !x.a)) errs.push('cada item de faq necesita q y a');
  }
  if (fm.tools !== undefined && fm.tools !== '' && fm.tools !== true && fm.tools !== false && !Array.isArray(fm.tools)) errs.push('tools debe ser true o una lista');
  if (Array.isArray(fm.tools)) for (const t of fm.tools) if (!findTool(t)) errs.push(`tools: id desconocido ${t} (validos: ${TOOLS.map((x) => x.id).join(', ')})`);
  if (fm.leadMagnet) {
    const lm = fm.leadMagnet;
    if (typeof lm !== 'object' || !lm.titulo || !lm.texto || !lm.url) errs.push('leadMagnet necesita titulo, texto y url');
    else if (!SAFE_URL.test(lm.url)) errs.push('leadMagnet.url invalida');
  }
  return errs;
}

// Articulo normalizado y listo para renderizar (solo se llama con articulos sin errores)
export function toArticle(it) {
  const fm = it.fm;
  const { html, headings } = renderMarkdown(it.body);
  return {
    lang: it.lang,
    title: String(fm.title),
    description: String(fm.description),
    slug: String(fm.slug),
    pillar: String(fm.pillar),
    keyword: String(fm.keyword),
    date: String(fm.date),
    dateModified: String(fm.dateModified),
    author: fm.author ? String(fm.author) : 'Gabriel Uccello',
    tldr: fm.tldr.map(String),
    faq: fm.faq.map((x) => ({ q: String(x.q), a: String(x.a) })),
    leadMagnet: fm.leadMagnet || null,
    tools: fm.tools === true ? TOOLS.slice() : (Array.isArray(fm.tools) ? [...new Set(fm.tools.map(findTool))] : []),
    translation: fm.translation ? String(fm.translation) : '',
    image: fm.image ? String(fm.image) : '',
    body: it.body,
    html,
    headings,
    minutes: readingMinutes(it.body),
  };
}

export function* walk(dir, ext) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p, ext);
    else if (!ext || p.endsWith(ext)) yield p;
  }
}

// Extrae todos los bloques JSON-LD de un HTML
export function jsonLdBlocks(html) {
  const re = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html))) out.push(m[1]);
  return out;
}
