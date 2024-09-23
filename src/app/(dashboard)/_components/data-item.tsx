import { formatPercentage } from '@/utils/format-percentage'

const PercentageItem = ({ total, value }: { total: number; value: number }) => {
  const percentage = formatPercentage({
    total,
    value,
  })

  return (
    <div className="flex relative justify-between bg-dark rounded-lg w-full p-2.5">
      <h5 className="z-50">Opa</h5>
      <h5 className="z-50">{percentage}%</h5>
      <div
        style={{
          width: `${percentage}%`,
        }}
        className="absolute left-0 top-0 bottom-0 items-center bg-purplePrimary rounded-lg"
      />
    </div>
  )
}

const DataItem = () => {
  return (
    <div className="gap-5 flex flex-col bg-neutrals-12 w-full rounded-lg p-5">
      <h2 className="font-bold text-lg">Link title</h2>
      <div className="flex flex-col gap-2.5">
        <PercentageItem total={100} value={5} />
      </div>
    </div>
  )
}

export { DataItem }
