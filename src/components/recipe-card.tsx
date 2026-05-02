import Link from "next/link";
import type { Recipe } from "@/lib/recipes";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.id}`}
      className="group rounded-[2rem] border border-pink-200/80 bg-[var(--cream-card)]/88 p-5 shadow-xl shadow-pink-900/5 transition hover:-translate-y-1 hover:border-[var(--berry)] hover:bg-white hover:shadow-2xl hover:shadow-pink-900/10"
    >
      <span className="mb-5 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-[var(--blush)] text-5xl shadow-inner">
        {recipe.icon}
      </span>
      <span className="block font-serif text-3xl font-black leading-none text-[var(--ink)]">
        {recipe.title}
      </span>
      <span className="mt-3 block text-sm font-black uppercase tracking-[0.14em] text-[var(--berry)]">
        {recipe.category}
      </span>
      <span className="mt-2 block text-sm font-bold text-stone-500">
        {recipe.prep_time || "Timing not set"} · {recipe.servings || "Servings not set"}
      </span>
      <span className="mt-4 line-clamp-3 block leading-7 text-stone-600">
        {recipe.description}
      </span>
    </Link>
  );
}
