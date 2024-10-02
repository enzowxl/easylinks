import { SideBar } from '@/app/(dashboard)/_components/sidebar/sidebar'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import '@/app/globals.css'

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const session = await auth()

  if (!session?.user) return redirect('/sign-in')

  return (
    <div className="flex h-screen bg-neutrals-12">
      <SideBar />
      <main className="lg:p-5 !pl-0 duration-500 flex-1 h-full overflow-hidden">
        {children}
      </main>
    </div>
  )
}

export default DashboardLayout
