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
    <React.Fragment>
      {pages.map((page, index) => (
        <SideBarButton key={index} {...page} />
      ))}
    </React.Fragment>
  )
}

export { SideBarPages }
