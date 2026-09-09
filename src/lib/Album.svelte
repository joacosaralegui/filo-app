<script>
  // Álbum de cromos. Muestra los 40 casilleros desde el principio: ver lo que
  // falta es el motor del álbum, así que los bloqueados se dibujan igual, en
  // plano y con el nombre a la vista.
  import { createEventDispatcher } from "svelte";
  import { progress, cromosGanados } from "./progress.js";
  import { ALBUM, TOTAL } from "./cromos.js";
  import { COURSES } from "../content/courses.js";
  import albumIcon from "../assets/album.webp";

  const dispatch = createEventDispatcher();

  $: ganados = cromosGanados($progress);
  $: cuantos = ALBUM.filter((c) => ganados[c.slug]).length;

  // Anillo de progreso: se dibuja con un solo trazo al que le recortamos el
  // dash según la proporción conseguida.
  const R = 14;
  const CIRC = 2 * Math.PI * R;
  $: dashOffset = CIRC * (1 - cuantos / TOTAL);

  // Agrupados por curso: dentro de cada sección el orden es el de las clases,
  // así el álbum se lee como la línea de tiempo de los dos cursos.
  const secciones = COURSES.map((curso) => ({
    titulo: curso.title,
    cromos: ALBUM.filter((c) => c.curso === curso.id),
  })).filter((s) => s.cromos.length);
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+100px)]"
>

  <!-- Apertura: el arco de la portada, con el título y el conteo apoyados
       sobre la propia ilustración. El degradado la funde con el panel hacia
       abajo, así el texto se lee sin necesidad de oscurecer nada. -->
  <header class="apertura mt-5 mb-8">
    <img class="medallon" src={albumIcon} alt="" aria-hidden="true" />
    <div class="apertura-texto">
      <h1 class="m-0 font-serif text-[30px] leading-none font-semibold tracking-[-0.3px] text-text">Álbum</h1>
      <div class="flex flex-none items-center gap-2">
        <svg width="34" height="34" viewBox="0 0 34 34" aria-hidden="true">
          <circle cx="17" cy="17" r={R} fill="none" stroke="var(--line)" stroke-width="3.5" />
          <circle
            cx="17"
            cy="17"
            r={R}
            fill="none"
            stroke="var(--accent)"
            stroke-width="3.5"
            stroke-linecap="round"
            stroke-dasharray={CIRC}
            stroke-dashoffset={dashOffset}
            transform="rotate(-90 17 17)"
          />
        </svg>
        <span class="font-serif text-[19px] leading-none font-semibold whitespace-nowrap text-accent"
          >{cuantos} de {TOTAL}</span
        >
      </div>
    </div>
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
          <!-- El cromo se ve siempre: apagado y desaturado mientras falta, a
               todo color cuando lo ganaste. El contraste entre los dos estados
               es lo que hace que llenar el álbum se sienta. -->
          <div class="aspect-square w-full overflow-hidden rounded-xl bg-surface-2">
            <img
              class="h-full w-full object-cover {got ? '' : 'opacity-45 grayscale-[0.9]'}"
              src={c.img}
              alt=""
            />
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
    position: relative;
    display: grid;
    place-items: center;
    height: 224px;
    /* el medallón es más grande que el panel: lo recorta el arco, y por eso
       lo llena en vez de flotar adentro */
    overflow: hidden;
    border-radius: 100vw 100vw 20px 20px;
    background: color-mix(in srgb, var(--surface-2) 70%, transparent);
  }
  .medallon {
    width: 188px;
    height: 188px;
    object-fit: contain;
    /* Sube lo suficiente para despejar la franja del título: sin velo encima,
       el texto tiene que caer sobre el panel y no sobre la ilustración. */
    margin-bottom: 66px;
  }
  .apertura-texto {
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 12px;
    padding: 0 20px 16px;
  }
</style>
