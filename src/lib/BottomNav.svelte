<script>
  // Barra de navegación inferior: cuatro destinos raíz.
  //
  //   Inicio     dónde quedaste, desafío, álbum
  //   Cursos     el catálogo
  //   Recorrido  el curso que estás haciendo; sin ninguno, lleva a Cursos
  //   Álbum      la colección
  //
  // No aparece dentro de una clase ni en el desafío: ahí el feed es inmersivo
  // (pantalla completa con scroll-snap) y una barra fija le comería alto y
  // competiría con el gesto de avanzar.
  //
  // Sin texto: sólo íconos. El ítem activo va dentro de una píldora rellena
  // —es la única marca de dónde estás, así que tiene que ser una mancha de
  // color y no un cambio de tono—, y el label viaja en `aria-label` para que
  // el lector de pantalla siga teniendo el nombre.
  import { createEventDispatcher } from "svelte";
  import { progress } from "./progress.js";

  export let active = "inicio"; // "inicio" | "recorrido" | "cursos" | "album"

  const dispatch = createEventDispatcher();

  // El curso actual es el último que tocaste. Sin ninguno el ítem NO se apaga:
  // lleva a Cursos, que es exactamente lo que hace falta para tener uno. Un
  // tab deshabilitado es una pared que no explica nada.
  $: cursoId = $progress.lastCourse || null;

  const items = [
    {
      id: "inicio",
      label: "Inicio",
      paths: ["M3 10.5 12 3l9 7.5M5.5 9.5V20h13V9.5"],
    },
    {
      id: "cursos",
      label: "Cursos",
      paths: [
        "M4 4.5h6a2.5 2.5 0 0 1 2 2 2.5 2.5 0 0 1 2-2h6v13h-6a2.5 2.5 0 0 0-2 2 2.5 2.5 0 0 0-2-2H4zM12 6.5v13",
      ],
    },
    {
      id: "recorrido",
      label: "Recorrido",
      // ruta con codo: de dónde saliste (el punto) hacia dónde vas (la punta)
      paths: ["M5 16.4V9.5A4 4 0 0 1 9 5.5h7.4", "M14.3 3.3 16.8 5.5 14.3 7.7"],
      dots: [[5, 18.7]],
    },
    { id: "album", label: "Álbum", grid: true },
  ];
</script>

<nav
  class="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-[6px]"
>
  <div class="mx-auto flex max-w-[480px] items-stretch">
    {#each items as it (it.id)}
      {@const on = active === it.id}
      <button
        class="flex flex-1 cursor-pointer items-center justify-center border-0 bg-transparent py-[13px] [font-family:inherit] {on
          ? 'text-accent'
          : 'text-text-soft/65'}"
        on:click={() => dispatch(it.id, it.id === "recorrido" ? { id: cursoId } : undefined)}
        aria-current={on ? "page" : undefined}
        aria-label={it.label}
      >
        <span
          class="flex h-9 w-[58px] items-center justify-center rounded-full transition-colors duration-200 {on
            ? 'bg-accent text-on-accent'
            : ''}"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            {#if it.grid}
              <g fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"
                ><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect
                  x="13.5"
                  y="3.5"
                  width="7"
                  height="7"
                  rx="1.5"
                /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect
                  x="13.5"
                  y="13.5"
                  width="7"
                  height="7"
                  rx="1.5"
                /></g
              >
            {:else}
              {#each it.paths as d}
                <path
                  {d}
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.9"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              {/each}
              {#each it.dots || [] as [cx, cy]}
                <circle {cx} {cy} r="2.1" fill="currentColor" />
              {/each}
            {/if}
          </svg>
        </span>
      </button>
    {/each}
  </div>
</nav>
