const createDomainInVercel = async (domainName: string) => {
  const response = await fetch(
    `https://api.vercel.com/v10/projects/${process.env.VERCEL_PROJECT_ID}/domains`,
    {
      body: JSON.stringify({
        name: domainName,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      },
      method: 'POST',
    },
  )

  const json = await response.json()

  switch (json?.error?.code) {
    case 'duplicate-team-registration':
      throw new Error('Domain already exists.')

    case 'owned-on-other-team':
      throw new Error('Domain already exists.')

    case 'invalid_domain':
      throw new Error('Invalid domain.')
  }
}

const deleteDomainInVercel = async (domainName: string) => {
  const response = await fetch(
    `https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}/domains/${domainName}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
      },
      method: 'DELETE',
    },
  )

  const json = await response.json()

  if (json?.error) {
    throw new Error('Bad request.')
  }
}

export { createDomainInVercel, deleteDomainInVercel }
