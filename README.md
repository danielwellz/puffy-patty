# Puffy Patty Operations App

React (RTL/Persian) frontend + NestJS/Postgres backend for Puffy Patty’s kitchen workflow: shifts, checklists, prep/shopping lists, recipes, expiration rules, and daily logs. Legacy static assets have been removed; the repo now centers on the app code.

## Structure
- `backend/` — NestJS API, Postgres via TypeORM, seed script with Persian data.
- `frontend/` — CRA-based React app with react-router and react-i18next (default language: `fa`, RTL).

## Quick start
1) Backend  
```bash
cd backend
cp .env.example .env            # set DB + JWT values
npm install
npm run seed                    # inserts recipes, checklists, prep/shopping templates, expiration rules, shifts, users
npm run start:dev               # http://localhost:3000/api
```

Sample users (password `password123`):
- Manager: `09120001000`
- Head chef: `09120000001`
- Staff: `09120000002`, `09120000003`, `09120000004`, `09120000005`

2) Frontend  
```bash
cd frontend
npm install
# set REACT_APP_API_URL if the API isn’t on http://localhost:3000/api
npm start                       # http://localhost:3000
```

## What’s included
- Auth (SMS + password), role-based routing/menus, RTL layout.
- Pages: Dashboard, Shift schedule, Open/Handover/Close checklists, Prep list, Shopping list, Purchase/Waste logs, Periodic tasks, Expiration tracker, Recipes.
- Seed data: Persian recipes/ingredients, daily checklists, prep + shopping templates, periodic tasks, expiration rules, and a week of demo shifts.

## Testing & verification
See `TESTING.md` for the manual QA checklist (roles, checklists, lists/logs, RTL/i18n, PWA build).

## Production notes
- Build frontend: `npm run build` then serve the `build/` folder (or proxy via Nest).
- Build backend: `npm run build && npm run start:prod`.
- Keep DB encoding UTF-8 to preserve Persian content.
