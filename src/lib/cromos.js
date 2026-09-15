// Resuelve el roster de cromos y la ilustración de cada clase contra las
// imágenes disponibles. Puramente datos: no lee `progress` — quién ganó qué
// vive en `progress.js`, que sí importa de acá (evitar el ciclo al revés).
//
// El arte se importa con un glob: alcanza con dejar el archivo en
// src/assets/cromos/<slug>.webp para que pase a tener imagen, sin tocar
// código. Los que todavía no la tienen quedan con `img: null` y la UI los
// dibuja con un placeholder.
import { CROMOS } from "../content/cromos.js";
import { CLASS_IMAGES } from "../content/classImages.js";
import { courseIcons } from "./courseIcons.js";

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

// El tipo "curso" no vive en el pool de cromos: usa la portada propia del
// curso (courseIcons), así el cromo de "curso completo" tiene arte
// dedicado en vez de pedirle prestada la imagen a un pensador o corriente.
export const CROMOS_CON_IMG = CROMOS.map((c) => ({
  ...c,
  img: c.tipo === "curso" ? courseIcons[c.curso] || null : porSlug[c.slug] || null,
}));

export const TOTAL = CROMOS_CON_IMG.length;

// Los cromos "activos" de un curso (curso completo, pensadores, corrientes),
// en el orden en que se declararon — que ya es el orden de tier que pide el
// álbum (curso → pensador deep dive → pensador easy → corriente).
export function cromosDeCurso(cursoId) {
  return CROMOS_CON_IMG.filter((c) => c.curso === cursoId);
}

export function cromosEspeciales() {
  return CROMOS_CON_IMG.filter((c) => c.tipo === "especial");
}

// La ilustración de UNA clase (progreso, no cromo): siempre existe si la
// clase tiene contenido.
const imgPorClase = Object.fromEntries(
  CLASS_IMAGES.map((c) => [`${c.curso}-${c.clase}`, porSlug[c.slug] || null])
);
export function imagenDeClase(cursoId, num) {
  return imgPorClase[`${cursoId}-${num}`] || null;
}

// Los conseguidos, del más reciente al más viejo.
export function conseguidos(ganados) {
  return CROMOS_CON_IMG.filter((c) => ganados[c.slug]).sort(
    (a, b) => ganados[b.slug] - ganados[a.slug]
  );
}
