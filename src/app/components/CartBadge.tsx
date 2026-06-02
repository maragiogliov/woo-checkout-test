"use client";

import { useEffect, useState } from "react";
import { getCart } from "../lib/woo-cart";

export default function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function update() {
      const cart = await getCart();
      setCount(cart?.items_count || 0);
    }

    update();

    const interval = setInterval(update, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      🛒 Cart {count > 0 && <span>({count})</span>}
    </div>
  );
}