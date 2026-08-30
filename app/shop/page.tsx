import type { Metadata } from "next";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { getAllProducts, getAllCategories } from "@/lib/wc/rest";

export const metadata: Metadata = {
  title: "Shop all gifts",
  description: "Browse the OurDreams marketplace — thousands of curated gifts, one vendor of record.",
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return (
    <div className="container pb-24 pt-[calc(var(--header-h)+3rem)]">
      <header className="mb-10 max-w-2xl">
        <p className="eyebrow">Marketplace</p>
        <h1 className="mt-2 text-[var(--step-3)]">The whole shelf, one cart.</h1>
        <p className="mt-3 text-ink/70">
          Filter by category and budget tier. Prices hydrate live from the store — a stale build never sells at the wrong price.
        </p>
      </header>
      <ShopBrowser products={products} categories={categories} />
    </div>
  );
}
