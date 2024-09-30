import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { useModalStore } from '@/providers/modal-provider'
import { editDomain } from '@/utils/db'
import { toast } from '@/utils/toast'
import { Domain } from '@prisma/client'
import { Globe } from 'lucide-react'

const ModalEditDomain = ({ domain }: { domain: Domain }) => {
  const { dispatch } = useModalStore((state) => state)

  const editDomainAction = async (formData: FormData) => {
    try {
      await editDomain(formData, domain.domainName)

      toast({
        type: 'success',
        message: 'Successfully edited',
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
    <Modal title="Edit domain">
      <form action={editDomainAction} className="flex flex-col gap-5 w-full">
        <Input name="newDomainName" placeholder="example.com" icon={Globe} />
        <Button type="submit" title="Edit" />
      </form>
    </Modal>
  )
}

export { ModalEditDomain }
