'use server'

import { auth } from '@/auth'
import { notFound } from 'next/navigation'
import { getMe, getUser } from './db'
import { User } from '@prisma/client'

interface isAuthenticatedType {
  isNotFound?: boolean
}

export type isPremiumType = { user: User } | false

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

const isAdmin = async (userId?: string) => {
  let user: User

  if (userId) {
    user = await getUser(userId)
  } else {
    user = await getMe()
  }

  if (user.role !== 'ADMIN') return false

  return { user }
}

const isPremium = async (userId?: string): Promise<isPremiumType> => {
  const admin = await isAdmin(userId)

  if (!admin) {
    const user = await getMe()

    if (user.subscription?.status !== 'active') return false

    return { user }
  }

  return { user: admin.user }
}

export { isAuthenticated, isAdmin, isPremium }
