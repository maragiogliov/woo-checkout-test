"use client";

import { useState } from "react";

export default function DebugPage() {
  const [cartData, setCartData] = useState<any>(null);
  const [addData, setAddData] = useState<any>(null);
  const [productId, setProductId] = useState("1");
  const [loading, setLoading] = useState(false);

  async function fetchCart() {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const data = await res.json();
      setCartData({ status: res.status, ok: res.ok, data });
    } catch (e: any) {
      setCartData({ error: e.message });
    }
    setLoading(false);
  }

  async function testAdd() {
    setLoading(true);
    try {
      const cartRes = await fetch("/api/cart", { cache: "no-store" });
      const cart = await cartRes.json();

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(cart.nonce ? { "x-wc-store-api-nonce": cart.nonce } : {}),
          ...(cart.cartToken ? { "cart-token": cart.cartToken } : {}),
        },
        body: JSON.stringify({ id: Number(productId), quantity: 1 }),
      });
      const data = await res.json();
      setAddData({ status: res.status, ok: res.ok, cartUsed: { nonce: cart.nonce, cartToken: cart.cartToken }, data });
    } catch (e: any) {
      setAddData({ error: e.message });
    }
    setLoading(false);
  }

  const pre = (obj: any) => (
    <pre style={{ background: "#1a1a1a", color: "#e8e8e8", padding: "16px", borderRadius: "8px", overflow: "auto", fontSize: "12px", lineHeight: 1.5 }}>
      {JSON.stringify(obj, null, 2)}
    </pre>
  );

  return (
    <div style={{ padding: "32px", fontFamily: "monospace", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "24px", fontFamily: "sans-serif" }}>🛠 Cart Debug</h1>

      <div style={{ display: "flex", gap: "12px", marginBottom: "32px", alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={fetchCart} disabled={loading} style={btnStyle}>
          1. Fetch /api/cart
        </button>

        <input
          value={productId}
          onChange={e => setProductId(e.target.value)}
          placeholder="Product ID"
          style={{ padding: "8px 12px", border: "1px solid #ccc", borderRadius: "6px", width: "120px" }}
        />
        <button onClick={testAdd} disabled={loading} style={btnStyle}>
          2. Add to Cart
        </button>

        {loading && <span style={{ color: "#999" }}>Loading…</span>}
      </div>

      {cartData && (
        <section style={{ marginBottom: "28px" }}>
          <h2 style={{ fontFamily: "sans-serif", marginBottom: "8px" }}>GET /api/cart</h2>
          {pre(cartData)}
        </section>
      )}

      {addData && (
        <section>
          <h2 style={{ fontFamily: "sans-serif", marginBottom: "8px" }}>POST /api/cart/add</h2>
          {pre(addData)}
        </section>
      )}
    </div>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "#1C1C1A",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "14px",
  fontFamily: "sans-serif",
};
