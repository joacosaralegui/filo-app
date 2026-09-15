<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import InfoCard from "./InfoCard.svelte";
  import QuizCard from "./QuizCard.svelte";
  import MatchCard from "./MatchCard.svelte";
  import ClassifyCard from "./ClassifyCard.svelte";
  import ShortCard from "./ShortCard.svelte";
  import ExplainSheet from "./ExplainSheet.svelte";
  import CromoReveal from "./CromoReveal.svelte";
  import Burst from "./Burst.svelte";
  import { classState, saveClass, resetClass, SCORABLE } from "./progress.js";
  import { imagenDeClase } from "./cromos.js";
  import { findCourse } from "../content/courses.js";
  import { readingProgress } from "./readingProgress.js";

  export let lecture;
  export let classes = []; // índice del curso, para saber cuál es la siguiente
  export let courseId = null; // para el título y la ilustración de la clase
  const dispatch = createEventDispatcher();

  // Curso: Clase N — el título completo de la clase no entra en la barra.
  const courseTitle = findCourse(courseId)?.title || "";

  const totalQuiz = lecture.feed.filter((c) => SCORABLE.has(c.type)).length;

  // La clase abre con una slide de portada, así que la card `i` del feed vive
  // en la slide `i + PORTADA`. En repaso no hay portada y las slides son otras:
  // todo lo que traduce entre índice de feed e índice de slide pasa por
  // `slideDe` (más abajo), que contempla los dos casos.
  const PORTADA = 1;

  // Correcto según el tipo. 'quiz' guarda el índice elegido (número); el resto
  // ('match', 'classify', 'short') guarda un objeto con { correct } más el
  // estado necesario para restaurar la card al reanudar.
  function isCorrect(card, a) {
    if (a === null || a === undefined) return false;
    if (card.type === "quiz") return a === card.answer;
    return !!a.correct;
  }

  // Cierre de la clase: invitar a la siguiente. La entrada inmediatamente
  // posterior por número; disponible (nextClass) o aún bloqueada (lockedNext).
  // Si no hay ninguna posterior, es la última del curso.
  const laterClasses = classes.filter((c) => c.num > lecture.num);
  const immediateNext = laterClasses[0] || null;
  const nextClass = immediateNext && immediateNext.content ? immediateNext : null;
  const lockedNext = immediateNext && !immediateNext.content ? immediateNext : null;

  // Estado restaurado desde localStorage (o valores por defecto).
  const saved = classState(lecture.num);
  let answers = { ...saved.answers }; // { [cardIndex]: índice original elegido }
  let combo = saved.combo;
  let currentCard = saved.card;

  // --- modo repaso ---
  // Al terminar la clase con errores se puede volver a hacer SÓLO las que
  // fallaste. `repasando` es la lista de índices de feed en repaso (null =
  // modo normal): mientras está activa, el feed muestra nada más que esas
  // cards y sus respuestas vuelven a estar sin contestar, así que la puerta,
  // el burst y el guardado funcionan igual que en la primera vuelta.
  //
  // La nota no se calcula aparte: `answers` es la única fuente, y acertar en
  // el repaso pisa la respuesta fallada. Por eso recuperar todas devuelve las
  // 3★ de verdad — las mismas que habilitan los cromos de pensador y
  // corriente, sin marca de asterisco.
  let repasando = null;
  // Sube cada vez que se entra o se sale del repaso: entra en la key de las
  // cards para forzar su remontaje (ver el feed más abajo).
  let pase = 0;
  // Resultado del último repaso de esta visita, para la tarjeta de cierre.
  let repasadas = 0;
  let recuperadas = 0;

  // Las interactivas que están respondidas MAL ahora mismo.
  function calcFalladas(ans) {
    return lecture.feed
      .map((c, i) => (SCORABLE.has(c.type) && ans[i] != null && !isCorrect(c, ans[i]) ? i : -1))
      .filter((i) => i >= 0);
  }
  $: falladas = calcFalladas(answers);

  // Correctas y "puerta" en función de un `answers` dado — funciones puras,
  // no reactivas: además de alimentar la UI (abajo) las necesita `onAnswer`
  // para calcular `stars`/`done` en el momento exacto de guardar, sin
  // esperar a que Svelte recalcule los `$:` (que corre en el siguiente
  // tick, no en la misma línea).
  function calcCorrectCount(ans) {
    return lecture.feed.reduce(
      (n, c, i) => n + (SCORABLE.has(c.type) && isCorrect(c, ans[i]) ? 1 : 0),
      0
    );
  }
  // "Puerta": índice de la primera card interactiva aún sin responder. No se
  // puede scrollear más allá de ella hasta contestarla; si no queda ninguna,
  // el feed queda libre hasta el cierre.
  function calcGate(ans) {
    return lecture.feed.findIndex((c, i) => SCORABLE.has(c.type) && ans[i] == null);
  }
  function calcStars(ans) {
    const cc = calcCorrectCount(ans);
    const p = totalQuiz ? Math.round((cc / totalQuiz) * 100) : 0;
    return p >= 90 ? 3 : p >= 70 ? 2 : p >= 40 ? 1 : 0;
  }

  // aciertos, derivados de las respuestas guardadas
  $: correctCount = calcCorrectCount(answers);
  $: gate = calcGate(answers);

  let gateHint = false;
  let gateHintTimer;
  function nudgeGate() {
    gateHint = true;
    clearTimeout(gateHintTimer);
    gateHintTimer = setTimeout(() => (gateHint = false), 1400);
  }

  // ¿Estamos parados en la puerta (o más allá)? Sirve para frenar el gesto
  // hacia abajo ANTES de que el scroll ocurra, evitando el rebote visible.
  function atGate() {
    if (gate < 0 || !feedEl) return false;
    return feedEl.scrollTop >= slideDe(gate) * feedEl.clientHeight - 2;
  }

  // Rueda del mouse / trackpad: bloquear el desplazamiento hacia abajo.
  function onWheel(e) {
    cancelarAuto();
    if (e.deltaY > 0 && atGate()) {
      e.preventDefault();
      nudgeGate();
    }
  }

  // Touch: si el dedo sube (contenido baja = avanzar), frenar en la puerta.
  let touchY = null;
  function onTouchStart(e) {
    cancelarAuto();
    touchY = e.touches[0].clientY;
  }
  function onTouchMove(e) {
    if (touchY == null) return;
    const dy = e.touches[0].clientY - touchY;
    if (dy < 0 && atGate()) {
      e.preventDefault();
      nudgeGate();
    }
  }

  // Explicación en hoja (sólo al fallar): la card no cambia de alto, así que
  // la pregunta no se mueve al responder.
  let sheet = null;

  // Auto-avance tras acertar: deja que corra la animación de recompensa y pasa
  // a la card siguiente. Se cancela si el usuario hace el gesto de scrollear
  // por su cuenta (rueda o dedo), para no pelearle la navegación.
  let autoTimer = null;
  function cancelarAuto() {
    clearTimeout(autoTimer);
    autoTimer = null;
  }
  // Avanzar de a una SLIDE, no de a una card del feed: en repaso la card
  // siguiente del feed casi nunca es la slide siguiente (entre dos falladas
  // puede haber veinte cards que no se muestran), y traducirla daba -1 —o sea,
  // un salto al principio del feed—.
  function irASlide(n) {
    if (!feedEl) return;
    feedEl.scrollTo({ top: n * feedEl.clientHeight, behavior: "smooth" });
  }

  // recompensa
  let burstId = 0;
  let pop = null;
  let popTimer;

  // celebración de cierre (al llegar a la última slide)
  let finaleId = 0;
  let ready = false; // evita celebrar en el salto de montaje
  let endCelebrated = false;
  // Geometría del feed: qué slide ocupa cada card, y dónde cae el cierre.
  // En modo normal son las cards del feed detrás de la portada. En repaso la
  // portada no se muestra (no hay nada nuevo que anunciar) y las únicas slides
  // son las falladas, en orden, así que ambas cosas se recalculan.
  $: slidesVisibles = repasando ?? lecture.feed.map((_, i) => i);
  $: portada = repasando ? 0 : PORTADA;
  $: endIndex = slidesVisibles.length + portada; // índice de la slide de cierre
  // Índice de FEED -> índice de slide.
  $: slideDe = (i) => slidesVisibles.indexOf(i) + portada;

  $: pct = totalQuiz ? Math.round((correctCount / totalQuiz) * 100) : 0;

  // 3 estrellas según el porcentaje de aciertos: 90% / 70% / 40%
  $: stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0;

  // La ilustración de esta clase (progreso, no cromo): a color recién al
  // completarla.
  $: claseImg = courseId ? imagenDeClase(courseId, lecture.num) : null;

  // Cromos ganados durante esta visita a la clase, pendientes de mostrar —
  // terminar una clase puede cerrar más de uno a la vez (ej. la última de
  // Platón cierra el cromo de Platón Y el de curso completo). Se muestran de
  // a uno, recién al llegar al cierre: mostrarlos apenas se otorgan, en medio
  // del feed, le rompería el impulso a la lectura.
  let revelados = [];
  let revelado = null; // el que se está mostrando ahora
  function siguienteRevelado() {
    revelado = revelados[0] ?? null;
    revelados = revelados.slice(1);
  }

  let feedEl;
  let scrollPct = 0;

  onMount(() => {
    // Marca esta clase como la última abierta y, de paso, actualiza
    // `stars`/`done` contra las respuestas ya guardadas — clases
    // completadas ANTES de que estos dos campos existieran (o rehechas
    // fuera de esta sesión) recién quedan al día al volver a abrirlas, y
    // eso puede otorgar un cromo que antes no se había podido evaluar.
    revelados = [
      ...revelados,
      ...saveClass(lecture.num, { stars: calcStars(saved.answers), done: calcGate(saved.answers) < 0 }),
    ];
    if (saved.card > 0 && feedEl) {
      // salto instantáneo a la última card vista, sin pasar la puerta
      const target = gate >= 0 ? Math.min(saved.card, slideDe(gate)) : saved.card;
      feedEl.scrollTo({ top: target * feedEl.clientHeight, behavior: "instant" });
      if (target >= endIndex) endCelebrated = true; // ya está en el cierre: no festejar en la carga
    }
    // Habilitar la celebración recién tras acomodar el scroll inicial. Si la
    // clase ya estaba completa (no va a pasar por `onScroll`, que es donde
    // se festeja normalmente), y el backfill de arriba encontró algo nuevo,
    // mostrarlo acá.
    setTimeout(() => {
      ready = true;
      if (endCelebrated && revelados.length) siguienteRevelado();
    }, 400);
  });

  // Burst de cierre: un poco más grande y sostenido que el de acierto.
  function finale() {
    finaleId += 1;
    vibrate([12, 30, 14, 30, 18]);
    setTimeout(() => (finaleId += 1), 180);
    setTimeout(() => (finaleId += 1), 380);
  }

  function vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

  function onAnswer(e, i) {
    answers = { ...answers, [i]: e.detail.save };
    if (e.detail.correct) {
      combo += 1;
      burstId += 1;
      // El pop celebra la racha, no el acierto suelto: para uno solo ya está
      // el burst y el cartel de "¡Correcto!".
      if (combo > 1) showPop(combo);
      vibrate(combo >= 3 ? [12, 20, 18] : [14]);
      cancelarAuto();
      autoTimer = setTimeout(() => irASlide(slideDe(i) + 1), 1200);
    } else {
      combo = 0;
      vibrate([45, 40, 45]);
      const card = lecture.feed[i];
      if (e.detail.solucion || card.explain) {
        sheet = { solucion: e.detail.solucion ?? null, texto: card.explain };
      }
    }
    revelados = [
      ...revelados,
      ...saveClass(lecture.num, {
        answers,
        combo,
        card: currentCard,
        stars: calcStars(answers),
        done: calcGate(answers) < 0,
      }),
    ];
  }

  // Empezar el repaso: borra del progreso SÓLO las respuestas falladas y deja
  // el feed mostrando esas cards. Borrarlas es lo que reabre la puerta (vuelven
  // a estar sin contestar), así que no hace falta un camino aparte para el
  // scroll ni para el guardado.
  //
  // La nota baja en el momento de empezar, porque esas respuestas dejan de
  // contar como dadas, y vuelve a subir a medida que las acertás. Es lo
  // correcto: mientras estás repasando, todavía no las recuperaste.
  function empezarRepaso() {
    if (!falladas.length) return;
    cancelarAuto();
    sheet = null;
    const limpio = { ...answers };
    for (const i of falladas) delete limpio[i];
    repasando = falladas;
    answers = limpio;
    pase += 1;
    combo = 0;
    endCelebrated = false;
    guardarRepaso();
    // Al tope: la primera fallada es ahora la primera card del feed.
    if (feedEl) feedEl.scrollTo({ top: 0, behavior: "instant" });
  }

  // Guardado del repaso. `answers` ya viene con las falladas borradas, así que
  // `stars`/`done` se recalculan solos contra lo que queda respondido.
  function guardarRepaso() {
    revelados = [
      ...revelados,
      ...saveClass(lecture.num, {
        answers,
        combo,
        card: 0,
        stars: calcStars(answers),
        done: calcGate(answers) < 0,
      }),
    ];
  }

  // Reinicio de la clase, en dos toques: el primero pide confirmación y se
  // arrepiente solo a los 3s. Es destructivo (borra las respuestas) pero no
  // grave, así que no amerita un modal.
  let confirmReset = false;
  let resetTimer;
  function pedirReset() {
    if (!confirmReset) {
      confirmReset = true;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(() => (confirmReset = false), 3000);
      return;
    }
    clearTimeout(resetTimer);
    confirmReset = false;
    cancelarAuto();
    resetClass(lecture.num);
    dispatch("restart", { num: lecture.num });
  }

  function showPop(c) {
    pop = { id: ++burstId, combo: c };
    clearTimeout(popTimer);
    popTimer = setTimeout(() => (pop = null), 1100);
  }

  onDestroy(cancelarAuto);
  onDestroy(() => readingProgress.set(null));

  // Persistir la posición es barato en apariencia pero no lo es: cada llamada
  // serializa TODO el progreso y hace un setItem sincrónico. En medio de un
  // scroll eso come frames, así que se escribe recién cuando el scroll frena.
  let guardarTimer;
  function guardarPosicion(idx) {
    // En repaso, `idx` cuenta slides del subconjunto y no de la clase: guardarlo
    // dejaría a la clase reanudando en una card que no es. La posición guardada
    // se actualiza sola al salir del repaso.
    if (repasando) return;
    clearTimeout(guardarTimer);
    guardarTimer = setTimeout(() => {
      revelados = [...revelados, ...saveClass(lecture.num, { card: idx })];
    }, 300);
  }
  onDestroy(() => clearTimeout(guardarTimer));

  function onScroll() {
    const h = feedEl.clientHeight;

    // La puerta no se frena acá: las cards de después ni se renderizan (ver
    // el {#if} del feed), así que no hay adónde pasarse. Frenarla devolviendo
    // el scroll peleaba con la inercia del dedo en el celular y hacía titilar
    // la card siguiente contra la actual.

    // Progreso por posición de card y no por scrollHeight: el alto del feed
    // crece a medida que se desbloquean cards, y la barra saltaría.
    scrollPct = Math.min(100, (feedEl.scrollTop / h / endIndex) * 100);
    readingProgress.set(scrollPct);
    const idx = Math.round(feedEl.scrollTop / h);
    if (idx !== currentCard) {
      currentCard = idx;
      guardarPosicion(idx);
    }
    // llegó a la slide de cierre: festejar una vez
    if (ready && !endCelebrated && idx >= endIndex) {
      endCelebrated = true;
      // Terminó el repaso: se cierra el modo, así el cierre vuelve a hablar de
      // la clase entera (y el feed, si scrolleás para arriba, es otra vez la
      // clase completa con todo respondido). `repasadas` sostiene el mensaje
      // de "recuperaste N" en la tarjeta.
      if (repasando) {
        repasadas = repasando.length;
        recuperadas = repasando.filter((i) => isCorrect(lecture.feed[i], answers[i])).length;
        repasando = null;
        pase += 1;
        // El cierre de la clase entera, calculado a mano: `endIndex` es
        // reactivo y en esta línea todavía vale la geometría del repaso
        // (los `$:` recién corren en el próximo tick).
        currentCard = lecture.feed.length + PORTADA;
        revelados = [...revelados, ...saveClass(lecture.num, { card: currentCard })];
      }
      // Los cromos que se hayan ganado en esta visita (por una respuesta o
      // por el backfill del mount) esperaban a este momento para mostrarse,
      // uno a la vez, encima del cierre.
      if (revelados.length) siguienteRevelado();
      finale();
    }
  }
</script>

<div
  class="fixed inset-x-0 top-0 z-40 px-[22px] pt-[calc(env(safe-area-inset-top)+18px)] pb-2 backdrop-blur-[6px] [background:linear-gradient(var(--bg),color-mix(in_srgb,var(--bg)_70%,transparent))]"
>
  <div class="mx-auto max-w-[480px]">
    <div class="flex items-center gap-3">
      <button
        class="flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-full border-0 bg-surface text-text [font-family:inherit] transition-transform active:scale-[0.94]"
        on:click={() => dispatch("back")}
        aria-label="Volver"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 5l-7 7 7 7"
          /></svg
        >
      </button>

      <span class="min-w-0 flex-1 truncate font-serif text-[20px] leading-tight font-semibold text-text"
        >{courseTitle}: Clase {lecture.num}</span
      >
      <!-- Los aciertos, no puntos: es exactamente lo que determina las
           estrellas, así que se ve la calificación real en todo momento. En
           píldora, para que se lea como un marcador y no como texto suelto
           pegado al título. -->
      <span
        class="halftone-surface flex flex-none items-center gap-1 rounded-[4px] border-0 bg-accent px-2.5 py-[5px] text-[16px] font-extrabold whitespace-nowrap text-bg transition-transform duration-150 {pop
          ? 'scale-[1.14]'
          : ''}"
      >
        <span class="text-accent-2">★</span>{correctCount}/{totalQuiz}
      </span>
    </div>
  </div>
</div>

<div
  class="h-dvh overflow-y-scroll [scroll-snap-type:y_mandatory]"
  bind:this={feedEl}
  on:scroll={onScroll}
  on:wheel|nonpassive={onWheel}
  on:touchstart={onTouchStart}
  on:touchmove|nonpassive={onTouchMove}
>
  <!-- Portada de la clase: anuncia de qué va, muestra su ilustración (grisada
       hasta completarla) y enseña el gesto con la flecha. En repaso no va:
       ya hiciste la clase, y lo que sigue son las preguntas sueltas que
       fallaste, no un recorrido que haya que presentar. -->
  {#if !repasando}
  <section
    class="flex min-h-dvh items-center justify-center px-[22px] pt-[100px] pb-[calc(env(safe-area-inset-bottom)+86px)] [scroll-snap-align:center] [scroll-snap-stop:always]"
  >
    <div class="flex w-full max-w-[480px] flex-col items-center text-center">
      {#if claseImg}
        <!-- Progreso de la clase, no un cromo: a color recién al terminarla. -->
        <div class="relative mb-7 h-[172px] w-[172px] overflow-hidden rounded-[4px] bg-surface-2">
          <img
            class="h-full w-full object-cover {gate < 0 ? 'opacity-75' : 'opacity-45 grayscale-[0.9]'}"
            src={claseImg}
            alt=""
          />
          <span class="img-halftone" aria-hidden="true"></span>
        </div>
      {/if}

      <span class="text-[16px] font-bold text-text-soft/70 uppercase">
        Clase {lecture.num}
      </span>
      <h2 class="mt-3 font-serif text-[32px] leading-[1.2] font-semibold tracking-[-0.3px] text-text">
        {lecture.title}
      </h2>

      <!-- El gesto se enseña acá: la portada es la única slide sin nada que
           responder, así que es donde conviene decir cómo se avanza. -->
      <span class="mt-10 flex items-center gap-1.5 text-[16px] font-semibold text-text-soft/70">
        Deslizá para empezar <span class="text-[16px] leading-none">↓</span>
      </span>
    </div>
  </section>
  {/if}

  {#each lecture.feed as card, i}
    <!-- Después de la primera card sin responder no se renderiza nada: el
         feed termina en la puerta. En repaso, además, sólo existen las cards
         que fallaste: las que ya tenías bien no se vuelven a preguntar. -->
    {#if (gate < 0 || i <= gate) && (!repasando || repasando.includes(i))}
    <section
      class="flex min-h-dvh items-center justify-center px-[22px] pt-[100px] pb-[calc(env(safe-area-inset-bottom)+86px)] [scroll-snap-align:center] [scroll-snap-stop:always]"
    >
      {#if card.type === "info"}
        <InfoCard {card} />
      {:else}
        <!-- `pase` en la key: las cards leen `saved` UNA sola vez, al montar
             (ahí fijan la respuesta elegida y barajan las opciones). Al entrar
             o salir del repaso la respuesta se borra, así que hay que
             remontarlas o seguirían mostrándose contestadas y deshabilitadas.
             De paso se rebarajan las opciones, que es lo que se quiere cuando
             volvés a intentar la misma pregunta. -->
        {#key `${pase}-${i}`}
          {#if card.type === "match"}
            <MatchCard {card} saved={answers[i] ?? null} on:answer={(e) => onAnswer(e, i)} />
          {:else if card.type === "classify"}
            <ClassifyCard {card} saved={answers[i] ?? null} on:answer={(e) => onAnswer(e, i)} />
          {:else if card.type === "short"}
            <ShortCard {card} saved={answers[i] ?? null} on:answer={(e) => onAnswer(e, i)} />
          {:else}
            <QuizCard {card} saved={answers[i] ?? null} on:answer={(e) => onAnswer(e, i)} />
          {/if}
        {/key}
      {/if}
    </section>
    {/if}
  {/each}

  {#if gate < 0}
  <section
    class="flex min-h-dvh items-center justify-center px-[22px] pt-[100px] pb-[calc(env(safe-area-inset-bottom)+86px)] [scroll-snap-align:center] [scroll-snap-stop:always]"
  >
    <div class="mx-auto flex w-full max-w-[360px] flex-col items-center text-center">
      <div class="flex gap-2.5 leading-none" role="img" aria-label="{stars} de 3 estrellas">
        {#each [0, 1, 2] as i}
          <span
            class="star {i < stars
              ? 'text-accent-2'
              : 'text-line'}"
            style="--d:{i * 140}ms">★</span
          >
        {/each}
      </div>

      <!-- Un dato por renglón y cada uno con su trabajo: qué pasó, cómo te
           fue. El título de la clase no se repite acá — lo tenés en la barra de
           arriba, y a esta altura ya sabés qué clase hiciste. -->
      <!-- "Perfecta" es sin ninguna fallada, no 3★: con 10 preguntas el corte
           de 90% deja entrar una mal, y ahí el título estaría mintiendo. -->
      <h2 class="mt-5 m-0 font-serif text-[26px] leading-none font-semibold text-text">
        {repasadas && !falladas.length ? "¡Clase perfecta!" : "Clase completada"}
      </h2>
      <p class="mt-2.5 text-[16px] font-semibold text-text-soft/80">
        {correctCount} de {totalQuiz} correctas
      </p>

      <!-- Después de un repaso, decir qué cambió: la nota de arriba ya es la
           nueva, pero sin esto no se ve que fue el repaso el que la movió. -->
      {#if repasadas}
        <p class="mt-1.5 text-[16px] font-semibold text-accent-ink">
          {#if recuperadas === repasadas}
            Recuperaste {recuperadas === 1 ? "la que habías fallado" : `las ${recuperadas} que habías fallado`}
          {:else if recuperadas}
            Recuperaste {recuperadas} de {repasadas}
          {:else}
            Todavía quedan {repasadas === 1 ? "esa" : `esas ${repasadas}`}
          {/if}
        </p>
      {/if}

      {#if lockedNext}
        <p class="mt-4 text-[16px] leading-[1.45] font-semibold text-text-soft">
          La Clase {lockedNext.num} se habilita pronto.
        </p>
      {:else if !nextClass}
        <p class="mt-4 font-serif text-[17px] font-semibold text-accent-ink">¡Completaste el curso!</p>
      {/if}

      <!-- La acción principal se lleva puesta la tarjeta de "a continuación":
           decía lo mismo que el botón y sumaba una caja. Ahora el botón anuncia
           a dónde vas. -->
      {#if nextClass}
        <button
          class="mt-6 flex w-full cursor-pointer flex-col items-center gap-1 rounded-[4px] border-0 halftone-surface bg-accent px-5 py-3.5 [font-family:inherit] transition-transform active:scale-[0.98]"
          on:click={() => dispatch("open", nextClass)}
        >
          <span class="text-[16px] font-extrabold text-on-accent uppercase">Siguiente clase</span>
          <span class="line-clamp-1 text-[16px] font-semibold text-on-accent/70"
            >Clase {nextClass.num}: {nextClass.title}</span
          >
        </button>
      {:else}
        <button
          class="mt-6 w-full cursor-pointer rounded-[4px] border-0 halftone-surface bg-accent px-5 py-[15px] text-[16px] font-extrabold text-on-accent uppercase [font-family:inherit] transition-transform active:scale-[0.98]"
          on:click={() => dispatch("back")}>Volver al recorrido</button
        >
      {/if}

      <!-- Las secundarias en una fila, no apiladas: se leen como el pie de la
           pantalla y no como una lista de sobras debajo del botón.
           Mientras queden falladas, la segunda acción es repasarlas: es más
           útil que rehacer la clase entera y es el camino a las 3★. Recién
           cuando no queda ninguna aparece Rehacer, que pide dos toques porque
           borra las respuestas (los cromos no se tocan: lo ganado está ganado). -->
      <div class="mt-4 flex items-center gap-3 text-[16px] font-bold text-text-soft/70">
        {#if nextClass}
          <button
            class="cursor-pointer border-0 bg-transparent text-inherit [font-family:inherit] active:scale-[0.97]"
            on:click={() => dispatch("back")}>Volver al recorrido</button
          >
          <span class="h-3 w-px bg-current opacity-30" aria-hidden="true"></span>
        {/if}
        {#if falladas.length}
          <button
            class="cursor-pointer border-0 bg-transparent text-inherit [font-family:inherit] active:scale-[0.97]"
            on:click={empezarRepaso}
          >
            Repasar {falladas.length === 1 ? "la fallada" : `las ${falladas.length} falladas`}
          </button>
        {:else}
          <button
            class="cursor-pointer border-0 bg-transparent [font-family:inherit] active:scale-[0.97] {confirmReset
              ? 'text-bad'
              : 'text-inherit'}"
            on:click={pedirReset}
          >
            {confirmReset ? "¿Seguro? Tocá de nuevo" : "Rehacer la clase"}
          </button>
        {/if}
      </div>
    </div>
  </section>
  {/if}
</div>

{#if gateHint}
  <div
    class="gate-hint-anim fixed bottom-[calc(env(safe-area-inset-bottom)+96px)] left-1/2 z-[55] -translate-x-1/2 rounded-[4px] bg-accent-ink px-[18px] py-2.5 text-[16px] font-extrabold whitespace-nowrap text-bg pointer-events-none"
    role="status"
  >
    Respondé para continuar
  </div>
{/if}

<CromoReveal cromo={revelado} pendientes={revelados.length} on:next={siguienteRevelado} />

<ExplainSheet data={sheet} on:close={() => (sheet = null)} />

<Burst trigger={burstId} />
<Burst trigger={finaleId} count={72} power={1.6} />

{#if pop}
  {#key pop.id}
    <div class="pop-anim pointer-events-none fixed top-[42%] left-1/2 z-[55] flex -translate-x-1/2 flex-col items-center gap-1" aria-hidden="true">
      <span class="text-[46px] font-black text-accent-3"
        >×{pop.combo}</span
      >
      <span class="text-[16px] font-extrabold text-accent-3">seguidas</span>
    </div>
  {/key}
{/if}

<style>
  /* Estas quedan en CSS porque dependen de --d (delay por estrella) o de
     una secuencia de keyframes que Tailwind no expresa bien inline. */
  .star {
    font-size: 52px;
    animation: starIn 0.45s cubic-bezier(0.2, 0.8, 0.3, 1.4) var(--d) both;
  }
  @keyframes starIn {
    from { opacity: 0; transform: scale(0.4) rotate(-25deg); }
    to { opacity: 1; transform: scale(1) rotate(0); }
  }

  .gate-hint-anim {
    animation: gaterise 0.28s ease;
  }
  @keyframes gaterise {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .pop-anim {
    animation: popup 1.05s ease forwards;
  }
  @keyframes popup {
    0% { opacity: 0; transform: translateY(14px) scale(0.7); }
    18% { opacity: 1; transform: translateY(0) scale(1.05); }
    32% { transform: translateY(0) scale(1); }
    100% { opacity: 0; transform: translateY(-46px) scale(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .gate-hint-anim, .pop-anim { animation-duration: 1ms; }
  }
</style>
