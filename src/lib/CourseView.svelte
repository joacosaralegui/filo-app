<script>
  import { createEventDispatcher } from "svelte";
  import {
    progress,
    courseStateOf,
    cromosGanados,
    isComplete,
    isStarted,
    completionPct,
  } from "./progress.js";
  import { cromoDeClase } from "./cromos.js";
  import DetailHeader from "./DetailHeader.svelte";
  import iconAntigua from "../assets/cursos/antigua.webp";
  import iconModerna from "../assets/cursos/moderna.webp";
  import iconContemporanea from "../assets/cursos/contemporanea.webp";
  // Curso cargado: manifiesto (title, subtitle, blurb, portada, source) + classes.
  export let course;
  const dispatch = createEventDispatcher();

  // Misma lámina que el catálogo, para que abrir el curso se sienta
  // continuación de la tarjeta en la que se tocó, no una pantalla distinta.
  const courseIcons = { antigua: iconAntigua, moderna: iconModerna, contemporanea: iconContemporanea };

  $: classes = course.classes || [];
  $: ganados = cromosGanados($progress);

  // Botón principal: si hay una clase en curso, reanudarla ("Continuar");
  // si la última quedó completa, ofrecer la siguiente; si no, la primera.
  $: available = classes.filter((c) => c.content);
  $: firstAvailable = available[0] || null;
  $: saved = courseStateOf($progress, course.id);
  $: lastClass =
    saved.lastClass != null
      ? classes.find((c) => c.num === saved.lastClass && c.content)
      : null;
  $: resume = lastClass && !isComplete($progress, lastClass.content) ? lastClass : null;
  $: nextAfterLast = lastClass
    ? available.find((c) => c.num > lastClass.num) || null
    : null;
  $: primary = resume || (lastClass && nextAfterLast) || firstAvailable;
  $: primaryLabel = resume ? "Continuar" : "Empezar";

  // Sin nada empezado, la lámina del curso; retomando una clase puntual, su
  // cromo — para que la tarjeta anticipe A QUIÉN vas a encontrar, no sólo
  // que hay un curso genérico esperando.
  $: primaryCromo = resume ? cromoDeClase(course.id, primary.num) : null;
  $: coverImg = (primaryCromo && primaryCromo.img) || courseIcons[course.id];

  function open(c) {
    if (c && c.content) dispatch("open", c);
  }
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+18px)] pb-[calc(env(safe-area-inset-bottom)+110px)]"
>
  <DetailHeader title={course.title} on:back={() => dispatch("back")} />

  <!-- Presentación del curso: la misma lámina del catálogo arriba, ancho
       completo, y debajo la bajada + el botón — que así cae más cerca del
       centro de la pantalla, más cómodo para el pulgar que pegado al header. -->
  <div class="mt-5 flex flex-col rounded-[4px] halftone-surface-subtle bg-surface">
    <div class="p-5 pb-0">
      <img class="aspect-square w-full rounded-[4px] object-cover" src={coverImg} alt="" />
    </div>
    <div class="flex flex-col gap-3 p-5">
      {#if course.subtitle}
        <p class="font-serif text-[16px] leading-[1.3] font-normal text-text">
          {course.subtitle}
        </p>
      {/if}

      {#if primary}
        <button
          class="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] border-0 halftone-surface bg-accent-3 px-6 py-[15px] text-[19px] font-bold text-on-accent uppercase [font-family:inherit] transition-transform active:scale-[0.98]"
          on:click={() => open(primary)}
        >
          {primaryLabel === "Empezar" && primary === firstAvailable
            ? "Empezar"
            : `${primaryLabel}: Clase ${primary.num}`}
        </button>
      {/if}
    </div>
  </div>

  <section class="pt-7">
    <p class="mb-3 text-base font-bold uppercase text-text-soft/70">El recorrido</p>
    <div class="flex flex-col gap-3">
      {#each classes as c (c.num)}
        {@const done = !!c.content && isComplete($progress, c.content)}
        {@const started = !!c.content && !done && isStarted($progress, c.content)}
        {@const pct = started ? completionPct($progress, c.content) : 0}
        {@const titleCls = !c.content ? "text-text-soft opacity-55" : "text-text"}
        {@const statusCls = started
          ? "text-accent-3 opacity-100"
          : done
            ? "text-accent-ink opacity-100"
            : "text-text-soft opacity-50"}
        {@const cr = cromoDeClase(course.id, c.num)}
        {@const crGot = !!(cr && ganados[cr.slug])}
        <button
          class="relative flex w-full items-center gap-[15px] rounded-[4px] halftone-surface-subtle bg-surface p-4 text-left text-inherit [font-family:inherit] disabled:cursor-default not-disabled:active:scale-[0.98]"
          class:cursor-pointer={!!c.content}
          on:click={() => open(c)}
          disabled={!c.content}
        >
          <!-- El cromo ocupa el lugar que tenían los números. Se ve siempre:
               apagado mientras no lo ganaste, a todo color cuando sí. -->
          {#if cr}
            <span class="relative h-12 w-12 flex-none overflow-hidden rounded-[4px] bg-surface-2">
              <img
                class="h-full w-full object-cover {crGot ? 'opacity-75' : 'opacity-45 grayscale-[0.9]'}"
                src={cr.img}
                alt=""
              />
              <span class="img-halftone" aria-hidden="true"></span>
            </span>
          {/if}
          <span class="flex min-w-0 flex-1 flex-col gap-0.5">
            <!-- El número se mudó acá: encima del cromo no había un color de
                 texto que sirviera (15 de 40 tienen el centro oscuro). Sólo
                 número y título — la era ya se leía redundante con el título. -->
            <span class="font-serif text-[16.5px] font-semibold leading-[1.3] {titleCls}"
              >{c.num}. {c.title}</span
            >
          </span>
          <span class="flex-none text-[16px] font-bold {statusCls}">
            {#if !c.content}Bloqueada
            {:else if done}Completada
            {:else if started}{pct}%
            {/if}
          </span>
        </button>
      {/each}
    </div>
    <!-- La atribución baja acá: sacarla del hero lo despeja, pero el crédito
         de la fuente no se pierde. -->
    {#if course.source}
      <footer class="mt-6 text-center font-serif text-[16px] leading-[1.5] text-text-soft/70">
        Construido a partir de
        {#if course.source.url}
          <a class="underline decoration-dotted" href={course.source.url} target="_blank" rel="noopener"
            >{course.source.label}</a
          >
        {:else}{course.source.label}{/if}.
      </footer>
    {/if}
  </section>
</div>
