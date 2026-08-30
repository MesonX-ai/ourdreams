import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ProductDetail } from "@/components/shop/ProductDetail";
import { ProductCard } from "@/components/shop/ProductCard";
import { getStaticProductSlugs, getProduct, getAllProducts } from "@/lib/wc/rest";

export async function generateStaticParams() {
  return getStaticProductSlugs();
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProduct(params.slug);
  if (!product) return { title: "Gift not found" };
  return { title: product.name, description: product.shortDescription };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) notFound();

  const all = await getAllProducts();
  const related = all.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <div className="container pb-24 pt-[calc(var(--header-h)+3rem)]">
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink/60">
        <Link href="/shop/" className="hover:text-ink">Shop</Link> <span aria-hidden> / </span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      <section className="mt-20">
        <h2 className="mb-6 font-display text-2xl">You might also like</h2>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
