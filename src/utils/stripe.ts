'use server'

import { prisma } from '@/lib/prisma'
import { sendError } from './error'
import { isAuthenticated } from './verify'
import { stripe } from '@/lib/stripe'
import { Stripe } from 'stripe'
import { headers } from 'next/headers'
import { Prisma } from '@prisma/client'

type ResponseAction<T = undefined> = {
  error?: string
  response?: T
}

const manageSubscription = async ({
  customerId,
  subscriptionId,
  event,
}: {
  customerId: string
  subscriptionId: string
  event: Stripe.Event.Type
}) => {
  try {
    const findUserByCustomerId = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId,
      },
      include: {
        subscription: true,
      },
    })

    if (!findUserByCustomerId) throw new Error('User not found.')

    const subscriptionRetrieve =
      await stripe.subscriptions.retrieve(subscriptionId)

    const subscriptionData: Prisma.SubscriptionUncheckedCreateInput = {
      subscriptionId: subscriptionRetrieve.id,
      userId: findUserByCustomerId.id,
      status: subscriptionRetrieve.status,
      priceId: subscriptionRetrieve.items.data[0].price.id,
    }

    switch (event) {
      case 'customer.subscription.deleted':
        await prisma.subscription.delete({
          where: {
            subscriptionId,
          },
        })
        break
      case 'customer.subscription.updated':
        await prisma.subscription.update({
          where: {
            subscriptionId,
          },
          data: {
            status: subscriptionRetrieve.status,
            priceId: subscriptionRetrieve.items.data[0].price.id,
          },
        })
        break
      case 'checkout.session.completed':
        await prisma.subscription.create({
          data: subscriptionData,
        })
        break
    }
  } catch (err) {
    console.error(err)
  }
}

const subscribeUser = async (): Promise<ResponseAction<string>> => {
  const protocol = headers().get('x-forwarded-proto') as string
  try {
    const { user } = await isAuthenticated()

    const findUserById = await prisma.user.findUnique({
      where: { id: user.sub },
    })

    let customerId = findUserById?.stripeCustomerId

    if (!customerId) {
      const createStripeCustomer = await stripe.customers.create({
        email: findUserById?.email,
      })

      await prisma.user.update({
        where: { id: user.sub },
        data: { stripeCustomerId: createStripeCustomer.id },
      })

      customerId = createStripeCustomer.id
    }

    const baseUrl = protocol + '://' + process.env.NEXTAUTH_DOMAIN

    const createStripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      // billing_address_collection: 'required',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: baseUrl + process.env.STRIPE_SUCCESS_URL,
      cancel_url: baseUrl + process.env.STRIPE_SUCCESS_URL,
    })

    return { response: createStripeCheckoutSession.url as string }
  } catch (err) {
    if (err instanceof Error) {
      return sendError(err.message)
    }
    return sendError('Bad request.')
  }
}

export { manageSubscription, subscribeUser }
