import { Logo } from '@/components/logo'
import { SideBarUserMenu } from './sidebar-user-menu'
import { SideBarPlan } from './sidebar-plan'
import { SideBarPages } from './sidebar-pages'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

const SideBar = async () => {
  const session = await auth()

  const user = await prisma.user.findUnique({
    where: { id: session?.user.sub },
  })

  console.log(user)

  return (
    <aside className="max-lg:hidden flex h-screen p-5 bg-neutrals-12 overflow-y-auto">
      <div className="flex flex-col gap-20 justify-between h-full w-[220px]">
        <div className="flex flex-col items-center gap-20 w-full">
          <Logo />

          <div className="w-full flex flex-col gap-5">
            <SideBarPages />
          </div>
        </div>

        <SideBarPlan />

        <SideBarUserMenu user={user} />
      </div>
    </aside>
  )
}

export { SideBar }
