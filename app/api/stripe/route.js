import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/db";
import { absUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import { authOptions } from "@/lib/auth";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userSubscription = await prisma.userSubscription.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        custome: userSubscription.stripeCustomerId,
        return_url: absUrl("/account"),
      });

      return NextResponse.json({ url: stripeSession.url });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: absUrl("/account"),
      cancel_url: absUrl("/account"),
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: session.user.email,
      metadata: {
        userId: session.user.id,
      },
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Pro",
              description: "Pro Subscription",
            },
            unit_amount: 1000,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
    });

    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.log("STRIPE ERROR: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
