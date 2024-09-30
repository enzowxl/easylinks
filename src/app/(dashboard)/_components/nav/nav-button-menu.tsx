'use client'

import { Menu } from 'lucide-react'
import { NavSheetMenu } from './nav-sheet-menu'
import { useSheetStore } from '@/providers/sheet-provider'
import { User } from '@prisma/client'

const NavButtonMenu = ({ user }: { user: User | null }) => {
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
