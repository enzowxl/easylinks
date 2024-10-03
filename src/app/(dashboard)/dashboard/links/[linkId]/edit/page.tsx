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

const EditPage = () => {
  return <Base title="Edit"></Base>
}

export default EditPage
