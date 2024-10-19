import NextAuth, { CredentialsSignin, DefaultSession } from 'next-auth'
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import { prisma } from './lib/prisma'
import Credentials from 'next-auth/providers/credentials'
import { signInSchema } from './lib/zod'
import { authorizeUser } from './utils/db'
import { ZodError } from 'zod'

export class InvalidLoginError extends CredentialsSignin {
  constructor(message: string) {
    super(message)
    this.code = message
  }
}

export class UnverifiedEmailError extends CredentialsSignin {
  constructor(message: string) {
    super(message)
    this.type = 'Verification'
    this.code = message
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      sub: string
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials)

          const user = await authorizeUser(email, password)

          return user
        } catch (err) {
          if (err instanceof ZodError) {
            throw new InvalidLoginError(err.errors[0].message)
          }
          if (err instanceof InvalidLoginError) {
            throw new InvalidLoginError(err.code)
          }
          if (err instanceof UnverifiedEmailError) {
            throw new UnverifiedEmailError(err.code)
          }
          throw new InvalidLoginError('Bad request.')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token }) {
      return {
        ...token,
      }
    },
    async session({ session, token }) {
      session.user.sub = token.sub as string
      return {
        ...session,
      }
    },
  },
})
