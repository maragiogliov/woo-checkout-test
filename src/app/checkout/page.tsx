"use client";

import { useState } from "react";
import { getCart } from "../lib/cart";

export default function CheckoutPage() {
  const cart = getCart();
  const [loading, setLoading] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');

        .checkout-root {
          min-height: 100vh;
          background: #F7F5F0;
          font-family: 'DM Sans', sans-serif;
          color: #1C1C1A;
        }

        .checkout-nav {
          position: sticky;
          top: 0;
          z-index: 10;
          background: #F7F5F0;
          border-bottom: 1px solid rgba(28,28,26,0.12);
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
        }

        .checkout-nav-brand {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 300;
          letter-spacing: 0.02em;
          text-decoration: none;
          color: #1C1C1A;
        }

        .checkout-nav-step {
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #7A7872;
        }

        .checkout-layout {
          max-width: 860px;
          margin: 0 auto;
          padding: 44px 24px 80px;
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 720px) {
          .checkout-layout {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 28px 16px 60px;
          }
        }

        .checkout-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 36px;
          font-weight: 300;
          line-height: 1.15;
          margin: 0 0 28px;
        }

        .checkout-heading em {
          font-style: italic;
          color: #7A7872;
        }

        /* Order summary card */
        .order-card {
          background: #FDFCF9;
          border: 1px solid rgba(28,28,26,0.12);
          border-radius: 12px;
          overflow: hidden;
          position: sticky;
          top: 76px;
        }

        .order-card-header {
          padding: 18px 20px;
          border-bottom: 1px solid rgba(28,28,26,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .order-card-title {
          font-size: 12px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #7A7872;
        }

        .order-card-count {
          font-size: 12px;
          background: #1C1C1A;
          color: #F7F5F0;
          border-radius: 20px;
          padding: 2px 10px;
        }

        .order-items {
          padding: 4px 0;
        }

        .order-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 20px;
          gap: 12px;
          border-bottom: 1px solid rgba(28,28,26,0.06);
        }

        .order-item:last-child {
          border-bottom: none;
        }

        .order-item-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .order-item-badge {
          width: 40px;
          height: 40px;
          background: #F5E6CC;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .order-item-name {
          font-size: 13px;
          font-weight: 500;
          color: #1C1C1A;
          line-height: 1.3;
        }

        .order-item-qty {
          font-size: 12px;
          color: #7A7872;
          margin-top: 1px;
        }

        .order-item-price {
          font-size: 13px;
          font-weight: 500;
          color: #C17B2E;
          white-space: nowrap;
        }

        .order-totals {
          padding: 16px 20px;
          border-top: 1px solid rgba(28,28,26,0.10);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .totals-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #7A7872;
        }

        .totals-row.grand {
          font-size: 15px;
          font-weight: 600;
          color: #1C1C1A;
          padding-top: 10px;
          border-top: 1px solid rgba(28,28,26,0.12);
          margin-top: 4px;
        }

        /* Empty state */
        .empty-state {
          text-align: center;
          padding: 48px 20px;
          color: #7A7872;
          font-size: 14px;
        }

        .empty-state-icon {
          font-size: 40px;
          margin-bottom: 12px;
          opacity: 0.5;
        }

        /* Pay button */
        .pay-btn {
          width: 100%;
          margin-top: 16px;
          padding: 14px 20px;
          background: #1C1C1A;
          color: #F7F5F0;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .pay-btn:hover:not(:disabled) {
          background: #C17B2E;
        }

        .pay-btn:active:not(:disabled) {
          transform: scale(0.98);
        }

        .pay-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .pay-btn-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(247,245,240,0.3);
          border-top-color: #F7F5F0;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .secure-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          font-size: 11px;
          color: #7A7872;
          margin-top: 10px;
          letter-spacing: 0.02em;
        }

        /* Left column: info section */
        .info-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .info-block {
          background: #FDFCF9;
          border: 1px solid rgba(28,28,26,0.12);
          border-radius: 12px;
          padding: 20px 22px;
        }

        .info-block-title {
          font-size: 11px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #7A7872;
          margin-bottom: 12px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #7A7872;
          margin-bottom: 6px;
        }

        .info-row:last-child {
          margin-bottom: 0;
        }

        .info-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #C17B2E;
          flex-shrink: 0;
        }
      `}</style>

      <div className="checkout-root">
  

        <div className="checkout-layout">

          {/* Left: heading + info */}
          <div className="info-section">
            <h1 className="checkout-heading">
              Almost there,<br /><em>review your order.</em>
            </h1>

            <div className="info-block">
              <p className="info-block-title">What happens next</p>
              <div className="info-row"><span className="info-dot" />You'll be taken to our secure Stripe payment page</div>
              <div className="info-row"><span className="info-dot" />Enter your card details safely on Stripe's hosted form</div>
              <div className="info-row"><span className="info-dot" />Once confirmed, your order is placed and you'll receive an email</div>
            </div>

            <div className="info-block">
              <p className="info-block-title">Need help?</p>
              <div className="info-row"><span className="info-dot" />Returns accepted within 30 days of delivery</div>
              <div className="info-row"><span className="info-dot" />Free shipping on orders over €100</div>
              <div className="info-row"><span className="info-dot" />Questions? hello@maison.store</div>
            </div>
          </div>

          {/* Right: order summary + pay */}
          <div>
            <div className="order-card">
              <div className="order-card-header">
                <span className="order-card-title">Order summary</span>
                <span className="order-card-count">{totalItems} {totalItems === 1 ? "item" : "items"}</span>
              </div>

              {cart.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🛒</div>
                  <p>Your cart is empty</p>
                </div>
              ) : (
                <div className="order-items">
                  {cart.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="order-item-left">
                        <div className="order-item-badge">
                          "📦"
                        </div>
                        <div>
                          <div className="order-item-name">
                            {item.name ?? `Product #${item.id}`}
                          </div>
                          <div className="order-item-qty">Qty {item.quantity}</div>
                        </div>
                      </div>
                      {item.price != null && (
                        <div className="order-item-price">
                          €{(item.price * item.quantity).toFixed(2)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="order-totals">
                <div className="totals-row">
                  <span>Subtotal</span>
                  <span>{totalPrice > 0 ? `€${totalPrice.toFixed(2)}` : "—"}</span>
                </div>
                <div className="totals-row">
                  <span>Shipping</span>
                  <span>{totalPrice >= 100 ? "Free" : "€5.90"}</span>
                </div>
                {totalPrice > 0 && (
                  <div className="totals-row grand">
                    <span>Total</span>
                    <span>€{(totalPrice + (totalPrice >= 100 ? 0 : 5.90)).toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div style={{ padding: "0 16px 20px" }}>
                <button
                  className="pay-btn"
                  onClick={handleCheckout}
                  disabled={loading || cart.length === 0}
                >
                  {loading ? (
                    <>
                      <span className="pay-btn-spinner" />
                      Redirecting…
                    </>
                  ) : (
                    <>Pay with Stripe →</>
                  )}
                </button>
                <p className="secure-note">🔒 Payments secured by Stripe</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}