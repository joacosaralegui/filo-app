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

<div class="flex w-full max-w-[480px] flex-col justify-center {shake ? 'shake-anim' : ''}">
  <span
    class="mb-[18px] self-start rounded-full px-[13px] py-1.5 text-xs font-extrabold tracking-[1.6px] text-bg uppercase transition-colors duration-[250ms] {correct
      ? 'bg-good'
      : answered
        ? 'bg-bad'
        : 'bg-accent-ink'}"
  >
    {answered ? (correct ? "¡Correcto!" : "Incorrecto") : "Pregunta"}
  </span>
  <h2
    class="m-0 mb-[22px] font-serif text-[23px] font-extrabold leading-[1.32] tracking-[-0.3px] [@media(max-height:700px)]:mb-4 [@media(max-height:700px)]:text-[20px]"
  >
    {card.question}
  </h2>

  <div class="flex flex-col gap-2.5">
    {#each order as i (i)}
      {@const optCls = !answered
        ? ""
        : i === card.answer
          ? "border-good bg-good/22 text-good-ink pop-anim"
          : i === picked
            ? "border-bad bg-bad/16 text-bad-ink"
            : "opacity-40"}
      <button
        class="flex cursor-pointer items-center gap-2.5 rounded-[14px] border-[1.5px] border-line bg-surface px-4 py-[15px] text-left text-[15.5px] leading-[1.4] text-text [font-family:inherit] [transition:transform_0.08s,background-color_0.18s,border-color_0.18s,opacity_0.18s] not-disabled:active:scale-[0.985] [@media(max-height:700px)]:px-3.5 [@media(max-height:700px)]:py-3 [@media(max-height:700px)]:text-[14.5px] {optCls}"
        on:click={() => choose(i)}
        disabled={answered}
      >
        <span class="flex-1">{card.options[i]}</span>
        {#if answered && i === card.answer}<span class="text-[17px] font-extrabold text-good-ink">✓</span>{/if}
        {#if answered && i === picked && i !== card.answer}<span class="text-[17px] font-extrabold text-bad-ink"
            >✕</span
          >{/if}
      </button>
    {/each}
  </div>
</div>

<style>
  /* Keyframes: la vibración al fallar y el "pop" al marcar la correcta. */
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
