-- Reminder email registrations table.
-- Safe to run repeatedly due to IF NOT EXISTS guards.

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  email_sent boolean not null default false,
  email_sent_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_registrations_email on public.registrations (lower(email));
create index if not exists idx_registrations_email_sent_created_at
  on public.registrations (email_sent, created_at desc);
