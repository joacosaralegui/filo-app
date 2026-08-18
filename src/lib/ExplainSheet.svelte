<script>
  // Hoja con la explicación de una card, en el mismo lenguaje visual que el
  // glosario. Aparece SÓLO cuando la respuesta fue incorrecta.
  //
  // Antes la explicación se revelaba dentro de la card: al crecer el contenido,
  // la pregunta y las opciones —centradas verticalmente— se corrían hacia
  // arriba. Sacándola a una hoja, la card no cambia de alto y nada se mueve.
  import { createEventDispatcher } from "svelte";
  import RichText from "./RichText.svelte";

  export let data = null; // { solucion?: string, texto: string } | null
  const dispatch = createEventDispatcher();

  function cerrar() {
    dispatch("close");
  }
  function onKey(e) {
    if (e.key === "Escape") cerrar();
  }
</script>

<svelte:window on:keydown={onKey} />

{#if data}
  <div class="backdrop" on:click={cerrar} role="presentation">
    <div class="sheet" on:click|stopPropagation role="dialog" aria-modal="true">
      <div class="grab"></div>
      <span class="kind">¿Por qué?</span>
      {#if data.solucion}
        <h3>{data.solucion}</h3>
      {/if}
      {#if data.texto}
        <p><RichText text={data.texto} /></p>
      {/if}
      <button class="close" on:click={cerrar}>Entendido</button>
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
    background: var(--bg);
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
    margin: 0 auto 14px;
  }
  .kind {
    display: inline-block;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1.4px;
    font-weight: 800;
    color: var(--bg);
    background: var(--bad);
    padding: 4px 10px;
    border-radius: 999px;
  }
  h3 {
    margin: 12px 0 0;
    font-size: 21px;
    font-weight: 800;
    letter-spacing: -0.3px;
    color: var(--accent-ink);
  }
  p {
    margin: 12px 0 0;
    color: var(--text-soft);
    line-height: 1.6;
    font-size: 15px;
  }
  .close {
    margin-top: 20px;
    width: 100%;
    padding: 13px;
    border-radius: 13px;
    background: var(--accent);
    color: var(--on-accent);
    border: none;
    font: inherit;
    font-weight: 800;
    font-size: 15px;
    cursor: pointer;
  }
  .close:active {
    transform: scale(0.99);
  }
  @keyframes fade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideup {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .backdrop, .sheet { animation-duration: 1ms; }
  }
</style>
