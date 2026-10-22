// Shared markup: page shell, header, footer, images, cards.

import { readFileSync } from 'node:fs';
import { business, nav } from '../src/content/business.mjs';
import { footer as footerCopy } from '../src/content/copy.mjs';
import { photos } from '../src/content/photos.mjs';

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

// Multi-line copy ("A\nB") to <br>-separated HTML.
export const lines = (s) => esc(s).split('\n').join('<br>');

export const ext = (href, label) => `<a href="${href}" target="_blank" rel="noopener">${label}<span class="vh"> (opens in a new tab)</span></a>`;

export const instagramLink = (label = `@${business.instagram.handle}`) => ext(business.instagram.url, esc(label));

export const arrow = '<span class="arrow" aria-hidden="true">→</span>';
export const more = (href, label) => `<a class="more" href="${href}"><span>${label}</span>${arrow}</a>`;
export const directionsButton = (cls = 'btn') =>
  `<a class="${cls}" href="${business.location.mapsUrl}" target="_blank" rel="noopener">Get directions<span class="vh"> (opens Google Maps in a new tab)</span></a>`;

// Small eyebrow label used above headings throughout the site.
export const kicker = (text) => (text ? html`<p class="kicker">${esc(text)}</p>` : '');

// Looping ticker of names (used for the car marquee). Duplicated once so the
// 50% translate loops seamlessly; hidden from assistive tech as decoration.
export function marquee(items, label = 'Cars that have been through our doors') {
  const line = () =>
    items.map((m) => html`<span class="marquee-item">${esc(m)}</span>`).join('<span class="marquee-dot" aria-hidden="true">·</span>');
  return html`<div class="marquee" role="img" aria-label="${esc(label)}">
  <div class="marquee-track" aria-hidden="true">${line()}${line()}</div>
</div>`;
}

// Small line icons for the value strip — drawn to match the monogram's
// geometric, single-weight feel. 24x24, stroke-based, no fill.
const icons = {
  cup: '<path d="M4 8h13v6a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z"/><path d="M17 10h1.5a2.5 2.5 0 0 1 0 5H17"/><path d="M7 4.5c0 1-1 1-1 2s1 1 1 2"/><path d="M11 4.5c0 1-1 1-1 2s1 1 1 2"/>',
  car: '<path d="M4 16.5V13l1.8-4.2A2 2 0 0 1 7.6 7.5h8.8a2 2 0 0 1 1.8 1.3L20 13v3.5"/><path d="M4 16.5h16"/><circle cx="7.5" cy="16.5" r="1.6"/><circle cx="16.5" cy="16.5" r="1.6"/><path d="M4 13h16"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4.3l3 2"/>',
  matcha: '<path d="M6.5 13a5.5 5.5 0 0 0 11 0Z"/><path d="M12 3v7.5"/><path d="M9.3 4.8 14.7 9"/><path d="M14.7 4.8 9.3 9"/>',
  sandwich: '<path d="M4 11.5C4.8 7.3 8 4.5 12 4.5s7.2 2.8 8 7"/><path d="M3.5 11.5h17L19 18a2 2 0 0 1-2 1.5H7A2 2 0 0 1 5 18Z"/><path d="M4.5 14.8h15"/>',
  dessert: '<circle cx="12" cy="4.3" r="1"/><path d="M6 19h12"/><path d="M7 19 12 6l5 13"/><path d="M8.6 14.3h6.8"/>',
};

// A small circled line icon, reused by the hero value strip and the menu
// category teaser.
export function iconBadge(name, cls = 'value-icon') {
  return html`<span class="${cls}-circle"><svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] ?? ''}</svg></span>`;
}

export function valueStrip(items) {
  const row = items.map((v) => html`<li>${iconBadge(v.icon)}<span>${esc(v.label)}</span></li>`).join('');
  return html`<ul class="values">${row}</ul>`;
}

// Category teaser (no specific items or prices) — used on the homepage
// "At the bar" preview.
export function menuCategoryList(items) {
  const row = items.map((v) => html`<li>${iconBadge(v.icon, 'menu-cat-icon')}<span>${esc(v.label)}</span></li>`).join('');
  return html`<ul class="menu-cats">${row}</ul>`;
}

export const monogram = monogramSvg;

export const brand = () =>
  `<a class="brand" href="/" aria-label="integrale, home">${monogram}<img class="wordmark" src="/assets/brand/wordmark.svg" alt="" width="114" height="30"></a>`;

export const hoursText =
  business.hours.status === 'confirmed' ? business.hours.summary : 'Being confirmed — check Instagram before a special trip';

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

// ---------- Menu ----------

export function menuItem(item, currency) {
  return html`<li class="menu-item">
  <span class="menu-name">${esc(item.name)}</span>
  ${item.price !== null ? html`<span class="menu-price">${currency} ${esc(item.price)}</span>` : html`<span class="menu-price menu-price-tbc">Ask at the counter</span>`}
  ${item.note ? html`<span class="menu-note">${esc(item.note)}</span>` : ''}
</li>`;
}

// ---------- Page shell ----------

function header(active) {
  const links = nav.map((n) => html`<li><a href="${n.href}"${active === n.key ? ' aria-current="page"' : ''}>${n.label}</a></li>`);
  return html`<header class="site-header">
<div class="wrap header-inner">
  ${brand()}
  <nav class="primary-nav" aria-label="Main"><ul>${links}</ul></nav>
  <div class="header-actions">
    <a class="menu-link" href="/cafe#menu">Menu</a>
    <button type="button" class="nav-button" data-menu-open aria-expanded="false" aria-controls="mobile-menu" aria-label="Open navigation"><span aria-hidden="true"></span></button>
  </div>
</div>
</header>
<div class="mobile-menu" id="mobile-menu" hidden>
  <div class="wrap mobile-menu-top">
    ${brand()}
    <button type="button" class="text-button" data-menu-close>Close</button>
  </div>
  <nav class="wrap" aria-label="Main"><ul>${links}</ul></nav>
  <div class="wrap mobile-menu-foot">
    <p>${business.location.label}, ${business.location.country} · ${instagramLink()}</p>
  </div>
</div>`;
}

function footer() {
  return html`<footer class="site-footer">
<div class="wrap footer-grid">
  <div class="footer-brand">
    ${brand()}
    <p>${esc(footerCopy.text)}</p>
  </div>
  <nav class="footer-nav" aria-label="Footer">
    <ul>${nav.map((n) => html`<li><a href="${n.href}">${n.label}</a></li>`)}</ul>
  </nav>
  <ul class="footer-nav">
    <li>${ext(business.location.mapsUrl, 'Directions')}</li>
    <li>${instagramLink('Instagram')}</li>
  </ul>
</div>
<div class="wrap footer-base"><p>${esc(footerCopy.note)}</p></div>
</footer>`;
}

function structuredData() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: business.name,
    description: business.description,
    image: '/assets/img/table-1359.jpg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: business.location.locality,
      addressCountry: business.location.countryCode,
    },
    sameAs: [business.instagram.url],
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export function page({ title, description, active, body, path = '/' }) {
  const fullTitle = title ? `${title} — integrale` : 'integrale — Café in Al Liwan, Hamala';
  const desc = description ?? business.description;
  return html`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#F6F4EE">
<meta property="og:type" content="website">
<meta property="og:site_name" content="integrale">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="/assets/img/table-1359.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/brand/favicon.svg" type="image/svg+xml">
<link rel="preload" href="/assets/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/young-serif.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/css/site.css">
<script src="/assets/js/site.js" defer></script>
${path === '/' ? structuredData() : ''}
</head>
<body${path === '/' ? ' class="page-home"' : ''}>
<a class="skip-link" href="#main">Skip to content</a>
${header(active)}
<main id="main" tabindex="-1">
${body}
</main>
${footer()}
</body>
</html>
`;
}
