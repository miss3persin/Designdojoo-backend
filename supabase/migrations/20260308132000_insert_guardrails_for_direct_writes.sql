create or replace function public.application_insert_guardrails()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_slots integer;
  v_email text;
begin
  if new.email is null or trim(new.email) = '' then
    raise exception 'EMAIL_REQUIRED';
  end if;

  v_email := lower(trim(new.email));
  new.email := v_email;

  -- Prevent concurrent duplicate submissions for the same email.
  perform pg_advisory_xact_lock(hashtext(v_email));

  if exists (
    select 1
    from public.applications a
    where lower(a.email) = v_email
  ) then
    raise exception 'DUPLICATE_APPLICATION';
  end if;

  -- Skip slot decrement only for controlled RPC inserts that already decrement slots.
  if coalesce(new.source, '') = 'rpc_api' then
    return new;
  end if;

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
  where id = 1;

  return new;
end;
$$;

drop trigger if exists trg_application_insert_guardrails on public.applications;

create trigger trg_application_insert_guardrails
before insert on public.applications
for each row
execute function public.application_insert_guardrails();

-- Prefer unique index when historical data allows it. If historical duplicates
-- exist, keep trigger-based protection for all new inserts.
do $$
begin
  if not exists (
    select 1
    from pg_indexes
    where schemaname = 'public'
      and indexname = 'uq_applications_email_lower'
  ) then
    if not exists (
      select 1
      from public.applications
      group by lower(email)
      having count(*) > 1
    ) then
      execute 'create unique index uq_applications_email_lower on public.applications (lower(email))';
    end if;
  end if;
end;
$$;

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
  v_application_id bigint;
  v_email text;
  v_slots integer;
begin
  v_email := lower(trim(p_email));

  -- Keep duplicate protection before insert path.
  perform pg_advisory_xact_lock(hashtext(v_email));

  if exists (
    select 1
    from public.applications a
    where lower(a.email) = v_email
  ) then
    raise exception 'DUPLICATE_APPLICATION';
  end if;

  -- Decrement slot inside RPC transaction for deterministic return payload.
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
    v_email,
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
    'rpc_api',
    p_client_ip
  )
  returning id into v_application_id;

  return query
  select v_application_id, v_slots;
end;
$$;
