import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const baseUrl = process.env.WORDPRESS_URL;
    const nonce = req.headers.get("x-wc-store-api-nonce") || "";
    const cartToken = req.headers.get("cart-token") || "";

    const res = await fetch(
      `${baseUrl}/wp-json/wc/store/v1/cart/add-item`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(nonce ? { "X-WC-Store-API-Nonce": nonce } : {}),
          ...(cartToken ? { "Cart-Token": cartToken } : {}),
        },
        body: JSON.stringify({
          id: Number(body.id),
          quantity: Number(body.quantity ?? 1),
          cart_item_data: {},
        }),
      }
    );

    const text = await res.text();
    let wooResponse;
    try {
      wooResponse = JSON.parse(text);
    } catch {
      wooResponse = text;
    }

    const returnedNonce =
      res.headers.get("Nonce") ?? res.headers.get("nonce") ?? nonce ?? "";
    const returnedCartToken =
      res.headers.get("Cart-Token") ?? res.headers.get("cart-token") ?? cartToken ?? "";

    const response = NextResponse.json(
      {
        status: res.status,
        ok: res.ok,
        wooResponse,
        nonce: returnedNonce,
        cartToken: returnedCartToken,
        sent: { id: Number(body.id), quantity: Number(body.quantity ?? 1) },
      },
      { status: res.status }
    );

    const setCookie = res.headers.get("set-cookie");
    if (setCookie) response.headers.set("set-cookie", setCookie);

    return response;
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}