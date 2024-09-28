'use server'

import { prisma } from '@/lib/prisma'
import { encryptPassword, verifyPassword } from './password'
import { auth, InvalidLoginError } from '@/auth'
import { createDomainSchema, signUpSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { revalidatePath } from 'next/cache'

const authorizeUser = async (email: string, password: string) => {
  const findUserByEmail = await prisma.user.findUnique({
    where: { email },
  })

  if (!findUserByEmail) {
    throw new InvalidLoginError('Email or password is incorrect.')
  }

  const comparedPassword = await verifyPassword(
    password,
    findUserByEmail.password,
  )

  if (!comparedPassword) {
    throw new InvalidLoginError('Email or password is incorrect.')
  }

  return findUserByEmail
}

const registerUser = async (formData: FormData) => {
  try {
    const { name, email, password } = await signUpSchema.parseAsync(formData)

    const findUserByEmail = await prisma.user.findUnique({
      where: { email },
    })

    if (findUserByEmail) throw new Error('User already exists.')

    return await prisma.user.create({
      data: {
        name,
        email,
        password: await encryptPassword(password),
      },
    })
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(err.errors[0].message)
    }
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}

const createDomain = async (formData: FormData) => {
  try {
    const session = await auth()

    const { domain } = await createDomainSchema.parseAsync(formData)

    const findDomainByDomainName = await prisma.domain.findUnique({
      where: { domainName: domain },
    })

    if (findDomainByDomainName) throw new Error('Domain already exists.')

    await prisma.domain.create({
      data: { domainName: domain, userId: session?.user.sub as string },
    })

    revalidatePath('/dashboard/domains', 'page')
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(err.errors[0].message)
    }
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}

export { authorizeUser, registerUser, createDomain }
