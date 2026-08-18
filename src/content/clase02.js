// Clase 2 — La herencia de la Ilustración
// Feed de cards: 'info' (resume una idea de la clase) y 'quiz' (la pone a prueba).
// Tono: resumen fiel de la clase. Preguntas exigentes, con distractores plausibles.

// NOTA sobre numeración: el número que ve el usuario en la app (`num`) está
// DESACOPLADO del número de transcripción original de la carpeta yale-filosofia
// (`transcript`). La Clase 1 original ("Introducción al curso") no se incluye por
// no ser relevante, así que la app arranca en la Clase 1 = transcripción 2.
// Mapeo general: num = transcript - 1.
export default {
  num: 1,          // número mostrado en la app
  transcript: 2,   // número de la transcripción original (yale-filosofia/transcripciones)
  title: "La herencia de la Ilustración",
  source: "https://www.youtube.com/watch?v=VxATfoQJjzk",
  feed: [
    {
      type: "info",
      tag: "Panorama",
      title: "La Ilustración",
      body: "La Ilustración (Aufklärung, «la era de la luz») es la etapa de la historia intelectual europea de fines del siglo XVII y del XVIII que culmina en la Revolución Francesa de 1789. Reúne filosofías que a menudo se contradicen entre sí, pero comparten una pregunta común sobre la relación del hombre consigo mismo, con los demás, con el gobierno y con la naturaleza.",
    },
    {
      type: "info",
      tag: "Palabra clave",
      title: "La razón en el centro",
      body: "La palabra-llave del período es «razón». La Ilustración la exalta hasta casi fetichizarla: la razón pasa a ocupar el lugar dominante que antes tenía el cristianismo. Como tenemos razón, podemos comprender el mundo; al comprenderlo, podemos moldearlo y mejorarlo. De ahí una concepción del tiempo que deja de ser cíclico para volverse progresivo.",
    },
    {
      type: "info",
      tag: "Idea central",
      title: "Dios desplazado, no muerto",
      body: "En la Ilustración Dios no es negado ni «matado» —eso recién ocurre un siglo después, con Nietzsche—. Es degradado: pasa de un papel central a uno secundario, entre bastidores. El ateísmo todavía es demasiado radical para estar sobre la mesa. Lo que ocupa el espacio dejado por Dios es la fe en la razón.",
    },
    {
      type: "info",
      tag: "Ánimo",
      title: "El desencanto del mundo",
      body: "Max Weber llamó Entzauberung («desencanto») a este proceso: la retirada de los milagros, lo sagrado y el más allá frente a una explicación racional y empírica del mundo. Los ilustrados vivían ese desencanto con regocijo y sobriedad; el Romanticismo, en cambio, lo experimentará como una pérdida.",
    },
    {
      type: "quiz",
      question: "¿Cuál describe mejor la posición de la Ilustración frente a Dios?",
      options: [
        "Un ateísmo militante que niega abiertamente su existencia",
        "Un desplazamiento: Dios es degradado del centro, pero no negado",
        "Una restauración del papel central de Dios frente al escepticismo",
        "Un panteísmo que identifica a Dios con la naturaleza",
      ],
      answer: 1,
      explain: "El ateísmo aún es impensable en esta etapa. Dios no se niega: se corre del centro y la razón ocupa su lugar. Negarlo del todo llega recién con Nietzsche.",
    },
    {
      type: "quiz",
      question: "El «desencanto» (Entzauberung) nombra, ante todo…",
      options: [
        "La decepción moral ante los crímenes de la Revolución",
        "El retiro de lo mágico y lo sagrado ante una explicación racional del mundo",
        "El pesimismo de Hobbes sobre la naturaleza humana",
        "El rechazo romántico de la ciencia",
      ],
      answer: 1,
      explain: "Es un concepto de Weber: no una emoción puntual, sino el proceso por el cual el mundo deja de estar poblado de fuerzas mágicas y pasa a ser explicable y sobrio.",
    },
    {
      type: "info",
      tag: "Modelo",
      title: "El modelo de las ciencias duras",
      body: "La filosofía ilustrada toma como modelo a las ciencias duras: aspira a entender al ser humano y a la sociedad como el físico o el químico entienden la naturaleza. De ahí una teleología del progreso. Isaiah Berlin usa la imagen del rompecabezas: cada pieza colocada acerca al todo y facilita colocar la siguiente. Newton y el empirismo —el conocimiento ganado por observación— son su precedente; de ahí saldrá el positivismo.",
    },
    {
      type: "info",
      tag: "Epistemología",
      title: "Descartes y la duda radical",
      body: "Con Descartes empieza la filosofía moderna, centrada en la epistemología: ¿cómo sé qué es real? Propone un experimento de duda radical: rechazar como falso todo aquello de lo que se pueda dudar. Aunque un «genio maligno» me engañara sobre todo lo que percibo, hay algo indudable: que estoy teniendo esos pensamientos. Cogito, ergo sum: «pienso, luego existo».",
    },
    {
      type: "quiz",
      question: "El cogito establece que la única certeza indudable es…",
      options: [
        "La existencia de Dios como garante de la verdad",
        "La existencia del mundo exterior captado por los sentidos",
        "La existencia del sujeto que piensa, aun si todo lo demás fuera un engaño",
        "La imposibilidad de todo conocimiento cierto",
      ],
      answer: 2,
      explain: "El contenido de los pensamientos podría ser un engaño del genio maligno; pero el hecho de estar pensando no. La certeza se refugia en la subjetividad, en el yo.",
    },
    {
      type: "info",
      tag: "Contrato social",
      title: "Hobbes: la naturaleza como guerra",
      body: "La teoría del contrato social describe el paso del estado de naturaleza al de cultura. Para Hobbes ese estado de naturaleza es una guerra de todos contra todos, donde la vida es «desagradable, brutal y breve». La salida es ceder los derechos y la libertad a un Leviatán, un soberano absoluto que garantiza seguridad. Libertad y seguridad son, para él, un juego de suma cero.",
    },
    {
      type: "info",
      tag: "Contrato social",
      title: "Locke: el consentimiento de los gobernados",
      body: "Locke acepta el contrato social pero invierte el punto de partida de Hobbes: el estado de naturaleza es de libertad e igualdad, no de guerra. El gobierno se funda solo en el consentimiento de los gobernados —no en el derecho divino de los reyes— y el pacto es condicional: si los gobernantes abusan del poder, el pueblo tiene derecho a reemplazarlos. Es el origen del liberalismo.",
    },
    {
      type: "classify",
      question: "¿Cada tesis es de Hobbes o de Locke?",
      groups: ["Hobbes", "Locke"],
      items: [
        { text: "El estado de naturaleza es una guerra de todos contra todos", group: 0 },
        { text: "El estado de naturaleza ya es de libertad e igualdad", group: 1 },
        { text: "Hay que ceder todos los derechos a un soberano absoluto", group: 0 },
        { text: "El gobierno se funda en el consentimiento de los gobernados", group: 1 },
        { text: "Si el poder abusa, el pueblo puede reemplazarlo", group: 1 },
        { text: "Libertad y seguridad son un juego de suma cero", group: 0 },
      ],
      explain: "Hobbes parte del miedo: naturaleza como guerra y soberano absoluto que cambia libertad por seguridad. Locke invierte el punto de partida: libertad e igualdad previas, y un pacto revocable fundado en el consentimiento. Es el origen del liberalismo.",
    },
    {
      type: "info",
      tag: "Los philosophes",
      title: "Voltaire, el deísmo y la tolerancia",
      body: "Los philosophes franceses son filósofos comprometidos con el mundo (engagé), que unen teoría y praxis. Voltaire defiende el deísmo: Dios creó el mundo pero se hizo a un lado, sin mover los hilos como un titiritero. Su causa es la tolerancia contra el fanatismo y el absolutismo religioso, condensada en su lema «écrasez l'infâme» («aplastad la infamia»).",
    },
    {
      type: "info",
      tag: "El problemático",
      title: "Rousseau y la voluntad general",
      body: "Rousseau invierte a Hobbes: el estado de naturaleza era de virtud, y fue la propiedad la que corrompió al hombre. Es un filósofo de la nostalgia: todo era mejor antes, pero no se puede volver. Su contrato social introduce la «voluntad general», una noción del todo social —distinta de la simple mayoría— que servirá para fundar la autoridad, y que más tarde se invocará para justificar el Terror.",
    },
    {
      type: "quiz",
      question: "¿Por qué la «voluntad general» de Rousseau resulta políticamente peligrosa?",
      options: [
        "Porque defiende de forma explícita la monarquía absoluta",
        "Porque es una noción difusa del «todo» social que puede invocarse para justificar la coerción en su nombre",
        "Porque niega la posibilidad de cualquier gobierno",
        "Porque funda la autoridad en el derecho divino de los reyes",
      ],
      answer: 1,
      explain: "Nadie sabe con exactitud qué es la voluntad general. Esa indeterminación permite que un poder afirme encarnarla y reprima en su nombre: el camino hacia el Terror.",
    },
    {
      type: "info",
      tag: "Kant",
      title: "«¿Qué es la Ilustración?»",
      body: "En 1784, ante la pregunta «¿Qué es la Ilustración?», Kant responde: es la salida del hombre de su autoimpuesta inmadurez. Su lema es sapere aude, «atrévete a saber»: ten el valor de servirte de tu propio entendimiento sin la tutela de un cura o un libro. No es un llamado revolucionario —Kant acepta pagar impuestos y obedecer—, sino a pensar por uno mismo.",
    },
    {
      type: "info",
      tag: "Kant",
      title: "La revolución copernicana",
      body: "En epistemología, Kant negocia un compromiso entre realismo e idealismo: existe un mundo real independiente de la mente (la Ding an sich, «cosa en sí»), pero no tenemos acceso directo a él, porque todo se procesa a través de nuestra conciencia. Su «revolución copernicana»: no es la mente la que se conforma al mundo, sino lo que percibimos del mundo lo que se conforma a las estructuras de la mente.",
    },
    {
      type: "quiz",
      question: "La «revolución copernicana» de Kant sostiene que…",
      options: [
        "Conocemos la cosa en sí (Ding an sich) tal como es en verdad",
        "El conocimiento se conforma pasivamente a los objetos tal como existen",
        "Los objetos, tal como los conocemos, se conforman a las estructuras de nuestra mente",
        "No existe ningún mundo independiente de la mente",
      ],
      answer: 2,
      explain: "Kant afirma que hay un mundo real, pero inaccesible en sí mismo (por eso la opción 4 es idealismo radical, que él rechaza). Lo que conocemos ya está filtrado por nuestras categorías.",
    },
    {
      type: "quiz",
      question: "El lema kantiano sapere aude expresa, ante todo…",
      options: [
        "La confianza en que la ciencia resolverá todos los problemas",
        "El coraje de usar el propio entendimiento sin someterse a la autoridad",
        "El deber de obedecer sin cuestionar a la razón del Estado",
        "El rechazo de toda ley y toda tradición",
      ],
      answer: 1,
      explain: "Es un llamado a pensar por uno mismo. No es radicalismo político: Kant distingue entre obedecer las reglas y conservar la libertad de usar la propia razón.",
    },
    {
      type: "info",
      tag: "1789",
      title: "La Revolución Francesa",
      body: "En julio de 1789 las ideas ilustradas se vuelven política: razón, progreso, contrato social y consentimiento de los gobernados. La Declaración de los Derechos del Hombre y del Ciudadano encarna este liberalismo naciente. Su transformación decisiva: convertir súbditos —casi propiedad del monarca— en ciudadanos, creadores del gobierno. Es también la invención de la ideología, y desembocará en el Terror.",
    },
    {
      type: "info",
      tag: "Vocabulario",
      title: "Modernidad, modernización, modernismo",
      body: "Tres términos que conviene distinguir. Modernidad: el período histórico que abre la Ilustración. Modernización: los cambios materiales y técnicos ligados a ella —industrialización, urbanización, capitalismo, economía monetaria—. Modernismo: la respuesta estética en el arte, la literatura y la filosofía. No son distinciones absolutas, pero así se usan los términos.",
    },
    {
      type: "quiz",
      question: "La industrialización, la urbanización y el paso a una economía monetaria corresponden a…",
      options: ["Modernidad", "Modernización", "Modernismo", "Posmodernidad"],
      answer: 1,
      explain: "Son cambios concretos, materiales: modernización. La modernidad es el período; el modernismo, la respuesta estética.",
    },
    {
      type: "match",
      question: "Uní cada pensador con su aporte a la Ilustración",
      pairs: [
        { left: "Descartes", right: "Cogito, ergo sum: la duda radical" },
        { left: "Hobbes", right: "El Leviatán: la guerra de todos contra todos" },
        { left: "Locke", right: "El gobierno por consentimiento" },
        { left: "Rousseau", right: "La voluntad general" },
        { left: "Kant", right: "La cosa en sí y el sapere aude" },
      ],
      explain: "El hilo va de la epistemología (Descartes) al contrato social en tres versiones (Hobbes, Locke, Rousseau) y culmina en Kant, que define la Ilustración y a la vez marca sus límites con la cosa en sí.",
    },
    {
      type: "info",
      tag: "Cierre",
      title: "El optimismo ilustrado",
      body: "El legado de la Ilustración es el optimismo: la confianza en que el conocimiento es bueno y progresivo, y en que la razón permite comprender y mejorar el mundo. Su figura literaria es Settembrini, de La montaña mágica de Thomas Mann. La clase siguiente abre la pregunta incómoda: ¿tiene la Ilustración un lado oscuro?",
    },
  ],
};
