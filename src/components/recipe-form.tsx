import { createRecipe } from "@/app/actions";
import { categories } from "@/lib/recipes";

export function RecipeForm() {
  return (
    <form action={createRecipe} className="grid gap-5 rounded-[2rem] border border-pink-200 bg-white/80 p-5 shadow-2xl shadow-pink-900/10 sm:grid-cols-2 sm:p-8">
      <Field label="Recipe name" name="title" placeholder="Miso Butter Pasta" required />
      <Field label="Icon" name="icon" placeholder="🍝" />
      <label className="grid gap-2 text-sm font-black uppercase tracking-[0.14em] text-pink-950">
        Category
        <select
          name="category"
          className="rounded-2xl border border-pink-200 bg-white px-4 py-3 text-base normal-case tracking-normal text-stone-950 outline-none focus:border-[var(--berry)]"
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
      <button className="rounded-2xl bg-[var(--berry)] px-6 py-4 text-base font-black uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--rose)] sm:col-span-2">
        Add Recipe
      </button>
    </form>
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
    <label className="grid gap-2 text-sm font-black uppercase tracking-[0.14em] text-pink-950">
      {label}
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        className="rounded-2xl border border-pink-200 bg-white px-4 py-3 text-base normal-case tracking-normal text-stone-950 outline-none focus:border-[var(--berry)]"
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
    <label className="grid gap-2 text-sm font-black uppercase tracking-[0.14em] text-pink-950">
      {label}
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        rows={5}
        className="rounded-2xl border border-pink-200 bg-white px-4 py-3 text-base normal-case tracking-normal text-stone-950 outline-none focus:border-[var(--berry)]"
      />
    </label>
  );
}
