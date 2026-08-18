<script>
  import Home from "./lib/Home.svelte";
  import ClassView from "./lib/ClassView.svelte";
  import GlossaryModal from "./lib/GlossaryModal.svelte";
  import LlmTest from "./lib/LlmTest.svelte";
  import { CLASSES } from "./content/classes.js";

  let current = null; // clase abierta (null = home)

  // Pantalla de experimentación, fuera del flujo normal: se entra sólo por
  // la URL (…/#llm-test). Mide si un modelo chico puede corregir respuestas
  // abiertas en el dispositivo.
  let llmTest = location.hash === "#llm-test";
  function closeLlmTest() {
    location.hash = "";
    llmTest = false;
  }

  function open(e) {
    current = e.detail;
  }
  function back() {
    current = null;
  }
</script>

{#if llmTest}
  <LlmTest on:back={closeLlmTest} />
{:else if current}
  {#key current.num}
    <ClassView lecture={current.content} on:back={back} on:open={open} />
  {/key}
{:else}
  <Home classes={CLASSES} on:open={open} />
{/if}

<GlossaryModal />
