import { DotOptions } from '@/components/dot-options'
import { Check, Delete, Edit, X } from 'lucide-react'
import { DomainsType } from './domain-list'
import clsx from 'clsx'
import { DropdownMenu } from '@/components/dropdown-menu'
import { ModalDeleteDomain } from './modal-delete-domain'
import { useModalStore } from '@/providers/modal-provider'
import { ModalEditDomain } from './modal-edit-domain'
import { isPremiumType } from '@/utils/verify'

const DomainItem = ({
  domain,
  premium,
}: {
  domain: DomainsType
  premium: isPremiumType
}) => {
  const { dispatch } = useModalStore((state) => state)

  const Icon = domain.misconfigured ? X : Check

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

  const dropDownMenuGroups = [
    {
      items: [
        {
          icon: Edit,
          label: 'Edit',
          onClick: () =>
            dispatch.openModal(<ModalEditDomain domain={domain} />),
        },
        {
          icon: Delete,
          label: 'Delete',
          onClick: () =>
            dispatch.openModal(<ModalDeleteDomain domain={domain} />),
        },
      ],
    },
  ]

  return (
    <div>
      <div
        className={clsx(
          'max-sm:flex-col max-sm:text-center gap-5 flex justify-between items-center bg-neutrals-12 w-full p-5',
          domain.misconfigured ? 'rounded-t-lg' : 'rounded-lg',
        )}
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex gap-2 items-center">
            <h2 className="max-sm:text-base font-bold text-lg">
              {domain.domainName}
            </h2>
            {!premium && (
              <p className="max-sm:text-xs text-sm text-neutrals-6">
                (Disabled)
              </p>
            )}
          </div>
          <div className="max-[320px]:flex-col flex items-center gap-2.5">
            <Icon
              className={clsx(
                'max-[320px]:hidden w-5 h-5 p-0.5 rounded-full',
                domain.misconfigured ? 'bg-red-500' : 'bg-purplePrimary',
              )}
            />
            <h5 className="max-sm:text-sm">
              {domain.misconfigured ? 'Invalid' : 'Valid'} Configuration
            </h5>
          </div>
        </div>
        <DropdownMenu groups={dropDownMenuGroups}>
          <DotOptions />
        </DropdownMenu>
      </div>
      {domain.misconfigured && (
        <div className="flex flex-col gap-5 border rounded-b-lg border-neutrals-12 p-5">
          <h5>DNS - A Record</h5>
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
