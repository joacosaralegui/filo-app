<script>
  import RichText from "./RichText.svelte";
  export let card;
</script>

<div class="flex w-full max-w-[480px] flex-col justify-center gap-1">
  {#if card.continues}
    <span
      class="mb-2.5 self-start text-[13px] font-semibold tracking-[0.2px] [color:color-mix(in_srgb,var(--text-soft)_55%,transparent)]"
      >↳ {card.title}</span
    >
  {:else}
    {#if card.tag}<span
        class="mb-[18px] self-start rounded-full border px-3 py-1.5 text-xs font-bold tracking-[1.6px] text-accent-ink uppercase [border-color:color-mix(in_srgb,var(--accent)_35%,transparent)]"
        >{card.tag}</span
      >{/if}
    <h2
      class="m-0 mb-[18px] font-serif text-[30px] font-extrabold leading-[1.2] tracking-[-0.4px] [@media(max-height:700px)]:text-[25px]"
    >
      {card.title}
    </h2>
  {/if}
  <p
    class="m-0 font-serif text-[20px] leading-[1.65] whitespace-pre-line text-text-soft [@media(max-height:700px)]:text-[18px]"
  ><RichText text={card.body} /></p>
  <span class="cue mt-[34px] text-[22px] text-line">↓</span>
</div>

<style>
  /* Queda en CSS: keyframe infinito, no hay utilidad Tailwind equivalente. */
  .cue {
    animation: bob 1.6s ease-in-out infinite;
  }
  @keyframes bob {
    0%, 100% { transform: translateY(0); opacity: 0.5; }
    50% { transform: translateY(6px); opacity: 1; }
  }
</style>
