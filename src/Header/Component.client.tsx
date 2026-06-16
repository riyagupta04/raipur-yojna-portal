'use client'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

export const HeaderClient: React.FC = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-outline-variant bg-surface-container-lowest text-on-surface">
      {/* <div className="bg-inverse-surface text-inverse-on-surface">
        <div className="container flex h-7 items-center justify-between text-xs">
          <span>Government of Chhattisgarh</span>
        </div>
      </div> */}
      <div className="container flex items-center justify-between gap-6 py-4">
        <Link aria-label="Raipur District Government home" className="shrink-0" href="/">
          <Logo loading="eager" priority="high" />
        </Link>
        <nav>
          <HeaderNav />
        </nav>
        {/* <form action="/yojnas" className="relative hidden w-full max-w-[18rem] md:block">
          <SearchIcon
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-on-surface-variant"
          />
          <input
            className="h-10 w-full rounded-md border border-outline-variant bg-surface-container-low px-4 pl-10 text-sm text-on-surface outline-none transition-colors placeholder:text-on-surface-variant focus:border-primary focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/15"
            name="q"
            placeholder="Search for Government Schemes"
            type="search"
          />
        </form> */}
        <Link className="text-on-surface md:hidden" href="/search">
          <span className="sr-only">Search</span>
          <SearchIcon className="size-5" />
        </Link>
      </div>
    </header>
  )
}
