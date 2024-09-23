'use client'

import clsx from 'clsx'
import { LucideProps } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface ButtonType {
  title?: string
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >
  href?: string
  classNameContainer?: string
}

const Button = (
  props: React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonType,
) => {
  const className = clsx(
    'hover:scale-105 flex justify-center items-center gap-2.5 duration-500 border border-purple-primary-500 cursor-pointer px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-purplePrimary to-purple-primary-800',
    props.classNameContainer,
    props.disabled
      ? '!cursor-not-allowed !border !border-neutrals-11 !text-neutrals-7 !from-neutrals-12 !to-neutrals-13 hover:!scale-100'
      : '',
  )

  const icon = props.icon && (
    <props.icon className="min-w-5 min-h-5 max-w-5 max-h-5" />
  )

  return (
    <React.Fragment>
      {props.href && !props.disabled ? (
        <Link href={props.href} className={className}>
          {icon}
          {props.title}
        </Link>
      ) : (
        <button className={className} {...props}>
          {icon}
          {props.title}
        </button>
      )}
    </React.Fragment>
  )
}

export { Button }
