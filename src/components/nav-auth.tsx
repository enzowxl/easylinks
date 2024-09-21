import { Menu } from 'lucide-react'

interface NavAuthType {
  title: string
}

const NavAuth = ({ title }: NavAuthType) => {
  return (
    <nav className="border-b border-neutrals-12 flex justify-between items-center px-5 py-3 w-full">
      <h2 className="font-bold text-lg">{title}</h2>

      <div className="sm:hidden">
        <Menu className="w-5 h-5" />
      </div>
    </nav>
  )
}

export { NavAuth }
