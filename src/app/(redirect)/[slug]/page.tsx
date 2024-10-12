import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { headers } from 'next/headers'
import { RedirectForm } from '../_components/redirect-form'
import { notFound, redirect } from 'next/navigation'
import { UAParser } from 'ua-parser-js'
import { getCountry, getIp } from '@/utils/network'
import { createClick } from '@/utils/db'

export type RedirectLinkType = Prisma.LinkGetPayload<{
  include: { domain: true; util: true }
}>

const RedirectPage = async ({
  params: { slug },
}: {
  params: { slug: string }
}) => {
  const host = headers().get('host') as string
  const referer = headers().get('referer') as string
  const userAgent = headers().get('user-agent') as string
  const { browser, device, os } = new UAParser(userAgent).getResult()
  const country = await getCountry()
  const ip = getIp()

  const findDomainByHost = await prisma.domain.findUnique({
    where: { domainName: host },
  })

  let findLinkBySlug: RedirectLinkType | null

  if (findDomainByHost && findDomainByHost?.domainName === host) {
    findLinkBySlug = await prisma.link.findFirst({
      where: {
        slug,
        domain: {
          domainName: findDomainByHost.domainName,
        },
      },
      include: {
        domain: true,
        util: true,
      },
    })
  } else {
    findLinkBySlug = await prisma.link.findFirst({
      where: { slug, domain: null },
      include: {
        domain: true,
        util: true,
      },
    })
  }

  if (!findLinkBySlug) return notFound()

  const clickData: Prisma.ClickUncheckedCreateInput = {
    linkId: findLinkBySlug.id,
    ip,
    country,
    browser: browser.name,
    device: device.type === 'mobile' ? 'Mobile' : 'Desktop',
    platform: os.name,
    redirectedBy: referer,
  }

  if (findLinkBySlug?.util?.password) {
    return (
      <main className="flex h-screen bg-gradient-to-b from-neutrals-12 to-dark">
        <div className="px-5 flex flex-col gap-5 flex-1 items-center justify-center">
          <RedirectForm clickData={clickData} link={findLinkBySlug} />
        </div>
      </main>
    )
  }

  await createClick(clickData)

  return redirect(findLinkBySlug.url)
}

export default RedirectPage
