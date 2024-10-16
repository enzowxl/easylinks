'use client'

import { DataItem } from '@/app/(dashboard)/_components/data-item'
import { Chart } from '@/components/chart/chart'
import { Select } from '@/components/select'
import { BaseContainer } from '@/app/(dashboard)/_components/base/base-container'
import { BaseContent } from '@/app/(dashboard)/_components/base/base-content'
import { Calendar } from 'lucide-react'
import {
  countOccurrences,
  filterClicksByDate,
} from '../links/[linkId]/_utils/chart'
import React, { useState } from 'react'
import { LinkType } from '../links/[linkId]/page'
import { User } from '@prisma/client'

const DashboardData = ({ links, user }: { links: LinkType[]; user: User }) => {
  const allClicks = links.flatMap((link) => link.clicks)

  const linkReduced = allClicks.length

  const { country: countryCounts, bestLinks: bestLinksCounts } =
    countOccurrences(
      allClicks.map((click) => ({
        linkId: click.linkId || 'Unknown',
        country: click.country || 'Unknown',
      })),
    )

  const linkIdToSlugMap = links.reduce(
    (map, link) => {
      const domainName =
        link.domain?.domainName ?? process.env.NEXT_PUBLIC_DOMAIN

      map[link.id] = domainName + '/' + link.slug
      return map
    },
    {} as Record<string, string>,
  )

  const bestLinks = Object.entries(bestLinksCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([linkId, value]) => ({
      label: linkIdToSlugMap[linkId] || 'Unknown',
      value,
    }))

  const bestCountries = Object.entries(countryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)

  const dataItems = {
    left: [
      {
        percentageItems: bestLinks,
        title: 'Best links',
      },
    ],
    right: [
      {
        percentageItems: bestCountries.map(([label, value]) => ({
          label,
          value,
        })),
        title: 'Best countries',
      },
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
    useState<(typeof selectDateItems)[number]['value']>('this-year')

  const filteredClicks = filterClicksByDate(allClicks, dateType)

  const firstName = user.name.split(' ')[0]

  return (
    <BaseContainer>
      <div className="max-sm:flex-col sm:items-center flex justify-between gap-5 px-5">
        <div>
          <h3 className="text-nowrap font-bold text-2xl text-neutrals-6 flex overflow-hidden text-ellipsis">
            Welcome, {firstName}
          </h3>
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
          type="slugs"
          clicksFiltered={filteredClicks}
          linkIdToSlugMap={linkIdToSlugMap}
          dateType={dateType}
        />
        <div className="max-lg:grid-cols-1 gap-5 grid grid-cols-2">
          <div className="flex flex-col gap-5">
            {dataItems.left.map((dataItem, index) => (
              <DataItem
                key={index}
                title={dataItem.title}
                totalClicks={linkReduced}
                percentageItems={dataItem.percentageItems}
              />
            ))}
          </div>
          <div className="flex flex-col gap-5">
            {dataItems.right.map((dataItem, index) => (
              <DataItem
                key={index}
                title={dataItem.title}
                totalClicks={linkReduced}
                percentageItems={dataItem.percentageItems}
              />
            ))}
          </div>
        </div>
      </BaseContent>
    </BaseContainer>
  )
}

export { DashboardData }
