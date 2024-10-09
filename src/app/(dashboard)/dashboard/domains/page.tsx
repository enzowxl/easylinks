import { DomainList } from './_components/domain-list'
import { getAllDomains } from '@/utils/db'
import { Base } from '../../_components/base/base'
import { TitleNavType } from '../../_components/nav/nav-auth'

export async function generateMetadata() {
  return {
    title: 'Domains',
  }
}

const DomainsPage = async () => {
  const domains = await getAllDomains()

  const title: TitleNavType[] = [
    {
      label: 'Domains',
      href: '/dashboard/domains',
    },
  ]

  return (
    <Base title={title}>
      <DomainList domains={domains} />
    </Base>
  )
}

export default DomainsPage
