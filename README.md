# Puffy Patty static menu site

Modern, bilingual (EN/FA) menu-first landing page inspired by Impossible Foods and Oatly. Pure HTML/CSS/JS; no build step or backend required.

## Run locally
```bash
# from repo root
python -m http.server 8080
# open http://localhost:8080
```

## Deploy (static)
- Serve `index.html`, `css/`, `js/`, `assets/`, and `favicon.svg` from Nginx/Apache or any static host.
- Example Nginx snippet:
```nginx
server {
  listen 80;
  server_name puffypatty.example.com;
  root /var/www/puffy-patty;
  index index.html;
  location / {
    try_files $uri $uri/ =404;
  }
}
```

## Editing content
- Menu items, prices, tags, ingredients, recipes, and media placeholders: `js/menu-data.js` (single source of truth).
- UI text and translations: `js/app.js` (`translations` object).
- Images/icons: swap placeholders in `assets/placeholders/` or add real photos in `assets/`.

## Features
- Sticky header with language toggle (EN/FA) persisted in `localStorage`.
- Menu grid with category and tag pills, debounced search, media-rich modal viewer, and Kitchen Mode for recipe grams.
- RTL support, Persian digit formatting, accessible modals, focus states, reduced-motion respect.

## TODO for production
- Replace image/video placeholders with optimized assets in `assets/menu/`.
- Wire contact/map links to final destinations if needed.
- Minify CSS/JS during deployment if desired.

## Manual test checklist
- Switch EN/FA: verify RTL flip, Persian digits, and intact layout.
- Mobile nav opens/closes; background scroll is locked when open.
- Menu pills + tag filters + search filter correctly.
- Keyboard: Tab to a card, press Enter/Space opens modal; focus stays trapped; ESC closes and focus returns.
- Modal next/prev navigate items; media placeholder shows if no video; Kitchen Mode toggles recipe tab visibility/grams.
- Hosting from a subfolder (`./index.html`) still loads assets (no leading slashes).
- Reduced motion: parallax/marquee/video autoplay toned down; no jarring animations.
- No console errors on load or when interacting with filters/modals.
