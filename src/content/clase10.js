// Clase 10 (transcripción) — app Clase 9 — El modernismo y la vanguardia
// Feed de cards: 'info' (resume una idea de la clase) e interactivas (quiz/classify/match).
// Tono: resumen fiel de la clase. Preguntas exigentes, con distractores plausibles.
export default {
  num: 9,           // número mostrado en la app
  transcript: 10,   // número de la transcripción original (yale-filosofia/transcripciones)
  title: "El modernismo y la vanguardia",
  source: "https://www.youtube.com/watch?v=QqoKiAquWRg",
  feed: [
    {
      type: "info",
      tag: "Panorama",
      title: "El arte responde a la modernidad",
      body: "El modernismo es el tercero de la tríada modernidad / modernización / modernismo: la respuesta estética a la modernidad y a su incertidumbre, en clave freudiana —lugares oscuros, inestabilidad, lo oculto y lo no racional—. Hay dos olas: una primera de giro hacia adentro, a la subjetividad, y una segunda, la vanguardia, que da un salto por encima del yo.",
    },
    {
      type: "info",
      tag: "Primera ola",
      title: "Baudelaire y la crisis de la representación",
      body: "La primera ola se remonta a Charles Baudelaire, que rechaza que el arte represente solo lo bello: debe abrazar también lo feo, lo obsceno, el lado oscuro. Pericles Lewis lo llama una crisis de la representación: ¿el arte debe ser un espejo objetivo del mundo, o mostrar cómo se ven las cosas desde adentro, que no es como se ven objetivamente?",
    },
    {
      type: "info",
      tag: "Temas",
      title: "El alma desnuda y la alienación",
      body: "Al girar hacia adentro, uno ve que las cosas son oscuras: abatimiento metafísico, la búsqueda de un Dios que no se encuentra, el alma desnuda llena de instintos irracionales, la obsesión con la alienación y la desintegración del orden. Hay continuidad con el Romanticismo, pero sin su glorificación de la pasión. Freud es el gurú del modernismo.",
    },
    {
      type: "info",
      tag: "Kafka",
      title: "La metamorfosis",
      body: "En La metamorfosis (1915-16), Gregor Samsa despierta «de sueños intranquilos» transformado en un insecto monstruoso: irreconocible para sí mismo. ¿Seguís siendo vos si no hay un yo estable? El giro a la subjetividad radical no da una subjetividad estable, sino la más inestable. Kafka —judío germanoparlante en Praga— expresó como nadie el sentirse alienado de todas las identidades.",
    },
    {
      type: "quiz",
      question: "¿En qué se diferencia la alienación de Kafka de la de Marx?",
      options: [
        "En Kafka es económica; en Marx, espiritual",
        "En Marx es estructural; en Kafka, psicológica",
        "Son idénticas: ambas nacen de la línea de montaje",
        "En Kafka no hay alienación, solo humor absurdo",
      ],
      answer: 1,
      explain: "Para Marx la alienación es estructural: el obrero de la línea de montaje está alienado por cómo se organiza el trabajo. En Kafka es psicológica: Gregor ya no puede trabajar y deja de reconocerse; el problema es la inestabilidad del yo, no solo la producción.",
    },
    {
      type: "info",
      tag: "Trasfondo",
      title: "Saussure y el signo lingüístico",
      body: "Para entender la vanguardia hace falta el estructuralismo lingüístico de Ferdinand de Saussure. El signo se compone de significante (los sonidos, la palabra) y significado (la referencia), y su relación es arbitraria, pura convención: «perro» refiere a un perro solo porque se distingue de «gato» o «cerro». Todo significado es relacional y vale dentro de un sistema.",
    },
    {
      type: "quiz",
      question: "Según Saussure, ¿por qué la palabra «perro» significa lo que significa?",
      options: [
        "Porque sus sonidos se parecen naturalmente al animal",
        "Porque Dios o la biología fijaron esa correspondencia",
        "Porque es arbitrario: se define por contraste",
        "Porque su significado es idéntico en todas las lenguas",
      ],
      answer: 2,
      explain: "La relación entre significante y significado es arbitraria: no hay nada en los sonidos que obligue a referir esa cosa. El signo se sostiene por convención y por contraste con los demás signos del sistema. Ese es el punto que la vanguardia va a explotar.",
    },
    {
      type: "info",
      tag: "Vanguardia",
      title: "La liberación de la palabra",
      body: "El estructuralismo permite desprender las palabras de las cosas a las que refieren: ese es el gran salto. Marinetti (futurismo italiano) proclama «palabras en libertad», sin sintaxis ni puntuación. Los futuristas rusos van más lejos con la palabra «como tal»: cortan el vínculo entre palabra y referente, y las palabras se vuelven cosas, juguetes. Ahora la forma lo es todo.",
    },
    {
      type: "info",
      tag: "Formalismo ruso",
      title: "Ostranénie: el extrañamiento",
      body: "En 1915, Roman Jakobson y Víktor Shklovski estudian el lenguaje poético poniendo «entre paréntesis» la referencia. Su concepto clave es la ostranénie —extrañamiento, desfamiliarización—: andamos por el mundo sonámbulos, reconociendo las cosas sin verlas de verdad. El arte debe volverlas raras para despertarnos: «hacer que la piedra se sienta pétrea». Es a la vez veneno y antídoto.",
    },
    {
      type: "quiz",
      question: "¿Para qué sirve la ostranénie (extrañamiento) de Shklovski?",
      options: [
        "Para que la poesía sea más fácil y transparente",
        "Para volver extrañas las cosas y verlas de verdad",
        "Para eliminar por completo el lenguaje del arte",
        "Para copiar la realidad con la mayor exactitud posible",
      ],
      answer: 1,
      explain: "Vivimos sonámbulos, automatizando la percepción («la taza, el árbol»). El lenguaje poético usa las palabras de modo no transparente para volver raras las cosas y devolvernos la sensación: «hacer que la piedra se sienta pétrea». Igual que la risa en Bergson, nos sacude hacia la claridad.",
    },
    {
      type: "info",
      tag: "Actitud",
      title: "Arrojar a Pushkin por la borda",
      body: "La vanguardia es audacia, juventud y rebelión: rechazo de toda regla —gramática, puntuación, arte, cortesía—, urgencia de escándalo, culto de la juventud y un agudo sentido del tiempo que corre hacia adelante (hay algo de leninismo). Un manifiesto ruso de 1912 propone «arrojar a Pushkin, Dostoievski y Tolstói por la borda del barco de la modernidad»: cancelar el pasado para inaugurar el futuro.",
    },
    {
      type: "info",
      tag: "Giro radical",
      title: "Del arte-espejo al arte-martillo",
      body: "La primera ola decía: el arte debe representar la vida subjetivamente. La vanguardia da un paso más: quizás el arte no deba representar la vida en absoluto. El arte no es un espejo de la vida, es un martillo para crear vida. Cortado el vínculo entre significante y significado, ya no se trata de representar sino de crear: del arte como representación al arte como transformación.",
    },
    {
      type: "classify",
      question: "¿Cada rasgo es de la primera ola o de la vanguardia?",
      groups: ["Primera ola", "Vanguardia"],
      items: [
        { text: "Giro hacia adentro, a la subjetividad (Baudelaire, Kafka)", group: 0 },
        { text: "Freud es el gurú; el alma desnuda y la alienación", group: 0 },
        { text: "El arte representa el mundo «desde adentro», no objetivamente", group: 0 },
        { text: "La palabra se corta de su referente y se vuelve cosa", group: 1 },
        { text: "El arte ya no representa: es un martillo para crear vida", group: 1 },
        { text: "Salto por encima del yo, hacia una temporalidad experimental", group: 1 },
      ],
      explain: "La primera ola es un esteticismo del giro interior: mostrar el mundo subjetivamente, en clave freudiana. La vanguardia huye de la subjetividad y rompe el vínculo palabra-cosa: la forma lo es todo y el arte pasa de representar a transformar.",
    },
    {
      type: "info",
      tag: "Internacionalismo",
      title: "Cruzar todas las fronteras",
      body: "En la Primera Guerra caen cuatro imperios y en Versalles el mapa se rehace en Estados nacionales, con pasaportes y fronteras que coincidir. Frente a eso, la vanguardia opone un internacionalismo agresivo y autoconsciente, empeñado en cruzar esas fronteras: Shklovski dice que el arte «nunca reflejó el color de la bandera sobre la fortaleza». Todos quieren ser internacionales.",
    },
    {
      type: "info",
      tag: "Los movimientos",
      title: "Una vanguardia plural",
      body: "La vanguardia no es una sola cosa, sino varios movimientos. El futurismo italiano exalta la máquina, la velocidad y la agresión —Marinetti llega a decir que la guerra es hermosa—. El constructivismo borra la frontera entre arte e ingeniería: el arte como creación de vida útil. El dadaísmo es pura rebelión sin sistema —Tzara: «estoy contra los sistemas»—, la contingencia vuelta cosa. Y el surrealismo vuelve a Freud: automatismo psíquico y el collage que acopla dos realidades que no van juntas.",
    },
    {
      type: "match",
      question: "Uní cada movimiento de vanguardia con su rasgo",
      pairs: [
        { left: "Dadaísmo", right: "La reificación de la contingencia (Tzara)" },
        { left: "Surrealismo", right: "Automatismo psíquico, vuelta a lo freudiano" },
        { left: "Futurismo italiano", right: "Tecnología y agresión; termina en el fascismo" },
        { left: "Constructivismo", right: "Borra la frontera entre arte e ingeniería" },
        { left: "Formalismo ruso", right: "La ostranénie: volver extrañas las cosas" },
      ],
      explain: "La vanguardia es plural: el dadaísmo hace de la contingencia una cosa; el surrealismo vuelve a Freud con el automatismo psíquico; el futurismo italiano exalta la máquina y deriva al fascismo; el constructivismo funde arte y vida; el formalismo teoriza el extrañamiento.",
    },
    {
      type: "info",
      tag: "Cierre",
      title: "La caída libre",
      body: "El final: Marinetti y los futuristas italianos van a la derecha, con Mussolini; casi todos los demás, a la izquierda, con la Revolución Bolchevique. El nihilismo y la contingencia radical —«todo es posible»— resultaron existencialmente insoportables, como una caída libre sin suelo. En 1930 Maiakovski, la pasarela entre vanguardia y revolución, se quita la vida: «la barca del amor se estrelló contra lo cotidiano».",
    },
  ],
};
