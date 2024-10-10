import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

const RedirectPage = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  const log = []
  const headersList = headers()
  const host = headersList.get('host')

  const findDomainByHost = await prisma.domain.findUnique({
    where: { domainName: host || undefined },
  })

  let findLinkBySlug

  if (findDomainByHost) {
    findLinkBySlug = await prisma.link.findUnique({
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
    log.push('o link tem dominio')
  } else {
    findLinkBySlug = await prisma.link.findUnique({
      where: { slug },
      include: {
        domain: true,
      },
    })
    log.push('o link nao tem dominio')
  }

  if (findLinkBySlug?.domain) {
    if (findDomainByHost?.domainName !== host) {
      log.push('nao tem dominio igual')
    }
  }

  if (!findLinkBySlug) {
    log.push('nao achou o link')
  }

  return (
    <div>
      <p>host: {host}</p>
      <br />
      <pre>findLinkBySlug: {JSON.stringify(findLinkBySlug, null, 2)}</pre>
      <br />
      <pre>findDomainByHost: {JSON.stringify(findDomainByHost, null, 2)}</pre>
      <br />
      <p>{log.join(', ')}</p>
    </div>
  )
}

export default RedirectPage
