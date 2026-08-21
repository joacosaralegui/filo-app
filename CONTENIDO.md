# Cómo se arma una clase

Guía para producir el contenido de una clase de forma consistente. La referencia
viva es `src/content/clase02.js` (la Clase 1 de la app): las cards de info salen
de correr `scripts/md-to-cards.mjs` sobre la transcripción y las interactivas se
escriben a mano encima.

## Numeración

- `num` = número que ve el usuario en la app.
- `transcript` = número del archivo en `../filosofia/yale-filosofia/transcripciones/`.
- Relación: **`transcript = num + 1`** (se omite la Clase 1 original, "Introducción al curso").

## El feed

Cada clase es un array `feed` de **cards** que se scrollean de a una (full-height).
Dos tipos, intercalados: **unas cards de info y luego las cards de quiz que las evalúan.**

### Card de info — resume una idea de la clase

```js
{ type: "info", title: "Cogito, ergo sum", body: "..." }
{ type: "info", continues: true, title: "Cogito, ergo sum", body: "..." }
```

- `title`: título del concepto, que es el subtítulo `##` de la transcripción.
- `continues`: la sección venía de la card anterior. La primera card de cada
  subtítulo lo muestra como **título grande**; las siguientes repiten el mismo
  `title` como **badge discreto** (`↳ Cogito, ergo sum`), así el cuerpo se lee
  como continuación y igual sabés en qué subtítulo estás. Nunca numeres los
  títulos con `(1)`, `(2)`: para eso está el flag.
- `body`: **resumen fiel de la clase**. 40–70 palabras. Tono sobrio y claro, sin
  chistes ni coloquialismos propios. Fidelidad al contenido por encima del estilo.
- `tag`: categoría corta (Panorama, Idea central, Contrato social…). **Opcional
  y en retirada**: las clases viejas lo usan en cada card, las nuevas no lo
  llevan. Si está, se muestra arriba del título grande.

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
- La respuesta corrrecta tiene que ser de la misma longitud que las distractoras y mismo tono. 

### Card de clasificar — repartir en dos columnas

```js
{
  type: "classify",
  question: "¿Cada tesis es de Hobbes o de Locke?",
  groups: ["Hobbes", "Locke"],   // EXACTAMENTE 2
  items: [
    { text: "El estado de naturaleza es una guerra de todos contra todos", group: 0 },
    { text: "El gobierno se funda en el consentimiento de los gobernados", group: 1 },
    // …4–6 ítems, idealmente balanceados entre los dos grupos
  ],
  explain: "…",   // recap del criterio de la distinción
}
```

- `group`: índice (0 o 1) de la columna correcta. `answer` NO se usa acá.
- Ítems cortos (una línea). El usuario arrastra cada uno a su columna.

### Card de conectar — emparejar dos columnas

```js
{
  type: "match",
  question: "Uní cada pensador con su aporte",
  pairs: [
    { left: "Descartes", right: "Cogito, ergo sum: la duda radical" },
    { left: "Hobbes", right: "El Leviatán: la guerra de todos contra todos" },
    // …2–5 pares
  ],
  explain: "…",
}
```

- `left`: etiqueta corta (típicamente un nombre). `right`: texto más largo
  (concepto/obra). El par correcto es `left[i]` ↔ `right[i]`; la app baraja la
  columna derecha y dibuja las líneas.

### Reglas de las opciones (quiz)

**La correcta no se tiene que poder adivinar por su forma.** Si alguien que no
leyó la clase acierta con una regla simple, el quiz mide astucia y no contenido.
Las dos trampas más comunes —y las que `npm run check` detecta— son:

- **Longitud.** La correcta sale más larga porque se la escribe con todo el
  matiz. El arreglo es **acortarla**, no inflar los distractores: cuatro
  opciones largas se leen peor, sobre todo en el teléfono. Apuntá a que las
  cuatro entren en **una línea, ~45–60 caracteres**.
- **Registro.** Guiones largos (—), dos puntos, comillas o un tono más
  "académico" sólo en la correcta la delatan igual que la longitud. Escribila
  tan natural y directa como las otras tres.

**El matiz va en `explain`, no en la opción.** La opción sólo tiene que ser
reconocible; el desarrollo —el porqué, la cita, la precisión— es exactamente
para lo que está `explain`, que se muestra en una hoja aparte y tiene lugar de
sobra. Si sentís que la opción necesita una subordinada para ser correcta, esa
subordinada va abajo.

Otras reglas: nada de «todas las anteriores», ni distractores absurdos (un
distractor tiene que ser una **confusión plausible**, la respuesta que daría
alguien que entendió a medias), ni pistas gramaticales que descarten opciones.

### Card de respuesta corta — escribir el término de memoria

```js
{
  type: "short",
  question: "¿Cómo llama Bergson al tiempo vivido de la conciencia?",
  answers: ["durée", "duración"],
  explain: "…",
}
```

- `answers`: todas las formas que se dan por buenas. **La primera es la
  canónica**: es la que se muestra cuando el estudiante falla.
- Se corrige comparando texto, sin modelos: ignora mayúsculas, tildes,
  puntuación y artículos (`la Durée.` == `duree`), y perdona una errata cada
  5 caracteres. En palabras cortas casi no perdona nada, para que `arte` y
  `parte` no cuenten como lo mismo.
- **Sólo para preguntas con una respuesta de una o dos palabras.** Si la
  respuesta esperada es una explicación, usá `quiz`: no hay forma de corregir
  texto libre sin equivocarse.

### Cuándo usar cada formato

- **`quiz` (opción múltiple):** el formato **por defecto**, para el uso más
  normal. Comprender un concepto, distinguir dos posiciones, deducir la
  consecuencia de una tesis.
- **`classify` (dos columnas):** para **comparar** dos períodos, corrientes,
  ideas o pensadores contrapuestos, repartiendo rasgos/tesis entre dos polos.
  Ej.: Ilustración vs Romanticismo, Hobbes vs Locke, base vs superestructura.
- **`match` (conectar):** para relaciones **más complejas** o de varios a varios
  —emparejar autores↔conceptos/obras, causas↔efectos— cuando hay 4–5 elementos
  que se cruzan. Ej.: cada pensador con su aporte.
- **`short` (respuesta corta):** para el **término clave** que conviene saber
  escribir de memoria. Es el formato más exigente —no hay opciones donde
  apoyarse— así que reservalo para el concepto central de la clase, 1–2 por
  clase. Ej.: «durée», «Aufhebung», «plusvalía».

Todas las cards interactivas puntúan igual (con combo) y se corrigen en
verde/rojo al confirmar. `explain` siempre presente.

### Ritmo

Buscá **variedad y buen ritmo**, no una cadencia fija. Alterná info y práctica
para que ninguna racha se haga larga, y variá los formatos según lo que pida el
material: `quiz` de base, más `classify`/`match`/`short` cuando aparezca la
ocasión (una comparación fuerte, un set de pares autor↔idea, un término que
valga la pena fijar de memoria). Abrí con una card de panorama y cerrá con una
de síntesis.

**El `match` de repaso final va siempre antes de la conclusión**, nunca después:
la clase tiene que cerrar con el texto de cierre, no con un ejercicio. Como orden de magnitud, una clase ronda ~12–16 info + ~8
interactivas, pero es referencia, no cuota. Lo crítico es no saltearse ni perder ningún contenido central de la clase.

**Una card sólo evalúa lo ya presentado.** No preguntes en un `quiz`, `match` o
`short` un concepto que no apareció antes en una card de info; si el ejercicio
sintetiza varias piezas, va después de que todas se explicaron.

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
