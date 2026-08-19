// Clase 21 (transcripción) — Poder y arqueología: Michel Foucault
// App Clase 20. Feed: 'info', 'quiz', 'classify' (comparar), 'match' (conectar), 'short'.
// Tono: resumen fiel de la clase. Preguntas exigentes, con distractores plausibles.
//
// NUMERACIÓN: num (app) = transcript - 1. El archivo se nombra por transcript.
export default {
  num: 20,
  transcript: 21,
  title: "Poder y arqueología: Michel Foucault",
  source: "https://www.youtube.com/watch?v=tyeGAGus-oY",
  feed: [
    {
      type: "info",
      tag: "Panorama",
      title: "Entramos en la posmodernidad",
      body: "Con Michel Foucault hacemos la transición de la modernidad a la posmodernidad. La modernidad quiso reemplazar a Dios por tres vías: el sujeto humano, la Historia con mayúscula y la estructura. El estructuralismo fue el último gran intento. La posmodernidad lo abandona: desestabiliza todo, sin verdad ni sujeto estables. Foucault reubica la agencia en el discurso.",
    },
    {
      type: "info",
      tag: "El problema",
      title: "¿Sustancia o sólo forma?",
      body: "El estructuralismo trajo una vulnerabilidad: el significado no es intrínseco, sino relacional y contingente; el sujeto ya no es fuente de sentido, y el lenguaje no refleja la realidad, sino que en cierto modo la produce. Vuelve el problema del puente en otra clave: ¿hay sustancia en el mundo o sólo forma? ¿Hay una referencia real detrás del texto, anterior a la estructura?",
    },
    {
      type: "info",
      tag: "La bisagra",
      title: "Girard realista, Foucault posmoderno",
      body: "En ese debate, Girard es realista: los textos no sólo producen sentido, lo revelan; hay una referencia fuera del texto —la víctima real—, y la verdad es posible. En eso es modernista. Con Foucault entramos en el espacio posmoderno, donde ya no es seguro que exista una verdad estable: la posmodernidad es desestabilización, desarmar todo y abrazar la imposibilidad de asir el sentido.",
    },
    {
      type: "quiz",
      question: "¿Qué caracteriza el giro a la posmodernidad?",
      options: [
        "Un nuevo intento de fundar una verdad estable",
        "Abandonar la búsqueda de una verdad estable",
        "El regreso a la soberanía del sujeto",
        "La restauración de la Historia con mayúscula",
      ],
      answer: 1,
      explain: "El estructuralismo fue el último gran intento de reemplazar a Dios (con la estructura). La posmodernidad lo abandona: desestabiliza todo y rechaza una subjetividad sólida, una teleología y hasta una estructura sólidas. Ya no es seguro que exista una verdad estable.",
    },
    {
      type: "info",
      tag: "El sujeto",
      title: "Contra la soberanía del sujeto",
      body: "Foucault empieza como rebelión contra la tradición fenomenológico-existencialista y su «soberanía del sujeto»: la idea de que se puede dudar de todo salvo del yo. Da igual cómo lo llames —el cogito, el ego trascendental, el Dasein, la libertad sartreana—: siempre hay un yo. Foucault rechaza ese fundamento del sujeto y reubica la agencia en el discurso.",
    },
    {
      type: "short",
      question: "¿Cuál es la palabra clave con que Foucault reubica la agencia —cómo hablamos de las cosas—, en vez de en el sujeto?",
      answers: ["discurso"],
      explain: "El discurso: una versión más «preñada» del lenguaje, cómo hablamos de las cosas. La agencia se reubica en él; hablar de las cosas es hacer algo. Un enunciado significa por su red de relaciones con otros, pero la estructura nunca se cierra.",
    },
    {
      type: "info",
      tag: "Discurso",
      title: "Del lenguaje a la práctica discursiva",
      body: "Toma del estructuralismo que el significado es relacional: un enunciado significa por su red con otros. Pero da un giro posestructuralista: la estructura nunca está cerrada, la red de referencias nunca se cierra. Rechaza la conciencia trascendental (la de Kant y Husserl) y busca el sentido en la práctica discursiva. Para él, el único conocimiento legítimo es el histórico.",
    },
    {
      type: "info",
      tag: "Tres historias",
      title: "Más oscuro de lo que parece",
      body: "Foucault escribe tres grandes historias con un motivo común: las transformaciones intelectuales e institucionales de la modernidad no son lo que parecen —son más oscuras—. Bajo los relatos progresistas de humanización hay control. Las tres: la locura (el manicomio), la prisión (el castigo) y la sexualidad (el discurso sobre el sexo).",
    },
    {
      type: "info",
      tag: "La locura",
      title: "El «gran encierro»",
      body: "En Historia de la locura critica el relato del manicomio como logro progresista. En realidad, dice, es control: lo llama el «gran encierro». Y con un argumento muy estructuralista: para que hubiera razón hacía falta sinrazón —los binarios—. El manicomio fue el lado oscuro de la Ilustración: sólo hay definición a través de un otro, como en Beauvoir.",
    },
    {
      type: "quiz",
      question: "Según Foucault, ¿qué fue realmente la creación del manicomio?",
      options: [
        "Un logro progresista de la medicina humanitaria",
        "Un mecanismo de control, el «gran encierro»",
        "Un espacio neutral, sin relación con el poder",
        "Un invento sin vínculo con la Ilustración",
      ],
      answer: 1,
      explain: "No un avance humanitario, sino control: el «gran encierro». Y muy estructuralista: para que hubiera razón hacía falta sinrazón. El manicomio fue el lado oscuro de la Ilustración —sólo hay definición a través de un otro—.",
    },
    {
      type: "info",
      tag: "La prisión",
      title: "El panóptico",
      body: "En Vigilar y castigar, la prisión no es un castigo más humano que la tortura, sino aislamiento y vigilancia; y conecta prisiones, manicomios, escuelas, hospitales y fábricas como instituciones de control. Su modelo es el panóptico (de Bentham): una torre de vigilancia radial en la que ningún preso sabe cuándo lo observan. Hay que suponer siempre que sí, y esa incertidumbre disciplina.",
    },
    {
      type: "short",
      question: "¿Cómo se llama la cárcel de vigilancia (de Bentham) donde el preso nunca sabe si lo observan?",
      answers: ["panóptico"],
      explain: "El panóptico: una torre de vigilancia radial en la que ningún prisionero puede saber cuándo el guardia lo mira. Siempre hay que suponer que sí, y esa incertidumbre es el instrumento de disciplina. Foucault lo vuelve modelo de la modernidad: prisiones, escuelas, hospitales, fábricas.",
    },
    {
      type: "info",
      tag: "La sexualidad",
      title: "La «hipótesis represiva»",
      body: "Historia de la sexualidad critica la «hipótesis represiva» (la de Marcuse): la idea de una mojigatería victoriana que silenciaba el sexo. Foucault no pregunta «¿por qué estamos reprimidos?», sino «¿por qué no dejamos de hablar de que estamos reprimidos?». Lejos de callarse, el sexo tuvo una explosión discursiva: se escrutó y categorizó. «El homosexual pasó a ser una especie»: de acto a categoría vigilable.",
    },
    {
      type: "quiz",
      question: "¿Qué le objeta Foucault a la «hipótesis represiva» sobre el sexo?",
      options: [
        "Que la época victoriana no existió realmente",
        "Que el sexo, lejos de callarse, tuvo una explosión discursiva",
        "Que el sexo debería reprimirse aún más",
        "Que la sexualidad no guarda relación alguna con el poder moderno",
      ],
      answer: 1,
      explain: "En vez de «¿por qué estamos tan reprimidos?», Foucault pregunta «¿por qué no dejamos de hablar de que estamos reprimidos?». Lejos de callarse, el sexo se escrutó, categorizó y medicalizó: «el homosexual pasó a ser una especie». La sexualidad es un punto denso de relaciones de poder.",
    },
    {
      type: "classify",
      question: "¿Cada relato es el tradicional o el de Foucault?",
      groups: ["Relato tradicional", "Relato de Foucault"],
      items: [
        { text: "El manicomio es un logro humanitario de la medicina", group: 0 },
        { text: "El manicomio es control: el «gran encierro»", group: 1 },
        { text: "La prisión es un castigo más racional y humano", group: 0 },
        { text: "La prisión es aislamiento y vigilancia", group: 1 },
        { text: "La época victoriana silenció y reprimió el sexo", group: 0 },
        { text: "El sexo tuvo una explosión discursiva, no silencio", group: 1 },
      ],
      explain: "Foucault invierte los relatos progresistas: donde la historia tradicional ve avances humanitarios (el manicomio, la prisión) o represión (el silencio victoriano), él ve control, vigilancia y una explosión de discurso que categoriza para dominar. Las transformaciones de la modernidad no son lo que parecen: son más oscuras.",
    },
    {
      type: "info",
      tag: "El poder",
      title: "Poder/saber, disperso y productivo",
      body: "Lo más crucial: Foucault redefine el poder. Con «poder/saber»: no hay saber inocente, libre de poder. Y el poder no emana de un solo punto: «está en todas partes porque viene de todas partes». Es relacional, inmanente y omnipresente —todas las relaciones son de poder—, viene de abajo, y donde hay poder siempre hay resistencia. Y no sólo reprime: también es productivo, también crea.",
    },
    {
      type: "quiz",
      question: "¿Cómo redefine Foucault el poder?",
      options: [
        "Como algo que emana de un único centro soberano y estatal",
        "Como algo disperso, que viene de todas partes y produce",
        "Como una simple relación entre gobernantes y gobernados",
        "Como la posesión exclusiva del Estado",
      ],
      answer: 1,
      explain: "El poder no emana de un punto: «está en todas partes porque viene de todas partes». Es relacional, inmanente, omnipresente —todas las relaciones son de poder—, viene de abajo, y donde hay poder hay resistencia. Y no sólo reprime: también es productivo, crea.",
    },
    {
      type: "info",
      tag: "Arqueología",
      title: "Excavar capas de discurso",
      body: "Su método: estudiar el discurso como historiador —el giro lingüístico, donde el objeto es cómo la gente hablaba de las cosas—. El historiador es un arqueólogo que excava capas de discurso: describe la red sincrónica de enunciados y el momento de discontinuidad en que el discurso se desplaza. No pregunta «por qué» (no busca causas): describe. Inspirado en la genealogía de Nietzsche.",
    },
    {
      type: "quiz",
      question: "¿En qué consiste el «método arqueológico» de Foucault?",
      options: [
        "Buscar el origen secreto y último de todas las ideas",
        "Excavar capas de discurso y describir sus rupturas",
        "Explicar las causas económicas de cada época",
        "Reconstruir la biografía de los grandes autores",
      ],
      answer: 1,
      explain: "El historiador es un arqueólogo que excava capas de discurso: describe la red sincrónica de enunciados y el momento de discontinuidad en que el discurso se desplaza. No pregunta «por qué» (no busca causas ni orígenes): describe. Inspirado en la genealogía de Nietzsche.",
    },
    {
      type: "match",
      question: "Uní cada término de Foucault con lo que nombra",
      pairs: [
        { left: "Discurso", right: "Cómo hablamos de las cosas; ahí se reubica la agencia" },
        { left: "Poder/saber", right: "Disperso, viene de todas partes; también produce" },
        { left: "Panóptico", right: "Vigilancia en que nunca sabés si te observan" },
        { left: "El gran encierro", right: "El manicomio como control, no como progreso" },
        { left: "Arqueología", right: "Excavar capas de discurso y sus discontinuidades" },
      ],
      explain: "Las piezas de Foucault: la agencia pasa al discurso; el poder/saber es disperso y productivo; el panóptico y el gran encierro muestran la modernidad como disciplina y vigilancia; y la arqueología es el método para excavar esas capas de discurso y sus rupturas.",
    },
    {
      type: "info",
      tag: "Cierre",
      title: "Duelo por el sujeto perdido",
      body: "Foucault es posestructuralista, pero —más que Derrida— sigue siendo productivo: no da una receta para liberarnos de la vigilancia, pero sí un método para escribir buena historia. Y está ligado a la pérdida de fe en toda verdad o sujeto estable: si Dios ha muerto, ¿ha muerto también el autor? Reconoce lo doloroso que es; en su «muerte del sujeto» hay duelo, casi nostalgia, no regodeo. A quienes aún preguntan qué es el hombre, responde «con una risa filosófica».",
    },
  ],
};
