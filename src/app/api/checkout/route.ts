import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import artworkData from "@/data/artwork.json";
import type { Artwork } from "@/lib/types";

const artworks = artworkData as Artwork[];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const slug = formData.get("slug") as string;

    const artwork = artworks.find((a) => a.slug === slug);

    if (!artwork || artwork.sold) {
      return NextResponse.redirect(new URL("/shop", req.url));
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: artwork.currency.toLowerCase(),
            product_data: {
              name: artwork.title,
              description: `${artwork.medium} — ${artwork.dimensions}`,
            },
            unit_amount: artwork.price * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.nextUrl.origin}/shop?success=true`,
      cancel_url: `${req.nextUrl.origin}/shop/${artwork.slug}`,
    });

    return NextResponse.redirect(session.url!, 303);
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
