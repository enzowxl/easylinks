import { DataItem } from '@/app/(dashboard)/_components/data-item'
import { Chart } from '@/components/chart'
import { LinkType } from '../page'
import dayjs from 'dayjs'
import { DatePickerWithRange } from '@/components/date-picker'

const countOccurrences = (clicks: { [key: string]: string | undefined }[]) => {
  const counts: Record<string, Record<string, number>> = {
    browser: {},
    device: {},
    platform: {},
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

const LinkData = ({ link }: { link: LinkType }) => {
  const domainName = link.domain?.domainName ?? 'easylinks.com'

  const {
    browser: browserCounts,
    device: deviceCounts,
    platform: platformCounts,
    redirectedBy: redirectedByCounts,
  } = countOccurrences(
    link.clicks.map((click) => ({
      browser: click.browser,
      device: click.device,
      platform: click.platform,
      redirectedBy: click.redirectedBy,
    })),
  )

  const clickTypeCounts = countClickTypes(link.clicks)

  const clicksByDay = countClicksByDay(link.clicks)

  return (
    <div className="flex flex-col gap-8 py-5">
      <div className="max-sm:flex-col sm:items-center flex justify-between gap-5 px-5">
        <div>
          <h3 className="font-bold text-2xl text-neutrals-6 flex">
            {`${domainName}/`}
            <p className="text-white">{link.slug}</p>
          </h3>
          <h5 className="text-neutrals-6">{link.description}</h5>
        </div>

        <DatePickerWithRange />
      </div>

      <div className="flex flex-col gap-2.5">
        <Chart link={link} />
        <div className="max-lg:grid-cols-1 gap-5 grid grid-cols-2 px-5">
          <div className="flex flex-col gap-5">
            <DataItem
              totalClicks={link.clicks.length}
              percentageItems={Object.entries(deviceCounts).map(
                ([key, value]) => ({
                  label: key,
                  value,
                }),
              )}
              title="Most used devices"
            />
            <DataItem
              totalClicks={link.clicks.length}
              percentageItems={Object.entries(redirectedByCounts).map(
                ([key, value]) => ({
                  label: key,
                  value,
                }),
              )}
              title="Most frequent redirects"
            />
            <DataItem
              totalClicks={link.clicks.length}
              percentageItems={Object.entries(clicksByDay).map(
                ([key, value]) => ({
                  label: key,
                  value,
                }),
              )}
              title="Most frequent days"
            />
          </div>
          <div className="flex flex-col gap-5">
            <DataItem
              totalClicks={link.clicks.length}
              percentageItems={Object.entries(browserCounts).map(
                ([key, value]) => ({
                  label: key,
                  value,
                }),
              )}
              title="Most used browsers"
            />
            <DataItem
              totalClicks={link.clicks.length}
              percentageItems={Object.entries(platformCounts).map(
                ([key, value]) => ({
                  label: key,
                  value,
                }),
              )}
              title="Most used platforms"
            />
            <DataItem
              totalClicks={link.clicks.length}
              percentageItems={[
                { label: 'Unique', value: clickTypeCounts.unique },
                { label: 'Double', value: clickTypeCounts.double },
              ]}
              title="Click types"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export { LinkData }
