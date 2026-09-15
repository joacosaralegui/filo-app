<script>
  // Un cromo del álbum: la lámina + el nombre metidos en una misma tarjeta
  // (mismo lenguaje de card que el resto de la app), no la imagen flotando
  // con una leyenda suelta debajo. La usan las cuatro grillas de
  // Cromos.svelte.
  import { createEventDispatcher } from "svelte";

  export let cromo;
  export let ganado = false;
  export let aspecto = "aspect-square";

  const dispatch = createEventDispatcher();
</script>

<button
  class="flex w-full cursor-pointer flex-col gap-2 rounded-[4px] halftone-surface-subtle border-0 bg-surface p-2.5 text-left [font-family:inherit] transition-transform active:scale-[0.96]"
  on:click={() => dispatch("open")}
  aria-label={cromo.nombre}
>
  <div class="relative {aspecto} w-full overflow-hidden rounded-[4px] bg-surface-2">
    <img
      class="h-full w-full object-cover {ganado ? 'opacity-95' : 'opacity-45 grayscale-[0.9]'}"
      src={cromo.img}
      alt=""
    />
    <span class="img-halftone" aria-hidden="true"></span>
  </div>
  <span class="line-clamp-2 [overflow-wrap:anywhere] text-center text-[18px] leading-[1.2] font-semibold text-text-soft"
    >{cromo.nombre}</span
  >
</button>
