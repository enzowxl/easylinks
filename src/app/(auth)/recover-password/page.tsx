import { Logo } from '@/components/logo'
import Link from 'next/link'
import { RecoverPasswordForm } from './_components/recover-password-form'

const RecoverPasswordPage = async () => {
  return (
    <div className="px-5 flex flex-col gap-5 flex-1 items-center justify-center">
      <Link href={'/'}>
        <Logo width={50} height={50} noText />
      </Link>
      <h3 className="text-2xl font-bold text-center">
        Recover your{' '}
        <p className="text-purplePrimary inline-block">password.</p>
      </h3>
      <RecoverPasswordForm />
    </div>
  )
}

export default RecoverPasswordPage
