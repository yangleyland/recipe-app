# eri's recipies

A small recipe site I made for my girlfriend. It is a Next.js app backed by Supabase, and it was heavily vibe coded.

The app lets people browse recipes by meal type, open each recipe on its own page, add new recipes, and delete existing ones.

## Important Supabase Note

This project intentionally allows anonymous Supabase users to add and delete rows in the `recipes` table. That keeps the site frictionless, but it also means anyone with access to the app can create or remove recipes.

The relevant row-level security policies live in `supabase/schema.sql` and `supabase/migrations/`.

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Supabase

## Local Development

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Run the app:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Database

Apply the Supabase migrations:

```bash
npx supabase login
npx supabase link --project-ref your-project-ref
npx supabase db push
```
