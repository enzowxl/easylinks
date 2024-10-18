'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Lock } from 'lucide-react'
import { changePassword } from '@/utils/db'
import { useRouter } from 'next/navigation'
import { toast } from '@/utils/toast'
import { Token } from '@prisma/client'

const RecoverPasswordForm = ({ token }: { token: Token }) => {
  const router = useRouter()
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const baseUrl = protocol + '://' + process.env.NEXT_PUBLIC_DOMAIN

  const redirectAction = async (formData: FormData) => {
    const responseAction = await changePassword(
      token.userId,
      formData,
      token.id,
    )

    if (responseAction?.error) {
      return toast({
        type: 'error',
        message: responseAction.error,
        style: 'dark',
      })
    }

    toast({
      type: 'success',
      message: 'Password changed successfully',
      style: 'dark',
    })

    return router.push(baseUrl + '/sign-in')
  }

  return (
    <form
      action={redirectAction}
      className="max-sm:w-full flex flex-col gap-5 sm:w-[400px]"
    >
      <Input
        required
        type="password"
        name="currentPassword"
        label="Current Password"
        placeholder="**********"
        variant="big"
        icon={Lock}
      />
      <Input
        required
        type="password"
        name="password"
        label="Password"
        placeholder="**********"
        variant="big"
        icon={Lock}
      />
      <Button title="Go" variant="big" />
    </form>
  )
}

export { RecoverPasswordForm }
