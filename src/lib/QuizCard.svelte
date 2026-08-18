<script>
  import { createEventDispatcher } from "svelte";
  export let card;
  export let saved = null; // índice ORIGINAL ya elegido (al reanudar), o null
  const dispatch = createEventDispatcher();

  // Orden de opciones barajado una vez por montaje, para eliminar el sesgo
  // posicional de la respuesta correcta. Se renderiza según `order`, pero se
  // conserva el índice original para comparar con card.answer: la lógica de
  // corrección no cambia. Al reentrar a la clase el componente se remonta
  // (ver {#key} en App.svelte) y el orden se rebaraja.
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const order = shuffle([...card.options.keys()]);

  let picked = saved; // restaura la respuesta guardada si existe
  let shake = false;
  $: answered = picked !== null;
  $: correct = answered && picked === card.answer;

  function choose(i) {
    if (answered) return;
    picked = i;
    const isCorrect = i === card.answer;
    if (!isCorrect) {
      shake = true;
      setTimeout(() => (shake = false), 420);
    }
    dispatch("answer", { correct: isCorrect, save: i });
  }
</script>

<div class="slide-inner quiz" class:shake>
  <span class="tag" class:ok={correct} class:no={answered && !correct}>
    {answered ? (correct ? "¡Correcto!" : "Incorrecto") : "Pregunta"}
  </span>
  <h2>{card.question}</h2>

  <div class="opts">
    {#each order as i (i)}
      <button
        class="opt"
        class:correct={answered && i === card.answer}
        class:wrong={answered && i === picked && i !== card.answer}
        class:dim={answered && i !== card.answer && i !== picked}
        on:click={() => choose(i)}
        disabled={answered}
      >
        <span class="txt">{card.options[i]}</span>
        {#if answered && i === card.answer}<span class="mark">✓</span>{/if}
        {#if answered && i === picked && i !== card.answer}<span class="mark">✕</span>{/if}
      </button>
    {/each}
  </div>

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
  @keyframes pop {
    0% { transform: scale(1); }
    45% { transform: scale(1.035); }
    100% { transform: scale(1); }
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
    .opt.correct, .shake { animation: none; }
  }
</style>
