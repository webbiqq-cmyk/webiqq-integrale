import { business } from '../src/content/business.mjs';
import { photos } from '../src/content/photos.mjs';
import { archive, moments } from '../src/content/studio.mjs';
import { menu, menuPreview } from '../src/content/menu.mjs';
import { products, featuredProducts, categories } from '../src/content/products.mjs';
import { renderView, colourVars } from './mockups.mjs';
import {
  html, esc, ext, figure, picture, largest, srcset, productCard, page, instagramLink, monogram, categoryLabel,
} from './components.mjs';

const arrow = '<span class="arrow" aria-hidden="true">→</span>';
const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
const allItems = menu.categories.flatMap((c) => c.items);

const hoursText =
  business.hours.status === 'confirmed' ? business.hours.summary : 'Being confirmed — check Instagram before a special trip';

const sampleNote = (what) =>
  html`<p class="sample-note"><span class="tag tag-blue">Sample</span> ${what}</p>`;

function visitFacts() {
  return html`<dl class="facts">
  <div><dt>Where</dt><dd>${business.location.label}, ${business.location.country}</dd></div>
  <div><dt>Hours</dt><dd ${business.hours.status === 'confirmed' ? `data-hours='${JSON.stringify(business.hours)}'` : ''}>${hoursText}</dd></div>
  <div><dt>Instagram</dt><dd>${instagramLink()}</dd></div>
</dl>`;
}

function menuItem(item) {
  return html`<li class="menu-item">
  <span class="menu-name">${esc(item.name)}</span>
  ${item.price !== null ? html`<span class="menu-price">${menu.currency} ${item.price}</span>` : ''}
  <span class="menu-note">${esc(item.note)}</span>
</li>`;
}

// ---------------------------------------------------------------- Home

export function home() {
  const body = html`
<section class="hero wrap" aria-labelledby="hero-title">
  <div class="hero-head">
    <p class="label">${business.location.label} · ${business.location.country}</p>
    <h1 id="hero-title" class="display">Good cars.<br>Good coffee.<br>Good company.</h1>
  </div>
  <div class="hero-media">
    ${figure('diablo-interior', { ratio: '4 / 5', eager: true, sizes: '(min-width: 900px) 55vw, 100vw', cls: 'hero-fig' })}
  </div>
  <div class="hero-body">
    <p class="hero-sub">An automotive studio, a café and a shop of things we like, in one room at Al Liwan.</p>
    <div class="actions">
      <a class="btn" href="#inside">Explore integrale</a>
      <a class="link" href="/visit"><span>Plan your visit</span>${arrow}</a>
    </div>
    <ul class="index" aria-label="Three parts of integrale">
      <li><a href="/studio"><span class="index-name">Studio</span><span class="index-desc">Cars on the floor, and an archive of the ones before</span>${arrow}</a></li>
      <li><a href="/cafe"><span class="index-name">Café</span><span class="index-desc">Coffee at the bar or by the window</span>${arrow}</a></li>
      <li><a href="/shop"><span class="index-name">Shop</span><span class="index-desc">Clothing, prints and objects from the shelves</span>${arrow}</a></li>
    </ul>
  </div>
</section>

<section class="inside wrap section" id="inside" aria-labelledby="inside-title">
  <h2 id="inside-title" class="label">Inside</h2>
  <p class="statement">A car sits on the herringbone floor. The coffee bar runs along the wall. The shelves in between hold T-shirts, books and model cars. Come for one of them and stay for the others.</p>
  <div class="inside-grid">
    ${figure('table', { ratio: '16 / 9', sizes: '(min-width: 900px) 50vw, 100vw', cls: 'inside-a' })}
    ${figure('mercedes-window', { ratio: '4 / 5', sizes: '(min-width: 900px) 25vw, 50vw', cls: 'inside-b' })}
    ${figure('shelf', { ratio: '4 / 5', sizes: '(min-width: 900px) 25vw, 50vw', cls: 'inside-c' })}
  </div>
</section>

<section class="feature-studio wrap section" aria-labelledby="studio-title">
  <div class="fs-media">${figure('porsche-stone', { ratio: '5 / 4', sizes: '(min-width: 900px) 58vw, 100vw' })}</div>
  <div class="fs-side">
    ${figure('ferrari-lounge', { ratio: '4 / 3', sizes: '(min-width: 900px) 30vw, 100vw', date: false, cls: 'fs-small' })}
    <div class="fs-copy">
      <p class="label"><span class="num">01</span> The studio</p>
      <h2 id="studio-title" class="h-xl">A car on the floor, and time to look at it.</h2>
      <p>The car parked inside changes from time to time, so the room is rarely the same twice. The studio keeps a record of some that have passed through.</p>
      <a class="link" href="/studio"><span>See the studio</span>${arrow}</a>
    </div>
  </div>
</section>

<section class="feature-cafe section band" aria-labelledby="cafe-title">
  <div class="wrap">
    <div class="fc-top">
      ${figure('counter', { ratio: 'natural', sizes: '(min-width: 900px) 66vw, 100vw', cls: 'fc-media' })}
      <div class="fc-intro">
        <p class="label"><span class="num">02</span> The café</p>
        <h2 id="cafe-title" class="h-l">Coffee at the bar, or by the window.</h2>
        <p>Espresso from the machine, pale blue cups, a slice of something from the case, and a car in view from most seats.</p>
      </div>
    </div>
    <div class="fc-menu">
      <div class="fc-menu-intro">
        <h3 class="h-s">From the menu</h3>
        ${menu.status === 'sample' ? sampleNote('Placeholder items until integrale’s own menu is supplied.') : ''}
        <a class="link" href="/cafe#menu"><span>Read the menu</span>${arrow}</a>
      </div>
      <ul class="menu-list menu-list-2">${menuPreview.map((n) => menuItem(allItems.find((i) => i.name === n)))}</ul>
    </div>
  </div>
</section>

<section class="feature-shop wrap section" aria-labelledby="shop-title">
  <div class="fsh-head">
    <div>
      <p class="label"><span class="num">03</span> The shop</p>
      <h2 id="shop-title" class="h-xl">Things from the shelves.</h2>
    </div>
    <div class="fsh-intro">
      <p>T-shirts, caps, prints of the cars and a few objects for the desk and the keys, made to sit next to the cars rather than apart from them.</p>
      <p class="concept-line"><span class="tag">Concept</span> A proposed collection for discussion. Nothing is on sale yet.</p>
      <a class="link" href="/shop"><span>Browse the shop</span>${arrow}</a>
    </div>
  </div>
  <div class="fsh-grid">
    <div class="product-grid product-grid-2">${featuredProducts.map((s) => productCard(bySlug[s], { sizes: '(min-width: 900px) 28vw, 50vw' }))}</div>
    ${figure('murcielago-shelf', { ratio: '4 / 5', sizes: '(min-width: 900px) 40vw, 100vw', cls: 'fsh-life' })}
  </div>
</section>

<section class="moments wrap section" aria-labelledby="moments-title">
  <div class="moments-head">
    <h2 id="moments-title" class="h-m">Moments</h2>
    <p>From the integrale feed. ${instagramLink('More on Instagram')}</p>
  </div>
  <ul class="moments-grid">
    ${moments.map((k) => html`<li>${figure(k, { ratio: '438 / 500', sizes: '(min-width: 900px) 18vw, 50vw', date: false })}</li>`)}
  </ul>
</section>

<section class="visit-home wrap section" aria-labelledby="visit-title">
  <div class="vh-copy">
    <p class="label">Visit</p>
    <h2 id="visit-title" class="h-xl">At Al Liwan, in Hamala.</h2>
    ${visitFacts()}
    <div class="actions">
      <a class="btn" href="${business.location.mapsUrl}" target="_blank" rel="noopener">Get directions<span class="vh"> (opens Google Maps in a new tab)</span></a>
      <a class="link" href="/visit"><span>Plan your visit</span>${arrow}</a>
    </div>
  </div>
  ${figure('facade', { ratio: '5 / 6', sizes: '(min-width: 900px) 40vw, 100vw', cls: 'vh-media' })}
</section>`;
  return page({ body, path: '/' });
}

// ---------------------------------------------------------------- Studio

export function studio() {
  const items = archive.map((a) => ({ ...a, ...photos[a.photo] }));
  const lightboxData = items.map((i) => ({
    src: largest(i.photo),
    srcset: srcset(i.photo, 'jpg'),
    alt: i.alt,
    caption: i.caption + (i.date ? ` — ${i.date}` : ''),
  }));
  const body = html`
<header class="page-head wrap">
  <p class="label">Studio</p>
  <h1 class="display-s">The studio</h1>
  <p class="lede">integrale keeps a car inside, on the herringbone floor between the coffee bar and the shelves. It changes from time to time. These are some of the cars that have stood there, and a few seen nearby.</p>
</header>

<section class="studio-lead wrap" aria-label="In the studio">
  ${figure('porsche-stone', { ratio: '5 / 4', eager: true, sizes: '(min-width: 900px) 58vw, 100vw', cls: 'sl-a' })}
  ${figure('ferrari-lounge', { ratio: '4 / 3', sizes: '(min-width: 900px) 30vw, 100vw', cls: 'sl-b' })}
</section>

<section class="now wrap section" aria-labelledby="now-title">
  <div class="now-inner">
    <h2 id="now-title" class="label">On the floor this week</h2>
    <p class="statement">We don’t list the current car here, because it moves. Check ${instagramLink()} for what’s inside before you come.</p>
  </div>
</section>

<section class="archive wrap section" aria-labelledby="archive-title">
  <div class="archive-head">
    <h2 id="archive-title" class="h-xl">From the studio</h2>
    <p>An archive, not a list of what’s on display now. Dates are when integrale posted each photo. Select a photo to see it larger.</p>
  </div>
  <ul class="gallery">
    ${items.map((i, n) => html`<li>
      <button type="button" class="gallery-open" data-gallery-index="${n}" aria-label="View larger: ${esc(i.caption)}">
        <span class="frame">${picture(i.photo, { sizes: '(min-width: 1100px) 25vw, (min-width: 600px) 50vw, 100vw' })}</span>
      </button>
      <p class="caption">${esc(i.caption)}${i.date ? html`<span class="date">${i.date}</span>` : ''}</p>
    </li>`)}
  </ul>
  <script type="application/json" id="gallery-data">${JSON.stringify(lightboxData).replace(/</g, '\\u003c')}</script>
</section>

<dialog class="lightbox" id="lightbox" aria-label="Photo viewer">
  <div class="lb-bar">
    <p class="lb-count" data-lb-count></p>
    <button type="button" class="text-button" data-lb-close>Close</button>
  </div>
  <figure class="lb-figure">
    <img data-lb-img alt="">
    <figcaption data-lb-caption></figcaption>
  </figure>
  <div class="lb-nav">
    <button type="button" class="text-button" data-lb-prev>← Previous</button>
    <button type="button" class="text-button" data-lb-next>Next →</button>
  </div>
</dialog>

<section class="cta wrap section" aria-labelledby="cta-title">
  <h2 id="cta-title" class="h-l">Come and see it in person.</h2>
  <div class="actions">
    <a class="btn" href="/visit">Plan your visit</a>
    <a class="link" href="/cafe"><span>Have a coffee while you’re here</span>${arrow}</a>
  </div>
</section>`;
  return page({
    title: 'Studio',
    description: 'The car on the floor at integrale changes from time to time. An archive of cars photographed at the studio.',
    active: 'studio',
    path: '/studio',
    body,
  });
}

// ---------------------------------------------------------------- Café

export function cafe() {
  const body = html`
<header class="page-head wrap">
  <p class="label">Café</p>
  <h1 class="display-s">Coffee by the window</h1>
  <p class="lede">A coffee bar along one wall, cane-backed chairs by the glass, and a car in view from most seats. Stay for one espresso or the whole afternoon.</p>
</header>

<section class="cafe-lead wrap" aria-label="The café">
  ${figure('table', { ratio: 'natural', eager: true, sizes: '(min-width: 900px) 66vw, 100vw', cls: 'cl-a' })}
  ${figure('counter-stair', { ratio: '4 / 3', sizes: '(min-width: 900px) 30vw, 100vw', cls: 'cl-b' })}
</section>

<section class="wrap section-s" aria-label="Practical details">
  <div class="info-strip">
    <div><h2 class="label">Where</h2><p>${business.location.label}, ${business.location.country}<br>${ext(business.location.mapsUrl, 'Get directions')}</p></div>
    <div><h2 class="label">Hours</h2><p>${hoursText}</p></div>
    <div><h2 class="label">Questions</h2><p>Send a message on Instagram: ${instagramLink()}</p></div>
  </div>
</section>

<section class="menu wrap section" id="menu" aria-labelledby="menu-title">
  <div class="menu-head">
    <h2 id="menu-title" class="h-xl">Menu</h2>
    ${menu.status === 'sample'
      ? sampleNote('This is placeholder content for the concept site. integrale’s real menu and prices will replace it; nothing below is confirmed.')
      : ''}
    <nav class="menu-jump" aria-label="Menu sections">
      <ul>${menu.categories.map((c) => html`<li><a href="#${c.id}">${esc(c.title)}</a></li>`)}</ul>
    </nav>
  </div>
  ${menu.categories.map((c) => html`<div class="menu-section" id="${c.id}">
    <h3 class="h-m">${esc(c.title)}</h3>
    <ul class="menu-list">${c.items.map(menuItem)}</ul>
  </div>`)}
  <p class="menu-foot">Café menu only. T-shirts, prints and other pieces are in the ${'<a href="/shop">shop</a>'}.</p>
</section>

<section class="wrap section-s" aria-label="The counter">
  ${figure('counter', { ratio: 'natural', sizes: '(min-width: 900px) 80vw, 100vw', cls: 'cafe-wide' })}
</section>

<section class="cta wrap section" aria-labelledby="cta-title">
  <h2 id="cta-title" class="h-l">See you at the bar.</h2>
  <div class="actions">
    <a class="btn" href="/visit">Plan your visit</a>
    <a class="link" href="/studio"><span>See what’s been on the floor</span>${arrow}</a>
  </div>
</section>`;
  return page({
    title: 'Café',
    description: 'The café at integrale: coffee at the bar or by the window, with a car in view.',
    active: 'cafe',
    path: '/cafe',
    body,
  });
}

// ---------------------------------------------------------------- Shop

export function shop() {
  const cards = [];
  products.forEach((p, i) => {
    cards.push(productCard(p, { sizes: '(min-width: 1100px) 25vw, (min-width: 700px) 33vw, 50vw' }));
    if (i === 2) cards.push(html`<div class="life-card" data-life>${figure('murcielago-shelf', { ratio: '4 / 5', sizes: '(min-width: 1100px) 25vw, 50vw', caption: 'The shelves beside the car, May 2023', date: false })}</div>`);
    if (i === 5) cards.push(html`<div class="life-card" data-life>${figure('shelf', { ratio: '4 / 5', sizes: '(min-width: 1100px) 25vw, 50vw', caption: 'Clothing and objects at integrale', date: false })}</div>`);
  });
  const body = html`
<header class="page-head wrap">
  <p class="label">Shop</p>
  <h1 class="display-s">The shop</h1>
  <p class="lede">Clothing, prints and objects that belong on the shelves next to the cars.</p>
</header>

<section class="wrap" aria-label="About this collection">
  <div class="notice">
    <p class="label">Concept collection</p>
    <p>These pieces are design proposals prepared for integrale. Names, options and details are for discussion; nothing here is on sale, and no prices are set. The list shows how a visitor could gather pieces to ask about at the counter.</p>
  </div>
</section>

<section class="shop wrap section-s" aria-labelledby="shop-title">
  <h2 id="shop-title" class="vh">Pieces</h2>
  <div class="filters" role="group" aria-label="Filter by category">
    <button type="button" class="chip" aria-pressed="true" data-filter="all">All</button>
    ${categories.map((c) => html`<button type="button" class="chip" aria-pressed="false" data-filter="${c.id}">${c.label}</button>`)}
    <p class="filter-count" role="status" data-filter-count>${products.length} pieces</p>
  </div>
  <div class="product-grid product-grid-shop" data-product-grid>${cards}</div>
  <p class="empty" data-filter-empty hidden>Nothing in this category yet. <button type="button" class="text-button" data-filter="all">Show everything</button></p>
  <p class="shop-foot">You’ll also find car books and magazines on the shelves at integrale. The selection changes, so ask at the counter.</p>
</section>`;
  return page({
    title: 'Shop',
    description: 'A concept collection of clothing, prints and objects for integrale.',
    active: 'shop',
    path: '/shop',
    body,
  });
}

export function product(p) {
  const multiColour = p.colours?.length > 1;
  const first = p.colours?.[0];
  const related = products.filter((q) => q.slug !== p.slug && q.category === p.category)
    .concat(products.filter((q) => q.slug !== p.slug && q.category !== p.category))
    .slice(0, 4);
  const body = html`
<div class="wrap crumbs-wrap">
  <nav class="crumbs" aria-label="Breadcrumb">
    <ol><li><a href="/shop">Shop</a></li><li>${categoryLabel(p.category)}</li><li aria-current="page">${esc(p.name)}</li></ol>
  </nav>
</div>
<section class="pdp wrap" data-product="${p.slug}" data-name="${esc(p.name)}">
  <div class="pdp-gallery" data-pdp-gallery style="${colourVars(first)}">
    <div class="pdp-views">
      ${p.views.map((v, i) => html`<div class="stage pdp-view" data-view="${i}"${i ? ' hidden' : ''}>${renderView(p, v)}</div>`)}
    </div>
    ${p.views.length > 1 ? html`<div class="pdp-thumbs" role="group" aria-label="Views">
      ${p.views.map((v, i) => html`<button type="button" class="pdp-thumb" data-view-btn="${i}" aria-pressed="${i === 0}" aria-label="View ${i + 1} of ${p.views.length}: ${esc(v.side)}"><span class="stage">${renderView(p, v)}</span></button>`)}
    </div>` : ''}
  </div>

  <div class="pdp-info">
    <p class="product-meta"><span>${categoryLabel(p.category)}</span>${p.concept ? '<span class="tag">Concept</span>' : ''}</p>
    <h1 class="h-l">${esc(p.name)}</h1>
    <p class="pdp-price">${p.price ? esc(p.price) : 'Price to be confirmed'}</p>
    <p class="pdp-desc">${esc(p.description)}</p>

    <form class="pdp-form" data-pdp-form novalidate>
      ${p.colours ? html`<fieldset class="opt">
        <legend>Colour <span class="opt-value" data-opt-value="colour">${first.label}</span></legend>
        <div class="swatches">
          ${p.colours.map((c, i) => html`<label class="swatch"><input type="radio" name="colour" value="${c.label}" data-g="${c.value}" data-gi="${c.ink}"${i === 0 ? ' checked' : ''}${multiColour ? '' : ' disabled'}><span class="swatch-chip" style="background:${c.value}"></span><span class="vh">${c.label}</span></label>`)}
        </div>
      </fieldset>` : ''}
      ${p.sizes ? html`<fieldset class="opt" data-required="size">
        <legend>Size <span class="opt-value" data-opt-value="size">Choose a size</span></legend>
        <div class="boxes">${p.sizes.map((s) => html`<label class="box"><input type="radio" name="size" value="${s}"><span>${s}</span></label>`)}</div>
        <p class="opt-error" data-error="size" hidden>Choose a size first.</p>
      </fieldset>` : ''}
      ${p.formats ? html`<fieldset class="opt">
        <legend>Format <span class="opt-value" data-opt-value="format">${p.formats[0]}</span></legend>
        <div class="boxes">${p.formats.map((f, i) => html`<label class="box"><input type="radio" name="format" value="${f}"${i === 0 ? ' checked' : ''}><span>${f}</span></label>`)}</div>
      </fieldset>` : ''}
      <button type="submit" class="btn btn-wide">Add to your list</button>
      <p class="status" role="status" data-pdp-status></p>
      <p class="pdp-note">No online checkout yet. Your list stays on this device so you can ask about pieces at the counter.</p>
    </form>

    <h2 class="label">Details</h2>
    <ul class="pdp-details">${p.details.map((d) => html`<li>${esc(d)}</li>`)}</ul>
  </div>
</section>

<section class="related wrap section" aria-labelledby="related-title">
  <h2 id="related-title" class="h-m">Also in the shop</h2>
  <div class="product-grid product-grid-4">${related.map((q) => productCard(q))}</div>
</section>`;
  return page({
    title: p.name,
    description: p.summary,
    active: 'shop',
    path: `/shop/${p.slug}`,
    body,
  });
}

// ---------------------------------------------------------------- Visit

export function visit() {
  const body = html`
<header class="page-head wrap">
  <p class="label">Visit</p>
  <h1 class="display-s">Visit integrale</h1>
  <p class="lede">We’re at Al Liwan in Hamala, Bahrain. Look for the monogram above the curved glass front.</p>
</header>

<section class="visit-page wrap" aria-label="How to find us">
  <div class="vp-copy">
    ${visitFacts()}
    <div class="actions">
      <a class="btn" href="${business.location.mapsUrl}" target="_blank" rel="noopener">Get directions<span class="vh"> (opens Google Maps in a new tab)</span></a>
    </div>
    <div class="before">
      <h2 class="h-s">Before you come</h2>
      <ul class="plain-list">
        <li>The car inside changes. ${instagramLink('Instagram')} is the place to see what’s on the floor.</li>
        <li>Opening hours are being confirmed and will appear here once they are.</li>
        <li>The café has its full menu at the counter.</li>
      </ul>
    </div>
  </div>
  <div class="vp-media">
    ${figure('facade', { ratio: '4 / 5', eager: true, sizes: '(min-width: 900px) 45vw, 100vw' })}
    ${figure('m-facade-sign', { ratio: '438 / 500', sizes: '(min-width: 900px) 20vw, 50vw', date: false, cls: 'vp-small' })}
  </div>
</section>

<section class="cta wrap section" aria-labelledby="cta-title">
  <h2 id="cta-title" class="h-l">While you’re here</h2>
  <ul class="index index-wide">
    <li><a href="/studio"><span class="index-name">Studio</span><span class="index-desc">What’s been on the floor</span><span class="arrow" aria-hidden="true">→</span></a></li>
    <li><a href="/cafe"><span class="index-name">Café</span><span class="index-desc">The menu</span><span class="arrow" aria-hidden="true">→</span></a></li>
    <li><a href="/shop"><span class="index-name">Shop</span><span class="index-desc">The concept collection</span><span class="arrow" aria-hidden="true">→</span></a></li>
  </ul>
</section>`;
  return page({
    title: 'Visit',
    description: 'How to find integrale at Al Liwan, Hamala, Bahrain.',
    active: 'visit',
    path: '/visit',
    body,
  });
}

// ---------------------------------------------------------------- 404

export function notFound() {
  const body = html`
<section class="not-found wrap">
  ${monogram}
  <h1 class="display-s">Wrong turn.</h1>
  <p class="lede">This page doesn’t exist, or it has moved.</p>
  <ul class="index index-wide">
    <li><a href="/"><span class="index-name">Home</span><span class="index-desc">Start again</span><span class="arrow" aria-hidden="true">→</span></a></li>
    <li><a href="/studio"><span class="index-name">Studio</span><span class="index-desc">Cars</span><span class="arrow" aria-hidden="true">→</span></a></li>
    <li><a href="/cafe"><span class="index-name">Café</span><span class="index-desc">Coffee</span><span class="arrow" aria-hidden="true">→</span></a></li>
    <li><a href="/shop"><span class="index-name">Shop</span><span class="index-desc">Things</span><span class="arrow" aria-hidden="true">→</span></a></li>
  </ul>
</section>`;
  return page({ title: 'Page not found', body, path: '/404' });
}
