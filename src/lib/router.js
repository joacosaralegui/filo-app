// Router mínimo por hash. Tres rutas, nada más:
//
//   #/                  catálogo de cursos
//   #/<curso>           home del curso
//   #/<curso>/<num>     una clase del curso
//
// Va por hash (y no por History API) para que ande igual servido desde un
// subdirectorio en GitHub Pages y desde la PWA instalada, sin config de server.
// Como cada navegación es una entrada del historial, el botón "atrás" del
// teléfono retrocede dentro de la app en vez de cerrarla.
import { readable } from "svelte/store";

export function parseHash(hash) {
  const parts = String(hash || "")
    .replace(/^#\/?/, "")
    .split("/")
    .filter(Boolean);
  const [courseId, rawNum] = parts;
  const num = rawNum != null && /^\d+$/.test(rawNum) ? Number(rawNum) : null;
  return { courseId: courseId || null, num };
}

export const route = readable(parseHash(location.hash), (set) => {
  const onChange = () => set(parseHash(location.hash));
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
});

// `replace` reemplaza la entrada actual del historial en vez de apilar una
// nueva: se usa para las redirecciones (ruta inválida → catálogo), que no
// tienen que quedar en el "atrás".
function go(path, replace = false) {
  if (location.hash === path) return;
  if (!replace) {
    location.hash = path; // dispara hashchange solo
    return;
  }
  history.replaceState(null, "", path);
  window.dispatchEvent(new Event("hashchange")); // replaceState no lo dispara
}

export const toCatalog = (replace) => go("#/", replace);
export const toCourse = (id, replace) => go(`#/${id}`, replace);
export const toClass = (id, num, replace) => go(`#/${id}/${num}`, replace);
