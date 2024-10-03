'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Plus, Search } from 'lucide-react'
import { LinkItem } from './link-item'
import { Prisma } from '@prisma/client'
import { useState } from 'react'
import { BaseContainer } from '@/app/(dashboard)/_components/base/base-container'
import { BaseContent } from '@/app/(dashboard)/_components/base/base-content'

export type LinksType = Prisma.LinkGetPayload<{
  include: {
    domain: true
    clicks: true
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
    <BaseContainer>
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
            href="/dashboard/links/create"
            classnamecontainer="max-sm:w-full"
            title="Create link"
            icon={Plus}
          />
        </div>
      </div>

      <BaseContent>
        {length <= 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-neutrals-6  font-bold text-center">
              No link found
            </h3>
          </div>
        ) : search.length > 0 ? (
          filter.map((link, index) => {
            return <LinkItem key={index} link={link} />
          })
        ) : (
          links.map((link, index) => {
            return <LinkItem key={index} link={link} />
          })
        )}
      </BaseContent>
    </BaseContainer>
  )
}

export { LinkList }
