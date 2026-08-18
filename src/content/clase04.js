// Clase 4 (transcripción) — Hegel y el cronotopo historicista
// App Clase 3. Feed de cards: 'info', 'quiz', 'classify' (comparar) y 'match' (conectar).
// Tono: resumen fiel de la clase. Preguntas exigentes, con distractores plausibles.
//
// NUMERACIÓN: num (app) = transcript - 1. El archivo se nombra por transcript.
export default {
  num: 3, // número mostrado en la app
  transcript: 4, // número de la transcripción original
  title: "Hegel y el cronotopo historicista",
  source: "https://www.youtube.com/watch?v=EozQmkpHKUc",
  feed: [
    {
      type: "info",
      tag: "Panorama",
      title: "Hegel: reconciliar lo dividido",
      body: "Si el Romanticismo fue el alter ego de la Ilustración, Hegel llega a pensar juntas esas corrientes antitéticas. Todo su impulso es la superación de las divisiones y las contradicciones: razón y pasión, el ser y el deber ser, el yo y el otro, el individuo y lo universal. Va a intentar unirlo todo con una ambición grandiosa —y no del todo pacífica—.",
    },
    {
      type: "info",
      tag: "1789",
      title: "«Bueno» y «necesario» son lo mismo",
      body: "La Revolución Francesa proyecta una larga sombra sobre el siglo XIX. Para Hegel fue algo bueno y, más aún, necesario: y esas dos palabras son, en el fondo, sinónimos. Un punto central: no se puede «des-tomar» la Bastilla. Pase lo que pase después, lo hecho no se deshace; la historia es irreversible, ha girado para siempre.",
    },
    {
      type: "info",
      tag: "Biografía",
      title: "El Espíritu del Mundo a caballo",
      body: "Hegel nació en 1770: al caer la Bastilla tenía diecinueve años, una edad muy moldeable. Madura durante las guerras napoleónicas, en Jena. Al ver pasar a Napoleón dice: «ahí va el Espíritu del Mundo a caballo; ahora sé hacia dónde va el mundo». En 1807 termina allí la Fenomenología del espíritu, un libro del que nadie logró escapar del todo.",
    },
    {
      type: "quiz",
      question: "¿Por qué Hegel insiste en que no se puede «des-tomar» la Bastilla?",
      options: [
        "Porque la Revolución fue un error que conviene olvidar",
        "Porque la historia es irreversible y no vuelve atrás",
        "Porque el pueblo podría restaurar la monarquía en cualquier momento",
        "Porque las intenciones importan más que las consecuencias",
      ],
      answer: 1,
      explain: "La irreversibilidad es clave en Hegel: la historia avanza y no vuelve atrás. Y como «bueno» y «necesario» se identifican, lo que ocurrió tenía que ocurrir.",
    },
    {
      type: "info",
      tag: "Epistemología",
      title: "El problema del puente",
      body: "Vuelve la pregunta de Descartes y Kant: ¿cómo sé que la taza existe de verdad y no es una proyección de mi conciencia? ¿Cómo se pasa del sujeto al objeto? Es el problema del puente: estás dentro de tu cabeza y el mundo está afuera. Hegel quiere elevar la filosofía a ciencia y resolverlo —unir sujeto y objeto—, con una pizca de misticismo.",
    },
    {
      type: "info",
      tag: "Método",
      title: "La historia entra en la filosofía",
      body: "La filosofía griega buscaba lo atemporal y universal: que dos más dos sea cuatro, válido siempre y en todas partes. La historia, en cambio, trae lo empírico y contingente: las cosas cambian y se despliegan distinto. Hegel toma la historia —que antes se intentaba purgar de la filosofía— y la vuelve un componente constitutivo: unir sujeto y objeto implica moverse a través del tiempo.",
    },
    {
      type: "info",
      tag: "Ser / devenir",
      title: "Todo está deviniendo",
      body: "Retoma del Romanticismo el Sein frente al Werden, el ser frente al devenir: no importa lo que es de manera estática, sino lo que se mueve, lo que deviene. Para Hegel siempre estamos en camino, nunca en reposo; el movimiento de convertirse en otra cosa es la esencia. Es un pensamiento inquieto y ansioso: nada puede quedarse quieto.",
    },
    {
      type: "info",
      tag: "Dialéctica",
      title: "De cantidad a calidad",
      body: "El movimiento no es parejo, sino a los saltos. Hay momentos en que los cambios de grado se vuelven cambios de clase: cuando la cantidad se transforma en calidad. El modelo es el agua que hierve: la calentás y no parece cambiar, hasta que a los 100 °C —¡bam!— salta a vapor. Ese grado entre 99 y 100 no es distinto de otro, pero ahí se produce el salto cualitativo.",
    },
    {
      type: "quiz",
      question: "La «transformación de la cantidad en calidad» describe…",
      options: [
        "Un cambio gradual y continuo, sin rupturas",
        "Un salto a otra clase de cosa tras acumular grados",
        "La reducción de todo fenómeno a números medibles",
        "El retorno cíclico de la historia a su punto de partida",
      ],
      answer: 1,
      explain: "Como el agua que hierve: los cambios de grado se acumulan hasta que, de golpe, hay un salto cualitativo a una forma nueva. La historia, para Hegel, se mueve así, a estallidos.",
    },
    {
      type: "info",
      tag: "Geist",
      title: "El Espíritu como «espíritu de equipo»",
      body: "Geist —«espíritu», mejor dejarlo en alemán— es el poder del todo. Jay Bernstein lo explica con el béisbol: pensá en espíritu de equipo. Pegarle a una pelota solo significa un home run dentro del contexto del equipo, las reglas, el otro equipo, el partido. Todo el significado viene del contexto. La fórmula de Hegel: «el yo que es un nosotros y el nosotros que es un yo».",
    },
    {
      type: "info",
      tag: "Totalidad",
      title: "Lo verdadero es el todo",
      body: "El lema de la Fenomenología es das Wahre ist das Ganze: «lo verdadero es el todo». Nada tiene significado tomado en aislamiento; todo es relacional, mutuamente dependiente. La Fenomenología es la Bildungsroman de la conciencia: esta atraviesa estadios de madurez, se vuelve autoconciencia y se fusiona con el Geist, superando la alienación —el gran problema de la modernidad—.",
    },
    {
      type: "quiz",
      question: "Cuando Hegel dice que el Geist es «el yo que es un nosotros», quiere decir que…",
      options: [
        "El individuo debe disolverse por completo en la masa",
        "El individuo solo tiene sentido en el todo social",
        "El Estado tiene siempre razón frente al individuo",
        "El espíritu es una sustancia material medible",
      ],
      answer: 1,
      explain: "Como el jugador dentro del equipo: fuera de contexto, pegarle a la pelota no significa nada. Para Hegel todo es relacional; el yo y el todo se constituyen mutuamente.",
    },
    {
      type: "info",
      tag: "Dialéctica",
      title: "El árbol frutal y el Aufheben",
      body: "La dialéctica ocurre cuando las contradicciones se encuentran: una posición se vuelve inestable y algo la niega. El ejemplo es el árbol: semilla, brote, flor, fruto. El fruto cancela la flor, pero no la borra: la supera, la preserva y la eleva hacia su telos. El verbo es aufheben —intraducible—: abolir sin cancelar del todo, conservar como momento de una síntesis superior.",
    },
    {
      type: "info",
      tag: "Retrospectiva",
      title: "El búho de Minerva y la crítica a Kant",
      body: "«El búho de Minerva emprende su vuelo al caer el crepúsculo»: solo mirando hacia atrás se entiende de qué se trataba algo. De ahí su polémica con Kant. Para Kant lo que cuenta es el motivo, no las consecuencias que no controlás. Hegel responde que es una noción inadecuada de la moral: las acciones casi siempre tienen consecuencias que exceden la intención, y su sentido solo aparece después.",
    },
    {
      type: "quiz",
      question: "¿En qué se diferencia Hegel de Kant respecto de la moral?",
      options: [
        "Para Hegel, como para Kant, solo cuenta la intención del agente",
        "Para Hegel el sentido se juzga después, por sus efectos",
        "Para Hegel la moral es imposible porque no hay libre albedrío",
        "Para Hegel las consecuencias no importan nunca, solo el deber",
      ],
      answer: 1,
      explain: "Kant se queda en la intención; Hegel dice que las acciones desbordan su intención y solo se entienden mirando atrás (el caso de Chamberlain en Múnich: buenas intenciones, desastre histórico).",
    },
    {
      type: "match",
      question: "Uní cada concepto hegeliano con lo que nombra",
      pairs: [
        { left: "Geist", right: "El poder del todo: «el yo que es un nosotros»" },
        { left: "Dialéctica", right: "El choque de contradicciones que empuja la historia" },
        { left: "Aufhebung", right: "Negar y a la vez preservar, elevando a un nivel superior" },
        { left: "Telos", right: "El fin ya codificado en el comienzo, como la manzana en la semilla" },
        { left: "Búho de Minerva", right: "El sentido de algo solo se comprende en retrospectiva" },
      ],
      explain: "Son las piezas del sistema: el Geist se despliega por dialéctica, cada estadio se supera por Aufhebung hacia su telos, y el todo solo se entiende mirando hacia atrás —el búho que vuela al anochecer—.",
    },
    {
      type: "info",
      tag: "Libertad",
      title: "La libertad es el reconocimiento de la necesidad",
      body: "Para Hegel todo sucede como debe suceder; el Espíritu tiene su propio impulso objetivo. La libertad es el reconocimiento de la necesidad: cuando descubrís por qué todo es como es, perdés el deseo de que sea de otro modo. Lo único inmoral es oponerse a ese gran proceso del mundo. La alienación es no comprender la propia existencia dentro del Geist, del todo.",
    },
    {
      type: "info",
      tag: "Amo y esclavo",
      title: "La dialéctica del amo y el esclavo",
      body: "El pasaje más influyente. Aunque el esclavo parece impotente y el amo todopoderoso, hay una inversión: el amo resulta esclavo del esclavo. La clave es el reconocimiento: el amo necesita ser reconocido para ser amo, pero ha rebajado al esclavo a la condición de objeto, y un objeto no puede dar reconocimiento satisfactorio. El esclavo, en cambio, al transformar el mundo con su trabajo, se subjetiva.",
    },
    {
      type: "classify",
      question: "Según la dialéctica del amo y el esclavo, ¿a quién corresponde cada rasgo?",
      groups: ["Amo", "Esclavo"],
      items: [
        { text: "Necesita ser reconocido por el otro para tener identidad", group: 0 },
        { text: "Transforma el mundo con su trabajo y se subjetiva", group: 1 },
        { text: "Queda insatisfecho: su reconocimiento viene de un objeto", group: 0 },
        { text: "Parece impotente, pero termina teniendo el poder real", group: 1 },
      ],
      explain: "La inversión dialéctica: el amo depende del esclavo para su identidad y solo recibe el reconocimiento de una cosa que él mismo cosificó; el esclavo, al trabajar y mediar con el mundo, se vuelve sujeto. Angela Davis lo lee así: la independencia del amo es un mito.",
    },
    {
      type: "quiz",
      question: "¿Por qué el amo queda finalmente insatisfecho?",
      options: [
        "Porque el esclavo se niega a trabajar para él",
        "Porque un objeto no puede reconocerlo",
        "Porque el amo desea en secreto ser esclavo",
        "Porque pierde su propiedad material",
      ],
      answer: 1,
      explain: "El amo quiere reconocimiento, pero lo aplastó al esclavo hasta volverlo cosa; un objeto no puede reconocerlo de verdad. Por eso depende del esclavo y su dominio se invierte.",
    },
    {
      type: "info",
      tag: "Síntesis",
      title: "La seducción del todo",
      body: "La fuerza de Hegel es la seducción de la totalidad: la sensación de que todo, al final, encaja y va a alguna parte. Miłosz la llamó la «mordida hegeliana»; Arendt dijo que su filosofía fue el último intento de reunir ser y pensamiento, sin saber si era una morada o una prisión para la realidad. Berlin lo vio como un bosque muy oscuro. La próxima clase, Marx lo pondrá «patas para arriba».",
    },
  ],
};
