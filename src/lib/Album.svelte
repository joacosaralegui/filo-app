<script>
  // Álbum de cromos. Muestra los 40 casilleros desde el principio: ver lo que
  // falta es el motor del álbum, así que los bloqueados se dibujan igual, en
  // plano y con el nombre a la vista.
  import { createEventDispatcher } from "svelte";
  import { progress, cromosGanados } from "./progress.js";
  import { ALBUM } from "./cromos.js";
  import { COURSES } from "../content/courses.js";
  import portada from "../assets/album-portada.webp";
  import RootHeader from "./RootHeader.svelte";

  const dispatch = createEventDispatcher();

  $: ganados = cromosGanados($progress);

  // Agrupados por curso: dentro de cada sección el orden es el de las clases,
  // así el álbum se lee como la línea de tiempo de los dos cursos. El orden es
  // FIJO (el de COURSES) y no depende de qué estés cursando: en una colección,
  // que cada cromo esté siempre en el mismo lugar es la mitad de la gracia.
  const secciones = COURSES.map((curso) => ({
    titulo: curso.title,
    cromos: ALBUM.filter((c) => c.curso === curso.id),
  })).filter((s) => s.cromos.length);
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+100px)]"
>
  <RootHeader img={portada} title="Cromos" wash={0.35} position="50% 28%" zoom={2} />

  <!-- Un curso, una tarjeta. Sirve para dos cosas: le da al álbum la misma
       caja blanca que Inicio y Cursos tienen debajo del arco, y hace que la
       división entre cursos se vea como estructura y no como un salto de aire.
       La grilla es de dos columnas: con cuatro, en mobile los cromos y sus
       nombres quedaban demasiado chicos para leerse bien. -->
  {#each secciones as seccion (seccion.titulo)}
    {@const tiene = seccion.cromos.filter((c) => ganados[c.slug]).length}
    <section class="mb-4 rounded-[20px] bg-surface p-4">
      <header class="mb-3.5 flex items-baseline gap-2 px-1">
        <h2 class="m-0 font-serif text-[17px] leading-tight font-semibold text-text">
          {seccion.titulo}
        </h2>
        <!-- El contador por curso: además de decir cuánto llevás, es lo que
             devuelve el número que el header perdió al sacarle la bajada. -->
        <span class="ml-auto flex-none font-serif text-[15px] font-semibold text-text-soft/70">
          {tiene}/{seccion.cromos.length}
        </span>
      </header>

      <div class="grid grid-cols-2 gap-x-3 gap-y-4">
        {#each seccion.cromos as c (c.slug)}
          {@const got = !!ganados[c.slug]}
          <!-- Tocar un cromo lleva a su clase. En los bloqueados es lo que
               cierra el círculo: ves el hueco y vas directo a ganarlo. -->
          <button
            class="flex cursor-pointer flex-col gap-1.5 border-0 bg-transparent p-0 [font-family:inherit] transition-transform active:scale-[0.94]"
            on:click={() => dispatch("open", { courseId: c.curso, num: c.clase })}
            aria-label="Clase {c.clase} · {c.nombre}"
          >
            <!-- El cromo se ve siempre: apagado y desaturado mientras falta, a
                 todo color cuando lo ganaste. El contraste entre los dos
                 estados es lo que hace que llenar el álbum se sienta. -->
            <div class="aspect-square w-full overflow-hidden rounded-[10px] bg-surface-2">
              <img
                class="h-full w-full object-cover {got ? 'opacity-65' : 'opacity-45 grayscale-[0.9]'}"
                src={c.img}
                alt=""
              />
            </div>
            <span
              class="line-clamp-2 text-center text-[9.5px] leading-[1.2] font-semibold {got
                ? 'text-text-soft'
                : 'text-text-soft/45'}">{c.nombre}</span
            >
          </button>
        {/each}
      </div>
    </section>
  {/each}
</div>
