<script>
  // Pestaña "Cursos": sólo la lista. El "qué hago ahora" vive en Inicio, así
  // que acá no hay hero ni continuar — es puro descubrimiento, y por eso
  // scrollea normal, sin snap.
  import { createEventDispatcher } from "svelte";
  import RootHeader from "./RootHeader.svelte";
  import { progress, courseStateOf } from "./progress.js";
  import { imagenDe } from "./cromos.js";
  import portada from "../assets/cursos.webp";
  export let courses = [];
  const dispatch = createEventDispatcher();

  // Dónde quedaste en cada curso, para que la lista no sea sólo un menú: la
  // tarjeta del curso empezado dice por dónde vas.
  $: enCurso = (id) => {
    const st = courseStateOf($progress, id);
    return st.lastClass != null ? st.lastClass : null;
  };
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+110px)]"
>
  <RootHeader img={portada} title="Cursos" wash={0.35} position="50% 62%" zoom={2} />

  <div class="flex flex-col gap-[18px]">
    {#each courses as c (c.id)}
      {@const num = enCurso(c.id)}
      <button
        class="flex w-full cursor-pointer items-center gap-4 rounded-2xl bg-surface p-5 text-left [font-family:inherit] active:scale-[0.995]"
        on:click={() => dispatch("open", c)}
      >
        {#if c.portada}
          <span class="h-[84px] w-[84px] flex-none overflow-hidden rounded-xl bg-surface-2">
            <img class="h-full w-full object-cover" src={imagenDe(c.portada)} alt="" />
          </span>
        {/if}
        <div class="flex min-w-0 flex-1 flex-col">
          <b class="font-serif text-[22px] leading-[1.12] font-semibold text-text">{c.title}</b>
          {#if c.subtitle}<span
              class="mt-1 font-serif text-[15px] leading-[1.25] font-medium text-accent italic"
              >{c.subtitle}</span
            >{/if}
          {#if num != null}
            <span class="mt-2 text-[11px] font-bold tracking-[0.6px] text-accent-3 uppercase"
              >Vas por la clase {num}</span
            >
          {/if}
        </div>
        <span class="self-center text-2xl font-semibold text-accent opacity-80">›</span>
      </button>
    {/each}
  </div>
</div>

