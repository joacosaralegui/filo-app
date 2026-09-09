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
  // Curso cargado: manifiesto (title, subtitle, blurb, portada, source) + classes.
  export let course;
  const dispatch = createEventDispatcher();

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

  function open(c) {
    if (c && c.content) dispatch("open", c);
  }
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+18px)] pb-[calc(env(safe-area-inset-bottom)+110px)]"
>
  <DetailHeader title={course.title} eyebrow="Curso" on:back={() => dispatch("back")} />

  <!-- Presentación del curso, en texto: de qué va y por dónde seguir. Sin la
       portada, que como bloque se comía la pantalla y como fondo ensuciaba la
       tarjeta — el recorrido, que es a lo que se viene, entra completo. -->
  <div class="mt-5 flex flex-col gap-3 rounded-[20px] bg-surface p-5">
    <div class="flex flex-col gap-1.5">
      {#if course.subtitle}
        <p class="font-serif text-[14px] leading-[1.3] font-medium text-accent italic">
          {course.subtitle}
        </p>
      {/if}
      {#if course.blurb}
        <p class="text-[13.5px] leading-[1.5] text-text-soft">{course.blurb}</p>
      {/if}
    </div>

    {#if primary}
      <button
        class="mt-1 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border-0 bg-text px-6 py-[15px] text-[15px] font-bold text-on-accent [font-family:inherit] transition-transform active:scale-[0.98]"
        on:click={() => open(primary)}
      >
        {primaryLabel} · Clase {primary.num}
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
      </button>
    {/if}
  </div>

  <section class="pt-7">
    <p class="mb-3 text-xs font-bold uppercase tracking-[1.6px] text-text-soft/70">El recorrido</p>
    <div class="flex flex-col gap-3">
      {#each classes as c (c.num)}
        {@const done = !!c.content && isComplete($progress, c.content)}
        {@const started = !!c.content && !done && isStarted($progress, c.content)}
        {@const pct = started ? completionPct($progress, c.content) : 0}
        {@const eraCls = !c.content ? "opacity-35" : "opacity-60"}
        {@const titleCls = !c.content ? "text-text-soft opacity-55" : "text-text"}
        {@const statusCls = started || done ? "text-accent-ink opacity-100" : "text-text-soft opacity-50"}
        {@const cr = cromoDeClase(course.id, c.num)}
        {@const crGot = !!(cr && ganados[cr.slug])}
        <button
          class="relative flex w-full items-center gap-[15px] rounded-2xl bg-surface p-4 text-left text-inherit [font-family:inherit] disabled:cursor-default not-disabled:active:scale-[0.98]"
          class:cursor-pointer={!!c.content}
          on:click={() => open(c)}
          disabled={!c.content}
        >
          <!-- El cromo ocupa el lugar que tenían los números. Se ve siempre:
               apagado mientras no lo ganaste, a todo color cuando sí. -->
          {#if cr}
            <span class="h-12 w-12 flex-none overflow-hidden rounded-xl bg-surface-2">
              <img
                class="h-full w-full object-cover {crGot ? '' : 'opacity-45 grayscale-[0.9]'}"
                src={cr.img}
                alt=""
              />
            </span>
          {/if}
          <span class="flex min-w-0 flex-1 flex-col gap-0.5">
            <!-- El número se mudó acá: encima del cromo no había un color de
                 texto que sirviera (15 de 40 tienen el centro oscuro). -->
            <span class="text-[10px] font-bold tracking-[1.1px] text-text-soft uppercase {eraCls}"
              >Clase {c.num} · {c.era}</span
            >
            <span class="font-serif text-[16.5px] font-semibold leading-[1.3] {titleCls}">{c.title}</span>
          </span>
          <span class="flex-none text-[13px] font-bold {statusCls}">
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
      <footer class="mt-6 text-center font-serif text-[12px] italic leading-[1.5] text-text-soft/70">
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
