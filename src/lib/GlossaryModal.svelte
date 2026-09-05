<script>
  import { activeTerm, closeTerm } from "./glossary.js";

  const KIND_LABEL = {
    autor: "Autor",
    concepto: "Concepto",
    obra: "Obra",
    evento: "Evento",
  };
  const KIND_CLASS = {
    autor: "bg-good/18 text-good-ink",
    concepto: "bg-accent/24 text-accent-ink",
    obra: "bg-bad/16 text-bad-ink",
    evento: "bg-text/8 text-text-soft",
  };

  function onKey(e) {
    if (e.key === "Escape") closeTerm();
  }
</script>

<svelte:window on:keydown={onKey} />

{#if $activeTerm}
  <div
    class="backdrop-anim fixed inset-0 z-[80] flex items-end justify-center bg-black/55 backdrop-blur-[2px]"
    on:click={closeTerm}
    role="presentation"
  >
    <div
      class="sheet-anim flex max-h-[85dvh] w-full max-w-[480px] flex-col rounded-t-[22px] border border-b-0 border-line bg-bg px-[22px] pt-2.5 pb-[calc(env(safe-area-inset-bottom)+24px)] [box-shadow:0_-12px_40px_rgba(0,0,0,0.5)]"
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
    >
      <div class="mx-auto mt-1 mb-4 h-1 w-10 rounded-[3px] bg-line"></div>
      <div class="mb-2.5 flex items-center gap-2.5">
        <span
          class="rounded-full px-2.5 py-1 text-[11px] font-extrabold tracking-[1.2px] uppercase {KIND_CLASS[
            $activeTerm.kind
          ] || ''}">{KIND_LABEL[$activeTerm.kind] || ""}</span
        >
        {#if $activeTerm.when}<span class="text-[13px] font-bold text-text-soft [font-variant-numeric:tabular-nums]"
            >{$activeTerm.when}</span
          >{/if}
      </div>
      <h3 class="mb-3 font-serif text-2xl font-extrabold tracking-[-0.3px]">{$activeTerm.term}</h3>
      <p class="mb-[22px] min-h-0 overflow-y-auto font-serif text-base leading-[1.65] text-text-soft">
        {$activeTerm.body}
      </p>
      <button
        class="w-full cursor-pointer rounded-[13px] border border-line bg-surface p-3.5 text-[15px] font-bold text-text [font-family:inherit] active:scale-[0.99]"
        on:click={closeTerm}>Entendido</button
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
  @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideup { from { transform: translateY(100%); } to { transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) {
    .backdrop-anim, .sheet-anim { animation-duration: 1ms; }
  }
</style>
