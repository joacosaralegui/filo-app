<script>
  import { createEventDispatcher } from "svelte";
  import logo from "../assets/logo.webp";
  import socrates from "../assets/socrates.webp";
  import { progress, courseStateOf } from "./progress.js";
  export let courses = [];
  const dispatch = createEventDispatcher();

  // El catálogo sólo conoce el manifiesto liviano de cada curso: el contenido
  // se carga recién al entrar. Por eso acá no hay % de avance, sólo la última
  // clase abierta, que sí está guardada en el progreso.
  $: lastClassOf = (id) => courseStateOf($progress, id).lastClass;

  // Última actividad CROSS-CURSO (la guarda App.svelte al abrir una clase):
  // es la única superficie de "continuar" de la app — un tap, sin elegir
  // curso primero. Si no hay nada empezado, el catálogo es puro descubrimiento.
  $: last = $progress.lastActivity;
  $: lastCourseMeta = last ? courses.find((c) => c.id === last.courseId) : null;
  $: heroActive = !!(last && lastCourseMeta);

  const open = (c) => dispatch("open", c);
  const resume = (c, num) => dispatch("resume", { id: c.id, num });

  // Color de marca de cada curso (declarado en su manifiesto — ver
  // content/courses.js). Se previsualiza acá, ANTES de entrar, con una
  // variable CSS escopeada a cada card; adentro del curso ya se aplica
  // globalmente vía lib/courses.js → applyTheme.
  const accentOf = (c) => (c && c.theme && c.theme["--accent"]) || "var(--accent)";
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+28px)]"
>
  <!-- En la home el logo es la marca, no un control de navegación: va grande
       al lado del título. Las pantallas internas usan el TopBar compacto. -->
  <header class="mb-7 flex items-center gap-4">
    <img class="h-[108px] w-[108px] flex-none object-contain" src={logo} alt="" aria-hidden="true" />
    <div class="flex min-w-0 flex-col gap-1">
      <h1 class="m-0 font-serif text-[38px] leading-[1] font-semibold tracking-[-0.5px] text-text">Filo</h1>
      <p class="text-[13.5px] leading-snug text-text-soft">Filosofía para amateurs</p>
    </div>
  </header>

  {#if !heroActive}
    <!-- Estado de descubrimiento: la portada ocupa el lugar que, cuando hay
         progreso, le corresponde a la tarjeta de "Continuar". Nunca las dos:
         la portada no debe empujar la acción principal fuera de pantalla. -->
    <div class="cover-wrap mb-8">
      <span class="cover-disc" aria-hidden="true"></span>
      <img class="cover" src={socrates} alt="" aria-hidden="true" />
    </div>
  {/if}

  {#if heroActive}
    {@const heroAccent = accentOf(lastCourseMeta)}
    <button
      style="--course-accent: {heroAccent}"
      class="group mb-8 flex w-full flex-col gap-3 rounded-[20px] bg-[var(--course-accent)] p-5 text-left [font-family:inherit] transition-transform active:scale-[0.99]"
      on:click={() => resume(lastCourseMeta, last.num)}
    >
      <span class="text-[11px] font-bold tracking-[1.4px] text-on-accent/75 uppercase">Continuar con</span>
      <div class="flex flex-col gap-2">
        <h2 class="font-serif text-[21px] leading-[1.25] font-semibold text-on-accent">
          Clase {last.num} · {last.title}
        </h2>
        <p class="font-serif text-[14px] leading-[1.3] font-medium text-on-accent/80 italic">
          {lastCourseMeta.title}{lastCourseMeta.subtitle ? ` · ${lastCourseMeta.subtitle}` : ""}
        </p>
      </div>
      <!-- Botón invertido: sobre la tarjeta llena, el claro es el que resalta. -->
      <span
        class="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl bg-bg px-6 py-[15px] text-[15px] font-bold [color:var(--course-accent)] transition-transform group-active:scale-[0.97]"
      >
        Continuar
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
      </span>
    </button>

    <p class="mb-3.5 text-xs font-bold tracking-[1.6px] text-text-soft/70 uppercase">Todos los cursos</p>
  {/if}

  <div class="flex flex-col gap-[18px]">
    {#each courses as c (c.id)}
      {@const cLast = lastClassOf(c.id)}
      {@const isCurrent = heroActive && last.courseId === c.id}
      {@const cAccent = accentOf(c)}
      <button
        style="--course-accent: {cAccent}"
        class="flex w-full cursor-pointer items-center gap-3 rounded-2xl bg-surface p-5 text-left [font-family:inherit] active:scale-[0.995]"
        on:click={() => open(c)}
      >
        <div class="flex min-w-0 flex-1 flex-col">
          <b class="font-serif text-[22px] leading-[1.25] font-semibold text-text">{c.title}</b>
          {#if c.subtitle}<span
              class="font-serif text-[15px] leading-[1.3] font-medium italic [color:var(--course-accent)]"
              >{c.subtitle}</span
            >{/if}
          <p class="mt-2.5 text-[13px] leading-normal text-text-soft">{c.blurb}</p>
          {#if !isCurrent}
            <small class="mt-3 text-[10.5px] font-bold tracking-[0.6px] text-text-soft/70 uppercase"
              >{cLast == null ? "Empezar" : "Seguir viendo"}</small
            >
          {/if}
        </div>
        <span class="self-center text-2xl font-semibold opacity-80 [color:var(--course-accent)]">›</span>
      </button>
    {/each}
  </div>

  <footer class="mt-auto pt-9 text-center text-xs text-text-soft/70">Se irán sumando más cursos.</footer>
</div>

<style>
  /* ---------- motivos gráficos tomados de la ilustración ----------
     La lámina compone con dos recursos que replicamos acá para que interfaz e
     ilustración se lean como una sola pieza: el arco y los discos de color
     plano asomando por detrás. */

  /* portada: el arco de la lámina, con un disco ocre asomando por detrás */
  .cover-wrap {
    position: relative;
  }
  .cover-disc {
    position: absolute;
    top: 16px;
    right: -12px;
    width: 132px;
    height: 132px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent-2) 60%, transparent);
  }
  .cover {
    position: relative;
    display: block;
    width: 100%;
    height: 42dvh;
    min-height: 250px;
    object-fit: cover;
    object-position: 50% 18%;
    border: 1px solid var(--line);
    /* radio enorme arriba = domo; el navegador lo recorta a la mitad del ancho */
    border-radius: 100vw 100vw 20px 20px;
  }

</style>
