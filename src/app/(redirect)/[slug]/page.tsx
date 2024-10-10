import { prisma } from '@/lib/prisma'
import { getIp } from '@/utils/headers'
import { Prisma } from '@prisma/client'
import { headers } from 'next/headers'

type RedirectLinkType = Prisma.LinkGetPayload<{
  include: { domain: true }
}>

const RedirectPage = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  const log = []
  const headersList = headers()
  const host = headersList.get('host') as string
  const protocol = headersList.get('x-forwarded-proto')
  const ip = getIp()

  const findDomainByHost = await prisma.domain.findUnique({
    where: { domainName: host },
  })

  let findLinkBySlug: RedirectLinkType | null

  if (findDomainByHost && findDomainByHost?.domainName === host) {
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
      where: { slug, domain: null },
      include: {
        domain: true,
      },
    })
    log.push('o link nao tem dominio')
  }

  if (!findLinkBySlug) {
    log.push('nao achou o link')
  }

  return (
    <div>
      <p>host: {host}</p>
      <p>ip: {ip}</p>
      <p>protocol: {protocol}</p>
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
