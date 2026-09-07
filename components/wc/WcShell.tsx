"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { getCategories, WcCategory } from "@/lib/wcApi";
import styles from "./wc.module.css";
import { useCartStore } from "./useCartStore";

export default function WcShell({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<WcCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hydrate = useCartStore((state) => state.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    let active = true;

    async function run() {
      try {
        setLoading(true);
        setError(null);
        const result = await getCategories();
        if (active) {
          setCategories(result.filter((item) => (item.count || 0) > 0));
        }
      } catch (e) {
        if (active) {
          setError(e instanceof Error ? e.message : "Unable to load categories.");
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
  }, []);

  return (
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div className={styles.logo}>WC</div>
        <nav className={styles.nav}>
          <Link href="/wc" className={pathname === "/wc" ? styles.active : ""}>Home</Link>
          <Link href="/wc/about" className={pathname === "/wc/about" ? styles.active : ""}>About</Link>
          <Link href="/wc/contact" className={pathname === "/wc/contact" ? styles.active : ""}>Contact</Link>
        </nav>
      </header>

      <div className={styles.body}>
        <aside className={styles.sidebar}>
          <h2>Categories</h2>
          {loading ? <p>Loading categories...</p> : null}
          {error ? <p className={`${styles.message} ${styles.error}`}>{error}</p> : null}
          <div className={styles.categoryList}>
            {categories.map((category) => (
              <Link key={category.id} href={`/wc/category?id=${category.id}`} className={styles.categoryLink}>
                <span>{category.name}</span>
                <span>({category.count || 0})</span>
              </Link>
            ))}
          </div>
        </aside>

        <main className={styles.content}>{children}</main>
      </div>

      <footer className={styles.footer}>
        React-WooCommerce interface for WooCommerce API
      </footer>
    </div>
  );
}
