<script>
  // Pestaña "Inicio". No es un menú de la barra de abajo: muestra ESTADO —
  // dónde quedaste, qué podés jugar y cómo va la colección. Los destinos que
  // ya tienen pestaña propia (Cursos, Cromos) aparecen sólo cuando tienen algo
  // que contar, y con su información a la vista.
  import { createEventDispatcher, onMount } from "svelte";
  import RootHeader from "./RootHeader.svelte";
  import ClassHero from "./ClassHero.svelte";
  import socrates from "../assets/socrates.webp";
  import { progress, cromosGanados, desafioDeHoy } from "./progress.js";
  import { conseguidos, TOTAL, imagenDeClase } from "./cromos.js";
  import { courseIcons } from "./courseIcons.js";
  import { armarDesafioDeHoy } from "./desafioHoy.js";
  export let courses = [];
  const dispatch = createEventDispatcher();

  // Última actividad CROSS-CURSO (la guarda App.svelte al abrir una clase).
  $: last = $progress.lastActivity;
  $: lastCourseMeta = last ? courses.find((c) => c.id === last.courseId) : null;
  $: hayProgreso = !!(last && lastCourseMeta);

  // La foto de la tarjeta "Continuar con": la ilustración de esa clase
  // puntual, o la lámina del curso si todavía no tiene una propia.
  $: lastImg =
    (hayProgreso && imagenDeClase(lastCourseMeta.id, last.num)) ||
    (lastCourseMeta && courseIcons[lastCourseMeta.id]);

  $: cromos = conseguidos(cromosGanados($progress));
  // El desafío de hoy: hecho o pendiente. Es lo único que cambia de estado en
  // la home día a día, así que se ve en el ícono, no en un texto.
  $: hoy = desafioDeHoy($progress);
  // Ya hecho, ¿salió bien? Más aciertos que errores → azul; si no, naranja.
  // Es la misma lectura de color que usa el desafío en su tablero de arriba.
  $: ganado = hoy && 2 * hoy.aciertos > hoy.total;

  // De qué clase sale el desafío de hoy, para la bajadita bajo "Desafío
  // diario". Si ya está hecho, sale gratis de lo guardado; si está
  // pendiente, se precalcula acá (mismo sorteo determinista que usa
  // Desafio.svelte) para no tener que abrirlo primero para saberlo.
  let desafioPreview = null;
  onMount(async () => {
    if (!hoy) desafioPreview = (await armarDesafioDeHoy(courses, $progress))?.clase ?? null;
  });
  $: desafioClase = hoy?.clase ?? desafioPreview;
  $: desafioCurso = desafioClase && courses.find((c) => c.id === desafioClase.courseId);
  </script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+110px)]"
>
  <div class="flex flex-1 flex-col justify-center">
  <RootHeader img={socrates} title="Pensadores" wash={0.6} position="50% 30%" zoom={1.9} halftone />

  <!-- La pieza fuerte: seguir donde quedaste. Sin nada empezado ocupa el mismo
       lugar y la misma forma, pero manda a elegir curso: la pregunta que la
       pantalla contesta es siempre "¿y ahora qué?". -->
  {#if hayProgreso}
    <span class="mb-2 self-start text-sm font-bold text-text-soft/70 uppercase"
      >Continuar con</span
    >
    <ClassHero
      img={lastImg}
      pretitle="{lastCourseMeta.title} | Clase {last.num}"
      title={last.title}
      buttonLabel="Continuar"
      wholeCardClickable
      on:click={() => dispatch("resume", { id: lastCourseMeta.id, num: last.num })}
    />
  {:else}
    <span class="mb-2 self-start text-sm font-bold text-text-soft/70 uppercase"
      >Para empezar</span
    >
    <button
      class="group flex w-full cursor-pointer flex-col gap-3 rounded-[4px] halftone-surface-subtle bg-surface p-5 text-left [font-family:inherit] transition-transform active:scale-[0.99]"
      on:click={() => dispatch("cursos")}
    >
      <h2 class="font-serif text-[21px] leading-[1.25] font-semibold text-text">
        Comenzá tu recorrido
      </h2>
      <p class="text-[16px] leading-[1.5] text-text-soft">
        Elegí un curso y arrancá con la primera clase.
      </p>
      <span
        class="mt-1 flex w-full items-center justify-center gap-2 rounded-[4px] halftone-surface bg-accent-3 px-6 py-[15px] text-[16px] font-bold text-on-accent uppercase transition-transform group-active:scale-[0.97]"
      >
        Ver los cursos
      </span>
    </button>
  {/if}

  <!-- Desafío diario. El ícono lleva el estado: rayo hueco mientras está
       pendiente; ya hecho, tilde si ganaste (azul) o cruz si no (naranja). Es
       a propósito que se vea "incompleto" hasta que lo contestás — es el
       único pendiente que la app te pone por día. -->
  <button
    class="mt-3.5 flex w-full cursor-pointer items-center gap-3.5 rounded-[4px] halftone-surface bg-accent px-5 py-4 text-left [font-family:inherit] transition-transform active:scale-[0.99]"
    on:click={() => dispatch("desafio")}
  >
    <span
      class="flex h-9 w-9 flex-none items-center justify-center rounded-full {hoy
        ? ganado
          ? 'bg-good text-bg'
          : 'bg-accent-3 text-bg'
        : 'bg-bg/80 text-accent'}"
    >
      {#if hoy && ganado}
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
      {:else if hoy}
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-width="2.6"
            stroke-linecap="round"
            d="M6 6l12 12M18 6L6 18"
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
    <span class="flex min-w-0 flex-1 flex-col">
      <span class="font-serif text-[21px] leading-tight font-semibold text-on-accent">Desafío diario</span>
      {#if desafioCurso}
        <span class="truncate font-serif text-[15px] leading-tight font-medium text-on-accent/75">
          {desafioCurso.title} | {desafioClase.title}
        </span>
      {/if}
    </span>
    {#if hoy}
      <span class="ml-auto flex-none font-serif text-[19px] font-semibold text-on-accent"
        >{hoy.aciertos}/{hoy.total}</span
      >
    {/if}
  </button>

  <!-- Cromos: la tira con los medallones, no un botón. Sin ningún cromo no
       aparece — una colección en cero desalienta y ensucia la pantalla. -->
  {#if cromos.length}
    <button
      class="mt-3.5 flex w-full cursor-pointer items-center gap-3 rounded-[4px] halftone-surface-subtle border-0 bg-surface px-5 py-4 text-left [font-family:inherit] transition-transform active:scale-[0.99]"
      on:click={() => dispatch("cromos")}
    >
      <div class="flex flex-col">
        <span class="text-sm font-bold text-text-soft/75 uppercase">Cromos</span>
        <span class="font-serif text-[18px] font-semibold text-text">{cromos.length} de {TOTAL}</span>
      </div>

      <div class="ml-auto flex">
        <!-- invertido: el más nuevo va último en el DOM, así queda encima -->
        {#each cromos.slice(0, 4).reverse() as c (c.slug)}
          <span class="mini">
            {#if c.img}
              <img class="h-full w-full object-cover" src={c.img} alt="" />
              <span class="img-halftone" aria-hidden="true"></span>
            {:else}
              <span class="mini-ph">{c.nombre.replace(/^(La|El|A) /, "").charAt(0)}</span>
            {/if}
          </span>
        {/each}
      </div>
    </button>
  {/if}
  </div>
</div>

<style>
  /* medallones superpuestos de la tira del álbum */
  .mini {
    position: relative;
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
