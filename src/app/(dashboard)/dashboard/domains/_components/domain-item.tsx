import { DotOptions } from '@/components/dot-options'
import clsx from 'clsx'
import { Check, X } from 'lucide-react'

const DomainItem = ({
  domain,
  misconfigured,
}: {
  domain: string
  misconfigured?: boolean
}) => {
  const Icon = misconfigured ? X : Check

  const configurations = [
    {
      label: 'Type',
      value: 'A',
    },
    {
      label: 'Name',
      value: '@',
    },
    {
      label: 'Value',
      value: '76.76.21.21',
    },
  ]

  return (
    <div>
      <div
        className={clsx(
          'max-sm:flex-col max-sm:text-center gap-5 flex justify-between items-center bg-neutrals-12 w-full p-5',
          misconfigured ? 'rounded-t-lg' : 'rounded-lg',
        )}
      >
        <div className="flex flex-col gap-1.5">
          <h2 className="font-bold text-lg">{domain}</h2>
          <div className="max-[320px]:flex-col flex items-center gap-2.5">
            <Icon
              className={clsx(
                'w-5 h-5 p-0.5 rounded-full',
                misconfigured ? 'bg-red-500' : 'bg-purplePrimary',
              )}
            />
            <h5>{misconfigured ? 'Invalid' : 'Valid'} Configuration</h5>
          </div>
        </div>
        <DotOptions />
      </div>
      {misconfigured && (
        <div className="flex flex-col gap-5 border rounded-b-lg border-neutrals-12 p-5">
          <h5>A Record</h5>
          <div className="bg-neutrals-12 rounded-lg p-5">
            <div className="max-[320px]:flex-col flex gap-5">
              {configurations.map((configuration, index) => {
                return (
                  <div key={index}>
                    <h5 className="text-neutrals-6">{configuration.label}</h5>
                    <h5>{configuration.value}</h5>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export { DomainItem }
