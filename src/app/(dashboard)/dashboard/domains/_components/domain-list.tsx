'use client'

import { Input } from '@/components/input'
import { Plus, Search } from 'lucide-react'
import { DomainItem } from './domain-item'
import { Domain } from '@prisma/client'
import { useState } from 'react'
import { Button } from '@/components/button'
import { ModalCreateDomain } from './modal-create-domain'
import { useModalStore } from '@/providers/modal-provider'
import { BaseContainer } from '@/app/(dashboard)/_components/base/base-container'
import { BaseContent } from '@/app/(dashboard)/_components/base/base-content'

export type DomainsType = Domain & { misconfigured?: boolean }

const DomainList = ({ domains }: { domains: DomainsType[] }) => {
  const { dispatch } = useModalStore((state) => state)

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
    <BaseContainer>
      <div className="flex flex-col gap-5 px-5">
        <h3 className="max-sm:text-xl font-bold text-2xl">{headerTitle}</h3>
        <div className="max-sm:flex-col flex gap-5 justify-between items-center">
          <Input
            classnamecontainer="max-sm:w-full"
            placeholder="Search domains"
            icon={Search}
            onChange={(v) => updateSearch(v.target.value)}
          />
          <Button
            onClick={() => dispatch.openModal(<ModalCreateDomain />)}
            classnamecontainer="max-sm:w-full"
            title="Create domain"
            icon={Plus}
          />
        </div>
      </div>

      <BaseContent>
        {length <= 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <h3 className="text-neutrals-6  font-bold text-center">
              No domain found
            </h3>
          </div>
        ) : search.length > 0 ? (
          filter.map((domain, index) => {
            return <DomainItem key={index} domain={domain} />
          })
        ) : (
          domains.map((domain, index) => {
            return <DomainItem key={index} domain={domain} />
          })
        )}
      </BaseContent>
    </BaseContainer>
  )
}

export { DomainList }
