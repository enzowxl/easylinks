import { Sheet } from '@/components/sheet'
import { SideBarPages } from '../sidebar/sidebar-pages'
import { SideBarPlan } from '../sidebar/sidebar-plan'
import { SideBarUserMenu } from '../sidebar/sidebar-user-menu'
import { UserSideBarType } from '../sidebar/sidebar'

interface NavSheetMenuType {
  user: UserSideBarType
}

const NavSheetMenu = ({ user }: NavSheetMenuType) => {
  return (
    <Sheet>
      <div className="flex flex-col gap-20 justify-between h-full">
        <div className="flex flex-col items-center gap-20 w-full">
          <div />
          <div className="w-full flex flex-col gap-5">
            <SideBarPages />
          </div>
        </div>

        <SideBarPlan />

        <SideBarUserMenu user={user} />
      </div>
    </Sheet>
  )
}

export { NavSheetMenu }
