// Registro de cursos.
//
// Cada entrada es un manifiesto LIVIANO: sólo lo que necesita la pantalla de
// selección. El contenido (las clases) se carga bajo demanda con
// `load()`, así el bundle inicial no arrastra los cursos que no se abren.
//
// Para sumar un curso: creá `src/content/<id>/` con sus `claseNN.js` y un
// `curso.js` que exporte `{ classes }`, y agregá acá su entrada. El glosario es
// uno solo para todos los cursos (`src/content/glossary.js`).
//
// Campos:
//   id       : slug estable (además es la clave del progreso guardado)
//   title    : título del curso
//   subtitle : segunda línea del hero (se muestra en el color de acento)
//   blurb    : una frase de qué recorre el curso (pantalla de selección)
//   source   : { label, url } de la fuente original (opcional)
//   portada  : imagen que representa al curso. Por ahora reusa el slug de un
//              cromo; el día que cada curso tenga arte propio, cambia acá.
//   theme    : overrides de tokens de global.css (opcional), p. ej.
//              { "--accent": "#7b4b94" }. Se aplican al entrar al curso.
//              Hoy ningún curso lo usa: todos comparten la paleta.
//   numOffset: desfasaje entre el `transcript` del md y el `num` de la app
//              (default -1; `contemporanea` usa -5 porque arranca en Nietzsche
//              y `moderna` 0 porque sus md ya están numerados como la app)
//   load     : () => import("./<id>/curso.js")

export const COURSES = [
  {
    id: "antigua",
    title: "Filosofía antigua",
    subtitle: "Del pensamiento griego al cristianismo temprano.",
    blurb: "Platón, Aristóteles y otras grandes figuras de la filosofía occidental.",
    portada: "montaigne",
    source: {
      label: "A History of Philosophy — Dr. Arthur Holmes, Wheaton College",
      url: "https://biblicalelearning.org/history-of-philosophy-holmes/",
    },
    numOffset: 0,
    load: () => import("./antigua/curso.js"),
  },
  {
    id: "contemporanea",
    title: "Filosofía contemporánea",
    subtitle: "De Nietzsche a hoy",
    blurb: "De la muerte de Dios a la posmodernidad.",
    portada: "herencia",
    source: {
      label: "European Intellectual History since Nietzsche",
      url: "https://www.youtube.com/playlist?list=PLh9mgdi4rNezUjm7niGdUWjnL0lHSDh0U",
    },
    numOffset: -5,
    load: () => import("./contemporanea/curso.js"),
  },
  {
    id: "moderna",
    title: "Filosofía moderna",
    subtitle: "Del siglo XVII a Marx",
    blurb: "De la Reforma al final del idealismo alemán.",
    portada: "nueva-ciencia",
    source: {
      label: "Historia de las ideas en la modernidad — Maestría en Filosofía, UNQ",
      url: "",
    },
    numOffset: 0,
    load: () => import("./moderna/curso.js"),
  },
];

export const findCourse = (id) => COURSES.find((c) => c.id === id) || null;
