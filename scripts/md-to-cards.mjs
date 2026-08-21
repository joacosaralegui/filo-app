#!/usr/bin/env node
// Converts a class transcription markdown into info cards (JS module format).
// Usage: node scripts/md-to-cards.mjs <input.md> [output.js]

import { readFileSync, writeFileSync } from 'fs';
import { basename } from 'path';

const inputPath = process.argv[2];
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

// App numbering: num = transcript - 1 (clase 1 original is skipped)
if (transcriptNum !== null) {
  classNum = transcriptNum - 1;
}

// --- Split by ## sections ---

const sections = [];
let currentSection = null;

for (const line of lines) {
  const h2Match = line.match(/^##\s+(.+)/);
  if (h2Match) {
    if (currentSection) sections.push(currentSection);
    currentSection = { title: h2Match[1].trim(), lines: [] };
  } else if (currentSection) {
    currentSection.lines.push(line);
  }
}
if (currentSection) sections.push(currentSection);

// --- Build cards from sections, one per paragraph ---

function cleanText(text) {
  return text
    .replace(/^---$/gm, '')
    .replace(/^>\s?/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
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

function guessTag(title) {
  const lower = title.toLowerCase();
  if (lower.includes('conclusi') || lower.includes('cierre') || lower.includes('legado')) return 'Cierre';
  if (lower.includes('palabra') || lower.includes('clave')) return 'Palabra clave';
  if (lower.includes('modelo')) return 'Modelo';
  if (lower.includes('panorama') || lower.includes('introducc')) return 'Panorama';
  if (lower.includes('revoluc')) return 'Revolución';
  return 'Idea central';
}

const cards = [];
for (const section of sections) {
  const tag = guessTag(section.title);
  const paragraphs = splitParagraphs(section.lines);

  let sectionTag = tag;
  let startIdx = 0;

  // Check first paragraph for > tag: directive
  if (paragraphs.length > 0) {
    const tagMatch = paragraphs[0].match(/^>\s*tag:\s*(.+)/i);
    if (tagMatch) {
      sectionTag = tagMatch[1].trim();
      startIdx = 1;
    }
  }

  for (let i = startIdx; i < paragraphs.length; i++) {
    const body = cleanText(paragraphs[i]);
    if (!body || body.length < 30) continue;

    cards.push({
      type: 'info',
      tag: sectionTag,
      title: cleanText(section.title) + (paragraphs.length - startIdx > 1 ? ` (${i - startIdx + 1})` : ''),
      body,
    });
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
  const feedStr = obj.feed.map(card => {
    const escaped = (s) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    return `    {
      type: "${card.type}",
      tag: "${escaped(card.tag)}",
      title: "${escaped(card.title)}",
      body: "${escaped(card.body)}",
    }`;
  }).join(',\n');

  return `export default {
  num: ${obj.num},
  transcript: ${obj.transcript},
  title: "${obj.title}",
  source: "${obj.source}",
  feed: [
${feedStr},
  ],
};
`;
}

const output = toJS(outputObj);

const outputPath = process.argv[3] || inputPath.replace(/\.md$/, '.cards.js');
writeFileSync(outputPath, output);
console.log(`Generated ${cards.length} info cards → ${outputPath}`);
