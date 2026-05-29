import { NextResponse } from "next/server";

const STORE_API = `${process.env.WORDPRESS_URL}/wp-json/wc/store`;

export async function GET(req: Request) {
  const res = await fetch(`${STORE_API}/cart`, {
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
  });

  // WooCommerce returns the nonce and cart token in response headers
  const nonce     = res.headers.get("Nonce") ?? res.headers.get("nonce") ?? "";
  const cartToken = res.headers.get("Cart-Token") ?? res.headers.get("cart-token") ?? "";

  const data = await res.json();

  return NextResponse.json(
    { ...data, nonce, cartToken },
    { status: res.status }
  );
}