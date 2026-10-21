// Builds the static site into dist/. No dependencies: `node build.mjs`.
//
// Content lives in src/content, shared markup in build/components.mjs and
// page templates in build/pages.mjs. Static assets in src/assets are copied
// as they are.

import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { products } from './src/content/products.mjs';
import { home, space, cafe, shop, product, visit, notFound } from './build/pages.mjs';

const out = new URL('./dist/', import.meta.url).pathname;

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(new URL('./src/assets/', import.meta.url).pathname, join(out, 'assets'), { recursive: true });

const pages = {
  'index.html': home(),
  'space.html': space(),
  'cafe.html': cafe(),
  'shop.html': shop(),
  'visit.html': visit(),
  '404.html': notFound(),
};
for (const p of products) pages[`shop/${p.slug}.html`] = product(p);

for (const [file, content] of Object.entries(pages)) {
  const path = join(out, file);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

console.log(`Built ${Object.keys(pages).length} pages into dist/`);
