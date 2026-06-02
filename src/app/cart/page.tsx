"use client";

import { useEffect, useState } from "react";
import { getCart } from "../lib/woo-cart";

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getCart(true);
      setCart(data);
    }

    load();
  }, []);

  if (!cart) return <div>Loading...</div>;

  return (
    <div>
      <h1>Cart</h1>

      {cart.items?.length === 0 && <p>Cart is empty</p>}

      {cart.items?.map((item: any) => (
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