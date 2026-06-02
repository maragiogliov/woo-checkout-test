"use client";

import { addToCart } from "../lib/cart";

export default function AddToCartButton({
  product,
}: {
  product: any;
}) {
  return (
    <button onClick={() => addToCart(product)}>
      Add to Cart
    </button>
  );
}