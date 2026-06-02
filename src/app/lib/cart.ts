export type CartItem = {
  id: number;
  name?: string;
  price?: number;
  quantity: number;
};

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(item: {
  id: number;
  name?: string;
  price?: number;
}) {
  const cart = getCart();

  const existing = cart.find((p) => p.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
}

export function removeFromCart(id: number) {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
}

export function updateQuantity(id: number, quantity: number) {
  const cart = getCart().map((item) =>
    item.id === id ? { ...item, quantity } : item
  );

  saveCart(cart);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}