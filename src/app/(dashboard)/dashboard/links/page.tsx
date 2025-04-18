import { LinkList } from './_components/link-list'
import { getAllLinks } from '@/utils/db'
import { Base } from '../../_components/base/base'
import { TitleNavType } from '../../_components/nav/nav-auth'
import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Links',
  }
}

const LinksPage = async () => {
  const links = await getAllLinks()

  const title: TitleNavType[] = [
    {
      label: 'Links',
      href: '/dashboard/links',
    },
  ]

  return (
    <Base title={title}>
      <LinkList links={links} />
    </Base>
  )
}

export default LinksPage
