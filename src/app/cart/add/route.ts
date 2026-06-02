export async function POST(req: Request) {
  const body = await req.json();

  const response = await fetch(
    `${process.env.WORDPRESS_URL}/wp-json/wc/store/v1/cart/add-item`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: body.productId,
        quantity: 1,
      }),
    }
  );

  return Response.json(await response.json());
}