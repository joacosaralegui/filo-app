// Clase 6 (transcripción) — Nietzsche y la muerte de Dios
// App Clase 5. Feed: 'info', 'quiz', 'classify' (comparar) y 'match' (conectar).
// Tono: resumen fiel de la clase. Preguntas exigentes, con distractores plausibles.
//
// NUMERACIÓN: num (app) = transcript - 1. El archivo se nombra por transcript.
export default {
  num: 5,
  transcript: 6,
  title: "Nietzsche y la muerte de Dios",
  source: "https://www.youtube.com/watch?v=MqbQ0loF3zM",
  feed: [
    {
      type: "info",
      tag: "Panorama",
      title: "Por fin, Nietzsche",
      body: "Nietzsche es más fácil de leer que Hegel —conciso, aforístico, colorido; podés leerlo en una hamaca—, pero mucho más difícil de interpretar: sobre sus conceptos clave hay lecturas salvajemente distintas. El caso clásico es «Dios ha muerto»: una frase cortísima, de sintaxis simple, que sin embargo se lleva discutiendo siglo y medio. Conviene ubicarlo de entrada: posromántico y protoexistencialista, tardío para el Romanticismo y precoz para el existencialismo.",
    },
    {
      type: "info",
      tag: "Anti-Hegel",
      title: "El alter ego de Hegel",
      body: "Un buen hilo: Nietzsche como anti-Hegel. Ve, como él, todos los antagonismos, la violencia y las contradicciones; pero rechaza rotundamente cualquier Aufhebung: no hay reconciliación, ni ahora ni al final, no hay telos. Las mismas tensiones dialécticas reaparecen, pero sin direccionalidad ni superación. Hegel arma sistemas; Nietzsche desarma todo —en ese sentido es también precursor de la deconstrucción—.",
    },
    {
      type: "classify",
      question: "¿Cada rasgo es de Hegel o de Nietzsche?",
      groups: ["Hegel", "Nietzsche"],
      items: [
        { text: "Hay un telos: la historia se reconcilia al final", group: 0 },
        { text: "No hay reconciliación ni Aufhebung posible", group: 1 },
        { text: "Arma un gran sistema que quiere explicarlo todo", group: 0 },
        { text: "Desarma todo; precursor de la deconstrucción", group: 1 },
        { text: "Demasiada historia nos enferma", group: 1 },
      ],
      explain: "Comparten la mirada sobre el conflicto y la contradicción, pero Hegel busca totalidad, sistema y reconciliación (telos), mientras Nietzsche niega toda síntesis: desarma, sin dirección ni consuelo.",
    },
    {
      type: "info",
      tag: "Estética",
      title: "Solo como arte se justifica el mundo",
      body: "Hay en Nietzsche un fuerte elemento sadomasoquista: no solo antagonismo, sino dolor, asco y desprecio por la condición humana. La salida es estética: dice que el arte es «la única actividad verdaderamente metafísica de esta vida», y que solo como fenómeno estético puede justificarse el mundo. Como los románticos, quería que la vida fuera arte: solo la creación la justifica.",
    },
    {
      type: "info",
      tag: "Biografía",
      title: "De la teología a la filología",
      body: "Nació en 1844; su padre, pastor luterano, murió cuando era chico, y lo criaron cinco mujeres. Empezó estudiando teología (empezamos con Dios y terminamos con su muerte) y se volcó a la filología y a la música. A los veinticuatro, sin doctorado terminado, le dieron una cátedra en Basilea. Sirvió de camillero en la guerra franco-prusiana y volvió con la salud arruinada.",
    },
    {
      type: "info",
      tag: "Wagner",
      title: "La obsesión con Wagner",
      body: "Nietzsche entabla una amistad intensa, casi de culto, con el compositor Richard Wagner. Wagner tenía su propio culto alrededor y convirtió la ópera en un templo: antes uno charlaba y tomaba algo en el palco; ahora se entra en silencio y con reverencia. Crea una ópera específicamente alemana, basada en el mito medieval y lo grandioso, e introduce el leitmotiv, dándole a la orquesta un peso narrativo nuevo.",
    },
    {
      type: "info",
      tag: "Wagner",
      title: "El nacimiento de la tragedia",
      body: "De ese fervor sale su primer libro, El nacimiento de la tragedia (1872), dedicado a Wagner: presenta sus dramas musicales como herederos de la tragedia griega, que convertía a los hombres en «artistas de la vida». Años después, Nietzsche rompe con Wagner con la misma pasión con que lo idolatró, sintiendo que se había «vendido» al materialismo.",
    },
    {
      type: "quiz",
      question: "Para el Nietzsche de El nacimiento de la tragedia, ¿qué justifica la existencia?",
      options: [
        "La razón y el progreso científico",
        "El arte y la creación estética",
        "El deber moral y la compasión",
        "La fe religiosa heredada de su padre",
      ],
      answer: 1,
      explain: "Como los románticos, Nietzsche quería que la vida fuera arte. Frente a lo despreciable de la condición humana, solo la creación estética vuelve soportable —y justificable— la existencia.",
    },
    {
      type: "info",
      tag: "Historia",
      title: "Demasiada historia enferma",
      body: "En Sobre la utilidad y el perjuicio de la historia para la vida sostiene que demasiada historia nos enferma: es abrumadora, y solo los fuertes la soportan. Empieza envidiando a las vacas, que pastan felices en su presentismo, sin sentido del pasado. Y ataca a Hegel: convertir la historia en un «proceso mundial» que es como un Dios acostumbró a los alemanes a justificar su época como su culminación necesaria.",
    },
    {
      type: "quiz",
      question: "¿Qué le reprocha Nietzsche a Hegel en su ensayo sobre la historia?",
      options: [
        "Haber despreciado a la Grecia antigua",
        "Haber divinizado la historia como un proceso",
        "Haber sido demasiado optimista sobre el progreso científico",
        "Haber negado la existencia de las contradicciones",
      ],
      answer: 1,
      explain: "Para Nietzsche, Hegel divinizó la historia (el «proceso mundial») y así enseñó a cada época a verse como el sentido y la meta de todo lo anterior. En realidad, dice, el exceso de historia es lo que nos enferma.",
    },
    {
      type: "info",
      tag: "Moral",
      title: "Más allá del bien y del mal",
      body: "Nietzsche nos fuerza a cuestionar las categorías en que vivimos. Lo bueno y lo malo, lo verdadero y lo falso, están insidiosamente entrelazados —incluso podrían ser, en su esencia, una sola cosa—. El dolor no es solo negativo: el sufrimiento no solo se soporta, se abraza. De ahí líneas como «lo que está cayendo, hay que empujarlo también»: repensar qué significan el bien y el mal.",
    },
    {
      type: "info",
      tag: "Moral",
      title: "La moral de esclavos",
      body: "Detesta el cristianismo por su «moral de esclavos»: convertir la debilidad en virtud. «Los mansos heredarán la tierra» le resulta reprochable. Los esclavos, resentidos, conciben a los amos como malos y a sí mismos como buenos y puros, y así justifican su opresión con una recompensa venidera. Es una religión nihilista; ve el mismo problema en la democracia, gobierno de la mediocridad. Detesta la piedad.",
    },
    {
      type: "quiz",
      question: "¿Qué es la «moral de esclavos» para Nietzsche?",
      options: [
        "La ética de quienes fueron esclavizados legalmente",
        "La inversión que vuelve virtud a la debilidad",
        "El deber kantiano de tratar a todos como fines",
        "La moral aristocrática de los grandes hombres y héroes",
      ],
      answer: 1,
      explain: "El débil resentido llama «buena» a su propia debilidad y «mala» a la fuerza del amo, y así santifica su opresión. Nietzsche ve en el cristianismo —y en la democracia— esa valorización de la debilidad.",
    },
    {
      type: "info",
      tag: "Zaratustra",
      title: "El Übermensch",
      body: "Su figura más heroica es Zaratustra, un profeta que baja de las montañas a hablarle a la gente. Trae una doctrina: el imperativo de aspirar a la grandeza. De ahí el Übermensch, palabra intraducible («super-persona»): una especie de Aufhebung del ser humano. Su estribillo: «el hombre es algo que debe ser superado». El hombre es una cuerda tendida sobre un abismo, entre la bestia y el Übermensch: un puente.",
    },
    {
      type: "quiz",
      question: "El Übermensch de Zaratustra es, ante todo…",
      options: [
        "Un superhombre invulnerable que ya existe y gobierna",
        "Una meta por venir, algo que el hombre debe alcanzar",
        "El proletariado que hará la revolución",
        "El sabio que ha alcanzado la reconciliación con el todo",
      ],
      answer: 1,
      explain: "Zaratustra mismo no es un Übermensch, y nunca conocemos uno: es algo por venir. El hombre es una cuerda sobre el abismo, un puente hacia esa grandeza. Expresa la necesidad de autocreación, no una raza ya realizada.",
    },
    {
      type: "info",
      tag: "Eternidad",
      title: "El eterno retorno",
      body: "Otro concepto sin acuerdo sobre su sentido. Hay al menos tres lecturas: una kantiana (viví cada instante como si fuera a repetirse eternamente, cerca del imperativo categórico); una del todo (cada momento es integral al conjunto, y solo el Übermensch tiene la fuerza de abrazarlo); y una cercana a Bergson (el tiempo como río continuo, la eternidad como su núcleo, distinta de la mera infinitud).",
    },
    {
      type: "match",
      question: "Uní cada concepto de Nietzsche con lo que nombra",
      pairs: [
        { left: "«Dios ha muerto»", right: "Se derrumbó la creencia en un orden que da sentido" },
        { left: "Übermensch", right: "Aquello que el hombre debe superarse para llegar a ser" },
        { left: "Moral de esclavos", right: "Convertir la debilidad en virtud (el cristianismo)" },
        { left: "Eterno retorno", right: "Vivir cada instante como si fuera a repetirse para siempre" },
        { left: "Nihilismo", right: "Cuando los valores supremos pierden su valor" },
      ],
      explain: "El núcleo de Nietzsche: caído el orden que daba sentido (la muerte de Dios), sobreviene el nihilismo; frente a la moral de esclavos, propone la autosuperación (Übermensch) y la afirmación total de la vida (eterno retorno).",
    },
    {
      type: "info",
      tag: "Dios ha muerto",
      title: "El loco trae la noticia",
      body: "En La gaya ciencia, un loco —que siempre llega demasiado temprano— anuncia: «Dios ha muerto. Y nosotros lo hemos matado». Lo decisivo es que no dice «no hay Dios»: no es ateísmo. Dice que algo ocurrió, que cruzamos una frontera. Dios estaba vivo cuando organizaba y daba sentido a la sociedad humana. Dios es la creencia en un orden; su muerte es descubrir que ese mundo ideal no existe.",
    },
    {
      type: "quiz",
      question: "«Dios ha muerto» significa, ante todo…",
      options: [
        "Una demostración atea de que Dios nunca existió",
        "Que se derrumbó la creencia en un orden con sentido",
        "Que hay que fundar una religión nueva que reemplace a la vieja",
        "Que la ciencia ya explicó todos los milagros",
      ],
      answer: 1,
      explain: "No es la tesis «no hay Dios», sino la constatación de que algo pasó: «lo hemos matado». Dios era la creencia en un orden; su muerte es reconocer que ese todo con sentido y meta no existe.",
    },
    {
      type: "info",
      tag: "Nihilismo",
      title: "Sin principio ordenador",
      body: "El mundo donde las contradicciones se resuelven armoniosamente —el telos hegeliano— no viene: se fue. Buscamos totalidad y unidad, pero la vida es diferenciación y heterogeneidad. El resultado es el nihilismo, otro nombre de la muerte de Dios: cuando los valores supremos pierden su valor. Y no se resuelve instituyendo un Dios sustituto: las raíces de la crisis están justamente en ese intento.",
    },
    {
      type: "info",
      tag: "Síntesis",
      title: "El duelo por la muerte de Dios",
      body: "Elitista, pero no un nacionalista alemán en el sentido político actual. Una mente atormentada, en lucha contra todo principio ordenador y a la vez de duelo por él: no hay compensación por la pérdida, pero igual se la llora. En 1889 se desploma en Turín y enloquece; muere en 1900. Como la toma de la Bastilla para Hegel, la muerte de Dios es irreversible: dicho eso, todo está permitido.",
    },
  ],
};
