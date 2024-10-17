'use server'

import { auth } from '@/auth'
import { notFound } from 'next/navigation'
import { getMe } from './db'
import { Subscription } from '@prisma/client'

interface isAuthenticatedType {
  isNotFound?: boolean
}

export type isPremiumType =
  | {
      subscription: Subscription
    }
  | false

const isAuthenticated = async ({
  isNotFound = false,
}: isAuthenticatedType = {}) => {
  const session = await auth()

  if (!session?.user) {
    if (isNotFound) {
      return notFound()
    }
    throw new Error('Unauthorized.')
  }

  return { user: session.user }
}

const isPremium = async (): Promise<isPremiumType> => {
  const user = await getMe()

  if (user.subscription?.status !== 'active') return false

  return { subscription: user.subscription }
}

export { isAuthenticated, isPremium }
