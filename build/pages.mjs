import { business } from '../src/content/business.mjs';
import { photos } from '../src/content/photos.mjs';
import { onDisplayHome, spaceLead, pastDisplays } from '../src/content/space.mjs';
import { menu, menuPreview } from '../src/content/menu.mjs';
import * as copy from '../src/content/copy.mjs';
import {
  html, esc, lines, ext, figure, picture, largest, srcset, page, instagramLink, brand,
  monogram, hoursText, menuItem, more, directionsButton, kicker, marquee, valueStrip, menuCategoryList,
} from './components.mjs';

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
<section class="hero-full" aria-labelledby="opening-title">
  <div class="hero-media" data-parallax>${picture(c.heroPhoto, { sizes: '100vw', eager: true })}</div>
  <div class="hero-scrim" aria-hidden="true"></div>
  <div class="hero-content wrap">
    <p class="kicker">${esc(c.kicker)}</p>
    <h1 id="opening-title" class="display">${lines(c.title)}</h1>
    <p class="opening-intro">${esc(c.intro)}</p>
    <div class="actions">
      <a class="btn" href="/cafe#menu">View the menu</a>
      <a class="btn btn-quiet" href="/visit">Find us</a>
    </div>
    <p class="opening-note">${esc(c.heroNote)} ${more('/space', 'See what’s been through the doors')}</p>
  </div>
  <div class="hero-accent-wrap">
    <div class="hero-accent">${picture(c.heroAccent, { sizes: '220px' })}</div>
    <p class="hero-caption">${esc(photos[c.heroPhoto].caption)}${photos[c.heroPhoto].date ? html`<span class="date">${photos[c.heroPhoto].date}</span>` : ''}</p>
  </div>
</section>

<div class="wrap hero-foot reveal">
  ${valueStrip(c.values)}
</div>

<section class="bar" aria-labelledby="bar-title">
  <div class="wrap bar-grid">
    ${figure(c.bar.photo, { ratio: '4 / 5', sizes: '(min-width: 900px) 40vw, 100vw', cls: 'bar-photo reveal' })}
    <div class="bar-copy reveal reveal-1">
      ${kicker(c.bar.kicker)}
      <h2 id="bar-title" class="title">${esc(c.bar.title)}</h2>
      <p>${esc(c.bar.text)}</p>
      ${menuCategoryList(menuPreview)}
      <div class="actions">
        <a class="btn" href="/cafe#menu">Full menu</a>
      </div>
      ${isSample ? html`<p class="sample-note">${esc(copy.cafe.sampleNote)}</p>` : ''}
    </div>
  </div>
</section>

<section class="display-feature wrap section" aria-labelledby="display-title">
  <div class="display-layout">
    <div class="display-head reveal">
      ${kicker(c.display.kicker)}
      <h2 id="display-title" class="title">${esc(c.display.title)}</h2>
      <p>${esc(c.display.text)}</p>
      ${more('/space', 'Past displays')}
    </div>
    <div class="display-slant">
      ${[onDisplayHome.main, ...onDisplayHome.details].map((k, i) => html`<div class="slant-frame reveal reveal-${i + 1}"><img src="${largest(k)}" srcset="${srcset(k, 'jpg')}" sizes="(min-width: 900px) 22vw, 70vw" alt="${esc(photos[k].alt)}" loading="lazy" decoding="async"></div>`)}
    </div>
  </div>
</section>

<section class="visit-dark" aria-labelledby="visit-title">
  <div class="wrap">
    <div class="visit-copy reveal">
      ${kicker(c.visit.kicker)}
      <h2 id="visit-title" class="title">${esc(c.visit.title)}</h2>
      <p>${esc(c.visit.text)}</p>
      ${facts()}
      <div class="actions">
        ${directionsButton()}
        ${more('/visit', 'Visit details')}
      </div>
    </div>
  </div>
</section>

<div class="closing-bar">
  <div class="wrap closing-bar-inner">
    ${brand()}
    <p class="closing-tags">${esc(c.closing.tags)}</p>
    <div class="closing-meta">
      <span>${business.location.label}, ${business.location.country}</span>
      ${instagramLink()}
    </div>
  </div>
</div>

<section class="closing-cinematic" aria-label="Same obsession, two kinds of horsepower">
  <div class="closing-media">${picture(c.closing.photo, { sizes: '100vw' })}</div>
  <div class="closing-scrim" aria-hidden="true"></div>
  <p class="closing-line reveal wrap">${lines(c.closing.tagline)}</p>
</section>`;
  return page({ body, path: '/' });
}

// ---------------------------------------------------------------- Café & menu

export function cafe() {
  const c = copy.cafe;
  const body = html`
<header class="page-intro wrap">
  <div class="page-intro-text">
    ${kicker(c.kicker)}
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
    ${menu.categories.map((cat) => html`<div class="menu-section menu-section-${cat.id}" id="${cat.id}">
      <h3 class="menu-cat">${esc(cat.title)}</h3>
      <ul class="menu-list menu-list-cols">${cat.items.map((i) => menuItem(i, menu.currency))}</ul>
    </div>`)}
    <p class="menu-foot">${esc(c.footNote)}</p>
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

// A row of past-display photos that auto-scrolls sideways. The list is
// duplicated so the loop is seamless; `offset` keeps data-gallery-index
// pointing at the photo's real position for the lightbox.
function pastRow(keys, cls, offset = 0) {
  const items = keys.map((k, i) => ({ k, n: offset + i }));
  const loop = [...items, ...items];
  return html`<div class="past-row ${cls}">
  <div class="past-row-track">
    ${loop.map(({ k, n }) => html`<div class="gallery-item">
      <button type="button" class="gallery-open" data-gallery-index="${n}" aria-label="View larger: ${esc(photos[k].caption)}">
        <span class="frame">${picture(k, { sizes: '260px' })}</span>
      </button>
    </div>`)}
  </div>
</div>`;
}

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
    ${kicker(c.kicker)}
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

<div class="wrap marquee-block">${marquee(copy.carMarquee)}</div>

<section class="past wrap section" aria-labelledby="past-title">
  <div class="past-head">
    <h2 id="past-title" class="title">${esc(c.pastTitle)}</h2>
    <p>${esc(c.pastText)}</p>
  </div>
  <div class="past-rows">
    ${pastRow(pastDisplays.slice(0, Math.ceil(pastDisplays.length / 2)), 'past-row-a')}
    ${pastRow(pastDisplays.slice(Math.ceil(pastDisplays.length / 2)), 'past-row-b', Math.ceil(pastDisplays.length / 2))}
  </div>
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

// ---------------------------------------------------------------- Visit

export function visit() {
  const c = copy.visit;
  const body = html`
<header class="page-intro page-intro-plain wrap">
  <div class="page-intro-text">
    ${kicker(c.kicker)}
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
    <h2 class="sub-heading">Before you come</h2>
    <ul class="plain-list">${c.before.map((b) => html`<li>${esc(b)}</li>`)}</ul>
  </div>
  <div class="visit-media">
    ${figure('facade', { ratio: '4 / 3', eager: true, sizes: '(min-width: 900px) 40vw, 100vw' })}
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
