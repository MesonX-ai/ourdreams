"use client";

import WooCommerceCheckoutForm from "@/components/WooCommerceCheckoutForm";
import WcShoppingCart from "@/components/wc/WcShoppingCart";
import { useCartStore } from "@/components/wc/useCartStore";
import styles from "@/components/wc/wc.module.css";

export default function WcCheckoutPage() {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const lineItems = cart.map((item) => ({
    product_id: item.id,
    quantity: item.qty,
  }));

  return (
    <div className={styles.twoCol}>
      <div>
        <h2 style={{ marginTop: 0 }}>Checkout</h2>
        <WooCommerceCheckoutForm
          cartItems={lineItems}
          onOrderCreated={() => {
            clearCart();
          }}
        />
      </div>
      <WcShoppingCart />
    </div>
  );
}
