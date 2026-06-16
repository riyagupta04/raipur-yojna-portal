import { CheckCircle2, Clock3, CircleSlash2 } from 'lucide-react'
import React from 'react'

import { cn } from '@/utilities/ui'

type Status = 'active' | 'upcoming' | 'closed' | string | null | undefined

const statusConfig = {
  active: {
    className: 'border-status-active/30 bg-status-active/10 text-status-active',
    icon: CheckCircle2,
    label: 'Active',
  },
  upcoming: {
    className: 'border-status-upcoming/40 bg-status-upcoming/10 text-[#8f4e00]',
    icon: Clock3,
    label: 'Upcoming',
  },
  closed: {
    className: 'border-status-closed/40 bg-status-closed/10 text-muted-foreground',
    icon: CircleSlash2,
    label: 'Closed',
  },
} as const

export const YojnaStatusBadge: React.FC<{ className?: string; status?: Status }> = ({
  className,
  status,
}) => {
  const config = statusConfig[(status || 'active') as keyof typeof statusConfig] || statusConfig.active
  const Icon = config.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-sm border px-2 py-1 text-xs font-semibold',
        config.className,
        className,
      )}
    >
      <Icon aria-hidden className="size-3" />
      {config.label}
    </span>
  )
}
