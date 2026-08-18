// Corrección de respuestas cortas, sin modelos: sólo comparación de texto.
//
// Sirve para preguntas cuya respuesta es una palabra o dos (un concepto, un
// término, un nombre). Es recall real —el estudiante escribe de memoria en vez
// de elegir entre opciones— y a la vez es 100% predecible: no depende del
// dispositivo, no descarga nada y responde al instante.
//
// Tres pasos: normalizar, comparar contra varias respuestas aceptadas, y
// perdonar erratas con distancia de Levenshtein.

// Artículos y preposiciones que se ignoran: "la durée" == "durée".
const VACIAS = /\b(el|la|los|las|un|una|unos|unas|al|del|de|a)\b/g;

/**
 * Deja el texto comparable: minúsculas, sin tildes, sin puntuación,
 * sin artículos y con los espacios colapsados.
 */
export function normalizar(texto) {
  return (texto || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // tildes y diéresis
    .replace(/[^\p{L}\p{N}\s]/gu, " ") // puntuación
    .replace(VACIAS, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Distancia de edición (Levenshtein), implementación de dos filas. */
export function distancia(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  let previa = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const fila = [i];
    for (let j = 1; j <= b.length; j++) {
      fila[j] = Math.min(
        previa[j] + 1, // borrar
        fila[j - 1] + 1, // insertar
        previa[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1) // sustituir
      );
    }
    previa = fila;
  }
  return previa[b.length];
}

/**
 * Cuántas erratas se perdonan para una respuesta esperada ya normalizada.
 *
 * Una cada 5 caracteres, pero con un tope que depende del largo: en palabras
 * cortas casi no se perdona nada. Sin ese tope, "arte" y "parte" —que están a
 * una sola edición— contarían como la misma respuesta.
 */
export function erratasPermitidas(esperada) {
  const porLargo = Math.floor(esperada.length / 5);
  const tope = Math.max(0, Math.floor((esperada.length - 1) / 3));
  return Math.min(porLargo, tope);
}

/**
 * ¿La respuesta del estudiante coincide con alguna de las aceptadas?
 *
 * @param {string} respuesta  lo que escribió el estudiante
 * @param {string[]} aceptadas  formas válidas; la primera es la canónica
 * @returns {{ correcta: boolean, cerca: boolean }}
 *   `cerca` marca el casi-acierto (una errata más de las permitidas), útil
 *   para avisar "revisá cómo lo escribiste" en vez de darlo por perdido.
 */
export function corregirCorta(respuesta, aceptadas = []) {
  const escrita = normalizar(respuesta);
  if (!escrita) return { correcta: false, cerca: false };

  let correcta = false;
  let cerca = false;

  for (const aceptada of aceptadas) {
    const esperada = normalizar(aceptada);
    if (!esperada) continue;
    const d = distancia(escrita, esperada);
    const max = erratasPermitidas(esperada);
    if (d <= max) correcta = true;
    else if (d <= max + 1) cerca = true;
  }

  return { correcta, cerca: correcta ? false : cerca };
}
