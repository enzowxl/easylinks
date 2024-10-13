'use client'

import { Button } from '@/components/button'
import { subscribeUser } from '@/utils/stripe'
import { toast } from '@/utils/toast'
import { useRouter } from 'next/navigation'

const SideBarPlan = () => {
  const router = useRouter()

  const createSubscriptionAction = async () => {
    const responseAction = await subscribeUser()

    if (responseAction?.error) {
      return toast({
        type: 'error',
        message: responseAction.error,
        style: 'dark',
      })
    }

    return router.push(responseAction.response as string)
  }

  return (
    <div className="flex flex-col items-center gap-3.5 bg-neutrals-11 rounded-lg px-3 py-5 text-center">
      <h4 className="text-lg font-medium">Optimize Your Experience</h4>
      <p className="text-neutrals-6">
        Improve your experience by improving your plan
      </p>
      <Button onClick={createSubscriptionAction} title="Upgrade" />
    </div>
  )
}

export { SideBarPlan }
