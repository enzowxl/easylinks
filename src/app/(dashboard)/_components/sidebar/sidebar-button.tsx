import { useSheetStore } from '@/providers/sheet-provider'
import clsx from 'clsx'
import { LucideProps } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SideBarButtonType {
  title?: string
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  href: string
  active: string[]
}

const SideBarButton = (props: SideBarButtonType) => {
  const { dispatch } = useSheetStore((state) => state)

  const pathName = usePathname()

  const active = props.active.some((route) => {
    if (route.includes('[id]')) {
      const baseRoute = route.split('[id]')[0]
      return pathName.startsWith(baseRoute)
    }
    return pathName === route
  })

  const onClick = () => {
    dispatch.closeSheet()
  }

  return (
    <Link
      className={clsx(
        'max-sm:text-sm w-full flex items-center border duration-500 gap-2.5 cursor-pointer px-2.5 py-1.5 rounded-lg',
        active
          ? 'border-purple-primary-500 bg-gradient-to-r from-purplePrimary to-purple-primary-800'
          : 'border-neutrals-12 hover:border hover:border-neutrals-11 hover:from-neutrals-12 hover:to-neutrals-13 bg-gradient-to-r',
      )}
      {...props}
      onClick={onClick}
    >
      {props.icon && <props.icon className="max-sm:w-4 max-sm:h-4 w-5 h-5" />}
      {props.title}
    </Link>
  )
}

export { SideBarButton }
