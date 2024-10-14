'use client'

import { Menu } from 'lucide-react'
import { NavSheetMenu } from './nav-sheet-menu'
import { useSheetStore } from '@/providers/sheet-provider'
import { UserSideBarType } from '../sidebar/sidebar'

const NavButtonMenu = ({ user }: { user: UserSideBarType }) => {
  const { dispatch } = useSheetStore((state) => state)

  return (
    <button
      onClick={() => dispatch.openSheet(<NavSheetMenu user={user} />)}
      className="lg:hidden"
    >
      <Menu className="w-5 h-5" />
    </button>
  )
}

export { NavButtonMenu }
