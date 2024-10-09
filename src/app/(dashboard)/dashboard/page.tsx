import { Base } from '../_components/base/base'
import { TitleNavType } from '../_components/nav/nav-auth'

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
