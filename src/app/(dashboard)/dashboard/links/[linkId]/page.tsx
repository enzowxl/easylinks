import { NavAuth } from '@/app/(dashboard)/_components/nav/nav-auth'
import { LinkData } from './_components/link-data'
import { Prisma } from '@prisma/client'
import { getLink } from '@/utils/db'

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
