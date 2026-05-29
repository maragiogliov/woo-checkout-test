import { NextResponse } from "next/server";

const STORE_API =
  "https://saddlebrown-porpoise-760293.hostingersite.com/wp-json/wc/store";

export async function GET(req: Request) {
  const res = await fetch(`${STORE_API}/cart`, {
    headers: {
      Cookie: req.headers.get("cookie") || "",
    },
  });

  const data = await res.text();

  return new NextResponse(data, {
    status: res.status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}