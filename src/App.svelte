<script>
  import Catalog from "./lib/Catalog.svelte";
  import Home from "./lib/Home.svelte";
  import ClassView from "./lib/ClassView.svelte";
  import GlossaryModal from "./lib/GlossaryModal.svelte";
  import { COURSES, findCourse } from "./content/courses.js";
  import { loadCourse, unloadCourse } from "./lib/courses.js";
  import { setCourse, setLastActivity } from "./lib/progress.js";
  import { route, toCatalog, toCourse, toClass } from "./lib/router.js";

  let course = null; // curso cargado: manifiesto + { classes, glossary }
  let loading = false;
  let token = 0; // descarta cargas que quedaron viejas al cambiar de ruta rápido

  // La ruta manda: el hash decide qué curso hay cargado y qué clase se ve.
  $: sync($route.courseId);

  async function sync(id) {
    if (course && course.id === id) return;
    const meta = id ? findCourse(id) : null;
    if (!meta) {
      token += 1;
      course = null;
      loading = false;
      setCourse(null);
      unloadCourse();
      if (id) toCatalog(true); // curso inexistente: al catálogo, sin dejar rastro
      return;
    }
    const mine = ++token;
    course = null;
    loading = true;
    const loaded = await loadCourse(meta);
    if (mine !== token) return; // nos ganó otra navegación
    course = loaded;
    setCourse(loaded.id);
    loading = false;
  }

  // Clase abierta (null = home del curso). Una clase bloqueada o inexistente
  // no es una ruta válida: se vuelve a la home del curso.
  $: current =
    course && $route.num != null
      ? course.classes.find((c) => c.num === $route.num && c.content) || null
      : null;
  $: if (course && $route.num != null && !current) toCourse(course.id, true);
  $: if (current) setLastActivity(course.id, current);
</script>

{#if current}
  {#key current.num}
    <ClassView
      lecture={current.content}
      classes={course.classes}
      on:back={() => toCourse(course.id)}
      on:home={() => toCatalog()}
      on:open={(e) => toClass(course.id, e.detail.num)}
    />
  {/key}
{:else if course}
  <Home
    {course}
    on:open={(e) => toClass(course.id, e.detail.num)}
    on:back={() => toCatalog()}
  />
{:else if loading}
  <div class="grid h-dvh place-items-center text-sm font-semibold text-text-soft">Cargando…</div>
{:else}
  <Catalog
    courses={COURSES}
    on:open={(e) => toCourse(e.detail.id)}
    on:resume={(e) => toClass(e.detail.id, e.detail.num)}
  />
{/if}

<GlossaryModal />
