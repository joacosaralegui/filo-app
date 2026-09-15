<script>
  // Ceremonia de "cromo nuevo": la usan ClassView (al cerrar una clase) y
  // Desafio (al sacar 7/7) — mismo festejo para cualquier lugar que pueda
  // otorgar un cromo, así no se duplica la animación en cada uno.
  import { createEventDispatcher } from "svelte";

  export let cromo = null; // el que se está mostrando ahora (o null)
  export let pendientes = 0; // cuántos más esperan en cola, para el label del botón

  const dispatch = createEventDispatcher();
</script>

<!-- Va sobre el burst de cierre (z-60 en quien la usa), así las partículas
     estallan POR DETRÁS de la carta. -->
{#if cromo}
  <div class="reveal-fondo fixed inset-0 z-[70] flex flex-col items-center justify-center gap-6 px-[22px]">
    <div class="relative grid place-items-center">
      <span class="reveal-halo" aria-hidden="true"></span>
      <div class="reveal-carta overflow-hidden rounded-[4px] halftone-surface-subtle bg-surface p-3">
        {#if cromo.img}
          <span class="relative block h-[210px] w-[210px]">
            <img class="block h-full w-full rounded-[4px] object-cover" src={cromo.img} alt="" />
            <span class="img-halftone rounded-[4px]" aria-hidden="true"></span>
          </span>
        {/if}
      </div>
    </div>

    <div class="reveal-texto flex flex-col items-center gap-2 text-center">
      <span class="text-[16px] font-extrabold text-accent-3 uppercase">Nuevo cromo</span>
      <span class="font-serif text-[26px] leading-tight font-semibold text-text">{cromo.nombre}</span>
      <button
        class="mt-4 cursor-pointer rounded-[4px] border-0 halftone-surface bg-accent px-7 py-3.5 text-[16px] font-bold text-on-accent uppercase [font-family:inherit] transition-transform active:scale-[0.97]"
        on:click={() => dispatch("next")}
      >
        {pendientes ? "Siguiente" : "Seguir"}
      </button>
    </div>
  </div>
{/if}

<style>
  /* La carta entra girando sobre su eje vertical, como cuando se da vuelta
     una figurita, y pasa de largo el tamaño final antes de asentarse. El
     halo sale detrás en el mismo momento del impacto. */
  .reveal-fondo {
    background: color-mix(in srgb, var(--bg) 88%, transparent);
    backdrop-filter: blur(3px);
    animation: fade-suave 0.3s ease both;
  }
  .reveal-carta {
    animation: cromo-in 0.72s cubic-bezier(0.16, 0.9, 0.3, 1.05) 0.1s both;
  }
  .reveal-halo {
    position: absolute;
    width: 240px;
    height: 240px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      color-mix(in srgb, var(--accent-2) 70%, transparent) 0%,
      transparent 70%
    );
    animation: halo 0.9s ease-out 0.34s both;
  }
  .reveal-texto {
    animation: texto-in 0.5s ease 0.5s both;
  }
  @keyframes fade-suave {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes cromo-in {
    0% { opacity: 0; transform: perspective(900px) rotateY(-160deg) scale(0.45); }
    65% { opacity: 1; transform: perspective(900px) rotateY(12deg) scale(1.07); }
    100% { opacity: 1; transform: perspective(900px) rotateY(0) scale(1); }
  }
  @keyframes halo {
    from { opacity: 0.75; transform: scale(0.45); }
    to { opacity: 0; transform: scale(1.85); }
  }
  @keyframes texto-in {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .reveal-carta, .reveal-texto, .reveal-fondo { animation-duration: 1ms; }
    .reveal-halo { animation: none; opacity: 0; }
  }
</style>
