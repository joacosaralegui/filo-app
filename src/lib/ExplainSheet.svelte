<script>
  // Hoja con la explicación de una card, en el mismo lenguaje visual que el
  // glosario. Aparece SÓLO cuando la respuesta fue incorrecta.
  //
  // Antes la explicación se revelaba dentro de la card: al crecer el contenido,
  // la pregunta y las opciones —centradas verticalmente— se corrían hacia
  // arriba. Sacándola a una hoja, la card no cambia de alto y nada se mueve.
  import { createEventDispatcher } from "svelte";
  import RichText from "./RichText.svelte";

  export let data = null; // { solucion?: string, texto: string } | null
  const dispatch = createEventDispatcher();

  function cerrar() {
    dispatch("close");
  }
  function onKey(e) {
    if (e.key === "Escape") cerrar();
  }
</script>

<svelte:window on:keydown={onKey} />

{#if data}
  <div
    class="backdrop-anim fixed inset-0 z-[80] flex items-end justify-center bg-black/55 backdrop-blur-[2px]"
    on:click={cerrar}
    role="presentation"
  >
    <div
      class="sheet-anim w-full max-w-[480px] rounded-t-[22px] border border-b-0 border-line bg-bg px-[22px] pt-2.5 pb-[calc(env(safe-area-inset-bottom)+24px)] [box-shadow:0_-12px_40px_rgba(0,0,0,0.5)]"
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
    >
      <div class="mx-auto mb-3.5 h-1 w-10 rounded-[3px] bg-line"></div>
      <span class="inline-block rounded-full bg-bad px-2.5 py-1 text-[11px] font-extrabold tracking-[1.4px] text-bg uppercase"
        >¿Por qué?</span
      >
      {#if data.solucion}
        <h3 class="mt-3 font-serif text-[21px] font-extrabold tracking-[-0.3px] text-accent-ink">{data.solucion}</h3>
      {/if}
      {#if data.texto}
        <p class="mt-3 font-serif text-[15px] leading-[1.6] text-text-soft"><RichText text={data.texto} /></p>
      {/if}
      <button
        class="mt-5 w-full cursor-pointer rounded-[13px] border border-line bg-surface p-3.5 text-[15px] font-bold text-text [font-family:inherit] active:scale-[0.99]"
        on:click={cerrar}>Entendido</button
      >
    </div>
  </div>
{/if}

<style>
  /* Keyframes de entrada de la hoja modal. */
  .backdrop-anim {
    animation: fade 0.2s ease;
  }
  .sheet-anim {
    animation: slideup 0.26s cubic-bezier(0.16, 0.84, 0.3, 1);
  }
  @keyframes fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideup {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .backdrop-anim, .sheet-anim { animation-duration: 1ms; }
  }
</style>
