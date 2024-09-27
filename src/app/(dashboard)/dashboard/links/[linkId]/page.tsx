import { NavAuth } from '@/app/(dashboard)/_components/nav-auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { LinkData } from './_components/link-data'
import { Prisma } from '@prisma/client'

export type LinkType = Prisma.LinkGetPayload<{
  include: {
    domain: true
    clicks: true
  }
}>

const getLink = async (linkId: string) => {
  try {
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

export async function generateMetadata({
  params: { linkId },
}: {
  params: { linkId: string }
}) {
  const link = await getLink(linkId)

  return {
    title: link.title,
  }
}

const LinkPage = async ({
  params: { linkId },
}: {
  params: { linkId: string }
}) => {
  const link = await getLink(linkId)

  return (
    <div className="flex flex-col">
      <NavAuth title="Link" />

      <LinkData link={link} />
    </div>
  )
}

export default LinkPage
