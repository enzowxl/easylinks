import { Logo } from '@/components/logo'
import Link from 'next/link'
import { SignInForm } from './_components/sign-in-form'

const SignInPage = async () => {
  return (
    <div className="px-5 flex flex-col gap-5 flex-1 items-center justify-center">
      <Link href={'/'}>
        <Logo width={50} height={50} noText />
      </Link>
      <h3 className="max-sm:text-xl text-2xl font-bold text-center">
        Login to easy<p className="text-purplePrimary inline-block">links.</p>
      </h3>
      <SignInForm />
      <h5 className="max-sm:text-sm text-center">
        Forgot your password?{' '}
        <Link href={'/recover-password'} className="text-purplePrimary">
          Recover
        </Link>
      </h5>
      <h5 className="max-sm:text-sm text-center">
        Don&apos;t have an account?{' '}
        <Link href={'/sign-up'} className="text-purplePrimary">
          Sign Up
        </Link>
      </h5>
    </div>
  )
}

export default SignInPage
