"use client";

import { useEffect, useState } from "react";

export default function TestWooClient({ productId }: { productId: number }) {
  const [nonce, setNonce] = useState("");
  const [cartToken, setCartToken] = useState("");

  // 1. INIT CART (GET)
  useEffect(() => {
    async function initCart() {
      const res = await fetch("/api/cart");

      const data = await res.json();
      console.log("CART SESSION:", data);

      setNonce(data.nonce || "");
      setCartToken(data.cartToken || "");
    }

    initCart();
  }, []);

  // 2. ADD ITEM (POST)
  async function handleAdd() {
    const res = await fetch("/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-WC-Store-API-Nonce": nonce,
        "Cart-Token": cartToken,
      },
      body: JSON.stringify({
        id: productId,
        quantity: 1,
      }),
    });

    const text = await res.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error("Server did not return JSON::", text);
      return;
    }

    console.log("ADD RESULT:", data);
  }

  return <button onClick={handleAdd}>Add to cart</button>;
}