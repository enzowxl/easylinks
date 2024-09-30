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
    try {
      await registerUser(formData)

      toast({
        type: 'success',
        message: 'Successfully registered',
        style: 'dark',
      })

      return router.push('/sign-in')
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
    <form
      action={registerUserAction}
      className="max-sm:w-full flex flex-col gap-5 sm:w-[400px]"
    >
      <Input
        name="name"
        label="Name"
        placeholder="John Doe"
        icon={IdCard}
        variant="big"
      />
      <Input
        name="email"
        type="email"
        label="E-mail"
        placeholder="johndoe@example.com"
        icon={Mail}
        variant="big"
      />
      <Input
        name="password"
        type="password"
        label="Password"
        placeholder="*************"
        icon={Lock}
        variant="big"
      />
      <Button type="submit" title="Continue" variant="big" />
    </form>
  )
}

export { SignUpForm }
