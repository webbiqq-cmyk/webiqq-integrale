// Café menu. No confirmed menu has been supplied, so `status` is 'sample'
// and the page says so. Replace items with integrale's own and set
// status to 'confirmed'. Leave `price` as null until prices are confirmed;
// prices are only rendered when present.

export const menu = {
  status: 'sample',
  currency: 'BHD',
  categories: [
    {
      id: 'coffee',
      title: 'Coffee',
      items: [
        { name: 'Espresso', note: 'A short double shot.', price: null },
        { name: 'Cortado', note: 'Espresso with a little steamed milk.', price: null },
        { name: 'Flat white', note: 'Double espresso, thin milk.', price: null },
        { name: 'Latte', note: 'Hot, or over ice.', price: null },
        { name: 'Filter', note: 'Brewed by hand, one cup at a time.', price: null },
      ],
    },
    {
      id: 'other-drinks',
      title: 'Not coffee',
      items: [
        { name: 'Matcha latte', note: 'Hot, or over ice.', price: null },
        { name: 'Hot chocolate', note: 'Made with steamed milk.', price: null },
        { name: 'Tea', note: 'Ask what we have in.', price: null },
        { name: 'Water', note: 'Still or sparkling.', price: null },
      ],
    },
    {
      id: 'food',
      title: 'Something to eat',
      items: [
        { name: 'Basque cheesecake', note: 'By the slice.', price: null },
        { name: 'Pastries', note: 'Whatever is in the case on the counter.', price: null },
      ],
    },
  ],
};

// Items shown in the short preview on the homepage.
export const menuPreview = ['Espresso', 'Flat white', 'Latte', 'Filter', 'Matcha latte', 'Basque cheesecake'];
