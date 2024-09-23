'use client'

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A simple area chart'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

const Chart = () => {
  return (
    <ChartContainer className="max-h-96 w-full" config={chartConfig}>
      <AreaChart
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
        <Area
          dataKey="desktop"
          type="natural"
          fill="var(--purplePrimary)"
          fillOpacity={0.4}
          stroke="var(--purplePrimary)"
          stackId="a"
        />
        <Area
          dataKey="mobile"
          type="natural"
          fill="var(--washedPrimary)"
          fillOpacity={0.4}
          stroke="var(--washedPrimary)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}

export { Chart }
