'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useRouter } from 'next/navigation'
import { Mail } from 'lucide-react'
import { toast } from '@/utils/toast'
import { recoverPassword } from '@/utils/db'

const RecoverPasswordForm = () => {
  const router = useRouter()

  const recoverPasswordAction = async (formData: FormData) => {
    const responseAction = await recoverPassword(formData)

    if (responseAction?.error) {
      return toast({
        type: 'error',
        message: responseAction.error,
        style: 'dark',
      })
    }

    toast({
      type: 'success',
      message:
        'If the email is registered, you will receive a verification link.',
      style: 'dark',
    })

    return router.push('/sign-in')
  }

  return (
    <form
      action={recoverPasswordAction}
      className="max-sm:w-full flex flex-col gap-5 sm:w-[400px]"
    >
      <Input
        required
        type="email"
        name="email"
        label="E-mail"
        placeholder="johndoe@example.com"
        icon={Mail}
        variant="big"
      />
      <Button title="Continue" variant="big" />
    </form>
  )
}

export { RecoverPasswordForm }
