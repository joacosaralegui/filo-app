<script>
  import { createEventDispatcher } from "svelte";
  import {
    progress,
    courseStateOf,
    isComplete,
    isStarted,
    completionPct,
  } from "./progress.js";
  import { imagenDeClase } from "./cromos.js";
  import { courseIcons } from "./courseIcons.js";
  import DetailHeader from "./DetailHeader.svelte";
  import ClassHero from "./ClassHero.svelte";
  // Curso cargado: manifiesto (title, subtitle, blurb, portada, source) + classes.
  export let course;
  const dispatch = createEventDispatcher();

  $: classes = course.classes || [];

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
  // propia ilustración — para que la tarjeta anticipe A QUIÉN vas a
  // encontrar, no sólo que hay un curso genérico esperando.
  $: coverImg = (resume && imagenDeClase(course.id, primary.num)) || courseIcons[course.id];

  function open(c) {
    if (c && c.content) dispatch("open", c);
  }
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+18px)] pb-[calc(env(safe-area-inset-bottom)+110px)]"
>
  <DetailHeader title={course.title} on:back={() => dispatch("back")} />

  <!-- Presentación del curso: misma tarjeta que "Continuar con" en Inicio
       (foto 30% + pretítulo + título), pegado más cerca del centro de la
       pantalla que del header — más cómodo para el pulgar. -->
  {#if primary}
    <div class="mt-[15vh]">
      <p class="pb-2 self-start text-sm font-bold text-text-soft/70 uppercase"
        >Continuar con
        </p>
      <ClassHero
        img={coverImg}
        pretitle="{course.title} | Clase {primary.num}"
        title={primary.title}
        buttonLabel={primaryLabel}
        on:click={() => open(primary)}
      />
    </div>
  {/if}

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
        {@const img = imagenDeClase(course.id, c.num)}
        <button
          class="relative flex w-full items-center gap-[15px] rounded-[4px] halftone-surface-subtle bg-surface p-4 text-left text-inherit [font-family:inherit] disabled:cursor-default not-disabled:active:scale-[0.98]"
          class:cursor-pointer={!!c.content}
          on:click={() => open(c)}
          disabled={!c.content}
        >
          <!-- La ilustración ocupa el lugar que tenían los números. Se ve
               siempre: apagada mientras no completás la clase, a todo color
               cuando sí. -->
          {#if img}
            <span class="relative h-12 w-12 flex-none overflow-hidden rounded-[4px] bg-surface-2">
              <img
                class="h-full w-full object-cover {done ? 'opacity-75' : 'opacity-45 grayscale-[0.9]'}"
                src={img}
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
