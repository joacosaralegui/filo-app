// Router mínimo por hash. Cuatro raíces (una por pestaña de la barra) más las
// pantallas que cuelgan de ellas:
//
//   #/                      inicio
//   #/cursos                catálogo de cursos
//   #/cursos/<curso>        el recorrido de un curso
//   #/cursos/<curso>/<num>  una clase
//   #/glosario              buscador de términos y clases
//   #/glosario/<slug>       la página de un término
//   #/album                 álbum de cromos
//   #/desafio               ronda de preguntas
//
// Va por hash (y no por History API) para que ande igual servido desde un
// subdirectorio en GitHub Pages y desde la PWA instalada, sin config de server.
//
// Regla de historial: cambiar de pestaña REEMPLAZA la entrada actual, entrar a
// un detalle (un curso, una clase) apila. Así el "atrás" del teléfono deshace
// profundidad, que es lo que el usuario espera, y no un paseo por las
// pestañas que fue tocando.
import { readable } from "svelte/store";

export function parseHash(hash) {
  const parts = String(hash || "")
    .replace(/^#\/?/, "")
    .split("/")
    .filter(Boolean);
  const num = (s) => (s != null && /^\d+$/.test(s) ? Number(s) : null);

  if (!parts.length) return { view: "inicio", courseId: null, num: null };
  if (parts[0] === "album") return { view: "album", courseId: null, num: null };
  if (parts[0] === "glosario")
    return { view: "glosario", courseId: null, num: null, slug: parts[1] ? decodeURIComponent(parts[1]) : null };
  if (parts[0] === "desafio") return { view: "desafio", courseId: null, num: null };
  if (parts[0] === "cursos") {
    if (!parts[1]) return { view: "cursos", courseId: null, num: null };
    return { view: "curso", courseId: parts[1], num: num(parts[2]) };
  }
  // Rutas viejas (#/<curso> y #/<curso>/<num>): se resuelven como curso, y
  // App.svelte las normaliza a la forma nueva sin dejar rastro en el historial.
  return { view: "curso", courseId: parts[0], num: num(parts[1]), legacy: true };
}

export const route = readable(parseHash(location.hash), (set) => {
  const onChange = () => set(parseHash(location.hash));
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
});

// `replace` reemplaza la entrada actual del historial en vez de apilar una
// nueva: lo usan los cambios de pestaña y las redirecciones.
function go(path, replace = false) {
  if (location.hash === path) return;
  if (!replace) {
    location.hash = path; // dispara hashchange solo
    return;
  }
  history.replaceState(null, "", path);
  window.dispatchEvent(new Event("hashchange")); // replaceState no lo dispara
}

// Las cuatro raíces son destinos de pestaña: por defecto reemplazan.
export const toInicio = (replace = true) => go("#/", replace);
export const toCatalog = (replace = true) => go("#/cursos", replace);
export const toAlbum = (replace = true) => go("#/album", replace);
export const toGlosario = (replace = true) => go("#/glosario", replace);
// Un término es un detalle del glosario: apila.
export const toTerm = (slug, replace = false) => go(`#/glosario/${slug}`, replace);
// El desafío no es pestaña: se entra desde inicio, así que apila.
export const toDesafio = (replace = false) => go("#/desafio", replace);
// Detalles: apilan.
export const toCourse = (id, replace = false) => go(`#/cursos/${id}`, replace);
export const toClass = (id, num, replace = false) => go(`#/cursos/${id}/${num}`, replace);
