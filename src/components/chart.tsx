'use client'

import {
  // Area, AreaChart,
  CartesianGrid,
  XAxis,
  BarChart,
  Bar,
} from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import dayjs from 'dayjs'
import { LinkType } from '@/app/(dashboard)/dashboard/links/[linkId]/_components/link-data'

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

const generateChartConfig = (keys: string[]) => {
  return keys.reduce((config, key, index) => {
    config[key] = {
      label: key.charAt(0).toUpperCase() + key.slice(1),
      color: colorPalette[index % colorPalette.length],
    }
    return config
  }, {} as ChartConfig)
}

const transformChartData = (clicks: { createdAt: Date; device?: string }[]) => {
  const monthCounts: Record<string, { [device: string]: number }> = {}

  clicks.forEach((click) => {
    const month = dayjs(click.createdAt).format('MMMM')
    const device = click.device || 'Unknown'

    if (!monthCounts[month]) {
      monthCounts[month] = {}
    }

    monthCounts[month][device] = (monthCounts[month][device] || 0) + 1
  })

  return Object.keys(monthCounts)
    .sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b))
    .map((month) => ({
      month,
      ...monthCounts[month],
    }))
}

const Chart = ({ link }: { link: LinkType }) => {
  const chartData = transformChartData(link.clicks)
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
          dataKey="month"
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
