'use client'

import { DataItem } from '@/app/(dashboard)/_components/data-item'
import { Chart } from '@/components/chart'
import { LinkType } from '../page'
import { Select } from '@/components/select'
import dayjs from 'dayjs'
import React from 'react'
import { Click } from '@prisma/client'
import { BaseContainer } from '@/app/(dashboard)/_components/base/base-container'
import { BaseContent } from '@/app/(dashboard)/_components/base/base-content'
import { Calendar } from 'lucide-react'

const countOccurrences = (clicks: { [key: string]: string | undefined }[]) => {
  const counts: Record<string, Record<string, number>> = {
    browser: {},
    device: {},
    platform: {},
    country: {},
    redirectedBy: {},
  }

  clicks.forEach((click) => {
    for (const key in counts) {
      const value = click[key] || 'Unknown'
      counts[key][value] = (counts[key][value] || 0) + 1
    }
  })

  return counts
}

const countClickTypes = (clicks: { ip?: string }[]) => {
  const clickTypeCounts = {
    unique: 0,
    double: 0,
  }

  const ipOccurrences: Record<string, number> = {}

  clicks.forEach((click) => {
    const ip = click.ip || 'Unknown'

    if (!ipOccurrences[ip]) {
      ipOccurrences[ip] = 1
      clickTypeCounts.unique += 1
    } else {
      ipOccurrences[ip] += 1
      clickTypeCounts.double += 1
    }
  })

  return clickTypeCounts
}

const countClicksByDay = (clicks: { createdAt?: Date }[]) => {
  const dayCounts: Record<string, number> = {}

  clicks.forEach((click) => {
    const date = click.createdAt
      ? dayjs(click.createdAt).format('dddd')
      : 'Unknown'

    dayCounts[date] = (dayCounts[date] || 0) + 1
  })

  return dayCounts
}

const filterClicksByDate = (clicks: Click[], dateType: string) => {
  const now = dayjs()
  let type: dayjs.OpUnitType

  switch (dateType) {
    case 'this-week':
      type = 'week'
      break
    case 'this-month':
      type = 'month'
      break
    case 'this-year':
      type = 'year'
      break
    default:
      return clicks
  }

  return clicks.filter((click) =>
    dayjs(click.createdAt).isAfter(now.startOf(type)),
  )
}

const LinkData = ({ link }: { link: LinkType }) => {
  const domainName = link.domain?.domainName ?? 'easylinks.com'

  const clickTypeCounts = countClickTypes(link.clicks)

  const clicksByDay = countClicksByDay(link.clicks)

  const {
    browser: browserCounts,
    device: deviceCounts,
    platform: platformCounts,
    country: countryCounts,
    redirectedBy: redirectedByCounts,
  } = countOccurrences(
    link.clicks.map((click) => ({
      browser: click.browser,
      device: click.device,
      platform: click.platform,
      country: click.country,
      redirectedBy: click.redirectedBy,
    })),
  )

  const dataItems = {
    left: [
      {
        percentageItems: Object.entries(deviceCounts).map(([key, value]) => ({
          label: key,
          value,
        })),
        title: 'Most used devices',
      },
      {
        percentageItems: Object.entries(redirectedByCounts).map(
          ([key, value]) => ({
            label: key,
            value,
          }),
        ),
        title: 'Most frequent redirects',
      },
      {
        percentageItems: Object.entries(clicksByDay).map(([key, value]) => ({
          label: key,
          value,
        })),
        title: 'Most frequent days',
      },
      {
        percentageItems: Object.entries(countryCounts).map(([key, value]) => ({
          label: key,
          value,
        })),
        title: 'Most frequent countries',
      },
    ],
    right: [
      {
        percentageItems: Object.entries(browserCounts).map(([key, value]) => ({
          label: key,
          value,
        })),
        title: 'Most used browsers',
      },
      {
        percentageItems: Object.entries(platformCounts).map(([key, value]) => ({
          label: key,
          value,
        })),
        title: 'Most used platforms',
      },
      ...(link.clicks.length > 0
        ? [
            {
              percentageItems: [
                { label: 'Unique', value: clickTypeCounts.unique },
                { label: 'Double', value: clickTypeCounts.double },
              ],
              title: 'Click types',
            },
          ]
        : [
            {
              percentageItems: [],
              title: 'Click types',
            },
          ]),
    ],
  }

  const selectDateItems = [
    {
      label: 'This week',
      value: 'this-week',
    },
    {
      label: 'This month',
      value: 'this-month',
    },
    {
      label: 'This year',
      value: 'this-year',
    },
  ]

  const [dateType, updateDateType] =
    React.useState<(typeof selectDateItems)[number]['value']>('this-year')

  const filteredClicks = filterClicksByDate(link.clicks, dateType)

  return (
    <BaseContainer>
      <div className="max-sm:flex-col sm:items-center flex justify-between gap-5 px-5">
        <div>
          <h3 className="font-bold text-2xl text-neutrals-6 flex overflow-hidden text-ellipsis">
            {`${domainName}/`}
            <p className="text-white overflow-hidden text-ellipsis">
              {link.slug}
            </p>
          </h3>
          <h5 className="text-neutrals-6">{link.description}</h5>
        </div>

        <Select
          icon={Calendar}
          onValueChange={(value) => updateDateType(value)}
          placeholder="Select date"
          items={selectDateItems}
        />
      </div>

      <BaseContent className="!grid">
        <Chart
          link={link}
          linkFiltered={{ ...link, clicks: filteredClicks }}
          dateType={dateType}
        />
        <div className="max-lg:grid-cols-1 gap-5 grid grid-cols-2">
          <div className="flex flex-col gap-5">
            {dataItems.left.map((dataItem, index) => (
              <DataItem
                key={index}
                title={dataItem.title}
                totalClicks={link.clicks.length}
                percentageItems={dataItem.percentageItems}
              />
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {dataItems.right.map((dataItem, index) => (
              <DataItem
                key={index}
                title={dataItem.title}
                totalClicks={link.clicks.length}
                percentageItems={dataItem.percentageItems}
              />
            ))}
          </div>
        </div>
      </BaseContent>
    </BaseContainer>
  )
}

export { LinkData }
