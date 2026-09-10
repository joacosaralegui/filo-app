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
  // ---------- Filosofía moderna ----------
  { slug: "montaigne", nombre: "Michel de Montaigne", tipo: "autor", curso: "moderna", clase: 1 },
  { slug: "nueva-ciencia", nombre: "La matematización de la naturaleza", tipo: "idea", curso: "moderna", clase: 2 },
  { slug: "descartes", nombre: "René Descartes", tipo: "autor", curso: "moderna", clase: 3 },
  { slug: "spinoza", nombre: "Baruch Spinoza", tipo: "autor", curso: "moderna", clase: 4 },
  { slug: "hobbes", nombre: "Thomas Hobbes", tipo: "autor", curso: "moderna", clase: 5 },
  { slug: "rousseau", nombre: "Jean-Jacques Rousseau", tipo: "autor", curso: "moderna", clase: 6 },
  { slug: "leibniz", nombre: "G. W. Leibniz", tipo: "autor", curso: "moderna", clase: 7 },
  { slug: "locke", nombre: "John Locke", tipo: "autor", curso: "moderna", clase: 8 },
  { slug: "hume", nombre: "David Hume", tipo: "autor", curso: "moderna", clase: 9 },
  { slug: "librepensamiento", nombre: "El librepensamiento", tipo: "idea", curso: "moderna", clase: 10 },
  { slug: "voltaire", nombre: "Voltaire", tipo: "autor", curso: "moderna", clase: 11 },
  { slug: "aufklarung", nombre: "Aufklärung", tipo: "idea", curso: "moderna", clase: 12 },
  { slug: "tres-anillos", nombre: "La parábola de los tres anillos", tipo: "idea", curso: "moderna", clase: 13 },
  { slug: "kant", nombre: "Immanuel Kant", tipo: "autor", curso: "moderna", clase: 14 },
  { slug: "sapere-aude", nombre: "Sapere aude", tipo: "idea", curso: "moderna", clase: 15 },
  { slug: "metacritica", nombre: "La metacrítica de la razón", tipo: "idea", curso: "moderna", clase: 16 },
  { slug: "fichte", nombre: "Johann Gottlieb Fichte", tipo: "autor", curso: "moderna", clase: 17 },
  { slug: "schelling", nombre: "F. W. J. Schelling", tipo: "autor", curso: "moderna", clase: 18 },
  { slug: "romanticismo", nombre: "El Romanticismo", tipo: "idea", curso: "moderna", clase: 19 },
  { slug: "hegel", nombre: "G. W. F. Hegel", tipo: "autor", curso: "moderna", clase: 20 },
  { slug: "marx", nombre: "Karl Marx", tipo: "autor", curso: "moderna", clase: 21 },

  // ---------- Filosofía contemporánea ----------
  { slug: "nietzsche", nombre: "Friedrich Nietzsche", tipo: "autor", curso: "contemporanea", clase: 1 },
  { slug: "bergson", nombre: "Henri Bergson", tipo: "autor", curso: "contemporanea", clase: 2 },
  { slug: "acelerar-historia", nombre: "Acelerar la historia", tipo: "idea", curso: "contemporanea", clase: 3 },
  { slug: "freud", nombre: "Sigmund Freud", tipo: "autor", curso: "contemporanea", clase: 4 },
  { slug: "vanguardia", nombre: "La vanguardia", tipo: "idea", curso: "contemporanea", clase: 5 },
  { slug: "cosas-mismas", nombre: "A las cosas mismas", tipo: "idea", curso: "contemporanea", clase: 6 },
  { slug: "heidegger", nombre: "Martin Heidegger", tipo: "autor", curso: "contemporanea", clase: 7 },
  { slug: "sartre", nombre: "Jean-Paul Sartre", tipo: "autor", curso: "contemporanea", clase: 8 },
  { slug: "teoria-critica", nombre: "La teoría crítica", tipo: "idea", curso: "contemporanea", clase: 9 },
  { slug: "arendt", nombre: "Hannah Arendt", tipo: "autor", curso: "contemporanea", clase: 10 },
  { slug: "beauvoir", nombre: "Simone de Beauvoir", tipo: "autor", curso: "contemporanea", clase: 11 },
  { slug: "rostro-del-otro", nombre: "El rostro del otro", tipo: "idea", curso: "contemporanea", clase: 12 },
  { slug: "praxis", nombre: "La praxis", tipo: "idea", curso: "contemporanea", clase: 13 },
  { slug: "estructura", nombre: "La estructura", tipo: "idea", curso: "contemporanea", clase: 14 },
  { slug: "chivo-expiatorio", nombre: "El chivo expiatorio", tipo: "idea", curso: "contemporanea", clase: 15 },
  { slug: "foucault", nombre: "Michel Foucault", tipo: "autor", curso: "contemporanea", clase: 16 },
  { slug: "deconstruccion", nombre: "La deconstrucción", tipo: "idea", curso: "contemporanea", clase: 17 },
  { slug: "vivir-en-la-verdad", nombre: "Vivir en la verdad", tipo: "idea", curso: "contemporanea", clase: 18 },
  { slug: "controversia", nombre: "La controversia", tipo: "idea", curso: "contemporanea", clase: 19 },
  { slug: "posmodernidad", nombre: "La posmodernidad", tipo: "idea", curso: "contemporanea", clase: 20 },
];
