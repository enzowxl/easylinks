import { Menu } from 'lucide-react'
import { Button } from '@/components/button'
import { Logo } from '@/components/logo'
import Link from 'next/link'
import React from 'react'

const NavLandingPage = () => {
  const user = null

  return (
    <nav className="bg-dark/40 backdrop-blur-lg z-[100] fixed right-0 left-0 top-0 border-b border-neutrals-12 flex justify-between items-center px-5 py-3 w-full">
      <Logo />
      <ul className="max-sm:hidden flex items-center">
        <li className="px-2.5">
          <Link href="#">Product</Link>
        </li>
        <li className="px-2.5">
          <Link href="#">Pricing</Link>
        </li>
        <li className="px-2.5">
          <Link href="#">About</Link>
        </li>
      </ul>
      <div className="max-sm:hidden flex items-center gap-5">
        {user ? (
          <Button href="/dashboard" title="Dashboard" />
        ) : (
          <React.Fragment>
            <Link href="/sign-in">Login</Link>
            <Button href="/sign-up" title="Sign Up" />
          </React.Fragment>
        )}
      </div>
      <div className="sm:hidden">
        <Menu className="w-5 h-5" />
      </div>
    </nav>
  )
}

export { NavLandingPage }
