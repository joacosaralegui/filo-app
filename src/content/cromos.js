// Álbum de cromos: exactamente uno por clase.
//
// Cada clase ancla un cromo, así toda clase premia algo. Donde la clase gira
// alrededor de un pensador, el cromo es su retrato; donde es un tema o una
// discusión, es una idea (ver CROMOS.md para las descripciones de arte).
//
// `slug`  clave estable, y nombre del archivo en src/assets/cromos/<slug>.webp
//         (los que todavía no tienen arte se muestran con un placeholder)
// `curso` + `clase`  la clase que lo desbloquea al sacar 3 estrellas
// `tipo`  "autor" | "idea" — sólo para matizar la ficha del cromo

export const CROMOS = [
  // ---------- Moderna ----------
  { slug: "montaigne", nombre: "Michel de Montaigne", tipo: "autor", curso: "modernidad", clase: 1 },
  { slug: "nueva-ciencia", nombre: "La matematización de la naturaleza", tipo: "idea", curso: "modernidad", clase: 2 },
  { slug: "descartes", nombre: "René Descartes", tipo: "autor", curso: "modernidad", clase: 3 },
  { slug: "spinoza", nombre: "Baruch Spinoza", tipo: "autor", curso: "modernidad", clase: 4 },
  { slug: "hobbes", nombre: "Thomas Hobbes", tipo: "autor", curso: "modernidad", clase: 5 },
  { slug: "rousseau", nombre: "Jean-Jacques Rousseau", tipo: "autor", curso: "modernidad", clase: 6 },
  { slug: "leibniz", nombre: "G. W. Leibniz", tipo: "autor", curso: "modernidad", clase: 7 },
  { slug: "locke", nombre: "John Locke", tipo: "autor", curso: "modernidad", clase: 8 },
  { slug: "hume", nombre: "David Hume", tipo: "autor", curso: "modernidad", clase: 9 },
  { slug: "librepensamiento", nombre: "El librepensamiento", tipo: "idea", curso: "modernidad", clase: 10 },
  { slug: "voltaire", nombre: "Voltaire", tipo: "autor", curso: "modernidad", clase: 11 },
  { slug: "aufklarung", nombre: "Aufklärung", tipo: "idea", curso: "modernidad", clase: 12 },
  { slug: "tres-anillos", nombre: "La parábola de los tres anillos", tipo: "idea", curso: "modernidad", clase: 13 },
  { slug: "kant", nombre: "Immanuel Kant", tipo: "autor", curso: "modernidad", clase: 14 },
  { slug: "sapere-aude", nombre: "Sapere aude", tipo: "idea", curso: "modernidad", clase: 15 },
  { slug: "metacritica", nombre: "La metacrítica de la razón", tipo: "idea", curso: "modernidad", clase: 16 },

  // ---------- Contemporánea ----------
  { slug: "herencia", nombre: "La herencia", tipo: "idea", curso: "nietzsche", clase: 1 },
  { slug: "romanticismo", nombre: "El Romanticismo", tipo: "idea", curso: "nietzsche", clase: 2 },
  { slug: "hegel", nombre: "G. W. F. Hegel", tipo: "autor", curso: "nietzsche", clase: 3 },
  { slug: "marx", nombre: "Karl Marx", tipo: "autor", curso: "nietzsche", clase: 4 },
  { slug: "nietzsche", nombre: "Friedrich Nietzsche", tipo: "autor", curso: "nietzsche", clase: 5 },
  { slug: "bergson", nombre: "Henri Bergson", tipo: "autor", curso: "nietzsche", clase: 6 },
  { slug: "acelerar-historia", nombre: "Acelerar la historia", tipo: "idea", curso: "nietzsche", clase: 7 },
  { slug: "freud", nombre: "Sigmund Freud", tipo: "autor", curso: "nietzsche", clase: 8 },
  { slug: "vanguardia", nombre: "La vanguardia", tipo: "idea", curso: "nietzsche", clase: 9 },
  { slug: "cosas-mismas", nombre: "A las cosas mismas", tipo: "idea", curso: "nietzsche", clase: 10 },
  { slug: "heidegger", nombre: "Martin Heidegger", tipo: "autor", curso: "nietzsche", clase: 11 },
  { slug: "sartre", nombre: "Jean-Paul Sartre", tipo: "autor", curso: "nietzsche", clase: 12 },
  { slug: "teoria-critica", nombre: "La teoría crítica", tipo: "idea", curso: "nietzsche", clase: 13 },
  { slug: "arendt", nombre: "Hannah Arendt", tipo: "autor", curso: "nietzsche", clase: 14 },
  { slug: "beauvoir", nombre: "Simone de Beauvoir", tipo: "autor", curso: "nietzsche", clase: 15 },
  { slug: "rostro-del-otro", nombre: "El rostro del otro", tipo: "idea", curso: "nietzsche", clase: 16 },
  { slug: "praxis", nombre: "La praxis", tipo: "idea", curso: "nietzsche", clase: 17 },
  { slug: "estructura", nombre: "La estructura", tipo: "idea", curso: "nietzsche", clase: 18 },
  { slug: "chivo-expiatorio", nombre: "El chivo expiatorio", tipo: "idea", curso: "nietzsche", clase: 19 },
  { slug: "foucault", nombre: "Michel Foucault", tipo: "autor", curso: "nietzsche", clase: 20 },
  { slug: "deconstruccion", nombre: "La deconstrucción", tipo: "idea", curso: "nietzsche", clase: 21 },
  { slug: "vivir-en-la-verdad", nombre: "Vivir en la verdad", tipo: "idea", curso: "nietzsche", clase: 22 },
  { slug: "controversia", nombre: "La controversia", tipo: "idea", curso: "nietzsche", clase: 23 },
  { slug: "posmodernidad", nombre: "La posmodernidad", tipo: "idea", curso: "nietzsche", clase: 24 },
];
