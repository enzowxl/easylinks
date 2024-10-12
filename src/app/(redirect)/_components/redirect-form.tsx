'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import { Lock } from 'lucide-react'
import { RedirectLinkType } from '../[slug]/page'
import { Prisma } from '@prisma/client'
import { authorizeRedirect, createClick } from '@/utils/db'
import { useRouter } from 'next/navigation'
import { toast } from '@/utils/toast'

const RedirectForm = ({
  link,
  clickData,
}: {
  link: RedirectLinkType
  clickData: Prisma.ClickUncheckedCreateInput
}) => {
  const router = useRouter()

  const redirectAction = async (formData: FormData) => {
    const responseAction = await authorizeRedirect(link.id, formData)

    if (responseAction?.error) {
      return toast({
        type: 'error',
        message: responseAction.error,
        style: 'dark',
      })
    }

    await createClick(clickData)

    return router.push(link.url)
  }

  return (
    <form
      action={redirectAction}
      className="max-sm:w-full flex flex-col gap-5 sm:w-[400px]"
    >
      <Input
        required
        type="password"
        name="password"
        label="Password"
        placeholder="**********"
        variant="big"
        icon={Lock}
      />
      <Button title="Go" variant="big" />
    </form>
  )
}

export { RedirectForm }
