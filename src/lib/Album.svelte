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

  <!-- Apertura: el título a la izquierda y el medallón saliéndose del margen
       derecho, cortado por el borde de la columna. Es el mismo recurso que la
       lámina de Sócrates, donde las hojas y los discos entran y salen del
       cuadro — y de paso el texto nunca toca la ilustración. -->
  <header class="apertura mt-4 mb-8">
    <div class="apertura-texto">
      <h1 class="m-0 font-serif text-[32px] leading-none font-semibold tracking-[-0.3px] text-text">Álbum</h1>
      <div class="mt-4 flex items-center gap-2">
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
    <img class="sello" src={albumIcon} alt="" aria-hidden="true" />
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
    display: flex;
    align-items: center;
    min-height: 178px;
    /* se come el padding derecho de la página para que el medallón llegue al
       borde de la columna, y ahí lo corta */
    margin-right: -22px;
    overflow: hidden;
  }
  .apertura-texto {
    position: relative;
    z-index: 1;
    /* le deja el flanco derecho al medallón */
    padding-right: 150px;
  }
  .sello {
    position: absolute;
    top: 50%;
    right: -46px;
    width: 194px;
    height: 194px;
    transform: translateY(-50%);
    object-fit: contain;
    pointer-events: none;
  }
</style>
