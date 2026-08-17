// PLANTILLA de clase. Copiá este archivo a claseNN.js (NN = num con cero) y
// completá. Guía completa en ../../CONTENIDO.md. Referencia viva: clase02.js.
//
// Recordá: transcript = num + 1.

export default {
  num: 0,            // número en la app
  transcript: 0,     // número de la transcripción original
  title: "",         // título de la clase
  source: "",        // URL del video/playlist
  feed: [
    // --- una card de info resume una idea de la clase ---
    {
      type: "info",
      tag: "Panorama",
      title: "",
      body: "", // resumen fiel, 40–70 palabras, tono sobrio
    },

    // --- una card de quiz pone a prueba lo anterior ---
    {
      type: "quiz",
      question: "",
      options: ["", "", "", ""],
      answer: 0, // índice 0-based de la opción correcta
      explain: "", // por qué, en 1–2 frases
    },

    // ...seguí intercalando: ~2 infos y después sus quizzes.
    // Cerrá con una card de info de síntesis.
  ],
};
