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
| Shop products | `src/content/products.mjs` |
| Page templates / shared markup | `build/pages.mjs`, `build/components.mjs` |
| Concept product illustrations | `build/mockups.mjs` |
| Styles / behaviour | `src/assets/css/site.css`, `src/assets/js/site.js` |

Images live in `src/assets/img` as `<name>-<width>.jpg|webp`; their sizes are listed in `src/content/images.json`.

## Before this goes live

- **Opening hours**: unconfirmed and not shown. Set `hours.status` to `'confirmed'` to publish them (an open/closed note in Bahrain time then appears).
- **Menu**: every item is a sample. Replace the items, add prices, and set `menu.status` to `'confirmed'`.
- **Shop**: the five pieces are proposed designs drawn as flat sketches; nothing is for sale and there is no checkout. "Saved items" stay in the visitor's browser and are never sent anywhere. Real product photographs (or realistic concept renders) would replace the sketches.
- **Logo**: the monogram is a redraw traced from photos (`src/assets/brand/monogram.svg`); the wordmark (`wordmark.svg`) is outlined from Newsreader as a stand-in. Replace both with the original artwork.
- **Displayed cars**: every car photo is from past Instagram posts. Nothing on the site states what is on display now.
- **Photography**: several photos are crops of Instagram screenshots (at most 1320px wide). Use the original files where possible.
- **Accounts**: only @integrale__ is shown. The @integralecoffee and @integralecars accounts linked from the old demo are unconfirmed.
