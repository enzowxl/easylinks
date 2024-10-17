'use client'

import { BaseContainer } from '@/app/(dashboard)/_components/base/base-container'
import { BaseContent } from '@/app/(dashboard)/_components/base/base-content'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { SelectInput } from '@/components/select-input'
import { Plus } from 'lucide-react'
import { CreateLinkItem } from './create-link-item'
import { useState } from 'react'
import { toast } from '@/utils/toast'
import { createLink } from '@/utils/db'
import { DomainsType } from '../../../domains/_components/domain-list'
import { useRouter } from 'next/navigation'

const CreateLinkList = ({ domains }: { domains: DomainsType[] }) => {
  const router = useRouter()

  const [domainName, updateDomainName] = useState<string>('')

  const createLinkAction = async (formData: FormData) => {
    formData.append('domainName', domainName)

    const responseAction = await createLink(formData)

    if (responseAction?.error) {
      return toast({
        type: 'error',
        message: responseAction.error,
        style: 'dark',
      })
    }

    toast({
      type: 'success',
      message: 'Successfully created',
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
    <BaseContainer action={createLinkAction} isForm>
      <div className="max-sm:flex-col sm:items-center flex justify-between gap-5 px-5">
        <h3 className="max-sm:text-xl font-bold text-2xl">Create new link</h3>

        <Button
          classnamecontainer="max-sm:w-full"
          title="Create link"
          icon={Plus}
        />
      </div>

      <BaseContent>
        <CreateLinkItem
          title="Choose your destination"
          description="The destination URL of the link"
        >
          <Input
            required
            name="destinationUrl"
            type="url"
            classnameinputcontainer="hover:scale-[1.01]"
            label="URL Destination"
            placeholder="https://example.com"
          />
          <div className="max-lg:flex-col flex gap-5 w-full">
            <SelectInput
              required
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
        </CreateLinkItem>

        <CreateLinkItem title="Utils" description="Some uses of your link">
          <Input
            name="utilsPassword"
            autoComplete="new-password"
            classnameinputcontainer="hover:scale-[1.01]"
            label="Password"
            type="password"
            placeholder="**********"
          />
        </CreateLinkItem>
      </BaseContent>
    </BaseContainer>
  )
}

export { CreateLinkList }
