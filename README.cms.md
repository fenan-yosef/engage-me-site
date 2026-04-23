# CMS (Admin) — Engage Me

This folder contains a minimal CMS scaffold mounted at `/cms`.

Quick start (local):

1. Copy `.env.example` -> `.env` and set `CMS_SESSION_SECRET`, `CMS_ADMIN_EMAIL`, `CMS_ADMIN_PASSWORD`.
2. Install dependencies (if needed):

```bash
npm install iron-session formidable
```

3. Run dev server:

```bash
npm run dev
```

4. Open `http://localhost:3000/cms/login` and sign in using the credentials from `.env`.

Notes:
- Uploaded images are saved to `public/uploads` by default. The upload API also supports overwriting existing files in `public/` by passing a `dest` field.
- Page content is stored under `data/cms/pages/{page}.json` and backups are written to `data/cms/backups/` on each save.
- API routes: `/api/cms/auth/*`, `/api/cms/pages/*`, `/api/cms/upload`, `/api/cms/list-uploads`, `/api/cms/delete-upload`.

This is an initial scaffold — next steps: polish UI, add field-based editors, and integrate public pages to read `data/cms` content.
