import Image from 'next/image'

interface UserMenuType {
  noText?: boolean
}

const UserMenu = ({ noText }: UserMenuType) => {
  return (
    <div className="flex items-center gap-2.5">
      <Image
        className="w-6 h-6 rounded-full bg-neutrals-12 object-contain"
        src={
          'https://purepng.com/public/uploads/large/purepng.com-thinking-manthinking-manpersongentle-men-thinkingthinking-brain-1421526976458gpxqy.png'
        }
        alt="user"
        width={100}
        height={100}
      />
      {!noText && <h5>Enzo Almeida</h5>}
    </div>
  )
}

export { UserMenu }
