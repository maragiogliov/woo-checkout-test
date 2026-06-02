import api from "./lib/woocommerce";

export default async function Home() {
  const response = await api.get("products");

  const products = response.data;

  return (
    <main>
      <h1>Products</h1>

      <div>
        {products.map((product: any) => (
          <div key={product.id}>
            <img
              src={product.images?.[0]?.src}
              width={200}
              alt={product.name}
            />

            <h2>{product.name}</h2>

            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}