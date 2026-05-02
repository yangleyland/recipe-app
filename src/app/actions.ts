"use server";

import { revalidatePath } from "next/cache";
import { addRecipeFromForm } from "@/lib/recipes";

export async function createRecipe(formData: FormData) {
  await addRecipeFromForm(formData);
  revalidatePath("/");
}
