<script>
  // Álbum de cromos. Muestra los 40 casilleros desde el principio: ver lo que
  // falta es el motor del álbum, así que los bloqueados se dibujan igual, en
  // plano y con el nombre a la vista.
  import { createEventDispatcher } from "svelte";
  import TopBar from "./TopBar.svelte";
  import { progress, cromosGanados } from "./progress.js";
  import { ALBUM, TOTAL } from "./cromos.js";

  const dispatch = createEventDispatcher();

  $: ganados = cromosGanados($progress);
  $: cuantos = ALBUM.filter((c) => ganados[c.slug]).length;
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+40px)]"
>
  <TopBar back backLabel="Volver" on:back={() => dispatch("back")} on:home={() => dispatch("back")} />

  <header class="mt-7 mb-7 flex items-start gap-4">
    <div class="flex min-w-0 flex-1 flex-col">
      <h1 class="m-0 font-serif text-[32px] leading-none font-semibold tracking-[-0.3px] text-text">Álbum</h1>
      <p class="mt-2.5 text-[13px] leading-normal text-text-soft">
        Sacá 3 estrellas en una clase para quedarte con su cromo.
      </p>
    </div>
    <div class="flex flex-none flex-col items-end">
      <span class="font-serif text-[42px] leading-none font-semibold text-accent">{cuantos}</span>
      <span class="mt-1 text-[12px] font-semibold text-text-soft">de {TOTAL}</span>
    </div>
  </header>

  <div class="grid grid-cols-3 gap-x-3 gap-y-5">
    {#each ALBUM as c (c.slug)}
      {@const got = !!ganados[c.slug]}
      <div class="flex flex-col gap-2">
        <div class="aspect-square overflow-hidden rounded-xl {got ? 'bg-surface' : 'bg-line/60'}">
          {#if got && c.img}
            <img class="h-full w-full object-cover" src={c.img} alt={c.nombre} />
          {:else}
            <!-- Silueta: círculo para los retratos, cuadrado para las ideas.
                 Insinúa qué tipo de cromo falta sin revelar el arte. -->
            <span class="grid h-full w-full place-items-center">
              <span
                class="h-[46%] w-[46%] bg-line {c.tipo === 'autor' ? 'rounded-full' : 'rounded-[3px]'}"
              ></span>
            </span>
          {/if}
        </div>
        <span
          class="line-clamp-2 text-center text-[10px] leading-tight font-semibold {got
            ? 'text-text-soft'
            : 'text-text-soft/45'}">{c.nombre}</span
        >
      </div>
    {/each}
  </div>
</div>
