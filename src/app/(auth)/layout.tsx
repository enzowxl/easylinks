import '@/app/globals.css'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

const AuthLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const session = await auth()

  if (session?.user) return redirect('/dashboard')

  return (
    <main className="flex h-screen bg-gradient-to-b from-neutrals-12 to-dark">
      {children}
    </main>
  )
}

export default AuthLayout
