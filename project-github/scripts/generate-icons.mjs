#!/usr/bin/env node
// Generates SVG icons for PWA (PNG conversion happens in CI via puppeteer)
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'icons');
mkdirSync(outDir, { recursive: true });

const svg = (size) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${Math.round(size*0.22)}" fill="#0a0a0c"/>
  <circle cx="${size*0.5}" cy="${size*0.505}" r="${size*0.30}" stroke="#F5F5F7" stroke-width="${size*0.042}" fill="none"/>
  <polygon points="${size*0.5-size*0.085},${size*0.505-size*0.155} ${size*0.5+size*0.147},${size*0.505} ${size*0.5-size*0.085},${size*0.505+size*0.155}" fill="#F5F5F7"/>
</svg>`;

[192, 512].forEach(size => {
  writeFileSync(join(outDir, `icon-${size}.svg`), svg(size));
  console.log(`icon-${size}.svg saved`);
});
