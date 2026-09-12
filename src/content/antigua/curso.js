// Curso: Filosofía antigua.
//
// Manifiesto de contenido: el índice de clases del curso. El
// registro liviano (título, portada, tema) vive en ../courses.js y carga este
// archivo bajo demanda.
//
// TEMARIO: 18 clases con programa propio —de los presocráticos al cristianismo
// temprano—, armado cruzando tres programas universitarios reales de Filosofía
// Antigua (UNC Córdoba, UNL, UNCa: ejes en physis/lógos/ousía, nómos vs. phýsis,
// dialéctica y ética) con "A History of Philosophy" del Dr. Arthur Holmes
// (Wheaton College) como fuente de consulta, no como estructura obligatoria: no
// se respetan ni los títulos ni la cantidad de sesiones de Holmes, y varias
// clases (Sócrates con espacio propio, las dos metafísicas de Aristóteles
// fusionadas en una) se reorganizan según lo que pide cada tema.
//
// Presocráticos
//   1. Los presocráticos: physis y arché
//   2. El orden moral antes de la filosofía: de Homero al lógos político
// El giro humano
//   3. Los sofistas: nómos, phýsis y el poder de la palabra
//   4. Sócrates: la pregunta que no se deja responder
// Platón
//   5. Platón: opinión y conocimiento
//   6. Platón: el mundo de las Formas
//   7. Platón: el alma inmortal
//   8. Platón: justicia y la ciudad ideal
//   9. Platón: Dios, cosmos y balance final
// Aristóteles
//   10. Aristóteles: sustancia, causa y las cuatro preguntas
//   11. Aristóteles: el Motor Inmóvil
//   12. Aristóteles: el alma como forma del cuerpo
//   13. Aristóteles: la vida buena y el término medio
// Helenismo
//   14. Epicuro: el placer bien entendido
//   15. Los estoicos: vivir conforme a la razón del cosmos
//   16. Los escépticos: la suspensión del juicio
// Cierre: hacia el cristianismo
//   17. Plotino y el neoplatonismo: el Uno
//   18. El logos griego y los Padres de la Iglesia
//
// MÉTODO: acá no hay script generador. Las cards de info se escriben
// directamente con criterio profesional —no son un resumen de una lecture
// ajena—, citando fuentes primarias con su fragmento Diels-Kranz cuando
// corresponde, y verificando fechas, cronología y traducciones contra la
// Stanford Encyclopedia of Philosophy o Wikipedia cuando hace falta precisión
// que no está clara de memoria.
//
// `transcript` queda solo como referencia informativa a la sesión de Holmes
// más cercana en tema, si la hay (en /home/joaco/joaco/filosofia/holmes-historia-filosofia/);
// null donde la clase fusiona o reordena varias sesiones y no hay una sola
// referencia razonable. No implica que num == transcript, ni que el contenido
// siga la estructura de Holmes.
//
// `content`: el feed de la clase si ya está disponible; null si está bloqueada.
// Para habilitar una clase, importá su archivo de contenido y asignálo acá.

import clase01 from "./clase01.js";
import clase02 from "./clase02.js";
import clase03 from "./clase03.js";
import clase04 from "./clase04.js";
import clase05 from "./clase05.js";

export const classes = [
  { num: 1, transcript: 1, title: "Los presocráticos: physis y arché", era: "Presocráticos", content: clase01 },
  { num: 2, transcript: 2, title: "El orden moral antes de la filosofía: de Homero al lógos político", era: "Presocráticos", content: clase02 },
  { num: 3, transcript: 3, title: "Los sofistas: nómos, phýsis y el poder de la palabra", era: "El giro humano", content: clase03 },
  { num: 4, transcript: null, title: "Sócrates: la pregunta que no se deja responder", era: "El giro humano", content: clase04 },
  { num: 5, transcript: null, title: "Platón: opinión y conocimiento", era: "Platón", content: clase05 }, // ref: Holmes 4
  { num: 6, transcript: null, title: "Platón: el mundo de las Formas", era: "Platón", content: null }, // ref: Holmes 5
  { num: 7, transcript: null, title: "Platón: el alma inmortal", era: "Platón", content: null }, // ref: Holmes 7
  { num: 8, transcript: null, title: "Platón: justicia y la ciudad ideal", era: "Platón", content: null }, // ref: Holmes 8
  { num: 9, transcript: null, title: "Platón: Dios, cosmos y balance final", era: "Platón", content: null }, // ref: Holmes 6 + 9
  { num: 10, transcript: null, title: "Aristóteles: sustancia, causa y las cuatro preguntas", era: "Aristóteles", content: null }, // ref: Holmes 10 + 11
  { num: 11, transcript: null, title: "Aristóteles: el Motor Inmóvil", era: "Aristóteles", content: null }, // ref: Holmes 12
  { num: 12, transcript: null, title: "Aristóteles: el alma como forma del cuerpo", era: "Aristóteles", content: null }, // ref: Holmes 13
  { num: 13, transcript: null, title: "Aristóteles: la vida buena y el término medio", era: "Aristóteles", content: null }, // ref: Holmes 14
  { num: 14, transcript: null, title: "Epicuro: el placer bien entendido", era: "Helenismo", content: null }, // ref: Holmes 15
  { num: 15, transcript: null, title: "Los estoicos: vivir conforme a la razón del cosmos", era: "Helenismo", content: null }, // ref: Holmes 16
  { num: 16, transcript: null, title: "Los escépticos: la suspensión del juicio", era: "Helenismo", content: null }, // ref: Holmes 17
  { num: 17, transcript: null, title: "Plotino y el neoplatonismo: el Uno", era: "Cierre: hacia el cristianismo", content: null }, // ref: Holmes 18
  { num: 18, transcript: null, title: "El logos griego y los Padres de la Iglesia", era: "Cierre: hacia el cristianismo", content: null }, // ref: Holmes 19
];

export default { classes };
