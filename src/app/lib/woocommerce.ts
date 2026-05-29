import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// src/app/lib/woocommerce.ts — fix this NOW
const api = new WooCommerceRestApi({
  url: process.env.WORDPRESS_URL!,
  consumerKey: process.env.WC_KEY!,
  consumerSecret: process.env.WC_SECRET!,
  version: "wc/v3",
});

export default api;