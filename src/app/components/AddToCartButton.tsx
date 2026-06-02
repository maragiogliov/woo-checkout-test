"use client";

import { useState } from "react";
import { addToCart } from "../lib/woo-cart";

export default function AddToCartButton({ productId }: { productId: number }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleAdd() {
    setStatus("loading");
    setMessage("");

    try {
      console.log("[AddToCart] Starting — productId:", productId);

      const data = await addToCart(productId, 1);

      console.log("[AddToCart] Success:", data);
      setStatus("success");
      setMessage("Added to cart!");

      setTimeout(() => setStatus("idle"), 3000);
    } catch (err: any) {
      console.error("[AddToCart] Failed:", err);
      setStatus("error");
      setMessage(err?.message ?? "Something went wrong");
    }
  }

  const label =
    status === "loading" ? "Adding…"
    : status === "success" ? "✓ Added!"
    : status === "error" ? "Failed — retry?"
    : "Add to Cart";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <button
        onClick={handleAdd}
        disabled={status === "loading"}
        style={{
          padding: "12px 24px",
          background: status === "success" ? "#2a7a2a" : status === "error" ? "#c0392b" : "#1C1C1A",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          fontSize: "14px",
          opacity: status === "loading" ? 0.7 : 1,
          transition: "all 0.2s",
        }}
      >
        {label}
      </button>

      {message && (
        <p style={{
          fontSize: "13px",
          color: status === "error" ? "#c0392b" : "#2a7a2a",
          margin: 0,
        }}>
          {message}
        </p>
      )}
    </div>
  );
}