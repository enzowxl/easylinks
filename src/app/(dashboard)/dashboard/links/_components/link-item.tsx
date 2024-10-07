import { DotOptions } from '@/components/dot-options'
import { LinksType } from './link-list'
import { DropdownMenu } from '@/components/dropdown-menu'
import { Copy, Delete, Edit, QrCode, Share } from 'lucide-react'
import { useModalStore } from '@/providers/modal-provider'
import { ModalDeleteLink } from './modal-delete-link'
import { toast } from '@/utils/toast'
import { useRouter } from 'next/navigation'
import { ModalShareLink } from './modal-share-link'
import Link from 'next/link'

const LinkItem = ({ link }: { link: LinksType }) => {
  const router = useRouter()

  const { dispatch } = useModalStore((state) => state)

  const domainName = link.domain?.domainName ?? 'easylinks.com'
  const dashboardLinkUrl = '/dashboard/links/' + link.id
  const redirectUrl = `https://${domainName}/` + link.slug
  const externalWebsiteUrl = link.url

  const dropDownMenuGroups = [
    {
      items: [
        {
          icon: Edit,
          label: 'Edit',
          onClick: () => {
            router.push('/dashboard/links/' + link.id + '/edit')
          },
        },
        {
          icon: Delete,
          label: 'Delete',
          onClick: () => dispatch.openModal(<ModalDeleteLink link={link} />),
        },
        {
          icon: Share,
          label: 'Share',
          onClick: () => dispatch.openModal(<ModalShareLink link={link} />),
        },
      ],
    },
  ]

  const copyRedirectUrlToClipboard = () => {
    navigator.clipboard.writeText(redirectUrl)

    toast({
      type: 'success',
      message: 'Link copied successfully',
      style: 'subdark',
    })
  }

  const shareToQRCode = () => {
    dispatch.openModal(<ModalShareLink link={link} />)
  }

  return (
    <div className="max-sm:flex-col max-sm:text-center gap-5 flex justify-between items-center bg-neutrals-12 w-full rounded-lg p-5">
      <div className="flex flex-col gap-1.5 w-full overflow-hidden text-ellipsis">
        <div className="max-sm:justify-center flex items-center gap-3">
          <Link
            href={dashboardLinkUrl}
            className="hover:underline font-bold text-lg overflow-hidden text-ellipsis"
          >
            {link.title ? link.title : link.slug}
          </Link>
          <button
            className="max-sm:hidden"
            onClick={copyRedirectUrlToClipboard}
          >
            <Copy className="w-4 h-4 text-neutrals-5" />
          </button>
          <button className="max-sm:hidden" onClick={shareToQRCode}>
            <QrCode className="w-4 h-4 text-neutrals-5" />
          </button>
          <h5 className="max-sm:hidden text-neutrals-6">
            {link.clicks.length} clicks
          </h5>
        </div>
        <Link
          href={redirectUrl}
          className="max-sm:justify-center overflow-hidden text-ellipsis hover:underline flex text-neutrals-6"
        >
          {`${domainName}/`}
          <p className="overflow-hidden text-nowrap text-ellipsis text-white inline-block">
            {link.slug}
          </p>
        </Link>
        <Link
          href={externalWebsiteUrl}
          className="hover:underline text-neutrals-6 overflow-hidden text-ellipsis"
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
