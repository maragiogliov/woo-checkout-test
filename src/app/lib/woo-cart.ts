let cachedCart: any = null;

export async function getCart(force = false) {
  if (cachedCart && !force) return cachedCart;

  const cartToken = cachedCart?.cartToken || "";

  const res = await fetch("/api/cart", {
    method: "GET",
    headers: {
      "Cart-Token": cartToken,
    },
    cache: "no-store",
  });

  const data = await res.json();
  cachedCart = data;

  return data;
}

export async function addToCart(productId: number, quantity = 1) {
  const cart = await getCart();

  const res = await fetch("/api/cart/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-WC-Store-API-Nonce": cart.nonce,
      "Cart-Token": cart.cartToken,
    },
    body: JSON.stringify({
      id: Number(productId),
      quantity: Number(quantity),
    }),
  });

  const data = await res.json();

  // IMPORTANT: refresh cart after mutation
  await getCart(true);

  return data;
}