<script>
  // Ficha de un cromo: qué es y cómo se gana. Mismo lenguaje visual que
  // ExplainSheet (hoja que sube desde abajo) — no un componente nuevo desde
  // cero, la app ya tiene este patrón para "más info sobre esto".
  import { createEventDispatcher } from "svelte";

  export let data = null; // { cromo, ganado, tier, progreso } | null
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
  {@const { cromo, ganado, tier, progreso } = data}
  <div
    class="backdrop-anim fixed inset-0 z-[80] flex items-end justify-center bg-black/55 backdrop-blur-[2px]"
    on:click={cerrar}
    role="presentation"
  >
    <div
      class="sheet-anim w-full max-w-[480px] rounded-t-[4px] border border-b-0 border-line bg-bg px-[22px] pt-2.5 pb-[calc(env(safe-area-inset-bottom)+24px)]"
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
    >
      <div class="mx-auto mb-3.5 h-1 w-10 rounded-[3px] bg-line"></div>

      <div class="flex items-center gap-4">
        <div class="relative h-[76px] w-[76px] flex-none overflow-hidden rounded-[4px] bg-surface-2">
          <img
            class="h-full w-full object-cover {ganado ? 'opacity-95' : 'opacity-45 grayscale-[0.9]'}"
            src={cromo.img}
            alt=""
          />
          <span class="img-halftone" aria-hidden="true"></span>
        </div>
        <div class="flex min-w-0 flex-col gap-1">
          <span
            class="inline-block w-fit rounded-[4px] px-2.5 py-1 text-[14px] font-extrabold uppercase {ganado
              ? 'bg-accent text-on-accent'
              : 'bg-surface-3 text-text-soft'}">{ganado ? "Conseguido" : tier}</span
          >
          <h3 class="m-0 font-serif text-[22px] leading-tight font-semibold text-text">{cromo.nombre}</h3>
        </div>
      </div>

      <p class="mt-4 mb-1 text-[16px] leading-[1.6] text-text-soft">{cromo.descripcion}</p>
      {#if !ganado && progreso}
        <p class="mb-1 text-[15px] font-semibold text-text-soft/70">{progreso}</p>
      {/if}
    </div>
  </div>
{/if}

<style>
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
