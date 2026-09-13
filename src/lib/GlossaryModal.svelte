<script>
  // Hoja de un término, dentro de una clase: un vistazo sin perder la card.
  //
  // Abre a media altura —tipo, título y el comienzo de la explicación, con la
  // card todavía a la vista— y se estira arrastrándola hacia arriba (o tocando
  // la manija). Se cierra deslizándola hacia abajo, tocando afuera, con el ✕ o
  // con Escape. Al pie, "Ver en el glosario" lleva a la página del término.
  //
  // Las dos alturas imitan las hojas de iOS: media y grande. Si la explicación
  // es corta y entra entera en la media, hay una sola.
  import { tick } from "svelte";
  import { activeTerm, closeTerm, KIND_LABEL, KIND_CLASS } from "./glossary.js";
  import { toTerm } from "./router.js";

  let sheet;
  let height = null; // alto en px; null = el natural, para medirlo al abrir
  let media = 0;
  let grande = 0;
  let dragging = false;
  let startY = 0;
  let startH = 0;

  $: if ($activeTerm) abrir($activeTerm.slug);

  async function abrir() {
    height = null;
    await tick();
    if (!sheet) return;
    grande = sheet.offsetHeight; // natural, ya topeado por max-h (90dvh)
    media = Math.min(grande, Math.round(window.innerHeight * 0.55));
    height = media;
  }

  function cerrar() {
    height = 0;
    setTimeout(closeTerm, 180);
  }

  function verEnGlosario() {
    const slug = $activeTerm.slug;
    closeTerm();
    toTerm(slug);
  }

  // --- arrastre desde la cabecera ---
  function down(e) {
    dragging = true;
    startY = e.clientY;
    startH = height;
    e.currentTarget.setPointerCapture(e.pointerId);
  }
  function move(e) {
    if (dragging) height = Math.max(0, Math.min(grande, startH + (startY - e.clientY)));
  }
  function up(e) {
    if (!dragging) return;
    dragging = false;
    // un toque (sin arrastre) alterna las alturas
    if (Math.abs(e.clientY - startY) < 6) {
      height = height === grande ? media : grande;
      return;
    }
    if (height < media * 0.6) return cerrar();
    height = Math.abs(height - media) <= Math.abs(height - grande) ? media : grande;
  }

  function onKey(e) {
    if (e.key === "Escape" && $activeTerm) cerrar();
  }
</script>

<svelte:window on:keydown={onKey} />

{#if $activeTerm}
  <div
    class="backdrop-anim fixed inset-0 z-[80] flex items-end justify-center bg-black/30"
    on:click={cerrar}
    role="presentation"
  >
    <div
      bind:this={sheet}
      class="sheet-anim relative flex max-h-[90dvh] w-full max-w-[480px] flex-col overflow-hidden rounded-t-[4px] border border-b-0 border-line bg-bg {dragging
        ? ''
        : 'transition-[height] duration-200 ease-out motion-reduce:transition-none'}"
      style:height={height == null ? null : `${height}px`}
      on:click|stopPropagation
      role="dialog"
      aria-modal="true"
      aria-label={$activeTerm.term}
      tabindex="-1"
    >
      <!-- Cabecera: de acá se arrastra la hoja. -->
      <div
        class="flex-none cursor-grab touch-none px-[22px] pt-2.5 pb-3 select-none"
        on:pointerdown={down}
        on:pointermove={move}
        on:pointerup={up}
        on:pointercancel={up}
        role="presentation"
      >
        <div class="mx-auto mt-1 mb-4 h-1 w-10 rounded-[3px] bg-line"></div>
        <div class="mb-2.5 flex items-center gap-2.5 pr-10">
          <span
            class="rounded-[4px] px-2.5 py-1 text-sm font-extrabold uppercase {KIND_CLASS[
              $activeTerm.kind
            ] || ''}">{KIND_LABEL[$activeTerm.kind] || ""}</span
          >
          {#if $activeTerm.when}<span class="text-[16px] font-bold text-text-soft [font-variant-numeric:tabular-nums]"
              >{$activeTerm.when}</span
            >{/if}
        </div>
        <h3 class="font-serif text-2xl font-extrabold tracking-[-0.3px]">{$activeTerm.term}</h3>
      </div>

      <button
        class="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 bg-surface text-text-soft [font-family:inherit]"
        on:click={cerrar}
        aria-label="Cerrar"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"
          ><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" /></svg
        >
      </button>

      <p class="min-h-0 flex-1 overflow-y-auto px-[22px] pb-4 font-serif text-base leading-[1.65] text-text-soft">
        {$activeTerm.body}
      </p>

      <div class="flex-none border-t border-line px-[22px] pt-3 pb-[calc(env(safe-area-inset-bottom)+14px)]">
        <button
          class="w-full cursor-pointer rounded-[4px] halftone-surface-subtle border border-line bg-surface p-3 text-[16px] font-bold text-text uppercase [font-family:inherit] active:scale-[0.99]"
          on:click={verEnGlosario}>Ver en el glosario</button
        >
      </div>
    </div>
  </div>
{/if}

<style>
  /* Keyframes de entrada de la hoja. */
  .backdrop-anim {
    animation: fade 0.2s ease;
  }
  .sheet-anim {
    animation: slideup 0.26s cubic-bezier(0.16, 0.84, 0.3, 1);
  }
  @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideup { from { transform: translateY(100%); } to { transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) {
    .backdrop-anim, .sheet-anim { animation-duration: 1ms; }
  }
</style>
