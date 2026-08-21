<script>
  import RichText from "./RichText.svelte";
  export let card;
</script>

<div class="slide-inner info">
  {#if card.continues}
    <span class="section">↳ {card.title}</span>
  {:else}
    {#if card.tag}<span class="tag">{card.tag}</span>{/if}
    <h2>{card.title}</h2>
  {/if}
  <p><RichText text={card.body} /></p>
  <span class="cue">↓</span>
</div>

<style>
  .slide-inner {
    width: 100%;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
  }
  .tag {
    align-self: flex-start;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.6px;
    font-weight: 700;
    color: var(--accent-ink);
    padding: 6px 12px;
    border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
    border-radius: 999px;
    margin-bottom: 18px;
  }
  .section {
    align-self: flex-start;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.2px;
    color: color-mix(in srgb, var(--text-soft) 55%, transparent);
    margin-bottom: 10px;
  }
  h2 {
    font-size: 30px;
    line-height: 1.2;
    margin: 0 0 18px;
    font-weight: 800;
    letter-spacing: -0.4px;
  }
  p {
    margin: 0;
    color: var(--text-soft);
    line-height: 1.65;
    font-size: 20px;
    white-space: pre-line; /* las viñetas del body vienen en líneas propias */
  }
  .cue {
    margin-top: 34px;
    color: var(--line);
    font-size: 22px;
    animation: bob 1.6s ease-in-out infinite;
  }
  @keyframes bob {
    0%, 100% { transform: translateY(0); opacity: 0.5; }
    50% { transform: translateY(6px); opacity: 1; }
  }
  @media (max-height: 700px) {
    h2 { font-size: 25px; }
    p { font-size: 18px; }
  }
</style>
