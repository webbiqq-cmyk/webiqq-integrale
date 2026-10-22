// Business details. Each fact carries a status so unconfirmed details
// never reach the page by accident:
//   confirmed   – supplied by the client or visible in their own material
//   unconfirmed – seen elsewhere (old demo, third-party listing); not shown

export const business = {
  name: 'integrale',
  description: 'A café in Al Liwan, Hamala, with good coffee, cars on display and room to stay a while.',

  location: {
    // Consistent across the previous demo and a third-party listing.
    // Shown, but listed as "to confirm" in the hand-over notes.
    label: 'Al Liwan, Hamala',
    locality: 'Hamala',
    country: 'Bahrain',
    countryCode: 'BH',
    status: 'confirmed',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=integrale%20Al%20Liwan%20Hamala%20Bahrain',
  },

  streetAddress: {
    value: 'Block 1014, Building 306, Road 1403, Hamala',
    source: 'Third-party restaurant listing',
    status: 'unconfirmed',
  },

  hours: {
    // From the previous demo only. Nothing about hours (and no open/closed
    // note) is shown until status is 'confirmed'. Days use 0 = Sunday,
    // times are Asia/Bahrain.
    status: 'unconfirmed',
    timeZone: 'Asia/Bahrain',
    weekly: [0, 1, 2, 3, 4, 5, 6].map((day) => ({ day, open: '08:00', close: '23:00' })),
    summary: 'Daily, 8:00–23:00',
  },

  instagram: {
    // Supplied by the client as the brand account (verified badge on Instagram).
    handle: 'integrale__',
    url: 'https://www.instagram.com/integrale__/',
    status: 'confirmed',
  },

  otherAccounts: [
    // Linked from the previous demo; relationship to @integrale__ not confirmed.
    { handle: 'integralecoffee', status: 'unconfirmed' },
    { handle: 'integralecars', status: 'unconfirmed' },
  ],

  phone: null,
  email: null,
};

export const nav = [
  { href: '/cafe', label: 'Café & Menu', key: 'cafe' },
  { href: '/space', label: 'The Space', key: 'space' },
  { href: '/visit', label: 'Visit', key: 'visit' },
];

// Old routes kept working after renames and catalogue trims. The shop
// page (and the proposed-collection product pages under it) was removed
// entirely — it read too much like a checkout for a café that isn't
// selling anything online. Send any old links back to the homepage.
export const redirects = [
  { from: '/studio', to: '/space' },
  { from: '/shop', to: '/' },
  { from: '/shop/wordmark-long-sleeve', to: '/' },
  { from: '/shop/murcielago-print', to: '/' },
  { from: '/shop/key-tag', to: '/' },
  { from: '/shop/studio-cap', to: '/' },
  { from: '/shop/espresso-cup', to: '/' },
  { from: '/shop/monogram-tee', to: '/' },
  { from: '/shop/cap', to: '/' },
  { from: '/shop/canvas-tote', to: '/' },
  { from: '/shop/diablo-print', to: '/' },
];
