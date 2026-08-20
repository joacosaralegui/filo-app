// Clase 5 (transcripción) — El marxismo
// App Clase 4. Feed: 'info', 'quiz', 'classify' (comparar) y 'match' (conectar).
// Tono: resumen fiel de la clase. Preguntas exigentes, con distractores plausibles.
//
// NUMERACIÓN: num (app) = transcript - 1. El archivo se nombra por transcript.
export default {
  num: 4,
  transcript: 5,
  title: "El marxismo",
  source: "https://www.youtube.com/watch?v=bdB0Lsa5T-g",
  feed: [
    {
      type: "info",
      tag: "Panorama",
      title: "Por qué fue tan seductor",
      body: "Décadas después de la caída del comunismo europeo, el desafío no es explicar cómo una idea tan brillante salió mal, sino —como decía Tony Judt— entender qué la hacía tan extraordinariamente seductora para enormes cantidades de personas, de toda clase y país, durante tanto tiempo. Hasta no dar ese salto imaginativo, nada del siglo XX tiene sentido. No se trata de si Marx acertó, sino de qué tenía tanta fuerza.",
    },
    {
      type: "info",
      tag: "Método",
      title: "Poner a Hegel «patas para arriba»",
      body: "Los hegelianos de izquierda toman de Hegel la centralidad de la historia, la progresión dialéctica y el pensar en totalidades; pero rechazan su metafísica. Hay que bajar todo eso del reino del espíritu a la tierra, volverlo concreto y material: es el paso del idealismo al materialismo. Donde Hegel habla de dialéctica del Espíritu, Marx hablará de materialismo dialéctico; donde Hegel ve Geist, Marx ve fuerzas socioeconómicas. La dialéctica estaba «parada de cabeza»: hay que darla vuelta para hallar el núcleo racional.",
    },
    {
      type: "quiz",
      question: "«Poner a Hegel patas para arriba» significa, para Marx…",
      options: [
        "Hacer que la historia retroceda en lugar de avanzar",
        "Pasar de lo ideal a lo concreto y material",
        "Abandonar por completo la dialéctica hegeliana",
        "Sustituir la razón por la fe religiosa",
      ],
      answer: 1,
      explain: "No es invertir la dirección de la historia, sino su fundamento: en lugar del Espíritu, las fuerzas socioeconómicas. Es el paso del idealismo al materialismo dialéctico.",
    },
    {
      type: "info",
      tag: "Biografía",
      title: "Marx y los jóvenes hegelianos",
      body: "Marx (1818–1883), de una familia judía asimilada y culta del Imperio prusiano, se une a los jóvenes hegelianos —Feuerbach, Bauer—, que usan los métodos de Hegel contra sus conclusiones. Así se mueve la historia intelectual: quien escribe un texto no tiene el monopolio de su interpretación. Los textos son provocaciones al pensamiento; no se les debe lealtad.",
    },
    {
      type: "info",
      tag: "Encuentro",
      title: "Marx y Engels",
      body: "En 1844 Marx conoce a Friedrich Engels en un café de París y se vuelven coautores. Es una de esas historias en que el cruce de dos mentes cambia todo lo que viene después: sin ese encuentro, la historia moderna podría haber sido muy distinta. Así funciona siempre la historia intelectual —basta juntar las mentes adecuadas, con suficiente café—.",
    },
    {
      type: "info",
      tag: "Modernización",
      title: "La industrialización, el factor decisivo",
      body: "Para Marx, el factor clave del comportamiento social moderno es la industrialización. A mediados del siglo XIX casi nada del mundo está industrializado, pero donde Marx vive —Alemania, París, Londres— se vive la Revolución Industrial. Por eso hablamos no de modernidad en general, sino de modernización: los cambios técnicos concretos que trae la industria.",
    },
    {
      type: "info",
      tag: "Clases",
      title: "Del campo feudal a la ciudad",
      body: "Antes del capitalismo estaba el feudalismo: un mundo descentralizado y rural. Un monarca sin alcance directo sobre cada aldea, una nobleza que hereda tierra y título, y un campesinado atado a la tierra y al ciclo de las estaciones. La enorme mayoría vivía en el campo. Las fábricas rompen ese orden: de golpe hacen falta muchos trabajadores en un mismo edificio, la gente migra a las ciudades y con eso cambia toda la estructura social.",
    },
    {
      type: "info",
      tag: "Clases",
      title: "Burguesía y proletariado",
      body: "En lugar de nobles, terratenientes y campesinos, aparecen dos clases nuevas, ligadas a la ciudad. La burguesía no hereda un título: posee las fábricas y, por eso, es el empleador. El proletariado son los obreros urbanos, que no poseen nada y venden su trabajo por hora. La identidad relevante ya no es el linaje, sino la clase: dueño o trabajador, el que emplea o el que es empleado y explotado.",
    },
    {
      type: "classify",
      question: "¿Cada rasgo corresponde a la burguesía o al proletariado?",
      groups: ["Burguesía", "Proletariado"],
      items: [
        { text: "Posee las fábricas y los medios de producción", group: 0 },
        { text: "Vende su trabajo por hora en la línea de montaje", group: 1 },
        { text: "Es el empleador que se queda con las ganancias", group: 0 },
        { text: "Está alienado de los productos de su trabajo", group: 1 },
        { text: "Desarrollará la conciencia de clase", group: 1 },
      ],
      explain: "La relación relevante para Marx es la posición en la estructura económica: quien posee las fábricas y emplea (burguesía) frente a quien vende su trabajo y es explotado (proletariado). De esa posición objetiva deriva la conciencia de cada clase.",
    },
    {
      type: "info",
      tag: "Alienación",
      title: "El trabajo alienado",
      body: "En la línea de montaje cada uno hace una sola parte de un proceso repetitivo, sometido a las máquinas, y vende su trabajo por hora: pierde la conexión con lo que produce, que además va a parar a otro. El trabajador queda alienado de su trabajo y de sí mismo —se vende como cosa—. Relaciones entre personas se vuelven relaciones entre mercancías.",
    },
    {
      type: "quiz",
      question: "¿En qué consiste la «alienación» del trabajador para Marx?",
      options: [
        "En que el trabajador rechaza trabajar en la fábrica",
        "En que no es dueño de lo que produce ni de su tiempo",
        "En que emigra del campo a la ciudad",
        "En que gana un salario en dinero en vez de en especie",
      ],
      answer: 1,
      explain: "La alienación es la ruptura con la totalidad del trabajo: hacés una fracción repetitiva, no sos dueño del producto, y te vendés por hora como mercancía. Hay un eco kantiano: la persona tratada como medio, no como fin.",
    },
    {
      type: "info",
      tag: "1848",
      title: "El Manifiesto Comunista",
      body: "Aparece en 1848, la «primavera de los pueblos»: un año de revoluciones por toda Europa, confluencia de liberalismo y nacionalismo. El Manifiesto, de Marx y Engels, es a la vez una teoría de la historia, un manifiesto político y una profecía. Y algo muy hegeliano: no hay distinción entre lo que sucederá y lo que debería suceder.",
    },
    {
      type: "info",
      tag: "Manifiesto",
      title: "Un espectro recorre Europa",
      body: "«Un espectro recorre Europa: el espectro del comunismo.» El espectro (Gespenst) no es el Geist: es un fantasma —y no del pasado, sino del futuro, algo por venir—. El modelo entiende la historia por las relaciones económicas y el antagonismo de clase. Los actores relevantes no son los individuos, sino las clases.",
    },
    {
      type: "info",
      tag: "Historia",
      title: "La lucha de clases",
      body: "«La historia de toda sociedad hasta hoy es la historia de la lucha de clases»: opresores y oprimidos. Como en Hegel, cada estado de cosas contiene las semillas de su propia destrucción. Así como el feudalismo dio paso al capitalismo, el capitalismo engendra a sus sepultureros: «su caída y la victoria del proletariado son igualmente inevitables».",
    },
    {
      type: "quiz",
      question: "«El capitalismo contiene las semillas de su propia destrucción» es una idea…",
      options: [
        "Empírica, tomada de la economía política inglesa",
        "Dialéctica: todo estado engendra su negación",
        "Romántica, sobre la nostalgia del pasado feudal",
        "Kantiana, sobre el deber moral de rebelarse",
      ],
      answer: 1,
      explain: "Es la dialéctica hegeliana vuelta materialista: como el pimpollo contiene lo que lo abolirá, el capitalismo produce al proletariado que lo enterrará. La historia se mueve por ese antagonismo interno.",
    },
    {
      type: "info",
      tag: "Capital",
      title: "Capital y explotación",
      body: "El capitalismo trae la economía monetaria y algo que Marx llama capital: no cualquier dinero, sino dinero que se invierte para hacer más dinero. La burguesía acumula capital con el fin de generar más capital. De ahí la explotación: se compra el trabajo ajeno por hora y las ganancias van al dueño, no a quien trabaja.",
    },
    {
      type: "match",
      question: "Uní cada término marxista con lo que nombra",
      pairs: [
        { left: "Capital", right: "Dinero que se invierte para hacer más dinero" },
        { left: "Base", right: "La estructura socioeconómica: tu posición determina tu conciencia" },
        { left: "Superestructura", right: "Arte, cultura e ideas: derivadas de la base" },
        { left: "Conciencia de clase", right: "Cuando los trabajadores comprenden que son explotados" },
        { left: "«El opio de los pueblos»", right: "La religión, que induce a aceptar el propio sufrimiento" },
      ],
      explain: "Marx vuelve concreto lo abstracto: la base económica determina la superestructura (las ideas), el capital es dinero que engendra dinero, y la conciencia de clase es el despertar del proletariado. La religión, como opio, adormece esa toma de conciencia.",
    },
    {
      type: "info",
      tag: "Determinación",
      title: "Base y superestructura",
      body: "Dos términos cruciales. La base es la estructura socioeconómica: ¿sos trabajador o dueño de fábrica? La superestructura es el arte, la cultura, la conciencia, el pensamiento. Para Marx la base es determinante y la superestructura, derivada: lo que determina cómo pensás es tu posición en el orden económico. La naturaleza humana no es fija: es situacional.",
    },
    {
      type: "quiz",
      question: "En el modelo de base y superestructura, ¿qué determina la conciencia?",
      options: [
        "Las ideas y la cultura configuran la economía",
        "La posición económica determina cómo se piensa",
        "La conciencia es libre e independiente de la clase",
        "La religión es la base y la economía la superestructura",
      ],
      answer: 1,
      explain: "Para Marx la base determina la superestructura: tu lugar en el orden socioeconómico configura tu conciencia. Si sos dueño de fábrica, tenés conciencia burguesa; si sos trabajador, desarrollás conciencia de clase.",
    },
    {
      type: "info",
      tag: "Revolución",
      title: "El despertar de la conciencia de clase",
      body: "Todo depende de un despertar: la conciencia de clase. No es solo saber que la vida es dura, sino comprender el todo —que la burguesía nos explota y que no hay arreglo parcial sin que todos los trabajadores se levanten juntos—. En el marxismo clásico eso llega solo, orgánicamente, porque el ser determina la conciencia. Y no cabe esperar ayuda de la religión: es «el opio de los pueblos», que adormece justamente esa toma de conciencia.",
    },
    {
      type: "info",
      tag: "Revolución",
      title: "Los pasos hacia el comunismo",
      body: "Una vez despierta, la clase obrera actúa. Los pasos: el derrocamiento violento de la burguesía (que no cederá su propiedad por las buenas); la abolición de la propiedad privada; una dictadura del proletariado como período de transición; y, al fin, la disolución de las fronteras nacionales, hasta un mundo en que cada uno trabaja según su capacidad y recibe según su necesidad. Ese es el comunismo: el fin de la historia.",
    },
    {
      type: "info",
      tag: "Síntesis",
      title: "El determinismo y el problema calvinista",
      body: "El proletariado es la clase predestinada a llevarnos a la tierra prometida, y en el marxismo clásico la revolución llegará inevitable y orgánicamente. Pero eso plantea un problema calvinista: si estás predestinado, ¿para qué actuar?, ¿por qué no quedarse sentado si va a ocurrir solo? Ese será el problema crucial que vendrá a resolver Lenin.",
    },
  ],
};
