'use server'

import { auth } from '@/auth'
import { notFound } from 'next/navigation'

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

export { isAuthenticated }
