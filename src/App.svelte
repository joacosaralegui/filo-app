<script>
  import Home from "./lib/Home.svelte";
  import ClassView from "./lib/ClassView.svelte";
  import GlossaryModal from "./lib/GlossaryModal.svelte";
  import { CLASSES } from "./content/classes.js";

  let current = null; // clase abierta (null = home)

  function open(e) {
    current = e.detail;
  }
  function back() {
    current = null;
  }
</script>

{#if current}
  {#key current.num}
    <ClassView lecture={current.content} on:back={back} />
  {/key}
{:else}
  <Home classes={CLASSES} on:open={open} />
{/if}

<GlossaryModal />
