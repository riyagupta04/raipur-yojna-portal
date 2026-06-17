'use client'

import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const fallbackNavItems = [
  { label: 'Home', url: '/' },
  // { label: 'Yojnas', url: '/yojnas' },
  { label: 'News', url: '/posts' },
]

export const HeaderNav: React.FC = () => {
  const pathname = usePathname()

  return (
    <nav className="flex h-11 flex-wrap items-center gap-7 text-sm font-semibold">
      {fallbackNavItems.map((item) => {
        const url = item.url
        const isActive = url === '/' ? pathname === '/' : pathname.startsWith(url)

        return (
          <Link
            className={isActive ? 'text-primary' : 'text-on-surface hover:text-primary'}
            href={url}
            key={item.label}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
