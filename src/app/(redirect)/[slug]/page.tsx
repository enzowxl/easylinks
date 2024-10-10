import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

const RedirectPage = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  let a
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
    a = 'o link tem dominio'
  } else {
    findLinkBySlug = await prisma.link.findUnique({
      where: { slug },
      include: {
        domain: true,
      },
    })
    a = 'o link nao tem dominio'
  }

  if (findLinkBySlug?.domain) {
    if (findDomainByHost?.domainName !== host) {
      a = 'nao tem dominio igual'
    }
  }

  if (!findLinkBySlug) {
    a = 'nao achou o link'
  }

  return (
    <div>
      host: {host}
      <pre>findLinkBySlug: {JSON.stringify(findLinkBySlug, null, 2)}</pre>
      <pre>findDomainByHost: {JSON.stringify(findDomainByHost, null, 2)}</pre>
      <p>{a}</p>
    </div>
  )
}

export default RedirectPage
