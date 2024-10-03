import { Base } from '@/app/(dashboard)/_components/base/base'

export async function generateMetadata() {
  return {
    title: 'Create Link',
  }
}

const CreatePage = () => {
  return <Base title="Create link"></Base>
}

export default CreatePage
