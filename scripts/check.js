// Validación de contenido: corré `npm run check`.
// Chequea las clases activas y el glosario, y sale con código 1 si hay errores.
import { CLASSES } from "../src/content/classes.js";
import { GLOSSARY } from "../src/content/glossary.js";

const errors = [];
const warnings = [];
const KINDS = new Set(["autor", "concepto", "obra", "evento"]);

// ---- clases ----
for (const c of CLASSES) {
  const tag = `Clase ${c.num}`;
  if (c.transcript !== c.num + 1)
    warnings.push(`${tag}: transcript (${c.transcript}) != num+1 (${c.num + 1})`);
  if (!c.content) continue; // bloqueada: nada que validar

  const L = c.content;
  if (L.num !== c.num) errors.push(`${tag}: content.num (${L.num}) != ${c.num}`);
  if (!Array.isArray(L.feed) || L.feed.length === 0) {
    errors.push(`${tag}: feed vacío`);
    continue;
  }
  L.feed.forEach((card, i) => {
    const at = `${tag} · card ${i + 1}`;
    if (card.type === "info") {
      if (!card.title) errors.push(`${at}: info sin title`);
      if (!card.body) errors.push(`${at}: info sin body`);
    } else if (card.type === "quiz") {
      if (!card.question) errors.push(`${at}: quiz sin question`);
      const n = Array.isArray(card.options) ? card.options.length : 0;
      if (n < 2) errors.push(`${at}: quiz necesita >= 2 opciones`);
      if (!Number.isInteger(card.answer) || card.answer < 0 || card.answer >= n)
        errors.push(`${at}: answer fuera de rango (${card.answer} / ${n})`);
      if (!card.explain) warnings.push(`${at}: quiz sin explain`);
    } else {
      errors.push(`${at}: type inválido (${card.type})`);
    }
  });
}

// ---- glosario ----
const seenAlias = new Map();
for (const [slug, e] of Object.entries(GLOSSARY)) {
  const tag = `glosario · ${slug}`;
  if (!e.term) errors.push(`${tag}: sin term`);
  if (!KINDS.has(e.kind)) errors.push(`${tag}: kind inválido (${e.kind})`);
  if (!e.body) errors.push(`${tag}: sin body`);
  if (!e.when) warnings.push(`${tag}: sin when (fechas)`);
  const akas = e.aka && e.aka.length ? e.aka : [e.term];
  for (const a of akas) {
    const k = String(a).toLowerCase();
    if (seenAlias.has(k) && seenAlias.get(k) !== slug)
      warnings.push(`${tag}: alias "${a}" ya usado por "${seenAlias.get(k)}"`);
    else seenAlias.set(k, slug);
  }
}

// ---- reporte ----
for (const w of warnings) console.log("⚠ ", w);
for (const e of errors) console.log("✗ ", e);

const active = CLASSES.filter((c) => c.content).length;
if (errors.length) {
  console.log(`\n${errors.length} error(es), ${warnings.length} aviso(s).`);
  process.exit(1);
}
console.log(
  `\n✓ OK — ${active} clase(s) activa(s), ${Object.keys(GLOSSARY).length} términos. ${warnings.length} aviso(s).`
);
