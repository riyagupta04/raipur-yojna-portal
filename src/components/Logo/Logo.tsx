'use client'
import clsx from 'clsx'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <span className={clsx('flex items-center gap-3', className)}>
      <span className="inline-flex size-14 items-center justify-center rounded-full border border-outline-variant bg-inverse-surface text-inverse-on-surface shadow-[0_2px_8px_rgba(24,28,32,0.12)]">
        <img
          src="/logo.png"
          alt="Raipur District Logo"
          width={48}
          height={48}
          className="rounded-full"
        />
      </span>
      <span className="leading-none">
        <span className="block text-xl font-extrabold uppercase tracking-none text-on-surface">
          Raipur District
        </span>
        <span className="block text-xs font-semibold text-on-surface-variant">
          Government of Chhattisgarh
        </span>
      </span>
    </span>
  )
}
