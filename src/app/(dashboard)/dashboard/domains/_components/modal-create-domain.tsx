import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Modal } from '@/components/modal'
import { useModalStore } from '@/providers/modal-provider'
import { createDomain } from '@/utils/db'
import { toast } from '@/utils/toast'
import { Globe } from 'lucide-react'

const ModalCreateDomain = () => {
  const { dispatch } = useModalStore((state) => state)

  const createDomainAction = async (formData: FormData) => {
    try {
      await createDomain(formData)

      toast({
        type: 'success',
        message: 'Successfully created',
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
    <Modal title="Create domain">
      <form action={createDomainAction} className="flex flex-col gap-5 w-full">
        <Input
          required
          name="domainName"
          placeholder="example.com"
          icon={Globe}
        />
        <Button type="submit" title="Create" />
      </form>
    </Modal>
  )
}

export { ModalCreateDomain }
