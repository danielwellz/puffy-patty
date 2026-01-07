# Puffy Patty Backend (NestJS + Postgres)

NestJS API that powers the Puffy Patty operations app (auth, shifts, checklists, prep/shopping, waste/purchase logs, recipes, expiration rules).

## Prerequisites
- Node 18+
- Postgres running locally (Docker compose includes a `db` service)

## Setup
```bash
cp .env.example .env
npm install
docker compose up -d db   # optional helper DB
npm run seed              # seeds Persian data + sample users
npm run start:dev         # serves on http://localhost:3000/api
```

Default sample accounts (password `password123`):
- Manager: `09120001000`
- Head chef: `09120000001`
- Staff: `09120000002`, `09120000003`, `09120000004`, `09120000005`

## Key endpoints
- Auth: `/auth/send-code`, `/auth/verify-code`, `/auth/login`, `/auth/set-password`
- Shifts: `/shifts` (manager can create/update)
- Checklists: `/checklists/:type` (`open|handover|close`) returns daily run, PATCH saves progress
- Planning: `/planning/prep-list`, `/planning/prep-template`, `/planning/shopping-list`, `/planning/shopping-template`
- Logs: `/daily/purchases`, `/daily/waste`
- Periodic tasks: `/tasks` + `/tasks/:id/done`
- Recipes: `/recipes`
- Expiration: `/expiration`

## Production build
```bash
npm run build
npm run start:prod
```

The API uses UTF-8 throughout to safely store Persian content and defaults to the `api` global prefix.
