// Illustrated product mockups for the concept collection.
//
// Each view is an inline SVG on a 800×1000 stage. Colours come from CSS
// custom properties on a wrapping element, so changing the colour option
// on a product page only has to change those properties:
//   --g   garment / material colour
//   --gi  colour printed, embroidered or pressed into it
// Classes (.mk-*) are styled in site.css.

const MONO =
  '<path d="M3.01 39A38 48 0 0 1 76.99 39L70.46 37A34.5 32 0 0 0 9.54 37Z"/>' +
  '<path d="M3.01 61A38 48 0 0 0 76.99 61L70.46 63A34.5 32 0 0 1 9.54 63Z"/>' +
  '<rect x="34.5" y="2" width="11" height="96"/>';

// Monogram centred on (cx, cy) at height h.
const mono = (cx, cy, h, cls = 'mk-gi', extra = '') => {
  const s = h / 100;
  return `<g class="${cls}" ${extra} transform="translate(${cx - 40 * s} ${cy - 50 * s}) scale(${s})">${MONO}</g>`;
};

const word = (x, y, size, cls = 'mk-gi', extra = '') =>
  `<text class="mk-word ${cls}" x="${x}" y="${y}" font-size="${size}" text-anchor="middle" ${extra}>integrale</text>`;

const svg = (body, label, viewBox = '0 0 800 1000') =>
  `<svg class="mk" viewBox="${viewBox}" role="img" aria-label="${label}" preserveAspectRatio="xMidYMid slice"><rect class="mk-stage" x="-400" y="-400" width="1600" height="1800"/>${body}</svg>`;

// Soft contact shadow: the same outline, offset and very faint.
const shadow = (d) => `<path class="mk-shadow" transform="translate(7 10)" d="${d}"/>`;

const TEE_FRONT =
  'M318 190 L210 222 L112 352 L196 404 L246 336 L246 842 Q246 858 262 858 L538 858 Q554 858 554 842 L554 336 L604 404 L688 352 L590 222 L482 190 Q400 262 318 190 Z';
const TEE_BACK =
  'M318 190 L210 222 L112 352 L196 404 L246 336 L246 842 Q246 858 262 858 L538 858 Q554 858 554 842 L554 336 L604 404 L688 352 L590 222 L482 190 Q400 214 318 190 Z';

function tee(side, name) {
  if (side === 'detail') {
    // Close crop of the chest print.
    return svg(
      `<path class="mk-g" d="${TEE_FRONT}"/>` +
        `<path class="mk-fold" d="M420 300 Q470 420 452 560 L438 560 Q452 420 410 300 Z"/>` +
        mono(482, 318, 56),
      `${name}, close-up of the chest print`,
      '392 238 180 225',
    );
  }
  const front = side === 'front';
  const body = front ? TEE_FRONT : TEE_BACK;
  return svg(
    shadow(body) +
      `<path class="mk-g" d="${body}"/>` +
      // Sleeve hems and side folds
      `<path class="mk-line" d="M196 404 L246 336 M604 404 L554 336 M128 362 L206 410 M672 362 L594 410"/>` +
      `<path class="mk-fold" d="M300 420 Q330 600 300 820 L312 820 Q342 600 312 420 Z"/>` +
      `<path class="mk-fold" d="M500 470 Q470 640 506 830 L494 830 Q458 640 488 470 Z"/>` +
      (front
        ? `<path class="mk-collar" d="M318 190 Q400 262 482 190 L468 186 Q400 240 332 186 Z"/>` +
          `<path class="mk-inside" d="M332 186 Q400 170 468 186 Q400 240 332 186 Z"/>` +
          mono(482, 318, 56)
        : `<path class="mk-collar" d="M318 190 Q400 214 482 190 L468 186 Q400 204 332 186 Z"/>` +
          word(400, 352, 84)),
    `${name}, ${front ? 'front' : 'back'}`,
  );
}

const LS =
  'M318 190 L214 220 Q178 240 168 300 L118 702 L186 714 L248 384 L248 842 Q248 858 264 858 L536 858 Q552 858 552 842 L552 384 L614 714 L682 702 L632 300 Q622 240 586 220 L482 190 Q400 262 318 190 Z';
const LS_BACK = LS.replace('Q400 262 318 190', 'Q400 214 318 190');

function longsleeve(side, name) {
  const front = side === 'front';
  const body = front ? LS : LS_BACK;
  return svg(
    shadow(body) +
      `<path class="mk-g" d="${body}"/>` +
      `<path class="mk-line" d="M248 384 L214 220 M552 384 L586 220 M124 666 L190 678 M676 666 L610 678"/>` +
      `<path class="mk-fold" d="M310 430 Q340 620 306 830 L318 830 Q352 620 322 430 Z"/>` +
      `<path class="mk-fold" d="M492 480 Q462 650 498 830 L486 830 Q450 650 480 480 Z"/>` +
      (front
        ? `<path class="mk-collar" d="M318 190 Q400 262 482 190 L468 186 Q400 240 332 186 Z"/>` +
          `<path class="mk-inside" d="M332 186 Q400 170 468 186 Q400 240 332 186 Z"/>` +
          // Wordmark running down the wearer's left sleeve (viewer's right).
          word(0, 0, 40, 'mk-gi', 'transform="translate(632 470) rotate(82)"')
        : `<path class="mk-collar" d="M318 190 Q400 214 482 190 L468 186 Q400 204 332 186 Z"/>` +
          mono(400, 250, 40)),
    `${name}, ${front ? 'front' : 'back'}`,
  );
}

function cap(side, name) {
  if (side === 'side') {
    const crown = 'M214 610 Q226 352 432 342 Q596 352 606 610 Z';
    return svg(
      `<ellipse class="mk-shadow" cx="430" cy="664" rx="300" ry="26"/>` +
        `<path class="mk-g" d="${crown}"/>` +
        `<path class="mk-line" d="M432 342 Q470 470 486 610 M432 342 Q360 470 330 610"/>` +
        `<ellipse class="mk-dark" cx="432" cy="344" rx="16" ry="7"/>` +
        `<path class="mk-g" d="M560 598 Q690 598 734 646 Q716 668 600 660 Z"/>` +
        `<path class="mk-shade" d="M560 598 Q690 598 734 646 Q716 668 600 660 Z"/>` +
        `<path class="mk-g" d="M206 604 L608 604 L606 624 L210 626 Z"/>` +
        `<path class="mk-line" d="M210 616 L606 616"/>` +
        mono(0, 0, 70, 'mk-gi', 'transform="translate(536 476) scale(.72 1)"'),
      `${name}, side`,
    );
  }
  const crown = 'M196 600 Q196 318 400 306 Q604 318 604 600 Z';
  const brim = 'M168 584 Q400 548 632 584 Q676 650 612 724 Q400 800 188 724 Q124 650 168 584 Z';
  return svg(
    `<ellipse class="mk-shadow" cx="404" cy="784" rx="236" ry="26"/>` +
      `<path class="mk-g" d="${crown}"/>` +
      `<path class="mk-line" d="M400 308 Q328 410 304 596 M400 308 Q472 410 496 596"/>` +
      `<ellipse class="mk-dark" cx="400" cy="308" rx="15" ry="6"/>` +
      `<circle class="mk-dark" cx="294" cy="420" r="5"/><circle class="mk-dark" cx="506" cy="420" r="5"/>` +
      `<path class="mk-g" d="${brim}"/>` +
      `<path class="mk-shade" d="${brim}"/>` +
      `<path class="mk-line" d="M184 612 Q400 578 616 612 M196 700 Q400 764 604 700"/>` +
      mono(400, 470, 96),
    `${name}, front`,
  );
}

function tote(side, name) {
  const body = 'M232 372 L568 372 L578 872 L222 872 Z';
  return svg(
    shadow(body) +
      `<path class="mk-handle" d="M300 380 Q300 168 400 168 Q500 168 500 380"/>` +
      `<path class="mk-handle" d="M330 380 Q330 210 400 210 Q470 210 470 380"/>` +
      `<path class="mk-g" d="${body}"/>` +
      `<path class="mk-line" d="M232 392 L568 392"/>` +
      `<path class="mk-fold" d="M300 420 Q320 640 290 860 L302 860 Q332 640 312 420 Z"/>` +
      word(400, 812, 58),
    `${name}, front`,
  );
}

function print(side, name, photo) {
  const img = `/assets/img/${photo}-640.jpg`;
  if (side === 'detail') {
    return svg(
      `<rect class="mk-mat" x="0" y="0" width="800" height="1000"/>` +
        `<image href="${img}" x="-60" y="-300" width="760" height="950" preserveAspectRatio="xMidYMid slice"/>` +
        `<text class="mk-small" x="40" y="740" font-size="30">integrale — 2023</text>` +
        `<text class="mk-small mk-muted" x="40" y="784" font-size="24">Printed from integrale’s own photograph</text>`,
      `${name}, corner detail`,
      '0 0 800 1000',
    );
  }
  return svg(
    `<rect class="mk-shadow" x="194" y="186" width="440" height="622"/>` +
      `<rect class="mk-frame" x="180" y="172" width="440" height="622"/>` +
      `<rect class="mk-mat" x="194" y="186" width="412" height="594"/>` +
      `<image href="${img}" x="246" y="240" width="308" height="385" preserveAspectRatio="xMidYMid slice"/>` +
      `<text class="mk-small" x="246" y="668" font-size="15">integrale — 2023</text>`,
    `${name}, framed on a wall`,
  );
}

function cup(side, name) {
  if (side === 'top') {
    return svg(
      `<circle class="mk-shadow" cx="410" cy="510" r="262"/>` +
        `<circle class="mk-g" cx="400" cy="500" r="262"/>` +
        `<circle class="mk-shade" cx="400" cy="500" r="200"/>` +
        `<rect class="mk-g" x="540" y="476" width="110" height="48" rx="24"/>` +
        `<circle class="mk-g" cx="400" cy="500" r="152"/>` +
        `<circle class="mk-coffee" cx="400" cy="500" r="128"/>` +
        `<circle class="mk-crema" cx="400" cy="500" r="104"/>`,
      `${name}, from above`,
    );
  }
  return svg(
    `<ellipse class="mk-shadow" cx="410" cy="736" rx="250" ry="56"/>` +
      `<ellipse class="mk-g" cx="400" cy="722" rx="236" ry="54"/>` +
      `<ellipse class="mk-shade" cx="400" cy="716" rx="150" ry="30"/>` +
      `<path class="mk-handle" d="M536 520 Q616 516 606 584 Q596 638 524 634"/>` +
      `<path class="mk-g" d="M258 470 L542 470 Q538 650 470 712 L330 712 Q262 650 258 470 Z"/>` +
      `<ellipse class="mk-g" cx="400" cy="470" rx="142" ry="28"/>` +
      `<ellipse class="mk-coffee" cx="400" cy="472" rx="124" ry="20"/>` +
      `<path class="mk-fold" d="M300 500 Q306 620 350 696 L338 696 Q290 620 288 500 Z"/>` +
      mono(410, 586, 82),
    `${name}, side`,
  );
}

function keytag(side, name) {
  const body = 'M330 360 L470 360 Q500 360 500 392 L500 760 Q500 804 456 804 L344 804 Q300 804 300 760 L300 392 Q300 360 330 360 Z';
  return svg(
    `<circle class="mk-ring" cx="400" cy="250" r="64"/>` +
      shadow(body) +
      `<rect class="mk-g" x="378" y="300" width="44" height="80" rx="8"/>` +
      `<path class="mk-g" d="${body}"/>` +
      `<path class="mk-stitch" d="M330 378 L470 378 Q484 378 484 394 L484 758 Q484 788 454 788 L346 788 Q316 788 316 758 L316 394 Q316 378 330 378 Z"/>` +
      `<circle class="mk-rivet" cx="400" cy="408" r="11"/>` +
      mono(402, 602, 150, 'mk-hi') +
      mono(400, 600, 150, 'mk-gi'),
    `${name}, front`,
  );
}

const renderers = { tee, longsleeve, cap, tote, print, cup, keytag };

export function renderView(product, view) {
  return renderers[view.kind](view.side, product.name, product.photo);
}

// Inline style that sets the colour variables for a colour option.
export function colourVars(colour) {
  if (!colour) return '';
  return `--g:${colour.value};--gi:${colour.ink}`;
}
