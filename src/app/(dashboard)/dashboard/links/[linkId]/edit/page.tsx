import { Base } from '@/app/(dashboard)/_components/base/base'
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

  const title = [
    {
      label: `Links / ${link.id} / Edit`,
      href: '/dashboard',
    },
  ]

  return <Base title={title}>opa</Base>
}

export default EditPage
