'use server'

// @ts-ignore
import ipinfo from 'ipinfo'
import { headers } from 'next/headers'

function getIp() {
  const FALLBACK_IP_ADDRESS = '0.0.0.0'
  const forwardedFor = headers().get('x-forwarded-for')

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
  }

  return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS
}

const getCountry = async () => {
  let country

  try {
    const response = await ipinfo(getIp())
    country = response.country

    return country
  } catch (err) {
    console.error(err)
  }
}

export { getIp, getCountry }
