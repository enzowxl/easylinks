'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { useRouter } from 'next/navigation'
import { Lock, Mail } from 'lucide-react'
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

const SignInForm = () => {
  const router = useRouter()

  const authenticateUserAction = async (formData: FormData) => {
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })

    if (response?.code) {
      return toast.error(response.code, toastConfig)
    }

    toast.remove()

    return router.push('/dashboard')
  }

  return (
    <form
      action={authenticateUserAction}
      className="max-sm:w-full flex flex-col gap-5 sm:w-[400px]"
    >
      <Input
        type="email"
        name="email"
        label="E-mail"
        placeholder="johndoe@example.com"
        icon={Mail}
        variant="big"
      />
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="*************"
        icon={Lock}
        variant="big"
      />
      <Button title="Continue" variant="big" />
    </form>
  )
}

export { SignInForm }
