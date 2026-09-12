<script>
  // Pestaña "Inicio". No es un menú de la barra de abajo: muestra ESTADO —
  // dónde quedaste, qué podés jugar y cómo va la colección. Los destinos que
  // ya tienen pestaña propia (Cursos, Cromos) aparecen sólo cuando tienen algo
  // que contar, y con su información a la vista.
  import { createEventDispatcher } from "svelte";
  import RootHeader from "./RootHeader.svelte";
  import socrates from "../assets/socrates.webp";
  import { progress, cromosGanados, desafioDeHoy } from "./progress.js";
  import { conseguidos, TOTAL } from "./cromos.js";
  export let courses = [];
  const dispatch = createEventDispatcher();

  // Última actividad CROSS-CURSO (la guarda App.svelte al abrir una clase).
  $: last = $progress.lastActivity;
  $: lastCourseMeta = last ? courses.find((c) => c.id === last.courseId) : null;
  $: hayProgreso = !!(last && lastCourseMeta);

  $: album = conseguidos(cromosGanados($progress));
  // El desafío de hoy: hecho o pendiente. Es lo único que cambia de estado en
  // la home día a día, así que se ve en el ícono, no en un texto.
  $: hoy = desafioDeHoy($progress);
  </script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+110px)]"
>
  <RootHeader img={socrates} title="Pensadores" wash={0.35} position="50% 30%" zoom={1.9} />

  <!-- La pieza fuerte: seguir donde quedaste. Sin nada empezado ocupa el mismo
       lugar y la misma forma, pero manda a elegir curso: la pregunta que la
       pantalla contesta es siempre "¿y ahora qué?". -->
  {#if hayProgreso}
    <button
      class="group flex w-full cursor-pointer flex-col gap-3 rounded-[20px] bg-surface p-5 text-left [font-family:inherit] transition-transform active:scale-[0.99]"
      on:click={() => dispatch("resume", { id: lastCourseMeta.id, num: last.num })}
    >
      <span class="text-[11px] font-bold tracking-[1.4px] text-text-soft/70 uppercase">Continuar con</span>
      <div class="flex flex-col gap-2">
        <h2 class="font-serif text-[21px] leading-[1.25] font-semibold text-text">
          Clase {last.num} · {last.title}
        </h2>
        <p class="font-serif text-[14px] leading-[1.3] font-medium text-accent italic">
          {lastCourseMeta.title}{lastCourseMeta.subtitle ? ` · ${lastCourseMeta.subtitle}` : ""}
        </p>
      </div>
      <span
        class="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-[15px] text-[15px] font-bold text-on-accent transition-transform group-active:scale-[0.97]"
      >
        Continuar
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          /></svg
        >
      </span>
    </button>
  {:else}
    <button
      class="group flex w-full cursor-pointer flex-col gap-3 rounded-[20px] bg-surface p-5 text-left [font-family:inherit] transition-transform active:scale-[0.99]"
      on:click={() => dispatch("cursos")}
    >
      <span class="text-[11px] font-bold tracking-[1.4px] text-text-soft/70 uppercase">Para empezar</span>
      <h2 class="font-serif text-[21px] leading-[1.25] font-semibold text-text">
        Comenzá tu recorrido
      </h2>
      <p class="text-[13.5px] leading-[1.5] text-text-soft">
        Elegí un curso y andá clase por clase. Cada una termina en un cromo para el álbum.
      </p>
      <span
        class="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-[15px] text-[15px] font-bold text-on-accent transition-transform group-active:scale-[0.97]"
      >
        Ver los cursos
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          /></svg
        >
      </span>
    </button>
  {/if}

  <!-- Desafío diario. El ícono lleva el estado: rayo hueco mientras está
       pendiente, tilde sobre relleno de acento cuando ya lo hiciste. Es a
       propósito que se vea "incompleto" hasta que lo contestás — es el único
       pendiente que la app te pone por día. -->
  <button
    class="mt-3.5 flex w-full cursor-pointer items-center gap-3.5 rounded-2xl bg-surface-3 px-5 py-4 text-left [font-family:inherit] transition-transform active:scale-[0.99]"
    on:click={() => dispatch("desafio")}
  >
    <span
      class="flex h-9 w-9 flex-none items-center justify-center rounded-full {hoy
        ? 'bg-accent text-on-accent'
        : 'bg-bg/70 text-accent'}"
    >
      {#if hoy}
        <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-width="2.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M5 12.6 10 17.5 19 7"
          /></svg
        >
      {:else}
        <!-- rayo: es lo rápido y lo que no perdona, que es de lo que va -->
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-width="1.9"
            stroke-linejoin="round"
            d="M13.2 2.8 5 13.4h5.2l-.8 7.8L18 10.6h-5.3z"
          /></svg
        >
      {/if}
    </span>
    <span class="font-serif text-[18px] leading-tight font-semibold text-text">Desafío diario</span>
    {#if hoy}
      <span class="ml-auto font-serif text-[15px] font-semibold text-accent"
        >{hoy.aciertos}/{hoy.total}</span
      >
    {:else}
      <span class="ml-auto text-2xl font-semibold text-text-soft/50">›</span>
    {/if}
  </button>

  <!-- Cromos: la tira con los medallones, no un botón. Sin ningún cromo no
       aparece — una colección en cero desalienta y ensucia la pantalla. -->
  {#if album.length}
    <button
      class="mt-3.5 flex w-full cursor-pointer items-center gap-3 rounded-2xl border-0 bg-surface px-5 py-4 text-left [font-family:inherit] transition-transform active:scale-[0.99]"
      on:click={() => dispatch("album")}
    >
      <div class="flex flex-col">
        <span class="text-xs font-bold tracking-[1.4px] text-text-soft/75 uppercase">Cromos</span>
        <span class="font-serif text-[18px] font-semibold text-text">{album.length} de {TOTAL}</span>
      </div>

      <div class="ml-auto flex">
        <!-- invertido: el más nuevo va último en el DOM, así queda encima -->
        {#each album.slice(0, 4).reverse() as c (c.slug)}
          <span class="mini">
            {#if c.img}
              <img class="h-full w-full object-cover" src={c.img} alt="" />
            {:else}
              <span class="mini-ph">{c.nombre.replace(/^(La|El|A) /, "").charAt(0)}</span>
            {/if}
          </span>
        {/each}
      </div>
      <span class="text-2xl font-semibold text-text-soft/50">›</span>
    </button>
  {/if}
</div>

<style>
  /* medallones superpuestos de la tira del álbum */
  .mini {
    width: 38px;
    height: 38px;
    flex: none;
    overflow: hidden;
    border-radius: 50%;
    background: var(--surface-2);
    /* el aro toma el color del bloque: separa un medallón del siguiente sin
       que se vea un borde claro alrededor */
    box-shadow: 0 0 0 3px var(--surface);
  }
  .mini + .mini {
    margin-left: -13px;
  }
  .mini-ph {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    font-family: var(--font-serif);
    font-size: 16px;
    font-weight: 600;
    color: color-mix(in srgb, var(--text-soft) 60%, transparent);
  }
</style>
