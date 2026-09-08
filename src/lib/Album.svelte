<script>
  // Álbum de cromos. Muestra los 40 casilleros desde el principio: ver lo que
  // falta es el motor del álbum, así que los bloqueados se dibujan igual, en
  // plano y con el nombre a la vista.
  import { createEventDispatcher } from "svelte";
  import TopBar from "./TopBar.svelte";
  import { progress, cromosGanados } from "./progress.js";
  import { ALBUM, TOTAL } from "./cromos.js";
  import { COURSES } from "../content/courses.js";
  import albumIcon from "../assets/album.webp";

  const dispatch = createEventDispatcher();

  $: ganados = cromosGanados($progress);
  $: cuantos = ALBUM.filter((c) => ganados[c.slug]).length;

  // Agrupados por curso: dentro de cada sección el orden es el de las clases,
  // así el álbum se lee como la línea de tiempo de los dos cursos.
  const secciones = COURSES.map((curso) => ({
    titulo: curso.title,
    cromos: ALBUM.filter((c) => c.curso === curso.id),
  })).filter((s) => s.cromos.length);
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+40px)]"
>
  <TopBar back backLabel="Volver" on:back={() => dispatch("back")} on:home={() => dispatch("back")} />

  <!-- Apertura: el mismo arco que la portada de la home, pero más bajo y con
       un panel cálido en vez de foto — rima con ella sin competirle. -->
  <div class="apertura mt-5 mb-6">
    <img class="medallon" src={albumIcon} alt="" aria-hidden="true" />
  </div>

  <header class="mb-8 flex items-start gap-4">
    <div class="flex min-w-0 flex-1 flex-col gap-2.5">
      <h1 class="m-0 font-serif text-[32px] leading-none font-semibold tracking-[-0.3px] text-text">Álbum</h1>
      <p class="text-[13px] leading-normal text-text-soft">
        Sacá 3 estrellas en una clase para quedarte con su cromo.
      </p>
    </div>
    <span class="mt-1 flex-none font-serif text-[26px] leading-none font-semibold whitespace-nowrap text-accent"
      >{cuantos} de {TOTAL}</span
    >
  </header>

  {#each secciones as seccion (seccion.titulo)}
    <p class="mb-3.5 text-xs font-bold tracking-[1.6px] text-text-soft/70 uppercase">{seccion.titulo}</p>
    <div class="mb-8 grid grid-cols-3 gap-x-3 gap-y-5">
      {#each seccion.cromos as c (c.slug)}
        {@const got = !!ganados[c.slug]}
        <!-- Tocar un cromo lleva a su clase. En los bloqueados es lo que cierra
             el círculo: ves el hueco y vas directo a ganarlo. -->
        <button
          class="flex cursor-pointer flex-col gap-2 border-0 bg-transparent p-0 [font-family:inherit] transition-transform active:scale-[0.96]"
          on:click={() => dispatch("open", { courseId: c.curso, num: c.clase })}
          aria-label="Clase {c.clase} · {c.nombre}"
        >
          <div class="aspect-square w-full overflow-hidden rounded-xl {got ? 'bg-surface' : 'bg-line/60'}">
            {#if got && c.img}
              <img class="h-full w-full object-cover" src={c.img} alt="" />
            {:else}
              <!-- Silueta: círculo para los retratos, cuadrado para las ideas.
                   Insinúa qué tipo de cromo falta sin revelar el arte. -->
              <span class="grid h-full w-full place-items-center">
                <span class="h-[46%] w-[46%] bg-line {c.tipo === 'autor' ? 'rounded-full' : 'rounded-[3px]'}"
                ></span>
              </span>
            {/if}
          </div>
          <span
            class="line-clamp-2 text-center text-[10px] leading-tight font-semibold {got
              ? 'text-text-soft'
              : 'text-text-soft/45'}">{c.nombre}</span
          >
        </button>
      {/each}
    </div>
  {/each}
</div>

<style>
  /* Mismo arco que la portada de la home, más bajo y con panel cálido: la
     ilustración del álbum es un objeto recortado, no una escena, así que en
     vez de ir a sangre se apoya sobre el panel. */
  .apertura {
    display: grid;
    place-items: center;
    height: 172px;
    border-radius: 100vw 100vw 20px 20px;
    background: color-mix(in srgb, var(--surface-2) 70%, transparent);
  }
  .medallon {
    width: 136px;
    height: 136px;
    object-fit: contain;
  }
</style>
