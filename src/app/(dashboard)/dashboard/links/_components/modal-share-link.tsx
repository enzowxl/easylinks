import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { useModalStore } from '@/providers/modal-provider'
import { toast } from '@/utils/toast'
import { LinksType } from './link-list'
import { QRCode } from 'react-qrcode-logo'
import { useRef } from 'react'
import { formattedHeaders } from '@/utils/headers'

const ModalShareLink = ({ link }: { link: LinksType }) => {
  const qrCodeRef = useRef<QRCode | null>(null)

  const { dispatch } = useModalStore((state) => state)

  const { protocol } = formattedHeaders()

  const domainName = link.domain?.domainName ?? process.env.NEXT_PUBLIC_DOMAIN
  const redirectUrl = `${protocol}://${domainName}/` + link.slug

  const copyRedirectUrlToClipboard = () => {
    navigator.clipboard.writeText(redirectUrl)

    toast({
      type: 'success',
      message: 'Link copied successfully',
      style: 'subdark',
    })

    return dispatch.closeModal()
  }

  const downloadQrCode = () => {
    qrCodeRef.current?.download('png', link.slug)

    toast({
      type: 'success',
      message: 'QR Code download successfully',
      style: 'subdark',
    })

    return dispatch.closeModal()
  }

  return (
    <Modal title="Share link">
      <div className="flex flex-col gap-5 w-full">
        <div className="w-full flex justify-center">
          <QRCode
            ref={qrCodeRef}
            style={{
              borderRadius: 5,
            }}
            enableCORS
            ecLevel="L"
            eyeRadius={{ inner: 5, outer: 5 }}
            qrStyle="fluid"
            value={redirectUrl}
          />
        </div>
        <div className="flex gap-5">
          <Button
            classnamecontainer="w-full"
            onClick={copyRedirectUrlToClipboard}
            type="button"
            title="Copy"
          />
          <Button
            classnamecontainer="w-full"
            onClick={downloadQrCode}
            type="button"
            title="Download"
          />
        </div>
      </div>
    </Modal>
  )
}

export { ModalShareLink }
