# Cómo se arma una clase

Guía para producir el contenido de una clase de forma consistente. La referencia
viva es `src/content/clase02.js` (la Clase 1 de la app).

## Numeración

- `num` = número que ve el usuario en la app.
- `transcript` = número del archivo en `../filosofia/yale-filosofia/transcripciones/`.
- Relación: **`transcript = num + 1`** (se omite la Clase 1 original, "Introducción al curso").

## El feed

Cada clase es un array `feed` de **cards** que se scrollean de a una (full-height).
Dos tipos, intercalados: **unas cards de info y luego las cards de quiz que las evalúan.**

### Card de info — resume una idea de la clase

```js
{ type: "info", tag: "Epistemología", title: "Descartes y la duda radical", body: "..." }
```

- `tag`: categoría corta (Panorama, Idea central, Contrato social, Kant…).
- `title`: título del concepto.
- `body`: **resumen fiel de la clase**. 40–70 palabras. Tono sobrio y claro, sin
  chistes ni coloquialismos propios. Fidelidad al contenido por encima del estilo.

### Card de quiz — pone a prueba lo anterior

```js
{
  type: "quiz",
  question: "El cogito establece que la única certeza indudable es…",
  options: ["...", "...", "...", "..."],
  answer: 2,            // índice (0-based) de la opción correcta
  explain: "Por qué es correcta, en 1–2 frases.",
}
```

- Preguntas **exigentes**: apuntan a comprensión, no a reconocimiento.
  Evitá "¿quién dijo X?"; preferí "¿en qué se diferencia A de B?".
- **Distractores plausibles**: idealmente la posición de otro pensador de la clase.
- 3–4 opciones. `explain` siempre presente.

### Ritmo

~2 cards de info y después sus 1–2 quizzes. Empezá con una card de panorama y
cerrá con una de síntesis. Una clase típica: ~12–16 info + ~8 quiz.

## Glosario (auto-linkeo)

Los términos se vuelven clicables solos. Para cada autor/concepto/obra/evento
nuevo que aparezca en las cards, agregá una entrada en `src/content/glossary.js`:

```js
kant: {
  term: "Immanuel Kant",
  aka: ["Immanuel Kant", "Kant"],   // formas que aparecen en el texto
  kind: "autor",                     // autor | concepto | obra | evento
  when: "1724–1804",                 // fechas de referencia
  body: "Explicación breve y en profundidad.",
}
```

- No dupliques slugs ni alias ya existentes (el glosario es acumulativo entre clases).
- `when`: autores = nacimiento–muerte; conceptos/obras/eventos = época o año de origen.
- No agregues términos genéricos (p. ej. "razón") que aparecerían por todos lados.

## Activar la clase

1. Creá `src/content/claseNN.js` (NN = `num` con cero, p. ej. `clase05.js`).
2. En `src/content/classes.js`, importá el archivo y asignálo al `content` de la
   entrada correspondiente (deja de estar `null` → aparece desbloqueada).
3. Validá: `npm run check`.

## Atajo

Con Claude Code: `/nueva-clase <num>` hace todo lo anterior desde la transcripción.
