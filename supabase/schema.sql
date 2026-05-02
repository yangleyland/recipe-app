create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Dinner', 'Breakfast', 'Baking', 'Dessert', 'Lunch', 'Snacks')),
  icon text not null default '🍽️',
  prep_time text not null default '',
  servings text not null default '',
  description text not null,
  ingredients text[] not null default '{}',
  instructions text[] not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.recipes enable row level security;

create policy "Recipes are readable by everyone"
  on public.recipes
  for select
  using (true);

drop policy if exists "Recipes can be inserted by authenticated users" on public.recipes;
drop policy if exists "Recipes can be inserted by everyone" on public.recipes;
drop policy if exists "Recipes can be deleted by everyone" on public.recipes;

create policy "Recipes can be inserted by everyone"
  on public.recipes
  for insert
  to anon, authenticated
  with check (true);

create policy "Recipes can be deleted by everyone"
  on public.recipes
  for delete
  to anon, authenticated
  using (true);
