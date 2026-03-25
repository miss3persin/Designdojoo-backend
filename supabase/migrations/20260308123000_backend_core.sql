-- Core backend structures for API-based submissions and merch orders.
-- Safe to run repeatedly due to IF NOT EXISTS guards.

create extension if not exists pgcrypto;

create table if not exists public.slots (
  id bigint primary key,
  slots_left integer not null default 15 check (slots_left >= 0),
  updated_at timestamptz not null default now()
);

insert into public.slots (id, slots_left)
values (1, 15)
on conflict (id) do nothing;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_slots_updated_at on public.slots;
create trigger trg_slots_updated_at
before update on public.slots
for each row
execute function public.set_updated_at();

create table if not exists public.applications (
  id bigint generated always as identity primary key,
  full_name text not null,
  email text not null,
  phone text not null,
  social_handle text not null,
  city text not null,
  country text not null,
  portfolio text,
  track text not null,
  referral text not null,
  blocker text not null,
  accountability text not null,
  commitment text not null,
  source text not null default 'backend_api',
  client_ip text,
  created_at timestamptz not null default now()
);

alter table public.applications
  add column if not exists source text not null default 'backend_api',
  add column if not exists client_ip text,
  add column if not exists created_at timestamptz not null default now();

create index if not exists idx_applications_email on public.applications (lower(email));
create index if not exists idx_applications_created_at on public.applications (created_at desc);

create table if not exists public.api_request_log (
  id bigint generated always as identity primary key,
  action text not null,
  client_ip text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_api_request_log_action_ip_created_at
on public.api_request_log (action, client_ip, created_at desc);

create table if not exists public.merch_orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  notes text,
  currency text not null default 'NGN',
  subtotal numeric(12, 2) not null check (subtotal >= 0),
  total numeric(12, 2) not null check (total >= 0),
  items jsonb not null,
  status text not null default 'pending',
  client_ip text,
  created_at timestamptz not null default now()
);

create index if not exists idx_merch_orders_created_at on public.merch_orders (created_at desc);
create index if not exists idx_merch_orders_status on public.merch_orders (status);

create or replace function public.submit_application_with_slot(
  p_full_name text,
  p_email text,
  p_phone text,
  p_social_handle text,
  p_city text,
  p_country text,
  p_portfolio text,
  p_track text,
  p_referral text,
  p_blocker text,
  p_accountability text,
  p_commitment text,
  p_client_ip text default null
)
returns table(application_id bigint, slots_left integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slots integer;
  v_application_id bigint;
begin
  select s.slots_left
  into v_slots
  from public.slots s
  where s.id = 1
  for update;

  if v_slots is null then
    insert into public.slots (id, slots_left)
    values (1, 15)
    on conflict (id) do nothing;

    select s.slots_left
    into v_slots
    from public.slots s
    where s.id = 1
    for update;
  end if;

  if v_slots <= 0 then
    raise exception 'NO_SLOTS_AVAILABLE';
  end if;

  update public.slots
  set slots_left = slots_left - 1
  where id = 1
  returning slots_left into v_slots;

  insert into public.applications (
    full_name,
    email,
    phone,
    social_handle,
    city,
    country,
    portfolio,
    track,
    referral,
    blocker,
    accountability,
    commitment,
    source,
    client_ip
  )
  values (
    p_full_name,
    p_email,
    p_phone,
    p_social_handle,
    p_city,
    p_country,
    p_portfolio,
    p_track,
    p_referral,
    p_blocker,
    p_accountability,
    p_commitment,
    'backend_api',
    p_client_ip
  )
  returning id into v_application_id;

  return query
  select v_application_id, v_slots;
end;
$$;
