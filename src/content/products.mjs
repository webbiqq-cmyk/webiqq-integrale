// Shop catalogue.
//
// No real product catalogue or commerce backend exists yet, so every item
// here is PROPOSED: a design for integrale's own range, drawn as a flat
// sketch (see build/mockups.mjs), with no price, stock or delivery
// information. To add a real product, set `proposed: false`, give it a
// `price`, and replace `views` with photographs ({ photo: '<image key>' }).

export const categories = [
  { id: 'clothing', label: 'Clothing' },
  { id: 'accessories', label: 'Accessories' },
  { id: 'print', label: 'Prints' },
  { id: 'objects', label: 'Objects' },
];

// Garment/material colours. `ink` is the colour printed on top.
const colours = {
  paper: { label: 'Paper', value: '#F3F0E8', ink: '#232522' },
  ink: { label: 'Ink', value: '#2B2C29', ink: '#ECE7DC' },
  olive: { label: 'Olive', value: '#62654A', ink: '#ECE7DC' },
  stone: { label: 'Stone', value: '#D3CABB', ink: '#232522' },
  blue: { label: 'Café blue', value: '#BCD5E2', ink: '#232522' },
  canvas: { label: 'Natural', value: '#E6DCC8', ink: '#232522' },
};
const pick = (...ids) => ids.map((id) => ({ id, ...colours[id] }));

export const products = [
  {
    slug: 'espresso-cup',
    name: 'Espresso cup',
    category: 'objects',
    proposed: true,
    price: null,
    summary: 'The café’s pale blue, in ceramic for home.',
    description:
      'A small cup and saucer in the same pale blue as the café’s takeaway cups, with the monogram on the side.',
    details: ['Proposed: glazed stoneware', 'Proposed: cup and saucer set'],
    colours: pick('blue', 'paper'),
    sizes: null,
    views: [{ kind: 'cup', side: 'front' }, { kind: 'cup', side: 'top' }],
  },
  {
    slug: 'monogram-tee',
    name: 'Monogram T-shirt',
    category: 'clothing',
    proposed: true,
    price: null,
    summary: 'The monogram small on the chest, the wordmark across the back.',
    description:
      'A plain, heavy T-shirt for the rail by the window: the monogram from the wall small on the chest and the wordmark across the shoulders.',
    details: ['Proposed: heavyweight cotton jersey', 'Proposed: relaxed fit', 'Print positions are indicative'],
    colours: pick('paper', 'ink', 'olive'),
    sizes: ['S', 'M', 'L', 'XL'],
    views: [{ kind: 'tee', side: 'front' }, { kind: 'tee', side: 'back' }],
  },
  {
    slug: 'cap',
    name: 'Cap',
    category: 'accessories',
    proposed: true,
    price: null,
    summary: 'A soft six-panel cap with the monogram embroidered on the front.',
    description: 'A soft six-panel cap with the monogram embroidered in a tone close to the cloth, so it reads up close.',
    details: ['Proposed: washed cotton twill', 'Proposed: embroidered monogram'],
    colours: pick('stone', 'ink', 'blue'),
    sizes: null,
    views: [{ kind: 'cap', side: 'side' }, { kind: 'cap', side: 'front' }],
  },
  {
    slug: 'canvas-tote',
    name: 'Canvas tote',
    category: 'accessories',
    proposed: true,
    price: null,
    summary: 'For a book, a bag of beans, or whatever comes home with you.',
    description: 'A flat canvas tote with the wordmark printed low on the front.',
    details: ['Proposed: heavy cotton canvas', 'Proposed: screen-printed wordmark'],
    colours: pick('canvas', 'ink'),
    sizes: null,
    views: [{ kind: 'tote', side: 'front' }],
  },
  {
    slug: 'diablo-print',
    name: 'Print: the Diablo by the window',
    category: 'print',
    proposed: true,
    price: null,
    summary: 'integrale’s own photograph of the purple Diablo VT in the café, October 2023.',
    description:
      'integrale’s own photograph of the purple Lamborghini Diablo VT on the café floor, printed with a wide paper border.',
    details: ['Proposed: matte archival paper', 'Shown framed for scale; frame not part of the proposal'],
    formats: ['A3', 'A2'],
    photo: 'diablo-interior',
    views: [{ kind: 'print', side: 'framed' }],
  },
];

// Homepage selection.
export const featuredProducts = ['espresso-cup', 'monogram-tee', 'cap'];
