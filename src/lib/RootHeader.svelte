<script>
  // Header de las pantallas raíz (Inicio, Cursos, Glosario, Cromos).
  //
  // Portada compartida: la lámina en un bloque recto, con el título encima.
  // Sin arco ni disco decorativo (el arco es un motivo romano, no griego) —
  // la única forma es la de la propia lámina.
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
  // Prueba: trama de puntos (grabado antiguo) sobre la lámina. Sólo en Inicio
  // por ahora — si funciona se puede sumar a los otros headers.
  export let halftone = false;
</script>

<header class="cover-wrap mb-8">
  <div class="cover" style="--wash: {wash}">
    <img
      class="cover-img"
      style="object-position: {position}; scale: {zoom}; transform-origin: {origin}"
      src={img}
      alt=""
    />
    {#if halftone}<span class="cover-dots" aria-hidden="true"></span>{/if}
    <div class="cover-text">
      <h1
        class="m-0 font-serif text-[clamp(26px,8vw,34px)] leading-none font-semibold tracking-[0.08em] text-text uppercase"
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
  .cover {
    position: relative;
    background: var(--bg);
    overflow: hidden;
    border-radius: 0 0 4px 4px;
  }
  .cover-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: calc(1 - var(--wash));
  }
  /* La trama en sí: puntos negros translúcidos con "multiply" — el negro
     puro oscurece cada superficie en la misma PROPORCIÓN sin importar su
     color de base (final = base × (1 − alpha)), así que se ve igual de
     sutil sobre una lámina clara u oscura. No sigue el brillo real píxel a
     píxel (eso pide leer la imagen, no un truco de CSS), pero a este
     tamaño lee como trama de impresión vieja, sin desaturar la lámina.
     Pareja en toda la lámina — se probó cargarla más en las esquinas
     (vignette) pero sumaba ruido, no aportaba. */
  .cover-dots {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgb(0 0 0 / 2%) 42%, transparent 43%);
    background-size: 5px 5px;
    mix-blend-mode: multiply;
  }
  .cover-text {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 34px 16px;
  }
</style>
