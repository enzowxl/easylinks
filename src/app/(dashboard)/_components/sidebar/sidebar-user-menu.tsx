'use client'

import { DropdownMenu } from '@/components/dropdown-menu'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { UserSideBarType } from './sidebar'

interface SideBarUserMenuType {
  user: UserSideBarType
}

const SideBarUserMenu = ({ user }: SideBarUserMenuType) => {
  const dropDownMenuGroups = [
    {
      items: [
        {
          icon: LogOut,
          label: 'Sign Out',
          onClick: () => signOut(),
        },
      ],
    },
  ]

  return (
    <DropdownMenu groups={dropDownMenuGroups}>
      <div className="flex items-center gap-2.5 cursor-pointer px-2.5 py-1.5 rounded-lg duration-500 border border-neutrals-12 hover:border hover:border-neutrals-11 hover:from-neutrals-12 hover:to-neutrals-13 bg-gradient-to-r">
        <Image
          className="bg-dark w-6 h-6 rounded-full object-contain"
          src={
            'https://purepng.com/public/uploads/large/purepng.com-thinking-manthinking-manpersongentle-men-thinkingthinking-brain-1421526976458gpxqy.png'
          }
          alt={user?.name}
          width={100}
          height={100}
        />
        <h5 className="text-nowrap overflow-hidden w-full text-ellipsis">
          {user?.name}
        </h5>
      </div>
    </DropdownMenu>
  )
}

export { SideBarUserMenu }
