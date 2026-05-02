"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addRecipeFromForm, deleteRecipe } from "@/lib/recipes";

export async function createRecipe(formData: FormData) {
  const id = await addRecipeFromForm(formData);
  revalidatePath("/");

  if (id) {
    redirect(`/recipes/${id}`);
  }

  redirect("/");
}

export async function removeRecipe(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("Recipe ID is required.");
  }

  await deleteRecipe(id);
  revalidatePath("/");
  revalidatePath(`/recipes/${id}`);
  redirect("/");
}
