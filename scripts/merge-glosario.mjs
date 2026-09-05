#!/usr/bin/env node
// Unifica los glosario-*.md de un curso en su glossary.js.
//
// Usage: node scripts/merge-glosario.mjs <dir-con-glosario-*.md> <salida.js>
//
// Cada archivo de bloque trae entradas en este formato:
//
//   ### slug
//   term: Immanuel Kant
//   aka: Immanuel Kant, Kant
//   kind: autor
//   when: 1724–1804
//   body: Explicación, que puede seguir en las líneas siguientes.
//
// El merge es la parte delicada: los bloques se escriben en paralelo y sin
// verse, así que puede haber slugs repetidos y —peor, porque el auto-linkeo
// se rompe en silencio— alias repetidos entre entradas distintas. Los dos
// casos se reportan y ninguno se resuelve solo.

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const dir = process.argv[2];
const outPath = process.argv[3];
if (!dir || !outPath) {
  console.error('Usage: node scripts/merge-glosario.mjs <dir> <salida.js>');
  process.exit(1);
}

const FIELDS = new Set(['term', 'aka', 'kind', 'when', 'body']);
const KINDS = new Set(['autor', 'concepto', 'obra', 'evento']);

const entries = new Map(); // slug -> { ...campos, origen }
const problems = [];

const files = readdirSync(dir)
  .filter((f) => /^glosario-.*\.md$/.test(f))
  .sort();

if (!files.length) {
  console.error(`No hay glosario-*.md en ${dir}`);
  process.exit(1);
}

for (const file of files) {
  const text = readFileSync(join(dir, file), 'utf-8');
  let slug = null;
  let field = null;

  for (const line of text.split('\n')) {
    const head = line.match(/^###\s+(\S+)\s*$/);
    if (head) {
      slug = head[1];
      field = null;
      if (entries.has(slug)) {
        problems.push(
          `slug duplicado "${slug}": está en ${entries.get(slug).origen} y en ${file}`,
        );
        slug = null; // se queda la primera definición
        continue;
      }
      entries.set(slug, { origen: file });
      continue;
    }
    if (!slug) continue;

    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv && FIELDS.has(kv[1])) {
      field = kv[1];
      entries.get(slug)[field] = kv[2].trim();
      continue;
    }
    // continuación de un campo multilínea (el body, casi siempre)
    if (field && line.trim()) {
      entries.get(slug)[field] += ' ' + line.trim();
    }
  }
}

// --- validación ---

const seenAka = new Map(); // alias en minúscula -> slug que lo declaró

for (const [slug, e] of entries) {
  for (const f of ['term', 'aka', 'kind', 'when', 'body']) {
    if (!e[f]) problems.push(`"${slug}" (${e.origen}): falta el campo ${f}`);
  }
  if (e.kind && !KINDS.has(e.kind))
    problems.push(`"${slug}" (${e.origen}): kind inválido "${e.kind}"`);
  // `aka` se separa por comas, así que un `term` con coma se parte solo y el
  // nombre canónico nunca llega a matchear. Pasa con los nombres largos de
  // autor ("Charles-Louis de Secondat, barón de Montesquieu").
  if (e.term && e.term.includes(','))
    problems.push(
      `"${slug}" (${e.origen}): el term tiene una coma ("${e.term}"). Poné el ` +
        `nombre corto como term y las formas largas en aka.`,
    );

  const akas = (e.aka || '').split(',').map((a) => a.trim()).filter(Boolean);
  // el auto-linkeo de src/lib/glossary.js matchea sin distinguir mayúsculas,
  // así que acá tampoco.
  const lowerAkas = akas.map((a) => a.toLowerCase());
  if (e.term && !lowerAkas.includes(e.term.toLowerCase()))
    problems.push(`"${slug}" (${e.origen}): aka no incluye el término canónico`);

  for (const a of akas) {
    const key = a.toLowerCase();
    if (seenAka.has(key) && seenAka.get(key) !== slug)
      problems.push(
        `alias duplicado "${a}": lo declaran "${seenAka.get(key)}" y "${slug}" (${e.origen})`,
      );
    else seenAka.set(key, slug);
  }
  e.akas = akas;
}

// --- salida ---

const q = (s) => JSON.stringify(s);
const byKind = { autor: [], concepto: [], obra: [], evento: [] };
for (const [slug, e] of entries) (byKind[e.kind] || byKind.concepto).push([slug, e]);

let body = '';
for (const kind of ['autor', 'concepto', 'obra', 'evento']) {
  const group = byKind[kind].sort((a, b) => a[0].localeCompare(b[0]));
  if (!group.length) continue;
  body += `  // ---------- ${kind}es ----------\n`;
  for (const [slug, e] of group) {
    // los slugs con guiones no son identificadores válidos: van entre comillas
    const key = /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(slug) ? slug : q(slug);
    body += `  ${key}: {\n`;
    body += `    term: ${q(e.term)},\n`;
    body += `    aka: [${e.akas.map(q).join(', ')}],\n`;
    body += `    kind: ${q(e.kind)},\n`;
    body += `    when: ${q(e.when)},\n`;
    body += `    body: ${q(e.body)},\n`;
    body += `  },\n`;
  }
}

const out = `// Diccionario filosófico del curso. Cada entrada se auto-linkea en las cards:
// agregar una entrada acá la vuelve clicable en todo el contenido.
//
// GENERADO por scripts/merge-glosario.mjs desde los glosario-*.md del curso.
// No lo edites a mano: editá el .md del bloque correspondiente y regenerá.
//
// Campos:
//   term  : nombre canónico que se muestra en el modal
//   aka   : formas que aparecen en el texto y deben detectarse (incluí el canónico)
//   kind  : 'autor' | 'concepto' | 'obra' | 'evento'
//   when  : fechas de referencia (autor: nacimiento–muerte; resto: época)
//   body  : explicación breve y en profundidad

export const GLOSSARY = {
${body}};
`;

writeFileSync(outPath, out);
console.log(
  `${entries.size} términos de ${files.length} bloque(s) (${files.join(', ')}) → ${outPath}`,
);
if (problems.length) {
  console.log(`\n⚠  ${problems.length} problema(s):`);
  for (const p of problems) console.log(`   - ${p}`);
  process.exit(1);
}
console.log('Sin problemas.');
