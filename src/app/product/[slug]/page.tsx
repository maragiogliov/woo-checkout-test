import api from "../../lib/woocommerce";
import AddToCartButton from "../../components/AddToCartButton";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  console.log("SLUG:", slug);

  // Fetch a broader product list (WooCommerce-safe approach)
  const res = await api.get("products?per_page=100");

  console.log("RESPONSE:", res.data);
  

  // Find product by slug locally
  const product = res.data.find(
    (p: any) => p.slug === slug
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <AddToCartButton productId={product.id} />
    </div>
  );
}