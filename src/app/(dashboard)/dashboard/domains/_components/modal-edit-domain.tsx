import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { useModalStore } from '@/provider/modal-provider'
import { editDomain } from '@/utils/db'
import { Domain } from '@prisma/client'
import { Globe } from 'lucide-react'
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

const ModalEditDomain = ({ domain }: { domain: Domain }) => {
  const { dispatch } = useModalStore((state) => state)

  const editDomainAction = async (formData: FormData) => {
    try {
      await editDomain(formData, domain.domainName)

      toast.success('Successfully edited', toastConfig)

      return dispatch.closeModal()
    } catch (err) {
      if (err instanceof Error) {
        return toast.error(err.message, toastConfig)
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
