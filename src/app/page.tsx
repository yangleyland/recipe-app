import { RecipeCard } from "@/components/recipe-card";
import { SiteNav } from "@/components/site-nav";
import { categories, getRecipes, type RecipeCategory } from "@/lib/recipes";

type HomeProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

function parseCategory(category?: string): RecipeCategory | "All" {
  return categories.includes(category as RecipeCategory)
    ? (category as RecipeCategory)
    : "All";
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const activeCategory = parseCategory(params.category);
  const recipes = await getRecipes();
  const visibleRecipes =
    activeCategory === "All"
      ? recipes
      : recipes.filter((recipe) => recipe.category === activeCategory);

  return (
    <main className="min-h-screen bg-[var(--petal)] text-[var(--ink)]">
      <SiteNav activeCategory={activeCategory} />
      <section className="relative overflow-hidden px-5 py-8 sm:px-8 lg:px-12">
        <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_15%_15%,rgba(255,92,162,0.28),transparent_28%),radial-gradient(circle_at_88%_8%,rgba(255,199,221,0.6),transparent_32%),linear-gradient(135deg,#fff6fa_0%,#ffe1ee_100%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--berry)]">
                {activeCategory === "All" ? "All recipes" : activeCategory}
              </p>
              <h1 className="mt-2 font-serif text-5xl font-black leading-none tracking-tight sm:text-7xl">
                eri&apos;s recipies
              </h1>
            </div>
            <p className="max-w-sm text-base font-bold leading-7 text-pink-950/70">
              Tap a recipe card to open its own page with ingredients, steps, and delete controls.
            </p>
          </div>

          {visibleRecipes.length ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visibleRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-pink-300 bg-white/70 p-10 text-pink-950">
              No recipes in this section yet. Use the add recipe page to create one.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
