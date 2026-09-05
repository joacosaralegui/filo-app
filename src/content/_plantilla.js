// PLANTILLA de clase. Copiá este archivo a <curso>/claseNN.js y completá.
// Guía completa en ../CONTENIDO.md. Referencia viva: nietzsche/clase02.js.
//
// `transcript` es opcional: sólo lo llevan los cursos armados desde
// transcripciones numeradas (en Nietzsche, transcript = num + 1).

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

    // --- una card de quiz pone a prueba lo anterior (formato POR DEFECTO) ---
    {
      type: "quiz",
      question: "",
      options: ["", "", "", ""],
      answer: 0, // índice 0-based de la opción correcta
      explain: "", // por qué, en 1–2 frases
    },

    // --- CLASIFICAR: para COMPARAR dos períodos / ideas / pensadores ---
    {
      type: "classify",
      question: "", // p. ej. "¿Cada rasgo es de A o de B?"
      groups: ["", ""], // exactamente 2 columnas
      items: [
        { text: "", group: 0 }, // group = índice (0|1) de la columna correcta
        { text: "", group: 1 },
        // …4–6 ítems, idealmente balanceados
      ],
      explain: "",
    },

    // --- CONECTAR: para relaciones MÁS COMPLEJAS (autor ↔ concepto/obra) ---
    {
      type: "match",
      question: "", // p. ej. "Uní cada pensador con su aporte"
      pairs: [
        { left: "", right: "" }, // left = etiqueta corta; right = texto largo
        // …2–5 pares. El par correcto es left[i] ↔ right[i].
      ],
      explain: "",
    },

    // --- RESPUESTA CORTA: el estudiante ESCRIBE un término de memoria ---
    {
      type: "short",
      question: "", // debe tener UNA respuesta de una o dos palabras
      answers: ["", ""], // la 1ª es la canónica (la que se muestra al fallar);
                          // el resto son sinónimos igual de válidos
      explain: "",
    },

    // ...seguí intercalando: ~2 infos y después las cards que las evalúan.
    // Criterio: quiz de base; classify para comparaciones; match para lo complejo;
    // short para el término clave que conviene saber escribir de memoria.
    // Cerrá con una card de info de síntesis.
  ],
};
