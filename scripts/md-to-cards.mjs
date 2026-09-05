#!/usr/bin/env node
// Converts a class transcription markdown into info cards (JS module format).
// Usage: node scripts/md-to-cards.mjs <input.md> [output.js] [--offset=N]
//
// --offset: desfasaje entre el número del encabezado del md (`# Clase N — …`) y
// el `num` que ve el usuario. Default -1, que es la regla del curso `nietzsche`
// (se omite su Clase 1 original). Los cursos cuyo md ya está numerado como la
// app —`modernidad`, por ejemplo— usan --offset=0.

import { readFileSync, writeFileSync } from 'fs';
import { basename } from 'path';

const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const flags = process.argv.slice(2).filter((a) => a.startsWith('--'));
const offsetFlag = flags.find((f) => f.startsWith('--offset='));
const numOffset = offsetFlag ? parseInt(offsetFlag.split('=')[1], 10) : -1;
if (Number.isNaN(numOffset)) {
  console.error('--offset espera un número entero, p. ej. --offset=0');
  process.exit(1);
}

const inputPath = args[0];
if (!inputPath) {
  console.error('Usage: node scripts/md-to-cards.mjs <input.md> [output.js]');
  process.exit(1);
}

const md = readFileSync(inputPath, 'utf-8');
const lines = md.split('\n');

// --- Extract metadata from the top of the file ---

let classTitle = '';
let source = '';
let classNum = null;
let transcriptNum = null;

for (const line of lines) {
  // # Clase N — Título
  const h1Match = line.match(/^#\s+Clase\s+(\d+)\s*[—–-]\s*(.+)/);
  if (h1Match) {
    transcriptNum = parseInt(h1Match[1]);
    classTitle = h1Match[2].trim();
    continue;
  }
  // > Fuente: URL
  const srcMatch = line.match(/>\s*Fuente:\s*(https?:\/\/\S+)/);
  if (srcMatch) {
    source = srcMatch[1];
    continue;
  }
}

// App numbering: num = transcript + offset (ver --offset arriba)
if (transcriptNum !== null) {
  classNum = transcriptNum + numOffset;
}

// --- Split by ## / ### sections ---
// Los ### son la misma granularidad de subtítulo que los ##: cada uno abre su
// propia sección, y por lo tanto su propia card con título.

const sections = [];
let currentSection = null;

for (const line of lines) {
  const headingMatch = line.match(/^#{2,3}\s+(.+)/);
  if (headingMatch) {
    if (currentSection) sections.push(currentSection);
    currentSection = { title: headingMatch[1].trim(), lines: [] };
  } else if (currentSection) {
    currentSection.lines.push(line);
  }
}
if (currentSection) sections.push(currentSection);

// --- Build cards from sections, one per paragraph ---

function cleanText(text, { keepBold = true } = {}) {
  // Primero línea por línea: las viñetas quedan como líneas propias con •, y
  // los demás saltos de línea son prosa envuelta, así que se unen con espacio.
  const out = [];
  for (const raw of text.split('\n')) {
    const line = raw.replace(/^>\s?/, '').replace(/^#{1,6}\s+/, '').trim();
    if (!line || line === '---') continue;

    const bullet = line.match(/^[-*+]\s+(.*)/);
    if (bullet) {
      out.push('• ' + bullet[1].trim());
      continue;
    }
    const prev = out[out.length - 1];
    if (prev !== undefined && !prev.startsWith('• ')) out[out.length - 1] = `${prev} ${line}`;
    else out.push(line);
  }

  // Y después lo inline, que no cruza saltos de línea. Las negritas de la
  // transcripción se conservan (RichText las renderiza); se apartan primero
  // para que la regex de itálicas no se coma sus asteriscos.
  const BOLD = '\u0000';
  return out
    .join('\n')
    .replace(/\*\*(.+?)\*\*/g, `${BOLD}$1${BOLD}`)
    .replace(/(?<!\*)\*(?!\*)([^*\n]+?)\*(?!\*)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(new RegExp(BOLD, 'g'), keepBold ? '**' : '')
    .trim();
}

function splitParagraphs(lines) {
  const paragraphs = [];
  let current = [];
  for (const line of lines) {
    if (line.trim() === '') {
      if (current.length > 0) {
        paragraphs.push(current.join('\n'));
        current = [];
      }
    } else {
      current.push(line);
    }
  }
  if (current.length > 0) paragraphs.push(current.join('\n'));
  return paragraphs;
}

const cards = [];
const skipped = [];
for (const section of sections) {
  const title = cleanText(section.title, { keepBold: false }); // el título ya va en negrita
  const paragraphs = splitParagraphs(section.lines);
  let first = true;

  for (const paragraph of paragraphs) {
    const body = cleanText(paragraph);
    if (!body || body.replace(/\*\*/g, '').length < 30) { // los ** no cuentan como texto
      if (body) skipped.push(`${title}: ${body}`);
      continue;
    }

    // La primera card de la sección muestra el título; las siguientes repiten
    // el mismo título como badge discreto (ver InfoCard.svelte).
    const card = { type: 'info', title, body };
    if (!first) card.continues = true;
    cards.push(card);
    first = false;
  }
}

// --- Output ---

const outputObj = {
  num: classNum,
  transcript: transcriptNum,
  title: classTitle,
  source,
  feed: cards,
};

function toJS(obj) {
  const q = (s) => JSON.stringify(s);
  const feedStr = obj.feed.map(card => {
    return `    {
      type: "${card.type}",${card.continues ? '\n      continues: true,' : ''}
      title: ${q(card.title)},
      body: ${q(card.body)},
    }`;
  }).join(',\n');

  return `export default {
  num: ${obj.num},
  transcript: ${obj.transcript},
  title: ${q(obj.title)},
  source: ${q(obj.source)},
  feed: [
${feedStr},
  ],
};
`;
}

const output = toJS(outputObj);

const outputPath = args[1] || inputPath.replace(/\.md$/, '.cards.js');
writeFileSync(outputPath, output);
console.log(`Generated ${cards.length} info cards → ${outputPath}`);
if (skipped.length) {
  console.log(`\nSalteados ${skipped.length} párrafo(s) de menos de 30 caracteres:`);
  for (const s of skipped) console.log(`  - ${s}`);
}
