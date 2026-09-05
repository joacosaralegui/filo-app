<script>
  // Renderiza un texto con términos del glosario convertidos en botones clicables
  // y las negritas del markdown (**así**) como <strong>.
  import { segment, openTerm } from "./glossary.js";
  export let text = "";

  // Las negritas se parten primero: así el glosario nunca ve un asterisco
  // pegado a una palabra y los tramos quedan listos para envolver en <strong>.
  function splitBold(t) {
    const out = [];
    const re = /\*\*([\s\S]+?)\*\*/g;
    let last = 0;
    let m;
    while ((m = re.exec(t)) !== null) {
      if (m.index > last) out.push({ bold: false, v: t.slice(last, m.index) });
      out.push({ bold: true, v: m[1] });
      last = m.index + m[0].length;
    }
    if (last < t.length) out.push({ bold: false, v: t.slice(last) });
    return out;
  }

  // Un solo `used` para todos los tramos: cada término se linkea una vez por card.
  $: runs = (() => {
    const used = new Set();
    return splitBold(text || "").map((r) => ({ bold: r.bold, parts: segment(r.v, used) }));
  })();
</script>

{#each runs as r}{#each r.parts as p}{#if p.t === "term"}<button
      class="cursor-pointer border-0 bg-transparent p-0 font-bold text-accent-ink [font-family:inherit] [border-bottom:1px_dotted_color-mix(in_srgb,var(--accent-ink)_55%,transparent)] transition-colors duration-150 active:text-accent"
      on:click|stopPropagation={() => openTerm(p.slug)}>{p.v}</button
    >{:else if r.bold}<strong class="font-bold text-text">{p.v}</strong>{:else}{p.v}{/if}{/each}{/each}
