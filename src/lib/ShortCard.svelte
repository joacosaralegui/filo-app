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

  $: fieldCls = !answered ? "" : correct ? "border-good bg-good/22 pop-anim" : "border-bad bg-bad/16";
  $: inkCls = correct ? "text-good-ink" : "text-bad-ink";
</script>

<div class="flex w-full max-w-[480px] flex-col justify-center {shake ? 'shake-anim' : ''}">
  <span
    class="mb-[18px] self-start rounded-full px-[13px] py-1.5 text-xs font-extrabold tracking-[1.6px] text-bg uppercase transition-colors duration-[250ms] {correct
      ? 'bg-good'
      : answered
        ? 'bg-bad'
        : 'bg-accent-ink'}"
  >
    {answered ? (correct ? "¡Correcto!" : "Incorrecto") : "Escribí la respuesta"}
  </span>
  <h2
    class="m-0 mb-[22px] font-serif text-[23px] font-extrabold leading-[1.32] tracking-[-0.3px] [@media(max-height:700px)]:mb-4 [@media(max-height:700px)]:text-[20px]"
  >
    {card.question}
  </h2>

  <div
    class="flex items-center gap-2.5 rounded-[14px] border-[1.5px] border-line bg-surface px-4 py-1 transition-colors duration-[180ms] {fieldCls}"
  >
    <input
      type="text"
      class="min-w-0 flex-1 border-0 bg-transparent py-3.5 text-[16.5px] text-text outline-none [font-family:inherit] disabled:opacity-100 [@media(max-height:700px)]:py-3 [@media(max-height:700px)]:text-base {answered
        ? inkCls
        : ''}"
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
      <span class="text-[17px] font-extrabold {inkCls}">{correct ? "✓" : "✕"}</span>
    {/if}
  </div>

  {#if !answered}
    <button
      class="mt-3.5 cursor-pointer self-start rounded-[13px] bg-accent px-[22px] py-3 text-[15px] font-extrabold text-on-accent [font-family:inherit] not-disabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-45"
      on:click={responder}
      disabled={!texto.trim()}>Responder</button
    >
  {/if}
</div>

<style>
  /* Keyframes: la vibración al fallar y el "pop" al acertar el campo. */
  .pop-anim {
    animation: pop 0.4s ease;
  }
  @keyframes pop {
    0% { transform: scale(1); }
    45% { transform: scale(1.035); }
    100% { transform: scale(1); }
  }
  .shake-anim {
    animation: shake 0.4s ease;
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(7px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(3px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .pop-anim, .shake-anim { animation: none; }
  }
</style>
