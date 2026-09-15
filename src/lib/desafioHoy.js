// Selección de la clase del desafío de hoy: la MISMA para todo el día (se
// sortea con una semilla hecha de la fecha) y determinista — llamarla desde
// Home (para mostrar de qué clase se trata, antes de jugarlo) o desde Desafio
// (para armar la ronda) da siempre el mismo resultado, sin tener que
// coordinarse entre los dos. Sale de los cursos ya empezados (si no hay
// ninguno, de todos) y no toca el progreso ni reparte cromos.
import { loadContent } from "./courses.js";
import { cursosEmpezados, hoyISO } from "./progress.js";

// Tipos que entran al desafío: se deja afuera "short" (la de término
// puntual) porque pide escribir, no elegir, y no encaja en el ritmo de la
// ronda.
const TIPOS = new Set(["quiz", "match", "classify"]);

export const RONDA_MAX = 7; // tope de preguntas por ronda, para que una clase larga no se haga eterna

// Generador con semilla (mulberry32) y semilla derivada de un texto (FNV-1a).
// Con la fecha como texto, el sorteo del día es siempre el mismo — en este
// teléfono y en cualquier otro, sin pedirle nada a ningún servidor.
function semilla(txt) {
  let h = 2166136261;
  for (let k = 0; k < txt.length; k++) {
    h ^= txt.charCodeAt(k);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rng(seed) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(arr, azar) {
  const a = [...arr];
  for (let j = a.length - 1; j > 0; j--) {
    const k = Math.floor(azar() * (j + 1));
    [a[j], a[k]] = [a[k], a[j]];
  }
  return a;
}

// { clase: {courseId, num, title}, ronda: [{card, courseId, num, title}] } o
// null si ningún curso tiene preguntas elegibles.
export async function armarDesafioDeHoy(courses, progressValue) {
  const empezados = cursosEmpezados(progressValue);
  const metas = courses.filter((c) => !empezados.length || empezados.includes(c.id));
  const elegibles = []; // clases con al menos una card de los tipos que entran
  for (const meta of metas) {
    const { classes } = await loadContent(meta);
    for (const cls of classes) {
      if (!cls.content) continue;
      const cards = cls.content.feed.filter((c) => TIPOS.has(c.type));
      if (cards.length) elegibles.push({ courseId: meta.id, num: cls.num, title: cls.title, cards });
    }
  }
  // La lista se recorre siempre en el mismo orden (cursos, clases), así que
  // con la misma semilla sale siempre la misma clase el mismo día. Adentro
  // las cards NO se barajan: van en su orden original, de eso se trata.
  const elegida = shuffle(elegibles, rng(semilla(hoyISO())))[0] || null;
  if (!elegida) return null;

  let cartas = elegida.cards;
  if (cartas.length > RONDA_MAX) {
    // Clases largas se recortan a un máximo, para que la ronda no se haga
    // eterna: se sortea CUÁLES quedan (semillado, distinto sorteo del de
    // arriba) pero se preserva su orden original — sigue siendo secuencial.
    const azar = rng(semilla(hoyISO() + elegida.courseId + elegida.num));
    const quedan = new Set(shuffle([...cartas.keys()], azar).slice(0, RONDA_MAX));
    cartas = cartas.filter((_, idx) => quedan.has(idx));
  }

  const clase = { courseId: elegida.courseId, num: elegida.num, title: elegida.title };
  const ronda = cartas.map((card) => ({ card, ...clase }));
  return { clase, ronda };
}
