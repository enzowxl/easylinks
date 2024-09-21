import clsx from 'clsx'
import Image from 'next/image'

interface LogoType {
  noText?: boolean
  width?: number
  height?: number
  className?: string
}

const Logo = ({ noText, width, height, className }: LogoType) => {
  return (
    <div className={clsx('flex items-center gap-1.5', className)}>
      <Image
        className={`w-[30px] h-[30px]`}
        src={require('../../public/easylinks.png')}
        alt="logo"
        width={100}
        height={100}
      />
      {!noText && (
        <h5 className="font-bold">
          easy
          <p className="bg-gradient-to-r from-purple-primary-300 to-purplePrimary inline-block text-transparent bg-clip-text">
            links.
          </p>
        </h5>
      )}
    </div>
  )
}

export { Logo }
