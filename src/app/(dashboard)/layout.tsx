import type { Metadata } from 'next'
import { SideBar } from '@/app/(dashboard)/_components/sidebar/sidebar'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | easylinks',
    default: 'easylinks',
  },
}

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="flex h-screen bg-neutrals-12">
      <SideBar />
      <main className="lg:p-5 duration-500 flex-1 h-full overflow-hidden">
        <div className="lg:rounded-lg bg-dark h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
