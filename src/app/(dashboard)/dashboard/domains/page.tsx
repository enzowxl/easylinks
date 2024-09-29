import { NavAuth } from '@/app/(dashboard)/_components/nav-auth'
import { DomainList } from './_components/domain-list'
import { getAllDomains } from '@/utils/db'

export async function generateMetadata() {
  return {
    title: 'Domains',
  }
}

const DomainsPage = async () => {
  const domains = await getAllDomains()

  return (
    <div className="flex flex-col">
      <NavAuth title="Domains" />

      <DomainList domains={domains} />
    </div>
  )
}

export default DomainsPage
