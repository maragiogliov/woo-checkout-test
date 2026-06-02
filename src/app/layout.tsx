import CartBadge from "./components/CartBadge";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <nav style={{ padding: 20 }}>
          <CartBadge />
        </nav>

        {children}
      </body>
    </html>
  );
}