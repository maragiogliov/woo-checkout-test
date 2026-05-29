// src/app/api/cart/route.ts
import { NextResponse } from "next/server";

const STORE_API = process.env.WORDPRESS_URL + "/wp-json/wc/store";

export async function GET(req: Request) {
  const res = await fetch(`${STORE_API}/cart`, {
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
  });

  // ✅ Extract nonce and cart-token from WC response headers
  const nonce = res.headers.get("Nonce") || res.headers.get("nonce") || "";
  const cartToken = res.headers.get("Cart-Token") || res.headers.get("cart-token") || "";

  const data = await res.json();

  return NextResponse.json(
    { ...data, nonce, cartToken },
    {
      status: res.status,
      headers: {
        // Forward the cart token header so the browser cookie jar can persist it
        ...(cartToken ? { "Cart-Token": cartToken } : {}),
      },
    }
  );
}