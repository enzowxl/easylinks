import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { useModalStore } from '@/providers/modal-provider'
import { deleteDomain } from '@/utils/db'
import { toast } from '@/utils/toast'
import { Domain } from '@prisma/client'

const ModalDeleteDomain = ({ domain }: { domain: Domain }) => {
  const { dispatch } = useModalStore((state) => state)

  const deleteDomainAction = async () => {
    const responseAction = await deleteDomain(domain.domainName)

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
      message: 'Successfully deleted',
      style: 'dark',
    })

    return dispatch.closeModal()
  }

  return (
    <Modal title="Delete domain">
      <form
        action={() => deleteDomainAction()}
        className="flex flex-col gap-5 w-full"
      >
        <p>Are you sure you want to delete this domain?</p>
        <Button type="submit" title="Delete" />
      </form>
    </Modal>
  )
}

export { ModalDeleteDomain }
