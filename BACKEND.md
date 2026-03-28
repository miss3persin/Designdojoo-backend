# Backend API

This project now includes a backend layer implemented as Vercel serverless API routes.

## Endpoints

- `GET /api/health`
  - Service health and Supabase connectivity check.
- `GET /api/slots`
  - Returns current scholarship slot count.
- `POST /api/applications/submit`
  - Validates and submits an application.
  - Uses atomic slot decrement via Postgres function `submit_application_with_slot`.
  - Rejects duplicate emails before consuming slots.
  - Applies per-IP rate limiting.
- `POST /api/orders/merch`
  - Validates and stores merch orders.
  - Applies per-IP rate limiting.
  - Returns a prefilled WhatsApp checkout URL.
- `POST /api/sendReminder`
  - Sends reminder emails to applications older than the cutoff window.
  - `GET` (for Vercel Cron) requires `Authorization: Bearer <CRON_SECRET>`.
  - `POST` (manual/admin trigger) requires `x-api-key` matching `REMINDER_ADMIN_API_KEY`.
  - Uses Resend and updates `registrations.email_sent` / `email_sent_at`.

## Required Environment Variables

Use `.env.backend.example` as a template:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ALLOWED_ORIGINS` (comma-separated)
- `DEFAULT_SLOTS`
- `APPLICATION_RATE_LIMIT`
- `APPLICATION_RATE_WINDOW_MINUTES`
- `MERCH_RATE_LIMIT`
- `MERCH_RATE_WINDOW_MINUTES`
- `MERCH_WHATSAPP_NUMBER`
- `RESEND_API_KEY`
- `REMINDER_ADMIN_API_KEY`
- `REMINDER_EMAIL_FROM`
- `REMINDER_EMAIL_SUBJECT`
- `REMINDER_CUTOFF_HOURS`
- `REMINDER_LIMIT`
- `CRON_SECRET` (required for Vercel Cron trigger auth)

## Local Environment

For local backend checks in this repo, env values are loaded from `.env.backend.example`
via `node --env-file=.env.backend.example ...` scripts.
The frontend `.env` file is not required for backend execution.

## Local Dev (Frontend + API)

- Start API dev server: `npm run dev:api`
- Start frontend Vite dev server: `npm run dev`

`vite.config.js` proxies `/api/*` to `http://localhost:3001` in dev.

## Cron / Scheduler Example

### Vercel Cron (recommended in this project)

`vercel.json` runs:

- `path`: `/api/sendReminder`
- `schedule`: `0 9 * * *` (09:00 UTC = 10:00 Africa/Lagos)

To make this work in production:

1. Add `CRON_SECRET` in Vercel Project Settings -> Environment Variables.
2. Redeploy so the cron job uses the new env var.
3. Keep `REMINDER_CUTOFF_HOURS=24` (or omit it; code defaults to 24).

Vercel will call the endpoint with:

- method: `GET`
- header: `Authorization: Bearer <CRON_SECRET>`

### Manual/Admin Trigger

You can still trigger reminders manually with a POST request:

```bash
curl -X POST "https://<your-domain>/api/sendReminder" \
  -H "Content-Type: application/json" \
  -H "x-api-key: <REMINDER_ADMIN_API_KEY>" \
  -d '{"cutoff_hours":24,"limit":100}'
```

### External Scheduler Alternative (GitHub Actions example)

If you prefer an external scheduler, this runs hourly and triggers the same endpoint:

```yaml
name: Send Reminder Emails

on:
  schedule:
    - cron: "0 * * * *"

jobs:
  send-reminders:
    runs-on: ubuntu-latest
    steps:
      - name: Call reminder endpoint
        env:
          REMINDER_URL: https://<your-domain>/api/sendReminder
          REMINDER_ADMIN_API_KEY: ${{ secrets.REMINDER_ADMIN_API_KEY }}
        run: |
          curl -X POST "$REMINDER_URL" \
            -H "Content-Type: application/json" \
            -H "x-api-key: $REMINDER_ADMIN_API_KEY" \
            -d '{"cutoff_hours":24,"limit":100}'
```

If you use another scheduler (Render, Railway, etc.), the request shape is the
same as manual trigger: `POST /api/sendReminder` with `x-api-key`.

## Database Migration

Run the SQL migration:

- `supabase/migrations/20260308123000_backend_core.sql`
- `supabase/migrations/20260310143000_create_registrations.sql`

It creates:

- `slots`
- `applications` (with backend metadata columns)
- `api_request_log`
- `merch_orders`
- `registrations`
- `submit_application_with_slot(...)` RPC for atomic create + slot decrement

## Push Migration to Remote

1. Link the CLI to your hosted project:
   - `supabase link --project-ref <project_ref>`
2. Push all unapplied migrations:
   - `supabase db push`

If `supabase link` returns `Forbidden resource`, the current CLI login does not have access to that project.
Use a Supabase account/PAT with access to the target project, then retry link + push.

## Backend Tests

- Run validation tests:
  - `npm run test:backend`
- Run validation tests with backend env loaded:
  - `npm run test:backend:env`
- Run smoke tests against backend handlers (no slot-consuming writes):
  - `npm run smoke:backend`
