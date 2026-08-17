<script>
  import { createEventDispatcher } from "svelte";
  export let classes = [];
  const dispatch = createEventDispatcher();

  // clase objetivo del botón principal: la primera disponible
  $: next = classes.find((c) => c.content) || null;

  let tlEl;
  let homeEl;

  function open(c) {
    if (c && c.content) dispatch("open", c);
  }
  function toTimeline() {
    if (!tlEl || !homeEl) return;
    homeEl.scrollTo({ top: tlEl.offsetTop, behavior: "smooth" });
  }
</script>

<div class="home" bind:this={homeEl}>
  <section class="hero">
    <div class="hero-top">
      <h1>Historia intelectual europea<br /><span>desde Nietzsche</span></h1>
      <p class="sub">
        Construido a partir de
        <a
          href="https://www.youtube.com/playlist?list=PLh9mgdi4rNezUjm7niGdUWjnL0lHSDh0U"
          target="_blank"
          rel="noopener"
        >European Intellectual History since Nietzsche</a>.
      </p>
    </div>

    <div class="hero-center">
      {#if next}
        <button class="start" on:click={() => open(next)}>Empezar</button>
        <p class="start-info">Clase {next.num} · {next.title}</p>
      {/if}
    </div>

    <button class="scroll-cue" on:click={toTimeline}>Ver el recorrido ↓</button>
  </section>

  <section class="timeline-wrap" bind:this={tlEl}>
    <p class="tl-title">El recorrido</p>
    <div class="timeline">
      {#each classes as c (c.num)}
        <button
          class="item"
          class:locked={!c.content}
          on:click={() => open(c)}
          disabled={!c.content}
        >
          <div class="node-col">
            <span class="dot">
              {#if c.content}{c.num}{:else}<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path fill="currentColor" d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 0 1 6 0v3Z"/></svg>{/if}
            </span>
          </div>
          <div class="body">
            <span class="era">{c.era}</span>
            <b>{c.title}</b>
            <small>{c.content ? "Disponible · tocá para empezar" : "Bloqueada"}</small>
          </div>
          {#if c.content}<span class="chev">›</span>{/if}
        </button>
      {/each}
    </div>
    <footer class="foot">Se irán habilitando más clases pronto.</footer>
  </section>
</div>

<style>
  .home {
    position: relative;
    height: 100dvh;
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
  }

  /* ---------- hero a pantalla completa ---------- */
  .hero {
    scroll-snap-align: start;
    scroll-snap-stop: always;
    max-width: 480px;
    margin: 0 auto;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: calc(env(safe-area-inset-top) + 48px) 22px
      calc(env(safe-area-inset-bottom) + 28px);
  }
  .hero-top {
    padding-top: 6vh;
  }
  h1 {
    margin: 0;
    font-size: 34px;
    line-height: 1.14;
    font-weight: 800;
    letter-spacing: -0.6px;
  }
  h1 span {
    color: var(--accent-ink);
  }
  .sub {
    margin: 16px 0 0;
    font-size: 13.5px;
    line-height: 1.55;
    color: var(--text-soft);
    max-width: 32ch;
  }
  .sub a {
    color: var(--accent-ink);
    font-weight: 600;
    text-decoration: none;
    border-bottom: 1px dotted color-mix(in srgb, var(--accent-ink) 55%, transparent);
  }

  .hero-center {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
  }
  .start {
    background: var(--accent);
    border: none;
    border-radius: 999px;
    padding: 16px 52px;
    cursor: pointer;
    font: inherit;
    font-size: 18px;
    font-weight: 800;
    color: var(--text);
    transition: transform 0.1s;
  }
  .start:active { transform: scale(0.97); }
  .start-info {
    margin: 0;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-soft);
  }
  .scroll-cue {
    align-self: center;
    background: none;
    border: none;
    color: var(--text-soft);
    font: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    opacity: 0.85;
  }

  /* ---------- recorrido (timeline) ---------- */
  .timeline-wrap {
    scroll-snap-align: start;
    max-width: 480px;
    margin: 0 auto;
    padding: 24px 22px calc(env(safe-area-inset-bottom) + 50px);
  }
  .tl-title {
    margin: 0 0 16px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.6px;
    text-transform: uppercase;
    color: var(--text-soft);
  }
  .timeline {
    display: flex;
    flex-direction: column;
  }
  .item {
    display: flex;
    align-items: stretch;
    gap: 14px;
    width: 100%;
    padding: 9px 0;
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    font: inherit;
    color: inherit;
  }
  .item:disabled { cursor: default; }

  .node-col {
    position: relative;
    flex: 0 0 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .node-col::before,
  .node-col::after {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: var(--line);
  }
  .node-col::before { top: 0; height: calc(50% - 20px); }
  .node-col::after { bottom: 0; height: calc(50% - 20px); }
  .item:first-child .node-col::before { display: none; }
  .item:last-child .node-col::after { display: none; }

  .dot {
    position: relative;
    z-index: 1;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    font-weight: 800;
    font-size: 15px;
    background: var(--surface);
    color: var(--accent);
    border: 2px solid var(--accent);
  }
  .locked .dot {
    background: var(--surface);
    color: var(--text-soft);
    border: 1.5px solid var(--line);
  }

  .body {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2px 0;
  }
  .era {
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--text-soft);
    opacity: 0.75;
  }
  .body b {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.25;
    margin: 1px 0;
  }
  .body small { font-size: 12px; color: var(--text-soft); }
  .locked .body b { color: var(--text-soft); }
  .locked .era { opacity: 0.5; }

  .chev {
    align-self: center;
    color: var(--accent-ink);
    font-size: 24px;
    font-weight: 700;
    padding-right: 2px;
  }

  .item:not(.locked) {
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 12px 14px;
    margin: 6px 0;
  }
  .item:not(.locked) .node-col::before,
  .item:not(.locked) .node-col::after { display: none; }
  .item:not(.locked):active { transform: scale(0.99); }

  .foot {
    margin-top: 26px;
    text-align: center;
    font-size: 12px;
    color: var(--text-soft);
    opacity: 0.7;
  }
</style>
