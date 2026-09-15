// Ilustración de cada clase: pura decoración de progreso, sin ligar a
// ningún logro. Es la misma imagen que antes duplicaba de cromo — acá vive
// suelta de esa lógica, así se puede reusar en los dos lugares sin que
// "ganar el cromo" y "ver la lámina de la clase" sean la misma cosa.
//
// `slug`  nombre del archivo en src/assets/cromos/<slug>.webp (el pool de
//         arte es compartido con los cromos: no hay carpeta aparte).
// `curso` + `clase`  a qué clase decora.
//
// Un slug puede repetirse entre clases (Aristóteles ilustra 3 clases
// seguidas): es la imagen DE LA CLASE, no un cromo, así que no hace falta
// que sea única.

export const CLASS_IMAGES = [
  // ---------- Filosofía antigua ----------
  { slug: "arche", curso: "antigua", clase: 1 },
  { slug: "homero", curso: "antigua", clase: 2 },
  { slug: "sofistas", curso: "antigua", clase: 3 },
  { slug: "socrates", curso: "antigua", clase: 4 },
  { slug: "platon", curso: "antigua", clase: 5 },
  { slug: "caverna", curso: "antigua", clase: 6 },
  { slug: "carro-alado", curso: "antigua", clase: 7 },
  { slug: "ciudad-justa", curso: "antigua", clase: 8 },
  { slug: "cosmos-ordenado", curso: "antigua", clase: 9 },
  { slug: "aristoteles", curso: "antigua", clase: 10 },
  { slug: "aristoteles", curso: "antigua", clase: 11 },
  { slug: "alma-forma", curso: "antigua", clase: 12 },
  { slug: "aristoteles", curso: "antigua", clase: 13 },
  { slug: "placer-bien-entendido", curso: "antigua", clase: 14 },
  { slug: "estoicos", curso: "antigua", clase: 15 },
  { slug: "suspension-del-juicio", curso: "antigua", clase: 16 },
  { slug: "el-uno", curso: "antigua", clase: 17 },
  { slug: "padres-iglesia", curso: "antigua", clase: 18 },

  // ---------- Filosofía moderna ----------
  { slug: "montaigne", curso: "moderna", clase: 1 },
  { slug: "nueva-ciencia", curso: "moderna", clase: 2 },
  { slug: "descartes", curso: "moderna", clase: 3 },
  { slug: "spinoza", curso: "moderna", clase: 4 },
  { slug: "hobbes", curso: "moderna", clase: 5 },
  { slug: "rousseau", curso: "moderna", clase: 6 },
  { slug: "leibniz", curso: "moderna", clase: 7 },
  { slug: "locke", curso: "moderna", clase: 8 },
  { slug: "hume", curso: "moderna", clase: 9 },
  { slug: "librepensamiento", curso: "moderna", clase: 10 },
  { slug: "voltaire", curso: "moderna", clase: 11 },
  { slug: "aufklarung", curso: "moderna", clase: 12 },
  { slug: "tres-anillos", curso: "moderna", clase: 13 },
  { slug: "kant", curso: "moderna", clase: 14 },
  { slug: "sapere-aude", curso: "moderna", clase: 15 },
  { slug: "metacritica", curso: "moderna", clase: 16 },
  { slug: "fichte", curso: "moderna", clase: 17 },
  { slug: "schelling", curso: "moderna", clase: 18 },
  { slug: "romanticismo", curso: "moderna", clase: 19 },
  { slug: "hegel", curso: "moderna", clase: 20 },
  { slug: "marx", curso: "moderna", clase: 21 },

  // ---------- Filosofía contemporánea ----------
  { slug: "nietzsche", curso: "contemporanea", clase: 1 },
  { slug: "bergson", curso: "contemporanea", clase: 2 },
  { slug: "acelerar-historia", curso: "contemporanea", clase: 3 },
  { slug: "freud", curso: "contemporanea", clase: 4 },
  { slug: "vanguardia", curso: "contemporanea", clase: 5 },
  { slug: "cosas-mismas", curso: "contemporanea", clase: 6 },
  { slug: "heidegger", curso: "contemporanea", clase: 7 },
  { slug: "sartre", curso: "contemporanea", clase: 8 },
  { slug: "teoria-critica", curso: "contemporanea", clase: 9 },
  { slug: "arendt", curso: "contemporanea", clase: 10 },
  { slug: "beauvoir", curso: "contemporanea", clase: 11 },
  { slug: "rostro-del-otro", curso: "contemporanea", clase: 12 },
  { slug: "praxis", curso: "contemporanea", clase: 13 },
  { slug: "estructura", curso: "contemporanea", clase: 14 },
  { slug: "chivo-expiatorio", curso: "contemporanea", clase: 15 },
  { slug: "foucault", curso: "contemporanea", clase: 16 },
  { slug: "deconstruccion", curso: "contemporanea", clase: 17 },
  { slug: "vivir-en-la-verdad", curso: "contemporanea", clase: 18 },
  { slug: "controversia", curso: "contemporanea", clase: 19 },
  { slug: "posmodernidad", curso: "contemporanea", clase: 20 },
];
