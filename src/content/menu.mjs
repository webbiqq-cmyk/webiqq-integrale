// Café menu. Items and prices are transcribed from integrale's own Instagram
// highlights ("Coffee", "Matcha", "Non Coffee", "To Eat") — status is
// 'confirmed' because it's the café's own published menu. Two item notes
// (Turkey Sandwich, Lemon Ginger Fizz) use descriptions posted alongside
// those items; the rest are short, generic descriptions of the drink itself.
// Worth a final check against the printed menu before this goes fully live.

export const menu = {
  status: 'confirmed',
  currency: 'BHD',
  categories: [
    {
      id: 'coffee',
      title: 'Coffee',
      items: [
        { name: 'Espresso', note: 'A short, strong shot.', price: '1.3' },
        { name: 'Espresso Macchiato', note: 'Espresso marked with a little foam.', price: '1.5' },
        { name: 'Cortado', note: 'Espresso cut with a little steamed milk.', price: '1.9' },
        { name: 'Flat White', note: 'Double espresso, thin milk.', price: '2.1' },
        { name: 'Cappucino', note: 'Espresso with steamed, foamed milk.', price: '2.2' },
        { name: 'Latte', note: 'Hot, or over ice.', price: '2.2' },
        { name: 'Americano', note: 'Hot, or over ice.', price: '1.8' },
        { name: 'Cold Brew', note: 'Slow-steeped, served over ice.', price: '2.3' },
        { name: 'Integrale Latte', note: 'The house latte.', price: '2.8' },
        { name: 'Spanish Latte / Toffee Latte', note: 'Hot, or over ice.', price: '2.5' },
        { name: 'Blendissimo', note: 'The café’s own iced blend.', price: '2.8' },
        { name: 'Affogato', note: 'Espresso poured over ice cream.', price: '2.8' },
        { name: 'V60 / Chemex', note: 'Filter coffee, brewed by hand.', price: null },
      ],
    },
    {
      id: 'matcha',
      title: 'Matcha',
      items: [
        { name: 'Matcha Latte', note: 'Hot, or over ice.', price: '2.8' },
        { name: 'Coconut Matcha', note: 'With coconut milk, over ice.', price: '2.8' },
        { name: 'Strawberry Matcha', note: 'With strawberry, over ice.', price: '2.8' },
        { name: 'Blueberry Matcha', note: 'With blueberry, over ice.', price: '2.8' },
        { name: 'Matcha Tonic', note: 'Matcha and tonic water, over ice.', price: '2.8' },
        { name: 'Earl Grey Matcha', note: 'Matcha and Earl Grey, over ice.', price: '2.8' },
      ],
    },
    {
      id: 'non-coffee',
      title: 'Non Coffee',
      items: [
        { name: 'Assorted Tea', note: 'Ask what we have in.', price: '1.5' },
        { name: 'Iced Hibiscus', note: 'Chilled hibiscus, over ice.', price: '2.2' },
        { name: 'Rose Hibiscus', note: 'Hibiscus with rose, over ice.', price: '2.2' },
        { name: 'Lemon Ginger Fizz', note: 'Homemade lemon ginger syrup and sparkling water.', price: '2.5' },
        { name: 'Saffron Milk', note: 'Warm milk with saffron.', price: '2.5' },
        { name: 'Integrale Cooler', note: 'The café’s own cooler.', price: '2.5' },
        { name: 'Hot Chocolate / Iced Chocolate', note: 'Hot, or over ice.', price: '2.5' },
        { name: 'Earl Swirl', note: 'Earl Grey, swirled.', price: '2.5' },
        { name: 'Pink Colada', note: '', price: '2.8' },
      ],
    },
    {
      id: 'to-eat',
      title: 'To Eat',
      items: [
        { name: 'Breakfast Sandwich', note: '', price: '3.0' },
        { name: 'Turkey Sandwich', note: 'Sliced turkey, tomato pesto, melted cheddar cheese and freshly baked ciabatta bread.', price: '2.8' },
        { name: 'Tuna Sandwich', note: '', price: '3.2' },
        { name: 'Chicken Ciabatta', note: '', price: '3.0' },
        { name: 'Nutella Crepe', note: '', price: '2.5' },
        { name: 'Kinder Crepe', note: '', price: '2.5' },
        { name: 'Choco Cinnamon Crepe', note: '', price: '2.5' },
        { name: 'Caramel Stroopwafel', note: '', price: '1.5' },
        { name: 'Nutella Stroopwafel', note: '', price: '1.5' },
      ],
    },
  ],
};

// Category teaser shown on the homepage — no specific items or prices,
// just what's on offer. The full list is on /cafe#menu.
export const menuPreview = [
  { icon: 'cup', label: 'Coffee' },
  { icon: 'matcha', label: 'Matcha' },
  { icon: 'sandwich', label: 'Something to eat' },
  { icon: 'dessert', label: 'Dessert' },
];
