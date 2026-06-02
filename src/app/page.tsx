import api from "./lib/woocommerce";

export default async function Home() {
  const response = await api.get("products");
  const products = response.data;

  return (
    <>
      <style>{styles}</style>
      <div className="home-root">

   

        <header className="home-hero">
          <p className="home-hero-eyebrow">New collection</p>
          <h1 className="home-hero-heading">
            Thoughtful objects<br />
            <em>for everyday living.</em>
          </h1>
          <p className="home-hero-sub">Curated homewares, simply made.</p>
        </header>

        <main className="home-main">
          {products.length === 0 ? (
            <div className="home-empty">
              <div className="home-empty-icon">📦</div>
              <p>No products found.</p>
            </div>
          ) : (
            <div className="home-grid">
              {products.map((product: any) => {
                const image = product.images?.[0]?.src ?? null;
                const price = parseFloat(product.price);
                const regularPrice = parseFloat(product.regular_price);
                const isOnSale = product.on_sale && regularPrice > price;
                const category = product.categories?.[0]?.name ?? null;
                const inStock = product.stock_status !== "outofstock";

                return (
                  <a
                    key={product.id}
                    href={`/product/${product.slug}`}
                    className="home-card"
                  >
                    <div className="home-card-img">
                      {image ? (
                        <img src={image} alt={product.name} />
                      ) : (
                        <div className="home-card-placeholder">📦</div>
                      )}
                      {isOnSale && <span className="home-card-badge">Sale</span>}
                      {!inStock && <span className="home-card-badge out">Sold out</span>}
                    </div>
                    <div className="home-card-info">
                      {category && <p className="home-card-cat">{category}</p>}
                      <h2 className="home-card-name">{product.name}</h2>
                      <div className="home-card-price-row">
                        <span className="home-card-price">
                          €{isNaN(price) ? "—" : price.toFixed(2)}
                        </span>
                        {isOnSale && (
                          <span className="home-card-regular">
                            €{regularPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </main>

      </div>
    </>
  );
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .home-root {
    min-height: 100vh;
    background: #F7F5F0;
    font-family: 'DM Sans', sans-serif;
    color: #1C1C1A;
  }

  /* Nav */
  .home-nav {
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
  .home-nav-brand {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 22px;
    font-weight: 300;
    letter-spacing: 0.02em;
  }
  .home-nav-right { display: flex; align-items: center; gap: 16px; }
  .home-nav-cart {
    font-size: 18px;
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.15s;
  }
  .home-nav-cart:hover { opacity: 1; }

  /* Hero */
  .home-hero {
    max-width: 1100px;
    margin: 0 auto;
    padding: 56px 28px 36px;
  }
  .home-hero-eyebrow {
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #C17B2E;
    margin-bottom: 12px;
  }
  .home-hero-heading {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(36px, 5vw, 52px);
    font-weight: 300;
    line-height: 1.12;
    margin-bottom: 12px;
  }
  .home-hero-heading em {
    font-style: italic;
    color: #7A7872;
  }
  .home-hero-sub {
    font-size: 14px;
    color: #7A7872;
  }

  /* Grid */
  .home-main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 28px 80px;
  }
  .home-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 24px;
  }

  /* Card */
  .home-card {
    background: #FDFCF9;
    border: 1px solid rgba(28,28,26,0.10);
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .home-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 28px rgba(28,28,26,0.08);
  }
  .home-card-img {
    aspect-ratio: 1;
    background: #F5E6CC;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .home-card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  .home-card:hover .home-card-img img {
    transform: scale(1.04);
  }
  .home-card-placeholder { font-size: 64px; opacity: 0.4; }
  .home-card-badge {
    position: absolute;
    top: 12px;
    left: 12px;
    background: #1C1C1A;
    color: #F7F5F0;
    font-size: 10px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    padding: 3px 10px;
    border-radius: 20px;
  }
  .home-card-badge.out {
    background: #7A7872;
  }
  .home-card-info {
    padding: 14px 16px 18px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
  }
  .home-card-cat {
    font-size: 10px;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: #7A7872;
  }
  .home-card-name {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.35;
    margin-top: 2px;
  }
  .home-card-price-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-top: 6px;
  }
  .home-card-price {
    font-size: 14px;
    font-weight: 500;
    color: #C17B2E;
  }
  .home-card-regular {
    font-size: 12px;
    color: #7A7872;
    text-decoration: line-through;
  }

  /* Empty */
  .home-empty {
    padding: 80px 0;
    text-align: center;
    color: #7A7872;
  }
  .home-empty-icon { font-size: 48px; opacity: 0.3; margin-bottom: 12px; }
  .home-empty p { font-size: 14px; }
`;