"use client";

import { useEffect, useState } from "react";
import { getCart } from "../lib/woo-cart";

export default function CartPage() {
  const [cart, setCart] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function loadCart() {
    setLoading(true);
    const data = await getCart();
    setCart(data);
    setLoading(false);
  }

  useEffect(() => {
    loadCart();
  }, []);

  if (loading) return <div style={styles.wrap}><p>Loading cart…</p></div>;

  const items = cart?.items ?? [];
  const total = cart?.totals;

  return (
    <div style={styles.wrap}>
      <h1 style={styles.heading}>Your Cart</h1>

      {items.length === 0 ? (
        <div style={styles.empty}>
          <p>Your cart is empty.</p>
          <a href="/" style={styles.link}>← Continue shopping</a>
        </div>
      ) : (
        <>
          <div style={styles.list}>
            {items.map((item: any) => {
              const price = (parseInt(item.prices?.price ?? "0") / 100).toFixed(2);
              return (
                <div key={item.key} style={styles.row}>
                  {item.images?.[0]?.thumbnail && (
                    <img src={item.images[0].thumbnail} alt={item.name} style={styles.img} />
                  )}
                  <div style={styles.info}>
                    <p style={styles.name}>{item.name}</p>
                    <p style={styles.qty}>Qty: {item.quantity}</p>
                  </div>
                  <p style={styles.price}>€{price}</p>
                </div>
              );
            })}
          </div>

          {total && (
            <div style={styles.totals}>
              <span>Total</span>
              <strong>€{(parseInt(total.total_price) / 100).toFixed(2)}</strong>
            </div>
          )}

          <div style={styles.actions}>
            <a href="/" style={styles.link}>← Continue shopping</a>
            <a href="/checkout" style={styles.btnPrimary}>Checkout →</a>
          </div>
        </>
      )}

      <button onClick={loadCart} style={styles.refresh}>↻ Refresh</button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  wrap: { maxWidth: 640, margin: "48px auto", padding: "0 24px", fontFamily: "sans-serif" },
  heading: { fontSize: 28, fontWeight: 400, marginBottom: 32 },
  empty: { color: "#666", display: "flex", flexDirection: "column", gap: 12 },
  list: { display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 },
  row: { display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: "1px solid #eee" },
  img: { width: 72, height: 72, objectFit: "cover", borderRadius: 6 },
  info: { flex: 1 },
  name: { fontWeight: 500, marginBottom: 4 },
  qty: { color: "#888", fontSize: 13 },
  price: { fontWeight: 500 },
  totals: { display: "flex", justifyContent: "space-between", padding: "16px 0", borderTop: "2px solid #1C1C1A", marginBottom: 24, fontSize: 16 },
  actions: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  link: { color: "#1C1C1A", fontSize: 14 },
  btnPrimary: { background: "#1C1C1A", color: "#fff", padding: "12px 24px", borderRadius: 6, textDecoration: "none", fontSize: 14 },
  refresh: { background: "none", border: "1px solid #ccc", padding: "8px 16px", borderRadius: 6, cursor: "pointer", fontSize: 13, color: "#888" },
};