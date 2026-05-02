import { RecipeApp } from "@/components/recipe-app";
import { getRecipes } from "@/lib/recipes";

export default async function Home() {
  const recipes = await getRecipes();

  return <RecipeApp recipes={recipes} />;
}
