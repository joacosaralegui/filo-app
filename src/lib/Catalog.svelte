<script>
  // Pestaña "Cursos": sólo la lista. El "qué hago ahora" vive en Inicio, así
  // que acá no hay hero ni continuar — es puro descubrimiento, y por eso
  // scrollea normal, sin snap.
  import { createEventDispatcher } from "svelte";
  import RootHeader from "./RootHeader.svelte";
  import { progress, courseStateOf } from "./progress.js";
  import iconAntigua from "../assets/cursos/antigua.webp";
  import iconModerna from "../assets/cursos/moderna.webp";
  import iconContemporanea from "../assets/cursos/contemporanea.webp";
  export let courses = [];
  const dispatch = createEventDispatcher();

  // Dónde quedaste en cada curso, para que la lista no sea sólo un menú: la
  // tarjeta del curso empezado dice por dónde vas.
  $: enCurso = (id) => {
    const st = courseStateOf($progress, id);
    return st.lastClass != null ? st.lastClass : null;
  };

  // Un ícono ilustrado por curso, recortado de la tira antigua/moderna/contemporánea.
  const courseIcons = { antigua: iconAntigua, moderna: iconModerna, contemporanea: iconContemporanea };
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+110px)]"
>
  <div class="flex flex-1 flex-col justify-center">
  <RootHeader title="Cursos" plain />

  <div class="flex flex-col gap-[18px]">
    {#each courses as c (c.id)}
      {@const num = enCurso(c.id)}
      {@const icon = courseIcons[c.id]}
      <button
        class="flex w-full cursor-pointer items-center gap-4 rounded-[4px] halftone-surface-subtle bg-surface p-4 text-left [font-family:inherit] active:scale-[0.995]"
        on:click={() => dispatch("open", c)}
      >
        <img class="h-[90px] w-[90px] max-w-[90px] flex-none rounded-[4px] bg-surface-2 object-cover" src={icon} alt="" />
        <div class="flex min-w-0 flex-1 flex-col">
          <b class="font-serif text-[22px] leading-[1.12] font-semibold text-text">{c.title}</b>
          {#if c.subtitle}<span
              class="mt-1 font-serif text-[16px] leading-[1.25] font-medium text-accent"
              >{c.subtitle}</span
            >{/if}
          {#if num != null && c.total}
            {@const pct = Math.min(100, Math.round((num / c.total) * 100))}
            <div
              class="mt-2.5 mr-3 h-[6px] w-full overflow-hidden rounded-full bg-accent-3/20"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Vas por la clase {num} de {c.total}"
            >
              <div class="h-full rounded-full bg-accent-3" style="width: {pct}%"></div>
            </div>
          {/if}
        </div>
      </button>
    {/each}
  </div>
  </div>
</div>

