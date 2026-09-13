<script>
  // Página de un término del glosario (#/glosario/<slug>). Se llega desde la
  // lista del Glosario o desde la hoja de una clase ("Ver en el glosario").
  // Los términos que aparecen en la explicación llevan a su propia página.
  import { createEventDispatcher, onMount } from "svelte";
  import DetailHeader from "./DetailHeader.svelte";
  import RichText from "./RichText.svelte";
  import { loadGlossary } from "./courses.js";
  import { KIND_LABEL, KIND_CLASS } from "./glossary.js";

  export let slug;
  const dispatch = createEventDispatcher();

  let glossary = null;
  onMount(async () => {
    glossary = await loadGlossary();
  });

  $: entry = glossary ? glossary[slug] || null : null;
  $: if (glossary && !entry) dispatch("missing");
  // Cada término arranca arriba: la lista o el término anterior dejan su scroll.
  $: slug, window.scrollTo({ top: 0, behavior: "instant" });
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+20px)] pb-[calc(env(safe-area-inset-bottom)+110px)]"
>
  <DetailHeader title="" on:back={() => dispatch("back")} />

  {#if entry}
    <article class="mt-8">
      <div class="mb-3 flex items-center gap-2.5">
        <span
          class="rounded-[4px] px-2.5 py-1 text-sm font-extrabold uppercase {KIND_CLASS[entry.kind] ||
            ''}">{KIND_LABEL[entry.kind] || ""}</span
        >
        {#if entry.when}
          <span class="text-[16px] font-bold text-text-soft [font-variant-numeric:tabular-nums]">{entry.when}</span>
        {/if}
      </div>
      <h1 class="mb-5 font-serif text-[32px] leading-[1.1] font-extrabold tracking-[-0.3px] text-text">
        {entry.term}
      </h1>
      <p class="font-serif text-[17px] leading-[1.7] text-text-soft">
        <RichText text={entry.body} exclude={slug} onTerm={(s) => dispatch("term", { slug: s })} />
      </p>
    </article>
  {/if}
</div>
