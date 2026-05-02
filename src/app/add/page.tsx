import { RecipeForm } from "@/components/recipe-form";
import { SiteNav } from "@/components/site-nav";

export default function AddRecipePage() {
  return (
    <main className="min-h-screen text-[var(--ink)]">
      <SiteNav />
      <section className="px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-[2rem] border border-pink-100 bg-[var(--berry)]/90 p-7 text-white shadow-xl shadow-rose-900/10">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-pink-100">
              Add a Recipe
            </p>
            <h1 className="mt-4 font-serif text-5xl font-black leading-none">
              Save something worth making again.
            </h1>
            <p className="mt-5 leading-8 text-pink-50">
              Put each ingredient and each instruction on its own line. The icon field is still an emoji text field.
            </p>
          </div>
          <RecipeForm />
        </div>
      </section>
    </main>
  );
}
