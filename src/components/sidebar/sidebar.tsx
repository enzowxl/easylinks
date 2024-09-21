import { Link } from 'lucide-react'
import { Logo } from '../logo'
import { SideBarButton } from './sidebar-button'
import { UserMenu } from './user-menu'
import { Plan } from './plan'

const SideBar = () => {
  return (
    <aside className="max-lg:hidden flex h-screen p-5 bg-neutrals-12 overflow-y-auto">
      <div className="flex flex-col gap-20 justify-between h-full w-[220px]">
        <div className="flex flex-col items-center gap-20 w-full">
          <Logo />
          <div className="w-full flex flex-col gap-5">
            <SideBarButton title="Links" icon={Link} />
            <SideBarButton title="Links" icon={Link} status="active" />
          </div>
        </div>
        <Plan />
        <UserMenu />
      </div>
    </aside>
  )
}

export { SideBar }
