// Matcher del diccionario + store del modal.
// El glosario es POR CURSO: `setGlossary` lo enchufa al entrar a un curso
// (lo hace lib/courses.js) y reconstruye el índice de alias y la regex.
// segment(text) parte un texto en trozos de texto plano y términos clicables.
import { writable } from "svelte/store";

// --- término activo (para el modal) ---
export const activeTerm = writable(null);
export function openTerm(slug) {
  activeTerm.set(GLOSSARY[slug] || null);
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
let RE = null;

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
    const slug = lowerToSlug.get(matched.toLowerCase());
    if (!slug || used.has(slug)) continue; // ya linkeado en este texto
    if (m.index > last) out.push({ t: "text", v: text.slice(last, m.index) });
    out.push({ t: "term", v: matched, slug });
    used.add(slug);
    last = m.index + matched.length;
  }
  if (last < text.length) out.push({ t: "text", v: text.slice(last) });
  return out;
}
