'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { LinkItem } from './_components/link-item'
import { NavAuth } from '@/app/(dashboard)/_components/nav-auth'
import { Plus, Search } from 'lucide-react'

const LinksPage = () => {
  return (
    <div className="flex flex-col">
      <NavAuth title="Links" />

      <div className="flex flex-col gap-8 py-5">
        <div className="flex flex-col gap-5 px-5">
          <h3 className="font-bold text-2xl">2 Links</h3>

          <div className="max-sm:flex-col flex gap-5 justify-between items-center">
            <Input
              classnamecontainer="max-sm:w-full"
              placeholder="Search links"
              icon={Search}
            />
            <Button
              classnamecontainer="max-sm:w-full"
              title="Create link"
              icon={Plus}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-5">
          <LinkItem />
          <LinkItem />
          <LinkItem />
        </div>
      </div>
    </div>
  )
}

export default LinksPage
