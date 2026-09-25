# Seron product catalog — React app

## Setup

1. Unzip this into a folder (e.g. `C:\Users\Bhajan H P\Documents\AT_Tiles\seron-app`).
2. Copy every file from your `seron_images/` folder into `public/images/` in this project.
   The filenames must match exactly — they already do, since `src/data/products.json`
   was generated using the same filename logic as `download_images.py`.
3. Open a terminal in this folder and run:

   ```
   npm install
   npm run dev
   ```

4. Open the URL it prints (usually http://localhost:5173).

## What's here

- `src/data/products.json` — your 38 scraped products, each with `image`, `sizeLabel`,
  and `collectionLabel`.
- `src/components/FilterSidebar.jsx` — the Size / Collection filters.
- `src/components/ProductGrid.jsx` + `ProductCard.jsx` — the image grid.
- `src/components/ProductModal.jsx` — the click-to-enlarge detail view.
- `src/App.jsx` — wires filtering state together.

## If images don't show up

Open your browser's DevTools (F12) → Network tab, reload, and check for 404s on
`/images/...`. That means a filename in `products.json` doesn't match a file in
`public/images/`. Compare the two folders' file listings directly rather than
guessing — this exact mismatch has bitten us once already in this project.
