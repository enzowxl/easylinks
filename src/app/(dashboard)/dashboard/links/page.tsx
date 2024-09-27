import { NavAuth } from '@/app/(dashboard)/_components/nav-auth'
import { LinkList } from './_components/link-list'
import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'

export async function generateMetadata() {
  return {
    title: 'Links',
  }
}

const LinksPage = async () => {
  const session = await auth()

  const links = await prisma.link.findMany({
    where: { userId: session?.user.sub },
    include: {
      domain: true,
    },
  })

  return (
    <div className="flex flex-col">
      <NavAuth title="Links" />

      <LinkList links={links} />
    </div>
  )
}

export default LinksPage
