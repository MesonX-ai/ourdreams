"use client";

import { useSearchParams } from "next/navigation";
import WcProductList from "@/components/wc/WcProductList";
import WcShoppingCart from "@/components/wc/WcShoppingCart";
import styles from "@/components/wc/wc.module.css";

export default function WcCategoryClient() {
  const searchParams = useSearchParams();
  const categoryId = Number(searchParams.get("id") || "0");

  if (!categoryId || Number.isNaN(categoryId)) {
    return <p>Missing category id. Pick a category from the left menu.</p>;
  }

  return (
    <div className={styles.twoCol}>
      <WcProductList categoryId={categoryId} />
      <WcShoppingCart />
    </div>
  );
}
