import { NavButtonMenu } from './nav-button-menu'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

interface NavAuthType {
  title: string
}

const NavAuth = async ({ title }: NavAuthType) => {
  const session = await auth()

  const user = await prisma.user.findUnique({
    where: { id: session?.user.sub },
  })

  if (!session || !user) return notFound()

  return (
    <nav className="border-b border-neutrals-12 flex justify-between items-center px-5 py-3 w-full">
      <h4 className="font-bold text-lg">{title}</h4>

      <NavButtonMenu user={user} />
    </nav>
  )
}

export { NavAuth }
