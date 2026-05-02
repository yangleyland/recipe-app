"use client";

import { useState } from "react";
import { createRecipe } from "@/app/actions";
import { categories, type Recipe, type RecipeCategory } from "@/lib/recipes";

type RecipeAppProps = {
  recipes: Recipe[];
};

export function RecipeApp({ recipes }: RecipeAppProps) {
  const [activeCategory, setActiveCategory] = useState<RecipeCategory>("Dinner");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(recipes[0] ?? null);
  const visibleRecipes = recipes.filter((recipe) => recipe.category === activeCategory);
  const currentRecipe = selectedRecipe ?? visibleRecipes[0] ?? recipes[0] ?? null;

  function chooseCategory(category: RecipeCategory) {
    setActiveCategory(category);
    setSelectedRecipe(recipes.find((recipe) => recipe.category === category) ?? null);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--cream)] text-[var(--ink)]">
      <section className="relative px-5 py-8 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_20%_15%,rgba(242,149,89,0.35),transparent_28%),radial-gradient(circle_at_85%_5%,rgba(74,124,89,0.22),transparent_30%),linear-gradient(135deg,#fff8ed_0%,#f3dfbd_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white/70 p-6 shadow-2xl shadow-amber-950/10 backdrop-blur sm:p-8">
            <p className="mb-4 inline-flex rounded-full bg-[var(--sage)] px-4 py-2 text-sm font-bold uppercase tracking-[0.2em] text-white">
              Family Recipe Box
            </p>
            <h1 className="max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight sm:text-7xl">
              Pick a tab, tap a recipe, cook the details.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
              Browse recipes by meal type, open the full ingredient list and steps,
              then add new recipes directly into Supabase.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => chooseCategory(category)}
                  className={`rounded-full border px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] transition ${
                    activeCategory === category
                      ? "border-[var(--tomato)] bg-[var(--tomato)] text-white shadow-lg shadow-orange-900/20"
                      : "border-stone-300 bg-white/80 text-stone-700 hover:-translate-y-0.5 hover:border-[var(--tomato)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {visibleRecipes.length ? (
                visibleRecipes.map((recipe) => (
                  <button
                    key={recipe.id}
                    type="button"
                    onClick={() => setSelectedRecipe(recipe)}
                    className={`group rounded-3xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-xl ${
                      currentRecipe?.id === recipe.id
                        ? "border-[var(--tomato)] bg-white"
                        : "border-black/10 bg-white/65"
                    }`}
                  >
                    <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--butter)] text-4xl shadow-inner">
                      {recipe.icon}
                    </span>
                    <span className="block text-xl font-black">{recipe.title}</span>
                    <span className="mt-2 block text-sm font-semibold text-stone-500">
                      {recipe.prep_time || "Timing not set"} · {recipe.servings || "Servings not set"}
                    </span>
                    <span className="mt-3 line-clamp-2 block text-sm leading-6 text-stone-600">
                      {recipe.description}
                    </span>
                  </button>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-stone-300 bg-white/60 p-8 text-stone-600 sm:col-span-2 xl:col-span-3">
                  No {activeCategory.toLowerCase()} recipes yet. Add one below.
                </div>
              )}
            </div>
          </div>

          <RecipeDetails recipe={currentRecipe} />
        </div>
      </section>

      <section className="px-5 pb-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-black/10 bg-[var(--ink)] p-6 text-white shadow-2xl shadow-stone-900/20 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--butter)]">
                Add a Recipe
              </p>
              <h2 className="mt-3 font-serif text-4xl">Save the next keeper.</h2>
              <p className="mt-4 leading-7 text-stone-300">
                Put each ingredient and each instruction on its own line. When Supabase
                environment variables are configured, submissions are saved to the
                `recipes` table.
              </p>
            </div>

            <form action={createRecipe} className="grid gap-4 sm:grid-cols-2">
              <Field label="Recipe name" name="title" placeholder="Miso Butter Pasta" required />
              <Field label="Icon" name="icon" placeholder="🍝" />
              <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.14em] text-stone-300">
                Category
                <select
                  name="category"
                  className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-base normal-case tracking-normal text-stone-950 outline-none focus:border-[var(--butter)]"
                >
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <Field label="Prep time" name="prep_time" placeholder="25 min" />
              <Field label="Servings" name="servings" placeholder="4 servings" />
              <Field label="Short description" name="description" placeholder="Creamy, fast, and weeknight-friendly." required />
              <TextArea label="Ingredients" name="ingredients" placeholder={"8 oz pasta\n2 tbsp butter\n1 tbsp white miso"} required />
              <TextArea label="Instructions" name="instructions" placeholder={"Boil pasta until al dente.\nWhisk butter and miso with pasta water.\nToss and serve."} required />
              <button className="rounded-2xl bg-[var(--tomato)] px-6 py-4 text-base font-black uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:bg-[#bf4b24] sm:col-span-2">
                Add Recipe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

function RecipeDetails({ recipe }: { recipe: Recipe | null }) {
  if (!recipe) {
    return (
      <aside className="rounded-[2rem] border border-black/10 bg-white/75 p-8 shadow-2xl shadow-amber-950/10 backdrop-blur">
        <p className="text-stone-600">Choose or add a recipe to see the full details.</p>
      </aside>
    );
  }

  return (
    <aside className="rounded-[2rem] border border-black/10 bg-white/85 p-6 shadow-2xl shadow-amber-950/10 backdrop-blur sm:p-8 lg:sticky lg:top-8 lg:self-start">
      <div className="flex items-start gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[var(--butter)] text-5xl shadow-inner">
          {recipe.icon}
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[var(--tomato)]">
            {recipe.category}
          </p>
          <h2 className="mt-2 font-serif text-4xl leading-none">{recipe.title}</h2>
          <p className="mt-3 text-sm font-semibold text-stone-500">
            {recipe.prep_time || "Timing not set"} · {recipe.servings || "Servings not set"}
          </p>
        </div>
      </div>
      <p className="mt-6 text-lg leading-8 text-stone-700">{recipe.description}</p>

      <div className="mt-8 grid gap-6">
        <section>
          <h3 className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-stone-500">
            Ingredients
          </h3>
          <ul className="grid gap-3">
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient} className="rounded-2xl bg-stone-100 px-4 py-3 font-medium text-stone-800">
                {ingredient}
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h3 className="mb-3 text-sm font-black uppercase tracking-[0.2em] text-stone-500">
            Instructions
          </h3>
          <ol className="grid gap-3">
            {recipe.instructions.map((instruction, index) => (
              <li key={instruction} className="flex gap-3 rounded-2xl bg-[var(--cream)] px-4 py-3 leading-7 text-stone-800">
                <span className="font-black text-[var(--tomato)]">{index + 1}.</span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </aside>
  );
}

function Field({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.14em] text-stone-300">
      {label}
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-base normal-case tracking-normal text-stone-950 outline-none focus:border-[var(--butter)]"
      />
    </label>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-sm font-bold uppercase tracking-[0.14em] text-stone-300">
      {label}
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="rounded-2xl border border-white/10 bg-white px-4 py-3 text-base normal-case tracking-normal text-stone-950 outline-none focus:border-[var(--butter)]"
      />
    </label>
  );
}
