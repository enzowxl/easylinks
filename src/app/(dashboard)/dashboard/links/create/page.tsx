import { Base } from '@/app/(dashboard)/_components/base/base'
import { CreateLinkList } from './_components/create-link-list'

export async function generateMetadata() {
  return {
    title: 'Create Link',
  }
}

const CreatePage = () => {
  const title = [
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
      <CreateLinkList />
    </Base>
  )
}

export default CreatePage
