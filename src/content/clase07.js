// Clase 7 (transcripción) — app Clase 6 — Bergson: la revuelta contra el positivismo
// Las cards SON la clase: enseñan en primera persona del recorrido, no resumen una clase
// ajena. Cada card se apoya en lo que la anterior dejó asentado. Todo lo que evalúa un
// quiz/classify/match tiene antes su propia card de info.
export default {
  num: 6,          // número mostrado en la app
  transcript: 7,   // número de la transcripción original (yale-filosofia/transcripciones)
  title: "Bergson: la revuelta contra el positivismo",
  source: "https://www.youtube.com/watch?v=fhIW-E9wZe8",
  feed: [
    {
      type: "info",
      tag: "Panorama",
      title: "El tiempo, otra vez",
      body: "Volvemos sobre el tiempo, y conviene entrar por Nietzsche: su eterno retorno puede leerse como un río, un flujo en el que pasado y presente nunca se cortan del todo. Esa intuición del tiempo como continuidad es el tema de hoy. Hegel, Marx, Nietzsche, Lenin, Bergson: todos se preocupan por cómo se mueve el tiempo y qué significa. Se liga a dos ejes ya conocidos —subjetividad y telos— y a la distinción entre ser y devenir: el tiempo no es algo que se es, es algo que deviene.",
    },
    {
      type: "info",
      tag: "Temporalidad",
      title: "Cuatro maneras de pensar el tiempo",
      body: "El tiempo admite varias oposiciones. Cíclico vs. lineal: el paso a lo lineal, con dirección, define la modernidad. Parejo vs. a saltos: avanzar de forma constante o de modo agitado, con estallidos. Errante vs. direccional: la cuestión del telos, si hay una flecha o el tiempo solo serpentea. Y continuo vs. discreto: la más esencial para Bergson, tomada de una analogía matemática. Retené esta última, porque es la llave de todo lo que sigue.",
    },
    {
      type: "info",
      tag: "Contexto",
      title: "El trío antipositivista",
      body: "Henri Bergson nació en 1859, el año de El origen de las especies de Darwin. Es el primero de un trío de rebeldes contra el positivismo —con Freud y Husserl—, nacidos con pocos años de diferencia; cada uno se rebela a su modo contra ese aspecto del legado ilustrado. Cosmopolita, judío (nacido en París, de padre judío polaco y madre judía británica), formado como matemático, fue posiblemente el filósofo francés más importante de la primera mitad del siglo XX.",
    },
    {
      type: "info",
      tag: "El enemigo",
      title: "Qué es el positivismo",
      body: "Conviene definir con precisión al adversario. El positivismo es la idea, heredada de la racionalidad ilustrada y del modelo de las ciencias duras, de que el conocimiento debe basarse en la experiencia sensorial empírica: como en un laboratorio, se prueba una teoría observando qué pasa. Solo cuenta lo que se puede ver, tocar, contar, medir. Es un alejamiento de la metafísica —de lo que está más allá de lo físico y tangible—: el conocimiento se limita a lo concreto, material y fáctico.",
    },
    {
      type: "info",
      tag: "El enemigo",
      title: "El ánimo positivista",
      body: "Pero el positivismo no es solo una doctrina; es también un ánimo, un temple. Una racionalidad fría, materialista, antimetafísica y antiidealista: el mundo reducido a lo que se puede calcular. Mucha gente lo hallará deprimente, aunque no pretendía serlo. Contra ese ánimo —no solo contra sus tesis— se levantan Bergson y su generación: sienten que deja afuera casi todo lo que hace que la vida importe.",
    },
    {
      type: "info",
      tag: "Spencer",
      title: "El positivismo hecho persona",
      body: "El positivismo tiene un rostro concreto para el joven Bergson: Herbert Spencer. Para Spencer, el único conocimiento sólido está en las ciencias; en ética es utilitarista —actuar por el mayor bien del mayor número—; se interesa por la evolución como adaptación al ambiente; y, buen hombre de la Ilustración, cree en la perfectibilidad humana, el avance hacia el equilibrio y la desaparición del mal. Bergson empieza inmerso en él: son sus orígenes intelectuales, y de ahí se rebelará.",
    },
    {
      type: "quiz",
      question: "¿Contra qué se rebelan Bergson, Freud y Husserl?",
      options: [
        "Contra el idealismo hegeliano y su fe en el Espíritu",
        "Contra el positivismo y su fe en lo medible",
        "Contra el ateísmo militante de Nietzsche",
        "Contra el contrato social y el liberalismo político",
      ],
      answer: 1,
      explain: "Los tres nacen dentro del clima positivista heredado de la Ilustración y luego se rebelan: hay dimensiones de la vida —el tiempo, la conciencia, lo inconsciente— que la observación empírica y el modelo de las ciencias duras no pueden captar.",
    },
    {
      type: "info",
      tag: "La ruptura",
      title: "La revuelta contra el mecanicismo",
      body: "De todo el positivismo, lo que Bergson más rechaza son sus supuestos mecanicistas: la idea de que la vida humana puede entenderse como una máquina, como partes que encajan, como fenómenos de masas y movimientos. No niega la ciencia natural —sirve para la materia inerte—, pero insiste en que hay otras dimensiones de la vida que esta no puede captar. Es un caso de «revuelta edípica»: rebelarse por completo contra la tradición de la que uno mismo viene.",
    },
    {
      type: "info",
      tag: "Método",
      title: "Pensar en dualidades",
      body: "Para leerlo hay que entender cómo piensa: por dualidades —continuo vs. discreto, cantidad vs. calidad, ciencia vs. filosofía, materia vs. vida—. A diferencia de Hegel, que muestra cómo la cantidad se vuelve calidad, Bergson las mantiene separadas: hay ámbitos que se captan midiendo y otros que exigen otra cosa. En sus pares nunca hay absolutos —siempre hacen falta ambos términos—, pero uno está privilegiado. Y una advertencia útil: es un escritor literario que tiende a postular sus ideas más que a probarlas.",
    },
    {
      type: "info",
      tag: "Idea central",
      title: "El tiempo no es espacio",
      body: "Su primer punto de revuelta: es un error entender el tiempo por analogía con el espacio, cortándolo en unidades cuantificables —segundos, minutos, instantes—. El espacio se mide y se cuenta; proyectamos eso sobre el tiempo, pero el tiempo no es cuantitativo sino cualitativo. Lo llama durée, duración: un flujo dinámico, irreversible, continuo, que no puede fragmentarse ni dividirse en puntos. Para asirlo hay que partir de nuestra experiencia del tiempo, no del reloj.",
    },
    {
      type: "quiz",
      question: "¿Por qué, para Bergson, es un error medir el tiempo como se mide el espacio?",
      options: [
        "Porque el tiempo no existe realmente, es solo una ilusión de la conciencia",
        "Porque el tiempo es duración continua, no partes sueltas",
        "Porque el espacio, en verdad, tampoco puede medirse con exactitud",
        "Porque solo Dios puede conocer el tiempo verdadero",
      ],
      answer: 1,
      explain: "El tiempo real es flujo, no una fila de instantes. Cortarlo en segundos es como pasar un cuchillo a través de una llama: se divide lo desplegado, no el desplegarse. Es una multiplicidad cualitativa, no cuantitativa.",
    },
    {
      type: "short",
      question: "¿Cómo llama Bergson al tiempo vivido de la conciencia?",
      answers: ["durée", "duración"],
      explain: "La durée es el tiempo tal como se vive: continuo, cualitativo e indivisible, frente al tiempo espacializado que miden los relojes.",
    },
    {
      type: "info",
      tag: "Matemática",
      title: "Lo continuo y lo discreto (Cantor)",
      body: "La distinción viene de la matemática: lo continuo frente a lo discreto. Georg Cantor formula en 1878 la hipótesis del continuo y distingue dos infinitos: el de los enteros (1, 2, 3…, separados, discretos) y el de todos los puntos de la recta (entre 1 y 2 hay infinitos puntos, sin huecos). El tiempo, para Bergson, no es como los enteros sino como la recta: sigue, sin huecos, no podés crear un corte. El espacio es discreto y contable; el tiempo, no.",
    },
    {
      type: "info",
      tag: "Conciencia",
      title: "Fundirse en un todo",
      body: "El espacio se asocia a los objetos inertes; el tiempo, a la conciencia —por eso, para asir la subjetividad, hay que asir la temporalidad—. Bergson usa metáforas de fusión: los momentos de la duración «se penetran unos a otros» y forman un todo orgánico, como fetas de queso que al cocinarse se funden y pierden sus fronteras. Late aquí un anhelo hegeliano de totalidad: la fragmentación de nuestras vidas es una alienación que hay que superar.",
    },
    {
      type: "match",
      question: "Uní cada término con lo que le corresponde",
      pairs: [
        { left: "Durée", right: "El tiempo como flujo continuo, no como puntos" },
        { left: "Cantor", right: "La distinción matemática entre lo continuo y lo discreto" },
        { left: "Spencer", right: "El positivismo evolucionista contra el que Bergson se rebela" },
        { left: "Espacio", right: "Lo cuantitativo, discreto y medible" },
        { left: "Conciencia", right: "Lo cualitativo, que solo se aprehende en el tiempo" },
      ],
      explain: "Bergson piensa por dualidades: espacio/tiempo, discreto/continuo, cuantitativo/cualitativo. Toma de Cantor la matemática del continuo y la vuelve contra el positivismo de Spencer para defender la durée.",
    },
    {
      type: "info",
      tag: "El gran salto",
      title: "Tiempo continuo y libre albedrío",
      body: "El movimiento más difícil de Bergson: conectar el tiempo continuo con el libre albedrío. Quiere una noción antiteleológica del tiempo, en la que el futuro no esté fijado sino abierto según lo que elijamos —contingencia contra determinismo—. Donde Kant se limita a postular el libre albedrío, Bergson intenta probarlo: sería nuestra experiencia cualitativa del tiempo la que da lugar a actos libres, espontáneos, imposibles de determinar de antemano.",
    },
    {
      type: "quiz",
      question: "¿Qué diferencia el tratamiento del libre albedrío en Kant y en Bergson?",
      options: [
        "Kant lo niega; Bergson lo afirma",
        "Kant lo postula; Bergson intenta probarlo",
        "Ambos lo demuestran con el mismo argumento",
        "Kant lo funda en el tiempo; Bergson en la razón pura",
      ],
      answer: 1,
      explain: "Kant no puede probar el libre albedrío, pero lo postula como condición de la moral. Bergson va más lejos: sostiene que el yo libre y espontáneo brota de la experiencia cualitativa y continua del tiempo —aunque, fiel a su estilo, lo postula más que lo prueba—.",
    },
    {
      type: "info",
      tag: "Obra · 1907",
      title: "La evolución creadora",
      body: "Bergson refuta dos ideas hermanas. El finalismo: la teleología que hace marchar la vida hacia un telos dado (la semilla de manzana ya trae «precableada» la manzana, y no se volverá una piña). Y el mecanicismo: la idea ilustrada de que la naturaleza es una máquina cuyo todo se comprende sumando sus partes, como una bicicleta. No se puede entender la vida como se entiende una bicicleta: el pensamiento mecanicista capta las partes, no el todo.",
    },
    {
      type: "info",
      tag: "Élan vital",
      title: "La bomba de racimo",
      body: "¿Cómo entender la evolución, entonces? Como algo pluridimensional, que avanza por división, porque las cosas se rompen. Una bala de cañón va a un solo lugar; un proyectil que estalla dispersa fragmentos en todas direcciones: la vida se parece a eso. La empuja el élan vital, la fuerza vital: somos seres creativos que quieren actuar. La evolución no sigue un programa; ocurre por líneas divergentes. La vida es elección incesante —el decisionismo que radicalizarán los existencialistas—.",
    },
    {
      type: "quiz",
      question: "La imagen de la bala de cañón frente al proyectil que estalla ilustra que, para Bergson, la vida…",
      options: [
        "Se dirige con precisión hacia una meta única y predeterminada",
        "No avanza hacia un fin fijo: se dispersa y crea",
        "Es esencialmente destructiva y violenta",
        "Retrocede en círculos, como el tiempo cíclico premoderno",
      ],
      answer: 1,
      explain: "La bala de cañón es el finalismo (un solo destino); el proyectil que estalla es el élan vital: la vida crea en múltiples direcciones imprevisibles. Contra el finalismo y el mecanicismo, Bergson pone la creatividad y la elección.",
    },
    {
      type: "info",
      tag: "Intuición",
      title: "Intelecto e intuición",
      body: "La última dualidad, y la clave para juzgar todo lo demás: intelecto frente a intuición. El intelecto es una perspectiva externa y analítica —observa, mide, categoriza, deduce— y está hecho para la materia inerte: sirve para ver cómo encajan las piezas de una bicicleta, pero tiene «una incapacidad natural para comprender la vida», porque solo la ve en partes. La intuición —forma sofisticada del instinto— es interna y holística: aprehende lo vivo desde adentro, de un solo golpe. Hacen falta las dos, pero la intuición es la superior.",
    },
    {
      type: "classify",
      question: "¿Cada rasgo corresponde al intelecto o a la intuición?",
      groups: ["Intelecto", "Intuición"],
      items: [
        { text: "Perspectiva externa y analítica: observa, mide, categoriza", group: 0 },
        { text: "Perspectiva interna, subjetiva y holística", group: 1 },
        { text: "Apropiado para pensar la materia inerte", group: 0 },
        { text: "Aprehende la vida desde adentro, de un solo golpe", group: 1 },
        { text: "Ve en piezas y partes, por representación", group: 0 },
        { text: "Es la facultad privilegiada por Bergson", group: 1 },
      ],
      explain: "El intelecto sirve para la materia inerte —ver cómo encajan las partes de una bicicleta— pero tiene «una incapacidad natural para comprender la vida». La intuición, forma sofisticada del instinto, capta lo orgánico directamente, sin trocearlo. Se necesitan ambos, pero la intuición es superior.",
    },
    {
      type: "info",
      tag: "Polémica",
      title: "Bergson contra Einstein",
      body: "En Duración y simultaneidad Bergson polemiza con Einstein: este mide la relatividad del tiempo por instantes; para Bergson el tiempo tiene que ser flujo, porque solo así puede inyectársele libre albedrío y contingencia. Si espacializamos el tiempo y creemos que el pasado puede trocearse, terminamos proyectando eso sobre el futuro, como si ya estuviera dado tras una pantalla que se desliza —y él lo quiere en movimiento, abierto, todavía por hacerse—.",
    },
    {
      type: "info",
      tag: "Obra · 1900",
      title: "La risa",
      body: "Ensayo célebre sobre lo cómico. Es humorístico lo que carece de autoconciencia, lo que «revela su semejanza con una cosa» por su rigidez mecánica, su automatismo, su «movimiento sin vida». ¿Y la función de la risa? Romper el mecanismo: un correctivo social, cercano a la desfamiliarización de Shklovski, que señala y reprime la rigidez automatizada y nos deja ver la vida con más claridad. Coherente con toda su filosofía: la vida contra lo mecánico.",
    },
    {
      type: "quiz",
      question: "Según La risa, ¿qué provoca lo cómico y qué función cumple reírse?",
      options: [
        "La alegría espontánea; la risa sirve para reforzar los lazos afectivos",
        "La rigidez mecánica de lo humano; la risa la corrige",
        "La transgresión moral; la risa castiga el vicio",
        "El absurdo del lenguaje; la risa libera tensión nerviosa",
      ],
      answer: 1,
      explain: "Para Bergson reímos de lo que revela «puro mecanismo, automatismo, movimiento sin vida». La risa es un gesto social correctivo: antídoto contra el mecanismo irreflexivo, la vida rompiendo el modo automatizado. Coherente con toda su filosofía antimecanicista.",
    },
    {
      type: "match",
      question: "Uní cada obra o concepto con su núcleo",
      pairs: [
        { left: "La evolución creadora", right: "Refuta el finalismo y el mecanicismo" },
        { left: "La risa", right: "Lo cómico como rigidez mecánica; reír, un correctivo" },
        { left: "Élan vital", right: "La fuerza creadora que empuja la vida en direcciones divergentes" },
        { left: "Intuición", right: "Captar la vida desde adentro, no en partes" },
        { left: "Einstein", right: "Piensa el tiempo como instantes, no como flujo" },
      ],
      explain: "Todo el pensamiento de Bergson gira sobre una misma intuición: la vida y el tiempo son flujo continuo y creador, y el error es trocearlos como si fueran materia inerte —sea en la evolución, en el tiempo físico o en lo cómico—.",
    },
    {
      type: "info",
      tag: "Cierre",
      title: "Contingencia radical",
      body: "El final es amargo: judío y filósofo célebre, Bergson rechaza la exención que le ofrecen los nazis —que admiraban su vitalismo—, lleva la estrella judía y muere en 1941. Nos deja una idea que abre el existencialismo: el ser vivo implica una contingencia radical que entra en el mundo. En Hannah Arendt será la natalidad: cada ser nuevo es una inyección de contingencia que puede ir en direcciones imprevisibles.",
    },
  ],
};
