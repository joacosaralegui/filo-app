<script>
  import { createEventDispatcher } from "svelte";
  export let card; // { question, groups:[a,b], items:[{text, group:0|1}], explain }
  export let saved = null; // { correct, assign } (al reanudar) o null
  const dispatch = createEventDispatcher();

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  // Orden de aparición barajado (índices ORIGINALES) para evitar sesgos.
  const order = shuffle([...card.items.keys()]);

  // placement: itemIndex -> groupIndex (0|1). Ausente = todavía en el pool.
  let placement = saved ? { ...saved.assign } : {};
  let answered = !!saved;
  let shake = false;

  // arrastre (pointer events: sirve para touch y mouse)
  let drag = null; // { i, x, y, w, label }
  let moved = false;
  let overGroup = null; // 0|1|null — columna resaltada mientras se arrastra
  let sx = 0, sy = 0;
  // tap-para-ubicar: tocar un chip lo selecciona, tocar una columna lo suelta
  let sel = null;

  $: poolItems = order.filter((i) => placement[i] === undefined);
  $: allPlaced = poolItems.length === 0;
  $: correct = answered && card.items.every((it, i) => placement[i] === it.group);
  // Reactivo: se recalcula al cambiar `placement` (una función suelta no
  // dispararía el re-render del {#each} en el template).
  $: grouped = card.groups.map((_, g) => order.filter((i) => placement[i] === g));

  function hitZone(x, y) {
    const el = document.elementFromPoint(x, y);
    const zone = el && el.closest(".zone");
    return zone ? Number(zone.dataset.group) : null;
  }

  function onPointerDown(e, i) {
    if (answered) return;
    e.stopPropagation(); // no disparar el handler de la columna/pool
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    sx = e.clientX;
    sy = e.clientY;
    moved = false;
    drag = { i, x: e.clientX, y: e.clientY, w: e.currentTarget.offsetWidth, label: card.items[i].text };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }
  function onMove(e) {
    if (!drag) return;
    if (Math.abs(e.clientX - sx) > 6 || Math.abs(e.clientY - sy) > 6) moved = true;
    drag = { ...drag, x: e.clientX, y: e.clientY };
    overGroup = moved ? hitZone(e.clientX, e.clientY) : null;
  }
  function onUp(e) {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    const i = drag ? drag.i : null;
    if (i !== null && moved) {
      const g = hitZone(e.clientX, e.clientY);
      const p = { ...placement };
      if (g !== null) p[i] = g;
      else delete p[i]; // soltado fuera de las columnas → vuelve al pool
      placement = p;
      sel = null;
    } else if (i !== null) {
      sel = sel === i ? null : i; // tap: alternar selección
    }
    drag = null;
    overGroup = null;
  }

  // Tocar una columna: si hay un chip seleccionado, lo ubica ahí.
  function zoneTap(g) {
    if (answered || sel === null) return;
    placement = { ...placement, [sel]: g };
    sel = null;
  }
  // Tocar el fondo del pool: devuelve el chip seleccionado al pool.
  function poolTap() {
    if (answered || sel === null) return;
    const p = { ...placement };
    delete p[sel];
    placement = p;
    sel = null;
  }

  function confirm() {
    if (answered || !allPlaced) return;
    answered = true;
    const ok = card.items.every((it, i) => placement[i] === it.group);
    if (!ok) {
      shake = true;
      setTimeout(() => (shake = false), 420);
    }
    dispatch("answer", { correct: ok, save: { correct: ok, assign: { ...placement } } });
  }

  const CHIP_CLS =
    "cursor-grab touch-none select-none rounded-[11px] border-[1.5px] border-line bg-surface px-[11px] py-[9px] text-left text-[13.5px] leading-[1.3] text-text [transition:transform_0.08s,border-color_0.16s,background-color_0.16s,box-shadow_0.16s] active:cursor-grabbing [@media(max-height:700px)]:px-2.5 [@media(max-height:700px)]:py-2 [@media(max-height:700px)]:text-[12.5px]";

  // Estado visual del chip: selección (tap-to-place), "fantasma" mientras se
  // arrastra, y corrección (sólo en los ya ubicados, tras confirmar).
  function chipStateCls(i, isPlaced) {
    let cls = "";
    if (sel === i) cls += " border-text-soft [box-shadow:0_0_0_2px_color-mix(in_srgb,var(--text-soft)_30%,transparent)]";
    if (drag && drag.i === i && moved) cls += " opacity-35";
    if (isPlaced && answered) {
      cls +=
        placement[i] === card.items[i].group
          ? " cursor-default border-good bg-good/14 text-good-ink"
          : " cursor-default border-bad bg-bad/12 text-bad-ink";
    }
    return cls;
  }
</script>

<div class="flex w-full max-w-[480px] flex-col justify-center {shake ? 'shake-anim' : ''}">
  <span
    class="mb-4 self-start rounded-full px-[13px] py-1.5 text-xs font-extrabold tracking-[1.6px] text-bg uppercase transition-colors duration-[250ms] {correct
      ? 'bg-good'
      : answered
        ? 'bg-bad'
        : 'bg-accent-ink'}"
  >
    {answered ? (correct ? "¡Correcto!" : "Revisá la clasificación") : "Clasificar"}
  </span>
  <h2
    class="m-0 mb-4 font-serif text-[21px] font-extrabold leading-[1.3] tracking-[-0.3px] [@media(max-height:700px)]:mb-3 [@media(max-height:700px)]:text-[19px]"
  >
    {card.question}
  </h2>

  {#if !answered}
    <div
      class="mb-3 flex min-h-[52px] flex-wrap content-center gap-[7px] rounded-[14px] bg-surface-2 p-2.5 {sel !== null
        ? '[outline:1.5px_dashed_color-mix(in_srgb,var(--text-soft)_40%,transparent)] [outline-offset:-3px]'
        : ''}"
      on:pointerdown={poolTap}
    >
      {#if poolItems.length}
        {#each poolItems as i (i)}
          <button
            class="{CHIP_CLS} flex-initial {chipStateCls(i, false)}"
            on:pointerdown={(e) => onPointerDown(e, i)}>{card.items[i].text}</button
          >
        {/each}
      {:else}
        <span class="m-auto text-[13px] font-semibold text-text-soft">Todo clasificado — confirmá abajo</span>
      {/if}
    </div>
  {/if}

  <div class="mb-3 grid grid-cols-2 gap-2.5">
    {#each card.groups as g, gi}
      <div
        class="zone rounded-[14px] border-[1.5px] border-dashed border-line p-2 [background:color-mix(in_srgb,var(--surface-2)_45%,transparent)] [transition:border-color_0.15s,background-color_0.15s,box-shadow_0.15s] {overGroup ===
          gi || (sel !== null && !answered)
          ? 'border-solid border-text-soft bg-surface-2 [box-shadow:inset_0_0_0_1px_color-mix(in_srgb,var(--text-soft)_25%,transparent)]'
          : ''}"
        data-group={gi}
        on:pointerdown={() => zoneTap(gi)}
      >
        <span class="block pt-0.5 pb-2 text-center text-xs font-extrabold tracking-[0.4px] text-text-soft uppercase"
          >{g}</span
        >
        <div class="flex min-h-[54px] flex-col gap-[7px]">
          {#each grouped[gi] as i (i)}
            <button
              class="{CHIP_CLS} w-full {chipStateCls(i, true)}"
              on:pointerdown={(e) => onPointerDown(e, i)}
              disabled={answered}>{card.items[i].text}</button
            >
          {/each}
          {#if grouped[gi].length === 0 && !answered}
            <span class="grid min-h-[54px] place-items-center text-[12.5px] font-semibold [color:color-mix(in_srgb,var(--text-soft)_60%,transparent)]"
              >Soltá acá</span
            >
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if !answered}
    <button
      class="mt-3.5 cursor-pointer rounded-[13px] bg-accent px-[18px] py-[13px] text-[15px] font-extrabold text-on-accent [font-family:inherit] [transition:opacity_0.18s,transform_0.08s] not-disabled:active:scale-[0.985] disabled:cursor-default disabled:opacity-45"
      on:click={confirm}
      disabled={!allPlaced}
    >
      {allPlaced ? "Confirmar" : "Llevá cada ítem a su columna"}
    </button>
  {:else}
  {/if}

  {#if drag && moved}
    <div
      class="fixed z-[60] [transform:translate(-50%,-50%)_rotate(-1.5deg)] rounded-[11px] border-[1.5px] border-text-soft bg-surface px-[11px] py-[9px] text-[13.5px] leading-[1.3] font-semibold text-text [box-shadow:0_10px_24px_rgba(0,0,0,0.18)] pointer-events-none"
      style="left:{drag.x}px; top:{drag.y}px; width:{drag.w}px"
    >
      {drag.label}
    </div>
  {/if}
</div>

<style>
  .shake-anim {
    animation: shake 0.4s ease;
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(7px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(3px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .shake-anim { animation: none; }
  }
</style>
