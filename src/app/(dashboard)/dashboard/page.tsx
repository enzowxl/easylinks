import { Metadata } from 'next'
import { Base } from '../_components/base/base'
import { TitleNavType } from '../_components/nav/nav-auth'
import { getAllLinks, getMe } from '@/utils/db'
import { DashboardData } from './_components/dashboard-data'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Dashboard',
  }
}

const DashboardPage = async () => {
  const links = await getAllLinks()
  const user = await getMe()

  const title: TitleNavType[] = [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
  ]

  return (
    <Base title={title}>
      <DashboardData user={user} links={links} />
    </Base>
  )
}

export default DashboardPage
