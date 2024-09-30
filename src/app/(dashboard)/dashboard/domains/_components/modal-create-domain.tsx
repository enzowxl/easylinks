import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { useModalStore } from '@/provider/modal-provider'
import { createDomain } from '@/utils/db'
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

const ModalCreateDomain = () => {
  const { dispatch } = useModalStore((state) => state)

  const createDomainAction = async (formData: FormData) => {
    try {
      await createDomain(formData)

      toast.success('Successfully created', toastConfig)

      return dispatch.closeModal()
    } catch (err) {
      if (err instanceof Error) {
        return toast.error(err.message, toastConfig)
      }
    }
  }

  return (
    <Modal title="Create domain">
      <form
        action={(formData: FormData) => createDomainAction(formData)}
        className="flex flex-col gap-5 w-full"
      >
        <Input name="domainName" placeholder="example.com" icon={Globe} />
        <Button type="submit" title="Create" />
      </form>
    </Modal>
  )
}

export { ModalCreateDomain }
