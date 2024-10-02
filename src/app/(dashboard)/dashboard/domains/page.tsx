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

  return (
    <Base title="Domains">
      <DomainList domains={domains} />
    </Base>
  )
}

export default DomainsPage
