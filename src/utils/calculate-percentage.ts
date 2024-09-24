const calculatePercentage = ({
  total,
  value,
}: {
  total: number
  value: number
}) => {
  if (total === 0) {
    return 0
  }

  const percentage = (value / total) * 100

  return percentage
}

export { calculatePercentage }
