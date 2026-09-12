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

export const CROMOS_CON_IMG = CROMOS.map((c) => ({ ...c, img: porSlug[c.slug] || null }));

// La imagen suelta de un cromo, por slug. La usan los cursos como portada
// prestada hasta que tengan arte propio.
export const imagenDe = (slug) => porSlug[slug] || null;
export const TOTAL = CROMOS_CON_IMG.length;

// El cromo que otorga una clase (o null si no otorga ninguno).
export function cromoDeClase(cursoId, num) {
  return CROMOS_CON_IMG.find((c) => c.curso === cursoId && c.clase === num) || null;
}

// Los conseguidos, del más reciente al más viejo.
export function conseguidos(ganados) {
  return CROMOS_CON_IMG.filter((c) => ganados[c.slug]).sort(
    (a, b) => ganados[b.slug] - ganados[a.slug]
  );
}
