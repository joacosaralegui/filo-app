// Persistencia de progreso en localStorage.
//
// El progreso está namespaceado POR CURSO: cada curso tiene su propio
// `lastClass` y su mapa de clases, así la Clase 3 de un curso no pisa la del
// otro. `setCourse(id)` fija el curso activo al entrar (lo hace App.svelte) y
// el resto de las funciones trabajan contra él, para no tener que pasar el id
// por todos los componentes.
//
// Guarda, por clase: las respuestas de los quizzes (índice ORIGINAL elegido),
// el combo y la última card vista (para reanudar donde quedaste).
// `lastClass` alimenta el botón "Continuar" de la home del curso; `lastCourse`,
// el del catálogo.
import { writable, get } from "svelte/store";
import { COURSES } from "../content/courses.js";
import { CROMOS_CON_IMG } from "./cromos.js";

const KEY = "filo-progress-v2";
const OLD_KEY = "filo-progress-v1";
const EMPTY_CLASS = { answers: {}, combo: 0, card: 0, stars: 0, done: false };
const EMPTY_COURSE = { lastClass: null, classes: {} };

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return migrarCromos(migrarCorte(migrarIds(JSON.parse(raw))));
    const old = localStorage.getItem(OLD_KEY);
    if (old) return migrarCromos(migrarCorte(migrateV1(JSON.parse(old))));
  } catch {
    /* almacenamiento no disponible o JSON corrupto: arrancamos de cero */
  }
  return {};
}

// El esquema de cromos pasó de "uno por clase" (59) a una colección de 28
// logros con criterios nuevos: los slugs viejos guardados ya no significan
// lo mismo (ej. "arche" era la clase 1 de Antigua, ahora es la corriente
// Presocráticos), así que la colección guardada se limpia una sola vez al
// detectar el cambio — se re-gana desde cero contra los criterios nuevos.
function migrarCromos(p) {
  if (p.cromosV2) return p;
  return { ...p, cromos: {}, cromosV2: true };
}

// v1 guardaba un solo curso, plano: { lastClass, classes }. Era el que hoy se
// llama `contemporanea`.
function migrateV1(v1) {
  return {
    lastCourse: "contemporanea",
    courses: {
      contemporanea: { lastClass: v1.lastClass ?? null, classes: v1.classes || {} },
    },
  };
}

// Los cursos se renombraron para que el id acompañe al título. El progreso está
// indexado por ese id, así que hay que remapear lo guardado o se pierde.
const IDS_VIEJOS = { nietzsche: "contemporanea", modernidad: "moderna" };

// El curso `contemporanea` ahora arranca en Nietzsche: sus cuatro primeras
// clases (Ilustración, Romanticismo, Hegel, Marx) pasaron a `moderna`, así que
// todas las demás bajaron cuatro números. Sin esto, el progreso guardado
// quedaría corrido y apuntando a clases que ya no son las mismas.
const CORTE_CONTEMPORANEA = 4;

function migrarCorte(p) {
  const c = p.courses?.contemporanea;
  if (!c || c.corteAplicado) return p;
  const classes = {};
  for (const [num, estado] of Object.entries(c.classes || {})) {
    const nuevo = Number(num) - CORTE_CONTEMPORANEA;
    if (nuevo >= 1) classes[nuevo] = estado;
  }
  const desplazar = (n) => (typeof n === "number" && n - CORTE_CONTEMPORANEA >= 1 ? n - CORTE_CONTEMPORANEA : null);
  return {
    ...p,
    courses: {
      ...p.courses,
      contemporanea: { ...c, classes, lastClass: desplazar(c.lastClass), corteAplicado: true },
    },
    lastActivity:
      p.lastActivity?.courseId === "contemporanea"
        ? { ...p.lastActivity, num: desplazar(p.lastActivity.num) }
        : p.lastActivity,
  };
}

function migrarIds(p) {
  const cursos = { ...(p.courses || {}) };
  let tocado = false;
  for (const [viejo, nuevo] of Object.entries(IDS_VIEJOS)) {
    if (!cursos[viejo]) continue;
    // Si por lo que sea ya existiera el nuevo, gana el nuevo: es el vigente.
    cursos[nuevo] = cursos[nuevo] || cursos[viejo];
    delete cursos[viejo];
    tocado = true;
  }
  if (!tocado && !IDS_VIEJOS[p.lastCourse] && !IDS_VIEJOS[p.lastActivity?.courseId]) return p;
  return {
    ...p,
    courses: cursos,
    lastCourse: IDS_VIEJOS[p.lastCourse] || p.lastCourse,
    lastActivity: p.lastActivity
      ? { ...p.lastActivity, courseId: IDS_VIEJOS[p.lastActivity.courseId] || p.lastActivity.courseId }
      : p.lastActivity,
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

// Estado guardado de una clase (por defecto, del curso activo). El `id`
// explícito lo usa el otorgamiento de cromos, que necesita leer clases de
// cursos que no son el que estás cursando ahora mismo (p. ej. "Filósofo
// completo" mira los tres a la vez).
export function classStateOf(p, num, id = activeCourse) {
  return { ...EMPTY_CLASS, ...(courseStateOf(p, id).classes[num] || {}) };
}

// Igual que classStateOf pero leyendo el valor actual del store (uso puntual).
export function classState(num, id) {
  return classStateOf(get(progress), num, id);
}

// Mezcla `patch` en el estado de la clase `num` y la marca como última
// abierta. Devuelve los cromos recién ganados (puede ser ninguno): quien
// llama (ClassView) decide si festeja.
export function saveClass(num, patch) {
  if (!activeCourse) return [];
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
  return evaluarCromosGanados();
}

// Borra el avance de una clase (respuestas, combo y posición) para volver a
// hacerla de cero. NO toca los cromos: lo ganado está ganado.
export function resetClass(num) {
  if (!activeCourse) return;
  progress.update((p) => {
    const course = courseStateOf(p, activeCourse);
    const classes = { ...course.classes };
    delete classes[num];
    return {
      ...p,
      courses: { ...p.courses, [activeCourse]: { ...course, classes } },
    };
  });
}

// --- colección de cromos ---
// Guarda { [slug]: timestamp } al tope del progreso, fuera de los cursos: la
// colección es una sola para toda la app. Una vez ganado, no se pierde —
// rehacer una clase peor no te saca el cromo.
// Devuelve true sólo si el cromo era nuevo: la ceremonia de revelación se
// dispara con eso, así rehacer una clase no fabrica recompensas falsas.
export function ganarCromo(slug) {
  let nuevo = false;
  progress.update((p) => {
    if (p.cromos && p.cromos[slug]) return p;
    nuevo = true;
    return { ...p, cromos: { ...(p.cromos || {}), [slug]: Date.now() } };
  });
  return nuevo;
}

export function cromosGanados(p) {
  return p.cromos || {};
}

// ¿Están completas TODAS las clases 1..total de un curso? Sólo mira
// `done` guardado por clase — no necesita el contenido del curso cargado.
function cursoCompleto(p, courseId) {
  const total = COURSES.find((c) => c.id === courseId)?.total || 0;
  if (!total) return false;
  for (let n = 1; n <= total; n += 1) {
    if (!classStateOf(p, n, courseId).done) return false;
  }
  return true;
}

// ¿Está en 3★ TODA una lista de clases de un curso?
function todasA3Estrellas(p, courseId, clases) {
  return clases.every((n) => classStateOf(p, n, courseId).stars >= 3);
}

// Si el criterio de `cromo` se cumple AHORA, mirando sólo lo guardado (sin
// contenido de curso cargado en memoria — ver nota de arquitectura en el
// plan: el contenido vive en un cache que no sobrevive un reload, así que
// ningún criterio puede depender de tenerlo).
function criterioCumplido(cromo, p) {
  if (cromo.tipo === "curso") return cursoCompleto(p, cromo.curso);
  if (cromo.tipo === "pensador" || cromo.tipo === "corriente") {
    return todasA3Estrellas(p, cromo.curso, cromo.clases);
  }
  if (cromo.tipo !== "especial") return false;

  switch (cromo.criterio) {
    case "cursosCompletos":
      return COURSES.every((c) => cursoCompleto(p, c.id));
    case "desafioPerfecto": {
      const dia = p.desafio?.dia;
      return !!dia && dia.total > 0 && dia.aciertos === dia.total;
    }
    case "cursoPerfecto":
      return COURSES.some((c) => todasA3Estrellas(p, c.id, range(1, c.total)));
    case "coleccionista":
      return CROMOS_CON_IMG.filter((c) => c.slug !== cromo.slug).every(
        (c) => !!(p.cromos && p.cromos[c.slug])
      );
    default:
      return false;
  }
}

function range(from, to) {
  const out = [];
  for (let n = from; n <= to; n += 1) out.push(n);
  return out;
}

// Recorre los 28 cromos y otorga los que se hayan cumplido y todavía no
// estén ganados. "Coleccionista" va último en `CROMOS_CON_IMG` a propósito:
// así ve, en la misma pasada, los otros 27 recién otorgados. Devuelve los
// que fueron NUEVOS en esta pasada (para la ceremonia de revelación).
export function evaluarCromosGanados() {
  const nuevos = [];
  for (const cromo of CROMOS_CON_IMG) {
    const p = get(progress);
    if (p.cromos && p.cromos[cromo.slug]) continue;
    if (criterioCumplido(cromo, p) && ganarCromo(cromo.slug)) nuevos.push(cromo);
  }
  return nuevos;
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

// % de avance por la card en la que quedaste contra el total (0–100), no por
// preguntas respondidas: entre quizzes hay tramos de sólo lectura, y esos
// también cuentan como avance aunque no sumen ningún acierto.
export function completionPct(p, lecture) {
  const st = classStateOf(p, lecture.num);
  const total = lecture.feed.length + 1; // +1: la portada, la primera slide
  return Math.min(100, Math.round((st.card / total) * 100));
}

// --- desafío diario ---
// El desafío es un juego aparte: NO toca las respuestas de las clases ni los
// cromos. De él se guarda una sola cosa: qué día lo completaste y con cuánto,
// que es lo que apaga o enciende el tilde de la home.

// La fecha local en ISO corto. Local y no UTC a propósito: el "día" del
// desafío tiene que ser el día del usuario, no el del meridiano de Greenwich.
export function hoyISO(d = new Date()) {
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mes}-${dia}`;
}

// El desafío de hoy, si ya lo completaste (o null).
export function desafioDeHoy(p) {
  const dia = p.desafio?.dia;
  return dia && dia.fecha === hoyISO() ? dia : null;
}

// `clase` es { courseId, num, title }: de dónde salieron las preguntas de
// hoy, para poder ofrecer "ir a repasar" desde la tarjeta de cierre aunque
// vuelvas más tarde el mismo día y el desafío ya esté hecho.
export function saveDesafio(aciertos, total, clase) {
  if (!total) return [];
  progress.update((p) => {
    // Por las dudas: si ya había uno de hoy, gana el primero. El desafío se
    // juega una vez.
    if (p.desafio?.dia?.fecha === hoyISO()) return p;
    return { ...p, desafio: { dia: { fecha: hoyISO(), aciertos, total, clase } } };
  });
  return evaluarCromosGanados();
}

// Cursos con algún avance guardado. El desafío los usa para preguntar sobre lo
// que ya viste; si no hay ninguno, entra con todos.
export function cursosEmpezados(p) {
  const cursos = p.courses || {};
  return Object.keys(cursos).filter((id) => Object.keys(cursos[id].classes || {}).length > 0);
}
