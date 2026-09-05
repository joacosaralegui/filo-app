// Curso: Historia de las ideas en la modernidad.
//
// Manifiesto de contenido: el índice de clases y el glosario del curso. El
// registro liviano (título, portada, tema) vive en ../courses.js y carga este
// archivo bajo demanda.
//
// NUMERACIÓN: a diferencia de `nietzsche`, acá `num` == `transcript`: los md de
// `../../../../filosofia/master/him-transcripciones/` ya están numerados como la
// app. Por eso el generador se corre con `--offset=0`.
//
// `content`: el feed de la clase si ya está disponible; null si está bloqueada.
// Para habilitar una clase, importá su archivo de contenido y asignálo acá.

import { GLOSSARY } from "./glossary.js";
import clase01 from "./clase01.js";
import clase02 from "./clase02.js";
import clase03 from "./clase03.js";
import clase04 from "./clase04.js";
import clase05 from "./clase05.js";
import clase06 from "./clase06.js";
import clase07 from "./clase07.js";
import clase08 from "./clase08.js";
import clase09 from "./clase09.js";
import clase10 from "./clase10.js";
import clase11 from "./clase11.js";
import clase12 from "./clase12.js";
import clase13 from "./clase13.js";
import clase14 from "./clase14.js";
import clase15 from "./clase15.js";
import clase16 from "./clase16.js";

export const classes = [
  { num: 1,  transcript: 1,  title: "Las raíces de la filosofía moderna", era: "Renacimiento", content: clase01 },
  { num: 2,  transcript: 2,  title: "La nueva ciencia: la matematización de la naturaleza", era: "Revolución científica", content: clase02 },
  { num: 3,  transcript: 3,  title: "Descartes: la duda y Dios como garante", era: "Racionalismo", content: clase03 },
  { num: 4,  transcript: 4,  title: "Mecanicismo y geometría moral: Pascal y Spinoza", era: "Racionalismo", content: clase04 },
  { num: 5,  transcript: 5,  title: "El individuo en la filosofía política moderna", era: "Política moderna", content: clase05 },
  { num: 6,  transcript: 6,  title: "Del estado de naturaleza al contrato", era: "Política moderna", content: clase06 },
  { num: 7,  transcript: 7,  title: "El racionalismo: ideas innatas y Leibniz", era: "Racionalismo", content: clase07 },
  { num: 8,  transcript: 8,  title: "El empirismo inglés: Bacon, Locke, Berkeley", era: "Empirismo", content: clase08 },
  { num: 9,  transcript: 9,  title: "Hume: hábito y conexión necesaria", era: "Empirismo", content: clase09 },
  { num: 10, transcript: 10, title: "El surgimiento de la Ilustración en Inglaterra", era: "Ilustración", content: clase10 },
  { num: 11, transcript: 11, title: "La Ilustración francesa: Voltaire y la Enciclopedia", era: "Ilustración", content: clase11 },
  { num: 12, transcript: 12, title: "La Aufklärung alemana y Mendelssohn", era: "Ilustración", content: clase12 },
  { num: 13, transcript: 13, title: "Lessing y la educación del género humano", era: "Ilustración", content: clase13 },
  { num: 14, transcript: 14, title: "Kant: el giro copernicano", era: "Idealismo trascendental", content: clase14 },
  { num: 15, transcript: 15, title: "Kant y la salida de la minoría de edad", era: "Ilustración", content: clase15 },
  { num: 16, transcript: 16, title: "Hamann y la metacrítica de la razón", era: "Crítica de la Ilustración", content: clase16 },
];

export default { classes, glossary: GLOSSARY };
