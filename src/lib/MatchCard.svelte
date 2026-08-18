<script>
  import { createEventDispatcher, afterUpdate, onMount, onDestroy } from "svelte";
  import RichText from "./RichText.svelte";
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
</script>

<div class="slide-inner match" class:shake>
  <span class="tag" class:ok={correct} class:no={answered && !correct}>
    {answered ? (correct ? "¡Correcto!" : "Revisá las uniones") : "Conectar"}
  </span>
  <h2>{card.question}</h2>

  <div class="board" bind:this={boardEl}>
    <svg class="wires" aria-hidden="true">
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

    <div class="col">
      {#each card.pairs as p, i}
        <button
          class="chip left"
          class:sel={selected && selected.side === "L" && selected.i === i}
          class:target={overTarget && overTarget.side === "L" && overTarget.i === i}
          class:ok={answered && links[i] === i}
          class:no={answered && links[i] !== undefined && links[i] !== i}
          style="--c:{answered
            ? links[i] === i
              ? 'var(--good)'
              : 'var(--bad)'
            : links[i] !== undefined
              ? 'var(--accent)'
              : 'var(--line)'}"
          bind:this={leftEls[i]}
          on:pointerdown={(e) => onDown(e, "L", i)}
          disabled={answered}
        >
          <span class="txt">{p.left}</span>
          <span class="node" class:filled={links[i] !== undefined}></span>
        </button>
      {/each}
    </div>

    <div class="col">
      {#each rightOrder as r (r)}
        <button
          class="chip right"
          class:sel={selected && selected.side === "R" && selected.i === r}
          class:target={overTarget && overTarget.side === "R" && overTarget.i === r}
          class:ok={answered && rightToLeft[r] === r}
          class:no={answered && rightToLeft[r] !== undefined && rightToLeft[r] !== r}
          style="--c:{answered
            ? rightToLeft[r] === r
              ? 'var(--good)'
              : 'var(--bad)'
            : rightToLeft[r] !== undefined
              ? 'var(--accent)'
              : 'var(--line)'}"
          bind:this={rightEls[r]}
          on:pointerdown={(e) => onDown(e, "R", r)}
          disabled={answered}
        >
          <span class="node" class:filled={rightToLeft[r] !== undefined}></span>
          <span class="txt">{card.pairs[r].right}</span>
        </button>
      {/each}
    </div>
  </div>

  {#if !answered}
    <button class="confirm" on:click={confirm} disabled={!allLinked}>
      {allLinked ? "Confirmar" : "Uní todos los pares"}
    </button>
  {:else}
    <p class="explain"><RichText text={card.explain} /></p>
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
    margin: 0 0 18px;
    font-weight: 800;
    letter-spacing: -0.3px;
  }

  .board {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 2fr; /* nombres 1/3 · conceptos 2/3 */
    gap: 40px; /* hueco para las líneas */
  }
  .wires {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
    overflow: visible;
  }
  .col {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .chip {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    text-align: left;
    background: var(--surface);
    border: 1.5px solid var(--c);
    border-radius: 13px;
    padding: 12px 11px;
    font: inherit;
    font-size: 14px;
    line-height: 1.32;
    color: var(--text);
    cursor: pointer;
    min-height: 58px;
    touch-action: none; /* arrastrar no debe scrollear el feed */
    user-select: none;
    -webkit-user-select: none;
    transition: transform 0.08s, border-color 0.18s, background 0.18s, box-shadow 0.18s;
  }
  .chip:not(:disabled):active { transform: scale(0.98); }
  .chip .txt { flex: 1; }

  /* nodos-ancla en los bordes internos */
  .node {
    flex: 0 0 auto;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--bg);
    border: 2px solid var(--c);
    box-sizing: border-box;
  }
  .node.filled { background: var(--c); }

  .chip.sel {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 40%, transparent);
  }
  .chip.target {
    border-color: var(--accent);
    box-shadow: 0 0 0 2px color-mix(in srgb, var(--accent) 45%, transparent);
  }
  .chip.ok {
    background: color-mix(in srgb, var(--good) 15%, transparent);
  }
  .chip.no {
    background: color-mix(in srgb, var(--bad) 13%, transparent);
  }

  .confirm {
    margin-top: 18px;
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
  .explain {
    margin: 16px 0 0;
    padding-top: 14px;
    border-top: 1px solid var(--line);
    color: var(--text-soft);
    line-height: 1.55;
    font-size: 14.5px;
    animation: rise 0.35s ease;
  }
  @keyframes rise {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .shake { animation: shake 0.4s ease; }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(7px); }
    60% { transform: translateX(-5px); }
    80% { transform: translateX(3px); }
  }
  @media (max-height: 700px) {
    h2 { font-size: 19px; margin-bottom: 14px; }
    .chip { min-height: 52px; font-size: 13px; padding: 10px; }
    .board { gap: 40px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .explain, .shake { animation: none; }
  }
</style>
