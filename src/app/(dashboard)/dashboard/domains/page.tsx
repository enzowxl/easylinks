import { DomainList } from './_components/domain-list'
import { getAllDomains } from '@/utils/db'
import { Base } from '../../_components/base/base'
import { TitleNavType } from '../../_components/nav/nav-auth'
import { Metadata } from 'next'
import { isPremium } from '@/utils/verify'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Domains',
  }
}

const DomainsPage = async () => {
  const domains = await getAllDomains()
  const premium = await isPremium()

  const title: TitleNavType[] = [
    {
      label: 'Domains',
      href: '/dashboard/domains',
    },
  ]

  return (
    <Base title={title}>
      <DomainList premium={premium} domains={domains} />
    </Base>
  )
}

export default DomainsPage
