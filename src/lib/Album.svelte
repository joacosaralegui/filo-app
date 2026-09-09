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

  <!-- Apertura tipo portada: la ilustración sola, sin caja que la contenga, y
       el título centrado debajo. -->
  <header class="mt-3 mb-9 flex flex-col items-center text-center">
    <img class="h-[184px] w-[184px] object-contain" src={albumIcon} alt="" aria-hidden="true" />
    <h1 class="mt-5 m-0 font-serif text-[32px] leading-none font-semibold tracking-[-0.3px] text-text">
      Álbum
    </h1>
    <span class="mt-3 font-serif text-[28px] leading-none font-semibold whitespace-nowrap text-accent-3"
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

