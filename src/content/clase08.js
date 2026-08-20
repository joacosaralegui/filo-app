// Clase 8 (transcripción) — app Clase 7 — El leninismo: acelerar la historia
// Feed de cards: 'info' (resume una idea de la clase) e interactivas (quiz/classify/match).
// Tono: resumen fiel de la clase. Preguntas exigentes, con distractores plausibles.
export default {
  num: 7,          // número mostrado en la app
  transcript: 8,   // número de la transcripción original (yale-filosofia/transcripciones)
  title: "El leninismo: acelerar la historia",
  source: "https://www.youtube.com/watch?v=2F3PzB2iVa4",
  feed: [
    {
      type: "info",
      tag: "Panorama",
      title: "¿Se puede apurar la historia?",
      body: "Volvemos al tiempo, ahora con un elemento nuevo: la velocidad. Estamos en tiempo marxista, heredado de Hegel: la historia se mueve en una dirección, hacia un telos, y no se puede retroceder. Pero Marx no dice cuánto dura cada etapa. La pregunta de Lenin: si sabemos hacia dónde va la Historia, ¿podemos empujarla para que llegue más rápido?",
    },
    {
      type: "info",
      tag: "Contexto",
      title: "Marx desde el centro industrial",
      body: "Marx y Engels piensan desde Alemania, Francia e Inglaterra, donde la Ilustración fue más fuerte y la industrialización avanza rápido: campesinos que migran a las ciudades y se vuelven obreros, economía monetaria, capital que se acumula. Desde ahí parece que las etapas de la historia van a toda velocidad. Pero eso no representa a toda Europa, y menos al resto del mundo.",
    },
    {
      type: "info",
      tag: "El problema",
      title: "Lenin y el Imperio zarista",
      body: "Lenin lee toda esa filosofía, pero viene de otra parte: el Imperio ruso de fines del siglo XIX, donde la modernización casi no ocurre. Autocracia, un zar, nobleza y campesinado: en esencia, feudalismo. El capitalismo no llegó, la industrialización tampoco, y la enorme mayoría del país es campesinado. Según Marx, la revolución proletaria debería estar lejísimos.",
    },
    {
      type: "info",
      tag: "Impaciencia",
      title: "La conciencia de clase no llega",
      body: "El marxismo clásico espera que los obreros adquieran conciencia de clase naturalmente: el ser precede a la conciencia. Pero eso no es solo saber que la vida es miserable; es comprender el todo, ver cómo encajan las piezas —comprender a Hegel—. Los obreros entienden que quieren mejor paga y jornadas más cortas, pero no la dialéctica histórica. Y Lenin es impaciente.",
    },
    {
      type: "quiz",
      question: "¿En qué consiste, exactamente, la modificación que Lenin le hace al marxismo?",
      options: [
        "Cambia la dirección de la historia: ya no va hacia el comunismo",
        "Niega que exista una ciencia de las leyes de la historia",
        "No cambia el rumbo: busca cómo acelerar la historia",
        "Sostiene que la revolución debe ser pacífica y gradual",
      ],
      answer: 2,
      explain: "Lenin no discute el telos ni la dirección marxista: los da por ciertos. Lo que inventa es un método para apurar la Historia con mayúscula, porque, librada a su ritmo natural, tardaría demasiado —quizá más que su propia vida—.",
    },
    {
      type: "info",
      tag: "Pensar en chico",
      title: "Economismo, sindicalismo, espontaneidad",
      body: "Lenin observa que, cuando los obreros hacen huelga, piden algo chico: mejor paga, jornada más corta, una pausa más larga. No ven el cuadro completo ni piensan en derrocar el sistema entero. Tiene varios nombres para eso: sindicalismo (actuar como gremio, no como revolucionarios), economismo y espontaneidad (pedir lo inmediato y material, sin reflexión crítica).",
    },
    {
      type: "info",
      tag: "Obra · 1902",
      title: "¿Qué hacer? (Shto Delat)",
      body: "En 1902 Lenin escribe ¿Qué hacer?, quizá el texto más influyente del siglo XX —no por brillante, sino por su capacidad de torcer la historia, como una bomba—. Resuelve el «problema calvinista» del marxismo (si todo pasará solo, ¿para qué actuar?) dándoles un papel a los intelectuales. La conciencia socialista, dice, hay que llevársela a los obreros «desde afuera».",
    },
    {
      type: "info",
      tag: "El Partido",
      title: "La vanguardia de revolucionarios profesionales",
      body: "La solución: una vanguardia leninista de revolucionarios profesionales que hacen de la agitación su oficio y le llevan la conciencia de clase a los trabajadores como un regalo, para arrancar el ritmo lento de la historia. Esa organización es el Partido, con mayúscula. Ser miembro es consagrarle la vida, vivir en la conspiración y estar dispuesto a morir por él.",
    },
    {
      type: "quiz",
      question: "Para Lenin, ¿por qué la conciencia de clase debe llegarle al proletariado «desde afuera»?",
      options: [
        "Porque los obreros son incapaces de toda organización colectiva",
        "Porque sola no pasa de la conciencia sindical",
        "Porque la verdadera revolución debe venir de la burguesía ilustrada",
        "Porque Marx había prohibido expresamente que los obreros se organizaran",
      ],
      answer: 1,
      explain: "Lenin acepta que los sindicatos son mejores que nada, pero cree que la clase obrera sola no pasa de la conciencia sindical («pensar en chico»). Captar la totalidad —cómo encajan las piezas— requiere la vanguardia de revolucionarios profesionales.",
    },
    {
      type: "info",
      tag: "Interlocutores",
      title: "Rosa Luxemburg contra Lenin",
      body: "Rosa Luxemburg —revolucionaria judía polaca, luego líder del comunismo alemán, brillante e intransigente— ve la modificación leninista como un error, por dos razones: hay que confiar en las leyes de la historia y en los trabajadores, que llegarán solos a la conciencia; y toda élite termina volviéndose conservadora. Su centralismo, dice, se parece al jacobinismo y al Terror.",
    },
    {
      type: "info",
      tag: "Interlocutores",
      title: "Lukács a favor del Partido",
      body: "Georg Lukács, filósofo marxista húngaro, ama a Luxemburg pero se pone del lado de Lenin. En Historia y conciencia de clase sostiene que todo el marxismo se sostiene sobre la categoría de totalidad: el sindicalismo no logra captarla, y a veces hay que «saltar y meterse». El Partido es la encarnación de la conciencia de clase, y sabe lo que piensan los obreros antes que ellos mismos.",
    },
    {
      type: "classify",
      question: "¿Cada posición es de Lenin o de Rosa Luxemburg?",
      groups: ["Lenin", "Luxemburg"],
      items: [
        { text: "Hace falta una vanguardia de revolucionarios profesionales", group: 0 },
        { text: "Hay que apurar la historia, no sentarse a esperarla", group: 0 },
        { text: "La conciencia de clase se le lleva al obrero «desde afuera»", group: 0 },
        { text: "El movimiento comunista ES el proletariado, no una élite", group: 1 },
        { text: "Toda élite dirigente termina volviéndose conservadora", group: 1 },
        { text: "El centralismo de partido se acerca al jacobinismo y al Terror", group: 1 },
      ],
      explain: "Lenin quiere acelerar la historia con una vanguardia que aporte la conciencia desde afuera. Luxemburg confía en las leyes de la historia y en los trabajadores, y desconfía de toda élite: la energía revolucionaria viene del proletariado mismo, no de un comité central.",
    },
    {
      type: "info",
      tag: "1903",
      title: "Bolcheviques y mencheviques",
      body: "En 1903, el partido comunista del Imperio zarista se parte en dos. Los bolcheviques (de «mayoría») acompañan la modificación de Lenin y quieren apurar la historia; los mencheviques (de «minoría») adoptan una línea marxista más conservadora: hay que esperar a que la historia se despliegue, confiar en ella. La escisión será decisiva.",
    },
    {
      type: "info",
      tag: "1905",
      title: "El ensayo general",
      body: "1905 fue un «ensayo general» de la revolución: una ola de huelgas, protestas y levantamientos campesinos sin dirección unificada. El punto de quiebre es el Domingo Sangriento —la policía del zar dispara contra una manifestación pacífica de trabajadores y mata a más de cien—, que radicaliza al país. El zar concede una Duma y algo parecido a una constitución, pero un año después se echa atrás. No fue una revolución, pero algo quedó instalado.",
    },
    {
      type: "info",
      tag: "1917",
      title: "La abdicación y el doble poder",
      body: "En 1917, con la Primera Guerra, el imperio está empobrecido, hambriento y harto. Los soldados empiezan a amotinarse y a negarse a combatir, y en marzo el zar Nicolás II abdica: siglos de dinastía Románov caídos en plena guerra mundial, y nadie sabe bien quién manda. Surge el «doble poder»: por un lado un gobierno provisional, burgués y liberal; por otro el Soviet de Petrogrado, más socialista y proletario.",
    },
    {
      type: "info",
      tag: "Octubre",
      title: "El poder tirado en la calle",
      body: "Lenin, exiliado en Suiza, vuelve en un vagón de tren alemán sellado —los alemanes querían sacar a Rusia de la guerra—. Exige salir ya del conflicto y todo el poder para el Soviet. En octubre de 1917 los bolcheviques toman el poder. Lenin dirá que «encontró el poder tirado en la calle y lo levantó»: audacia pura en medio del caos.",
    },
    {
      type: "quiz",
      question: "¿Por qué se llama «proletariado metafísico» al que representaban los bolcheviques en 1917?",
      options: [
        "Porque eran una mayoría abrumadora de obreros industriales",
        "Porque casi no había obreros: se hizo en su nombre",
        "Porque los bolcheviques rechazaban toda idea de clase social",
        "Porque el proletariado ruso era más culto y filosófico que el occidental",
      ],
      answer: 1,
      explain: "La clase obrera urbana era una minoría ínfima (unos 3 millones sobre 167). La toma del poder no fue una revolución obrera, sino en nombre de los obreros —incluso de los que recién existirían una vez apurada la industrialización—.",
    },
    {
      type: "match",
      question: "Uní cada término con lo que le corresponde",
      pairs: [
        { left: "¿Qué hacer? (1902)", right: "El método leninista para apurar la historia" },
        { left: "Bolcheviques", right: "La mayoría que quiso acelerar la revolución (1903)" },
        { left: "Mencheviques", right: "La minoría que prefería esperar a la historia" },
        { left: "Brest-Litovsk", right: "La paz por separado con Alemania (1918)" },
        { left: "Trotsky", right: "Cruzó del menchevismo al bolchevismo" },
      ],
      explain: "El leninismo nace en ¿Qué hacer?, se institucionaliza en la escisión de 1903 (bolcheviques vs. mencheviques) y llega al poder en 1917; Brest-Litovsk sella la salida de la guerra y Trotsky, antes menchevique, termina liderando junto a Lenin.",
    },
    {
      type: "info",
      tag: "Cierre",
      title: "Contingencia y catástrofe",
      body: "Lo que sigue es el experimento de ingeniería social más vasto jamás hecho sobre la humanidad, y la lección de cómo un exceso de fe en la perfectibilidad humana puede llevar a las cámaras de tortura. Pero también una lección de contingencia: si algo le pasa a ese vagón sellado y Lenin no llega a Petrogrado, es discutible que haya Revolución Bolchevique, y el siglo XX no sería el que conocemos.",
    },
  ],
};
