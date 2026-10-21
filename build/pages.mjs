import { business } from '../src/content/business.mjs';
import { photos } from '../src/content/photos.mjs';
import { onDisplayHome, spaceLead, pastDisplays } from '../src/content/space.mjs';
import { menu, menuPreview } from '../src/content/menu.mjs';
import { products, featuredProducts } from '../src/content/products.mjs';
import * as copy from '../src/content/copy.mjs';
import { renderView, colourVars } from './mockups.mjs';
import {
  html, esc, lines, ext, figure, picture, largest, srcset, productCard, page, instagramLink,
  monogram, categoryLabel, hoursText, menuItem, more, directionsButton,
} from './components.mjs';

const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
const allItems = menu.categories.flatMap((c) => c.items);
const isSample = menu.status === 'sample';

function facts() {
  return html`<dl class="facts">
  <div><dt>Where</dt><dd>${business.location.label}, ${business.location.country}</dd></div>
  <div><dt>Hours</dt><dd${business.hours.status === 'confirmed' ? html` data-hours='${JSON.stringify(business.hours)}'` : ''}>${hoursText}</dd></div>
  <div><dt>Instagram</dt><dd>${instagramLink()}</dd></div>
</dl>`;
}

// ---------------------------------------------------------------- Home

export function home() {
  const c = copy.home;
  const body = html`
<section class="opening wrap" aria-labelledby="opening-title">
  <div class="opening-text">
    <h1 id="opening-title" class="display">${lines(c.title)}</h1>
    <div class="opening-side">
      <p class="opening-intro">${esc(c.intro)}</p>
      <div class="actions">
        <a class="btn" href="/cafe#menu">View the menu</a>
        <a class="btn btn-quiet" href="/visit">Find us</a>
      </div>
    </div>
  </div>
  ${figure(c.heroPhoto, { ratio: 'natural', eager: true, sizes: '(min-width: 1440px) 1328px, 100vw', cls: 'opening-photo' })}
</section>

<section class="bar" aria-labelledby="bar-title">
  <div class="wrap bar-grid">
    ${figure(c.bar.photo, { ratio: '4 / 3', sizes: '(min-width: 900px) 56vw, 100vw', cls: 'bar-photo' })}
    <div class="bar-copy">
      <h2 id="bar-title" class="title">${esc(c.bar.title)}</h2>
      <p>${esc(c.bar.text)}</p>
      <ul class="menu-list">${menuPreview.map((n) => menuItem(allItems.find((i) => i.name === n), menu.currency))}</ul>
      <div class="actions">
        <a class="btn" href="/cafe#menu">Full menu</a>
      </div>
      ${isSample ? html`<p class="sample-note">${esc(copy.cafe.sampleNote)}</p>` : ''}
    </div>
  </div>
</section>

<section class="stay wrap section" aria-labelledby="stay-title">
  ${figure(c.stay.photos[0], { ratio: 'natural', sizes: '(min-width: 900px) 45vw, 100vw', cls: 'stay-main' })}
  <div class="stay-copy">
    <h2 id="stay-title" class="title">${esc(c.stay.title)}</h2>
    <p>${esc(c.stay.text)}</p>
  </div>
  ${figure(c.stay.photos[1], { ratio: '438 / 500', sizes: '(min-width: 900px) 25vw, 60vw', date: false, cls: 'stay-detail' })}
</section>

<section class="display-feature wrap section" aria-labelledby="display-title">
  <div class="display-head">
    <h2 id="display-title" class="title">${esc(c.display.title)}</h2>
    <p>${esc(c.display.text)}</p>
    ${more('/space', 'Past displays')}
  </div>
  <div class="display-grid">
    ${figure(onDisplayHome.main, { ratio: '4 / 3', sizes: '(min-width: 900px) 62vw, 100vw', cls: 'display-main' })}
    <div class="display-details">
      ${onDisplayHome.details.map((k) => figure(k, { ratio: '4 / 3', sizes: '(min-width: 900px) 30vw, 50vw' }))}
    </div>
  </div>
</section>

<section class="take-home wrap section" aria-labelledby="shop-title">
  ${figure(c.shop.photo, { ratio: 'natural', sizes: '(min-width: 900px) 40vw, 100vw', cls: 'take-home-photo' })}
  <div class="take-home-copy">
    <h2 id="shop-title" class="title title-s">${esc(c.shop.title)}</h2>
    <p>${esc(c.shop.text)}</p>
    <div class="take-home-row">
      ${featuredProducts.map((s) => productCard(bySlug[s], { compact: true }))}
    </div>
    ${more('/shop', 'Visit the shop')}
  </div>
</section>

<section class="visit-block wrap section" aria-labelledby="visit-title">
  <div class="visit-copy">
    <h2 id="visit-title" class="title">${esc(c.visit.title)}</h2>
    <p>${esc(c.visit.text)}</p>
    ${facts()}
    <div class="actions">
      ${directionsButton()}
      ${more('/visit', 'Visit details')}
    </div>
  </div>
  ${figure(c.visit.photo, { ratio: '4 / 5', sizes: '(min-width: 900px) 34vw, 100vw', cls: 'visit-photo' })}
</section>`;
  return page({ body, path: '/' });
}

// ---------------------------------------------------------------- Café & menu

export function cafe() {
  const c = copy.cafe;
  const body = html`
<header class="page-intro wrap">
  <div class="page-intro-text">
    <h1 class="page-title">${esc(c.title)}</h1>
    <p class="lede">${esc(c.intro)}</p>
    <p class="quick-facts">${business.location.label} · ${ext(business.location.mapsUrl, 'Directions')} · Hours being confirmed</p>
  </div>
  ${figure(c.photo, { ratio: '4 / 3', eager: true, sizes: '(min-width: 900px) 40vw, 100vw', cls: 'page-intro-photo' })}
</header>

<section class="menu-page" id="menu" aria-labelledby="menu-title">
  <div class="menu-bar">
    <div class="wrap menu-bar-inner">
      <h2 id="menu-title" class="menu-bar-title">Menu</h2>
      <nav aria-label="Menu sections">
        <ul>${menu.categories.map((cat) => html`<li><a href="#${cat.id}">${esc(cat.title)}</a></li>`)}</ul>
      </nav>
    </div>
  </div>
  <div class="wrap">
    ${isSample ? html`<p class="sample-note sample-note-menu">${esc(c.sampleNote)}</p>` : ''}
    ${menu.categories.map((cat) => html`<div class="menu-section" id="${cat.id}">
      <h3 class="menu-cat">${esc(cat.title)}</h3>
      <ul class="menu-list menu-list-cols">${cat.items.map((i) => menuItem(i, menu.currency))}</ul>
    </div>`)}
    <p class="menu-foot">${esc(c.footNote)} Clothing and other pieces are in the <a href="/shop">shop</a>.</p>
  </div>
</section>

<section class="wrap section" aria-label="At the bar">
  ${figure('counter', { ratio: 'natural', sizes: '(min-width: 1440px) 1328px, 100vw' })}
</section>

<section class="closing wrap section" aria-labelledby="closing-title">
  <h2 id="closing-title" class="title title-s">Come in for a coffee.</h2>
  <div class="actions">
    ${directionsButton()}
    ${more('/space', 'See the space')}
  </div>
</section>`;
  return page({
    title: 'Café & Menu',
    description: 'The café menu at integrale, Al Liwan, Hamala: coffee, other drinks and something to eat.',
    active: 'cafe',
    path: '/cafe',
    body,
  });
}

// ---------------------------------------------------------------- The Space

export function space() {
  const c = copy.space;
  const lightboxData = pastDisplays.map((k) => ({
    src: largest(k),
    srcset: srcset(k, 'jpg'),
    alt: photos[k].alt,
    caption: photos[k].caption + (photos[k].date ? ` — ${photos[k].date}` : ''),
  }));
  const body = html`
<header class="page-intro page-intro-plain wrap">
  <div class="page-intro-text">
    <h1 class="page-title">${esc(c.title)}</h1>
    <p class="lede">${esc(c.intro)}</p>
  </div>
</header>

<section class="space-lead wrap" aria-label="Inside the café">
  ${figure(spaceLead, { ratio: '4 / 5', eager: true, sizes: '(min-width: 900px) 50vw, 100vw', cls: 'space-lead-photo' })}
  <div class="space-now">
    <h2 class="title title-s">${esc(c.nowTitle)}</h2>
    <p>${esc(c.nowText)}</p>
    <p>${instagramLink(`See @${business.instagram.handle} on Instagram`)}</p>
    <div class="actions">
      <a class="btn" href="/cafe#menu">View the menu</a>
      ${more('/visit', 'Find us')}
    </div>
  </div>
</section>

<section class="past wrap section" aria-labelledby="past-title">
  <div class="past-head">
    <h2 id="past-title" class="title">${esc(c.pastTitle)}</h2>
    <p>${esc(c.pastText)}</p>
  </div>
  <ul class="gallery">
    ${pastDisplays.map((k, n) => html`<li>
      <button type="button" class="gallery-open" data-gallery-index="${n}" aria-label="View larger: ${esc(photos[k].caption)}">
        <span class="frame">${picture(k, { sizes: '(min-width: 1100px) 25vw, (min-width: 600px) 50vw, 100vw' })}</span>
      </button>
      <p class="caption">${esc(photos[k].caption)}${photos[k].date ? html`<span class="date">${photos[k].date}</span>` : ''}</p>
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
</dialog>`;
  return page({
    title: 'The Space',
    description: 'Inside integrale: cane chairs, travertine, timber floors and a car on display near your table.',
    active: 'space',
    path: '/space',
    body,
  });
}

// ---------------------------------------------------------------- Shop

export function shop() {
  const c = copy.shop;
  const body = html`
<header class="page-intro page-intro-plain wrap">
  <div class="page-intro-text">
    <h1 class="page-title">${esc(c.title)}</h1>
    <p class="lede">${esc(c.intro)}</p>
  </div>
</header>

<section class="shelves wrap" aria-labelledby="shelves-title">
  ${figure('rail', { ratio: 'natural', eager: true, sizes: '(min-width: 900px) 50vw, 100vw', cls: 'shelves-a' })}
  ${figure('shelf', { ratio: '4 / 5', sizes: '(min-width: 900px) 25vw, 60vw', cls: 'shelves-b' })}
  <div class="shelves-copy">
    <h2 id="shelves-title" class="title title-s">${esc(c.shelvesTitle)}</h2>
    <p>${esc(c.shelvesText)}</p>
  </div>
</section>

<section class="proposed wrap section" aria-labelledby="proposed-title">
  <div class="proposed-head">
    <p class="tag">Proposed collection</p>
    <h2 id="proposed-title" class="title title-s">${esc(c.proposedTitle)}</h2>
    <p>${esc(c.proposedText)}</p>
  </div>
  <div class="product-grid">${products.map((p) => productCard(p))}</div>
</section>`;
  return page({
    title: 'Shop',
    description: 'Clothing, books and objects at integrale, and a proposed range of integrale’s own pieces.',
    active: 'shop',
    path: '/shop',
    body,
  });
}

export function product(p) {
  const multiColour = p.colours?.length > 1;
  const first = p.colours?.[0];
  const related = products.filter((q) => q.slug !== p.slug).slice(0, 3);
  const body = html`
<div class="wrap crumbs-wrap">
  <nav class="crumbs" aria-label="Breadcrumb">
    <ol><li><a href="/shop">Shop</a></li><li aria-current="page">${esc(p.name)}</li></ol>
  </nav>
</div>
<section class="pdp wrap" data-product="${p.slug}" data-name="${esc(p.name)}">
  <div class="pdp-gallery" data-pdp-gallery style="${colourVars(first)}">
    <div class="pdp-views">
      ${p.views.map((v, i) => html`<div class="stage pdp-view" data-view="${i}"${i ? ' hidden' : ''}>${renderView(p, v)}</div>`)}
    </div>
    ${p.views.length > 1 ? html`<div class="pdp-thumbs" role="group" aria-label="Views">
      ${p.views.map((v, i) => html`<button type="button" class="pdp-thumb" data-view-btn="${i}" aria-pressed="${i === 0}" aria-label="Show view ${i + 1} of ${p.views.length}: ${esc(v.side)}"><span class="stage">${renderView(p, v)}</span></button>`)}
    </div>` : ''}
    <p class="caption">Design sketch for a proposed piece. Not a photograph of a product on sale.</p>
  </div>

  <div class="pdp-info">
    ${p.proposed ? '<p class="tag">Proposed collection</p>' : ''}
    <h1 class="pdp-title">${esc(p.name)}</h1>
    <p class="pdp-meta">${categoryLabel(p.category)} · ${p.price ? esc(p.price) : 'Not on sale yet, no price set'}</p>
    <p class="pdp-desc">${esc(p.description)}</p>

    <form class="pdp-form" data-pdp-form novalidate>
      ${p.colours ? html`<fieldset class="opt">
        <legend>Colour <span class="opt-value" data-opt-value="colour">${first.label}</span></legend>
        <div class="swatches">
          ${p.colours.map((col, i) => html`<label class="swatch"><input type="radio" name="colour" value="${col.label}" data-g="${col.value}" data-gi="${col.ink}"${i === 0 ? ' checked' : ''}${multiColour ? '' : ' disabled'}><span class="swatch-chip" style="background:${col.value}"></span><span class="vh">${col.label}</span></label>`)}
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
      <button type="submit" class="btn btn-wide">Save this piece</button>
      <p class="status" role="status" data-pdp-status></p>
      <p class="pdp-note">Saving keeps this piece on this device so you can ask about it at the counter. Nothing is ordered.</p>
    </form>

    <h2 class="pdp-sub">Details</h2>
    <ul class="pdp-details">${p.details.map((d) => html`<li>${esc(d)}</li>`)}</ul>
  </div>
</section>

<section class="related wrap section" aria-labelledby="related-title">
  <h2 id="related-title" class="title title-s">More proposed pieces</h2>
  <div class="product-grid product-grid-3">${related.map((q) => productCard(q))}</div>
</section>`;
  return page({
    title: p.name,
    description: `${p.summary} A proposed piece for integrale; not on sale yet.`,
    active: 'shop',
    path: `/shop/${p.slug}`,
    body,
  });
}

// ---------------------------------------------------------------- Visit

export function visit() {
  const c = copy.visit;
  const body = html`
<header class="page-intro page-intro-plain wrap">
  <div class="page-intro-text">
    <h1 class="page-title">${esc(c.title)}</h1>
    <p class="lede">${esc(c.intro)}</p>
  </div>
</header>

<section class="visit-page wrap" aria-label="How to find us">
  <div class="visit-copy">
    ${facts()}
    <div class="actions">
      ${directionsButton()}
      <a class="btn btn-quiet" href="/cafe#menu">View the menu</a>
    </div>
    <h2 class="pdp-sub">Before you come</h2>
    <ul class="plain-list">${c.before.map((b) => html`<li>${esc(b)}</li>`)}</ul>
  </div>
  <div class="visit-media">
    ${figure('facade', { ratio: '4 / 5', eager: true, sizes: '(min-width: 900px) 40vw, 100vw' })}
    ${figure('m-facade-sign', { ratio: '438 / 500', sizes: '(min-width: 900px) 18vw, 50vw', date: false, cls: 'visit-small' })}
  </div>
</section>`;
  return page({
    title: 'Visit',
    description: 'How to find integrale, a café in Al Liwan, Hamala, Bahrain.',
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
  <h1 class="page-title">Wrong turn.</h1>
  <p class="lede">This page doesn’t exist, or it has moved.</p>
  <div class="actions">
    <a class="btn" href="/cafe#menu">View the menu</a>
    ${more('/', 'Back to the start')}
  </div>
</section>`;
  return page({ title: 'Page not found', body, path: '/404' });
}
