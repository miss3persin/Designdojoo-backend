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
  - Sends reminder emails to registrations that have not been emailed.
  - Requires `x-api-key` header matching `REMINDER_ADMIN_API_KEY`.
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

## Local Environment

For local backend checks in this repo, env values are loaded from `.env.backend.example`
via `node --env-file=.env.backend.example ...` scripts.
The frontend `.env` file is not required for backend execution.

## Local Dev (Frontend + API)

- Start API dev server: `npm run dev:api`
- Start frontend Vite dev server: `npm run dev`

`vite.config.js` proxies `/api/*` to `http://localhost:3001` in dev.

## Cron / Scheduler Example

You must call `POST /api/sendReminder` with the `x-api-key` header that matches
`REMINDER_ADMIN_API_KEY`. Here is a simple GitHub Actions cron that runs hourly:

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

If you use another scheduler (cron, Render, Railway, etc.), the request shape is
the same: `POST /api/sendReminder` with the `x-api-key` header and optional JSON
body containing `cutoff_hours` and `limit`.

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
