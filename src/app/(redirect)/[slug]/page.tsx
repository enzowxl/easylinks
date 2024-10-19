import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { headers } from 'next/headers'
import { RedirectForm } from '../_components/redirect-form'
import { notFound, redirect } from 'next/navigation'
import { UAParser } from 'ua-parser-js'
import { getCountry, getIp } from '@/utils/network'
import { createClick } from '@/utils/db'
// import { isPremium } from '@/utils/verify'

export type RedirectLinkType = Prisma.LinkGetPayload<{
  include: { domain: true; util: true }
}>

const getLinkBySlugAndHost = async (slug: string, host: string) => {
  const findDomainByHost = await prisma.domain.findUnique({
    where: { domainName: host },
  })

  const linkConditions = findDomainByHost
    ? { slug, domain: { domainName: findDomainByHost.domainName } }
    : { slug, domain: null }

  const findLinkByConditions = await prisma.link.findFirst({
    where: linkConditions,
    include: {
      domain: true,
      util: true,
    },
  })

  if (!findLinkByConditions) return notFound()

  // if (findLinkByConditions.domain?.domainName) {
  //   const premium = isPremium()

  //   if (!premium) return notFound()
  // }

  return findLinkByConditions
}

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

  const link = await getLinkBySlugAndHost(slug, host)

  const clickData: Prisma.ClickUncheckedCreateInput = {
    linkId: link.id,
    ip,
    country,
    browser: browser.name,
    device: device.type === 'mobile' ? 'Mobile' : 'Desktop',
    platform: os.name,
    redirectedBy: referer,
  }

  if (link?.util?.password) {
    return (
      <main className="flex h-screen bg-gradient-to-b from-neutrals-12 to-dark">
        <div className="px-5 flex flex-col gap-5 flex-1 items-center justify-center">
          <RedirectForm clickData={clickData} link={link} />
        </div>
      </main>
    )
  }

  await createClick(clickData)

  return redirect(link.url)
}

export default RedirectPage
