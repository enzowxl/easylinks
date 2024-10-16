import { CartesianGrid, XAxis, BarChart, Bar } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { LinkType } from '@/app/(dashboard)/dashboard/links/[linkId]/page'
import React from 'react'
import { Click } from '@prisma/client'
import { generateChartConfig, transformChartData } from './_utils/chart'

export type ChartType = 'devices' | 'slugs'

const Chart = ({
  link,
  dateType,
  clicksFiltered,
  countClickInHeader,
  linkIdToSlugMap,
  type,
}: {
  link?: LinkType
  dateType: string
  clicksFiltered: Click[]
  countClickInHeader?: boolean
  linkIdToSlugMap?: Record<string, string>
  type: ChartType
}) => {
  const devices = Array.from(
    new Set(clicksFiltered.map((click) => click.device || 'Unknown')),
  )
  const slugs = Array.from(
    new Set(
      clicksFiltered.map(
        (click) => linkIdToSlugMap?.[click.linkId] || 'Unknown',
      ),
    ),
  )
  const dataKey = type === 'devices' ? devices : slugs

  const chartData = transformChartData(
    clicksFiltered,
    dateType,
    type,
    linkIdToSlugMap,
  )
  const chartConfig = generateChartConfig(dataKey)

  const length = link && link.clicks.length

  const headerTitle = `${length} ${length === 1 ? 'click' : 'clicks'}`

  return (
    <React.Fragment>
      {countClickInHeader && link && (
        <h3 className="text-2xl font-bold">{headerTitle}</h3>
      )}

      <ChartContainer className="max-h-96 w-full" config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
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
            content={
              <ChartTooltipContent className="bg-dark" indicator="line" />
            }
          />
          {dataKey.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              type="natural"
              fill={chartConfig[key]?.color}
              stroke={chartConfig[key]?.color}
              stackId="a"
            />
          ))}
        </BarChart>
      </ChartContainer>
    </React.Fragment>
  )
}

export { Chart }
