// Matcher del diccionario + store del modal.
// El glosario es uno solo para toda la app (src/content/glossary.js):
// `setGlossary` lo enchufa la primera vez que se carga (lo hace
// lib/courses.js) y construye el índice de alias y la regex.
// segment(text) parte un texto en trozos de texto plano y términos clicables.
import { writable } from "svelte/store";

// --- tipos de entrada: nombre y colores de su etiqueta (ficha y lista) ---
export const KIND_LABEL = {
  autor: "Autor",
  concepto: "Concepto",
  obra: "Obra",
  evento: "Evento",
};
export const KIND_CLASS = {
  autor: "bg-good/18 text-good-ink",
  concepto: "bg-accent/24 text-accent-ink",
  obra: "bg-bad/16 text-bad-ink",
  evento: "bg-text/8 text-text-soft",
};

// --- término activo (para el modal) ---
export const activeTerm = writable(null);
export function openTerm(slug) {
  activeTerm.set(GLOSSARY[slug] ? { slug, ...GLOSSARY[slug] } : null);
}
export function closeTerm() {
  activeTerm.set(null);
}

// --- construir índice alias -> slug y una regex combinada ---
function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

let GLOSSARY = {};
let lowerToSlug = new Map();
let exactCase = new Map(); // alias en minúscula -> la única forma que se linkea
let RE = null;

// "la Otra", "el Tratado", "la Investigación": un alias que arranca en
// minúscula y lleva mayúsculas nombra un título o una figura por esa
// mayúscula. Sin ella es la frase común ("la otra", "la investigación") y no
// tiene que linkearse, así que esos alias exigen la forma exacta.
const needsExactCase = (alias) => /^\p{Ll}/u.test(alias) && /\p{Lu}/u.test(alias);

export function setGlossary(glossary) {
  GLOSSARY = glossary || {};
  const aliasList = []; // [{alias, lower, slug}]
  for (const [slug, entry] of Object.entries(GLOSSARY)) {
    for (const alias of entry.aka || [entry.term]) {
      aliasList.push({ alias, lower: alias.toLowerCase(), slug });
    }
  }
  // más largos primero para que "contrato social" gane a "social"
  aliasList.sort((a, b) => b.alias.length - a.alias.length);
  lowerToSlug = new Map(aliasList.map((a) => [a.lower, a.slug]));
  exactCase = new Map(aliasList.filter((a) => needsExactCase(a.alias)).map((a) => [a.lower, a.alias]));

  if (!aliasList.length) {
    RE = null;
    return;
  }
  const pattern = aliasList.map((a) => escapeRe(a.alias)).join("|");
  try {
    // límites por letra/número Unicode; sin distinción de mayúsculas
    RE = new RegExp(`(?<![\\p{L}\\p{N}])(${pattern})(?![\\p{L}\\p{N}])`, "giu");
  } catch {
    // fallback si el motor no soporta lookbehind/\p{}
    RE = new RegExp(`\\b(${pattern})\\b`, "gi");
  }
}

/**
 * Parte `text` en segmentos. Solo linkea la PRIMERA aparición de cada término
 * dentro de este texto, para no saturar.
 * `used` se puede compartir entre varias llamadas (RichText parte el texto en
 * tramos por las negritas) para que el conteo siga siendo por card, no por tramo.
 * @returns {Array<{t:'text'|'term', v:string, slug?:string}>}
 */
export function segment(text, used = new Set()) {
  if (!text || !RE) return [{ t: "text", v: text || "" }];
  RE.lastIndex = 0;
  const out = [];
  let last = 0;
  let m;
  while ((m = RE.exec(text)) !== null) {
    const matched = m[0];
    const lower = matched.toLowerCase();
    const slug = lowerToSlug.get(lower);
    if (!slug || used.has(slug)) continue; // ya linkeado en este texto
    if (exactCase.has(lower) && exactCase.get(lower) !== matched) continue; // la frase común
    if (m.index > last) out.push({ t: "text", v: text.slice(last, m.index) });
    out.push({ t: "term", v: matched, slug });
    used.add(slug);
    last = m.index + matched.length;
  }
  if (last < text.length) out.push({ t: "text", v: text.slice(last) });
  return out;
}
