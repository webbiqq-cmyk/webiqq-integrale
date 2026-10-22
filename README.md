# integrale — concept website

Static site for integrale, a café at Al Liwan, Hamala, Bahrain, with cars on display and a few things to take home. Prepared by WebiQQ.

```
npm run build   # writes dist/ (no dependencies, Node 18+)
npm run serve   # previews dist/ at http://localhost:4173 with clean URLs
```

Vercel builds with `node build.mjs` and serves `dist/` (see `vercel.json`).

## Where things live

| What | File |
| --- | --- |
| Address, hours, Instagram, nav | `src/content/business.mjs` |
| Photo alt text, captions, focal points | `src/content/photos.mjs` |
| Page copy (headlines, intros, notes) | `src/content/copy.mjs` |
| Cars on display / past displays | `src/content/space.mjs` |
| Café menu | `src/content/menu.mjs` |
| Page templates / shared markup | `build/pages.mjs`, `build/components.mjs` |
| Styles / behaviour | `src/assets/css/site.css`, `src/assets/js/site.js` |

Images live in `src/assets/img` as `<name>-<width>.jpg|webp`; their sizes are listed in `src/content/images.json`.

## Before this goes live

- **Opening hours**: unconfirmed and not shown. Set `hours.status` to `'confirmed'` to publish them (an open/closed note in Bahrain time then appears).
- **Menu**: items and prices are transcribed from integrale's own Instagram highlights (Coffee, Matcha, Non Coffee, To Eat), so `menu.status` is `'confirmed'`. Worth a final check against the printed menu — a few item notes are generic descriptions rather than the café's own wording, and V60/Chemex has no price (it was unreadable in the source).
- **Shop**: the Shop page and nav link were removed entirely — there used to be a shelves page, and before that a "proposed collection" of fictional products with a save/checkout-style flow; both read like an online shop for a café that isn't selling anything online. Old `/shop` links redirect to the homepage. If integrale ever wants a shop section, that would need designing again from scratch with real products and prices, not revived from history.
- **Logo**: the monogram is a redraw traced from photos (`src/assets/brand/monogram.svg`); the wordmark (`wordmark.svg`) is outlined from Newsreader as a stand-in. Replace both with the original artwork.
- **Displayed cars**: every car photo is from past Instagram posts. Nothing on the site states what is on display now.
- **Photography**: several photos are crops of Instagram screenshots (at most 1320px wide). Use the original files where possible.
- **Accounts**: only @integrale__ is shown. The @integralecoffee and @integralecars accounts linked from the old demo are unconfirmed.
