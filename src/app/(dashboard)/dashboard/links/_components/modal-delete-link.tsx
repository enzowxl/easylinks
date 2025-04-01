import { Button } from '@/components/button'
import { Modal } from '@/components/modal'
import { useModalStore } from '@/providers/modal-provider'
import { deleteLink } from '@/utils/db'
import { toast } from '@/utils/toast'
import { Link } from '@prisma/client'

const ModalDeleteLink = ({ link }: { link: Link }) => {
  const { dispatch } = useModalStore((state) => state)

  const deleteLinkAction = async () => {
    const responseAction = await deleteLink(link.id)

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
