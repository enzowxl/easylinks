import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { useModalStore } from '@/providers/modal-provider'
import { deleteDomain } from '@/utils/db'
import { Domain } from '@prisma/client'
import toast from 'react-hot-toast'

const toastConfig = {
  duration: 5000,
  className: 'border',
  style: {
    backgroundColor: '#09090B',
    color: 'white',
    borderColor: '#131315',
  },
}

const ModalDeleteDomain = ({ domain }: { domain: Domain }) => {
  const { dispatch } = useModalStore((state) => state)

  const deleteDomainAction = async () => {
    try {
      await deleteDomain(domain.domainName)

      toast.success('Successfully deleted', toastConfig)

      return dispatch.closeModal()
    } catch (err) {
      if (err instanceof Error) {
        return toast.error(err.message, toastConfig)
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
