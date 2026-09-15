// Progreso de lectura de la clase actual, en memoria (no se persiste). Lo
// escribe ClassView mientras scrollea el feed y lo lee BottomNav para pintar
// su borde superior como barra de avance; `null` cuando no hay ninguna clase
// abierta, así la nav vuelve a su borde de línea normal.
import { writable } from "svelte/store";

export const readingProgress = writable(null);
