'use client'

import { Input } from '@/components/input'
import { Search } from 'lucide-react'
import { DomainItem } from './domain-item'
import { Domain } from '@prisma/client'
import { useState } from 'react'
import { ModalCreateDomain } from './modal-create-domain'

export type DomainsType = Domain & { misconfigured?: boolean }

const DomainList = ({ domains }: { domains: DomainsType[] }) => {
  const [search, updateSearch] = useState<string>('')

  const filter =
    search.length > 0
      ? domains.filter((domain) =>
          domain.domainName.toLowerCase().includes(search.toLowerCase()),
        )
      : []

  const length = search.length > 0 ? filter.length : domains.length

  const headerTitle = `${length} ${length === 1 ? 'Domain' : 'Domains'}`

  return (
    <div className="flex flex-col gap-8 py-5">
      <div className="flex flex-col gap-5 px-5">
        <h3 className="font-bold text-2xl">{headerTitle}</h3>

        <div className="max-sm:flex-col flex gap-5 justify-between items-center">
          <Input
            classnamecontainer="max-sm:w-full"
            placeholder="Search domains"
            icon={Search}
            onChange={(v) => updateSearch(v.target.value)}
          />
          <ModalCreateDomain />
        </div>
      </div>

      <div className="flex flex-col gap-2.5 px-5">
        {search.length > 0
          ? filter.map((domain, index) => {
              return <DomainItem key={index} domain={domain} />
            })
          : domains.map((domain, index) => {
              return <DomainItem key={index} domain={domain} />
            })}
      </div>
    </div>
  )
}

export { DomainList }
