import { Click } from '@prisma/client'
import dayjs from 'dayjs'

const countOccurrences = (clicks: { [key: string]: string | undefined }[]) => {
  const counts: Record<string, Record<string, number>> = {
    browser: {},
    device: {},
    platform: {},
    country: {},
    redirectedBy: {},
    bestLinks: {},
  }

  clicks.forEach((click) => {
    console.log(click)
    for (const key in counts) {
      const value = click[key] || 'Unknown'
      counts[key][value] = (counts[key][value] || 0) + 1
    }

    if (click.linkId) {
      counts.bestLinks[click.linkId] = (counts.bestLinks[click.linkId] || 0) + 1
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

export {
  countClickTypes,
  countClicksByDay,
  countOccurrences,
  filterClicksByDate,
}
