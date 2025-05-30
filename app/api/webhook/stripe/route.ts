import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      // Payment is successful and the subscription is created
      // You should provision the subscription
      console.log("Checkout session completed:", session);
      
      // Here we would update the user's subscription status in DynamoDB
      if (session.customer && session.subscription) {
        // Update user subscription in DynamoDB
        console.log(`Subscription created: ${session.subscription} for customer ${session.customer}`);
      }
      break;
    case "invoice.payment_succeeded":
      // Continue the subscription
      console.log("Invoice payment succeeded:", session);
      break;
    case "invoice.payment_failed":
      // The payment failed or the customer does not have a valid payment method
      // The subscription becomes past_due. Notify the customer and send them to the
      // customer portal to update their payment information
      console.log("Invoice payment failed:", session);
      break;
    case "customer.subscription.deleted":
      // The customer canceled their subscription
      console.log("Subscription canceled:", session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}