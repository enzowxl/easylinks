import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'
import clsx from 'clsx'
import '@/app/globals.css'
import { ModalStoreProvider } from '@/provider/modal-provider'

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
      <body className={clsx('antialiased', inter.className)}>
        <SessionProvider>
          <ModalStoreProvider>
            {children}
            <Toaster position="top-right" />
          </ModalStoreProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
