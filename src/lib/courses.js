// Carga de un curso: trae su contenido (una sola vez), el glosario y aplica su
// tema. Devuelve el curso completo = manifiesto + { classes }.
import { setGlossary } from "./glossary.js";

const cache = new Map();

// Sólo el contenido, sin efectos: no toca el tema. Lo usa el desafío, que junta
// preguntas de varios cursos a la vez y no "entra" a ninguno.
export async function loadContent(meta) {
  if (!cache.has(meta.id)) cache.set(meta.id, (await meta.load()).default);
  return cache.get(meta.id);
}

// El glosario es uno solo para toda la app. Es pesado, así que va en su propio
// chunk y se trae la primera vez que alguien lo necesita (una clase o la
// pestaña Glosario); ahí mismo se enchufa al auto-linkeo.
let glossary = null;
export async function loadGlossary() {
  if (!glossary) {
    glossary = (await import("../content/glossary.js")).GLOSSARY;
    setGlossary(glossary);
  }
  return glossary;
}

export async function loadCourse(meta) {
  const [content] = await Promise.all([loadContent(meta), loadGlossary()]);
  applyTheme(meta.theme);
  return { ...meta, ...content };
}

// Al volver al catálogo: sin curso activo y sin tema.
export function unloadCourse() {
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
