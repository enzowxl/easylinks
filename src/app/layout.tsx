import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import clsx from 'clsx'
import '@/app/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s | easylinks',
    default: 'easylinks',
  },
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html lang="en">
      <body className={clsx('antialiased', inter.className)}>{children}</body>
    </html>
  )
}

export default RootLayout
