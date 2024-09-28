import { DotOptions } from '@/components/dot-options'
import { LinksType } from './link-list'
import { DropdownMenu } from '@/components/dropdown-menu'
import Link from 'next/link'
import { Delete, Edit, Share } from 'lucide-react'

const LinkItem = ({ link }: { link: LinksType }) => {
  const domainName = link.domain?.domainName ?? 'easylinks.com'
  const dashboardLinkUrl = '/dashboard/links/' + link.id
  const redirectEasyLinkUrl = `https://${domainName}/` + link.slug
  const externalWebsiteUrl = link.url

  const dropDownMenuGroups = [
    {
      items: [
        {
          icon: Edit,
          label: 'Edit',
          onClick: () => {},
        },
        {
          icon: Delete,
          label: 'Delete',
          onClick: () => {},
        },
        {
          icon: Share,
          label: 'Share',
          onClick: () => {},
        },
      ],
    },
  ]

  return (
    <div className="max-sm:flex-col max-sm:text-center gap-5 flex justify-between items-center bg-neutrals-12 w-full rounded-lg p-5">
      <div className="flex flex-col gap-1.5">
        <Link
          href={dashboardLinkUrl}
          className="hover:underline font-bold text-lg"
        >
          {link.title}
        </Link>
        <Link
          href={redirectEasyLinkUrl}
          className="hover:underline text-neutrals-6 flex"
        >
          {`${domainName}/`}
          <p className="text-white">{link.slug}</p>
        </Link>
        <Link
          href={externalWebsiteUrl}
          className="hover:underline text-neutrals-6"
        >
          {externalWebsiteUrl}
        </Link>
      </div>
      <DropdownMenu groups={dropDownMenuGroups}>
        <DotOptions />
      </DropdownMenu>
    </div>
  )
}

export { LinkItem }
