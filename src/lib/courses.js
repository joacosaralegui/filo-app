// Carga de un curso: trae su contenido (una sola vez), enchufa su glosario y
// aplica su tema. Devuelve el curso completo = manifiesto + { classes, glossary }.
import { setGlossary } from "./glossary.js";

const cache = new Map();

export async function loadCourse(meta) {
  if (!cache.has(meta.id)) cache.set(meta.id, (await meta.load()).default);
  const content = cache.get(meta.id);
  setGlossary(content.glossary);
  applyTheme(meta.theme);
  return { ...meta, ...content };
}

// Al volver al catálogo: sin curso activo, sin glosario y sin tema.
export function unloadCourse() {
  setGlossary(null);
  applyTheme(null);
}

// Overrides de tokens del curso sobre :root. Se limpian los del curso anterior.
let applied = [];
function applyTheme(theme) {
  const root = document.documentElement;
  applied.forEach((k) => root.style.removeProperty(k));
  applied = Object.keys(theme || {});
  applied.forEach((k) => root.style.setProperty(k, theme[k]));
}
