import dayjs from 'dayjs'
import { ChartConfig } from '../../ui/chart'
import { ChartType } from '../chart'

const colorPalette = [
  '#7C7AFF',
  '#B5B2FF',
  '#44438C',
  '#9695FF',
  '#CDCBFF',
  '#5857B5',
  '#A5A2E8',
  '#34336B',
  '#E8E7FF',
]

const monthOrder = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const weekOrder = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const generateChartConfig = (keys: string[]) => {
  return keys.reduce((config, key, index) => {
    config[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: colorPalette[index % colorPalette.length],
    }
    return config
  }, {} as ChartConfig)
}

const transformChartData = (
  clicks: { createdAt: Date; device?: string; linkId: string }[],
  dateType: string,
  type: ChartType,
  linkIdToSlugMap?: Record<string, string>,
) => {
  const counts: Record<string, { [key: string]: number }> = {}

  clicks.forEach((click) => {
    let key: string

    switch (dateType) {
      case 'this-week':
        key = dayjs(click.createdAt).format('dddd')
        break
      case 'this-month':
        key = dayjs(click.createdAt).format('DD')
        break
      case 'this-year':
        key = dayjs(click.createdAt).format('MMMM')
        break
      default:
        key = dayjs(click.createdAt).format('MMMM')
        break
    }

    const keyValue =
      type === 'devices'
        ? click.device || 'Unknown'
        : linkIdToSlugMap?.[click.linkId] || 'Unknown'

    if (!counts[key]) {
      counts[key] = {}
    }

    counts[key][keyValue] = (counts[key][keyValue] || 0) + 1
  })

  let order: string[] | undefined

  switch (dateType) {
    case 'this-year':
      order = monthOrder
      break
    case 'this-week':
      order = weekOrder
      break
  }

  return Object.keys(counts)
    .sort((a, b) =>
      order ? order.indexOf(a) - order.indexOf(b) : Number(a) - Number(b),
    )
    .map((key) => ({
      key,
      ...counts[key],
    }))
}

export { transformChartData, generateChartConfig }
