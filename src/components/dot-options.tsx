import { Ellipsis } from 'lucide-react'

interface DotOptionsType {}

const DotOptions = ({}: DotOptionsType) => {
  return (
    <button className="hover:scale-105 duration-500 rounded-xl px-2 py-1 bg-neutrals-12 border border-neutrals-10">
      <Ellipsis />
    </button>
  )
}

export { DotOptions }
