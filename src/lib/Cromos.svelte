<script>
  // Cromos: álbum de 28 logros, una sola pantalla con scroll vertical —
  // Especiales primero (son los centrales, no pertenecen a ningún curso),
  // después Cursos completos, Pensadores y Corrientes, cada uno en el orden
  // en que ya vienen declarados en content/cromos.js (que agrupa por curso,
  // así dentro de "Pensadores" se leen Antigua, Moderna y Contemporánea en
  // fila sin hacer falta un subtítulo para cada una).
  import { progress, cromosGanados, classStateOf } from "./progress.js";
  import { CROMOS_CON_IMG, TOTAL } from "./cromos.js";
  import { findCourse } from "../content/courses.js";
  import CromoTile from "./CromoTile.svelte";
  import CromoFicha from "./CromoFicha.svelte";

  $: ganados = cromosGanados($progress);

  const especiales = CROMOS_CON_IMG.filter((c) => c.tipo === "especial");
  const cursos = CROMOS_CON_IMG.filter((c) => c.tipo === "curso");
  const pensadores = CROMOS_CON_IMG.filter((c) => c.tipo === "pensador");
  const corrientes = CROMOS_CON_IMG.filter((c) => c.tipo === "corriente");

  const range = (from, to) => Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);

  // Cuánto llevás de un cromo todavía no ganado, para la ficha. Los
  // especiales no tienen una cuenta simple y clara para mostrar — se quedan
  // sólo con la descripción.
  function progresoDe(cromo) {
    if (cromo.tipo === "curso") {
      const total = findCourse(cromo.curso)?.total || 0;
      const n = range(1, total).filter((num) => classStateOf($progress, num, cromo.curso).done).length;
      return `${n} de ${total} clases completas`;
    }
    if (cromo.tipo === "pensador" || cromo.tipo === "corriente") {
      const n = cromo.clases.filter((num) => classStateOf($progress, num, cromo.curso).stars >= 3).length;
      return `${n} de ${cromo.clases.length} clases en 3★`;
    }
    return null;
  }

  const TIER_LABEL = { curso: "Curso completo", pensador: "Pensador", corriente: "Corriente", especial: "Especial" };

  let ficha = null; // { cromo, ganado, tier, progreso } | null
  function abrir(cromo) {
    const ganado = !!ganados[cromo.slug];
    ficha = {
      cromo,
      ganado,
      tier: TIER_LABEL[cromo.tipo],
      progreso: ganado ? null : progresoDe(cromo),
    };
  }
</script>

<div
  class="mx-auto flex min-h-dvh max-w-[480px] flex-col px-[22px] pt-[calc(env(safe-area-inset-top)+64px)] pb-[calc(env(safe-area-inset-bottom)+100px)]"
>
  <!-- El contador es el total de la colección: cuánto llevás de cada
       sección ya se lee del propio grisado de sus cromos, no hace falta
       repetirlo en números. Misma píldora de acento que usan las clases
       para el marcador de aciertos. -->
  <div class="mb-3 flex items-center justify-center gap-3">
    <h1
      class="m-0 font-serif text-[clamp(26px,8vw,34px)] leading-none font-semibold tracking-[0.08em] text-text uppercase"
    >
      Cromos
    </h1>
    <span
      class="halftone-surface flex-none rounded-[4px] bg-accent px-2.5 py-[5px] text-[16px] font-extrabold whitespace-nowrap text-bg"
    >
      {Object.keys(ganados).length}/{TOTAL}
    </span>
  </div>
  <!-- Sin pretítulo "Especiales" arriba de esta primera grilla: por ser la
       primera se entiende sola, y este padding hace de separación en su
       lugar. -->
  <p class="mb-9 text-center text-[16px] leading-[1.5] text-text-soft">
    Completá el álbum de cromos superando los desafíos. Tocá las imágenes para más información.
  </p>
  <div class="mb-8 grid grid-cols-2 gap-3">
    {#each especiales as c (c.slug)}
      <CromoTile cromo={c} ganado={!!ganados[c.slug]} on:open={() => abrir(c)} />
    {/each}
  </div>

  <p class="mb-3 text-[14px] font-bold text-text-soft/70 uppercase">Cursos completos</p>
  <div class="mb-8 grid grid-cols-2 gap-x-2.5 gap-y-3.5">
    {#each cursos as c (c.slug)}
      <CromoTile cromo={c} ganado={!!ganados[c.slug]} on:open={() => abrir(c)} />
    {/each}
  </div>

  <p class="mb-3 text-[14px] font-bold text-text-soft/70 uppercase">Pensadores</p>
  <div class="mb-8 grid grid-cols-2 gap-x-2.5 gap-y-3.5">
    {#each pensadores as c (c.slug)}
      <CromoTile cromo={c} ganado={!!ganados[c.slug]} on:open={() => abrir(c)} />
    {/each}
  </div>

  <p class="mb-3 text-[14px] font-bold text-text-soft/70 uppercase">Corrientes</p>
  <div class="grid grid-cols-2 gap-x-2.5 gap-y-3.5">
    {#each corrientes as c (c.slug)}
      <CromoTile cromo={c} ganado={!!ganados[c.slug]} on:open={() => abrir(c)} />
    {/each}
  </div>
</div>

<CromoFicha data={ficha} on:close={() => (ficha = null)} />
