// Índice de clases de la app.
//
// NUMERACIÓN: `num` (app) está desacoplado de `transcript` (carpeta
// yale-filosofia/transcripciones). Se omite la Clase 1 original ("Introducción
// al curso"), así que num = transcript - 1. Ver nota en clase02.js.
//
// `content`: el feed de la clase si ya está disponible; null si está bloqueada.
// Para habilitar una clase, importá su archivo de contenido y asignálo acá.

import clase01 from "./clase02.js"; // app Clase 1 = transcripción 2

export const CLASSES = [
  { num: 1, transcript: 2, title: "La herencia de la Ilustración", era: "Ilustración", content: clase01 },
  { num: 2, transcript: 3, title: "El legado del Romanticismo", era: "Romanticismo", content: null },
  { num: 3, transcript: 4, title: "Hegel y el cronotopo historicista", era: "Idealismo", content: null },
  { num: 4, transcript: 5, title: "El marxismo", era: "Materialismo", content: null },
  { num: 5, transcript: 6, title: "Nietzsche y la muerte de Dios", era: "Vitalismo", content: null },
  { num: 6, transcript: 7, title: "Bergson: la revuelta contra el positivismo", era: "Vitalismo", content: null },
  { num: 7, transcript: 8, title: "El leninismo: acelerar la historia", era: "Materialismo", content: null },
  { num: 8, transcript: 9, title: "El psicoanálisis freudiano", era: "El sujeto", content: null },
  { num: 9, transcript: 10, title: "El modernismo y la vanguardia", era: "Modernismo", content: null },
  { num: 10, transcript: 11, title: "La fenomenología", era: "Fenomenología", content: null },
  { num: 11, transcript: 12, title: "El existencialismo heideggeriano", era: "Existencialismo", content: null },
  { num: 12, transcript: 13, title: "El existencialismo francés", era: "Existencialismo", content: null },
  { num: 13, transcript: 14, title: "La Escuela de Frankfurt", era: "Teoría crítica", content: null },
  { num: 14, transcript: 15, title: "Hannah Arendt: totalitarismo y el mal", era: "Teoría política", content: null },
  { num: 15, transcript: 16, title: "El segundo sexo (Simone de Beauvoir)", era: "Existencialismo", content: null },
  { num: 16, transcript: 17, title: "Los hijos de Husserl: en busca del otro", era: "Fenomenología", content: null },
  { num: 17, transcript: 18, title: "Marxismo revisionista y existencialismo", era: "Materialismo", content: null },
  { num: 18, transcript: 19, title: "Estructuralismo y antropología", era: "Estructuralismo", content: null },
  { num: 19, transcript: 20, title: "La violencia y lo sagrado: René Girard", era: "Estructuralismo", content: null },
  { num: 20, transcript: 21, title: "Poder y arqueología: Michel Foucault", era: "Posestructuralismo", content: null },
  { num: 21, transcript: 22, title: "Derrida y la deconstrucción", era: "Posestructuralismo", content: null },
  { num: 22, transcript: 23, title: "«Antipolítica» y la filosofía de la disidencia", era: "Disidencia", content: null },
  { num: 23, transcript: 24, title: "La controversia Heidegger", era: "Existencialismo", content: null },
  { num: 24, transcript: 25, title: "De la modernidad a la posmodernidad", era: "Posmodernidad", content: null },
];
