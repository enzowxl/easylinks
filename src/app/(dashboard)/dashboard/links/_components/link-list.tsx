'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Plus, Search } from 'lucide-react'
import { LinkItem } from './link-item'
import { Prisma } from '@prisma/client'
import { useState } from 'react'

export type LinksType = Prisma.LinkGetPayload<{
  include: {
    domain: true
  }
}>

const LinkList = ({ links }: { links: LinksType[] }) => {
  const [search, updateSearch] = useState<string>('')

  const filter =
    search.length > 0
      ? links.filter((link) =>
          link.title.toLowerCase().includes(search.toLowerCase()),
        )
      : []

  const length = search.length > 0 ? filter.length : links.length

  const headerTitle = `${length} ${length === 1 ? 'Link' : 'Links'}`

  return (
    <div className="flex flex-col gap-8 py-5">
      <div className="flex flex-col gap-5 px-5">
        <h3 className="font-bold text-2xl">{headerTitle}</h3>

        <div className="max-sm:flex-col flex gap-5 justify-between items-center">
          <Input
            classnamecontainer="max-sm:w-full"
            placeholder="Search links"
            icon={Search}
            onChange={(v) => updateSearch(v.target.value)}
          />
          <Button
            classnamecontainer="max-sm:w-full"
            title="Create link"
            icon={Plus}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2.5 px-5">
        {search.length > 0
          ? filter.map((link, index) => {
              return <LinkItem key={index} link={link} />
            })
          : links.map((link, index) => {
              return <LinkItem key={index} link={link} />
            })}
      </div>
    </div>
  )
}

export { LinkList }
