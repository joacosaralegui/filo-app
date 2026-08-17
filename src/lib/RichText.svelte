<script>
  // Renderiza un texto con términos del glosario convertidos en botones clicables.
  import { segment, openTerm } from "./glossary.js";
  export let text = "";
  $: parts = segment(text);
</script>

{#each parts as p}{#if p.t === "term"}<button class="term" on:click|stopPropagation={() => openTerm(p.slug)}>{p.v}</button>{:else}{p.v}{/if}{/each}

<style>
  .term {
    font: inherit;
    color: var(--accent-ink);
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    border-bottom: 1px dotted color-mix(in srgb, var(--accent-ink) 55%, transparent);
    transition: color 0.15s, border-color 0.15s;
  }
  .term:active {
    color: var(--accent);
  }
</style>
