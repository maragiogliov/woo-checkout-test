"use client";

import { useEffect, useState } from "react";
import { getCart, removeFromCart, updateQuantity } from "../lib/cart";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    setCart(getCart());
      const data = getCart();
      console.log("CART:", data);

  }, []);

  const refresh = () => setCart(getCart());

  const total = cart.reduce((sum, item) => sum + (item.price ?? 0) * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');

        .cart-root {
          min-height: 100vh;
          background: #F7F5F0;
          font-family: 'DM Sans', sans-serif;
          color: #1C1C1A;
        }

        .cart-nav {
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

        .cart-nav-brand {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 22px;
          font-weight: 300;
          letter-spacing: 0.02em;
          text-decoration: none;
          color: #1C1C1A;
        }

        .cart-nav-right {
          font-size: 12px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #7A7872;
        }

        .cart-wrap {
          max-width: 860px;
          margin: 0 auto;
          padding: 44px 24px 80px;
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 700px) {
          .cart-wrap {
            grid-template-columns: 1fr;
            padding: 28px 16px 60px;
          }
        }

        .cart-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: 36px;
          font-weight: 300;
          line-height: 1.15;
          margin: 0 0 6px;
        }

        .cart-heading em {
          font-style: italic;
          color: #7A7872;
        }

        .cart-subheading {
          font-size: 13px;
          color: #7A7872;
          margin-bottom: 28px;
        }

        /* Items list */
        .cart-items {
          display: flex;
          flex-direction: column;
        }

        .cart-item {
          display: grid;
          grid-template-columns: 52px 1fr auto;
          gap: 16px;
          align-items: center;
          padding: 18px 0;
          border-bottom: 1px solid rgba(28,28,26,0.09);
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .cart-item-thumb {
          width: 52px;
          height: 52px;
          background: #F5E6CC;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        .cart-item-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }

        .cart-item-name {
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cart-item-unit-price {
          font-size: 12px;
          color: #7A7872;
        }

        .qty-controls {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1px solid rgba(28,28,26,0.18);
          border-radius: 6px;
          overflow: hidden;
          height: 28px;
        }

        .qty-btn {
          width: 28px;
          height: 28px;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 15px;
          color: #1C1C1A;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.12s;
          flex-shrink: 0;
        }

        .qty-btn:hover {
          background: #F5E6CC;
          color: #C17B2E;
        }

        .qty-value {
          width: 28px;
          text-align: center;
          font-size: 13px;
          font-weight: 500;
          border-left: 1px solid rgba(28,28,26,0.12);
          border-right: 1px solid rgba(28,28,26,0.12);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-item-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
        }

        .cart-item-price {
          font-size: 14px;
          font-weight: 500;
          color: #C17B2E;
          white-space: nowrap;
        }

        .remove-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #7A7872;
          padding: 0;
          transition: color 0.12s;
          white-space: nowrap;
        }

        .remove-btn:hover {
          color: #c0392b;
        }

        /* Empty */
        .cart-empty {
          padding: 60px 0 40px;
          text-align: center;
          color: #7A7872;
        }

        .cart-empty-icon {
          font-size: 48px;
          opacity: 0.4;
          margin-bottom: 14px;
        }

        .cart-empty p {
          font-size: 14px;
          margin-bottom: 20px;
        }

        /* Summary panel */
        .summary-card {
          background: #FDFCF9;
          border: 1px solid rgba(28,28,26,0.12);
          border-radius: 12px;
          overflow: hidden;
          position: sticky;
          top: 76px;
        }

        .summary-header {
          padding: 16px 20px;
          border-bottom: 1px solid rgba(28,28,26,0.08);
          font-size: 11px;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: #7A7872;
        }

        .summary-body {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          color: #7A7872;
        }

        .summary-row.total {
          font-size: 15px;
          font-weight: 600;
          color: #1C1C1A;
          padding-top: 12px;
          border-top: 1px solid rgba(28,28,26,0.10);
          margin-top: 2px;
        }

        .checkout-btn {
          display: block;
          width: calc(100% - 32px);
          margin: 0 16px 16px;
          padding: 13px 20px;
          background: #1C1C1A;
          color: #F7F5F0;
          border: none;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }

        .checkout-btn:hover {
          background: #C17B2E;
        }

        .checkout-btn:active {
          transform: scale(0.98);
        }

        .checkout-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .continue-link {
          display: block;
          text-align: center;
          font-size: 12px;
          color: #7A7872;
          text-decoration: none;
          margin-bottom: 16px;
          letter-spacing: 0.03em;
          transition: color 0.12s;
        }

        .continue-link:hover {
          color: #C17B2E;
        }
      `}</style>

      <div className="cart-root">
    

        <div className="cart-wrap">

          {/* Left: items */}
          <div>
            <h1 className="cart-heading">
              Your cart
              {cart.length > 0 && <>,<br /><em>ready to checkout.</em></>}
            </h1>
            {cart.length > 0 && (
              <p className="cart-subheading">Review your items before placing your order.</p>
            )}

            {cart.length === 0 ? (
              <div className="cart-empty">
                <div className="cart-empty-icon">🛒</div>
                <p>Your cart is empty.</p>
                <a href="/" className="checkout-btn" style={{ display: "inline-block", width: "auto", padding: "12px 28px" }}>
                  Continue Shopping
                </a>
              </div>
            ) : (
              <div className="cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-thumb">📦</div>

                    <div className="cart-item-info">
                      <span className="cart-item-name">
                        {item.name ?? `Product #${item.id}`}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className="qty-controls">
                          <button
                            className="qty-btn"
                            aria-label="Decrease quantity"
                            onClick={() => { updateQuantity(item.id, item.quantity - 1); refresh(); }}
                          >−</button>
                          <span className="qty-value">{item.quantity}</span>
                          <button
                            className="qty-btn"
                            aria-label="Increase quantity"
                            onClick={() => { updateQuantity(item.id, item.quantity + 1); refresh(); }}
                          >+</button>
                        </div>
                        {item.price != null && (
                          <span className="cart-item-unit-price">€{item.price} each</span>
                        )}
                      </div>
                    </div>

                    <div className="cart-item-right">
                      {item.price != null && (
                        <span className="cart-item-price">
                          €{(item.price * item.quantity).toFixed(2)}
                        </span>
                      )}
                      <button
                        className="remove-btn"
                        onClick={() => { removeFromCart(item.id); refresh(); }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: summary */}
          {cart.length > 0 && (
            <div>
              <div className="summary-card">
                <div className="summary-header">Order summary</div>
                <div className="summary-body">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>{total > 0 ? `€${total.toFixed(2)}` : "—"}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>{total >= 100 ? "Free" : "€5.90"}</span>
                  </div>
                  {total > 0 && (
                    <div className="summary-row total">
                      <span>Total</span>
                      <span>€{(total + (total >= 100 ? 0 : 5.90)).toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <a href="/checkout" className="checkout-btn">
                  Proceed to Checkout →
                </a>
                <a href="/" className="continue-link">← Continue Shopping</a>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}