'use server'

import { prisma } from '@/lib/prisma'
import { encryptPassword, verifyPassword } from './password'
import { auth, InvalidLoginError } from '@/auth'
import { createDomainSchema, editDomainSchema, signUpSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'
import { Domain } from '@prisma/client'
import {
  createDomainInVercel,
  deleteDomainInVercel,
  getAllDomainsInVercel,
} from './vercel'

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

    if (!session?.user) throw new Error('Unauthorized.')

    const { domainName } = await createDomainSchema.parseAsync(formData)

    const findDomainByDomainName = await prisma.domain.findUnique({
      where: { domainName },
    })

    if (findDomainByDomainName) throw new Error('Domain already exists.')

    await createDomainInVercel(domainName)

    await prisma.domain.create({
      data: {
        domainName,
        userId: session?.user.sub,
      },
    })

    return revalidatePath('/dashboard/domains', 'page')
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(err.errors[0].message)
    }
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}

const getLink = async (linkId: string) => {
  try {
    const session = await auth()

    if (!session?.user) return notFound()

    const findLinkById = await prisma.link.findUnique({
      where: { id: linkId, userId: session.user.id },
      include: { domain: true, clicks: true },
    })

    if (!findLinkById) return notFound()

    return findLinkById
  } catch (err) {
    return notFound()
  }
}

const getAllLinks = async () => {
  try {
    const session = await auth()

    if (!session?.user) return notFound()

    const findManyLinksByUserId = await prisma.link.findMany({
      where: { userId: session?.user.sub },
      include: {
        domain: true,
      },
    })

    if (!findManyLinksByUserId) return notFound()

    return findManyLinksByUserId
  } catch (err) {
    return notFound()
  }
}

const getAllDomains = async () => {
  try {
    const session = await auth()

    if (!session?.user) return notFound()

    const findManyDomainsByUserId = await prisma.domain.findMany({
      where: { userId: session?.user.sub },
    })

    const domains: Domain[] = [...findManyDomainsByUserId]

    await getAllDomainsInVercel(findManyDomainsByUserId)

    return domains
  } catch (err) {
    return notFound()
  }
}

const deleteDomain = async (domainName: string) => {
  try {
    const session = await auth()

    if (!session?.user) throw new Error('Unauthorized.')

    const findDomainByDomainName = await prisma.domain.findUnique({
      where: {
        domainName,
      },
    })

    if (!findDomainByDomainName) throw new Error('Domain not found.')

    await deleteDomainInVercel(domainName)

    await prisma.domain.delete({
      where: { domainName },
    })

    return revalidatePath('/dashboard/domains', 'page')
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(err.errors[0].message)
    }
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}

const deleteLink = async (linkId: string) => {
  try {
    const session = await auth()

    if (!session?.user) throw new Error('Unauthorized.')

    const findLinkById = await prisma.link.findUnique({
      where: {
        id: linkId,
      },
    })

    if (!findLinkById) throw new Error('Link not found.')

    await prisma.link.delete({
      where: { id: linkId },
    })

    return revalidatePath('/dashboard/links', 'page')
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(err.errors[0].message)
    }
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}

const editDomain = async (formData: FormData, domainName: string) => {
  try {
    const session = await auth()

    if (!session?.user) throw new Error('Unauthorized.')

    const { newDomainName } = await editDomainSchema.parseAsync(formData)

    const findDomainByNewDomainName = await prisma.domain.findUnique({
      where: {
        domainName: newDomainName,
      },
    })

    if (findDomainByNewDomainName) throw new Error('Domain already exists.')

    await deleteDomainInVercel(domainName)

    await createDomainInVercel(newDomainName)

    await prisma.domain.update({
      where: { domainName },
      data: {
        domainName: newDomainName,
      },
    })

    return revalidatePath('/dashboard/domains', 'page')
  } catch (err) {
    if (err instanceof ZodError) {
      throw new Error(err.errors[0].message)
    }
    if (err instanceof Error) {
      throw new Error(err.message)
    }
  }
}

export {
  authorizeUser,
  registerUser,
  createDomain,
  getLink,
  getAllDomains,
  getAllLinks,
  deleteDomain,
  deleteLink,
  editDomain,
}
