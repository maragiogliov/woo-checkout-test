import { NextResponse } from "next/server";

const STORE_API = `${process.env.WORDPRESS_URL}/wp-json/wc/store/v1`;

export async function GET(req: Request) {
  const cartToken = req.headers.get("cart-token") || req.headers.get("Cart-Token") || "";
  const nonce = req.headers.get("x-wc-store-api-nonce") || req.headers.get("Nonce") || "";

  const res = await fetch(`${STORE_API}/cart`, {
    method: "GET",
    headers: {
      Cookie: req.headers.get("cookie") || "",
      ...(cartToken ? { "Cart-Token": cartToken } : {}),
      ...(nonce ? { "X-WC-Store-API-Nonce": nonce } : {}),
    },
    cache: "no-store",
  });

  const data = await res.json().catch(async () => {
    return { raw: await res.text() };
  });

  const returnedNonce =
    res.headers.get("Nonce") ?? res.headers.get("nonce") ?? nonce ?? "";

  const returnedCartToken =
    res.headers.get("Cart-Token") ?? res.headers.get("cart-token") ?? cartToken ?? "";

  const response = NextResponse.json(
    { ...data, nonce: returnedNonce, cartToken: returnedCartToken },
    { status: res.status }
  );

  if (returnedNonce) response.headers.set("Nonce", returnedNonce);
  if (returnedCartToken) response.headers.set("Cart-Token", returnedCartToken);

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) response.headers.set("set-cookie", setCookie);

  return response;
}