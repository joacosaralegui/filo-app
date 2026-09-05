// Registro de cursos.
//
// Cada entrada es un manifiesto LIVIANO: sólo lo que necesita la pantalla de
// selección. El contenido (clases + glosario) se carga bajo demanda con
// `load()`, así el bundle inicial no arrastra los cursos que no se abren.
//
// Para sumar un curso: creá `src/content/<id>/` con sus `claseNN.js`, su
// `glossary.js` y un `curso.js` que exporte `{ classes, glossary }`, y agregá
// acá su entrada. No hay nada más que tocar.
//
// Campos:
//   id       : slug estable (además es la clave del progreso guardado)
//   title    : título del curso
//   subtitle : segunda línea del hero (se muestra en el color de acento)
//   blurb    : una frase de qué recorre el curso (pantalla de selección)
//   period   : período histórico que recorre el curso, para la mini
//              infografía de la home del curso (opcional)
//   source   : { label, url } de la fuente original (opcional)
//   theme    : overrides de tokens de global.css (opcional), p. ej.
//              { "--accent": "#7b4b94" }. Se aplican al entrar al curso.
//   numOffset: desfasaje entre el `transcript` del md y el `num` de la app
//              (default -1, la regla de `nietzsche`, que omite su Clase 1)
//   load     : () => import("./<id>/curso.js")

export const COURSES = [
  {
    id: "nietzsche",
    title: "Contemporánea",
    subtitle: "desde Nietzsche",
    blurb: "De la herencia de la Ilustración a la posmodernidad.",
    period: "Siglos XVIII–XX",
    source: {
      label: "European Intellectual History since Nietzsche",
      url: "https://www.youtube.com/playlist?list=PLh9mgdi4rNezUjm7niGdUWjnL0lHSDh0U",
    },
    // Color de marca del curso (Fern, la base de la paleta): explícito acá
    // para que el catálogo pueda mostrarlo SIN cargar el curso.
    theme: { "--accent": "#606c38", "--burst-colors": "#606c38, #dda15e, #bc6c25, #8aa04a, #e9c48a" },
    load: () => import("./nietzsche/curso.js"),
  },
  {
    id: "modernidad",
    title: "Moderna",
    subtitle: "de Montaigne a Hamann",
    blurb: "Los siglos XVII y XVIII: de la Reforma a la crisis de la Ilustración.",
    period: "Siglos XVI–XVIII",
    source: {
      label: "Historia de las ideas en la modernidad — Maestría en Filosofía, UNQ",
      url: "",
    },
    theme: { "--accent": "#b0763a", "--burst-colors": "#b0763a, #d99b57, #8f5b26, #e8c48a, #c98a4a" },
    numOffset: 0,
    load: () => import("./modernidad/curso.js"),
  },
];

export const findCourse = (id) => COURSES.find((c) => c.id === id) || null;
