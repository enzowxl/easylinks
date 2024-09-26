import { User } from '@prisma/client'
import Image from 'next/image'

interface SideBarUserMenuType {
  user: User | null
}

const SideBarUserMenu = async ({ user }: SideBarUserMenuType) => {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        className="bg-dark w-6 h-6 rounded-full object-contain"
        src={
          'https://purepng.com/public/uploads/large/purepng.com-thinking-manthinking-manpersongentle-men-thinkingthinking-brain-1421526976458gpxqy.png'
        }
        alt="user"
        width={100}
        height={100}
      />
      <h5>{user?.name}</h5>
    </div>
  )
}

export { SideBarUserMenu }
