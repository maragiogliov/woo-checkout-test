import api from "../lib/woocommerce";
import TestWooClient from "./TestWooClient";

export default async function TestPage() {

      console.log("ENV CHECK:", {
    url: process.env.WORDPRESS_URL,
    key: process.env.WC_CONSUMER_KEY,
    secret: process.env.WC_CONSUMER_SECRET,
  });

  const res = await api.get("products");

  const products = res.data;

  console.log(products);

  return (
    <main style={{ padding: 40 }}>
      <h1>Woo Products</h1>

      <div
        style={{
          display: "grid",
          gap: 20,
        }}
      >
        {products.map((product: any) => (
      <div
  key={product.id}
  style={{
    border: "1px solid #ccc",
    padding: 20,
  }}
>
  <h2>{product.name}</h2>

  <p>€ {product.price}</p>

  <p>ID: {product.id}</p>

  <TestWooClient productId={product.id} />
</div>
        ))}
      </div>
    </main>
  );
}