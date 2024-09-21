import clsx from 'clsx'
import { LucideProps } from 'lucide-react'

interface SideBarButtonType {
  title?: string
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  status?: 'active'
}

const SideBarButton = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & SideBarButtonType,
) => {
  return (
    <button
      className={clsx(
        'w-full flex items-center duration-500 border border-transparent gap-2.5 cursor-pointer px-2.5 py-1.5 rounded-lg',
        props.status
          ? 'border border-purple-primary-500 bg-gradient-to-r from-purplePrimary to-purple-primary-800'
          : 'hover:border hover:border-neutrals-11 hover:from-neutrals-12 hover:to-neutrals-13 bg-gradient-to-r',
      )}
      {...props}
    >
      {props.icon && <props.icon className="w-5 h-5" />}
      {props.title}
    </button>
  )
}

export { SideBarButton }
