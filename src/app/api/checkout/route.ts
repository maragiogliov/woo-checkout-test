// src/app/api/checkout/route.ts

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { cart } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: cart.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: {
          name: `Product ${item.id}`,
        },
        unit_amount: 1000, // €10 example (you should map real price)
      },
      quantity: item.quantity,
    })),
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cart",
  });

  return Response.json({ url: session.url });
}