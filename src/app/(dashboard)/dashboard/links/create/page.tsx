import { Base } from '@/app/(dashboard)/_components/base/base'
import { CreateLinkList } from './_components/create-link-list'
import { getAllDomains } from '@/utils/db'
import { TitleNavType } from '@/app/(dashboard)/_components/nav/nav-auth'

export async function generateMetadata() {
  return {
    title: 'Create Link',
  }
}

const CreatePage = async () => {
  const domains = await getAllDomains()

  const title: TitleNavType[] = [
    {
      label: 'Links',
      href: '/dashboard/links',
    },
    {
      label: 'Create',
      href: '/dashboard/links/create',
    },
  ]

  return (
    <Base title={title}>
      <CreateLinkList domains={domains} />
    </Base>
  )
}

export default CreatePage
