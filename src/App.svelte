<script>
  import Catalog from "./lib/Catalog.svelte";
  import Home from "./lib/Home.svelte";
  import CourseView from "./lib/CourseView.svelte";
  import ClassView from "./lib/ClassView.svelte";
  import Album from "./lib/Album.svelte";
  import Desafio from "./lib/Desafio.svelte";
  import BottomNav from "./lib/BottomNav.svelte";
  import GlossaryModal from "./lib/GlossaryModal.svelte";
  import { COURSES, findCourse } from "./content/courses.js";
  import { loadCourse, unloadCourse } from "./lib/courses.js";
  import { setCourse, setLastActivity } from "./lib/progress.js";
  import {
    route,
    toInicio,
    toCatalog,
    toAlbum,
    toDesafio,
    toCourse,
    toClass,
  } from "./lib/router.js";

  let course = null; // curso cargado: manifiesto + { classes, glossary }
  let loading = false;
  let token = 0; // descarta cargas que quedaron viejas al cambiar de ruta rápido
  let restarts = 0; // fuerza el remontaje de la clase al reiniciarla

  // Rutas viejas (#/<curso>): se normalizan a la forma nueva sin dejar rastro
  // en el historial, así los links guardados y la PWA instalada siguen andando.
  $: if ($route.legacy && findCourse($route.courseId)) {
    if ($route.num != null) toClass($route.courseId, $route.num, true);
    else toCourse($route.courseId, true);
  }

  // La ruta manda: el hash decide qué curso hay cargado y qué clase se ve.
  $: sync($route.view === "curso" ? $route.courseId : null);

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

  // Clase abierta (null = el recorrido del curso). Una clase bloqueada o
  // inexistente no es una ruta válida: se vuelve al recorrido.
  $: current =
    course && $route.num != null
      ? course.classes.find((c) => c.num === $route.num && c.content) || null
      : null;
  $: if (course && $route.num != null && !current) toCourse(course.id, true);
  $: if (current) setLastActivity(course.id, current);

  // La pestaña encendida. El recorrido y el catálogo son pantallas distintas,
  // así que cada una enciende la suya.
  $: tab =
    $route.view === "curso"
      ? "recorrido"
      : $route.view === "cursos"
        ? "cursos"
        : $route.view === "album"
          ? "album"
          : "inicio";

  // El ítem "Recorrido" sin curso empezado no se apaga: manda a elegir uno.
  const irAlRecorrido = (id) => (id ? toCourse(id, true) : toCatalog());
</script>

{#if $route.view === "album"}
  <Album on:open={(e) => toClass(e.detail.courseId, e.detail.num)} />
{:else if $route.view === "desafio"}
  <Desafio
    courses={COURSES}
    on:salir={() => toInicio()}
    on:clase={(e) => toClass(e.detail.courseId, e.detail.num)}
  />
{:else if $route.view === "cursos"}
  <Catalog courses={COURSES} on:open={(e) => toCourse(e.detail.id)} />
{:else if current}
  <!-- `restarts` entra en la key para que al reiniciar la clase el componente
       se vuelva a montar: su estado se lee del progreso una sola vez, al montar. -->
  {#key `${current.num}-${restarts}`}
    <ClassView
      lecture={current.content}
      classes={course.classes}
      courseId={course.id}
      on:restart={() => (restarts += 1)}
      on:back={() => toCourse(course.id, true)}
      on:open={(e) => toClass(course.id, e.detail.num)}
    />
  {/key}
{:else if course}
  <CourseView
    {course}
    on:open={(e) => toClass(course.id, e.detail.num)}
    on:back={() => toCatalog()}
  />
{:else if loading}
  <div class="grid h-dvh place-items-center text-sm font-semibold text-text-soft">Cargando…</div>
{:else}
  <Home
    courses={COURSES}
    on:resume={(e) => toClass(e.detail.id, e.detail.num)}
    on:cursos={() => toCatalog()}
    on:desafio={() => toDesafio()}
    on:album={() => toAlbum()}
  />
{/if}

<!-- La barra queda a la vista también dentro de una clase: el feed es
     inmersivo, pero irse a otra parte no tiene por qué costar dos toques
     (es lo que hacen los feeds verticales de Instagram y TikTok). La única
     pantalla sin barra es el desafío, que tiene su propia salida. -->
{#if $route.view !== "desafio"}
  <BottomNav
    active={tab}
    on:inicio={() => toInicio()}
    on:recorrido={(e) => irAlRecorrido(e.detail.id)}
    on:cursos={() => toCatalog()}
    on:album={() => toAlbum()}
  />
{/if}

<GlossaryModal />
