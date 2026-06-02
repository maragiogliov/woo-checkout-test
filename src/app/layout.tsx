import CartBadge from "./components/CartBadge";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <style>{globalStyles}</style>

        <nav className="layout-nav">
          <a href="/" className="layout-brand">Maison</a>
          <div className="layout-nav-right">
            <a href="/" className="layout-nav-link">Shop</a>
            <CartBadge />
          </div>
        </nav>

        {children}

        <footer className="layout-footer">
          <div className="layout-footer-inner">
            <span className="layout-footer-brand">Maison</span>
            <span className="layout-footer-copy">© {new Date().getFullYear()} · All rights reserved</span>
          </div>
        </footer>

      </body>
    </html>
  );
}

const globalStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { -webkit-font-smoothing: antialiased; }

  body {
    background: #F7F5F0;
    color: #1C1C1A;
    font-family: 'DM Sans', sans-serif;
    font-size: 15px;
    line-height: 1.6;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  body > *:not(nav):not(footer) {
    flex: 1;
  }

  a { color: inherit; }

  img { max-width: 100%; display: block; }

  /* Nav — pages that define their own nav should set display:none on .layout-nav */
  .layout-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: #F7F5F0;
    border-bottom: 1px solid rgba(28,28,26,0.12);
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
  }

  .layout-brand {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 22px;
    font-weight: 300;
    letter-spacing: 0.02em;
    text-decoration: none;
    color: #1C1C1A;
  }

  .layout-nav-right {
    display: flex;
    align-items: center;
    gap: 24px;
  }

  .layout-nav-link {
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #7A7872;
    text-decoration: none;
    transition: color 0.15s;
  }
  .layout-nav-link:hover { color: #1C1C1A; }

  /* Footer */
  .layout-footer {
    border-top: 1px solid rgba(28,28,26,0.10);
    padding: 24px 28px;
    margin-top: auto;
  }
  .layout-footer-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-wrap: wrap;
  }
  .layout-footer-brand {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 18px;
    font-weight: 300;
    letter-spacing: 0.02em;
    color: #1C1C1A;
  }
  .layout-footer-copy {
    font-size: 12px;
    color: #7A7872;
    letter-spacing: 0.02em;
  }
`;