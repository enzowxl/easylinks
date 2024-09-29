'use server'

import { prisma } from '@/lib/prisma'
import { encryptPassword, verifyPassword } from './password'
import { auth, InvalidLoginError } from '@/auth'
import { createDomainSchema, signUpSchema } from '@/lib/zod'
import { ZodError } from 'zod'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'
import { DomainsType } from '@/app/(dashboard)/dashboard/domains/_components/domain-list'
import { Domain } from '@prisma/client'

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

    const { domain } = await createDomainSchema.parseAsync(formData)

    const findDomainByDomainName = await prisma.domain.findUnique({
      where: { domainName: domain },
    })

    if (findDomainByDomainName) throw new Error('Domain already exists.')

    const response = await fetch(
      `https://api.vercel.com/v10/projects/${process.env.VERCEL_PROJECT_ID}/domains`,
      {
        body: JSON.stringify({
          name: domain,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        },
        method: 'POST',
      },
    )

    const json = await response.json()

    switch (json?.error?.code) {
      case 'duplicate-team-registration':
        throw new Error('Domain already exists.')

      case 'owned-on-other-team':
        throw new Error('Domain already exists.')

      case 'invalid_domain':
        throw new Error('Invalid domain.')
    }

    await prisma.domain.create({
      data: {
        domainName: domain,
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
      where: { id: linkId },
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

    const response = await fetch(
      `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains`,
      {
        headers: {
          Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
        },
        method: 'GET',
      },
    )

    const json = (await response.json()) as {
      domains: { name: string }[]
      error: unknown
    }

    for (const domain of json.domains) {
      for (const userDomain of findManyDomainsByUserId as DomainsType[]) {
        userDomain.misconfigured = true
        if (domain.name === userDomain.domainName) {
          const configResponse = await fetch(
            `https://api.vercel.com/v6/domains/${domain.name}/config`,
            {
              headers: {
                Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
              },
              method: 'GET',
            },
          )

          const json = await configResponse.json()

          userDomain.misconfigured = json.misconfigured
        }
      }
    }

    return domains
  } catch (err) {
    return notFound()
  }
}

export {
  authorizeUser,
  registerUser,
  createDomain,
  getLink,
  getAllDomains,
  getAllLinks,
}
