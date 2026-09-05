// Persistencia de progreso en localStorage.
//
// El progreso está namespaceado POR CURSO: cada curso tiene su propio
// `lastClass` y su mapa de clases, así la Clase 3 de un curso no pisa la del
// otro. `setCourse(id)` fija el curso activo al entrar (lo hace App.svelte) y
// el resto de las funciones trabajan contra él, para no tener que pasar el id
// por todos los componentes.
//
// Guarda, por clase: las respuestas de los quizzes (índice ORIGINAL elegido),
// el puntaje, el combo y la última card vista (para reanudar donde quedaste).
// `lastClass` alimenta el botón "Continuar" de la home del curso; `lastCourse`,
// el del catálogo.
import { writable, get } from "svelte/store";

const KEY = "filo-progress-v2";
const OLD_KEY = "filo-progress-v1";
const EMPTY_CLASS = { answers: {}, score: 0, combo: 0, card: 0 };
const EMPTY_COURSE = { lastClass: null, classes: {} };

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
    const old = localStorage.getItem(OLD_KEY);
    if (old) return migrateV1(JSON.parse(old));
  } catch {
    /* almacenamiento no disponible o JSON corrupto: arrancamos de cero */
  }
  return {};
}

// v1 guardaba un solo curso, plano: { lastClass, classes }. Era Nietzsche.
function migrateV1(v1) {
  return {
    lastCourse: "nietzsche",
    courses: {
      nietzsche: { lastClass: v1.lastClass ?? null, classes: v1.classes || {} },
    },
  };
}

export const progress = writable({ lastCourse: null, courses: {}, ...load() });

progress.subscribe((v) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(v));
  } catch {
    /* almacenamiento no disponible: seguimos en memoria */
  }
});

// --- curso activo ---
let activeCourse = null;

export function setCourse(id) {
  activeCourse = id || null;
  if (activeCourse) progress.update((p) => ({ ...p, lastCourse: activeCourse }));
}

// Última clase abierta, CROSS-CURSO: alimenta el hero de "Continuar" del
// catálogo. Guarda una copia liviana (título/era) para no tener que cargar
// el contenido del curso sólo para pintar ese texto.
export function setLastActivity(courseId, cls) {
  progress.update((p) => ({
    ...p,
    lastActivity: { courseId, num: cls.num, title: cls.title, era: cls.era },
  }));
}

// Estado guardado de un curso (por defecto, el activo).
export function courseStateOf(p, id = activeCourse) {
  return { ...EMPTY_COURSE, ...((p.courses && p.courses[id]) || {}) };
}

// Estado guardado de una clase del curso activo, a partir de un valor del store.
export function classStateOf(p, num) {
  return { ...EMPTY_CLASS, ...(courseStateOf(p).classes[num] || {}) };
}

// Igual que classStateOf pero leyendo el valor actual del store (uso puntual).
export function classState(num) {
  return classStateOf(get(progress), num);
}

// Mezcla `patch` en el estado de la clase `num` y la marca como última abierta.
export function saveClass(num, patch) {
  if (!activeCourse) return;
  progress.update((p) => {
    const course = courseStateOf(p, activeCourse);
    const prev = { ...EMPTY_CLASS, ...(course.classes[num] || {}) };
    return {
      ...p,
      lastCourse: activeCourse,
      courses: {
        ...p.courses,
        [activeCourse]: {
          ...course,
          lastClass: num,
          classes: { ...course.classes, [num]: { ...prev, ...patch } },
        },
      },
    };
  });
}

// Tipos de card puntuables (interactivos). Única fuente de verdad: ClassView
// también la importa de acá, para que no se desincronicen al agregar formatos.
export const SCORABLE = new Set(["quiz", "match", "classify", "short"]);

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
