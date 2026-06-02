export async function getCart() {
  const res = await fetch("/api/cart", {
    cache: "no-store",
  });

  return res.json();
}

export async function addToCart(productId: number, quantity = 1) {
  const cart = await getCart();

  const res = await fetch("/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

      "x-wc-store-api-nonce": cart.nonce,
      "cart-token": cart.cartToken,
    },
    body: JSON.stringify({
      id: productId,
      quantity,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Add to cart failed");
  }

  return data;
}