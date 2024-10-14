'use server'

import { prisma } from '@/lib/prisma'
import { encryptPassword, verifyPassword } from './password'
import { InvalidLoginError } from '@/auth'
import {
  createDomainSchema,
  createLinkSchema,
  editDomainSchema,
  redirectSchema,
  signUpSchema,
} from '@/lib/zod'
import {
  createDomainInVercel,
  deleteDomainInVercel,
  getAllDomainsInVercel,
} from './vercel'
import { ZodError } from 'zod'
import { revalidatePath } from 'next/cache'
import { notFound } from 'next/navigation'
import { Domain, Link, Prisma } from '@prisma/client'
import { getIp } from './network'
import { sendError } from './error'
import { isAuthenticated } from './verify'

type ResponseAction<T = undefined> = {
  error?: string
  response?: T
} | void

const authorizeUser = async (email: string, password: string) => {
  const findUserByEmail = await prisma.user.findUnique({
    where: { email },
  })

  if (!findUserByEmail)
    throw new InvalidLoginError('Email or password is incorrect.')

  const comparedPassword = await verifyPassword(
    password,
    findUserByEmail.password,
  )

  if (!comparedPassword)
    throw new InvalidLoginError('Email or password is incorrect.')

  return findUserByEmail
}

const authorizeRedirect = async (
  linkId: string,
  formData: FormData,
): Promise<ResponseAction> => {
  try {
    const { password } = await redirectSchema.parseAsync(formData)

    const findLinkById = await prisma.link.findUnique({
      where: { id: linkId },
      include: {
        util: true,
      },
    })

    if (!findLinkById) throw new Error('Link not found.')

    if (!findLinkById?.util?.password) throw new Error('Password not found.')

    const comparedPassword = await verifyPassword(
      password,
      findLinkById?.util?.password,
    )

    if (!comparedPassword) throw new Error('Password is incorrect.')
  } catch (err) {
    if (err instanceof ZodError) {
      return sendError(err.errors[0].message)
    }
    if (err instanceof Error) {
      return sendError(err.message)
    }
    return sendError('Bad request.')
  }
}

const registerUser = async (formData: FormData): Promise<ResponseAction> => {
  try {
    const { name, email, password } = await signUpSchema.parseAsync(formData)

    const findUserByEmail = await prisma.user.findUnique({
      where: { email },
    })

    if (findUserByEmail) throw new Error('User already exists.')

    const hashedPassword = await encryptPassword(password)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  } catch (err) {
    if (err instanceof ZodError) {
      return sendError(err.errors[0].message)
    }
    if (err instanceof Error) {
      return sendError(err.message)
    }
    return sendError('Bad request.')
  }
}

const createDomain = async (formData: FormData): Promise<ResponseAction> => {
  try {
    const { user } = await isAuthenticated()

    const { domainName } = await createDomainSchema.parseAsync(formData)

    const findDomainByDomainName = await prisma.domain.findUnique({
      where: { domainName },
    })

    if (findDomainByDomainName) throw new Error('Domain already exists.')

    await createDomainInVercel(domainName)

    await prisma.domain.create({
      data: {
        domainName,
        userId: user.sub,
      },
    })

    return revalidatePath('/dashboard/domains', 'page')
  } catch (err) {
    if (err instanceof ZodError) {
      return sendError(err.errors[0].message)
    }
    if (err instanceof Error) {
      return sendError(err.message)
    }
    return sendError('Bad request.')
  }
}

const createLink = async (formData: FormData): Promise<ResponseAction> => {
  try {
    const { user } = await isAuthenticated()

    const {
      destinationSlug,
      destinationUrl,
      destinationDescription,
      destinationTitle,
      metadataDescription,
      // metadataPhoto,
      metadataTitle,
      utilsPassword,
      domainName,
    } = await createLinkSchema.parseAsync(formData)

    let findLinkBySlug: Link | null

    const findDomainByDomainName = await prisma.domain.findUnique({
      where: { domainName, userId: user.id },
    })

    if (domainName && domainName !== process.env.NEXTAUTH_DOMAIN) {
      if (!findDomainByDomainName) throw new Error('Domain not found.')

      findLinkBySlug = await prisma.link.findFirst({
        where: {
          slug: destinationSlug,
          domainId: findDomainByDomainName.id,
        },
      })
    } else {
      findLinkBySlug = await prisma.link.findFirst({
        where: {
          slug: destinationSlug,
          domain: null,
        },
      })
    }

    if (findLinkBySlug) throw new Error('Slug already exists.')

    await prisma.link.create({
      data: {
        title: destinationTitle,
        description: destinationDescription,
        slug: destinationSlug,
        url: destinationUrl,
        ip: getIp(),
        metaData: {
          create: {
            title: metadataTitle,
            description: metadataDescription,
            photoId: undefined,
            photoUrl: undefined,
          },
        },
        util: {
          create: {
            password: utilsPassword
              ? await encryptPassword(utilsPassword)
              : undefined,
          },
        },
        domainId: findDomainByDomainName?.id,
        userId: user.sub,
      },
    })

    return revalidatePath('/dashboard/links', 'page')
  } catch (err) {
    if (err instanceof ZodError) {
      return sendError(err.errors[0].message)
    }
    if (err instanceof Error) {
      return sendError(err.message)
    }
    return sendError('Bad request.')
  }
}

const createClick = async (
  data: Prisma.ClickUncheckedCreateInput,
): Promise<ResponseAction> => {
  await prisma.click.create({
    data,
  })
}

const getMe = async () => {
  try {
    const { user } = await isAuthenticated({ isNotFound: true })

    const findUserById = await prisma.user.findUnique({
      where: { id: user.sub },
      include: {
        subscription: true,
      },
    })

    if (!findUserById) return notFound()

    return findUserById
  } catch (err) {
    return notFound()
  }
}

const getLink = async (linkId: string) => {
  try {
    const { user } = await isAuthenticated({ isNotFound: true })

    const findLinkById = await prisma.link.findUnique({
      where: { id: linkId, userId: user.id },
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
    const { user } = await isAuthenticated({ isNotFound: true })

    const findManyLinksByUserId = await prisma.link.findMany({
      where: { userId: user.sub },
      include: {
        domain: true,
        clicks: true,
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
    const { user } = await isAuthenticated({ isNotFound: true })

    const findManyDomainsByUserId = await prisma.domain.findMany({
      where: { userId: user.sub },
    })

    const domains: Domain[] = [...findManyDomainsByUserId]

    await getAllDomainsInVercel(findManyDomainsByUserId)

    return domains
  } catch (err) {
    return notFound()
  }
}

const deleteDomain = async (domainName: string): Promise<ResponseAction> => {
  try {
    await isAuthenticated()

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
      return sendError(err.errors[0].message)
    }
    if (err instanceof Error) {
      return sendError(err.message)
    }
    return sendError('Bad request.')
  }
}

const deleteLink = async (linkId: string): Promise<ResponseAction> => {
  try {
    await isAuthenticated()

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
      return sendError(err.errors[0].message)
    }
    if (err instanceof Error) {
      return sendError(err.message)
    }
    return sendError('Bad request.')
  }
}

const editDomain = async (
  formData: FormData,
  domainName: string,
): Promise<ResponseAction> => {
  try {
    await isAuthenticated()

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
      return sendError(err.errors[0].message)
    }
    if (err instanceof Error) {
      return sendError(err.message)
    }
    return sendError('Bad request.')
  }
}

export {
  authorizeUser,
  authorizeRedirect,
  registerUser,
  createDomain,
  createLink,
  createClick,
  getMe,
  getLink,
  getAllDomains,
  getAllLinks,
  deleteDomain,
  deleteLink,
  editDomain,
}
