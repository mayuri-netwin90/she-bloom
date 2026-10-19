# Bloom API

## Local authentication

Start PostgreSQL with `docker compose up -d postgres`, then run `pnpm --filter api start:dev`. The Compose database is exposed on host port `5433` to avoid conflicting with a locally installed PostgreSQL service.
The API applies the `backoffice_users` table automatically. On non-production startup it creates an administrator only when the table is empty:

- Email: `admin@bloom.local`
- Password: `ChangeMe123!`

The local mobile-app user is created separately:

- Email: `member@bloom.local`
- Password: `ChangeMe123!`

Override these values and set a strong `JWT_SECRET` in `apps/api/.env` before any shared deployment. Admin login is `POST /admin/auth/login`; front-user login is `POST /front/auth/login`. Both use `Authorization: Bearer <token>` for their `/me` endpoint.

Swagger documentation is split by consumer: `/admin/api` documents backoffice APIs and `/front/api` documents mobile/end-user APIs. `migrations/001_backoffice_users.sql` is the canonical database schema for managed database deployments.
