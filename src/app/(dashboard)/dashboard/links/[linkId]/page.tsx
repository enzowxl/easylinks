import { LinkData } from './_components/link-data'
import { Prisma } from '@prisma/client'
import { getLink } from '@/utils/db'
import { Base } from '@/app/(dashboard)/_components/base/base'
import { TitleNavType } from '@/app/(dashboard)/_components/nav/nav-auth'
import { Metadata } from 'next'

export type LinkType = Prisma.LinkGetPayload<{
  include: {
    domain: true
    clicks: true
  }
}>

export async function generateMetadata({
  params: { linkId },
}: {
  params: { linkId: string }
}): Promise<Metadata> {
  const link = await getLink(linkId)

  return {
    title: link.title ? link.title : link.slug,
  }
}

const LinkPage = async ({
  params: { linkId },
}: {
  params: { linkId: string }
}) => {
  const link = await getLink(linkId)

  const title: TitleNavType[] = [
    {
      label: 'Links',
      href: '/dashboard/links',
    },
    {
      label: link.id,
      href: `/dashboard/links/${link.id}`,
      ellipsis: true,
    },
  ]

  return (
    <Base title={title}>
      <LinkData link={link} />
    </Base>
  )
}

export default LinkPage
