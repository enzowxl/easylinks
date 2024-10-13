import { stripe } from '@/lib/stripe'
import { manageSubscription } from '@/utils/stripe'
import { NextRequest, NextResponse } from 'next/server'
import { Stripe } from 'stripe'

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get('stripe-signature') as string

    const event: Stripe.Event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    )

    const payment = event.data.object as Stripe.Subscription
    const checkoutSession = event.data.object as Stripe.Checkout.Session

    switch (event.type) {
      case 'customer.subscription.deleted':
        await manageSubscription({
          customerId: payment.customer.toString(),
          subscriptionId: payment.id,
          event: event.type,
        })

        break
      case 'customer.subscription.updated':
        await manageSubscription({
          customerId: payment.customer.toString(),
          subscriptionId: payment.id,
          event: event.type,
        })
        break
      case 'checkout.session.completed':
        await manageSubscription({
          customerId: checkoutSession.customer?.toString() as string,
          subscriptionId: checkoutSession.subscription?.toString() as string,
          event: event.type,
        })
        break

      default:
        break
    }
    return NextResponse.json({}, { status: 200 })
  } catch (err) {
    console.error(err)
    if (err instanceof Error) {
      return NextResponse.json(
        {
          error: err.message,
        },
        {
          status: 400,
        },
      )
    }
  }
}
