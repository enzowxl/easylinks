import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-09-30.acacia',
  appInfo: {
    name: 'easylinks',
    version: '1',
  },
})

export { stripe }
