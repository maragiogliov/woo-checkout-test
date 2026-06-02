import { NextResponse } from "next/server";

const STORE_API = `${process.env.WORDPRESS_URL}/wp-json/wc/store/v1`;

export async function GET(req: Request) {
  const res = await fetch(`${STORE_API}/cart`, {
    method: "GET",
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
    cache: "no-store",
  });

  const data = await res.json().catch(async () => {
    return { raw: await res.text() };
  });

  const nonce =
    res.headers.get("nonce") ??
    res.headers.get("Nonce") ??
    "";

  const cartToken =
    res.headers.get("cart-token") ??
    res.headers.get("Cart-Token") ??
    "";

  return NextResponse.json(
    {
      ...data,
      nonce,
      cartToken,
    },
    { status: res.status }
  );
}