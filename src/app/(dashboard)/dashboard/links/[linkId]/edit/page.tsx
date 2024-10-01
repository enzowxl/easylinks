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
  return <></>
}

export default EditPage
