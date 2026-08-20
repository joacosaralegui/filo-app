// Clase 9 (transcripción) — app Clase 8 — El psicoanálisis freudiano
// Feed de cards: 'info' (resume una idea de la clase) e interactivas (quiz/classify/match).
// Tono: resumen fiel de la clase. Preguntas exigentes, con distractores plausibles.
export default {
  num: 8,          // número mostrado en la app
  transcript: 9,   // número de la transcripción original (yale-filosofia/transcripciones)
  title: "El psicoanálisis freudiano",
  source: "https://www.youtube.com/watch?v=xklKq36LxFM",
  feed: [
    {
      type: "info",
      tag: "Panorama",
      title: "Del nosotros al yo",
      body: "Tras la Revolución Bolchevique surge un Estado totalitario que toma al pie de la letra la perfectibilidad ilustrada: quiere «reingeniar» a las personas y fundir el yo en el nosotros —«el yo viene del diablo; el nosotros, de Dios»—. Freud invierte el modelo: vuelve a la primera persona del singular, empieza en el individuo, y agrega un dualismo nuevo, consciente frente a inconsciente.",
    },
    {
      type: "info",
      tag: "El problema",
      title: "¿Se puede reingeniar a las personas?",
      body: "Los bolcheviques chocan con el problema que Robespierre ya nombró: los creadores del mundo nuevo están «contaminados» por haber nacido en el viejo. Es el «problema de Moisés»: hay que esperar en el desierto a que muera la generación con mentalidad de esclavos. ¿Pueden las personas transformarse en mitad de su vida, o hay que empezar de nuevo con la próxima generación?",
    },
    {
      type: "info",
      tag: "Contexto",
      title: "El teórico de la modernidad",
      body: "Freud nació en 1856, segundo de un trío de rebeldes contra el positivismo (con Husserl y Bergson). Judío asimilado, criado en Viena, ateo de por vida, se formó como médico —neurología, fisiología— en plena era positivista. Como Marx, hace una pregunta muy moderna: ¿por qué la gente es infeliz en el mundo moderno? Es el teórico de la modernidad desde el lado del sujeto.",
    },
    {
      type: "info",
      tag: "Ruptura",
      title: "Las ideas pueden enfermar",
      body: "Freud rompe con el positivismo médico al sostener que la mente puede ser causa de sus propias enfermedades. Estudia la histeria como resultado de un trauma infantil reprimido que vuelve disfrazado de síntoma. Luego da un paso aún más radical: no hace falta un hecho real; basta con que haya sido fantaseado o deseado. La enfermedad puede ser puramente mental.",
    },
    {
      type: "quiz",
      question: "¿Cómo invierte Freud el modelo hegeliano y bolchevique del yo y el nosotros?",
      options: [
        "Diluye el yo en el nosotros, como los bolcheviques",
        "Vuelve al individuo y lo parte en consciente e inconsciente",
        "Niega que exista el inconsciente y se queda solo con la conciencia",
        "Sostiene que el yo es transparente y plenamente racional",
      ],
      answer: 1,
      explain: "Donde el bolchevismo quiere fundir el yo en el nosotros, Freud regresa a la primera persona del singular. Y suma un dualismo nuevo: no solo subjetivo/objetivo, sino consciente/inconsciente, un corte que pasa por dentro del propio sujeto.",
    },
    {
      type: "info",
      tag: "Idea central",
      title: "El primado del inconsciente",
      body: "El psicoanálisis es el proceso por el que se induce al inconsciente a revelarse. Para Freud, todo lo importante ocurre allí: es el primado del inconsciente. Las neurosis resultan de deseos reprimidos que se escurren como culpa, síntomas o sublimaciones. Como todos tenemos trauma reprimido, se sigue algo perturbador: todos estamos, en algún grado, enfermos mentales.",
    },
    {
      type: "info",
      tag: "La cura",
      title: "Curar hablando",
      body: "Lo más radical del método es que el tratamiento es puramente hablar. La paciente fundadora, Anna O., mejora al poner en palabras lo reprimido. El analizante se acuesta en el diván y practica la asociación libre —decir lo que venga, sin filtrar—; el analista escucha y algo se escurre por las grietas. No cura mágicamente, pero permite lidiar con eso. Es el poder de las palabras, y algo muy burgués: exige mucho tiempo y dinero.",
    },
    {
      type: "info",
      tag: "Infancia",
      title: "Sexualidad infantil y complejo de Edipo",
      body: "El inconsciente empieza muy temprano, y la infancia es formativa y necesariamente traumática. Freud sostiene, escandalosamente, que la sexualidad empieza en la infancia (con una definición amplísima de lo sexual, más allá del coito). En el complejo de Edipo el niño desea a la madre y resiente al padre, hasta desear secretamente su muerte; basta con que el pensamiento titile y se reprima.",
    },
    {
      type: "quiz",
      question: "¿Qué le basta a Freud para hablar de «complejo de Edipo» en un niño?",
      options: [
        "Que efectivamente intente hacerle daño a su padre",
        "Que el deseo apenas titile o aparezca en un sueño",
        "Que la madre fomente ese deseo de forma consciente",
        "Que el niño haya sufrido un abuso real y comprobable",
      ],
      answer: 1,
      explain: "Freud no dice que los niños maten a sus padres. Le alcanza con que la fantasía titile un instante o aparezca en un sueño: ese deseo se reprime enseguida y se empuja al inconsciente, de donde —como todo lo reprimido— volverá a salir.",
    },
    {
      type: "info",
      tag: "Modelo",
      title: "Ello, yo y superyó",
      body: "El modelo del aparato psíquico es estructural: dos capas verticales (inconsciente y consciente) y tres instancias horizontales. El ello (das Es) es puro libido y deseo, inconsciente. El superyó (das Über-Ich) es la conciencia moral, fuente de la culpa y sociedad internalizada. El yo (das Ich) queda en el medio, negociando sin descanso entre ambos: por eso vivimos en conflicto con nosotros mismos.",
    },
    {
      type: "info",
      tag: "Pulsiones",
      title: "Eros y Tánatos",
      body: "El deseo del ello se subdivide en dos pulsiones «cableadas», que se aceptan como los postulados de la geometría: Eros, la pulsión de vida —deseo, sexo, placer—, y Tánatos, la pulsión de muerte —agresión, ira, matar—. Son universales y primordiales. El yo es un sistema energético cerrado: la energía se traslada pero no desaparece, y lo reprimido siempre vuelve (el retorno de lo reprimido).",
    },
    {
      type: "match",
      question: "Uní cada instancia o pulsión con lo que le corresponde",
      pairs: [
        { left: "Ello (das Es)", right: "Puro libido y deseo, inconsciente" },
        { left: "Yo (das Ich)", right: "El que negocia entre las otras dos instancias" },
        { left: "Superyó (das Über-Ich)", right: "La conciencia moral: culpa y sociedad internalizada" },
        { left: "Eros", right: "La pulsión de vida: deseo, sexo, placer" },
        { left: "Tánatos", right: "La pulsión de muerte: agresión e ira" },
      ],
      explain: "El aparato psíquico freudiano es una estructura en tensión: el ello empuja (Eros y Tánatos), el superyó prohíbe y culpabiliza, y el yo media entre ambos. Como es un sistema cerrado, la energía reprimida no desaparece: vuelve por otra puerta.",
    },
    {
      type: "info",
      tag: "Religión",
      title: "Dios como ilusión infantil",
      body: "Freud es ateo: la religión es una ilusión reaccionaria, ligada a la infancia. El niño descubre que el padre no es omnipotente, que no puede protegerlo de los horrores del mundo, y transfiere ese deseo de un padre todopoderoso a otra cosa: Dios. Para Freud, Dios es un fenómeno infantil —el anhelo de un ser eterno que nos cuide—, pero no lo hay.",
    },
    {
      type: "info",
      tag: "Sociedad",
      title: "El malestar en la civilización",
      body: "La civilización —vivir juntos— se basa en reprimir tanto Eros como Tánatos: en el fondo, dice Freud, querríamos violar y matarnos todo el tiempo, y convivir consiste en reprimir esos deseos. Es psíquicamente costoso: si Hobbes cambiaba libertad por seguridad, la sociedad freudiana cambia felicidad por seguridad. El principio de placer está reñido con el principio de realidad.",
    },
    {
      type: "quiz",
      question: "Según El malestar en la civilización, ¿qué intercambio impone la vida en sociedad?",
      options: [
        "Cambia seguridad por libertad, como en Locke",
        "Cambia felicidad por seguridad: reprimir instintos",
        "Elimina por completo la agresión humana mediante la educación",
        "Cambia razón por fe, restaurando la religión",
      ],
      answer: 1,
      explain: "Donde Hobbes cambiaba libertad por seguridad, Freud dice que la civilización cambia felicidad por seguridad. Convivir exige reprimir los instintos —sexuales y agresivos—, y esa represión, necesaria, nos drena la energía que iría al placer.",
    },
    {
      type: "info",
      tag: "Comparación",
      title: "Freud frente a Marx",
      body: "Ambos tienen alcance grandioso y un modelo donde el inconsciente es a la conciencia lo que la base a la superestructura. Pero difieren: para Marx todo es lucha de clases; para Freud, represión. Marx es materialista; Freud, antimaterialista: lo que la propiedad es para Marx, la sexualidad lo es para él. Y les reprocha ignorar a Tánatos: la agresión está cableada, es anterior al capitalismo.",
    },
    {
      type: "classify",
      question: "¿Cada tesis es de Freud o de Marx?",
      groups: ["Freud", "Marx"],
      items: [
        { text: "La raíz de todo es la represión sexual", group: 0 },
        { text: "La raíz de todo es la lucha de clases", group: 1 },
        { text: "La religión es una ilusión infantil", group: 0 },
        { text: "La religión es el opio de los pueblos", group: 1 },
        { text: "La agresión (Tánatos) está cableada, es anterior al capitalismo", group: 0 },
        { text: "Cambiando las condiciones materiales se supera la alienación", group: 1 },
      ],
      explain: "Freud y Marx comparten la ambición monocausal, pero cada uno pone otra cosa en el fondo: represión y sexualidad frente a lucha de clases y propiedad. Por eso Freud no cree en el «felices para siempre»: los instintos no se abolen cambiando las condiciones.",
    },
    {
      type: "info",
      tag: "Cierre",
      title: "No podemos conocernos",
      body: "Para Freud lo esencial de nosotros está oculto en el inconsciente: el yo no es idéntico a sí mismo, nunca es transparente, no podemos conocernos del todo. Es una teoría de la vida después de la muerte de Dios, y —a diferencia del marxismo— no promete salida: alivia síntomas, pero el yo sigue en conflicto consigo mismo y la sociedad, reñida con la felicidad.",
    },
  ],
};
