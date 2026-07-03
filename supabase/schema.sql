-- ─────────────────────────────────────────────────────────────────────────────
--  Database schema for the Compliance Checklist app
--
--  How to run:
--    1. Open your Supabase project
--    2. Left sidebar → SQL Editor → New query
--    3. Paste this entire file and click "Run"
--
--  This creates one table that stores each user's checklist state as JSON,
--  and Row-Level Security (RLS) policies so every user can only ever read or
--  write their OWN row — never anyone else's.
-- ─────────────────────────────────────────────────────────────────────────────

create table if not exists public.checklist_state (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Turn on Row-Level Security (denies everything until a policy allows it).
alter table public.checklist_state enable row level security;

-- Each authenticated user may work only with the row whose user_id matches
-- their own auth id.
drop policy if exists "select own checklist" on public.checklist_state;
create policy "select own checklist"
  on public.checklist_state for select
  using (auth.uid() = user_id);

drop policy if exists "insert own checklist" on public.checklist_state;
create policy "insert own checklist"
  on public.checklist_state for insert
  with check (auth.uid() = user_id);

drop policy if exists "update own checklist" on public.checklist_state;
create policy "update own checklist"
  on public.checklist_state for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "delete own checklist" on public.checklist_state;
create policy "delete own checklist"
  on public.checklist_state for delete
  using (auth.uid() = user_id);
