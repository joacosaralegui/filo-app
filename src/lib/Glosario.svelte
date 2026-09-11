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
    placeRail();
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
  $: letters = groups.map((g) => g.letter);
  $: porCurso = courses.map((course) => ({ course, items: classes.filter((c) => c.course === course) }));

  // --- índice de letras: tocar o arrastrar salta a la sección ---
  let headerH = 0; // alto del buscador fijo: las secciones quedan justo debajo
  let stickyEl;
  // El índice arranca debajo del buscador. Arriba de todo el buscador está
  // más abajo, bajo la lámina, y recién se pega arriba al scrollear: por eso
  // se recalcula con el scroll y no alcanza con su alto.
  let railTop = 0;
  const placeRail = () => stickyEl && (railTop = stickyEl.getBoundingClientRect().bottom + 8);
  $: headerH, placeRail();
  let rail;
  let scrubbing = false;
  let current = null;

  function jumpAt(y) {
    const r = rail.getBoundingClientRect();
    const i = Math.min(letters.length - 1, Math.max(0, Math.floor(((y - r.top) / r.height) * letters.length)));
    const letter = letters[i];
    if (letter === current) return;
    current = letter;
    // instantáneo: el scroll suave global (global.css) no alcanza a seguir el dedo
    document.getElementById(`letra-${letter}`)?.scrollIntoView({ block: "start", behavior: "instant" });
  }
  function down(e) {
    scrubbing = true;
    rail.setPointerCapture(e.pointerId);
    jumpAt(e.clientY);
  }
  function move(e) {
    if (scrubbing) jumpAt(e.clientY);
  }
  function up() {
    scrubbing = false;
    current = null;
  }

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
        class="flex-none rounded-full px-2 py-0.5 text-[10px] font-extrabold tracking-[1px] uppercase {KIND_CLASS[
          t.entry.kind
        ] || ''}">{KIND_LABEL[t.entry.kind] || ""}</span
      >
    {/if}
  </button>
{/snippet}

{#snippet classRow(c)}
  <button class={row} on:click={() => abrirClase(c)}>
    <span class="w-6 flex-none text-sm font-bold text-text-soft [font-variant-numeric:tabular-nums]">{c.num}</span>
    <span class="min-w-0 flex-1 truncate font-serif text-[17px] font-semibold text-text">{c.title}</span>
  </button>
{/snippet}

{#snippet sectionTitle(label)}
  <p class="mt-5 mb-1 text-xs font-bold tracking-[1.6px] text-text-soft/70 uppercase">{label}</p>
{/snippet}

<svelte:window on:scroll={placeRail} on:resize={placeRail} />

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+40px)] pb-[calc(env(safe-area-inset-bottom)+110px)]"
>
  <!-- La lámina de Cursos, acercada al libro abierto de abajo a la derecha. -->
  <RootHeader img={portada} title="Glosario" wash={0.35} position="50% 100%" origin="100% 60%" zoom={2} />

  <!-- Buscador y chips fijos arriba: se puede cambiar de filtro en la M sin volver al principio. -->
  <div
    class="sticky top-0 z-20 -mx-[22px] bg-bg/95 px-[22px] pt-[calc(env(safe-area-inset-top)+10px)] pb-3 backdrop-blur-[6px]"
    bind:this={stickyEl}
    bind:clientHeight={headerH}
  >
    <input
      class="mb-3 w-full rounded-[13px] border border-line bg-surface px-4 py-3 text-base text-text [font-family:inherit] outline-none focus:border-accent"
      type="search"
      placeholder="Buscar autores, conceptos o clases"
      bind:value={q}
    />
    <div class="flex gap-2 overflow-x-auto">
      {#each FILTROS as f (f.id)}
        <button
          class="flex-none cursor-pointer rounded-full border px-3 py-1.5 text-[13px] font-bold [font-family:inherit] {filtro ===
          f.id
            ? 'border-accent bg-accent text-on-accent'
            : 'border-line bg-transparent text-text-soft'}"
          aria-pressed={filtro === f.id}
          on:click={() => elegir(f.id)}>{f.label}</button
        >
      {/each}
    </div>
  </div>

  {#if sinResultados}
    <p class="mt-4 text-sm text-text-soft">Nada con «{q.trim()}».</p>
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
            class="cursor-pointer self-start border-0 bg-transparent py-2 text-[13px] font-bold text-accent [font-family:inherit]"
            on:click={() => elegir(s.id)}>Ver los {items.length}</button
          >
        {/if}
      {/if}
    {/each}
  {:else if nq}
    <!-- Buscando con un chip: todo lo de ese tipo. -->
    <div class="mt-2">
      {#if filtro === "clase"}
        {#each hitClasses as c (c.course.id + c.num)}{@render classRow(c)}{/each}
      {:else}
        {#each hitTerms.filter((t) => t.entry.kind === filtro) as t (t.slug)}
          {@render termRow(t, false)}
        {:else}
          <p class="mt-2 text-sm text-text-soft">Nada con «{q.trim()}» en {FILTROS.find((f) => f.id === filtro).label.toLowerCase()}.</p>
        {/each}
      {/if}
    </div>
  {:else if filtro === "clase"}
    <!-- Clases sin búsqueda: por curso y en orden, que acá el orden importa. -->
    {#each porCurso as g (g.course.id)}
      {@render sectionTitle(g.course.title)}
      {#each g.items as c (c.num)}{@render classRow(c)}{/each}
    {/each}
  {:else}
    <!-- A a Z. -->
    <div class="pr-7">
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
    </div>

    <!-- El índice va fijo, alineado al borde derecho de la columna (no de la
         ventana), entre el buscador y la barra de abajo. -->
    <div
      class="pointer-events-none fixed inset-x-0 bottom-[calc(env(safe-area-inset-bottom)+80px)] z-30 mx-auto flex max-w-[480px] items-center justify-end pr-1.5"
      style="top: {railTop}px"
    >
      <div
        bind:this={rail}
        class="pointer-events-auto flex touch-none flex-col items-center px-1.5 select-none"
        on:pointerdown={down}
        on:pointermove={move}
        on:pointerup={up}
        on:pointercancel={up}
        role="navigation"
        aria-label="Índice alfabético"
      >
        {#each letters as l}
          <span
            class="flex h-[17px] w-5 items-center justify-center text-[11px] font-bold {current === l
              ? 'text-accent'
              : 'text-text-soft'}">{l}</span
          >
        {/each}
      </div>
    </div>
  {/if}
</div>
