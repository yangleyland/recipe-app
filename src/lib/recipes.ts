import { unstable_noStore as noStore } from "next/cache";
import { createClient } from "@supabase/supabase-js";

export const categories = [
  "Dinner",
  "Breakfast",
  "Baking",
  "Dessert",
  "Lunch",
  "Snacks",
] as const;

export type RecipeCategory = (typeof categories)[number];

export type Recipe = {
  id: string;
  title: string;
  category: RecipeCategory;
  icon: string;
  prep_time: string;
  servings: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  created_at?: string;
};

export type RecipeInput = Omit<Recipe, "id" | "created_at">;

const sampleRecipes: Recipe[] = [
  {
    id: "sample-lemon-herb-chicken",
    title: "Lemon Herb Chicken",
    category: "Dinner",
    icon: "🍋",
    prep_time: "35 min",
    servings: "4 servings",
    description: "A bright weeknight chicken dinner with crisp edges and pan juices.",
    ingredients: [
      "4 chicken thighs",
      "1 lemon, sliced",
      "2 tbsp olive oil",
      "2 cloves garlic, minced",
      "1 tsp dried oregano",
      "Salt and pepper",
    ],
    instructions: [
      "Heat oven to 425 F.",
      "Season chicken with olive oil, garlic, oregano, salt, and pepper.",
      "Arrange lemon slices around the chicken.",
      "Roast for 28-32 minutes until browned and cooked through.",
      "Rest 5 minutes before serving with pan juices.",
    ],
  },
  {
    id: "sample-cinnamon-oats",
    title: "Cinnamon Apple Oats",
    category: "Breakfast",
    icon: "🍎",
    prep_time: "12 min",
    servings: "2 bowls",
    description: "Creamy oats with warm apples, cinnamon, and a little maple.",
    ingredients: [
      "1 cup rolled oats",
      "2 cups milk",
      "1 apple, diced",
      "1 tsp cinnamon",
      "1 tbsp maple syrup",
      "Pinch of salt",
    ],
    instructions: [
      "Bring milk, oats, apple, cinnamon, and salt to a simmer.",
      "Cook 8-10 minutes, stirring often.",
      "Sweeten with maple syrup.",
      "Top with nuts or yogurt if desired.",
    ],
  },
  {
    id: "sample-banana-bread",
    title: "One-Bowl Banana Bread",
    category: "Baking",
    icon: "🍌",
    prep_time: "1 hr 10 min",
    servings: "1 loaf",
    description: "A simple tender banana bread that uses very ripe bananas.",
    ingredients: [
      "3 ripe bananas",
      "1/3 cup melted butter",
      "3/4 cup sugar",
      "1 egg",
      "1 tsp vanilla",
      "1 tsp baking soda",
      "1 1/2 cups flour",
      "Pinch of salt",
    ],
    instructions: [
      "Heat oven to 350 F and grease a loaf pan.",
      "Mash bananas, then stir in butter, sugar, egg, and vanilla.",
      "Fold in baking soda, salt, and flour.",
      "Bake 50-60 minutes until a tester comes out clean.",
      "Cool before slicing.",
    ],
  },
];

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

function normalizeCategory(value: FormDataEntryValue | null): RecipeCategory {
  const category = String(value ?? "Dinner");
  return categories.includes(category as RecipeCategory)
    ? (category as RecipeCategory)
    : "Dinner";
}

function splitLines(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function getRecipes(): Promise<Recipe[]> {
  noStore();
  const supabase = getSupabase();

  if (!supabase) {
    return sampleRecipes;
  }

  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Unable to load recipes from Supabase:", error.message);
    return sampleRecipes;
  }

  return data as Recipe[];
}

export async function getRecipe(id: string): Promise<Recipe | null> {
  noStore();
  const supabase = getSupabase();

  if (!supabase) {
    return sampleRecipes.find((recipe) => recipe.id === id) ?? null;
  }

  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Unable to load recipe from Supabase:", error.message);
    return null;
  }

  return data as Recipe;
}

export async function addRecipeFromForm(formData: FormData) {
  const recipe: RecipeInput = {
    title: String(formData.get("title") ?? "").trim(),
    category: normalizeCategory(formData.get("category")),
    icon: String(formData.get("icon") ?? "🍽️").trim() || "🍽️",
    prep_time: String(formData.get("prep_time") ?? "").trim(),
    servings: String(formData.get("servings") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    ingredients: splitLines(formData.get("ingredients")),
    instructions: splitLines(formData.get("instructions")),
  };

  if (!recipe.title || !recipe.description || !recipe.ingredients.length || !recipe.instructions.length) {
    throw new Error("Recipe title, description, ingredients, and instructions are required.");
  }

  const supabase = getSupabase();

  if (!supabase) {
    console.warn("Supabase anon env vars are missing; recipe was not saved.");
    return null;
  }

  const { data, error } = await supabase
    .from("recipes")
    .insert(recipe)
    .select("id")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data.id as string;
}

export async function deleteRecipe(id: string) {
  const supabase = getSupabase();

  if (!supabase) {
    console.warn("Supabase anon env vars are missing; recipe was not deleted.");
    return;
  }

  const { error } = await supabase.from("recipes").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}
