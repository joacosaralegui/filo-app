<script>
  // Barra de navegación inferior: inicio, curso actual y álbum.
  //
  // No aparece dentro de una clase: ahí el feed es inmersivo (pantalla
  // completa con scroll-snap) y una barra fija le comería alto y competiría
  // con el gesto de avanzar.
  import { createEventDispatcher } from "svelte";
  import { progress } from "./progress.js";

  export let active = "inicio"; // "inicio" | "curso" | "album"

  const dispatch = createEventDispatcher();

  // El curso actual es el último que tocaste. Sin ninguno, la pestaña queda
  // apagada en vez de desaparecer: si no, la barra cambiaría de forma.
  $: cursoId = $progress.lastCourse || null;
</script>

<nav
  class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-[6px]"
>
  <div class="mx-auto flex max-w-[480px] items-stretch">
    <button
      class="flex flex-1 cursor-pointer flex-col items-center gap-1 border-0 bg-transparent pt-2.5 pb-2 [font-family:inherit] {active ===
      'inicio'
        ? 'text-accent'
        : 'text-text-soft/70'}"
      on:click={() => dispatch("inicio")}
      aria-current={active === "inicio" ? "page" : undefined}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5"
        /></svg
      >
      <span class="text-[10px] font-bold tracking-[0.4px]">Inicio</span>
    </button>

    <button
      class="flex flex-1 flex-col items-center gap-1 border-0 bg-transparent pt-2.5 pb-2 [font-family:inherit] {!cursoId
        ? 'cursor-default text-text-soft/30'
        : active === 'curso'
          ? 'cursor-pointer text-accent'
          : 'cursor-pointer text-text-soft/70'}"
      on:click={() => cursoId && dispatch("curso", { id: cursoId })}
      disabled={!cursoId}
      aria-current={active === "curso" ? "page" : undefined}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-width="1.9"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 4.5h6a2.5 2.5 0 0 1 2 2 2.5 2.5 0 0 1 2-2h6v13h-6a2.5 2.5 0 0 0-2 2 2.5 2.5 0 0 0-2-2H4zM12 6.5v13"
        /></svg
      >
      <span class="text-[10px] font-bold tracking-[0.4px]">Curso</span>
    </button>

    <button
      class="flex flex-1 cursor-pointer flex-col items-center gap-1 border-0 bg-transparent pt-2.5 pb-2 [font-family:inherit] {active ===
      'album'
        ? 'text-accent'
        : 'text-text-soft/70'}"
      on:click={() => dispatch("album")}
      aria-current={active === "album" ? "page" : undefined}
    >
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"
        ><g fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"
          ><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect
            x="13.5"
            y="3.5"
            width="7"
            height="7"
            rx="1.5"
          /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect
            x="13.5"
            y="13.5"
            width="7"
            height="7"
            rx="1.5"
          /></g
        ></svg
      >
      <span class="text-[10px] font-bold tracking-[0.4px]">Álbum</span>
    </button>
  </div>
</nav>
