<script>
  // Pestaña "Cursos": sólo la lista. El "qué hago ahora" vive en Inicio, así
  // que acá no hay hero ni continuar — es puro descubrimiento, y por eso
  // scrollea normal, sin snap.
  import { createEventDispatcher } from "svelte";
  import Landmark from "@lucide/svelte/icons/landmark";
  import Orbit from "@lucide/svelte/icons/orbit";
  import Brain from "@lucide/svelte/icons/brain";
  import RootHeader from "./RootHeader.svelte";
  import { progress, courseStateOf } from "./progress.js";
  import portada from "../assets/cursos.webp";
  export let courses = [];
  const dispatch = createEventDispatcher();

  // Dónde quedaste en cada curso, para que la lista no sea sólo un menú: la
  // tarjeta del curso empezado dice por dónde vas.
  $: enCurso = (id) => {
    const st = courseStateOf($progress, id);
    return st.lastClass != null ? st.lastClass : null;
  };

  // Un ícono de Lucide por curso: columnata para la antigua, órbita para la
  // nueva ciencia moderna, cerebro para la crisis del sujeto contemporánea.
  const courseIcons = { antigua: Landmark, moderna: Orbit, contemporanea: Brain };
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+110px)]"
>
  <RootHeader img={portada} title="Cursos" wash={0.42} position="50% 62%" zoom={2} halftone />

  <div class="flex flex-col gap-[18px]">
    {#each courses as c (c.id)}
      {@const num = enCurso(c.id)}
      {@const Icon = courseIcons[c.id]}
      <button
        class="flex w-full cursor-pointer items-center gap-4 rounded-[4px] halftone-surface-subtle bg-surface p-5 text-left [font-family:inherit] active:scale-[0.995]"
        on:click={() => dispatch("open", c)}
      >
        <span class="flex h-[52px] w-[52px] flex-none items-center justify-center rounded-[4px] bg-surface-2 text-accent">
          <Icon size={26} strokeWidth={1.6} />
        </span>
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

