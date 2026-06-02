# woo-checkout-test
🛒 WooCommerce + Next.js Headless Store

This project is a simple headless e-commerce setup using Next.js (App Router) with WooCommerce as the backend. It replaces the traditional WooCommerce frontend with a fully custom React experience.

🚀 What this project does
Fetches products from WooCommerce
Supports dynamic product pages using slugs
Implements a fully custom shopping cart (no WooCommerce cart API)
Stores cart data in localStorage
Calculates real totals using WooCommerce product prices
Prepares checkout flow for payment integration
🧱 Tech stack
Next.js (App Router)
TypeScript
WooCommerce REST API
localStorage (cart state)
Axios / WooCommerce REST client
📦 Product flow

Products are pulled directly from WooCommerce:

/product/[slug] fetches product list
Matches product by slug
Displays product details

Example:

const res = await api.get("products?per_page=100");

const product = res.data.find(
  (p) => p.slug === slug
);
🛒 Cart system

The cart is fully client-side and stored in localStorage.

Each item looks like:

{
  id: number,
  quantity: number
}
Core features:
Add to cart
Remove items
Update quantity
Persist between page reloads
Live cart counter
➕ Adding to cart

Products are added using a simple button:

<AddToCartButton productId={product.id} />

Internally:

addToCart({ id: productId });

No API calls needed — everything runs in the browser.

💰 Price calculation

Cart prices are not stored locally.

Instead, prices are always pulled from WooCommerce at checkout time.

Flow:

Take product IDs from cart
Fetch products from WooCommerce
Merge quantity + price
Calculate subtotal and total

Example:

const ids = cart.map((i) => i.id).join(",");

const res = await api.get(`products?include=${ids}`);

const items = cart.map((item) => {
  const product = res.data.find((p) => p.id === item.id);

  return {
    ...item,
    price: product.price,
    subtotal: product.price * item.quantity,
  };
});
🧾 Checkout page

The checkout page shows:

Cart items
Quantity per item
Subtotals
Total price

Everything is derived from WooCommerce data, not stored values.

⚙️ Environment variables

Create a .env.local file:

NEXT_PUBLIC_WORDPRESS_URL=https://your-site.com
WC_KEY=ck_xxxxxxxxx
WC_SECRET=cs_xxxxxxxxx
⚠️ Important notes
Cart is not synced with WooCommerce sessions
This is a fully headless frontend cart
Prices are always fetched from WooCommerce (not stored locally)
Checkout/payment is not included yet (Stripe or WooCommerce redirect can be added)
🧭 Current architecture
WooCommerce → Products API
        ↓
Next.js frontend
        ↓
localStorage cart
        ↓
WooCommerce price hydration
        ↓
Checkout page (calculated totals)
🔮 Next possible upgrades
Stripe Checkout integration
WooCommerce order creation API
Cart drawer UI (Shopify-style)
Persistent server-side cart
User accounts + order history
🧠 Summary

This setup gives you a clean headless store where:

WooCommerce handles products
Next.js handles everything user-facing
Cart is fast and fully custom
Pricing stays accurate via WooCommerce