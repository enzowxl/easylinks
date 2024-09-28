import { NavAuth } from '@/app/(dashboard)/_components/nav-auth'
import { DomainList } from './_components/domain-list'
// import { auth } from '@/auth'
// import { prisma } from '@/lib/prisma'

export async function generateMetadata() {
  return {
    title: 'Domains',
  }
}

const DomainsPage = async () => {
  // const session = await auth()

  // const domains = await prisma.domain.findMany({
  //   where: { userId: session?.user.sub },
  // })

  // const response = await fetch(
  //   'https://api.vercel.com/v9/projects/easylinks/domains',
  //   {
  //     headers: {
  //       Authorization: `Bearer ${process.env.VERCEL}`,
  //     },
  //     method: 'GET',
  //   },
  // )

  return (
    <div className="flex flex-col">
      <NavAuth title="Domains" />

      <DomainList domains={[]} />
    </div>
  )
}

export default DomainsPage
