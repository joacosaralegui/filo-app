// Curso: Historia intelectual europea desde Nietzsche.
//
// Manifiesto de contenido: el índice de clases y el glosario del curso. El
// registro liviano (título, portada, tema) vive en ../courses.js y carga este
// archivo bajo demanda.
//
// NUMERACIÓN: `num` (app) está desacoplado de `transcript` (carpeta
// yale-filosofia/transcripciones). Se omite la Clase 1 original ("Introducción
// al curso"), así que num = transcript - 1. Ver nota en clase02.js.
//
// `content`: el feed de la clase si ya está disponible; null si está bloqueada.
// Para habilitar una clase, importá su archivo de contenido y asignálo acá.

import { GLOSSARY } from "./glossary.js";
import clase01 from "./clase02.js"; // app Clase 1 = transcripción 2
import clase02 from "./clase03.js"; // app Clase 2 = transcripción 3
import clase03 from "./clase04.js"; // app Clase 3 = transcripción 4
import clase04 from "./clase05.js"; // app Clase 4 = transcripción 5
import clase05 from "./clase06.js"; // app Clase 5 = transcripción 6
import clase06 from "./clase07.js"; // app Clase 6 = transcripción 7
import clase07 from "./clase08.js"; // app Clase 7 = transcripción 8
import clase08 from "./clase09.js"; // app Clase 8 = transcripción 9
import clase09 from "./clase10.js"; // app Clase 9 = transcripción 10
import clase10 from "./clase11.js"; // app Clase 10 = transcripción 11
import clase11 from "./clase12.js"; // app Clase 11 = transcripción 12
import clase12 from "./clase13.js"; // app Clase 12 = transcripción 13
import clase13 from "./clase14.js"; // app Clase 13 = transcripción 14
import clase14 from "./clase15.js"; // app Clase 14 = transcripción 15
import clase15 from "./clase16.js"; // app Clase 15 = transcripción 16
import clase16 from "./clase17.js"; // app Clase 16 = transcripción 17
import clase17 from "./clase18.js"; // app Clase 17 = transcripción 18
import clase18 from "./clase19.js"; // app Clase 18 = transcripción 19
import clase19 from "./clase20.js"; // app Clase 19 = transcripción 20
import clase20 from "./clase21.js"; // app Clase 20 = transcripción 21
import clase21 from "./clase22.js"; // app Clase 21 = transcripción 22
import clase22 from "./clase23.js"; // app Clase 22 = transcripción 23
import clase23 from "./clase24.js"; // app Clase 23 = transcripción 24
import clase24 from "./clase25.js"; // app Clase 24 = transcripción 25

export const classes = [
  { num: 1, transcript: 2, title: "La herencia de la Ilustración", era: "Ilustración", content: clase01 },
  { num: 2, transcript: 3, title: "El legado del Romanticismo", era: "Romanticismo", content: clase02 },
  { num: 3, transcript: 4, title: "Hegel y el cronotopo historicista", era: "Idealismo", content: clase03 },
  { num: 4, transcript: 5, title: "El marxismo", era: "Materialismo", content: clase04 },
  { num: 5, transcript: 6, title: "Nietzsche y la muerte de Dios", era: "Vitalismo", content: clase05 },
  { num: 6, transcript: 7, title: "Bergson: la revuelta contra el positivismo", era: "Vitalismo", content: clase06 },
  { num: 7, transcript: 8, title: "El leninismo: acelerar la historia", era: "Materialismo", content: clase07 },
  { num: 8, transcript: 9, title: "El psicoanálisis freudiano", era: "El sujeto", content: clase08 },
  { num: 9, transcript: 10, title: "El modernismo y la vanguardia", era: "Modernismo", content: clase09 },
  { num: 10, transcript: 11, title: "La fenomenología", era: "Fenomenología", content: clase10 },
  { num: 11, transcript: 12, title: "El existencialismo heideggeriano", era: "Existencialismo", content: clase11 },
  { num: 12, transcript: 13, title: "El existencialismo francés", era: "Existencialismo", content: clase12 },
  { num: 13, transcript: 14, title: "La Escuela de Frankfurt", era: "Teoría crítica", content: clase13 },
  { num: 14, transcript: 15, title: "Hannah Arendt: totalitarismo y el mal", era: "Teoría política", content: clase14 },
  { num: 15, transcript: 16, title: "El segundo sexo (Simone de Beauvoir)", era: "Existencialismo", content: clase15 },
  { num: 16, transcript: 17, title: "Los hijos de Husserl: en busca del otro", era: "Fenomenología", content: clase16 },
  { num: 17, transcript: 18, title: "Marxismo revisionista y existencialismo", era: "Materialismo", content: clase17 },
  { num: 18, transcript: 19, title: "Estructuralismo y antropología", era: "Estructuralismo", content: clase18 },
  { num: 19, transcript: 20, title: "La violencia y lo sagrado: René Girard", era: "Estructuralismo", content: clase19 },
  { num: 20, transcript: 21, title: "Poder y arqueología: Michel Foucault", era: "Posestructuralismo", content: clase20 },
  { num: 21, transcript: 22, title: "Derrida y la deconstrucción", era: "Posestructuralismo", content: clase21 },
  { num: 22, transcript: 23, title: "«Antipolítica» y la filosofía de la disidencia", era: "Disidencia", content: clase22 },
  { num: 23, transcript: 24, title: "La controversia Heidegger", era: "Existencialismo", content: clase23 },
  { num: 24, transcript: 25, title: "De la modernidad a la posmodernidad", era: "Posmodernidad", content: clase24 },
];

export default { classes, glossary: GLOSSARY };
