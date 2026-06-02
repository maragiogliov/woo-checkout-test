"use client";

import { useEffect, useState } from "react";
import { getCartCount } from "../lib/cart";

export default function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(getCartCount());

    update();

    window.addEventListener("storage", update);

    const interval = setInterval(update, 500);

    return () => {
      window.removeEventListener("storage", update);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      🛒 Cart
      {count > 0 && (
        <span
          style={{
            marginLeft: 6,
            background: "red",
            color: "white",
            borderRadius: 999,
            padding: "2px 6px",
            fontSize: 12,
          }}
        >
          {count}
        </span>
      )}
    </div>
  );
}