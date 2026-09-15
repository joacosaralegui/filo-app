// Cromos: colección de 28 logros, separada de las clases (ver
// `classImages.js` para la ilustración de progreso de cada clase).
//
// Antes había un cromo por clase (59, uno a uno con el tracker de
// progreso). Ahora cada cromo premia una acción distinta, en 5 tipos:
//
//   "curso"     — terminar TODAS las clases de un curso.
//   "pensador"  — 3★ en TODAS las `clases` listadas (un mismo autor).
//                 `rareza: "deepdive"` cuando son varias clases seguidas
//                 del mismo pensador (Platón, Aristóteles, Kant,
//                 Heidegger); `"easy"` cuando es una sola clase pero el
//                 nombre pide estar en el álbum igual.
//   "corriente" — 3★ en TODAS las `clases` listadas (una era/movimiento,
//                 ver el campo `era` de cada `curso.js`).
//   "especial"  — logro transversal, evaluado por `criterio` en
//                 `lib/progress.js` (no depende de una lista de clases).
//
// `slug`        clave estable, y nombre del archivo en
//               src/assets/cromos/<slug>.webp (el tipo "curso" es la
//               excepción: resuelve contra `courseIcons`, no contra este
//               pool — ver `lib/cromos.js`).
// `descripcion` texto fijo de la ficha ("¿cómo se gana?"), en forma de
//               instrucción ("Para desbloquear este cromo debés...").
//               Escrito a mano porque nombrar a los pensadores de una
//               corriente no se puede derivar del progreso guardado sin
//               cargar el contenido del curso — más simple tenerlo curado
//               acá.
//
// Ningún cromo repite imagen con otro: cada slug aparece una sola vez acá,
// aunque SÍ puede repetirse con `classImages.js` (la misma lámina sirve de
// ilustración de una clase Y de cromo de otra cosa, a propósito).

export const CROMOS = [
  // ---------- Filosofía antigua ----------
  {
    slug: "antigua-completa",
    nombre: "Antigua",
    tipo: "curso",
    curso: "antigua",
    descripcion: "Para desbloquear este cromo debés completar todas las clases del curso de Filosofía Antigua.",
  },
  {
    slug: "platon",
    nombre: "Platón",
    tipo: "pensador",
    rareza: "deepdive",
    curso: "antigua",
    clases: [5, 6, 7, 8, 9],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en las 5 clases de Platón.",
  },
  {
    slug: "aristoteles",
    nombre: "Aristóteles",
    tipo: "pensador",
    rareza: "deepdive",
    curso: "antigua",
    clases: [10, 11, 12, 13],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en las 4 clases de Aristóteles.",
  },
  {
    slug: "homero",
    nombre: "Homero",
    tipo: "pensador",
    rareza: "easy",
    curso: "antigua",
    clases: [2],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en la clase de Homero.",
  },
  {
    slug: "socrates",
    nombre: "Sócrates",
    tipo: "pensador",
    rareza: "easy",
    curso: "antigua",
    clases: [4],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en la clase de Sócrates.",
  },
  {
    slug: "sofistas",
    nombre: "Presocráticos",
    tipo: "corriente",
    curso: "antigua",
    clases: [1, 2],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en physis/arché y en Homero.",
  },
  {
    slug: "placer-bien-entendido",
    nombre: "Helenismo",
    tipo: "corriente",
    curso: "antigua",
    clases: [14, 15, 16],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en Epicuro, los estoicos y los escépticos.",
  },

  // ---------- Filosofía moderna ----------
  {
    slug: "moderna-completa",
    nombre: "Moderna",
    tipo: "curso",
    curso: "moderna",
    descripcion: "Para desbloquear este cromo debés completar todas las clases del curso de Filosofía Moderna.",
  },
  {
    slug: "kant",
    nombre: "Kant",
    tipo: "pensador",
    rareza: "deepdive",
    curso: "moderna",
    clases: [14, 15],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en las 2 clases de Kant.",
  },
  {
    slug: "descartes",
    nombre: "Descartes",
    tipo: "pensador",
    rareza: "easy",
    curso: "moderna",
    clases: [3],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en la clase de Descartes.",
  },
  {
    slug: "marx",
    nombre: "Marx",
    tipo: "pensador",
    rareza: "easy",
    curso: "moderna",
    clases: [21],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en la clase de Marx.",
  },
  {
    slug: "nueva-ciencia-medallon",
    nombre: "Racionalismo",
    tipo: "corriente",
    curso: "moderna",
    clases: [3, 4, 7],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en Descartes, Spinoza y Leibniz.",
  },
  {
    slug: "librepensamiento-medallon",
    nombre: "Empirismo",
    tipo: "corriente",
    curso: "moderna",
    clases: [8, 9],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en Locke y Hume.",
  },
  {
    slug: "aufklarung-medallon",
    nombre: "Ilustración",
    tipo: "corriente",
    curso: "moderna",
    clases: [10, 11, 12, 13, 15],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en las 5 clases de la Ilustración.",
  },
  {
    slug: "metacritica-medallon",
    nombre: "Idealismo alemán",
    tipo: "corriente",
    curso: "moderna",
    clases: [17, 18, 20],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en Fichte, Schelling y Hegel.",
  },

  // ---------- Filosofía contemporánea ----------
  {
    slug: "contemporanea-completa",
    nombre: "Contemporánea",
    tipo: "curso",
    curso: "contemporanea",
    descripcion: "Para desbloquear este cromo debés completar todas las clases del curso de Filosofía Contemporánea.",
  },
  {
    slug: "heidegger",
    nombre: "Heidegger",
    tipo: "pensador",
    rareza: "deepdive",
    curso: "contemporanea",
    clases: [7, 19],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en las 2 clases de Heidegger.",
  },
  {
    slug: "nietzsche",
    nombre: "Nietzsche",
    tipo: "pensador",
    rareza: "easy",
    curso: "contemporanea",
    clases: [1],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en la clase de Nietzsche.",
  },
  {
    slug: "sartre",
    nombre: "Sartre",
    tipo: "pensador",
    rareza: "easy",
    curso: "contemporanea",
    clases: [8],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en la clase de Sartre.",
  },
  {
    slug: "foucault",
    nombre: "Foucault",
    tipo: "pensador",
    rareza: "easy",
    curso: "contemporanea",
    clases: [16],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en la clase de Foucault.",
  },
  {
    slug: "chivo-expiatorio-medallon",
    nombre: "Vitalismo",
    tipo: "corriente",
    curso: "contemporanea",
    clases: [1, 2],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en Nietzsche y Bergson.",
  },
  {
    slug: "cosas-mismas-medallon",
    nombre: "Fenomenología",
    tipo: "corriente",
    curso: "contemporanea",
    clases: [6, 12],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en Husserl y sus herederos.",
  },
  {
    slug: "controversia-medallon",
    nombre: "Existencialismo",
    tipo: "corriente",
    curso: "contemporanea",
    clases: [7, 8, 11, 19],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en las 4 clases del existencialismo.",
  },
  {
    slug: "estructura-medallon",
    nombre: "(Pos)estructuralismo",
    tipo: "corriente",
    curso: "contemporanea",
    clases: [14, 15, 16, 17],
    descripcion: "Para desbloquear este cromo debés sacar 3★ en las 4 clases del (pos)estructuralismo.",
  },

  // ---------- Especiales ----------
  {
    slug: "el-uno",
    nombre: "Filósofo completo",
    tipo: "especial",
    criterio: "cursosCompletos",
    descripcion:
      "Para desbloquear este cromo debés terminar los tres cursos: Antigua, Moderna y Contemporánea.",
  },
  {
    slug: "sapere-aude-medallon",
    nombre: "Desafío perfecto",
    tipo: "especial",
    criterio: "desafioPerfecto",
    descripcion: "Para desbloquear este cromo debés sacar puntaje perfecto (7/7) en el Desafío diario.",
  },
  {
    slug: "cosmos-ordenado",
    nombre: "Curso perfecto",
    tipo: "especial",
    criterio: "cursoPerfecto",
    descripcion:
      "Para desbloquear este cromo debés sacar 3★ en TODAS las clases de un mismo curso, el que sea.",
  },
  {
    slug: "posmodernidad-medallon",
    nombre: "Coleccionista",
    tipo: "especial",
    criterio: "coleccionista",
    descripcion: "Para desbloquear este cromo debés reunir los otros 27 cromos de la colección.",
  },
];
