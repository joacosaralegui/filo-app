---
description: Genera y activa una nueva clase de la app desde su transcripción
---

El usuario quiere agregar una clase nueva a filo-app.

**Número de clase en la app (num):** $ARGUMENTS
Si vino vacío, preguntale cuál antes de seguir.

Seguí este proceso, respetando la guía `CONTENIDO.md` del repo:

1. **Mapeo:** `transcript = num + 1`. Ubicá la transcripción en
   `/home/joaco/joaco/filosofia/yale-filosofia/transcripciones/` cuyo archivo
   empiece con ese número (con cero adelante si es < 10).
2. **Leé `CONTENIDO.md` entera** y respetá el esquema de card, el tono (resumen
   fiel, sin fuzz), la dificultad de los quizzes y el formato de glosario. Usá
   `src/content/clase02.js` como referencia de estilo.
3. **Leé la transcripción COMPLETA** antes de escribir nada.
4. **Creá `src/content/claseNN.js`** (NN = número de `transcript` con cero, es
   decir `num + 1`; p. ej. la Clase 5 de la app → `clase06.js`, como los archivos
   ya existentes) copiando la estructura de `_plantilla.js`: `num`, `transcript`,
   `title`, `source`, y `feed[]` con cards de info y cards interactivas
   intercaladas (unas infos y después las que las evalúan). Info = resumen fiel.
   Hay **tres formatos interactivos** (ver `CONTENIDO.md` para el schema y el
   criterio de cada uno):
   - `quiz` (opción múltiple): el formato **por defecto**, uso más normal.
   - `classify` (dos columnas): para **comparar** períodos, ideas o pensadores
     contrapuestos (Ilustración vs Romanticismo, Hobbes vs Locke…).
   - `match` (conectar): para relaciones **más complejas**, emparejar
     autores↔conceptos/obras cuando hay 4–5 elementos que se cruzan.

   Usá `quiz` de base y sumá al menos un `classify` y un `match` por clase cuando
   el material lo permita. Empezá con una card de panorama y cerrá con una de
   síntesis.
5. **Alimentá el glosario** `src/content/glossary.js` con los autores/conceptos/
   obras/eventos nuevos, con fechas. No dupliques slugs ni alias existentes.
6. **Activá la clase** en `src/content/classes.js`: importá `claseNN.js` y
   asignálo al `content` de la entrada correspondiente.
7. **Validá:** corré `npm --prefix /home/joaco/joaco/filo-app run check` y
   corregí lo que marque.
8. **Mostrá un resumen** (cuántas cards info y cuántas interactivas de cada tipo
   —quiz/classify/match—, términos nuevos agregados) y **pedile al usuario que
   revise los matices filosóficos** antes de dar la clase por cerrada.

No manejes el navegador para verificar: el usuario mira el preview en vivo.
Trabajá en incrementos y mostrá el borrador para revisión.
