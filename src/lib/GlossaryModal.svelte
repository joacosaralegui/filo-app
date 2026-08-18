<script>
  import { activeTerm, closeTerm } from "./glossary.js";

  const KIND_LABEL = {
    autor: "Autor",
    concepto: "Concepto",
    obra: "Obra",
    evento: "Evento",
  };

  function onKey(e) {
    if (e.key === "Escape") closeTerm();
  }
</script>

<svelte:window on:keydown={onKey} />

{#if $activeTerm}
  <div class="backdrop" on:click={closeTerm} role="presentation">
    <div class="sheet" on:click|stopPropagation role="dialog" aria-modal="true">
      <div class="grab"></div>
      <div class="head">
        <span class="kind kind-{$activeTerm.kind}">{KIND_LABEL[$activeTerm.kind] || ""}</span>
        {#if $activeTerm.when}<span class="when">{$activeTerm.when}</span>{/if}
      </div>
      <h3>{$activeTerm.term}</h3>
      <p>{$activeTerm.body}</p>
      <button class="close" on:click={closeTerm}>Entendido</button>
    </div>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    z-index: 80;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(2px);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    animation: fade 0.2s ease;
  }
  .sheet {
    width: 100%;
    max-width: 480px;
    background: var(--surface-2);
    border: 1px solid var(--line);
    border-bottom: none;
    border-radius: 22px 22px 0 0;
    padding: 10px 22px calc(env(safe-area-inset-bottom) + 24px);
    box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.5);
    animation: slideup 0.26s cubic-bezier(0.16, 0.84, 0.3, 1);
  }
  .grab {
    width: 40px;
    height: 4px;
    border-radius: 3px;
    background: var(--line);
    margin: 4px auto 16px;
  }
  .head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  .kind {
    font-size: 11px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    padding: 4px 10px;
    border-radius: 999px;
  }
  .kind-autor { background: color-mix(in srgb, var(--good) 18%, transparent); color: var(--good-ink); }
  .kind-concepto { background: color-mix(in srgb, var(--accent) 24%, transparent); color: var(--accent-ink); }
  .kind-obra { background: color-mix(in srgb, var(--bad) 16%, transparent); color: var(--bad-ink); }
  .kind-evento { background: color-mix(in srgb, var(--text) 8%, transparent); color: var(--text-soft); }
  .when {
    font-size: 13px;
    font-weight: 700;
    color: var(--text-soft);
    font-variant-numeric: tabular-nums;
  }
  h3 {
    margin: 0 0 12px;
    font-size: 24px;
    font-weight: 800;
    letter-spacing: -0.3px;
  }
  p {
    margin: 0 0 22px;
    color: var(--text-soft);
    line-height: 1.65;
    font-size: 16px;
  }
  .close {
    width: 100%;
    padding: 14px;
    border-radius: 13px;
    background: var(--surface);
    border: 1px solid var(--line);
    color: var(--text);
    font: inherit;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
  }
  .close:active { transform: scale(0.99); }
  @keyframes fade { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideup { from { transform: translateY(100%); } to { transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) {
    .backdrop, .sheet { animation-duration: 1ms; }
  }
</style>
