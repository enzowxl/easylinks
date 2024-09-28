import {
  DropdownMenu as DropDownMenuContainer,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LucideProps } from 'lucide-react'
import React, { ReactNode } from 'react'

const DropdownMenu = ({
  children,
  label,
  groups,
}: {
  children: ReactNode
  label?: string
  groups: {
    items: {
      icon?: React.ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
      >
      label: string
      onClick: () => void
    }[]
  }[]
}) => {
  return (
    <DropDownMenuContainer>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {label && (
          <React.Fragment>
            <DropdownMenuLabel>{label}</DropdownMenuLabel>
            <DropdownMenuSeparator />
          </React.Fragment>
        )}
        {groups &&
          groups.map((group, index) => {
            return (
              <React.Fragment key={index}>
                <DropdownMenuGroup>
                  {group.items.map((item, index) => (
                    <React.Fragment key={index}>
                      <DropdownMenuItem
                        className="flex items-center gap-2.5"
                        onClick={item.onClick}
                      >
                        {item.icon && <item.icon className="w-4 h-4" />}
                        {item.label}
                      </DropdownMenuItem>
                      {group.items.length !== index + 1 &&
                        groups.length === 1 && <DropdownMenuSeparator />}
                    </React.Fragment>
                  ))}
                </DropdownMenuGroup>
                {groups.length !== index + 1 && <DropdownMenuSeparator />}
              </React.Fragment>
            )
          })}
      </DropdownMenuContent>
    </DropDownMenuContainer>
  )
}

export { DropdownMenu }
