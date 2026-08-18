<script>
  // Pregunta de respuesta corta: el estudiante escribe en vez de elegir.
  // Se corrige comparando texto (ver shortAnswer.js), sin modelos ni red.
  import { createEventDispatcher, tick } from "svelte";
  import { corregirCorta } from "./shortAnswer.js";

  export let card;
  export let saved = null; // { correct, texto } al reanudar, o null
  const dispatch = createEventDispatcher();

  let texto = saved?.texto ?? "";
  let answered = saved !== null;
  let correct = saved?.correct ?? false;
  let shake = false;

  // La primera de `answers` es la forma canónica: la que se muestra al fallar.
  $: canonica = card.answers[0];

  async function responder() {
    if (answered || !texto.trim()) return;
    const r = corregirCorta(texto, card.answers);
    correct = r.correcta;
    answered = true;
    if (!correct) {
      shake = true;
      setTimeout(() => (shake = false), 420);
    }
    await tick();
    // `solucion` alimenta la hoja de explicación (sólo se muestra al fallar).
    dispatch("answer", {
      correct,
      save: { correct, texto },
      solucion: correct ? null : (r.cerca ? `Casi: se escribe «${canonica}»` : canonica),
    });
  }

  function onKeydown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      responder();
    }
  }
</script>

<div class="slide-inner short" class:shake>
  <span class="tag" class:ok={correct} class:no={answered && !correct}>
    {answered ? (correct ? "¡Correcto!" : "Incorrecto") : "Escribí la respuesta"}
  </span>
  <h2>{card.question}</h2>

  <div class="field" class:correct={answered && correct} class:wrong={answered && !correct}>
    <input
      type="text"
      bind:value={texto}
      on:keydown={onKeydown}
      disabled={answered}
      placeholder="Tu respuesta…"
      autocomplete="off"
      autocapitalize="none"
      autocorrect="off"
      spellcheck="false"
      aria-label="Tu respuesta"
    />
    {#if answered}
      <span class="mark">{correct ? "✓" : "✕"}</span>
    {/if}
  </div>

  {#if !answered}
    <button class="send" on:click={responder} disabled={!texto.trim()}>Responder</button>
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
  .tag.ok { background: var(--good); }
  .tag.no { background: var(--bad); }
  h2 {
    font-size: 23px;
    line-height: 1.32;
    margin: 0 0 22px;
    font-weight: 800;
    letter-spacing: -0.3px;
  }
  .field {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--surface);
    border: 1.5px solid var(--line);
    border-radius: 14px;
    padding: 4px 16px;
    transition: background 0.18s, border-color 0.18s;
  }
  .field.correct {
    background: color-mix(in srgb, var(--good) 22%, transparent);
    border-color: var(--good);
    animation: pop 0.4s ease;
  }
  .field.wrong {
    background: color-mix(in srgb, var(--bad) 16%, transparent);
    border-color: var(--bad);
  }
  input {
    flex: 1;
    min-width: 0;
    background: none;
    border: none;
    outline: none;
    font: inherit;
    font-size: 16.5px;
    padding: 14px 0;
    color: var(--text);
  }
  .field.correct input { color: var(--good-ink); }
  .field.wrong input { color: var(--bad-ink); }
  input:disabled { opacity: 1; }
  .mark {
    font-weight: 800;
    font-size: 17px;
  }
  .field.correct .mark { color: var(--good-ink); }
  .field.wrong .mark { color: var(--bad-ink); }
  .send {
    margin-top: 14px;
    align-self: flex-start;
    padding: 12px 22px;
    border-radius: 13px;
    background: var(--accent);
    color: var(--on-accent);
    border: none;
    font: inherit;
    font-weight: 800;
    font-size: 15px;
    cursor: pointer;
  }
  .send:disabled { opacity: 0.45; cursor: not-allowed; }
  .send:not(:disabled):active { transform: scale(0.98); }
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
    input { font-size: 16px; padding: 12px 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .field.correct, .shake { animation: none; }
  }
</style>
