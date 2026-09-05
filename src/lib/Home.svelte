<script>
  import { createEventDispatcher } from "svelte";
  import TopBar from "./TopBar.svelte";
  import {
    progress,
    courseStateOf,
    isComplete,
    isStarted,
    completionPct,
  } from "./progress.js";
  // Curso cargado: manifiesto (title, subtitle, source, period) + classes.
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

  // Mini infografía: las primeras corrientes/eras distintas que recorre el
  // curso, en orden de aparición — una fila de chips arriba del botón.
  $: topIdeas = uniqueEras(classes).slice(0, 6);
  function uniqueEras(list) {
    const seen = new Set();
    const out = [];
    for (const c of list) {
      if (c.era && !seen.has(c.era)) {
        seen.add(c.era);
        out.push(c.era);
      }
    }
    return out;
  }

  let tlEl;
  let homeEl;

  function open(c) {
    if (c && c.content) dispatch("open", c);
  }
  function toTimeline() {
    if (!tlEl || !homeEl) return;
    homeEl.scrollTo({ top: tlEl.offsetTop, behavior: "smooth" });
  }
</script>

<div
  class="relative h-dvh overflow-y-auto scroll-smooth [scroll-snap-type:y_mandatory]"
  bind:this={homeEl}
>
  <section
    class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+44px)] pb-[calc(env(safe-area-inset-bottom)+24px)] [scroll-snap-align:start] [scroll-snap-stop:always]"
  >
    <TopBar
      back
      backLabel="Volver a cursos"
      on:back={() => dispatch("back")}
      on:home={() => dispatch("back")}
    />

    <!-- Un solo bloque alineado a la izquierda (mismo eje que las cards del
         catálogo) y centrado verticalmente en el espacio libre: el aire queda
         repartido arriba y abajo, no como dos huecos entre islas sueltas. -->
    <div class="my-auto flex flex-col">
      <h1 class="m-0 font-serif text-[33px] leading-[1.16] font-semibold tracking-[-0.3px]">
        {course.title}{#if course.subtitle}<br /><span class="font-medium italic text-accent-ink"
            >{course.subtitle}</span
          >{/if}
      </h1>
      {#if course.source}
        <p class="mt-[14px] font-serif text-[13px] italic leading-[1.55] text-text-soft">
          Construido a partir de
          <a
            class="text-accent-ink no-underline [border-bottom:1px_dotted_color-mix(in_srgb,var(--accent-ink)_55%,transparent)]"
            href={course.source.url}
            target="_blank"
            rel="noopener">{course.source.label}</a
          >.
        </p>
      {/if}

      {#if course.period || topIdeas.length}
        <div class="mt-9 flex flex-col items-start gap-3">
          {#if course.period}<p class="m-0 text-[11px] font-bold uppercase tracking-[1.6px] text-text-soft/60">
              {course.period}
            </p>{/if}
          {#if topIdeas.length}
            <!-- Mini línea de tiempo: la línea va detrás (primera en el DOM) y
                 cada nodo, posicionado, la tapa — de ahí el efecto de "cuenta"
                 ensartada. El alto fijo de fila (h-7) mantiene los nodos
                 alineados con los extremos de la línea. -->
            <div class="relative flex flex-col items-start gap-2">
              <span class="line-pop absolute top-[14px] bottom-[14px] left-1 w-px bg-line" aria-hidden="true"></span>
              {#each topIdeas as era, i (era)}
                <div class="idea-pop relative flex h-7 items-center gap-3" style="--delay:{i * 90}ms">
                  <span class="h-[9px] w-[9px] flex-none rounded-full border-2 border-accent bg-bg"></span>
                  <span
                    class="rounded-full border border-line bg-surface px-3 text-[11px] leading-7 font-bold tracking-[0.4px] text-accent-ink uppercase"
                    >{era}</span
                  >
                </div>
              {/each}
            </div>
          {/if}
        </div>
      {/if}

      {#if primary}
        <div class="mt-9 flex flex-col gap-3">
          <p class="m-0 text-[13px] font-semibold text-text-soft">
            Clase {primary.num} · {primary.title}
          </p>
          <button
            class="cta-pop flex w-full items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-[17px] text-[15px] font-bold text-on-accent [font-family:inherit] transition-transform active:scale-[0.98]"
            on:click={() => open(primary)}
          >
            {primaryLabel}
            <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"
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
        </div>
      {/if}
    </div>

    <button
      class="self-center cursor-pointer border-0 bg-transparent text-[13px] font-semibold text-text-soft/75 [font-family:inherit]"
      on:click={toTimeline}>Ver el recorrido ↓</button
    >
  </section>

  <section
    class="mx-auto max-w-[480px] px-[22px] pt-7 pb-[calc(env(safe-area-inset-bottom)+50px)] [scroll-snap-align:start]"
    bind:this={tlEl}
  >
    <p class="mb-3 text-xs font-bold uppercase tracking-[1.6px] text-text-soft/70">El recorrido</p>
    <div class="flex flex-col gap-3">
      {#each classes as c (c.num)}
        {@const done = !!c.content && isComplete($progress, c.content)}
        {@const started = !!c.content && !done && isStarted($progress, c.content)}
        {@const pct = started ? completionPct($progress, c.content) : 0}
        {@const nodeCls = !c.content
          ? "border-line text-text-soft/40 [border-style:dashed]"
          : done
            ? "border-accent bg-accent text-on-accent"
            : started
              ? "border-accent text-accent-ink"
              : "border-line text-text-soft"}
        {@const eraCls = !c.content ? "opacity-35" : "opacity-60"}
        {@const titleCls = !c.content ? "text-text-soft opacity-55" : "text-text"}
        {@const statusCls = started || done ? "text-accent-ink opacity-100" : "text-text-soft opacity-50"}
        <button
          class="relative flex w-full items-center gap-[15px] rounded-2xl bg-surface p-4 text-left text-inherit [font-family:inherit] disabled:cursor-default not-disabled:active:scale-[0.98]"
          class:cursor-pointer={!!c.content}
          on:click={() => open(c)}
          disabled={!c.content}
        >
          <span
            class="grid h-[34px] w-[34px] flex-none place-items-center rounded-full border-[1.5px] font-serif text-[13px] font-semibold {nodeCls}"
          >
            {#if !c.content}<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="currentColor" d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm3 8H9V7a3 3 0 0 1 6 0v3Z"/></svg>{:else if done}<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M5 12.5l4.5 4.5L19 7"/></svg>{:else}{c.num}{/if}
          </span>
          <span class="flex min-w-0 flex-1 flex-col gap-0.5">
            <span class="text-[10px] font-bold tracking-[1.1px] text-text-soft uppercase {eraCls}">{c.era}</span>
            <span class="font-serif text-[16.5px] font-semibold leading-[1.3] {titleCls}">{c.title}</span>
          </span>
          <span class="flex-none text-[11px] font-bold {statusCls}">
            {#if !c.content}Bloqueada
            {:else if done}Completada
            {:else if started}{pct}%
            {/if}
          </span>
          {#if started}<span
              class="absolute right-4 bottom-2 left-[65px] h-0.5 rounded-full bg-accent"
              style="width:{pct}%"
            ></span>{/if}
        </button>
      {/each}
    </div>
    <footer class="mt-[22px] text-center text-xs text-text-soft/70">
      Se irán habilitando más clases pronto.
    </footer>
  </section>
</div>

<style>
  /* Entrada escalonada de los chips de era y del botón. Quedan en CSS porque
     el delay de cada chip se calcula en JS (--delay, por índice). */
  .idea-pop {
    opacity: 0;
    animation: pop-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    animation-delay: var(--delay);
  }
  .line-pop {
    opacity: 0;
    animation: fade-in 0.5s ease forwards 0.05s;
  }
  .cta-pop {
    opacity: 0;
    animation: fade-in 0.4s ease forwards 0.4s;
  }
  @keyframes fade-in {
    to { opacity: 1; }
  }
  @keyframes pop-in {
    from { opacity: 0; transform: translateY(6px) scale(0.9); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .idea-pop,
    .cta-pop {
      animation: none;
      opacity: 1;
    }
  }
</style>
