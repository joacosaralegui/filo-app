// Clase 7 (transcripción) — app Clase 6 — Bergson: la revuelta contra el positivismo
// Feed de cards: 'info' (resume una idea de la clase) e interactivas (quiz/classify/match).
// Tono: resumen fiel de la clase. Preguntas exigentes, con distractores plausibles.
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
      body: "La clase vuelve sobre el tiempo. Hegel, Marx, Nietzsche, Lenin y Bergson comparten esa preocupación: cómo se mueve, qué significa, en qué dirección va. Se liga a la tensión entre subjetividad (el yo y su mundo) y telos (la historia con rumbo), y a la distinción entre ser y devenir: el tiempo no es estático, es devenir.",
    },
    {
      type: "info",
      tag: "Temporalidad",
      title: "Cuatro maneras de pensar el tiempo",
      body: "Bergson piensa en dualidades. Cíclico vs. lineal (el paso a lo lineal define la modernidad); parejo vs. a saltos; errante vs. direccional (la cuestión del telos); y continuo vs. discreto. Esta última —tomada de una analogía matemática— es la más esencial para él, y la clave de toda su filosofía del tiempo.",
    },
    {
      type: "info",
      tag: "Contexto",
      title: "El trío antipositivista",
      body: "Henri Bergson nació en 1859, el año de El origen de las especies de Darwin. Es el primero de un trío de rebeldes contra el positivismo —con Freud y Husserl—, todos nacidos con pocos años de diferencia. Cosmopolita, judío, formado como matemático, fue posiblemente el filósofo francés más importante de la primera mitad del siglo XX.",
    },
    {
      type: "info",
      tag: "El enemigo",
      title: "Qué es el positivismo",
      body: "Heredero de la racionalidad ilustrada y del modelo de las ciencias duras, el positivismo sostiene que el conocimiento debe basarse en la experiencia sensorial empírica: lo que se puede ver, tocar, contar, medir. Es un alejamiento de la metafísica y trae un ánimo frío, materialista, antiidealista. Contra ese ánimo se levanta Bergson.",
    },
    {
      type: "quiz",
      question: "¿Contra qué se rebelan Bergson, Freud y Husserl?",
      options: [
        "Contra el idealismo hegeliano y su fe en el Espíritu",
        "Contra el positivismo: reducir todo conocimiento a la experiencia empírica y medible",
        "Contra el ateísmo militante de Nietzsche",
        "Contra el contrato social y el liberalismo político",
      ],
      answer: 1,
      explain: "Los tres nacen dentro del clima positivista heredado de la Ilustración y luego se rebelan: hay dimensiones de la vida —el tiempo, la conciencia, lo inconsciente— que la observación empírica y el modelo de las ciencias duras no pueden captar.",
    },
    {
      type: "info",
      tag: "La ruptura",
      title: "Contra Spencer y el mecanicismo",
      body: "Bergson empieza inmerso en el positivismo, sobre todo el de Herbert Spencer (utilitarista, evolucionista, creyente en la perfectibilidad humana), y luego se rebela por completo. Rechaza los supuestos mecanicistas: la idea de que la vida humana puede entenderse como una máquina, como partes que encajan. No niega la ciencia natural, pero hay dimensiones de la vida que esta no puede captar.",
    },
    {
      type: "info",
      tag: "Idea central",
      title: "El tiempo no es espacio",
      body: "Su primer punto de revuelta: es un error entender el tiempo por analogía con el espacio, cortándolo en unidades cuantificables —segundos, minutos, instantes—. El espacio se mide y se cuenta; proyectamos eso sobre el tiempo, pero el tiempo no es cuantitativo sino cualitativo. Lo llama durée, duración: un flujo dinámico, irreversible, continuo, que no puede fragmentarse ni dividirse en puntos.",
    },
    {
      type: "quiz",
      question: "¿Por qué, para Bergson, es un error medir el tiempo como se mide el espacio?",
      options: [
        "Porque el tiempo no existe realmente, es solo una ilusión de la conciencia",
        "Porque el tiempo es duración continua (durée), y cuantificarlo lo trocea en unidades discretas que traicionan su flujo",
        "Porque el espacio, en verdad, tampoco puede medirse con exactitud",
        "Porque solo Dios puede conocer el tiempo verdadero",
      ],
      answer: 1,
      explain: "El tiempo real es flujo, no una fila de instantes. Cortarlo en segundos es como pasar un cuchillo a través de una llama: se divide lo desplegado, no el desplegarse. Es una multiplicidad cualitativa, no cuantitativa.",
    },
    {
      type: "info",
      tag: "Matemática",
      title: "Lo continuo y lo discreto (Cantor)",
      body: "La distinción viene de la matemática: lo continuo frente a lo discreto. Georg Cantor formula en 1878 la hipótesis del continuo y distingue dos infinitos: el de los enteros (1, 2, 3…, separados, discretos) y el de todos los puntos de la recta (entre 1 y 2 hay infinitos puntos, sin huecos). El tiempo, para Bergson, no es como los enteros sino como la recta: sigue, sin huecos, no podés crear un corte.",
    },
    {
      type: "info",
      tag: "Conciencia",
      title: "Fundirse en un todo",
      body: "El espacio se asocia a los objetos inertes; el tiempo, a la conciencia. Bergson usa metáforas de fusión: los momentos de la duración «se penetran unos a otros» y forman un todo orgánico, como fetas de queso que al cocinarse se funden y pierden sus fronteras. Late aquí un anhelo hegeliano de totalidad: la fragmentación de nuestras vidas es una alienación que hay que superar.",
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
        "Kant lo postula porque lo necesita para la moral; Bergson intenta probarlo ligándolo al tiempo como duración",
        "Ambos lo demuestran con el mismo argumento",
        "Kant lo funda en el tiempo; Bergson en la razón pura",
      ],
      answer: 1,
      explain: "Kant no puede probar el libre albedrío, pero lo postula como condición de la moral. Bergson va más lejos: sostiene que el yo libre y espontáneo brota de la experiencia cualitativa y continua del tiempo (aunque, como señala la clase, más lo postula que lo prueba).",
    },
    {
      type: "info",
      tag: "Obra · 1907",
      title: "La evolución creadora",
      body: "Bergson refuta dos ideas hermanas. El finalismo: la teleología que hace marchar la vida hacia un telos dado (la semilla de manzana ya trae «precableada» la manzana). Y el mecanicismo: la idea ilustrada de que la naturaleza es una máquina cuyo todo se comprende sumando sus partes, como una bicicleta. No se puede entender la vida como se entiende una bicicleta.",
    },
    {
      type: "info",
      tag: "Élan vital",
      title: "La bomba de racimo",
      body: "¿Cómo entender la evolución? Como algo pluridimensional, que avanza por división, porque las cosas se rompen. Una bala de cañón va a un solo lugar; un proyectil que estalla dispersa fragmentos en todas direcciones: la vida se parece a eso. La empuja el élan vital, la fuerza vital: somos seres creativos que quieren actuar. La evolución no sigue un programa; ocurre por líneas divergentes.",
    },
    {
      type: "quiz",
      question: "La imagen de la bala de cañón frente al proyectil que estalla ilustra que, para Bergson, la vida…",
      options: [
        "Se dirige con precisión hacia una meta única y predeterminada",
        "No avanza hacia un telos fijo: se dispersa por líneas divergentes, con creatividad y contingencia",
        "Es esencialmente destructiva y violenta",
        "Retrocede en círculos, como el tiempo cíclico premoderno",
      ],
      answer: 1,
      explain: "La bala de cañón es el finalismo (un solo destino); el proyectil que estalla es el élan vital: la vida crea en múltiples direcciones imprevisibles. Contra el finalismo y el mecanicismo, Bergson pone la creatividad y la elección.",
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
      body: "En Duración y simultaneidad Bergson polemiza con Einstein: este mide la relatividad del tiempo por instantes; para Bergson el tiempo tiene que ser flujo, porque solo así puede inyectársele libre albedrío y contingencia. Si espacializamos el tiempo y creemos que el pasado puede trocearse, terminamos proyectando eso sobre el futuro, como si ya estuviera dado tras una pantalla —y él lo quiere en movimiento, abierto—.",
    },
    {
      type: "info",
      tag: "Obra · 1900",
      title: "La risa",
      body: "Ensayo célebre sobre lo cómico. Es humorístico lo que carece de autoconciencia, lo que «revela su semejanza con una cosa» por su rigidez mecánica, su automatismo, su «movimiento sin vida». ¿Y la función de la risa? Romper el mecanismo: un correctivo social, cercano a la desfamiliarización de Shklovski, que señala y reprime la rigidez automatizada y nos deja ver la vida con más claridad.",
    },
    {
      type: "quiz",
      question: "Según La risa, ¿qué provoca lo cómico y qué función cumple reírse?",
      options: [
        "La alegría espontánea; la risa sirve para reforzar los lazos afectivos",
        "La rigidez mecánica y automática de lo humano; la risa es un correctivo que rompe ese mecanismo",
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
