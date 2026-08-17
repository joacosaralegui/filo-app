// Diccionario filosófico. Cada entrada se auto-linkea en las cards:
// agregar una entrada acá la vuelve clicable en todo el contenido.
//
// Campos:
//   term  : nombre canónico que se muestra en el modal
//   aka   : formas que aparecen en el texto y deben detectarse (incluí el canónico)
//   kind  : 'autor' | 'concepto' | 'obra' | 'evento'
//   when  : fechas de referencia (autor: nacimiento–muerte; concepto/obra/evento: época)
//   body  : explicación breve y en profundidad

export const GLOSSARY = {
  // ---------- autores ----------
  descartes: {
    term: "René Descartes",
    aka: ["Descartes", "René Descartes"],
    kind: "autor",
    when: "1596–1650",
    body: "Filósofo y matemático francés, considerado el padre de la filosofía moderna. Su método de duda radical buscó un fundamento indudable para el conocimiento y lo halló en el sujeto que piensa (cogito, ergo sum). Inauguró el giro hacia la epistemología y la subjetividad que domina el pensamiento moderno.",
  },
  nietzsche: {
    term: "Friedrich Nietzsche",
    aka: ["Nietzsche", "Friedrich Nietzsche"],
    kind: "autor",
    when: "1844–1900",
    body: "Filósofo alemán, posromántico y protoexistencialista. Proclamó que «Dios ha muerto» para describir el derrumbe de los fundamentos religiosos y metafísicos de la cultura europea. Da nombre al curso: el punto donde el desplazamiento ilustrado de Dios se vuelve su negación explícita.",
  },
  weber: {
    term: "Max Weber",
    aka: ["Max Weber", "Weber"],
    kind: "autor",
    when: "1864–1920",
    body: "Sociólogo y economista alemán, uno de los fundadores de la sociología moderna. Acuñó la idea de Entzauberung («desencanto del mundo») para nombrar el proceso por el cual la racionalización moderna expulsa lo mágico y lo sagrado de la experiencia.",
  },
  hobbes: {
    term: "Thomas Hobbes",
    aka: ["Thomas Hobbes", "Hobbes"],
    kind: "autor",
    when: "1588–1679",
    body: "Filósofo político inglés. En el Leviatán (1651) describe el estado de naturaleza como una guerra de todos contra todos y sostiene que solo un soberano absoluto puede garantizar la paz. Precursor de la teoría del contrato social, en su versión más pesimista.",
  },
  locke: {
    term: "John Locke",
    aka: ["John Locke", "Locke"],
    kind: "autor",
    when: "1632–1704",
    body: "Filósofo inglés, padre del liberalismo político. En sus Dos tratados sobre el gobierno (1689) funda el poder en el consentimiento de los gobernados y defiende un contrato social revocable: si el gobernante abusa, el pueblo puede reemplazarlo.",
  },
  voltaire: {
    term: "Voltaire",
    aka: ["Voltaire"],
    kind: "autor",
    when: "1694–1778",
    body: "Seudónimo de François-Marie Arouet, escritor y philosophe francés. Defensor del deísmo y, sobre todo, de la tolerancia contra el fanatismo religioso. Su lema «écrasez l'infâme» («aplastad la infamia») resume su combate contra la superstición y el absolutismo.",
  },
  rousseau: {
    term: "Jean-Jacques Rousseau",
    aka: ["Jean-Jacques Rousseau", "Rousseau"],
    kind: "autor",
    when: "1712–1778",
    body: "Filósofo ginebrino. Invierte a Hobbes: para él el estado de naturaleza era de virtud, y la propiedad corrompió al hombre. Su concepto de voluntad general (El contrato social, 1762) fundó una idea de soberanía popular que más tarde se invocaría para justificar el Terror.",
  },
  kant: {
    term: "Immanuel Kant",
    aka: ["Immanuel Kant", "Kant"],
    kind: "autor",
    when: "1724–1804",
    body: "Filósofo alemán, figura central de la Ilustración. En epistemología distinguió el fenómeno (lo que conocemos) de la cosa en sí (Ding an sich), inaccesible. Su «revolución copernicana» sostiene que el objeto se conforma a la mente, no al revés. Definió la Ilustración como la salida del hombre de su inmadurez.",
  },
  berlin: {
    term: "Isaiah Berlin",
    aka: ["Isaiah Berlin"],
    kind: "autor",
    when: "1909–1997",
    body: "Historiador de las ideas británico. Usó la metáfora del rompecabezas para describir la fe ilustrada en el progreso: cada pieza de conocimiento acerca al todo y facilita la siguiente. También estudió la Contra-Ilustración y el pluralismo de valores.",
  },
  newton: {
    term: "Isaac Newton",
    aka: ["Isaac Newton", "Newton"],
    kind: "autor",
    when: "1643–1727",
    body: "Físico y matemático inglés. Sus leyes del movimiento y la gravitación encarnaron el ideal ilustrado: el mundo puede descifrarse mediante observación y experimentación cuidadosas. Precursor del empirismo y del optimismo científico del siglo XVIII.",
  },

  // ---------- conceptos ----------
  ilustracion: {
    term: "Ilustración",
    aka: ["Ilustración", "Aufklärung"],
    kind: "concepto",
    when: "fines s. XVII – XVIII",
    body: "Movimiento intelectual europeo que exalta la razón como vía para comprender y mejorar el mundo. Desplaza a Dios del centro del pensamiento, confía en el progreso y culmina políticamente en la Revolución Francesa de 1789. Reúne filosofías diversas y a veces contradictorias.",
  },
  entzauberung: {
    term: "Entzauberung (desencanto)",
    aka: ["Entzauberung", "desencanto"],
    kind: "concepto",
    when: "concepto de Weber, s. XX",
    body: "«Desencantamiento del mundo»: el proceso por el cual la explicación racional y empírica expulsa a los milagros, lo mágico y lo sagrado. Weber lo describe como rasgo de la modernidad. Los ilustrados lo vivían con regocijo; los románticos, como una pérdida.",
  },
  cogito: {
    term: "Cogito, ergo sum",
    aka: ["cogito, ergo sum", "cogito", "pienso, luego existo"],
    kind: "concepto",
    when: "Descartes, 1637 / 1641",
    body: "«Pienso, luego existo». Punto de certeza que sobrevive a la duda radical: aunque un genio maligno me engañara sobre todo, no puede engañarme sobre el hecho de que estoy pensando. La existencia del sujeto pensante es la primera verdad indudable de la filosofía moderna.",
  },
  contrato_social: {
    term: "Contrato social",
    aka: ["contrato social"],
    kind: "concepto",
    when: "s. XVII–XVIII",
    body: "Teoría que explica el paso del estado de naturaleza a la sociedad organizada como un pacto. Cada pensador lo imagina distinto: para Hobbes justifica al soberano absoluto; para Locke, el gobierno por consentimiento; para Rousseau, la voluntad general.",
  },
  estado_naturaleza: {
    term: "Estado de naturaleza",
    aka: ["estado de naturaleza"],
    kind: "concepto",
    when: "s. XVII–XVIII",
    body: "Situación hipotética de la humanidad antes del gobierno y la sociedad. Es puramente imaginaria —no hay acceso a ella—, así que funciona como espejo de cada filosofía: guerra para Hobbes, libertad e igualdad para Locke, virtud perdida para Rousseau.",
  },
  leviatan: {
    term: "Leviatán",
    aka: ["Leviatán"],
    kind: "obra",
    when: "Hobbes, 1651",
    body: "Obra mayor de Hobbes y nombre del soberano absoluto que propone: un poder al que los individuos ceden sus derechos a cambio de seguridad. Su tesis: sin ese poder común, la vida es «desagradable, brutal y breve».",
  },
  consentimiento: {
    term: "Consentimiento de los gobernados",
    aka: ["consentimiento de los gobernados"],
    kind: "concepto",
    when: "Locke, 1689",
    body: "Idea de que la legitimidad del gobierno no proviene del derecho divino de los reyes, sino del acuerdo de quienes son gobernados. Base del liberalismo y de la Declaración de los Derechos del Hombre. Implica que el poder es condicional y revocable.",
  },
  liberalismo: {
    term: "Liberalismo",
    aka: ["liberalismo"],
    kind: "concepto",
    when: "desde fines s. XVIII",
    body: "Tradición política nacida de Locke y de la Revolución Francesa: derechos naturales del individuo (libertad, propiedad, seguridad), gobierno por consentimiento y límites al poder. La Declaración de 1789 es uno de sus documentos fundacionales.",
  },
  deismo: {
    term: "Deísmo",
    aka: ["deísmo"],
    kind: "concepto",
    when: "s. XVIII",
    body: "Posición intermedia entre el Dios cristiano y el agnosticismo: Dios existe y creó el mundo, pero luego se retiró y no interviene como un titiritero. Permite conservar un orden moral sin superstición ni absolutismo religioso. Voltaire es su figura clave.",
  },
  philosophes: {
    term: "Philosophes",
    aka: ["philosophes"],
    kind: "concepto",
    when: "Francia, s. XVIII",
    body: "Los filósofos franceses de la Ilustración: cosmopolitas, seculares y comprometidos con el mundo (engagé). Unen teoría y praxis y no se encierran en la epistemología abstracta. Voltaire, Diderot y Rousseau están entre ellos.",
  },
  voluntad_general: {
    term: "Voluntad general",
    aka: ["voluntad general"],
    kind: "concepto",
    when: "Rousseau, 1762",
    body: "Concepto central de El contrato social de Rousseau: no es la suma de intereses individuales ni la mera mayoría, sino una idea del «todo» social como fuente de autoridad. Su indeterminación la volvió peligrosa: se la invocó para legitimar el Terror.",
  },
  terror: {
    term: "El Terror",
    aka: ["Terror"],
    kind: "evento",
    when: "1793–1794",
    body: "Fase radical de la Revolución Francesa, marcada por ejecuciones masivas en nombre de la virtud republicana y la voluntad general. Robespierre fue su figura central. Suele leerse como el «lado oscuro» de la razón revolucionaria llevada al extremo.",
  },
  sapere_aude: {
    term: "Sapere aude",
    aka: ["sapere aude"],
    kind: "concepto",
    when: "lema retomado por Kant, 1784",
    body: "«Atrévete a saber». Frase de Horacio que Kant convierte en lema de la Ilustración: ten el valor de servirte de tu propio entendimiento sin la tutela de una autoridad. No es un llamado revolucionario, sino a la mayoría de edad intelectual.",
  },
  ding_an_sich: {
    term: "Ding an sich (cosa en sí)",
    aka: ["Ding an sich", "cosa en sí"],
    kind: "concepto",
    when: "Kant, 1781",
    body: "La «cosa en sí»: la realidad tal como es, con independencia de la mente. Kant afirma que existe, pero que no tenemos acceso a ella: solo conocemos el fenómeno, el mundo ya filtrado por las estructuras de nuestra percepción y entendimiento.",
  },
  rev_copernicana: {
    term: "Revolución copernicana (de Kant)",
    aka: ["revolución copernicana"],
    kind: "concepto",
    when: "Kant, 1781",
    body: "Giro epistemológico por analogía con Copérnico: así como la Tierra gira en torno al Sol y no al revés, no es la mente la que se adapta al mundo, sino lo que percibimos del mundo lo que se conforma a las categorías de la mente.",
  },
  rev_francesa: {
    term: "Revolución Francesa",
    aka: ["Revolución Francesa"],
    kind: "evento",
    when: "1789–1799",
    body: "Culminación política de la Ilustración. Sustituye el derecho divino por el consentimiento de los gobernados y convierte súbditos en ciudadanos. Inventa la ideología como proyecto de reordenar la sociedad según la razón, y desemboca en el Terror.",
  },
  modernizacion: {
    term: "Modernización",
    aka: ["modernización"],
    kind: "concepto",
    when: "desde s. XVIII",
    body: "Los cambios materiales y técnicos ligados a la modernidad: industrialización, urbanización, capitalismo, economía monetaria, mejoras en transporte y comunicaciones. Se distingue de la modernidad (el período) y del modernismo (la respuesta estética).",
  },
  modernidad: {
    term: "Modernidad",
    aka: ["modernidad"],
    kind: "concepto",
    when: "desde 1789",
    body: "El período histórico que abre la Ilustración, datado por los historiadores europeos en 1789. No confundir con modernización (los cambios materiales) ni con modernismo (la respuesta estética en arte y literatura).",
  },
  modernismo: {
    term: "Modernismo",
    aka: ["modernismo"],
    kind: "concepto",
    when: "fines s. XIX – XX",
    body: "La respuesta estética a la modernidad en literatura, arte y filosofía. Se distingue de la modernidad (el período) y de la modernización (los cambios materiales que le dan origen).",
  },
  empirismo: {
    term: "Empirismo",
    aka: ["empirismo"],
    kind: "concepto",
    when: "s. XVII–XVIII",
    body: "Doctrina según la cual el conocimiento se gana por la experiencia sensorial y la observación. Newton es su modelo científico. Del empirismo derivará el positivismo, que entiende el mundo solo según la observación, sin nada metafísico.",
  },
  positivismo: {
    term: "Positivismo",
    aka: ["positivismo"],
    kind: "concepto",
    when: "s. XIX",
    body: "Heredero del empirismo: solo cuenta como conocimiento lo verificable por la observación empírica, sin fuerzas sobrenaturales ni metafísica. Encarna la aspiración ilustrada de entender la sociedad con el rigor de las ciencias naturales.",
  },

  // ---------- obras / figuras culturales ----------
  montana_magica: {
    term: "La montaña mágica",
    aka: ["La montaña mágica"],
    kind: "obra",
    when: "Thomas Mann, 1924",
    body: "Novela de Thomas Mann. Su personaje Settembrini encarna —de forma casi caricaturesca— el optimismo ilustrado: la fe en la razón, el progreso y la palabra. Sirve para retratar tanto la grandeza como los límites del espíritu de la Ilustración.",
  },
  settembrini: {
    term: "Settembrini",
    aka: ["Settembrini"],
    kind: "concepto",
    when: "personaje, 1924",
    body: "Personaje de La montaña mágica de Thomas Mann: un humanista que defiende «la razón, el análisis, la acción, el progreso». Descrito como «la Ilustración que habla demasiado», condensa el ideal —y el exceso— ilustrado.",
  },
};
