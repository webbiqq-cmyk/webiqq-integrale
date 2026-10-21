// Shop catalogue.
//
// No real product catalogue or commerce backend exists yet, so every item
// here is a CONCEPT: a design proposal drawn as an illustration (see
// build/mockups.mjs), with no price, stock or delivery information. To add
// a real product, set `concept: false`, give it `price` and swap `views`
// for photographs ({ photo: '<image key>' }).

export const categories = [
  { id: 'clothing', label: 'Clothing' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'print', label: 'Printed matter' },
  { id: 'objects', label: 'Objects' },
];

// Garment/material colours. `ink` is the colour printed on top.
const colours = {
  paper: { label: 'Paper', value: '#F1EEE6', ink: '#24241F' },
  ink: { label: 'Ink', value: '#2A2A29', ink: '#ECE7DC' },
  olive: { label: 'Olive', value: '#5E6148', ink: '#ECE7DC' },
  stone: { label: 'Stone', value: '#CDC4B3', ink: '#24241F' },
  blue: { label: 'Pale blue', value: '#B7CFE0', ink: '#24241F' },
  canvas: { label: 'Natural', value: '#E3D8C2', ink: '#24241F' },
  tan: { label: 'Tan', value: '#A57A50', ink: '#6E4E30' },
};
const pick = (...ids) => ids.map((id) => ({ id, ...colours[id] }));

export const products = [
  {
    slug: 'monogram-tee',
    name: 'Monogram T-shirt',
    category: 'clothing',
    concept: true,
    price: null,
    summary: 'The monogram small on the chest, the wordmark across the back.',
    description:
      'A plain, heavy T-shirt for the rail by the cars: the monogram from the wall printed small on the chest and the wordmark from the façade across the shoulders.',
    details: ['Proposed: heavyweight cotton jersey', 'Proposed: relaxed fit', 'Print positions shown are indicative'],
    colours: pick('paper', 'ink', 'olive'),
    sizes: ['S', 'M', 'L', 'XL'],
    views: [{ kind: 'tee', side: 'front' }, { kind: 'tee', side: 'back' }, { kind: 'tee', side: 'detail' }],
  },
  {
    slug: 'wordmark-long-sleeve',
    name: 'Wordmark long sleeve',
    category: 'clothing',
    concept: true,
    price: null,
    summary: 'Long sleeves, the wordmark down one arm.',
    description:
      'A long-sleeve tee for the cooler months, with the wordmark running down the left sleeve and the monogram at the back of the neck.',
    details: ['Proposed: midweight cotton jersey', 'Proposed: regular fit', 'Print positions shown are indicative'],
    colours: pick('ink', 'stone'),
    sizes: ['S', 'M', 'L', 'XL'],
    views: [{ kind: 'longsleeve', side: 'front' }, { kind: 'longsleeve', side: 'back' }],
  },
  {
    slug: 'studio-cap',
    name: 'Studio cap',
    category: 'accessories',
    concept: true,
    price: null,
    summary: 'A six-panel cap with the monogram embroidered on the front.',
    description: 'A soft six-panel cap with the monogram embroidered in a tone close to the cloth, so it reads up close.',
    details: ['Proposed: washed cotton twill', 'Proposed: embroidered monogram'],
    colours: pick('ink', 'stone', 'blue'),
    sizes: null,
    views: [{ kind: 'cap', side: 'side' }, { kind: 'cap', side: 'front' }],
  },
  {
    slug: 'canvas-tote',
    name: 'Canvas tote',
    category: 'accessories',
    concept: true,
    price: null,
    summary: 'For books, magazines and whatever else comes home from the shelves.',
    description: 'A flat canvas tote, big enough for a stack of car books, with the wordmark printed low on the front.',
    details: ['Proposed: heavy cotton canvas', 'Proposed: screen-printed wordmark'],
    colours: pick('canvas', 'ink'),
    sizes: null,
    views: [{ kind: 'tote', side: 'front' }],
  },
  {
    slug: 'diablo-print',
    name: 'Print: Diablo VT on the floor',
    category: 'print',
    concept: true,
    price: null,
    summary: 'A print of the purple Diablo VT inside integrale, October 2023.',
    description:
      'integrale’s own photograph of the purple Lamborghini Diablo VT on the herringbone floor, printed with a wide paper border.',
    details: ['Proposed: matte archival paper', 'Shown framed for scale; frame not included in the proposal'],
    formats: ['A3', 'A2'],
    photo: 'diablo-interior',
    views: [{ kind: 'print', side: 'framed' }, { kind: 'print', side: 'detail' }],
  },
  {
    slug: 'murcielago-print',
    name: 'Print: Murciélago SV by the shelves',
    category: 'print',
    concept: true,
    price: null,
    summary: 'A print of the yellow Murciélago SV beside the shop shelves, May 2023.',
    description:
      'integrale’s own photograph of the yellow Lamborghini Murciélago SV in front of the lit clothing shelves, printed with a wide paper border.',
    details: ['Proposed: matte archival paper', 'Shown framed for scale; frame not included in the proposal'],
    formats: ['A3', 'A2'],
    photo: 'murcielago-shelf',
    views: [{ kind: 'print', side: 'framed' }, { kind: 'print', side: 'detail' }],
  },
  {
    slug: 'espresso-cup',
    name: 'Espresso cup',
    category: 'objects',
    concept: true,
    price: null,
    summary: 'The café’s pale blue, made in ceramic for home.',
    description:
      'A small ceramic cup and saucer in the same pale blue as the café’s takeaway cups, with the monogram on the side.',
    details: ['Proposed: glazed stoneware', 'Proposed: cup and saucer set'],
    colours: pick('blue', 'paper'),
    sizes: null,
    views: [{ kind: 'cup', side: 'front' }, { kind: 'cup', side: 'top' }],
  },
  {
    slug: 'key-tag',
    name: 'Leather key tag',
    category: 'objects',
    concept: true,
    price: null,
    summary: 'A leather tag for the keys, monogram pressed in.',
    description: 'A simple leather key tag with the monogram debossed into one face, on a plain steel ring.',
    details: ['Proposed: vegetable-tanned leather', 'Proposed: debossed monogram'],
    colours: pick('tan', 'ink'),
    sizes: null,
    views: [{ kind: 'keytag', side: 'front' }],
  },
];

export const featuredProducts = ['monogram-tee', 'studio-cap', 'diablo-print', 'espresso-cup'];
