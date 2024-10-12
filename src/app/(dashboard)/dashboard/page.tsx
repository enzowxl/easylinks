import { Metadata } from 'next'
import { Base } from '../_components/base/base'
import { TitleNavType } from '../_components/nav/nav-auth'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Dashboard',
  }
}

const DashboardPage = () => {
  const title: TitleNavType[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
  ]

  return <Base title={title}>opa</Base>
}

export default DashboardPage
