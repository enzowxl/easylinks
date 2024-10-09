'use client'

import { BaseContainer } from '@/app/(dashboard)/_components/base/base-container'
import { BaseContent } from '@/app/(dashboard)/_components/base/base-content'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { SelectInput } from '@/components/select-input'
import { Image as ImageIcon, Plus } from 'lucide-react'
import { CreateLinkItem } from './create-link-item'
import { ChangeEvent, useState } from 'react'
import { toast } from '@/utils/toast'
import { createLink } from '@/utils/db'
import { DomainsType } from '../../../domains/_components/domain-list'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const CreateLinkList = ({ domains }: { domains: DomainsType[] }) => {
  const router = useRouter()

  const [metadataPhoto, updateMetadataPhoto] = useState<string | null>(null)

  const [domainName, updateDomainName] = useState<string>('')

  const openMetaDataInputPhoto = () => {
    document.getElementsByName('metadataPhoto')[0]?.click()
  }

  const onChangeMetaDataInputPhoto = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      updateMetadataPhoto(URL.createObjectURL(event.target.files[0]))
    }
  }

  const createLinkAction = async (formData: FormData) => {
    try {
      formData.append('domainName', domainName)

      await createLink(formData)

      toast({
        type: 'success',
        message: 'Successfully created',
        style: 'subdark',
      })

      return router.push('/dashboard/links')
    } catch (err) {
      if (err instanceof Error) {
        return toast({
          type: 'error',
          message: err.message,
          style: 'subdark',
        })
      }
    }
  }

  const domainItems = () => {
    const defaultDomains = [
      {
        label: 'easylinks.com/',
        value: 'easylinks.com',
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
        <h3 className="font-bold text-2xl">Create new link</h3>

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

        <CreateLinkItem
          title="Metadata"
          description="Customize your link metadata"
        >
          <div
            onClick={openMetaDataInputPhoto}
            className="relative overflow-hidden flex flex-col gap-2 w-full bg-dark rounded-lg items-center justify-center p-5 h-64"
          >
            {metadataPhoto && (
              <Image
                width={1000}
                height={1000}
                alt="metadata"
                className="w-full h-full absolute object-contain"
                src={metadataPhoto}
              />
            )}
            <Input
              name="metadataPhoto"
              onChange={onChangeMetaDataInputPhoto}
              type="file"
              accept="image/*"
              classnamecontainer="absolute w-full h-full"
              classnameinputcontainer="flex-1 hover:scale-100 opacity-0"
            />
            <ImageIcon className="w-5 h-5 text-neutrals-6" />
            <p className="text-neutrals-6 text-sm w-44 text-center">
              Click to choose an image, or drag a file
            </p>
          </div>
          <Input
            name="metadataTitle"
            classnameinputcontainer="hover:scale-[1.01]"
            label="Title"
            placeholder="My youtube channel"
          />
          <Input
            name="metadataDescription"
            classnameinputcontainer="hover:scale-[1.01]"
            label="Description"
            placeholder="Check out my youTube channel"
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
