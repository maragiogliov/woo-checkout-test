"use client";

import { useEffect, useState } from "react";
import { getCart } from "../lib/woo-cart";

export default function CheckoutPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      const data = await getCart();
      setCart(data);
    }

    load();
  }, []);

  if (!cart) return <div>Loading...</div>;

  const items = cart.items || [];

  const totalItems = items.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum: number, item: any) =>
      sum + (item.prices?.price ?? 0) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cart }),
    });

    const data = await res.json();

    window.location.href = data.url;
  };

  return (
    <div className="checkout-root">
      <div className="checkout-layout">
        <div className="info-section">
          <h1 className="checkout-heading">
            Almost there,<br /><em>review your order.</em>
          </h1>
        </div>

        <div>
          <div className="order-card">
            <div className="order-card-header">
              <span className="order-card-title">Order summary</span>
              <span className="order-card-count">
                {totalItems} items
              </span>
            </div>

            {items.length === 0 ? (
              <div className="empty-state">
                🛒 Your cart is empty
              </div>
            ) : (
              <div className="order-items">
                {items.map((item: any) => (
                  <div key={item.key} className="order-item">
                    <div className="order-item-name">
                      {item.name}
                    </div>
                    <div>
                      Qty {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="order-totals">
              <div className="totals-row">
                <span>Subtotal</span>
                <span>€{totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              className="pay-btn"
              onClick={handleCheckout}
              disabled={loading || items.length === 0}
            >
              {loading ? "Redirecting..." : "Pay with Stripe →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}