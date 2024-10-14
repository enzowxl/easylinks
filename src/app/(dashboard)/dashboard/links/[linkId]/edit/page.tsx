import { Base } from '@/app/(dashboard)/_components/base/base'
import { TitleNavType } from '@/app/(dashboard)/_components/nav/nav-auth'
import { getAllDomains, getLink } from '@/utils/db'
import { Metadata } from 'next'
import { EditLinkList } from './_components/edit-link-list'

export async function generateMetadata({
  params: { linkId },
}: {
  params: { linkId: string }
}): Promise<Metadata> {
  const link = await getLink(linkId)

  return {
    title: `Edit ${link.title ? link.title : link.slug}`,
  }
}

const EditPage = async ({
  params: { linkId },
}: {
  params: { linkId: string }
}) => {
  const link = await getLink(linkId)
  const domains = await getAllDomains()

  const title: TitleNavType[] = [
    {
      label: `Links`,
      href: '/dashboard/links',
    },
    {
      label: `${link.id}`,
      href: `/dashboard/links/${link.id}`,
      ellipsis: true,
    },
    {
      label: `Edit`,
      href: `/dashboard/links/${link.id}/edit`,
    },
  ]

  return (
    <Base title={title}>
      <EditLinkList link={link} domains={domains} />
    </Base>
  )
}

export default EditPage
