# Base44 Dev Environment

## Overview
Static sports scores site (HTML + CSS) using [API-Sports.io](https://widgets.api-sports.io) widgets.
Originally deployed on Netlify; runs locally via a lightweight Express server (`server.js`).

## Architecture
- `index.html` — main page with Bootstrap 5 (CDN) and API-Sports widgets
- `style.css` — custom styles
- `netlify/functions/get-config.js` — Netlify function returning `API_SPORTS_KEY` to the frontend
- `server.js` — Express dev server: serves static files + proxies `/.netlify/functions/get-config`

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
App is on **port 3000**. The container auto-installs npm deps on boot.

## Secrets
- `API_SPORTS_KEY` — from the api-sports.io / api-football.com dashboard. Without it the page loads but widgets show no data. Delivered via `/run/base44/app.env`.

## Notes
- The frontend fetches `/.netlify/functions/get-config` on DOMContentLoaded to get the API key, then sets it on the `<api-sports-widget data-type="config">` element.
- Sport switching (nav bar) re-renders the widgets by calling `connectedCallback()` on the custom elements.
- No build step; no database; no migrations.
