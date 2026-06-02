"use client";

import { getCart } from "../lib/cart";

export default function CheckoutPage() {
  const cart = getCart();

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Checkout</h1>

      <p>Items: {totalItems}</p>

      {cart.map((item) => (
        <div key={item.id}>
          Product #{item.id} × {item.quantity}
        </div>
      ))}

      <button onClick={handleCheckout}>
        Pay Now
      </button>
    </div>
  );
}