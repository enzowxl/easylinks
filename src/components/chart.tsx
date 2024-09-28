import { CartesianGrid, XAxis, BarChart, Bar } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import dayjs from 'dayjs'
import { LinkType } from '@/app/(dashboard)/dashboard/links/[linkId]/page'

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
  clicks: { createdAt: Date; device?: string }[],
  dateType: string,
) => {
  const counts: Record<string, { [device: string]: number }> = {}

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

    const device = click.device || 'Unknown'
    if (!counts[key]) {
      counts[key] = {}
    }
    counts[key][device] = (counts[key][device] || 0) + 1
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

const Chart = ({ link, dateType }: { link: LinkType; dateType: string }) => {
  const chartData = transformChartData(link.clicks, dateType)
  const devices = Array.from(
    new Set(link.clicks.map((click) => click.device || 'Unknown')),
  )
  const chartConfig = generateChartConfig(devices)

  return (
    <ChartContainer className="max-h-96 w-full" config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 20,
          right: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={'key'}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent className="bg-dark" indicator="line" />}
        />
        {devices.map((device) => (
          <Bar
            key={device}
            dataKey={device}
            type="natural"
            fill={chartConfig[device]?.color}
            fillOpacity={0.4}
            stroke={chartConfig[device]?.color}
            stackId="a"
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}

export { Chart }
