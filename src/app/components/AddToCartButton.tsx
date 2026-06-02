"use client";

import { addToCart } from "../lib/woo-cart";

export default function AddToCartButton({
  productId,
}: {
  productId: number;
}) {
  async function handleAdd() {
    try {
      console.log("PRODUCT ID:", productId);

      const res = await addToCart(productId, 1);

      console.log("ADD TO CART RESPONSE:", res);

      if (!res.ok) {
        throw new Error("Add to cart failed");
      }

      alert("Added to cart");
    } catch (err) {
      console.error("❌ Add to cart failed:", err);
    }
  }

  return (
    <button onClick={handleAdd}>
      Add to Cart
    </button>
  );
}