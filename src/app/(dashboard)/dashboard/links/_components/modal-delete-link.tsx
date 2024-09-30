import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { useModalStore } from '@/providers/modal-provider'
import { deleteLink } from '@/utils/db'
import { Link } from '@prisma/client'
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

const ModalDeleteLink = ({ link }: { link: Link }) => {
  const { dispatch } = useModalStore((state) => state)

  const deleteLinkAction = async () => {
    try {
      await deleteLink(link.id)

      toast.success('Successfully deleted', toastConfig)

      return dispatch.closeModal()
    } catch (err) {
      if (err instanceof Error) {
        return toast.error(err.message, toastConfig)
      }
    }
  }

  return (
    <Modal title="Delete link">
      <form
        action={() => deleteLinkAction()}
        className="flex flex-col gap-5 w-full"
      >
        <p>Are you sure you want to delete this link?</p>
        <Button type="submit" title="Delete" />
      </form>
    </Modal>
  )
}

export { ModalDeleteLink }
