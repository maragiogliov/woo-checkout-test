"use client";

import { addToCart } from "../lib/cart";

export default function AddToCartButton({
  productId,
}: {
  productId: number;
}) {
  return (
    <button onClick={() => addToCart({ id: productId })}>
      Add to Cart
    </button>
  );
}