// Matcher del diccionario + store del modal.
// segment(text) parte un texto en trozos de texto plano y términos clicables.
import { writable } from "svelte/store";
import { GLOSSARY } from "../content/glossary.js";

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

const aliasList = []; // [{alias, lower, slug}]
for (const [slug, entry] of Object.entries(GLOSSARY)) {
  for (const alias of entry.aka || [entry.term]) {
    aliasList.push({ alias, lower: alias.toLowerCase(), slug });
  }
}
// más largos primero para que "contrato social" gane a "social"
aliasList.sort((a, b) => b.alias.length - a.alias.length);

const lowerToSlug = new Map(aliasList.map((a) => [a.lower, a.slug]));

let RE = null;
try {
  const pattern = aliasList.map((a) => escapeRe(a.alias)).join("|");
  // límites por letra/número Unicode; sin distinción de mayúsculas
  RE = new RegExp(`(?<![\\p{L}\\p{N}])(${pattern})(?![\\p{L}\\p{N}])`, "giu");
} catch (e) {
  // fallback si el motor no soporta lookbehind/\p{}
  const pattern = aliasList.map((a) => escapeRe(a.alias)).join("|");
  RE = new RegExp(`\\b(${pattern})\\b`, "gi");
}

/**
 * Parte `text` en segmentos. Solo linkea la PRIMERA aparición de cada término
 * dentro de este texto, para no saturar.
 * @returns {Array<{t:'text'|'term', v:string, slug?:string}>}
 */
export function segment(text) {
  if (!text) return [{ t: "text", v: "" }];
  RE.lastIndex = 0;
  const out = [];
  const used = new Set();
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
