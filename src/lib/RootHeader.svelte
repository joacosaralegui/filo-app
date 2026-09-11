<script>
  // Header de las pantallas raíz (Inicio, Cursos, Glosario, Álbum).
  //
  // Es la portada en arco de la home, ahora compartida: la lámina recortada en
  // domo, un disco ocre asomando por detrás y el título encima. Los motivos
  // (el arco y los discos de color plano) salen de la propia ilustración, y son
  // los que hacen que interfaz e ilustración se lean como una sola pieza.
  //
  // Las pantallas de detalle usan la otra familia (back + título, DetailHeader).
  export let img;
  export let title;
  // Encuadre de la lámina dentro del arco: cada una tiene su punto de interés
  // en otra altura (`object-position`).
  export let position = "50% 34%";
  // Cuánto se lava la lámina (0–1). Sin velo detrás del texto, la única manera
  // de que el título se lea es bajarle el contraste a la ilustración: la
  // apagamos contra el color de fondo. Cada pantalla pide lo suyo — la de
  // Sócrates ya es pálida en el centro y aguanta el título sin tocarla; las del
  // díptico tienen el disco ocre y la piedra justo detrás del texto.
  export let wash = 0;
  // Acercamiento sobre la lámina. Los headers no muestran la escena entera:
  // entran a un detalle (la mano en la barbilla, el canto de los libros, el
  // frontón) y lo dejan enorme. `position` elige QUÉ queda en el centro y
  // `zoom` cuán cerca. Va por la propiedad `scale`, que es independiente de
  // `transform` — así no pelea con nada que anime el elemento.
  export let zoom = 1;
  // Punto fijo del acercamiento (`transform-origin`). Por defecto el centro:
  // `zoom` agranda lo que haya en el medio del arco. Para acercarse a un
  // detalle que no está en el medio (el libro abierto de la lámina de Cursos,
  // abajo a la derecha), se corre el origen hacia él.
  export let origin = "50% 50%";
</script>

<header class="cover-wrap mb-8">
  <span class="cover-disc" aria-hidden="true"></span>
  <div class="cover" style="--wash: {wash}">
    <img class="cover-img" style="object-position: {position}; scale: {zoom}; transform-origin: {origin}" src={img} alt="" />
    <div class="cover-text">
      <h1
        class="m-0 font-serif text-[clamp(30px,9.5vw,42px)] leading-none font-semibold tracking-[0.08em] text-text uppercase"
      >
        {title}
      </h1>
    </div>
  </div>
</header>

<style>
  .cover-wrap {
    position: relative;
  }
  .cover-disc {
    position: absolute;
    top: 16px;
    right: -12px;
    width: 132px;
    height: 132px;
    border-radius: 50%;
    background: color-mix(in srgb, var(--accent-2) 60%, transparent);
  }
  .cover {
    position: relative;
    /* el fondo de la app asomando por debajo: es contra esto que se lava */
    background: var(--bg);
    overflow: hidden;
    height: 25dvh;
    min-height: 180px;
    /* radio enorme arriba = domo; el navegador lo recorta a la mitad del ancho */
    border-radius: 100vw 100vw 20px 20px;
  }
  .cover-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: calc(1 - var(--wash));
  }
  .cover-text {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    /* Centrado, el título se lee alto dentro del arco: lo bajamos. */
    padding-top: 50px;
  }
</style>
