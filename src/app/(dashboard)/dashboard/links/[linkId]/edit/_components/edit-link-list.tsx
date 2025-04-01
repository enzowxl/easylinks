'use client'

import { BaseContainer } from '@/app/(dashboard)/_components/base/base-container'
import { BaseContent } from '@/app/(dashboard)/_components/base/base-content'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { SelectInput } from '@/components/select-input'
import { Plus } from 'lucide-react'
import { EditLinkItem } from './edit-link-item'
import { useState } from 'react'
import { toast } from '@/utils/toast'
import { editLink } from '@/utils/db'
import { useRouter } from 'next/navigation'
import { DomainsType } from '@/app/(dashboard)/dashboard/domains/_components/domain-list'
import { LinkType } from '../../page'

const EditLinkList = ({
  link,
  domains,
}: {
  link: LinkType
  domains: DomainsType[]
}) => {
  const router = useRouter()

  const [domainName, updateDomainName] = useState<string>('')

  const editLinkAction = async (formData: FormData) => {
    formData.append('domainName', domainName)

    const responseAction = await editLink(link.id, formData)

    if (responseAction?.error) {
      toast({
        type: 'error',
        message: responseAction.error,
        style: 'dark',
      })

      return
    }

    toast({
      type: 'success',
      message: 'Successfully edited',
      style: 'subdark',
    })

    return router.push('/dashboard/links')
  }

  const domainItems = () => {
    const defaultDomains = [
      {
        label: process.env.NEXT_PUBLIC_DOMAIN + '/',
        value: process.env.NEXT_PUBLIC_DOMAIN as string,
      },
    ]

    domains.forEach((domain) => {
      if (!domain.misconfigured) {
        defaultDomains.push({
          label: domain.domainName + '/',
          value: domain.domainName,
        })
      }
    })

    return defaultDomains
  }

  return (
    <BaseContainer action={editLinkAction} isForm>
      <div className="max-sm:flex-col sm:items-center flex justify-between gap-5 px-5">
        <h3 className="max-sm:text-xl font-bold text-2xl">Create new link</h3>

        <Button
          classnamecontainer="max-sm:w-full"
          title="Edit link"
          icon={Plus}
        />
      </div>

      <BaseContent>
        <EditLinkItem
          title="Choose your destination"
          description="The destination URL of the link"
        >
          <Input
            name="destinationUrl"
            type="url"
            classnameinputcontainer="hover:scale-[1.01]"
            label="URL Destination"
            placeholder="https://example.com"
          />
          <div className="max-lg:flex-col flex gap-5 w-full">
            <SelectInput
              className="max-sm:flex-col max-sm:gap-3 hover:scale-[1.01] duration-500"
              label="Your easylink"
              input={{
                name: 'destinationSlug',
                classnamecontainer: 'w-full',
                classnameinputcontainer:
                  'hover:scale-[1] sm:border-l-0 sm:rounded-l-none',
                placeholder: 'my-channel',
              }}
              select={{
                onValueChange: (value) => updateDomainName(value),
                items: domainItems(),
                placeholder: 'Select domain',
                className:
                  'max-sm:full sm:max-w-max sm:border-r-0 sm:rounded-r-none hover:scale-[1] text-nowrap',
              }}
            />
            <Input
              name="destinationTitle"
              classnamecontainer="w-full"
              classnameinputcontainer="hover:scale-[1.01]"
              label="Title"
              placeholder="My youtube channel"
            />
          </div>
          <Input
            name="destinationDescription"
            classnamecontainer="w-full"
            classnameinputcontainer="hover:scale-[1.01]"
            label="Description"
            placeholder="This is the link to my main channel"
          />
        </EditLinkItem>

        <EditLinkItem title="Utils" description="Some uses of your link">
          <Input
            name="utilsPassword"
            autoComplete="new-password"
            classnameinputcontainer="hover:scale-[1.01]"
            label="Password"
            type="password"
            placeholder="**********"
          />
        </EditLinkItem>
      </BaseContent>
    </BaseContainer>
  )
}

export { EditLinkList }
