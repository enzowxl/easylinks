import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { useModalStore } from '@/providers/modal-provider'
import { deleteLink } from '@/utils/db'
import { toast } from '@/utils/toast'
import { Link } from '@prisma/client'

const ModalDeleteLink = ({ link }: { link: Link }) => {
  const { dispatch } = useModalStore((state) => state)

  const deleteLinkAction = async () => {
    try {
      await deleteLink(link.id)

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
