"use client";

import { useState } from "react";
import { removeRecipe } from "@/app/actions";

export function DeleteRecipeForm({ id, title }: { id: string; title: string }) {
  const [isConfirming, setIsConfirming] = useState(false);

  if (isConfirming) {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50/80 p-4">
        <p className="text-sm font-bold leading-6 text-rose-950">
          Delete “{title}”? This can&apos;t be undone.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <form action={removeRecipe}>
            <input type="hidden" name="id" value={id} />
            <button className="rounded-full bg-rose-700 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:bg-rose-800">
              Yes, delete
            </button>
          </form>
          <button
            type="button"
            onClick={() => setIsConfirming(false)}
            className="rounded-full border border-rose-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-rose-900 transition hover:border-rose-400"
          >
            Keep it
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsConfirming(true)}
      className="rounded-full border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-rose-800 transition hover:border-rose-300 hover:bg-rose-100"
    >
      Delete
    </button>
  );
}
