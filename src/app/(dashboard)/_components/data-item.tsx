import { calculatePercentage } from '@/utils/calculate-percentage'

const PercentageItem = ({
  total,
  value,
  label,
}: {
  total: number
  value: number
  label: string
}) => {
  const percentage = calculatePercentage({
    total,
    value,
  })

  return (
    <div className="flex relative justify-between bg-dark rounded-lg w-full p-2.5">
      <h5 className="z-50">{label}</h5>
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

const DataItem = ({
  title,
  totalClicks,
  percentageItems,
}: {
  title: string
  totalClicks: number
  percentageItems: {
    value: number
    label: string
  }[]
}) => {
  return (
    <div className="gap-5 flex flex-col bg-neutrals-12 w-full rounded-lg p-5">
      <h2 className="font-bold text-lg">{title}</h2>
      <div className="flex flex-col gap-2.5">
        {percentageItems?.length > 0 ? (
          percentageItems.map(({ value, label }, index) => (
            <PercentageItem
              key={index}
              total={totalClicks}
              value={value}
              label={label}
            />
          ))
        ) : (
          <h4 className="text-neutrals-6">No existing data</h4>
        )}
      </div>
    </div>
  )
}

export { DataItem }
