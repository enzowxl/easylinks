import { DomainList } from './_components/domain-list'
import { getAllDomains } from '@/utils/db'
import { Base } from '../../_components/base/base'

export async function generateMetadata() {
  return {
    title: 'Domains',
  }
}

const DomainsPage = async () => {
  const domains = await getAllDomains()

  const title = [
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
