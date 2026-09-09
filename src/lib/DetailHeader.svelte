<script>
  // Header de las pantallas de detalle (un curso adentro de Cursos): compacto,
  // con el "atrás" a la izquierda. Es la contracara de RootHeader: donde aquel
  // abre una pestaña, este dice "estás un nivel adentro".
  import { createEventDispatcher } from "svelte";
  export let title;
  export let eyebrow = null;
  const dispatch = createEventDispatcher();
</script>

<header class="flex items-center gap-3">
  <button
    class="flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-full border-0 bg-surface text-text [font-family:inherit] transition-transform active:scale-[0.94]"
    on:click={() => dispatch("back")}
    aria-label="Volver"
  >
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"
      ><path
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 5l-7 7 7 7"
      /></svg
    >
  </button>
  <div class="flex min-w-0 flex-col">
    {#if eyebrow}
      <span class="text-[10px] font-bold tracking-[1.4px] text-text-soft/70 uppercase">{eyebrow}</span>
    {/if}
    <span class="truncate font-serif text-[17px] leading-tight font-semibold text-text">{title}</span>
  </div>
</header>
