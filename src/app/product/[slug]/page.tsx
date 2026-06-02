import api from "../../lib/woocommerce";
import AddToCartButton from "../../components/AddToCartButton";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  const res = await api.get("products?per_page=100");

  const product = res.data.find((p: any) => p.slug === slug);

  if (!product) {
    return (
      <>
        <style></style>
        <div className="pd-root">
          <nav className="pd-nav">
            <a href="/" className="pd-nav-brand">Maison</a>
          </nav>

          <div className="pd-not-found">
            <div className="pd-not-found-icon">🔍</div>
            <h1>Product not found</h1>
            <p>This item may no longer be available.</p>
            <a href="/" className="pd-btn-primary">Back to Shop</a>
          </div>
        </div>
      </>
    );
  }

  const image = product.images?.[0]?.src ?? null;

  const price = parseFloat(product.price);
  const regularPrice = parseFloat(product.regular_price);
  const isOnSale = product.on_sale && regularPrice > price;

  const category = product.categories?.[0]?.name ?? null;

  const description = product.short_description
    ? product.short_description.replace(/<[^>]+>/g, "")
    : product.description?.replace(/<[^>]+>/g, "") ?? "";

  const inStock = product.stock_status === "instock";

  const productId = Number(product.id);

  return (
    <>
      <style></style>

      <div className="pd-root">
        <div className="pd-breadcrumb">
          <a href="/" className="pd-breadcrumb-link">Shop</a>
          <span className="pd-breadcrumb-sep">›</span>

          {category && (
            <>
              <span className="pd-breadcrumb-link">{category}</span>
              <span className="pd-breadcrumb-sep">›</span>
            </>
          )}

          <span className="pd-breadcrumb-current">{product.name}</span>
        </div>

        <div className="pd-layout">

          <div className="pd-image-col">
            <div className="pd-image-frame">
              {image ? (
                <img src={image} alt={product.name} className="pd-image" />
              ) : (
                <div className="pd-image-placeholder">📦</div>
              )}

              {isOnSale && <span className="pd-sale-badge">Sale</span>}
            </div>

            {product.images?.length > 1 && (
              <div className="pd-thumbs">
                {product.images.slice(0, 4).map((img: any) => (
                  <div key={img.id} className="pd-thumb">
                    <img src={img.src} alt={img.alt || product.name} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="pd-info-col">
            {category && <p className="pd-category">{category}</p>}

            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-price-row">
              <span className="pd-price">€{price.toFixed(2)}</span>

              {isOnSale && (
                <span className="pd-regular-price">
                  €{regularPrice.toFixed(2)}
                </span>
              )}
            </div>

            {description && (
              <p className="pd-description">{description}</p>
            )}

            <div className="pd-divider" />

            <div className="pd-stock">
              <span className={`pd-stock-dot ${inStock ? "in" : "out"}`} />
              <span className="pd-stock-label">
                {inStock ? "In stock" : "Out of stock"}
              </span>
            </div>

            <AddToCartButton productId={productId} />

            <a href="/cart" className="pd-btn-outline">
              View Cart →
            </a>

            <div className="pd-meta">
              <div className="pd-meta-row">
                <span className="pd-meta-key">SKU</span>
                <span className="pd-meta-val">{product.sku || "—"}</span>
              </div>

              {category && (
                <div className="pd-meta-row">
                  <span className="pd-meta-key">Category</span>
                  <span className="pd-meta-val">{category}</span>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}