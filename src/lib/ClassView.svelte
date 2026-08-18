<script>
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import InfoCard from "./InfoCard.svelte";
  import QuizCard from "./QuizCard.svelte";
  import MatchCard from "./MatchCard.svelte";
  import ClassifyCard from "./ClassifyCard.svelte";
  import ShortCard from "./ShortCard.svelte";
  import ExplainSheet from "./ExplainSheet.svelte";
  import Burst from "./Burst.svelte";
  import { classState, saveClass, SCORABLE } from "./progress.js";
  import { CLASSES } from "../content/classes.js";

  export let lecture;
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
  const laterClasses = CLASSES.filter((c) => c.num > lecture.num);
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
    }
  });

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
  }
</script>

<div class="topbar">
  <div class="row">
    <button class="back" on:click={() => dispatch("back")} aria-label="Volver">‹</button>
    <span class="crumb">Clase {lecture.num} · {lecture.title}</span>
    <span class="score" class:bump={pop}>
      ✦ {score}
      {#if combo > 1}<b class="combo">×{combo}</b>{/if}
    </span>
  </div>
  <div class="progress"><i style="width:{scrollPct}%"></i></div>
</div>

<div
  class="feed"
  bind:this={feedEl}
  on:scroll={onScroll}
  on:wheel|nonpassive={onWheel}
  on:touchstart={onTouchStart}
  on:touchmove|nonpassive={onTouchMove}
>
  {#each lecture.feed as card, i}
    <section class="slide">
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

  <section class="slide end">
    <div class="end-inner">
      <div class="big">{correctCount}/{totalQuiz}</div>
      <p>respuestas correctas · {score} puntos</p>

      {#if nextClass}
        <p class="end-msg">A continuación · Clase {nextClass.num}: {nextClass.title}</p>
        <button class="home-btn" on:click={() => dispatch("open", nextClass)}>
          Siguiente clase →
        </button>
        <button class="ghost-btn" on:click={() => dispatch("back")}>Volver al inicio</button>
      {:else if lockedNext}
        <p class="end-msg">Terminaste la Clase {lecture.num}. La Clase {lockedNext.num} se habilita pronto.</p>
        <button class="home-btn" on:click={() => dispatch("back")}>Volver al inicio</button>
      {:else}
        <p class="end-msg strong">¡Felicitaciones! Completaste el curso.</p>
        <button class="home-btn" on:click={() => dispatch("back")}>Volver al inicio</button>
      {/if}
    </div>
  </section>
</div>

{#if gateHint}
  <div class="gate-hint" role="status">Respondé para continuar</div>
{/if}

<ExplainSheet data={sheet} on:close={() => (sheet = null)} />

<Burst trigger={burstId} />

{#if pop}
  {#key pop.id}
    <div class="pop" aria-hidden="true">
      <span class="pts">+{pop.points}</span>
      {#if pop.combo > 1}<span class="cmb">COMBO ×{pop.combo}</span>{/if}
    </div>
  {/key}
{/if}

<style>
  .topbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 40;
    padding: calc(env(safe-area-inset-top) + 10px) 16px 8px;
    background: linear-gradient(var(--bg), color-mix(in srgb, var(--bg) 70%, transparent));
    backdrop-filter: blur(6px);
  }
  .row {
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 480px;
    margin: 0 auto;
  }
  .back {
    flex: 0 0 auto;
    width: 30px;
    height: 30px;
    border-radius: 9px;
    background: var(--surface);
    border: 1px solid var(--line);
    color: var(--text);
    font-size: 20px;
    line-height: 1;
    display: grid;
    place-items: center;
    cursor: pointer;
  }
  .crumb {
    flex: 1;
    font-size: 12px;
    color: var(--text-soft);
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .score {
    font-size: 15px;
    font-weight: 800;
    color: var(--accent-ink);
    white-space: nowrap;
    transition: transform 0.15s;
  }
  .score.bump { transform: scale(1.14); }
  .combo {
    color: var(--accent-ink);
    margin-left: 3px;
  }
  .progress {
    height: 3px;
    border-radius: 3px;
    background: var(--line);
    overflow: hidden;
    max-width: 480px;
    margin: 8px auto 0;
  }
  .progress i {
    display: block;
    height: 100%;
    background: var(--accent);
    transition: width 0.15s linear;
  }

  .feed {
    height: 100dvh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }
  .slide {
    min-height: 100dvh;
    scroll-snap-align: center;
    scroll-snap-stop: always;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 90px 22px 40px;
  }

  .end-inner {
    text-align: center;
    max-width: 460px;
  }
  .big {
    font-size: 64px;
    font-weight: 800;
    color: var(--accent-ink);
    letter-spacing: -1px;
  }
  .end-inner p {
    color: var(--text-soft);
    margin: 8px 0 0;
    font-size: 16px;
  }
  .end-msg {
    margin: 20px 0 0;
    color: var(--text);
    font-size: 15px;
    font-weight: 600;
    line-height: 1.45;
  }
  .end-msg.strong {
    font-size: 19px;
    font-weight: 800;
    color: var(--accent-ink);
  }
  .home-btn {
    margin-top: 18px;
    padding: 13px 22px;
    border-radius: 13px;
    background: var(--accent);
    color: var(--on-accent);
    border: none;
    font: inherit;
    font-weight: 800;
    font-size: 15px;
    cursor: pointer;
  }
  .home-btn:active { transform: scale(0.98); }
  .ghost-btn {
    display: block;
    margin: 12px auto 0;
    background: none;
    border: none;
    color: var(--text-soft);
    font: inherit;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
  }
  .ghost-btn:active { transform: scale(0.98); }

  .gate-hint {
    position: fixed;
    left: 50%;
    bottom: calc(env(safe-area-inset-bottom) + 26px);
    transform: translateX(-50%);
    z-index: 55;
    pointer-events: none;
    white-space: nowrap;
    background: var(--accent-ink);
    color: var(--bg);
    font-size: 13.5px;
    font-weight: 800;
    padding: 10px 18px;
    border-radius: 999px;
    box-shadow: 0 6px 22px color-mix(in srgb, var(--accent) 45%, transparent);
    animation: gaterise 0.28s ease;
  }
  @keyframes gaterise {
    from { opacity: 0; transform: translateX(-50%) translateY(10px); }
    to { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  .pop {
    position: fixed;
    left: 50%;
    top: 42%;
    transform: translateX(-50%);
    z-index: 55;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    animation: popup 1.05s ease forwards;
  }
  .pts {
    font-size: 46px;
    font-weight: 900;
    color: var(--accent-ink);
    text-shadow: 0 3px 16px color-mix(in srgb, var(--accent) 60%, transparent);
  }
  .cmb {
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 1.5px;
    color: var(--accent-ink);
  }
  @keyframes popup {
    0% { opacity: 0; transform: translateX(-50%) translateY(14px) scale(0.7); }
    18% { opacity: 1; transform: translateX(-50%) translateY(0) scale(1.05); }
    32% { transform: translateX(-50%) translateY(0) scale(1); }
    100% { opacity: 0; transform: translateX(-50%) translateY(-46px) scale(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .feed { scroll-behavior: auto; }
    .pop, .gate-hint { animation-duration: 1ms; }
  }
</style>
