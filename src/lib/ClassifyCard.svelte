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
</script>

<div class="slide-inner classify" class:shake>
  <span class="tag" class:ok={correct} class:no={answered && !correct}>
    {answered ? (correct ? "¡Correcto!" : "Revisá la clasificación") : "Clasificar"}
  </span>
  <h2>{card.question}</h2>

  {#if !answered}
    <div class="pool" class:armed={sel !== null} on:pointerdown={poolTap}>
      {#if poolItems.length}
        {#each poolItems as i (i)}
          <button
            class="chip"
            class:sel={sel === i}
            class:ghosted={drag && drag.i === i && moved}
            on:pointerdown={(e) => onPointerDown(e, i)}
          >{card.items[i].text}</button>
        {/each}
      {:else}
        <span class="poolhint">Todo clasificado — confirmá abajo</span>
      {/if}
    </div>
  {/if}

  <div class="zones">
    {#each card.groups as g, gi}
      <div
        class="zone"
        class:over={overGroup === gi}
        class:armed={sel !== null && !answered}
        data-group={gi}
        on:pointerdown={() => zoneTap(gi)}
      >
        <span class="zlabel">{g}</span>
        <div class="drop">
          {#each grouped[gi] as i (i)}
            <button
              class="chip placed"
              class:ok={answered && placement[i] === card.items[i].group}
              class:no={answered && placement[i] !== card.items[i].group}
              class:sel={sel === i}
              class:ghosted={drag && drag.i === i && moved}
              on:pointerdown={(e) => onPointerDown(e, i)}
              disabled={answered}
            >{card.items[i].text}</button>
          {/each}
          {#if grouped[gi].length === 0 && !answered}
            <span class="empty">Soltá acá</span>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  {#if !answered}
    <button class="confirm" on:click={confirm} disabled={!allPlaced}>
      {allPlaced ? "Confirmar" : "Llevá cada ítem a su columna"}
    </button>
  {:else}
  {/if}

  {#if drag && moved}
    <div class="ghost" style="left:{drag.x}px; top:{drag.y}px; width:{drag.w}px">{drag.label}</div>
  {/if}
</div>

<style>
  .slide-inner {
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .tag {
    align-self: flex-start;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.6px;
    font-weight: 800;
    color: var(--bg);
    background: var(--accent-ink);
    padding: 6px 13px;
    border-radius: 999px;
    margin-bottom: 16px;
    transition: background 0.25s ease;
  }
  .tag.ok { background: var(--good); }
  .tag.no { background: var(--bad); }
  h2 {
    font-size: 21px;
    line-height: 1.3;
    margin: 0 0 16px;
    font-weight: 800;
    letter-spacing: -0.3px;
  }

  /* columnas destino — NEUTRAS: se distinguen por etiqueta y posición, no por
     color (evita insinuar 'correcta' o 'preferida'). */
  .zones {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-bottom: 12px;
  }
  .zone {
    border: 1.5px dashed var(--line);
    border-radius: 14px;
    padding: 8px;
    background: color-mix(in srgb, var(--surface-2) 45%, transparent);
    transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
  }
  .zone.over,
  .zone.armed {
    border-color: var(--text-soft);
    border-style: solid;
    background: var(--surface-2);
    box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--text-soft) 25%, transparent);
  }
  .zlabel {
    display: block;
    text-align: center;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    color: var(--text-soft);
    padding: 2px 0 8px;
  }
  .drop {
    display: flex;
    flex-direction: column;
    gap: 7px;
    min-height: 54px;
  }
  .empty {
    display: grid;
    place-items: center;
    min-height: 54px;
    font-size: 12.5px;
    color: color-mix(in srgb, var(--text-soft) 60%, transparent);
    font-weight: 600;
  }

  .pool {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    padding: 10px;
    border-radius: 14px;
    background: var(--surface-2);
    min-height: 52px;
    align-content: center;
    margin-bottom: 12px;
  }
  .pool.armed {
    outline: 1.5px dashed color-mix(in srgb, var(--text-soft) 40%, transparent);
    outline-offset: -3px;
  }
  .poolhint {
    margin: auto;
    font-size: 13px;
    color: var(--text-soft);
    font-weight: 600;
  }

  .chip {
    text-align: left;
    background: var(--surface);
    border: 1.5px solid var(--line);
    border-radius: 11px;
    padding: 9px 11px;
    font: inherit;
    font-size: 13.5px;
    line-height: 1.3;
    color: var(--text);
    cursor: grab;
    touch-action: none; /* el arrastre no debe hacer scroll del feed */
    user-select: none;
    -webkit-user-select: none;
    transition: transform 0.08s, border-color 0.16s, background 0.16s, box-shadow 0.16s;
  }
  .chip:active { cursor: grabbing; }
  .pool .chip { flex: 0 1 auto; }
  .placed { width: 100%; }
  .chip.sel {
    border-color: var(--text-soft);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--text-soft) 30%, transparent);
  }
  .chip.ghosted { opacity: 0.35; }
  .chip.ok {
    border-color: var(--good);
    background: color-mix(in srgb, var(--good) 14%, transparent);
    color: var(--good-ink);
    cursor: default;
  }
  .chip.no {
    border-color: var(--bad);
    background: color-mix(in srgb, var(--bad) 12%, transparent);
    color: var(--bad-ink);
    cursor: default;
  }

  /* clon que sigue al dedo/cursor mientras se arrastra */
  .ghost {
    position: fixed;
    z-index: 60;
    transform: translate(-50%, -50%) rotate(-1.5deg);
    background: var(--surface);
    border: 1.5px solid var(--text-soft);
    border-radius: 11px;
    padding: 9px 11px;
    font-size: 13.5px;
    line-height: 1.3;
    font-weight: 600;
    color: var(--text);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
    pointer-events: none;
  }

  .confirm {
    margin-top: 14px;
    padding: 13px 18px;
    border-radius: 13px;
    background: var(--accent);
    color: var(--on-accent);
    border: none;
    font: inherit;
    font-weight: 800;
    font-size: 15px;
    cursor: pointer;
    transition: opacity 0.18s, transform 0.08s;
  }
  .confirm:disabled { opacity: 0.45; cursor: default; }
  .confirm:not(:disabled):active { transform: scale(0.985); }
  .shake { animation: shake 0.4s ease; }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(7px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(3px); }
  }
  @media (max-height: 700px) {
    h2 { font-size: 19px; margin-bottom: 12px; }
    .chip { font-size: 12.5px; padding: 8px 10px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .shake { animation: none; }
  }
</style>
