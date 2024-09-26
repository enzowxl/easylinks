import { Logo } from '@/components/logo'
import Link from 'next/link'
import { SignUpForm } from './_components/sign-up-form'

const SignUpPage = async () => {
  return (
    <div className="px-5 flex flex-col gap-5 flex-1 items-center justify-center">
      <Link href={'/'}>
        <Logo width={50} height={50} noText />
      </Link>
      <h3 className="text-2xl font-bold text-center">
        Create your easy
        <p className="text-purplePrimary inline-block">links.</p>
      </h3>
      <SignUpForm />
      <h5 className="text-center">
        Do you already have an account?{' '}
        <Link href={'/sign-in'} className="text-purplePrimary">
          Sign In
        </Link>
      </h5>
    </div>
  )
}

export default SignUpPage
