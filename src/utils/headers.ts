'use server'

import { headers } from 'next/headers'

function formattedHeaders() {
  return {
    ip: getIp(),
    protocol: headers().get('x-forwarded-proto'),
    host: headers().get('host'),
  }
}

function getIp() {
  const FALLBACK_IP_ADDRESS = '0.0.0.0'
  const forwardedFor = headers().get('x-forwarded-for')

  if (forwardedFor) {
    return forwardedFor.split(',')[0] ?? FALLBACK_IP_ADDRESS
  }

  return headers().get('x-real-ip') ?? FALLBACK_IP_ADDRESS
}

export { formattedHeaders }
