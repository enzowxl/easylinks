'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { registerUser } from '@/utils/db'
import { toast } from '@/utils/toast'
import { IdCard, Lock, Mail } from 'lucide-react'
import { useRouter } from 'next/navigation'

const SignUpForm = () => {
  const router = useRouter()

  const registerUserAction = async (formData: FormData) => {
    const responseAction = await registerUser(formData)

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
        'Successfully registered, a verification link has been sent to your email',
      style: 'dark',
    })

    return router.push('/sign-in')
  }

  return (
    <form
      action={registerUserAction}
      className="max-sm:w-full flex flex-col gap-5 sm:w-[400px]"
    >
      <Input
        required
        name="name"
        label="Name"
        placeholder="John Doe"
        icon={IdCard}
        variant="big"
        autoComplete="new-password"
      />
      <Input
        required
        name="email"
        type="email"
        label="E-mail"
        placeholder="johndoe@example.com"
        icon={Mail}
        variant="big"
        autoComplete="new-password"
      />
      <Input
        required
        name="password"
        type="password"
        label="Password"
        placeholder="*************"
        icon={Lock}
        variant="big"
        autoComplete="new-password"
      />
      <Button type="submit" title="Continue" variant="big" />
    </form>
  )
}

export { SignUpForm }
