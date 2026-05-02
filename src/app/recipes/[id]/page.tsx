import Link from "next/link";
import { notFound } from "next/navigation";
import { removeRecipe } from "@/app/actions";
import { SiteNav } from "@/components/site-nav";
import { getRecipe } from "@/lib/recipes";

type RecipePageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipe = await getRecipe(id);

  if (!recipe) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--petal)] text-[var(--ink)]">
      <SiteNav activeCategory={recipe.category} />
      <article className="px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-[2rem] border border-pink-200 bg-white/80 p-7 shadow-2xl shadow-pink-900/10 lg:sticky lg:top-36 lg:self-start">
            <div className="flex h-24 w-24 items-center justify-center rounded-[1.75rem] bg-[var(--blush)] text-6xl shadow-inner">
              {recipe.icon}
            </div>
            <p className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-[var(--berry)]">
              {recipe.category}
            </p>
            <h1 className="mt-3 font-serif text-5xl font-black leading-none">
              {recipe.title}
            </h1>
            <p className="mt-4 text-base font-bold text-stone-500">
              {recipe.prep_time || "Timing not set"} · {recipe.servings || "Servings not set"}
            </p>
            <p className="mt-5 text-lg leading-8 text-pink-950/75">{recipe.description}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full border border-pink-200 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-pink-950 transition hover:border-[var(--berry)]"
              >
                Back
              </Link>
              <form action={removeRecipe}>
                <input type="hidden" name="id" value={recipe.id} />
                <button className="rounded-full bg-[var(--danger)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-red-600">
                  Delete
                </button>
              </form>
            </div>
          </aside>

          <div className="grid gap-6">
            <section className="rounded-[2rem] border border-pink-200 bg-white/80 p-6 shadow-xl shadow-pink-900/5 sm:p-8">
              <h2 className="font-serif text-4xl font-black">Ingredients</h2>
              <ul className="mt-5 grid gap-3">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient} className="rounded-2xl bg-pink-50 px-4 py-3 font-bold text-pink-950">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[2rem] border border-pink-200 bg-white/80 p-6 shadow-xl shadow-pink-900/5 sm:p-8">
              <h2 className="font-serif text-4xl font-black">Instructions</h2>
              <ol className="mt-5 grid gap-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={instruction} className="flex gap-3 rounded-2xl bg-[var(--blush)] px-4 py-3 leading-7 text-pink-950">
                    <span className="font-black text-[var(--berry)]">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}
