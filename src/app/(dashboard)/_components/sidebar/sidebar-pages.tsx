'use client'

import {
  ChartNoAxesColumn,
  Globe,
  Link,
  // StickyNote, Users
} from 'lucide-react'
import { SideBarButton } from './sidebar-button'
import React from 'react'

const SideBarPages = () => {
  const pages = [
    {
      title: 'Dashboard',
      active: ['/dashboard'],
      href: '/dashboard',
      icon: ChartNoAxesColumn,
    },
    {
      title: 'Links',
      active: ['/dashboard/links', '/dashboard/links/[id]'],
      href: '/dashboard/links',
      icon: Link,
    },
    {
      title: 'Domains',
      active: ['/dashboard/domains'],
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
    <React.Fragment>
      {pages.map((page, index) => (
        <SideBarButton key={index} {...page} />
      ))}
    </React.Fragment>
  )
}

export { SideBarPages }
