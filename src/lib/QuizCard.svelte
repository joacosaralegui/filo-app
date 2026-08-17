<script>
  import { createEventDispatcher } from "svelte";
  import RichText from "./RichText.svelte";
  export let card;
  const dispatch = createEventDispatcher();

  let picked = null;
  let shake = false;
  $: answered = picked !== null;
  $: correct = answered && picked === card.answer;

  function choose(i) {
    if (answered) return;
    picked = i;
    const correct = i === card.answer;
    if (!correct) {
      shake = true;
      setTimeout(() => (shake = false), 420);
    }
    dispatch("answer", { correct });
  }
</script>

<div class="slide-inner quiz" class:shake>
  <span class="tag" class:ok={correct} class:no={answered && !correct}>
    {answered ? (correct ? "¡Correcto!" : "Incorrecto") : "Pregunta"}
  </span>
  <h2>{card.question}</h2>

  <div class="opts">
    {#each card.options as opt, i}
      <button
        class="opt"
        class:correct={answered && i === card.answer}
        class:wrong={answered && i === picked && i !== card.answer}
        class:dim={answered && i !== card.answer && i !== picked}
        on:click={() => choose(i)}
        disabled={answered}
      >
        <span class="txt">{opt}</span>
        {#if answered && i === card.answer}<span class="mark">✓</span>{/if}
        {#if answered && i === picked && i !== card.answer}<span class="mark">✕</span>{/if}
      </button>
    {/each}
  </div>

  {#if answered}
    <p class="explain"><RichText text={card.explain} /></p>
  {/if}
</div>

<style>
  .slide-inner {
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .tag {
    align-self: flex-start;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.6px;
    font-weight: 800;
    color: var(--bg);
    background: var(--accent-ink);
    padding: 6px 13px;
    border-radius: 999px;
    margin-bottom: 18px;
    transition: background 0.25s ease;
  }
  .tag.ok {
    background: var(--good);
  }
  .tag.no {
    background: var(--bad);
  }
  h2 {
    font-size: 23px;
    line-height: 1.32;
    margin: 0 0 22px;
    font-weight: 800;
    letter-spacing: -0.3px;
  }
  .opts {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .opt {
    display: flex;
    align-items: center;
    gap: 10px;
    text-align: left;
    background: var(--surface);
    border: 1.5px solid var(--line);
    border-radius: 14px;
    padding: 15px 16px;
    font: inherit;
    font-size: 15.5px;
    line-height: 1.4;
    color: var(--text);
    cursor: pointer;
    transition: transform 0.08s, background 0.18s, border-color 0.18s, opacity 0.18s;
  }
  .opt .txt { flex: 1; }
  .opt:not(:disabled):active { transform: scale(0.985); }
  .opt.correct {
    background: color-mix(in srgb, var(--good) 22%, transparent);
    border-color: var(--good);
    color: var(--good-ink);
    animation: pop 0.4s ease;
  }
  .opt.wrong {
    background: color-mix(in srgb, var(--bad) 16%, transparent);
    border-color: var(--bad);
    color: var(--bad-ink);
  }
  .opt.dim { opacity: 0.4; }
  .mark {
    font-weight: 800;
    font-size: 17px;
  }
  .opt.correct .mark { color: var(--good-ink); }
  .opt.wrong .mark { color: var(--bad-ink); }
  .explain {
    margin: 18px 0 0;
    padding-top: 15px;
    border-top: 1px solid var(--line);
    color: var(--text-soft);
    line-height: 1.55;
    font-size: 14.5px;
    animation: rise 0.35s ease;
  }
  @keyframes pop {
    0% { transform: scale(1); }
    45% { transform: scale(1.035); }
    100% { transform: scale(1); }
  }
  @keyframes rise {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .shake { animation: shake 0.4s ease; }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(7px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(3px); }
  }
  @media (max-height: 700px) {
    h2 { font-size: 20px; margin-bottom: 16px; }
    .opt { padding: 12px 14px; font-size: 14.5px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .opt.correct, .explain, .shake { animation: none; }
  }
</style>
