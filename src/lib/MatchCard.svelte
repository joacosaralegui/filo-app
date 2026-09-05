<script>
  import { createEventDispatcher, afterUpdate, onMount, onDestroy } from "svelte";
  export let card;
  export let saved = null; // { correct, links } (al reanudar) o null
  const dispatch = createEventDispatcher();

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const rightOrder = shuffle([...card.pairs.keys()]);

  // links: leftIndex -> rightIndex ORIGINAL. Correcto: links[i] === i.
  let links = saved ? { ...saved.links } : {};
  let answered = !!saved;
  let selected = null; // { side:'L'|'R', i } — fallback tap
  let shake = false;

  $: correct = answered && card.pairs.every((_, i) => links[i] === i);
  $: allLinked = Object.keys(links).length === card.pairs.length;
  $: rightToLeft = Object.entries(links).reduce((m, [l, r]) => ((m[r] = +l), m), {});

  function connect(left, right) {
    const nl = { ...links };
    for (const l in nl) if (nl[l] === right) delete nl[l]; // cada derecho una vez
    nl[left] = right;
    links = nl;
  }

  // Tap (fallback): seleccionar una y luego la del otro lado.
  function tap(side, i) {
    if (answered) return;
    if (!selected) {
      selected = { side, i };
      return;
    }
    if (selected.side === side) {
      selected = selected.i === i ? null : { side, i };
      return;
    }
    const left = side === "L" ? i : selected.i;
    const right = side === "R" ? i : selected.i;
    connect(left, right);
    selected = null;
  }

  function confirm() {
    if (answered || !allLinked) return;
    answered = true;
    const ok = card.pairs.every((_, i) => links[i] === i);
    if (!ok) {
      shake = true;
      setTimeout(() => (shake = false), 420);
    }
    dispatch("answer", { correct: ok, save: { correct: ok, links: { ...links } } });
  }

  // ---- arrastre para conectar (pointer events: touch y mouse) ----
  let boardEl;
  let leftEls = [];
  let rightEls = [];
  let drag = null; // { side, i, x, y } — x,y en coords del board (punta actual)
  let dragStart = null; // { x, y } ancla en coords del board
  let dragMoved = false;
  let overTarget = null; // { side, i } tarjeta opuesta bajo el puntero
  let sx = 0, sy = 0;

  function chipAt(clientX, clientY) {
    const el = document.elementFromPoint(clientX, clientY);
    const chip = el && el.closest(".chip");
    if (!chip) return null;
    let i = leftEls.indexOf(chip);
    if (i >= 0) return { side: "L", i };
    let r = rightEls.indexOf(chip);
    if (r >= 0) return { side: "R", i: r };
    return null;
  }

  function onDown(e, side, i) {
    if (answered) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    sx = e.clientX;
    sy = e.clientY;
    dragMoved = false;
    const br = boardEl.getBoundingClientRect();
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = side === "L" ? rect.right : rect.left;
    const ny = rect.top + rect.height / 2;
    dragStart = { x: nx - br.left, y: ny - br.top };
    drag = { side, i, x: dragStart.x, y: dragStart.y };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }
  function onMove(e) {
    if (!drag) return;
    if (Math.abs(e.clientX - sx) > 6 || Math.abs(e.clientY - sy) > 6) dragMoved = true;
    const br = boardEl.getBoundingClientRect();
    drag = { ...drag, x: e.clientX - br.left, y: e.clientY - br.top };
    if (dragMoved) {
      const t = chipAt(e.clientX, e.clientY);
      overTarget = t && t.side !== drag.side ? t : null;
    }
  }
  function onUp(e) {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    const start = drag;
    if (start && dragMoved) {
      const t = chipAt(e.clientX, e.clientY);
      if (t && t.side !== start.side) {
        const left = start.side === "L" ? start.i : t.i;
        const right = start.side === "R" ? start.i : t.i;
        connect(left, right);
      }
      selected = null;
    } else if (start) {
      tap(start.side, start.i); // no se movió → tap/click-click
    }
    drag = null;
    dragStart = null;
    overTarget = null;
    dragMoved = false;
  }

  // ---- líneas fijas de las uniones confirmadas (SVG) ----
  let lines = [];
  let linesKey = "";
  function measure() {
    if (!boardEl) return;
    const br = boardEl.getBoundingClientRect();
    const out = [];
    for (const l in links) {
      const li = +l;
      const ri = links[l];
      const le = leftEls[li];
      const re = rightEls[ri];
      if (!le || !re) continue;
      const a = le.getBoundingClientRect();
      const b = re.getBoundingClientRect();
      const color = answered ? (links[li] === li ? "var(--good)" : "var(--bad)") : "var(--accent)";
      out.push({
        x1: a.right - br.left,
        y1: a.top + a.height / 2 - br.top,
        x2: b.left - br.left,
        y2: b.top + b.height / 2 - br.top,
        color,
      });
    }
    const key = JSON.stringify(out);
    if (key !== linesKey) {
      linesKey = key;
      lines = out;
    }
  }
  afterUpdate(measure);
  onMount(() => window.addEventListener("resize", measure));
  onDestroy(() => window.removeEventListener("resize", measure));

  // Color del borde/nodo-ancla de cada chip: unifica el estado de selección,
  // drag-over y corrección en un solo valor (evita pelear con Tailwind por
  // especificidad de border-color entre varias clases condicionales).
  function leftColor(i) {
    if (selected && selected.side === "L" && selected.i === i) return "var(--accent)";
    if (overTarget && overTarget.side === "L" && overTarget.i === i) return "var(--accent)";
    if (answered) return links[i] === i ? "var(--good)" : "var(--bad)";
    return links[i] !== undefined ? "var(--accent)" : "var(--line)";
  }
  function rightColor(r) {
    if (selected && selected.side === "R" && selected.i === r) return "var(--accent)";
    if (overTarget && overTarget.side === "R" && overTarget.i === r) return "var(--accent)";
    if (answered) return rightToLeft[r] === r ? "var(--good)" : "var(--bad)";
    return rightToLeft[r] !== undefined ? "var(--accent)" : "var(--line)";
  }
  // Anillo de foco (selección/drag-over) o tinte de fondo (correcto/incorrecto).
  function leftStateCls(i) {
    if (selected && selected.side === "L" && selected.i === i) return "ring-2 ring-accent/40";
    if (overTarget && overTarget.side === "L" && overTarget.i === i) return "ring-2 ring-accent/45";
    if (answered && links[i] === i) return "bg-good/15";
    if (answered && links[i] !== undefined && links[i] !== i) return "bg-bad/13";
    return "";
  }
  function rightStateCls(r) {
    if (selected && selected.side === "R" && selected.i === r) return "ring-2 ring-accent/40";
    if (overTarget && overTarget.side === "R" && overTarget.i === r) return "ring-2 ring-accent/45";
    if (answered && rightToLeft[r] === r) return "bg-good/15";
    if (answered && rightToLeft[r] !== undefined && rightToLeft[r] !== r) return "bg-bad/13";
    return "";
  }

  const CHIP_CLS =
    "chip relative flex min-h-[58px] cursor-pointer touch-none items-center gap-2 rounded-[13px] border-[1.5px] border-[var(--c)] bg-surface px-[11px] py-3 text-left text-sm leading-[1.32] text-text select-none [transition:transform_0.08s,border-color_0.18s,background-color_0.18s,box-shadow_0.18s] not-disabled:active:scale-[0.98] [@media(max-height:700px)]:min-h-[52px] [@media(max-height:700px)]:p-2.5 [@media(max-height:700px)]:text-[13px]";
  const NODE_CLS = "h-[11px] w-[11px] flex-none rounded-full border-2 border-[var(--c)] box-border";
</script>

<div class="flex w-full max-w-[480px] flex-col justify-center {shake ? 'shake-anim' : ''}">
  <span
    class="mb-4 self-start rounded-full px-[13px] py-1.5 text-xs font-extrabold tracking-[1.6px] text-bg uppercase transition-colors duration-[250ms] {correct
      ? 'bg-good'
      : answered
        ? 'bg-bad'
        : 'bg-accent-ink'}"
  >
    {answered ? (correct ? "¡Correcto!" : "Revisá las uniones") : "Conectar"}
  </span>
  <h2
    class="m-0 mb-[18px] font-serif text-[21px] font-extrabold leading-[1.3] tracking-[-0.3px] [@media(max-height:700px)]:mb-3.5 [@media(max-height:700px)]:text-[19px]"
  >
    {card.question}
  </h2>

  <div class="relative grid grid-cols-[1fr_2fr] gap-10" bind:this={boardEl}>
    <svg class="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-visible" aria-hidden="true">
      {#each lines as ln}
        <path
          d="M {ln.x1} {ln.y1} C {ln.x1 + 24} {ln.y1}, {ln.x2 - 24} {ln.y2}, {ln.x2} {ln.y2}"
          fill="none"
          stroke={ln.color}
          stroke-width="2.5"
          stroke-linecap="round"
        />
        <circle cx={ln.x1} cy={ln.y1} r="3.5" fill={ln.color} />
        <circle cx={ln.x2} cy={ln.y2} r="3.5" fill={ln.color} />
      {/each}
      {#if drag && dragMoved && dragStart}
        <path
          d="M {dragStart.x} {dragStart.y} C {dragStart.x + 24} {dragStart.y}, {drag.x - 24} {drag.y}, {drag.x} {drag.y}"
          fill="none"
          stroke="var(--accent)"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-dasharray="2 6"
        />
        <circle cx={dragStart.x} cy={dragStart.y} r="3.5" fill="var(--accent)" />
      {/if}
    </svg>

    <div class="relative z-[1] flex flex-col gap-2.5">
      {#each card.pairs as p, i}
        <button
          class="{CHIP_CLS} {leftStateCls(i)}"
          style="--c:{leftColor(i)}"
          bind:this={leftEls[i]}
          on:pointerdown={(e) => onDown(e, "L", i)}
          disabled={answered}
        >
          <span class="flex-1">{p.left}</span>
          <span class="{NODE_CLS} {links[i] !== undefined ? 'bg-[var(--c)]' : 'bg-bg'}"></span>
        </button>
      {/each}
    </div>

    <div class="relative z-[1] flex flex-col gap-2.5">
      {#each rightOrder as r (r)}
        <button
          class="{CHIP_CLS} {rightStateCls(r)}"
          style="--c:{rightColor(r)}"
          bind:this={rightEls[r]}
          on:pointerdown={(e) => onDown(e, "R", r)}
          disabled={answered}
        >
          <span class="{NODE_CLS} {rightToLeft[r] !== undefined ? 'bg-[var(--c)]' : 'bg-bg'}"></span>
          <span class="flex-1">{card.pairs[r].right}</span>
        </button>
      {/each}
    </div>
  </div>

  {#if !answered}
    <button
      class="mt-[18px] cursor-pointer rounded-[13px] bg-accent px-[18px] py-[13px] text-[15px] font-extrabold text-on-accent [font-family:inherit] [transition:opacity_0.18s,transform_0.08s] not-disabled:active:scale-[0.985] disabled:cursor-default disabled:opacity-45"
      on:click={confirm}
      disabled={!allLinked}
    >
      {allLinked ? "Confirmar" : "Uní todos los pares"}
    </button>
  {:else}
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
