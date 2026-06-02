"use client";

import { useEffect, useState } from "react";
import {
  getCart,
  removeFromCart,
  updateQuantity,
} from "../lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const refresh = () => setCart(getCart());

  return (
    <div style={{ padding: 20 }}>
      <h1>Cart</h1>

      {cart.length === 0 && <p>Your cart is empty</p>}

      {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 10,
            alignItems: "center",
          }}
        >
          <span>Product #{item.id}</span>

          <button
            onClick={() => {
              updateQuantity(item.id, item.quantity - 1);
              refresh();
            }}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => {
              updateQuantity(item.id, item.quantity + 1);
              refresh();
            }}
          >
            +
          </button>

          <button
            onClick={() => {
              removeFromCart(item.id);
              refresh();
            }}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}