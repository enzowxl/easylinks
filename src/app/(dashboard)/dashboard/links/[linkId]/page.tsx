'use client'

import { Input } from '@/components/input'
import { NavAuth } from '@/app/(dashboard)/_components/nav-auth'
import { Calendar } from 'lucide-react'
import { Chart } from '@/components/chart'
import { DataItem } from '@/app/(dashboard)/_components/data-item'

const LinkPage = () => {
  return (
    <div className="flex flex-col">
      <NavAuth title="Links" />

      <div className="flex flex-col gap-8 py-5">
        <div className="max-sm:flex-col flex justify-between gap-5 px-5">
          <div>
            <h3 className="font-bold text-2xl text-neutrals-6 flex">
              easylinks.com/<p className="text-white">slug</p>
            </h3>
            <h5 className="text-neutrals-6">My link description</h5>
          </div>

          <Input
            classNameContainer="max-sm:w-full"
            placeholder="Select date"
            icon={Calendar}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <Chart />
          <div className="max-lg:grid-cols-1 gap-5 grid grid-cols-2 px-5">
            <div className="flex flex-col gap-5">
              <DataItem />
            </div>
            <div className="flex flex-col gap-5">
              <DataItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinkPage
