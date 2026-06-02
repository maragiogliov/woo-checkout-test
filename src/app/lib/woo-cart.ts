const CART_TOKEN_KEY = "woo_cart_token";
const NONCE_KEY = "woo_nonce";

function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : "";
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=86400;SameSite=Lax`;
}

export async function getCart() {
  const cartToken = getCookie(CART_TOKEN_KEY);
  const nonce = getCookie(NONCE_KEY);

  const res = await fetch("/api/cart", {
    cache: "no-store",
    headers: {
      ...(cartToken ? { "cart-token": cartToken } : {}),
      ...(nonce ? { "x-wc-store-api-nonce": nonce } : {}),
    },
  });

  const data = await res.json();

  if (data.cartToken) setCookie(CART_TOKEN_KEY, data.cartToken);
  if (data.nonce) setCookie(NONCE_KEY, data.nonce);

  return data;
}

export async function addToCart(productId: number, quantity = 1) {
  const cart = await getCart();

  const res = await fetch("/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cart.nonce ? { "x-wc-store-api-nonce": cart.nonce } : {}),
      ...(cart.cartToken ? { "cart-token": cart.cartToken } : {}),
    },
    body: JSON.stringify({ id: productId, quantity }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.wooResponse?.message ?? "Add to cart failed");
  }

  const data = await res.json();

  if (data.cartToken) setCookie(CART_TOKEN_KEY, data.cartToken);
  if (data.nonce) setCookie(NONCE_KEY, data.nonce);

  return data;
}