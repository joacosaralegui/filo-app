<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import TopBar from "./TopBar.svelte";
  import InfoCard from "./InfoCard.svelte";
  import QuizCard from "./QuizCard.svelte";
  import MatchCard from "./MatchCard.svelte";
  import ClassifyCard from "./ClassifyCard.svelte";
  import ShortCard from "./ShortCard.svelte";
  import ExplainSheet from "./ExplainSheet.svelte";
  import Burst from "./Burst.svelte";
  import { classState, saveClass, SCORABLE } from "./progress.js";

  export let lecture;
  export let classes = []; // índice del curso, para saber cuál es la siguiente
  const dispatch = createEventDispatcher();

  const totalQuiz = lecture.feed.filter((c) => SCORABLE.has(c.type)).length;

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
  let score = saved.score;
  let combo = saved.combo;
  let currentCard = saved.card;

  // aciertos, derivados de las respuestas guardadas
  $: correctCount = lecture.feed.reduce(
    (n, c, i) => n + (SCORABLE.has(c.type) && isCorrect(c, answers[i]) ? 1 : 0),
    0
  );

  // "Puerta": índice de la primera card interactiva aún sin responder. No se
  // puede scrollear más allá de ella hasta contestarla; si no queda ninguna,
  // el feed queda libre hasta el cierre.
  $: gate = lecture.feed.findIndex(
    (c, i) => SCORABLE.has(c.type) && answers[i] == null
  );

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
    return feedEl.scrollTop >= gate * feedEl.clientHeight - 2;
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
  function irA(i) {
    if (!feedEl) return;
    feedEl.scrollTo({ top: i * feedEl.clientHeight, behavior: "smooth" });
  }

  // recompensa
  let burstId = 0;
  let pop = null;
  let popTimer;

  // celebración de cierre (al llegar a la última slide)
  let finaleId = 0;
  let ready = false; // evita celebrar en el salto de montaje
  let endCelebrated = false;
  const endIndex = lecture.feed.length; // índice de la slide de cierre

  $: pct = totalQuiz ? Math.round((correctCount / totalQuiz) * 100) : 0;

  // 3 estrellas según el porcentaje de aciertos: 90% / 70% / 40%
  $: stars = pct >= 90 ? 3 : pct >= 70 ? 2 : pct >= 40 ? 1 : 0;

  let feedEl;
  let scrollPct = 0;

  onMount(() => {
    saveClass(lecture.num, {}); // marcar como última clase abierta
    if (saved.card > 0 && feedEl) {
      // salto instantáneo a la última card vista, sin pasar la puerta
      const target = gate >= 0 ? Math.min(saved.card, gate) : saved.card;
      feedEl.style.scrollBehavior = "auto";
      feedEl.scrollTop = target * feedEl.clientHeight;
      requestAnimationFrame(() => (feedEl.style.scrollBehavior = ""));
      if (target >= endIndex) endCelebrated = true; // ya está en el cierre: no festejar en la carga
    }
    // habilitar la celebración recién tras acomodar el scroll inicial
    setTimeout(() => (ready = true), 400);
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
      const points = 10 * combo;
      score += points;
      burstId += 1;
      showPop(points, combo);
      vibrate(combo >= 3 ? [12, 20, 18] : [14]);
      cancelarAuto();
      autoTimer = setTimeout(() => irA(i + 1), 1200);
    } else {
      combo = 0;
      vibrate([45, 40, 45]);
      const card = lecture.feed[i];
      if (e.detail.solucion || card.explain) {
        sheet = { solucion: e.detail.solucion ?? null, texto: card.explain };
      }
    }
    saveClass(lecture.num, { answers, score, combo, card: currentCard });
  }

  function showPop(points, c) {
    pop = { id: ++burstId, points, combo: c };
    clearTimeout(popTimer);
    popTimer = setTimeout(() => (pop = null), 1100);
  }

  onDestroy(cancelarAuto);

  function onScroll() {
    const h = feedEl.clientHeight;

    // Freno de la puerta: no dejar pasar de la primera card sin responder.
    if (gate >= 0) {
      const limit = gate * h;
      if (feedEl.scrollTop > limit + 1) {
        feedEl.scrollTop = limit;
        nudgeGate();
        return;
      }
    }

    const max = feedEl.scrollHeight - h;
    scrollPct = max > 0 ? (feedEl.scrollTop / max) * 100 : 0;
    const idx = Math.round(feedEl.scrollTop / h);
    if (idx !== currentCard) {
      currentCard = idx;
      saveClass(lecture.num, { card: idx });
    }
    // llegó a la slide de cierre: festejar una vez
    if (ready && !endCelebrated && idx >= endIndex) {
      endCelebrated = true;
      finale();
    }
  }
</script>

<div
  class="fixed inset-x-0 top-0 z-40 px-4 pt-[calc(env(safe-area-inset-top)+10px)] pb-2 backdrop-blur-[6px] [background:linear-gradient(var(--bg),color-mix(in_srgb,var(--bg)_70%,transparent))]"
>
  <div class="mx-auto max-w-[480px]">
    <TopBar back on:back={() => dispatch("back")} on:home={() => dispatch("home")}>
      <span class="min-w-0 flex-1 truncate text-xs font-semibold text-text-soft"
        >Clase {lecture.num} · {lecture.title}</span
      >
      <span
        class="flex-none whitespace-nowrap text-[15px] font-extrabold text-accent-ink transition-transform duration-150 {pop
          ? 'scale-[1.14]'
          : ''}"
      >
        ✦ {score}
        {#if combo > 1}<b class="ml-[3px] text-accent-ink">×{combo}</b>{/if}
      </span>
    </TopBar>
  </div>
  <div class="mx-auto mt-2 h-[3px] max-w-[480px] overflow-hidden rounded-[3px] bg-line">
    <i class="block h-full bg-accent transition-[width] duration-150 ease-linear" style="width:{scrollPct}%"></i>
  </div>
</div>

<div
  class="h-dvh overflow-y-scroll scroll-smooth [scroll-snap-type:y_mandatory] motion-reduce:scroll-auto"
  bind:this={feedEl}
  on:scroll={onScroll}
  on:wheel|nonpassive={onWheel}
  on:touchstart={onTouchStart}
  on:touchmove|nonpassive={onTouchMove}
>
  {#each lecture.feed as card, i}
    <section
      class="flex min-h-dvh items-center justify-center px-[22px] pt-[100px] pb-10 [scroll-snap-align:center] [scroll-snap-stop:always]"
    >
      {#if card.type === "info"}
        <InfoCard {card} />
      {:else if card.type === "match"}
        <MatchCard {card} saved={answers[i] ?? null} on:answer={(e) => onAnswer(e, i)} />
      {:else if card.type === "classify"}
        <ClassifyCard {card} saved={answers[i] ?? null} on:answer={(e) => onAnswer(e, i)} />
      {:else if card.type === "short"}
        <ShortCard {card} saved={answers[i] ?? null} on:answer={(e) => onAnswer(e, i)} />
      {:else}
        <QuizCard {card} saved={answers[i] ?? null} on:answer={(e) => onAnswer(e, i)} />
      {/if}
    </section>
  {/each}

  <section
    class="flex min-h-dvh items-center justify-center px-[22px] pt-[100px] pb-10 [scroll-snap-align:center] [scroll-snap-stop:always]"
  >
    <div class="mx-auto flex w-full max-w-[360px] flex-col items-center text-center">
      <div class="flex gap-2.5 leading-none" role="img" aria-label="{stars} de 3 estrellas">
        {#each [0, 1, 2] as i}
          <span
            class="star {i < stars
              ? 'text-accent-2 [text-shadow:0_4px_18px_color-mix(in_srgb,var(--accent-2)_55%,transparent)]'
              : 'text-line'}"
            style="--d:{i * 140}ms">★</span
          >
        {/each}
      </div>

      <h2 class="mt-[18px] text-2xl font-extrabold tracking-[-0.3px] text-text">Clase completada</h2>
      <p class="mt-1 text-[13.5px] font-semibold text-text-soft">Clase {lecture.num} · {lecture.title}</p>

      <div class="mt-[18px] flex w-full gap-2.5">
        <div class="flex flex-1 flex-col gap-0.5 rounded-[14px] border border-line bg-surface px-2 pt-3 pb-2.5">
          <b class="text-[22px] font-black tracking-[-0.5px] text-accent-ink">{score}</b>
          <span class="text-[11px] font-bold tracking-[0.5px] text-text-soft uppercase">puntos</span>
        </div>
        <div class="flex flex-1 flex-col gap-0.5 rounded-[14px] border border-line bg-surface px-2 pt-3 pb-2.5">
          <b class="text-[22px] font-black tracking-[-0.5px] text-accent-ink"
            >{correctCount}<i class="not-italic text-[15px] font-extrabold text-text-soft">/{totalQuiz}</i></b
          >
          <span class="text-[11px] font-bold tracking-[0.5px] text-text-soft uppercase">correctas</span>
        </div>
      </div>

      {#if nextClass}
        <div
          class="mt-[22px] flex w-full flex-col gap-[3px] rounded-[14px] px-4 py-3 text-left [background:color-mix(in_srgb,var(--accent)_8%,var(--surface))] [border:1px_solid_color-mix(in_srgb,var(--accent)_30%,var(--line))]"
        >
          <span class="text-[11px] font-extrabold tracking-[1px] text-accent-ink uppercase">A continuación</span>
          <span class="text-[15px] font-bold leading-[1.35] text-text">Clase {nextClass.num}: {nextClass.title}</span>
        </div>
        <button
          class="mt-[18px] cursor-pointer self-stretch rounded-[13px] bg-accent px-[22px] py-[13px] text-[15px] font-extrabold text-on-accent [font-family:inherit] active:scale-[0.98]"
          on:click={() => dispatch("open", nextClass)}
        >
          Siguiente clase →
        </button>
        <button
          class="mx-auto mt-3 block cursor-pointer border-0 bg-transparent text-sm font-bold text-text-soft [font-family:inherit] active:scale-[0.98]"
          on:click={() => dispatch("back")}>Volver al inicio</button
        >
      {:else if lockedNext}
        <p class="mt-[22px] text-[15px] leading-[1.45] font-semibold text-text">
          La Clase {lockedNext.num} se habilita pronto.
        </p>
        <button
          class="mt-[18px] cursor-pointer self-stretch rounded-[13px] bg-accent px-[22px] py-[13px] text-[15px] font-extrabold text-on-accent [font-family:inherit] active:scale-[0.98]"
          on:click={() => dispatch("back")}>Volver al inicio</button
        >
      {:else}
        <p class="mt-[22px] text-[19px] font-extrabold text-accent-ink">¡Completaste el curso!</p>
        <button
          class="mt-[18px] cursor-pointer self-stretch rounded-[13px] bg-accent px-[22px] py-[13px] text-[15px] font-extrabold text-on-accent [font-family:inherit] active:scale-[0.98]"
          on:click={() => dispatch("back")}>Volver al inicio</button
        >
      {/if}
    </div>
  </section>
</div>

{#if gateHint}
  <div
    class="gate-hint-anim fixed bottom-[calc(env(safe-area-inset-bottom)+26px)] left-1/2 z-[55] -translate-x-1/2 rounded-full bg-accent-ink px-[18px] py-2.5 text-[13.5px] font-extrabold whitespace-nowrap text-bg pointer-events-none [box-shadow:0_6px_22px_color-mix(in_srgb,var(--accent)_45%,transparent)]"
    role="status"
  >
    Respondé para continuar
  </div>
{/if}

<ExplainSheet data={sheet} on:close={() => (sheet = null)} />

<Burst trigger={burstId} />
<Burst trigger={finaleId} count={72} power={1.6} />

{#if pop}
  {#key pop.id}
    <div class="pop-anim pointer-events-none fixed top-[42%] left-1/2 z-[55] flex -translate-x-1/2 flex-col items-center gap-1" aria-hidden="true">
      <span class="text-[46px] font-black text-accent-ink [text-shadow:0_3px_16px_color-mix(in_srgb,var(--accent)_60%,transparent)]"
        >+{pop.points}</span
      >
      {#if pop.combo > 1}<span class="text-[15px] font-extrabold tracking-[1.5px] text-accent-ink"
          >COMBO ×{pop.combo}</span
        >{/if}
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
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  .pop-anim {
    animation: popup 1.05s ease forwards;
  }
  @keyframes popup {
    0% { opacity: 0; transform: translateX(-50%) translateY(14px) scale(0.7); }
    18% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1.05); }
    32% { transform: translateX(-50%) translateY(0) scale(1); }
    100% { opacity: 0; transform: translateX(-50%) translateY(-46px) scale(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .gate-hint-anim, .pop-anim { animation-duration: 1ms; }
  }
</style>
