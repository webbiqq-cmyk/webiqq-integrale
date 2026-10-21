// Shared markup: page shell, header, footer, images, cards.

import { readFileSync } from 'node:fs';
import { business, nav } from '../src/content/business.mjs';
import { photos } from '../src/content/photos.mjs';
import { categories } from '../src/content/products.mjs';
import { renderView, colourVars } from './mockups.mjs';

const images = JSON.parse(readFileSync(new URL('../src/content/images.json', import.meta.url)));
const monogramSvg = readFileSync(new URL('../src/assets/brand/monogram.svg', import.meta.url), 'utf8')
  .replace('<svg ', '<svg class="monogram" aria-hidden="true" focusable="false" ');

// Joins template parts, flattening arrays and dropping null/false/undefined.
export function html(strings, ...values) {
  let out = '';
  strings.forEach((s, i) => {
    out += s;
    if (i < values.length) out += flat(values[i]);
  });
  return out;
}
const flat = (v) => (Array.isArray(v) ? v.map(flat).join('') : v === null || v === false || v === undefined ? '' : String(v));

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const ext = (href, label) => `<a href="${href}" target="_blank" rel="noopener">${label}<span class="vh"> (opens in a new tab)</span></a>`;

export const instagramLink = (label = `@${business.instagram.handle}`) => ext(business.instagram.url, esc(label));

export const monogram = monogramSvg;

export const categoryLabel = (id) => categories.find((c) => c.id === id)?.label ?? id;

// ---------- Images ----------

export function srcset(key, format) {
  return images[key].sizes.map((w) => `/assets/img/${key}-${w}.${format} ${w}w`).join(', ');
}

export function largest(key) {
  return `/assets/img/${key}-${images[key].sizes[0]}.jpg`;
}

/**
 * <picture> for a catalogued photo. Every image gets intrinsic width/height
 * (no layout shift), alt text from the catalogue, and focal points as CSS
 * variables used by object-position in cropping frames.
 */
export function picture(key, { sizes = '100vw', eager = false, alt } = {}) {
  const img = images[key];
  const meta = photos[key];
  if (!img || !meta) throw new Error(`Unknown photo: ${key}`);
  const mid = img.sizes.find((w) => w <= 960) ?? img.sizes[0];
  const pos = meta.pos ?? '50% 50%';
  const posM = meta.posMobile ?? pos;
  return html`<picture>
<source type="image/webp" srcset="${srcset(key, 'webp')}" sizes="${sizes}">
<img src="/assets/img/${key}-${mid}.jpg" srcset="${srcset(key, 'jpg')}" sizes="${sizes}" width="${img.w}" height="${img.h}" alt="${esc(alt ?? meta.alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" style="--pos:${pos};--pos-m:${posM}">
</picture>`;
}

/**
 * A figure with a frame of fixed aspect ratio and an optional caption.
 * ratio: 'natural' or a CSS aspect-ratio such as '4 / 5'.
 */
export function figure(key, { ratio = 'natural', sizes, eager, caption = true, date = true, cls = '' } = {}) {
  const meta = photos[key];
  const img = images[key];
  const r = ratio === 'natural' ? `${img.w} / ${img.h}` : ratio;
  const text = caption === true ? meta.caption : caption;
  return html`<figure class="fig ${cls}">
<div class="frame" style="aspect-ratio:${r}">${picture(key, { sizes, eager })}</div>
${text ? html`<figcaption>${esc(text)}${date && meta.date ? html`<span class="date">${meta.date}</span>` : ''}</figcaption>` : ''}
</figure>`;
}

// ---------- Products ----------

export function productCard(p, { sizes = '(min-width: 1100px) 25vw, 50vw', headingLevel = 3 } = {}) {
  const view = p.views[0];
  const colour = p.colours?.[0];
  const h = `h${headingLevel}`;
  return html`<article class="product-card" data-category="${p.category}">
<a href="/shop/${p.slug}" class="product-link">
  <div class="stage" style="${colourVars(colour)}">${renderView(p, view)}</div>
  <${h} class="product-name">${esc(p.name)}</${h}>
</a>
<p class="product-meta"><span>${categoryLabel(p.category)}</span>${p.colours?.length > 1 ? html`<span>${p.colours.length} colours</span>` : ''}${p.concept ? '<span class="tag">Concept</span>' : ''}</p>
</article>`;
}

// ---------- Page shell ----------

function header(active) {
  return html`<header class="site-header">
<div class="wrap header-inner">
  <a class="brand" href="/" aria-label="integrale, home">${monogram}<span class="wordmark" aria-hidden="true">integrale</span></a>
  <nav class="primary-nav" aria-label="Main">
    <ul>${nav.map((n) => html`<li><a href="${n.href}"${active === n.key ? ' aria-current="page"' : ''}>${n.label}</a></li>`)}</ul>
  </nav>
  <div class="header-actions">
    <button type="button" class="list-button" data-list-open aria-haspopup="dialog">List <span class="count" data-list-count>0</span><span class="vh"> items</span></button>
    <button type="button" class="menu-button" data-menu-open aria-expanded="false" aria-controls="mobile-menu">Menu</button>
  </div>
</div>
</header>
<div class="mobile-menu" id="mobile-menu" hidden>
  <div class="wrap mobile-menu-top">
    <a class="brand" href="/" aria-label="integrale, home">${monogram}<span class="wordmark" aria-hidden="true">integrale</span></a>
    <button type="button" class="menu-button" data-menu-close>Close</button>
  </div>
  <nav class="wrap" aria-label="Main">
    <ul>${nav.map((n) => html`<li><a href="${n.href}"${active === n.key ? ' aria-current="page"' : ''}>${n.label}</a></li>`)}</ul>
  </nav>
  <p class="wrap mobile-menu-foot">${business.location.label}, ${business.location.country} · ${instagramLink()}</p>
</div>`;
}

function footer() {
  return html`<footer class="site-footer">
<div class="wrap footer-grid">
  <div class="footer-brand">
    <a class="brand" href="/" aria-label="integrale, home">${monogram}<span class="wordmark" aria-hidden="true">integrale</span></a>
    <p>An automotive studio, café and shop at ${business.location.label}, ${business.location.country}.</p>
  </div>
  <nav class="footer-nav" aria-label="Footer">
    <h2 class="label">Explore</h2>
    <ul>${nav.map((n) => html`<li><a href="${n.href}">${n.label}</a></li>`)}</ul>
  </nav>
  <div class="footer-nav">
    <h2 class="label">Find us</h2>
    <ul>
      <li>${ext(business.location.mapsUrl, 'Directions')}</li>
      <li>${instagramLink('Instagram')}</li>
    </ul>
  </div>
</div>
<div class="wrap footer-base">
  <p>Concept website for integrale, prepared by WebiQQ. Menu items and shop pieces shown are samples and proposals.</p>
</div>
</footer>`;
}

function listDialog() {
  return html`<dialog class="drawer" id="list-dialog" aria-labelledby="list-title">
<div class="drawer-inner">
  <div class="drawer-head">
    <h2 id="list-title">Your list</h2>
    <button type="button" class="text-button" data-list-close>Close</button>
  </div>
  <p class="drawer-note">There is no online checkout. Your list is kept on this device only, so you can show it at the counter. Nothing is sent anywhere.</p>
  <div data-list-body></div>
  <p class="status" role="status" data-list-status></p>
</div>
</dialog>`;
}

export function page({ title, description, active, body, path = '/' }) {
  const fullTitle = title ? `${title} — integrale` : 'integrale — Studio, café and shop at Al Liwan, Hamala';
  return html`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description ?? business.description)}">
<meta name="theme-color" content="#F4F1EA">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description ?? business.description)}">
<meta property="og:image" content="/assets/img/diablo-interior-960.jpg">
<link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/newsreader.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/hanken-grotesk.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">
<script>document.documentElement.classList.add('js')</script>
<script src="/assets/js/site.js" defer></script>
</head>
<body data-path="${path}">
<a class="skip-link" href="#main">Skip to content</a>
${header(active)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
${listDialog()}
</body>
</html>
`;
}
