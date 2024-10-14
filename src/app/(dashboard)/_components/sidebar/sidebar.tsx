import { Logo } from '@/components/logo'
import { SideBarUserMenu } from './sidebar-user-menu'
import { SideBarPlan } from './sidebar-plan'
import { SideBarPages } from './sidebar-pages'
import { getMe } from '@/utils/db'
import { Prisma } from '@prisma/client'
import { isPremium } from '@/utils/verify'

export type UserSideBarType = Prisma.UserGetPayload<{
  include: {
    subscription: true
  }
}>

const SideBar = async () => {
  const user = await getMe()
  const premium = await isPremium()

  return (
    <aside className="max-lg:hidden flex h-screen p-5 bg-neutrals-12 overflow-y-auto">
      <div className="flex flex-col gap-20 justify-between h-full w-[220px]">
        <div className="flex flex-col items-center gap-20 w-full">
          <Logo />

          <div className="w-full flex flex-col gap-5">
            <SideBarPages />
          </div>
        </div>

        {!premium && <SideBarPlan />}

        <SideBarUserMenu user={user} />
      </div>
    </aside>
  )
}

export { SideBar }
