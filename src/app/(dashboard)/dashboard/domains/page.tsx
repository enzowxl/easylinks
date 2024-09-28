'use client'

import { Input } from '@/components/input'
import { NavAuth } from '@/app/(dashboard)/_components/nav-auth'
import { Search } from 'lucide-react'
import { DomainItem } from './_components/domain-item'
import { ModalCreateDomain } from './_components/modal-create-domain'

const DomainsPage = () => {
  return (
    <div className="flex flex-col">
      <NavAuth title="Domains" />

      <div className="flex flex-col gap-8 py-5">
        <div className="flex flex-col gap-5 px-5">
          <h3 className="font-bold text-2xl">2 Domains</h3>

          <div className="max-sm:flex-col flex gap-5 justify-between items-center">
            <Input
              classnamecontainer="max-sm:w-full"
              placeholder="Search domains"
              icon={Search}
            />
            <ModalCreateDomain />
          </div>
        </div>

        <div className="flex flex-col gap-2.5 px-5">
          <DomainItem domain="enzo.com" misconfigured={true} />
          <DomainItem domain="enzo.com" />
        </div>
      </div>
    </div>
  )
}

export default DomainsPage
