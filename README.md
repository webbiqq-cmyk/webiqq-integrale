# integrale — concept website

Static site for integrale (automotive studio, café and shop at Al Liwan, Hamala, Bahrain), prepared by WebiQQ.

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
| Studio archive and homepage moments | `src/content/studio.mjs` |
| Café menu | `src/content/menu.mjs` |
| Shop products | `src/content/products.mjs` |
| Page templates / shared markup | `build/pages.mjs`, `build/components.mjs` |
| Concept product illustrations | `build/mockups.mjs` |
| Styles / behaviour | `src/assets/css/site.css`, `src/assets/js/site.js` |

Images live in `src/assets/img` as `<name>-<width>.jpg|webp`; their sizes are listed in `src/content/images.json`.

## Before this goes live

- **Opening hours**: unconfirmed and not shown. Set `hours.status` to `'confirmed'` to publish them (an open/closed note in Bahrain time then appears).
- **Menu**: every item is a sample. Replace the items, add prices, and set `menu.status` to `'confirmed'`.
- **Shop**: every product is a concept illustration, nothing is for sale, and there is no checkout. The "list" stays in the visitor's browser and is never sent anywhere.
- **Logo**: the monogram is a redraw traced from photos (`src/assets/brand/monogram.svg`), and the wordmark is set in Newsreader. Replace both with the original artwork.
- **Photography**: several photos are crops of Instagram screenshots (at most 1320px wide). Use the original files where possible.
- **Accounts**: only @integrale__ is shown. The @integralecoffee and @integralecars accounts linked from the old demo are unconfirmed.
