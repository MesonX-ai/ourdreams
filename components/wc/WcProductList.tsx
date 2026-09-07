"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./wc.module.css";
import { getCategoryById, getProductsByCategory, WcCategory, WcProduct } from "@/lib/wcApi";
import { useCartStore } from "./useCartStore";

type Props = {
  categoryId: number;
};

const PER_PAGE = 9;

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isNaN(n) ? 0 : n;
}

function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function WcProductList({ categoryId }: Props) {
  const [products, setProducts] = useState<WcProduct[]>([]);
  const [category, setCategory] = useState<WcCategory | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);

  useEffect(() => {
    let active = true;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const [categoryResult, productsResult] = await Promise.all([
          getCategoryById(categoryId),
          getProductsByCategory(categoryId, currentPage, PER_PAGE),
        ]);

        if (active) {
          setCategory(categoryResult);
          setProducts(productsResult.products);
          setTotal(productsResult.total);
        }
      } catch (e) {
        if (active) {
          setError(e instanceof Error ? e.message : "Unable to load products.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      active = false;
    };
  }, [categoryId, currentPage]);

  const pageCount = useMemo(() => Math.max(1, Math.ceil(total / PER_PAGE)), [total]);

  const renderPrice = (item: WcProduct) => {
    const price = toNumber(item.price);
    const regular = toNumber(item.regular_price);

    if (regular <= 0 || regular === price) {
      return <span>{formatPrice(price)}</span>;
    }

    const discount = (1 - price / regular) * 100;
    return (
      <span>
        <strong style={{ color: "#dc2626" }}>{discount.toFixed(0)}%</strong> | <s>{formatPrice(regular)}</s> | <b>{formatPrice(price)}</b>
      </span>
    );
  };

  return (
    <section>
      <h2 style={{ marginTop: 0 }}>Products on {category?.name || "Category"}</h2>

      {loading ? <p>Loading products...</p> : null}
      {error ? <p className={`${styles.message} ${styles.error}`}>{error}</p> : null}
      {!loading && !error && products.length === 0 ? <p>No products in this category.</p> : null}

      <div className={styles.grid}>
        {products
          .filter((item) => toNumber(item.price) > 0)
          .map((item) => {
            const img = item.images?.[0]?.src || "https://placehold.co/600x400?text=No+Image";
            return (
              <article key={item.id} className={styles.card}>
                <img src={img} alt={item.name} loading="lazy" />
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{item.name}</h3>
                  <p className={styles.cardPrice}>{renderPrice(item)}</p>
                  <button
                    type="button"
                    className={styles.btn}
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: toNumber(item.price),
                        images: item.images,
                      })
                    }
                  >
                    Add to Cart
                  </button>
                </div>
              </article>
            );
          })}
      </div>

      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.btnSecondary}
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>
        <span>
          {total === 0 ? "0" : `${(currentPage - 1) * PER_PAGE + 1}-${Math.min(currentPage * PER_PAGE, total)}`} of {total} items
        </span>
        <button
          type="button"
          className={styles.btnSecondary}
          disabled={currentPage >= pageCount}
          onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
        >
          Next
        </button>
      </div>
    </section>
  );
}
