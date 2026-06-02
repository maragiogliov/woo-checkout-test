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
        <style>{baseStyles}</style>
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
  // Strip HTML from description
  const description = product.short_description
    ? product.short_description.replace(/<[^>]+>/g, "")
    : product.description?.replace(/<[^>]+>/g, "") ?? "";
  const inStock = product.stock_status === "instock";

  return (
    <>
      <style>{baseStyles}</style>
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

          {/* Image */}
          <div className="pd-image-col">
            <div className="pd-image-frame">
              {image ? (
                <img src={image} alt={product.name} className="pd-image" />
              ) : (
                <div className="pd-image-placeholder">📦</div>
              )}
              {isOnSale && <span className="pd-sale-badge">Sale</span>}
            </div>

            {/* Thumbnail strip if multiple images */}
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

          {/* Info */}
          <div className="pd-info-col">
            {category && <p className="pd-category">{category}</p>}
            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-price-row">
              <span className="pd-price">€{price.toFixed(2)}</span>
              {isOnSale && (
                <span className="pd-regular-price">€{regularPrice.toFixed(2)}</span>
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

            <AddToCartButton product={product} />

            <a href="/cart" className="pd-btn-outline">View Cart →</a>

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

const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pd-root {
    min-height: 100vh;
    background: #F7F5F0;
    font-family: 'DM Sans', sans-serif;
    color: #1C1C1A;
  }

  /* Nav */
  .pd-nav {
    position: sticky;
    top: 0;
    z-index: 10;
    background: #F7F5F0;
    border-bottom: 1px solid rgba(28,28,26,0.12);
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
  }
  .pd-nav-brand {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 22px;
    font-weight: 300;
    letter-spacing: 0.02em;
    text-decoration: none;
    color: #1C1C1A;
  }
  .pd-nav-cart {
    font-size: 18px;
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.15s;
  }
  .pd-nav-cart:hover { opacity: 1; }

  /* Breadcrumb */
  .pd-breadcrumb {
    max-width: 960px;
    margin: 0 auto;
    padding: 16px 24px 0;
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
  }
  .pd-breadcrumb-link {
    font-size: 12px;
    color: #7A7872;
    text-decoration: none;
    letter-spacing: 0.02em;
    transition: color 0.12s;
  }
  .pd-breadcrumb-link:hover { color: #C17B2E; }
  .pd-breadcrumb-sep { font-size: 11px; color: rgba(28,28,26,0.25); }
  .pd-breadcrumb-current { font-size: 12px; color: #1C1C1A; }

  /* Layout */
  .pd-layout {
    max-width: 960px;
    margin: 0 auto;
    padding: 32px 24px 80px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: start;
  }
  @media (max-width: 680px) {
    .pd-layout {
      grid-template-columns: 1fr;
      gap: 28px;
      padding: 24px 16px 60px;
    }
  }

  /* Image */
  .pd-image-col { display: flex; flex-direction: column; gap: 12px; }
  .pd-image-frame {
    background: #F5E6CC;
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .pd-image { width: 100%; height: 100%; object-fit: cover; display: block; }
  .pd-image-placeholder { font-size: 96px; opacity: 0.5; }
  .pd-sale-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    background: #1C1C1A;
    color: #F7F5F0;
    font-size: 10px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 12px;
    border-radius: 20px;
  }
  .pd-thumbs { display: flex; gap: 8px; }
  .pd-thumb {
    width: 64px;
    height: 64px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid rgba(28,28,26,0.12);
    cursor: pointer;
    flex-shrink: 0;
  }
  .pd-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* Info */
  .pd-info-col { display: flex; flex-direction: column; gap: 16px; padding-top: 8px; }
  .pd-category {
    font-size: 11px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: #7A7872;
  }
  .pd-name {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 38px;
    font-weight: 300;
    line-height: 1.15;
  }
  .pd-price-row { display: flex; align-items: baseline; gap: 10px; }
  .pd-price { font-size: 24px; font-weight: 400; color: #C17B2E; }
  .pd-regular-price {
    font-size: 16px;
    color: #7A7872;
    text-decoration: line-through;
  }
  .pd-description {
    font-size: 14px;
    color: #5A5A56;
    line-height: 1.75;
  }
  .pd-divider { height: 1px; background: rgba(28,28,26,0.09); }
  .pd-stock { display: flex; align-items: center; gap: 8px; }
  .pd-stock-dot {
    width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
  }
  .pd-stock-dot.in  { background: #3B6D11; }
  .pd-stock-dot.out { background: #A32D2D; }
  .pd-stock-label { font-size: 13px; color: #7A7872; }

  /* Buttons */
  .pd-btn-primary {
    display: inline-block;
    background: #1C1C1A;
    color: #F7F5F0;
    border: none;
    border-radius: 8px;
    padding: 13px 28px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
    text-align: center;
  }
  .pd-btn-primary:hover { background: #C17B2E; }
  .pd-btn-primary:active { transform: scale(0.98); }

  .pd-btn-outline {
    display: block;
    background: transparent;
    color: #1C1C1A;
    border: 1px solid rgba(28,28,26,0.22);
    border-radius: 8px;
    padding: 12px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    letter-spacing: 0.03em;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    transition: all 0.15s;
  }
  .pd-btn-outline:hover {
    background: #F5E6CC;
    border-color: #C17B2E;
    color: #C17B2E;
  }

  /* Meta */
  .pd-meta { display: flex; flex-direction: column; gap: 6px; padding-top: 4px; }
  .pd-meta-row { display: flex; gap: 12px; font-size: 12px; }
  .pd-meta-key { color: #7A7872; min-width: 72px; letter-spacing: 0.03em; }
  .pd-meta-val { color: #1C1C1A; }

  /* Not found */
  .pd-not-found {
    max-width: 400px;
    margin: 80px auto;
    text-align: center;
    padding: 0 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .pd-not-found-icon { font-size: 48px; opacity: 0.35; }
  .pd-not-found h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 32px;
    font-weight: 300;
  }
  .pd-not-found p { font-size: 14px; color: #7A7872; margin-bottom: 8px; }
`;