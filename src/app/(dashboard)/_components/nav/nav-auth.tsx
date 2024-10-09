import React from 'react'
import { NavButtonMenu } from './nav-button-menu'
import { getMe } from '@/utils/db'
import Link from 'next/link'
import clsx from 'clsx'

export interface TitleNavType {
  label: string
  href: string
  ellipsis?: boolean
}

interface NavAuthType {
  title: TitleNavType[]
}

const NavAuth = async ({ title }: NavAuthType) => {
  const user = await getMe()

  return (
    <nav className="border-b border-neutrals-12 flex justify-between items-center gap-5 px-5 py-3 w-full">
      <div className="flex gap-1.5 w-2/4">
        {title.map((titleItem, index) => {
          const containsId = titleItem.ellipsis || false

          return (
            <React.Fragment key={index}>
              <Link
                className={clsx(containsId ? 'overflow-hidden' : '')}
                href={titleItem.href}
              >
                <h4 className="font-bold text-lg overflow-hidden text-ellipsis">
                  {titleItem.label}
                </h4>
              </Link>

              {index < title.length - 1 && (
                <h4 className="font-bold text-lg">/</h4>
              )}
            </React.Fragment>
          )
        })}
      </div>

      <NavButtonMenu user={user} />
    </nav>
  )
}

export { NavAuth }
