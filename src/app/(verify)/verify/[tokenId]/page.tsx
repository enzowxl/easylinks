'use server'

import { authorizeToken } from '@/utils/db'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { RecoverPasswordForm } from '../_components/recover-password-form'

const VerifyPage = async ({
  params: { tokenId },
}: {
  params: { tokenId: string }
}) => {
  const token = await authorizeToken(tokenId)
  const protocol = headers().get('x-forwarded-proto') as string
  const baseUrl = protocol + '://' + process.env.NEXTAUTH_DOMAIN

  if (token.type === 'RECOVER_PASSWORD') {
    return (
      <main className="flex h-screen bg-gradient-to-b from-neutrals-12 to-dark">
        <div className="px-5 flex flex-col gap-5 flex-1 items-center justify-center">
          <RecoverPasswordForm token={token} />
        </div>
      </main>
    )
  }

  return redirect(baseUrl + '/sign-in')
}

export default VerifyPage
