// Business details. Each fact carries a status so unconfirmed details
// never reach the page by accident:
//   confirmed   – supplied by the client or visible in their own material
//   unconfirmed – seen elsewhere (old demo, third-party listing); not shown

export const business = {
  name: 'integrale',
  description: 'An automotive studio, café and shop at Al Liwan, Hamala, Bahrain.',

  location: {
    // Consistent across the previous demo and a third-party listing.
    // Shown, but listed as "to confirm" in the hand-over notes.
    label: 'Al Liwan, Hamala',
    country: 'Bahrain',
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
    // From the previous demo only. The open/closed indicator stays off until
    // status is 'confirmed'. Days use 0 = Sunday, times are Asia/Bahrain.
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
  { href: '/studio', label: 'Studio', key: 'studio' },
  { href: '/cafe', label: 'Café', key: 'cafe' },
  { href: '/shop', label: 'Shop', key: 'shop' },
  { href: '/visit', label: 'Visit', key: 'visit' },
];
