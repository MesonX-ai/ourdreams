"use client";

import Link from "next/link";
import styles from "./wc.module.css";
import { useCartStore } from "./useCartStore";

function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function WcShoppingCart() {
  const cart = useCartStore((state) => state.cart);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeProductItem = useCartStore((state) => state.removeProductItem);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const total = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <section className={styles.cart}>
      <h3 style={{ marginTop: 0 }}>Cart</h3>

      {cart.length === 0 ? <p className={styles.message}>Cart is empty.</p> : null}

      {cart.map((item) => (
        <article key={item.id} className={styles.cartItem}>
          <strong>{item.qty} x {item.name}</strong>
          <p className={styles.message}>{formatPrice(item.qty * item.price)}</p>
          <div className={styles.cartActions}>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => removeProductItem(item.id)}
            >
              -
            </button>
            <button
              type="button"
              className={styles.btnSecondary}
              onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, images: item.images })}
            >
              +
            </button>
            <button type="button" className={styles.btnSecondary} onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        </article>
      ))}

      <h3>Total: {formatPrice(total)}</h3>
      {total > 0 ? <Link href="/wc/checkout" className={styles.btn}>Checkout</Link> : <p className={styles.message}>Minimum amount to checkout = 500</p>}
    </section>
  );
}
