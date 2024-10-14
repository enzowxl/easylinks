'use server'

import { auth } from '@/auth'
import { notFound } from 'next/navigation'
import { getMe } from './db'

interface isAuthenticatedType {
  isNotFound?: boolean
}

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

const isPremium = async () => {
  const user = await getMe()

  if (user.subscription?.status !== 'active') return false

  return { subscription: user.subscription }
}

export { isAuthenticated, isPremium }
