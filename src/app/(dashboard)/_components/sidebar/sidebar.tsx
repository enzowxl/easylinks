'use client'

import {
  ChartNoAxesColumn,
  Globe,
  Link,
  // StickyNote, Users
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { SideBarButton } from './sidebar-button'
import { UserMenu } from './user-menu'
import { Plan } from './plan'

const SideBar = () => {
  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: ChartNoAxesColumn,
    },
    {
      title: 'Links',
      href: '/dashboard/links',
      icon: Link,
    },
    {
      title: 'Domains',
      href: '/dashboard/domains',
      icon: Globe,
    },
    // {
    //   title: 'Pages',
    //   href: '/dashboard/pages',
    //   icon: StickyNote,
    // },
    // {
    //   title: 'Leads',
    //   href: '/dashboard/leads',
    //   icon: Users,
    // },
  ]

  return (
    <aside className="max-lg:hidden flex h-screen p-5 bg-neutrals-12 overflow-y-auto">
      <div className="flex flex-col gap-20 justify-between h-full w-[220px]">
        <div className="flex flex-col items-center gap-20 w-full">
          <Logo />
          <div className="w-full flex flex-col gap-5">
            {pages.map((page, index) => (
              <SideBarButton key={index} {...page} />
            ))}
          </div>
        </div>
        <Plan />
        <UserMenu />
      </div>
    </aside>
  )
}

export { SideBar }
