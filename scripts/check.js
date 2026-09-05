// Validación de contenido: corré `npm run check`.
// Chequea las clases activas y el glosario, y sale con código 1 si hay errores.
import { COURSES } from "../src/content/courses.js";

// El contenido vive por curso (src/content/<id>/curso.js): se cargan todos y se
// validan juntos. Cada curso trae sus clases y su propio glosario.
const CONTENT = [];
for (const meta of COURSES) CONTENT.push({ id: meta.id, ...(await meta.load()).default });
const CLASSES = CONTENT.flatMap((c) => c.classes.map((k) => ({ ...k, courseId: c.id })));

const errors = [];
const warnings = [];
const KINDS = new Set(["autor", "concepto", "obra", "evento"]);

// ---- clases ----
for (const c of CLASSES) {
  const tag = `${c.courseId} · Clase ${c.num}`;
  // El desfasaje entre `num` y `transcript` depende del curso: `nietzsche` omite
  // su Clase 1 original (offset -1), `modernidad` numera sus md como la app
  // (offset 0). El curso lo declara en `numOffset`; si no declara `transcript`,
  // no hay nada que chequear.
  const offset = COURSES.find((x) => x.id === c.courseId)?.numOffset ?? -1;
  if (c.transcript != null && c.transcript + offset !== c.num)
    warnings.push(
      `${tag}: transcript (${c.transcript}) + offset (${offset}) != num (${c.num})`,
    );
  if (!c.content) continue; // bloqueada: nada que validar

  const L = c.content;
  if (L.num !== c.num) errors.push(`${tag}: content.num (${L.num}) != ${c.num}`);
  if (!Array.isArray(L.feed) || L.feed.length === 0) {
    errors.push(`${tag}: feed vacío`);
    continue;
  }
  // Para detectar sesgo sistemático de longitud en las opciones (ver abajo).
  let quizTotal = 0;
  let quizMasLarga = 0;

  L.feed.forEach((card, i) => {
    const at = `${tag} · card ${i + 1}`;
    if (card.type === "info") {
      if (!card.title) errors.push(`${at}: info sin title`);
      if (!card.body) errors.push(`${at}: info sin body`);
    } else if (card.type === "quiz") {
      if (!card.question) errors.push(`${at}: quiz sin question`);
      const n = Array.isArray(card.options) ? card.options.length : 0;
      if (n < 2) errors.push(`${at}: quiz necesita >= 2 opciones`);
      if (!Number.isInteger(card.answer) || card.answer < 0 || card.answer >= n)
        errors.push(`${at}: answer fuera de rango (${card.answer} / ${n})`);
      if (!card.explain) warnings.push(`${at}: quiz sin explain`);

      // La correcta no debe delatarse por su forma: si se puede acertar sin
      // saber el tema —eligiendo la más larga o la única con guiones largos—
      // el quiz mide astucia, no contenido. El arreglo es acortar la correcta
      // (el matiz va en `explain`), no inflar los distractores.
      if (n >= 2 && Array.isArray(card.options) && card.options[card.answer]) {
        const largos = card.options.map((o) => String(o).length);
        const mayorOtro = Math.max(...largos.filter((_, k) => k !== card.answer));
        if (largos[card.answer] > mayorOtro * 1.25)
          warnings.push(
            `${at}: la correcta es mucho más larga (${largos[card.answer]} vs ${mayorOtro}); ` +
              `acortala al largo de los distractores y pasá el matiz a explain`
          );

        const conRaya = card.options.map((o) => /[—–]/.test(String(o)));
        if (conRaya[card.answer] && conRaya.filter(Boolean).length === 1)
          warnings.push(`${at}: la correcta es la única con guion largo (—)`);

        if (largos[card.answer] === Math.max(...largos)) quizMasLarga += 1;
        quizTotal += 1;
      }
    } else if (card.type === "match") {
      if (!card.question) errors.push(`${at}: match sin question`);
      const ps = Array.isArray(card.pairs) ? card.pairs : [];
      if (ps.length < 2) errors.push(`${at}: match necesita >= 2 pares`);
      if (ps.length > 5) warnings.push(`${at}: match con ${ps.length} pares (>5, puede no entrar)`);
      ps.forEach((p, k) => {
        if (!p || !p.left || !p.right) errors.push(`${at}: par ${k + 1} sin left/right`);
      });
      if (!card.explain) warnings.push(`${at}: match sin explain`);
    } else if (card.type === "classify") {
      if (!card.question) errors.push(`${at}: classify sin question`);
      if (!Array.isArray(card.groups) || card.groups.length !== 2)
        errors.push(`${at}: classify necesita exactamente 2 groups`);
      const its = Array.isArray(card.items) ? card.items : [];
      if (its.length < 2) errors.push(`${at}: classify necesita >= 2 ítems`);
      if (its.length > 6) warnings.push(`${at}: classify con ${its.length} ítems (>6, puede no entrar)`);
      its.forEach((it, k) => {
        if (!it || !it.text) errors.push(`${at}: ítem ${k + 1} sin text`);
        if (it && (it.group !== 0 && it.group !== 1))
          errors.push(`${at}: ítem ${k + 1} con group inválido (${it && it.group})`);
      });
      if (!card.explain) warnings.push(`${at}: classify sin explain`);
    } else if (card.type === "short") {
      if (!card.question) errors.push(`${at}: short sin question`);
      const as = Array.isArray(card.answers) ? card.answers : [];
      if (as.length < 1) errors.push(`${at}: short necesita al menos 1 answer`);
      as.forEach((a, k) => {
        if (typeof a !== "string" || !a.trim())
          errors.push(`${at}: answer ${k + 1} vacía`);
        // El formato sólo corrige texto: si la respuesta esperada es larga, la
        // comparación deja de ser confiable y conviene un quiz.
        else if (a.trim().split(/\s+/).length > 3)
          warnings.push(`${at}: answer "${a}" tiene >3 palabras (usá quiz)`);
      });
      if (!card.explain) warnings.push(`${at}: short sin explain`);
    } else {
      errors.push(`${at}: type inválido (${card.type})`);
    }
  });

  // Sesgo sistemático: aunque cada quiz por separado parezca razonable, si la
  // correcta suele ser la más larga, "elegir la más larga" se vuelve una
  // estrategia ganadora y el quiz deja de medir el contenido. Con 4 opciones,
  // el azar da ~25%.
  if (quizTotal >= 5) {
    const pct = Math.round((quizMasLarga / quizTotal) * 100);
    if (pct > 50)
      warnings.push(
        `${tag}: la correcta es la opción más larga en ${quizMasLarga}/${quizTotal} quizzes (${pct}%, ` +
          `azar ~25%): "elegir la más larga" acierta casi siempre`
      );
  }
}

// ---- glosario ----
// Por curso: dos cursos distintos pueden repetir un slug o un alias sin que sea
// un problema, porque nunca están cargados a la vez.
let terms = 0;
for (const course of CONTENT) {
  const seenAlias = new Map();
  for (const [slug, e] of Object.entries(course.glossary)) {
    terms += 1;
    const tag = `${course.id} · glosario · ${slug}`;
    if (!e.term) errors.push(`${tag}: sin term`);
    if (!KINDS.has(e.kind)) errors.push(`${tag}: kind inválido (${e.kind})`);
    if (!e.body) errors.push(`${tag}: sin body`);
    if (!e.when) warnings.push(`${tag}: sin when (fechas)`);
    const akas = e.aka && e.aka.length ? e.aka : [e.term];
    for (const a of akas) {
      const k = String(a).toLowerCase();
      if (seenAlias.has(k) && seenAlias.get(k) !== slug)
        warnings.push(`${tag}: alias "${a}" ya usado por "${seenAlias.get(k)}"`);
      else seenAlias.set(k, slug);
    }
  }
}

// ---- reporte ----
for (const w of warnings) console.log("⚠ ", w);
for (const e of errors) console.log("✗ ", e);

const active = CLASSES.filter((c) => c.content).length;
if (errors.length) {
  console.log(`\n${errors.length} error(es), ${warnings.length} aviso(s).`);
  process.exit(1);
}
console.log(
  `\n✓ OK — ${CONTENT.length} curso(s), ${active} clase(s) activa(s), ${terms} términos. ` +
    `${warnings.length} aviso(s).`
);
