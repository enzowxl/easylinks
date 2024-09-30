import toasting from 'react-hot-toast'

type StyleType = 'dark' | 'subdark'

type ToastTypesRequired = {
  type: 'error' | 'success'
  message: string
  style: StyleType
}

type ToastTypesNotRequired = {
  type: 'remove'
}

type ToastTypes = ToastTypesRequired | ToastTypesNotRequired

const toastConfig = (style: StyleType) => {
  const darkColor = '#09090B'
  const subDarkColor = '#131315'
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
    return toasting[options.type](options.message, toastConfig(options.style))
  } else {
    toasting[options.type]()
  }
}

export { toast }
