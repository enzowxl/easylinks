import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'

const RedirectPage = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  const headersList = headers()
  const host = headersList.get('host')

  const findDomainByHost = await prisma.domain.findUnique({
    where: { domainName: host || undefined },
  })

  let findLinkBySlug

  if (findDomainByHost) {
    await prisma.link.findUnique({
      where: {
        slug,
        domain: {
          domainName: findDomainByHost.domainName,
        },
      },
      include: {
        domain: true,
      },
    })
  } else {
    findLinkBySlug = await prisma.link.findUnique({
      where: { slug },
      include: {
        domain: true,
      },
    })
  }

  if (findLinkBySlug?.domain) {
    if (findDomainByHost?.domainName !== host) {
      return notFound()
    }
  }

  if (!findLinkBySlug) return notFound()

  return (
    <div>
      host: {host}
      <pre>findLinkBySlug: {JSON.stringify(findLinkBySlug, null, 2)}</pre>
      <pre>findDomainByHost: {JSON.stringify(findDomainByHost, null, 2)}</pre>
    </div>
  )
}

export default RedirectPage
