<script>
  // Cromos. Muestra los 40 casilleros desde el principio: ver lo que falta es
  // el motor de la colección, así que los bloqueados se dibujan igual, en
  // plano y con el nombre a la vista.
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import { progress, cromosGanados } from "./progress.js";
  import { CROMOS_CON_IMG } from "./cromos.js";
  import { COURSES } from "../content/courses.js";
  import portada from "../assets/cromos-portada.webp";
  import RootHeader from "./RootHeader.svelte";

  const dispatch = createEventDispatcher();

  $: ganados = cromosGanados($progress);

  // Agrupados por curso: dentro de cada sección el orden es el de las clases,
  // así la colección se lee como la línea de tiempo de los cursos. El orden es
  // FIJO (el de COURSES) y no depende de qué estés cursando: en una colección,
  // que cada cromo esté siempre en el mismo lugar es la mitad de la gracia.
  const secciones = COURSES.map((curso) => ({
    titulo: curso.title,
    cromos: CROMOS_CON_IMG.filter((c) => c.curso === curso.id),
  })).filter((s) => s.cromos.length);

  // Colapsables: con tres cursos la pantalla scrollea bastante, y no siempre
  // se quieren ver los tres a la vez. Arrancan todos abiertos.
  //
  // OJO: el template lee `abiertas[titulo]` directo, no a través de una
  // función — Svelte marca reactivo lo que el template referencia
  // literalmente, y `abierta(titulo)` como identificador no delata que
  // depende de `abiertas` por dentro.
  let abiertas = {};
  const toggle = (titulo) => (abiertas = { ...abiertas, [titulo]: !(abiertas[titulo] ?? true) });
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+100px)]"
>
  <RootHeader img={portada} title="Cromos" wash={0.25} position="50% 28%" zoom={2} />

  <!-- Un curso, una tarjeta. Sirve para dos cosas: le da a la colección la
       misma caja blanca que Inicio y Cursos tienen debajo del arco, y hace que la
       división entre cursos se vea como estructura y no como un salto de aire.
       La grilla es de tres columnas: con cuatro, en mobile los cromos y sus
       nombres quedaban demasiado chicos para leerse bien; con dos, cada
       tarjeta se hacía larguísima. -->
  {#each secciones as seccion (seccion.titulo)}
    {@const tiene = seccion.cromos.filter((c) => ganados[c.slug]).length}
    {@const abiertaSeccion = abiertas[seccion.titulo] ?? true}
    <section class="mb-4 rounded-[20px] bg-surface p-4">
      <button
        class="flex w-full cursor-pointer items-center gap-2 border-0 bg-transparent p-0 px-1 text-left [font-family:inherit] {abiertaSeccion
          ? 'mb-3.5'
          : ''}"
        on:click={() => toggle(seccion.titulo)}
        aria-expanded={abiertaSeccion}
      >
        <h2 class="m-0 font-serif text-[17px] leading-tight font-semibold text-text">
          {seccion.titulo}
        </h2>
        <!-- El contador por curso: además de decir cuánto llevás, es lo que
             devuelve el número que el header perdió al sacarle la bajada. -->
        <span class="ml-auto flex-none font-serif text-[15px] font-semibold text-text-soft/70">
          {tiene}/{seccion.cromos.length}
        </span>
        <svg
          class="flex-none text-text-soft transition-transform duration-200 {abiertaSeccion ? '' : '-rotate-90'}"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          aria-hidden="true"
          ><path
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 9l6 6 6-6"
          /></svg
        >
      </button>

      {#if abiertaSeccion}
        <div class="grid grid-cols-3 gap-x-2.5 gap-y-3.5" transition:slide={{ duration: 320 }}>
          <!-- Clave por curso+clase, no por slug: un cromo es siempre uno por
               clase, pero el slug (y por lo tanto la ilustración) puede
               repetirse mientras a alguna clase todavía no le tocó la suya. -->
          {#each seccion.cromos as c (c.curso + "-" + c.clase)}
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
                   estados es lo que hace que llenar la colección se sienta. -->
              <div class="aspect-square w-full overflow-hidden rounded-[10px] bg-surface-2">
                <img
                  class="h-full w-full object-cover {got ? 'opacity-95' : 'opacity-45 grayscale-[0.9]'}"
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
      {/if}
    </section>
  {/each}
</div>
