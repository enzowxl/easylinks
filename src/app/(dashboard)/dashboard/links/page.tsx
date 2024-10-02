import { LinkList } from './_components/link-list'
import { getAllLinks } from '@/utils/db'
import { Base } from '../../_components/base/base'

export async function generateMetadata() {
  return {
    title: 'Links',
  }
}

const LinksPage = async () => {
  const links = await getAllLinks()

  return (
    <Base title="Links">
      <LinkList links={links} />
    </Base>
  )
}

export default LinksPage
