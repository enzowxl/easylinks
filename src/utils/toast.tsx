import { Button } from '@/components/button'
import toasting from 'react-hot-toast'

type StyleType = 'dark' | 'subdark'

const darkColor = '#09090B'
const subDarkColor = '#131315'

type ToastTypesRequired = {
  type: 'error' | 'success'
  message: string
  style: StyleType
  closeButton?: {
    title: string
    onClick: () => void
  }
}

type ToastTypesNotRequired = {
  type: 'remove'
}

type ToastTypes = ToastTypesRequired | ToastTypesNotRequired

const toastConfig = (style: StyleType) => {
  return {
    duration: 5000,
    className: 'border',
    style: {
      backgroundColor: style === 'dark' ? darkColor : subDarkColor,
      color: 'white',
      borderColor: style === 'dark' ? subDarkColor : darkColor,
    },
  }
}

const toast = (options: ToastTypes) => {
  if (options.type !== 'remove') {
    return toasting[options.type](
      options.closeButton
        ? (toastProps) => {
            return (
              <div className="flex items-center gap-5">
                {options.message}

                <Button
                  classnamecontainer="!p-5 text-sm"
                  onClick={() => {
                    options.closeButton?.onClick()
                    return toasting.dismiss(toastProps.id)
                  }}
                  title={options.closeButton?.title}
                />
              </div>
            )
          }
        : options.message,
      toastConfig(options.style),
    )
  } else {
    toasting[options.type]()
  }
}

export { toast }
