<script>
  import { createEventDispatcher } from "svelte";
  import InfoCard from "./InfoCard.svelte";
  import QuizCard from "./QuizCard.svelte";
  import Burst from "./Burst.svelte";

  export let lecture;
  const dispatch = createEventDispatcher();

  const totalQuiz = lecture.feed.filter((c) => c.type === "quiz").length;

  let score = 0;
  let combo = 0;
  let answered = 0;
  let correctCount = 0;

  // recompensa
  let burstId = 0;
  let pop = null;
  let popTimer;

  let feedEl;
  let scrollPct = 0;

  function vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

  function onAnswer(e) {
    answered += 1;
    if (e.detail.correct) {
      combo += 1;
      const points = 10 * combo;
      score += points;
      correctCount += 1;
      burstId += 1;
      showPop(points, combo);
      vibrate(combo >= 3 ? [12, 20, 18] : [14]);
    } else {
      combo = 0;
      vibrate([45, 40, 45]);
    }
  }

  function showPop(points, c) {
    pop = { id: ++burstId, points, combo: c };
    clearTimeout(popTimer);
    popTimer = setTimeout(() => (pop = null), 1100);
  }

  function onScroll() {
    const max = feedEl.scrollHeight - feedEl.clientHeight;
    scrollPct = max > 0 ? (feedEl.scrollTop / max) * 100 : 0;
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

<div class="feed" bind:this={feedEl} on:scroll={onScroll}>
  {#each lecture.feed as card}
    <section class="slide">
      {#if card.type === "info"}
        <InfoCard {card} />
      {:else}
        <QuizCard {card} on:answer={onAnswer} />
      {/if}
    </section>
  {/each}

  <section class="slide end">
    <div class="end-inner">
      <div class="big">{correctCount}/{totalQuiz}</div>
      <p>respuestas correctas · {score} puntos</p>
      <button class="home-btn" on:click={() => dispatch("back")}>Volver al inicio</button>
    </div>
  </section>
</div>

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
  .home-btn {
    margin-top: 22px;
    padding: 13px 22px;
    border-radius: 13px;
    background: var(--accent);
    color: var(--text);
    border: none;
    font: inherit;
    font-weight: 800;
    font-size: 15px;
    cursor: pointer;
  }
  .home-btn:active { transform: scale(0.98); }

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
    .pop { animation-duration: 1ms; }
  }
</style>
