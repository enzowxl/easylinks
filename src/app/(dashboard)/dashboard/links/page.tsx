import { NavAuth } from '@/app/(dashboard)/_components/nav-auth'
import { LinkList } from './_components/link-list'
import { getAllLinks } from '@/utils/db'

export async function generateMetadata() {
  return {
    title: 'Links',
  }
}

const LinksPage = async () => {
  const links = await getAllLinks()

  return (
    <div className="flex flex-col">
      <NavAuth title="Links" />

      <LinkList links={links} />
    </div>
  )
}

export default LinksPage
