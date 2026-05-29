import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const nonce = req.headers.get("x-wc-store-api-nonce");
    const cartToken = req.headers.get("cart-token"); // ✅ add this
  try {
    const body = await req.json();

    const nonce = req.headers.get("x-wc-store-api-nonce");

    const baseUrl = process.env.WORDPRESS_URL;

    console.log("WP BASE URL:", baseUrl);
    console.log("NONCE RECEIVED:", nonce);
    console.log("BODY:", body);

const res = await fetch(`${baseUrl}/wp-json/wc/store/cart/add-item`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    ...(nonce ? { "X-WC-Store-API-Nonce": nonce } : {}),
    // ✅ Add this
    ...(cartToken ? { "Cart-Token": cartToken } : {}),
  },
  body: JSON.stringify(body),
});

    const text = await res.text();

    console.log("WORDPRESS RAW RESPONSE:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return NextResponse.json(data, { status: res.status });
  } catch (err: any) {
    console.error("API ERROR:", err);

    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: err.message,
      },
      { status: 500 }
    );
  }
}

