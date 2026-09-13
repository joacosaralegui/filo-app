<script context="module">
  // La búsqueda, el filtro y el scroll sobreviven a abrir un término o una
  // clase y volver con "atrás".
  let saved = { q: "", filtro: "todos", y: 0 };
</script>

<script>
  // Pestaña "Glosario": los términos del glosario y las clases de todos los cursos.
  //
  //   Sin búsqueda  la lista de A a Z (o las clases por curso, con el chip
  //                 Clases), con un índice de letras que se puede arrastrar.
  //   Buscando      en "Todos", resultados por secciones como en Spotify
  //                 (Autores, Conceptos, Obras, Clases, Eventos); con un chip,
  //                 la lista entera de ese tipo.
  //
  // Un término abre su página (TermView); una clase lleva a la clase.
  import { createEventDispatcher, onMount, tick } from "svelte";
  import { loadContent, loadGlossary } from "./courses.js";
  import { KIND_LABEL, KIND_CLASS } from "./glossary.js";
  import RootHeader from "./RootHeader.svelte";
  import portada from "../assets/cursos.webp";

  export let courses = [];
  const dispatch = createEventDispatcher();

  const FILTROS = [
    { id: "todos", label: "Todos" },
    { id: "autor", label: "Autores" },
    { id: "concepto", label: "Conceptos" },
    { id: "obra", label: "Obras" },
    { id: "clase", label: "Clases" },
  ];
  // Eventos no tiene chip (son pocos), pero sí sección al buscar.
  const SECCIONES = [
    { id: "autor", label: "Autores" },
    { id: "concepto", label: "Conceptos" },
    { id: "obra", label: "Obras" },
    { id: "clase", label: "Clases" },
    { id: "evento", label: "Eventos" },
  ];
  const POR_SECCION = 4;

  let terms = []; // { slug, entry, name, letter, key }
  let classes = []; // { num, title, course, name, key }
  let q = saved.q;
  let filtro = saved.filtro;
  const remember = (q, filtro) => (saved = { ...saved, q, filtro });
  $: remember(q, filtro);

  // sin tildes ni mayúsculas: "hegel" encuentra "Hegel", "etica" encuentra "Ética"
  const norm = (s) =>
    String(s || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  onMount(async () => {
    for (const [slug, entry] of Object.entries(await loadGlossary())) {
      // para ordenar se ignoran comillas y signos iniciales («A las cosas mismas» va en la A)
      const name = norm(entry.term).replace(/^[^a-z0-9]+/, "");
      const letter = /^[a-z]/.test(name) ? name[0].toUpperCase() : "#";
      terms.push({ slug, entry, name, letter, key: norm([entry.term, ...(entry.aka || [])].join(" ")) });
    }
    for (const course of courses) {
      const content = await loadContent(course);
      for (const c of content.classes) {
        if (c.content) classes.push({ num: c.num, title: c.title, course, name: norm(c.title), key: norm(c.title) });
      }
    }
    terms.sort((a, b) => a.name.localeCompare(b.name, "es"));
    terms = terms;
    classes = classes;
    await tick();
    window.scrollTo({ top: saved.y, behavior: "instant" });
  });

  // --- búsqueda: lo que empieza con lo buscado va primero, el resto en su orden ---
  $: nq = norm(q.trim());
  const buscar = (list, nq) =>
    list
      .filter((x) => x.key.includes(nq))
      .sort((a, b) => !a.name.startsWith(nq) - !b.name.startsWith(nq));
  $: hitTerms = nq ? buscar(terms, nq) : [];
  $: hitClasses = nq ? buscar(classes, nq) : [];
  $: porSeccion = Object.fromEntries(
    SECCIONES.map((s) => [s.id, s.id === "clase" ? hitClasses : hitTerms.filter((t) => t.entry.kind === s.id)]),
  );
  $: sinResultados = nq && !hitTerms.length && !hitClasses.length;

  // --- lista de A a Z del filtro elegido, agrupada por letra ("#" al final) ---
  $: lista = filtro === "todos" ? terms : terms.filter((t) => t.entry.kind === filtro);
  $: groups = lista
    .reduce((acc, t) => {
      const last = acc[acc.length - 1];
      if (last && last.letter === t.letter) last.items.push(t);
      else acc.push({ letter: t.letter, items: [t] });
      return acc;
    }, [])
    .sort((a, b) => (a.letter === "#") - (b.letter === "#"));
  $: porCurso = courses.map((course) => ({ course, items: classes.filter((c) => c.course === course) }));

  let headerH = 0; // alto del buscador fijo: los encabezados de letra no quedan tapados al saltar

  function elegir(id) {
    filtro = id;
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  // Antes de irse se anota el scroll, para volver al mismo lugar de la lista.
  function abrirTermino(t) {
    saved.y = window.scrollY;
    dispatch("term", { slug: t.slug });
  }
  function abrirClase(c) {
    saved.y = window.scrollY;
    dispatch("open", { courseId: c.course.id, num: c.num });
  }

  const row =
    "flex w-full cursor-pointer items-center gap-3 border-0 border-b border-line bg-transparent py-2.5 text-left [font-family:inherit]";
</script>

<!-- Una línea por fila: el nombre y, sólo cuando la lista mezcla tipos, la etiqueta. -->
{#snippet termRow(t, etiqueta)}
  <button class={row} on:click={() => abrirTermino(t)}>
    <span class="min-w-0 flex-1 truncate font-serif text-[17px] font-semibold text-text">{t.entry.term}</span>
    {#if etiqueta}
      <span
        class="flex-none rounded-[4px] px-2 py-0.5 text-sm font-extrabold uppercase {KIND_CLASS[
          t.entry.kind
        ] || ''}">{KIND_LABEL[t.entry.kind] || ""}</span
      >
    {/if}
  </button>
{/snippet}

{#snippet classRow(c)}
  <button class={row} on:click={() => abrirClase(c)}>
    <span class="w-6 flex-none text-base font-bold text-text-soft [font-variant-numeric:tabular-nums]">{c.num}</span>
    <span class="min-w-0 flex-1 truncate font-serif text-[17px] font-semibold text-text">{c.title}</span>
  </button>
{/snippet}

{#snippet sectionTitle(label)}
  <p class="mt-5 mb-1 text-base font-bold text-text-soft/70 uppercase">{label}</p>
{/snippet}

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+110px)]"
>
  <!-- La lámina de Cursos, acercada al libro abierto de abajo a la derecha. -->
  <RootHeader img={portada} title="Glosario" wash={0.42} position="50% 100%" origin="100% 60%" zoom={2} halftone />

  <!-- Buscador y selector fijos arriba: se puede cambiar de filtro en la M sin volver al principio. -->
  <div
    class="sticky top-0 z-20 -mx-[22px] px-[22px] pt-[calc(env(safe-area-inset-top)+2px)] pb-2 backdrop-blur-[6px]"
    bind:clientHeight={headerH}
  >
    <input
      class="mb-2 w-full rounded-[4px] border border-line bg-surface px-4 py-3 text-base text-text [font-family:inherit] outline-none focus:border-accent"
      type="search"
      placeholder="Buscar autores, conceptos o clases"
      bind:value={q}
    />
    <!-- Select nativo en vez de chips: con cinco no entraban en una fila sin
         scrollear feo, y un desplegable deja clarísimo que es UN filtro a la
         vez. -->
    <div class="relative">
      <select
        class="w-full cursor-pointer appearance-none rounded-[4px] border border-line bg-surface px-4 py-3 text-base font-semibold text-text [font-family:inherit] outline-none focus:border-accent"
        value={filtro}
        on:change={(e) => elegir(e.currentTarget.value)}
      >
        {#each FILTROS as f (f.id)}
          <option value={f.id}>{f.label}</option>
        {/each}
      </select>
      <svg
        class="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-text-soft"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        aria-hidden="true"
        ><path
          fill="none"
          stroke="currentColor"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6 9l6 6 6-6"
        /></svg
      >
    </div>
  </div>

  <!-- Todo lo que sale debajo del buscador va en una sola tarjeta, con el
       mismo fondo blanco y trama que las secciones de Cromos — evita que la
       lista quede suelta contra el fondo de la app. -->
  <div class="mt-4 rounded-[4px] halftone-surface-subtle bg-surface p-4">
    {#if sinResultados}
      <p class="text-base text-text-soft">Nada con «{q.trim()}».</p>
    {:else if nq && filtro === "todos"}
      <!-- Buscando en Todos: una sección por tipo, con los primeros resultados. -->
      {#each SECCIONES as s (s.id)}
        {@const items = porSeccion[s.id]}
        {#if items.length}
          {@const tope = s.id === "evento" ? items.length : POR_SECCION}
          {@render sectionTitle(s.label)}
          {#each items.slice(0, tope) as it (s.id === "clase" ? it.course.id + it.num : it.slug)}
            {#if s.id === "clase"}{@render classRow(it)}{:else}{@render termRow(it, false)}{/if}
          {/each}
          {#if items.length > tope}
            <button
              class="cursor-pointer self-start border-0 bg-transparent py-2 text-[16px] font-bold text-accent [font-family:inherit]"
              on:click={() => elegir(s.id)}>Ver los {items.length}</button
            >
          {/if}
        {/if}
      {/each}
    {:else if nq}
      <!-- Buscando con un chip: todo lo de ese tipo. -->
      {#if filtro === "clase"}
        {#each hitClasses as c (c.course.id + c.num)}{@render classRow(c)}{/each}
      {:else}
        {#each hitTerms.filter((t) => t.entry.kind === filtro) as t (t.slug)}
          {@render termRow(t, false)}
        {:else}
          <p class="text-base text-text-soft">Nada con «{q.trim()}» en {FILTROS.find((f) => f.id === filtro).label.toLowerCase()}.</p>
        {/each}
      {/if}
    {:else if filtro === "clase"}
      <!-- Clases sin búsqueda: por curso y en orden, que acá el orden importa. -->
      {#each porCurso as g (g.course.id)}
        {@render sectionTitle(g.course.title)}
        {#each g.items as c (c.num)}{@render classRow(c)}{/each}
      {/each}
    {:else}
      <!-- A a Z. -->
      {#each groups as g (g.letter)}
        <p
          id="letra-{g.letter}"
          class="mt-4 mb-0.5 font-serif text-xl font-semibold text-accent"
          style="scroll-margin-top: {headerH}px"
        >
          {g.letter}
        </p>
        {#each g.items as t (t.slug)}{@render termRow(t, filtro === "todos")}{/each}
      {/each}
    {/if}
  </div>
</div>
