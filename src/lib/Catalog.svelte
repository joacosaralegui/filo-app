<script>
  import { createEventDispatcher } from "svelte";
  import socrates from "../assets/socrates.webp";
  import albumIcon from "../assets/album.webp";
  import { progress, courseStateOf, cromosGanados } from "./progress.js";
  import { conseguidos, TOTAL } from "./cromos.js";
  export let courses = [];
  const dispatch = createEventDispatcher();

  // El catálogo sólo conoce el manifiesto liviano de cada curso: el contenido
  // se carga recién al entrar. Por eso acá no hay % de avance, sólo la última
  // clase abierta, que sí está guardada en el progreso.
  $: lastClassOf = (id) => courseStateOf($progress, id).lastClass;

  // Última actividad CROSS-CURSO (la guarda App.svelte al abrir una clase):
  // es la única superficie de "continuar" de la app — un tap, sin elegir
  // curso primero. Si no hay nada empezado, el catálogo es puro descubrimiento.
  $: last = $progress.lastActivity;
  $: lastCourseMeta = last ? courses.find((c) => c.id === last.courseId) : null;
  // La home se parte en dos pantallas SÓLO cuando hay algo que continuar: la
  // primera contesta "qué hago ahora" y la segunda "qué hay". Sin progreso no
  // hay ficha ni álbum que poner arriba, así que partirla dejaría una pantalla
  // vacía; ahí es una sola, portada y cursos de corrido.
  $: heroActive = !!(last && lastCourseMeta);

  // Álbum: sin ningún cromo la tira no aparece — mostrar una colección en cero
  // a alguien que todavía no empezó desalienta y ensucia la pantalla.
  $: album = conseguidos(cromosGanados($progress));

  const open = (c) => dispatch("open", c);
  const resume = (c, num) => dispatch("resume", { id: c.id, num });

  let scrollEl;
  let cursosEl;
  function verCursos() {
    if (scrollEl && cursosEl) scrollEl.scrollTo({ top: cursosEl.offsetTop, behavior: "smooth" });
  }

</script>

<div
  class={heroActive ? "h-dvh overflow-y-auto [scroll-snap-type:y_mandatory]" : ""}
  bind:this={scrollEl}
>
  <section
    class="mx-auto flex max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] {heroActive
      ? 'min-h-dvh pb-[calc(env(safe-area-inset-bottom)+90px)] [scroll-snap-align:start] [scroll-snap-stop:always]'
      : ''}"
  >
    <!-- Header de la home: la lámina recortada en arco, con la marca encima. -->
    <header class="cover-wrap mb-8">
      <span class="cover-disc" aria-hidden="true"></span>
      <div class="cover">
        <img class="cover-img" src={socrates} alt="" />
        <div class="cover-text">
          <h1 class="m-0 font-serif text-[62px] leading-none font-semibold tracking-[0.14em] text-text">
            FILO
          </h1>
        </div>
      </div>
    </header>

    <!-- La ficha de avanzar. Con progreso reanuda; sin progreso propone por
         dónde empezar, con la misma forma: la pregunta es la misma. -->
    {#if heroActive}
      <button
        class="group flex w-full flex-col gap-3 rounded-[20px] bg-surface p-5 text-left [font-family:inherit] transition-transform active:scale-[0.99]"
        on:click={() => resume(lastCourseMeta, last.num)}
      >
        <span class="text-[11px] font-bold tracking-[1.4px] text-text-soft/70 uppercase">Continuar con</span>
        <div class="flex flex-col gap-2">
          <h2 class="font-serif text-[21px] leading-[1.25] font-semibold text-text">
            Clase {last.num} · {last.title}
          </h2>
          <p class="font-serif text-[14px] leading-[1.3] font-medium italic text-accent">
            {lastCourseMeta.title}{lastCourseMeta.subtitle ? ` · ${lastCourseMeta.subtitle}` : ""}
          </p>
        </div>
        <span
          class="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-text px-6 py-[15px] text-[15px] font-bold text-on-accent transition-transform group-active:scale-[0.97]"
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
    {/if}

    <!-- Tira del álbum. Los medallones superpuestos se leen como "colección"
         sin explicar nada. -->
    {#if album.length}
      <button
        class="relative mt-5 flex w-full cursor-pointer items-center gap-3 overflow-hidden rounded-2xl border-0 bg-surface-3 px-4 py-[22px] text-left [font-family:inherit] transition-transform active:scale-[0.99]"
        style="--album-img: url({albumIcon})"
        on:click={() => dispatch("album")}
      >
        <span class="tira-fondo" aria-hidden="true"></span>

        <div class="relative flex flex-col">
          <span class="text-xs font-bold tracking-[1.4px] text-text-soft/75 uppercase">Álbum</span>
          <span class="font-serif text-[18px] font-semibold text-text">{album.length} de {TOTAL}</span>
        </div>

        <div class="relative ml-auto flex">
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
        <span class="relative text-2xl font-semibold text-text-soft/50">›</span>
      </button>
    {/if}

    {#if heroActive}
      <button
        class="mt-auto cursor-pointer self-center border-0 bg-transparent pt-8 text-[13px] font-semibold text-text-soft/75 [font-family:inherit]"
        on:click={verCursos}>Ver los cursos ↓</button
      >
    {/if}
  </section>

  <!-- Todos los cursos, incluido el que estás haciendo. -->
  <section
    class="mx-auto max-w-[480px] px-[22px] pt-8 pb-[calc(env(safe-area-inset-bottom)+110px)] {heroActive
      ? '[scroll-snap-align:start]'
      : ''}"
    bind:this={cursosEl}
  >
    <p class="mb-3.5 text-xs font-bold tracking-[1.6px] text-text-soft/70 uppercase">Cursos</p>
    <div class="flex flex-col gap-[18px]">
      {#each courses as c (c.id)}
        {@const cLast = lastClassOf(c.id)}
        <button
          class="flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-surface p-5 text-left [font-family:inherit] active:scale-[0.995]"
          on:click={() => open(c)}
        >
          <div class="flex min-w-0 flex-1 flex-col">
            <b class="font-serif text-[22px] leading-[1.25] font-semibold text-text">{c.title}</b>
            {#if c.subtitle}<span
                class="font-serif text-[15px] leading-[1.3] font-medium italic text-accent"
                >{c.subtitle}</span
              >{/if}
            <p class="mt-2.5 text-[13px] leading-normal text-text-soft">{c.blurb}</p>
            <small class="mt-3 text-[10.5px] font-bold tracking-[0.6px] text-text-soft/70 uppercase"
              >{cLast == null ? "Empezar" : "Seguir viendo"}</small
            >
          </div>
          <span class="self-center text-2xl font-semibold opacity-80 text-accent">›</span>
        </button>
      {/each}
    </div>
  </section>
</div>

<style>
  /* ---------- motivos gráficos tomados de la ilustración ----------
     La lámina compone con dos recursos que replicamos acá para que interfaz e
     ilustración se lean como una sola pieza: el arco y los discos de color
     plano asomando por detrás. */

  /* portada: el arco de la lámina, con un disco ocre asomando por detrás */
  .cover-wrap {
    position: relative;
  }
  .cover-disc {
    position: absolute;
    top: 16px;
    right: -12px;
    width: 132px;
    height: 132px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent-2) 60%, transparent);
  }
  .cover {
    position: relative;
    overflow: hidden;
    height: 25dvh;
    min-height: 180px;
    /* radio enorme arriba = domo; el navegador lo recorta a la mitad del ancho */
    border-radius: 100vw 100vw 20px 20px;
  }
  .cover-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 34%;
  }
  /* La ilustración del álbum, enorme y translúcida: entra por el centro y se
     pierde por los cuatro lados, funcionando como textura del bloque. */
  .tira-fondo {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    transform: translate(-50%, -50%);
    background: var(--album-img) center / contain no-repeat;
    opacity: 0.24;
    pointer-events: none;
  }

  /* medallones superpuestos de la tira del álbum */
  .mini {
    width: 40px;
    height: 40px;
    flex: none;
    overflow: hidden;
    border-radius: 50%;
    background: var(--surface-2);
    /* el aro toma el color del bloque: separa un medallón del siguiente sin
       que se vea un borde claro alrededor */
    box-shadow: 0 0 0 3px var(--surface-3);
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

  .cover-text {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

</style>
