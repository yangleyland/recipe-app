import Link from "next/link";
import { categories, type RecipeCategory } from "@/lib/recipes";

type SiteNavProps = {
  activeCategory?: RecipeCategory | "All";
};

export function SiteNav({ activeCategory = "All" }: SiteNavProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-pink-200/80 bg-[rgba(255,246,250,0.86)] backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="font-serif text-3xl font-black tracking-tight text-[var(--berry)]">
            eri&apos;s recipies
          </Link>
          <Link
            href="/add"
            className="rounded-full bg-[var(--berry)] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] text-white shadow-lg shadow-pink-900/15 transition hover:-translate-y-0.5 hover:bg-[var(--rose)]"
          >
            Add recipe
          </Link>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <CategoryLink href="/" label="All" active={activeCategory === "All"} />
          {categories.map((category) => (
            <CategoryLink
              key={category}
              href={`/?category=${encodeURIComponent(category)}`}
              label={category}
              active={activeCategory === category}
            />
          ))}
        </div>
      </nav>
    </header>
  );
}

function CategoryLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-black uppercase tracking-[0.14em] transition ${
        active
          ? "border-[var(--berry)] bg-[var(--berry)] text-white"
          : "border-pink-200 bg-white/70 text-pink-900 hover:border-[var(--berry)]"
      }`}
    >
      {label}
    </Link>
  );
}
