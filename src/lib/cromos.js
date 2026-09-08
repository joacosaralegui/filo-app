// Resuelve el roster de cromos contra las imágenes disponibles.
//
// El arte se importa con un glob: alcanza con dejar el archivo en
// src/assets/cromos/<slug>.webp para que el cromo pase a tener imagen, sin
// tocar código. Los que todavía no la tienen quedan con `img: null` y la UI
// los dibuja con un placeholder.
import { CROMOS } from "../content/cromos.js";

const archivos = import.meta.glob("../assets/cromos/*.webp", {
  eager: true,
  import: "default",
});

const porSlug = Object.fromEntries(
  Object.entries(archivos).map(([ruta, url]) => [
    ruta.split("/").pop().replace(".webp", ""),
    url,
  ])
);

export const ALBUM = CROMOS.map((c) => ({ ...c, img: porSlug[c.slug] || null }));
export const TOTAL = ALBUM.length;

// El cromo que otorga una clase (o null si no otorga ninguno).
export function cromoDeClase(cursoId, num) {
  return ALBUM.find((c) => c.curso === cursoId && c.clase === num) || null;
}

// Los conseguidos, del más reciente al más viejo.
export function conseguidos(ganados) {
  return ALBUM.filter((c) => ganados[c.slug]).sort(
    (a, b) => ganados[b.slug] - ganados[a.slug]
  );
}
