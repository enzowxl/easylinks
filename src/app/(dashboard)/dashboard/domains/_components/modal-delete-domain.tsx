import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { useModalStore } from '@/providers/modal-provider'
import { deleteDomain } from '@/utils/db'
import { toast } from '@/utils/toast'
import { Domain } from '@prisma/client'

const ModalDeleteDomain = ({ domain }: { domain: Domain }) => {
  const { dispatch } = useModalStore((state) => state)

  const deleteDomainAction = async () => {
    try {
      await deleteDomain(domain.domainName)

      toast({
        type: 'success',
        message: 'Successfully deleted',
        style: 'dark',
      })

      return dispatch.closeModal()
    } catch (err) {
      if (err instanceof Error) {
        return toast({
          type: 'error',
          message: err.message,
          style: 'dark',
        })
      }
    }
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
