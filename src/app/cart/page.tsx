"use client";

import { useEffect, useState } from "react";
import { getCart } from "../lib/woo-cart";

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadCart() {
    setLoading(true);
    const data = await getCart();
    setCart(data);
    setLoading(false);
  }

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) return <div>Loading cart...</div>;

  if (!cart?.items?.length) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Your cart is empty</p>

        <button onClick={loadCart}>
          Refresh cart
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>

      <button onClick={loadCart}>
        Refresh
      </button>

      {cart.items.map((item: any) => (
        <div key={item.key}>
          <h3>{item.name}</h3>
          <p>
            {item.quantity} × {item.prices?.price}
          </p>
        </div>
      ))}
    </div>
  );
}