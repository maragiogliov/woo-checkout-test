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

    return NextResponse.json(
      {
        status: res.status,
        ok: res.ok,
        wooResponse,
        sent: {
          id: Number(body.id),
          quantity: Number(body.quantity ?? 1),
        },
      },
      { status: res.status }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}