<script>
  // Barra de navegación compartida: misma altura, mismos tamaños de toque y
  // el logo siempre presente en todas las pantallas. El botón de volver y el
  // logo miden 44px, el mínimo recomendado para un target táctil.
  //
  // El logo siempre lleva al catálogo (la home de la app), así que en cualquier
  // pantalla hay una salida de un solo tap hacia el inicio.
  import { createEventDispatcher } from "svelte";
  import logo from "../assets/logo.webp";

  export let back = false; // mostrar el botón de volver
  export let backLabel = "Volver";

  const dispatch = createEventDispatcher();
</script>

<div class="flex items-center gap-2.5">
  {#if back}
    <button
      class="grid h-11 w-11 flex-none cursor-pointer place-items-center rounded-2xl border border-line bg-surface text-text transition-transform active:scale-[0.94]"
      on:click={() => dispatch("back")}
      aria-label={backLabel}
    >
      <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"
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
  {/if}

  <!-- El logo ya trae su propia forma (squircle) y transparencia: va suelto,
       sin badge ni borde detrás. -->
  <button
    class="h-11 w-11 flex-none cursor-pointer transition-transform active:scale-[0.94]"
    on:click={() => dispatch("home")}
    aria-label="Ir al inicio"
  >
    <img class="h-full w-full object-contain" src={logo} alt="" aria-hidden="true" />
  </button>

  <slot />
</div>
