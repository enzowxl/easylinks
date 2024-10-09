import { Base } from '@/app/(dashboard)/_components/base/base'
import { TitleNavType } from '@/app/(dashboard)/_components/nav/nav-auth'
import { getLink } from '@/utils/db'

export async function generateMetadata({
  params: { linkId },
}: {
  params: { linkId: string }
}) {
  const link = await getLink(linkId)

  return {
    title: `Edit ${link.title}`,
  }
}

const EditPage = async ({
  params: { linkId },
}: {
  params: { linkId: string }
}) => {
  const link = await getLink(linkId)

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

  return <Base title={title}>opa</Base>
}

export default EditPage
