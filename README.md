# IEMPACT 2k27 – React Frontend Boilerplate

Vite + React 19 + React Router. Runs on Node.js (18+).

## Scripts
- `npm run dev` – dev server at http://localhost:5173
- `npm run build` – production build to `dist/`
- `npm run preview` – serve the build locally
- `npm run lint` – lint with oxlint

## Structure
```
src/
  components/   reusable UI (Layout)
  pages/        route-level views
  hooks/        custom hooks (useFetch)
  services/     API client (api.js)
  utils/        helpers
```

## Backend
Requests to `/api/*` are proxied to `http://localhost:5000` in dev (see `vite.config.js`).
Set `VITE_API_URL` in `.env` for production. Import with the `@/` alias, e.g. `@/services/api`.
