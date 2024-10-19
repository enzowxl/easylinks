import { NextRequest, NextResponse } from 'next/server'

const middleware = async (req: NextRequest) => {
  const routes = [
    '/',
    '/dashboard',
    '/verify',
    '/sign-in',
    '/sign-up',
    '/recover-password',
  ]

  const isRouteIncluded = routes.some((route) =>
    route === '/'
      ? req.nextUrl.pathname === '/'
      : req.nextUrl.pathname.startsWith(route),
  )

  if (isRouteIncluded) {
    const currentHost = req.nextUrl.host
    const defaultHost = process.env.NEXTAUTH_DOMAIN as string

    if (currentHost !== defaultHost) {
      const newUrl = new URL(req.url)
      newUrl.host = defaultHost

      return NextResponse.redirect(newUrl)
    }
  }
}

const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}

export { middleware, config }
