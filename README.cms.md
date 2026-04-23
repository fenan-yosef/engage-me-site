# CMS (Admin) — Engage Me

This folder contains a minimal CMS scaffold mounted at `/cms`.

Quick start (local):

1. Copy `.env.example` -> `.env` and set `CMS_SESSION_SECRET`, `CMS_ADMIN_EMAIL`, `CMS_ADMIN_PASSWORD`.
2. Configure MySQL / MariaDB in `.env`:
   - `CMS_DB_HOST` / `CMS_DB_PORT` (or `CMS_DB_SOCKET`)
   - `CMS_DB_USER` / `CMS_DB_PASSWORD`
   - `CMS_DB_NAME`

3. Create the database + tables:
   - Create the database (example):

```sql
CREATE DATABASE engage_me_cms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

   - Run the initial schema:
     - SQL file: `db/cms_home.sql`
     - If you created tables earlier (without `block_key`), add the column:

```sql
ALTER TABLE cms_blocks ADD COLUMN block_key VARCHAR(64) NULL;
CREATE UNIQUE INDEX uniq_cms_blocks_page_key ON cms_blocks (page_id, block_key);
```

4. Install dependencies (if needed):

```bash
npm install iron-session formidable
```

5. Run dev server:

```bash
npm run dev
```

6. Open `http://localhost:3000/cms/login` and sign in using the credentials from `.env`.

Notes:
- Uploaded images are saved to `public/uploads` by default. The upload API also supports overwriting existing files in `public/` by passing a `dest` field.
- Page content is stored in MySQL / MariaDB (no JSON storage).
- API routes: `/api/cms/auth/*`, `/api/cms/pages/*`, `/api/cms/upload`, `/api/cms/list-uploads`, `/api/cms/delete-upload`.

This is an initial scaffold — next steps: polish UI, add field-based editors, and integrate public pages to read DB-backed CMS content.
