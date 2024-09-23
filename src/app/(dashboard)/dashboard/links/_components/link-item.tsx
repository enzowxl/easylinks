import { DotOptions } from '@/components/dot-options'

const LinkItem = () => {
  return (
    <div className="max-sm:flex-col max-sm:text-center gap-5 flex justify-between items-center bg-neutrals-12 w-full rounded-lg p-5">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-bold text-lg">Link title</h2>
        <h5 className="text-neutrals-6 flex">
          easylinks.com/<p className="text-white">slug</p>
        </h5>
        <h5 className="text-neutrals-6">https://website.com</h5>
      </div>
      <DotOptions />
    </div>
  )
}

export { LinkItem }
