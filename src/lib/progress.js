// Persistencia de progreso en localStorage.
//
// Guarda, por clase: las respuestas de los quizzes (índice ORIGINAL elegido),
// el puntaje, el combo y la última card vista (para reanudar donde quedaste).
// `lastClass` recuerda la última clase abierta, que alimenta el botón
// "Continuar" de la home.
import { writable, get } from "svelte/store";

const KEY = "filo-progress-v1";
const EMPTY_CLASS = { answers: {}, score: 0, combo: 0, card: 0 };

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export const progress = writable({ lastClass: null, classes: {}, ...load() });

progress.subscribe((v) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(v));
  } catch {
    /* almacenamiento no disponible: seguimos en memoria */
  }
});

// Estado guardado de una clase, a partir de un valor del store (o defaults).
export function classStateOf(p, num) {
  return { ...EMPTY_CLASS, ...((p.classes && p.classes[num]) || {}) };
}

// Igual que classStateOf pero leyendo el valor actual del store (uso puntual).
export function classState(num) {
  return classStateOf(get(progress), num);
}

// Mezcla `patch` en el estado de la clase `num` y la marca como última abierta.
export function saveClass(num, patch) {
  progress.update((p) => {
    const prev = classStateOf(p, num);
    return {
      ...p,
      lastClass: num,
      classes: { ...p.classes, [num]: { ...prev, ...patch } },
    };
  });
}

// Tipos de card puntuables (interactivos). Debe coincidir con ClassView.
const SCORABLE = new Set(["quiz", "match", "classify"]);

// ¿Se respondieron todas las cards interactivas de la clase?
export function isComplete(p, lecture) {
  const st = classStateOf(p, lecture.num);
  const quizzes = lecture.feed
    .map((c, i) => (SCORABLE.has(c.type) ? i : -1))
    .filter((i) => i >= 0);
  return quizzes.length > 0 && quizzes.every((i) => st.answers[i] != null);
}

// ¿La clase tiene algún avance (respuestas o scroll)?
export function isStarted(p, lecture) {
  const st = classStateOf(p, lecture.num);
  return Object.keys(st.answers).length > 0 || st.card > 0;
}

// % de cards interactivas ya respondidas (0–100). Alimenta la barra de
// progreso de fondo en las cards de la home.
export function completionPct(p, lecture) {
  const st = classStateOf(p, lecture.num);
  let total = 0;
  let done = 0;
  lecture.feed.forEach((c, i) => {
    if (!SCORABLE.has(c.type)) return;
    total += 1;
    if (st.answers[i] != null) done += 1;
  });
  return total > 0 ? Math.round((done / total) * 100) : 0;
}
