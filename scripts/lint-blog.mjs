// Lint del blog y del JSON-LD del sitio. Node puro, sin dependencias.
//   npm run lint
// Sale con codigo 1 si hay errores. Los articulos con `draft: true` se saltean.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {
  ROOT, PUBLIC, LANGS, FORBIDDEN, norm, loadAll, isDraft, frontmatterErrors, walk, jsonLdBlocks, wordCount,
} from './lib.mjs';

const errors = [];
const warnings = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warnings.push(`${where}: ${msg}`);

// ---------- articulos ----------

const items = loadAll();
const live = items.filter((it) => !isDraft(it));
const drafts = items.length - live.length;

const slugs = new Map(); // lang:slug -> rel
for (const it of live) {
  const errs = frontmatterErrors(it);
  for (const e of errs) err(it.rel, e);

  // em dash y frases prohibidas sobre el archivo entero (frontmatter incluido)
  const lines = it.raw.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (line.includes('—')) err(`${it.rel}:${i + 1}`, 'tiene em dash (usa coma, punto o parentesis)');
    const n = norm(line);
    for (const phrase of FORBIDDEN) if (n.includes(phrase)) err(`${it.rel}:${i + 1}`, `frase prohibida "${phrase}"`);
  });

  if (it.fm && it.fm.slug) {
    const key = `${it.lang}:${it.fm.slug}`;
    if (slugs.has(key)) err(it.rel, `slug duplicado (ya lo usa ${slugs.get(key)})`);
    else slugs.set(key, it.rel);
  }

  // avisos (no frenan)
  if (!errs.length) {
    const fm = it.fm;
    if (fm.tldr.length < 3 || fm.tldr.length > 5) warn(it.rel, `tldr con ${fm.tldr.length} puntos (ideal 3 a 5)`);
    fm.faq.forEach((x, i) => {
      const w = wordCount(String(x.a));
      if (w < 40 || w > 60) warn(it.rel, `faq #${i + 1}: respuesta de ${w} palabras (ideal 40 a 60)`);
    });
    if (fm.translation) {
      const other = LANGS.find((l) => l !== it.lang);
      const pair = live.find((o) => o.lang === other && o.fm && o.fm.slug === fm.translation);
      if (!pair) warn(it.rel, `translation "${fm.translation}" no existe publicada en ${other} (no se emite hreflang)`);
    }
  }
}

// ---------- JSON-LD de todo public/**/*.html ----------

let htmlCount = 0, blocks = 0;
for (const file of walk(PUBLIC, '.html')) {
  htmlCount++;
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  // JS inline de las paginas del blog: solo compila (no ejecuta) para detectar errores de sintaxis
  if (/^public\/(en\/)?blog\//.test(rel)) {
    for (const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
      try { new vm.Script(m[1]); } catch (e) { err(rel, `JS inline con error de sintaxis: ${e.message}`); }
    }
  }
  const found = jsonLdBlocks(html);
  for (const [i, raw] of found.entries()) {
    blocks++;
    let data;
    try { data = JSON.parse(raw); } catch (e) { err(rel, `JSON-LD #${i + 1} no parsea: ${e.message}`); continue; }
    const list = Array.isArray(data) ? data : data['@graph'] || [data];
    for (const node of list) {
      if (!node['@type']) err(rel, `JSON-LD #${i + 1} sin @type`);
      if (!data['@context'] && !node['@context']) err(rel, `JSON-LD #${i + 1} sin @context`);
      if (node['@type'] === 'FAQPage' && !(Array.isArray(node.mainEntity) && node.mainEntity.length)) err(rel, 'FAQPage sin mainEntity');
    }
  }
}

// Home: tiene que tener JSON-LD, GTM, canonical y hreflang
for (const [name, canonical] of [['index.html', 'https://worker.ar/'], ['en.html', 'https://workermkt.com/']]) {
  const file = path.join(PUBLIC, name);
  if (!fs.existsSync(file)) { err(`public/${name}`, 'no existe'); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const where = `public/${name}`;
  if (!jsonLdBlocks(html).length) err(where, 'sin JSON-LD');
  if (!html.includes('GTM-MKVW3542')) err(where, 'falta GTM-MKVW3542');
  if (!html.includes(`<link rel="canonical" href="${canonical}">`)) err(where, `falta canonical ${canonical}`);
  for (const hl of ['es', 'en', 'x-default']) if (!new RegExp(`<link rel="alternate" hreflang="${hl}" href="https://(worker\\.ar|workermkt\\.com)/">`).test(html)) err(where, `falta hreflang ${hl}`);
  if (/Pide tu diagn/.test(html)) err(where, 'quedo "Pide tu diagnostico" en el HTML');
}

// ---------- reporte ----------

for (const w of warnings) console.warn('aviso  ' + w);
for (const e of errors) console.error('ERROR  ' + e);
console.log(`Lint: ${live.length} articulos revisados (${drafts} borradores salteados), ${htmlCount} HTML con ${blocks} bloques JSON-LD, ${warnings.length} avisos, ${errors.length} errores.`);
process.exit(errors.length ? 1 : 0);
