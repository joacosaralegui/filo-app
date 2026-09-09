<script>
  // Desafío diario: siete preguntas sueltas, sin contenido de por medio. Es la
  // variante de juego de la app — no enseña, te toma.
  //
  // Es EL MISMO para todo el día: las preguntas se sortean con una semilla
  // hecha de la fecha, así que salen las mismas cada vez que entrás y no hay
  // forma de rerollear hasta mañana. Tampoco se puede repetir: una vez que lo
  // contestaste, el número del día es ese. Sale de los cursos que ya empezaste
  // (si no empezaste ninguno, de todos) y NO toca el progreso de las clases ni
  // reparte cromos: acertar acá no completa nada.
  import { createEventDispatcher, onMount, tick } from "svelte";
  import QuizCard from "./QuizCard.svelte";
  import Burst from "./Burst.svelte";
  import { loadContent } from "./courses.js";
  import { progress, cursosEmpezados, saveDesafio, desafioDeHoy, hoyISO } from "./progress.js";

  export let courses = [];
  const dispatch = createEventDispatcher();

  const RONDA = 7;

  let cargando = true;
  let ronda = []; // [{ card, courseId, num, title }]
  let i = 0;
  let resultados = []; // true/false por pregunta contestada
  let respondida = false;
  let terminada = false;
  let flash = null; // "ok" | "no": el sello que aparece al contestar
  let burstId = 0; // acierto suelto
  let finaleId = 0; // los siete de siete
  let timer;

  $: aciertos = resultados.filter(Boolean).length;

  // Generador con semilla (mulberry32) y semilla derivada de un texto (FNV-1a).
  // Con la fecha como texto, el sorteo del día es siempre el mismo — en este
  // teléfono y en cualquier otro, sin pedirle nada a ningún servidor.
  function semilla(txt) {
    let h = 2166136261;
    for (let k = 0; k < txt.length; k++) {
      h ^= txt.charCodeAt(k);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function rng(seed) {
    let a = seed;
    return () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(arr, azar) {
    const a = [...arr];
    for (let j = a.length - 1; j > 0; j--) {
      const k = Math.floor(azar() * (j + 1));
      [a[j], a[k]] = [a[k], a[j]];
    }
    return a;
  }

  async function armar() {
    cargando = true;
    const empezados = cursosEmpezados($progress);
    const metas = courses.filter((c) => !empezados.length || empezados.includes(c.id));
    const pool = [];
    for (const meta of metas) {
      const { classes } = await loadContent(meta);
      for (const cls of classes) {
        if (!cls.content) continue;
        for (const card of cls.content.feed) {
          if (card.type === "quiz")
            pool.push({ card, courseId: meta.id, num: cls.num, title: cls.title });
        }
      }
    }
    // El pool se recorre siempre en el mismo orden (cursos, clases, cards), así
    // que con la misma semilla salen las mismas siete.
    ronda = shuffle(pool, rng(semilla(hoyISO()))).slice(0, RONDA);
    cargando = false;
  }

  // Si el de hoy ya está hecho se entra directo al resultado guardado: el
  // desafío es uno por día, y volver a abrirlo tiene que confirmar eso.
  const hecho = desafioDeHoy($progress);

  onMount(() => {
    if (hecho) {
      resultados = new Array(hecho.total).fill(false).fill(true, 0, hecho.aciertos);
      ronda = new Array(hecho.total);
      cargando = false;
      terminada = true;
    } else {
      armar();
    }
    return () => clearTimeout(timer);
  });

  async function responder(e) {
    if (respondida) return;
    respondida = true;
    const bien = e.detail.correct;
    resultados = [...resultados, bien];

    // El sello de acierto/error: grande, corto y en el centro. Es lo que hace
    // que contestar se sienta, sin agregar un paso más al ritmo de la ronda.
    flash = bien ? "ok" : "no";
    if (bien) burstId += 1;
    setTimeout(() => (flash = null), 700);

    timer = setTimeout(async () => {
      if (i + 1 >= ronda.length) {
        terminada = true;
        saveDesafio(aciertos, ronda.length);
        // La celebración del pleno espera a que la pantalla de cierre esté
        // pintada: si no, las partículas salen de una pantalla que ya se fue.
        if (aciertos === ronda.length) {
          await tick();
          finaleId += 1;
        }
      } else {
        i += 1;
        respondida = false;
      }
    }, 2200);
  }

  // Ir a la clase corta la ronda: es una salida, no una pausa.
  function irALaClase(p) {
    clearTimeout(timer);
    dispatch("clase", { courseId: p.courseId, num: p.num });
  }

  $: actual = ronda[i] || null;
  $: pleno = terminada && ronda.length > 0 && aciertos === ronda.length;

  // El cierre habla distinto según cómo te fue: el mismo número con otro tono.
  $: cierre = pleno
    ? "Pleno"
    : aciertos / (ronda.length || 1) >= 0.7
      ? "Bien ahí"
      : aciertos / (ronda.length || 1) >= 0.4
        ? "Zafaste"
        : "A repasar";
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+18px)] pb-[calc(env(safe-area-inset-bottom)+28px)]"
>
  <!-- Barra de la ronda: salir y el tablero. Reemplaza al header porque acá lo
       que importa es cómo venís, no el título de la pantalla. -->
  <header class="flex items-center gap-3">
    <button
      class="flex h-10 w-10 flex-none cursor-pointer items-center justify-center rounded-full border-0 bg-surface text-text [font-family:inherit] transition-transform active:scale-[0.94]"
      on:click={() => dispatch("salir")}
      aria-label="Salir del desafío"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-width="2.6"
          stroke-linecap="round"
          d="M6 6l12 12M18 6L6 18"
        /></svg
      >
    </button>

    <!-- Un casillero por pregunta, no una barra continua: además de cuánto
         falta, dice cómo te fue en cada una. El tablero ES el marcador. -->
    <div class="flex flex-1 gap-1.5" role="img" aria-label="{aciertos} de {ronda.length || RONDA}">
      {#each Array(ronda.length || RONDA) as _, k}
        <span
          class="casillero h-[7px] flex-1 rounded-full {resultados[k] === true
            ? 'bg-good'
            : resultados[k] === false
              ? 'bg-bad'
              : k === i && !terminada
                ? 'bg-accent/45'
                : 'bg-surface-3'}"
        ></span>
      {/each}
    </div>
  </header>

  {#if cargando}
    <p class="grid flex-1 place-items-center text-sm font-semibold text-text-soft">Armando la ronda…</p>
  {:else if !ronda.length}
    <div class="flex flex-1 flex-col items-center justify-center gap-4 text-center">
      <p class="font-serif text-[20px] font-semibold text-text">Todavía no hay preguntas</p>
      <p class="text-[13.5px] leading-[1.5] text-text-soft">
        Empezá un curso y volvé: el desafío se arma con lo que vayas viendo.
      </p>
    </div>
  {:else if terminada}
    <!-- Cierre de la ronda. Sin cromos ni desbloqueos: sólo el número, y una
         sola salida — el de hoy ya está jugado. -->
    <div class="flex flex-1 flex-col items-center justify-center gap-2 text-center">
      <span class="text-[11px] font-bold tracking-[1.6px] text-text-soft/70 uppercase">{cierre}</span>
      <!-- Los dos números pesan igual: el marcador se lee como una fracción,
           no como un puntaje con su letra chica al lado. -->
      <p
        class="marcador m-0 font-serif text-[46px] leading-none font-semibold {pleno
          ? 'text-accent-3'
          : 'text-accent'}"
      >
        {aciertos}/{ronda.length}
      </p>
      <button
        class="mt-8 w-full cursor-pointer rounded-2xl border-0 bg-text px-6 py-[15px] text-[15px] font-bold text-on-accent [font-family:inherit] transition-transform active:scale-[0.98]"
        on:click={() => dispatch("salir")}>Volver al inicio</button
      >
    </div>
  {:else if actual}
    <div class="flex flex-1 flex-col justify-center py-6">
      <!-- La key remonta la card en cada pregunta: así rebaraja las opciones y
           arranca sin respuesta previa. -->
      {#key i}
        <QuizCard card={actual.card} on:answer={responder} />
      {/key}
    </div>

    <!-- De dónde salió la pregunta, y la puerta a esa clase. Va siempre a la
         vista: la gracia del desafío es descubrir qué te falta repasar, y el
         atajo tiene que estar ahí cuando te das cuenta. -->
    <button
      class="mx-auto flex max-w-full cursor-pointer items-center gap-1.5 rounded-full border-0 bg-surface/70 px-3.5 py-2 text-left [font-family:inherit] transition-transform active:scale-[0.97]"
      on:click={() => irALaClase(actual)}
    >
      <span class="truncate text-[11.5px] font-semibold text-text-soft/80"
        >Clase {actual.num} · {actual.title}</span
      >
      <svg
        class="flex-none text-text-soft/60"
        viewBox="0 0 24 24"
        width="12"
        height="12"
        aria-hidden="true"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-width="2.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 5l7 7-7 7"
        /></svg
      >
    </button>
  {/if}
</div>

<!-- El sello del acierto/error, encima de todo y sin capturar toques: la card
     de abajo sigue mostrando cuál era la correcta. -->
{#if flash}
  {#key flash + resultados.length}
    <div
      class="sello pointer-events-none fixed top-[38%] left-1/2 z-[58] -translate-x-1/2"
      aria-hidden="true"
    >
      <span
        class="flex h-[92px] w-[92px] items-center justify-center rounded-full {flash === 'ok'
          ? 'bg-good text-bg'
          : 'bg-bad text-bg'}"
      >
        {#if flash === "ok"}
          <svg viewBox="0 0 24 24" width="46" height="46"
            ><path
              fill="none"
              stroke="currentColor"
              stroke-width="2.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 12.6 10 17.5 19 7"
            /></svg
          >
        {:else}
          <svg viewBox="0 0 24 24" width="42" height="42"
            ><path
              fill="none"
              stroke="currentColor"
              stroke-width="2.8"
              stroke-linecap="round"
              d="M6 6l12 12M18 6L6 18"
            /></svg
          >
        {/if}
      </span>
    </div>
  {/key}
{/if}

<Burst trigger={burstId} count={18} />
<Burst trigger={finaleId} count={80} power={1.7} />

<style>
  /* El casillero cambia de color con una transición corta: el tablero se
     "pinta" al contestar en vez de saltar. */
  .casillero {
    transition: background-color 0.3s ease;
  }

  /* El sello entra de golpe, respira y se va. */
  .sello {
    animation: sello 700ms cubic-bezier(0.2, 0.8, 0.3, 1) forwards;
  }
  @keyframes sello {
    0% { transform: scale(0.4); opacity: 0; }
    18% { transform: scale(1.12); opacity: 1; }
    32% { transform: scale(1); opacity: 1; }
    72% { opacity: 1; }
    100% { transform: scale(1.04); opacity: 0; }
  }

  /* El número del cierre aterriza en vez de aparecer. */
  .marcador {
    animation: marcador 520ms cubic-bezier(0.2, 0.8, 0.3, 1) both;
  }
  @keyframes marcador {
    0% { transform: scale(0.6); opacity: 0; }
    60% { transform: scale(1.06); opacity: 1; }
    100% { transform: scale(1); opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .sello,
    .marcador {
      animation-duration: 1ms;
    }
    .casillero {
      transition: none;
    }
  }
</style>
