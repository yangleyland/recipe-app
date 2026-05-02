drop policy if exists "Recipes can be deleted by everyone" on public.recipes;

create policy "Recipes can be deleted by everyone"
  on public.recipes
  for delete
  to anon, authenticated
  using (true);
