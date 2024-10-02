import { LinkData } from './_components/link-data'
import { Prisma } from '@prisma/client'
import { getLink } from '@/utils/db'
import { Base } from '@/app/(dashboard)/_components/base/base'

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
    <Base title="Link">
      <LinkData link={link} />
    </Base>
  )
}

export default LinkPage
