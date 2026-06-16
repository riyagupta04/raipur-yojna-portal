import type { Yojna } from '@/payload-types'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
import { YojnaStatusBadge } from '@/components/YojnaStatusBadge'

const categoryColorClass = (color?: string | null) => {
  switch (color) {
    case 'education':
      return 'border-t-category-education'
    case 'women':
      return 'border-t-category-women'
    case 'agriculture':
      return 'border-t-category-agriculture'
    case 'governance':
      return 'border-t-category-governance'
    case 'welfare':
      return 'border-t-category-welfare'
    case 'child':
      return 'border-t-category-child'
    case 'culture':
      return 'border-t-category-culture'
    default:
      return 'border-t-category-health'
  }
}

const getCategory = (yojna: Pick<Yojna, 'category'>) => {
  return typeof yojna.category === 'object' ? yojna.category : null
}

export const YojnaCard: React.FC<{
  className?: string
  featured?: boolean
  yojna: Pick<
    Yojna,
    'category' | 'department' | 'externalLink' | 'slug' | 'status' | 'summary' | 'title'
  >
}> = ({ className, featured = false, yojna }) => {
  const category = getCategory(yojna)

  return (
    <article
     className={cn(
  'group flex h-full flex-col overflow-hidden rounded-2xl border border-border border-t-4 bg-card shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl',
        categoryColorClass(category?.color),
        className,
      )}
    >
      
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            {category?.title || 'Yojna'}
          </span>
          <YojnaStatusBadge status={yojna.status} />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl font-bold leading-snug text-card-foreground transition group-hover:text-green-700">
  {yojna.title}
</h3>
         <p className="line-clamp-3 text-sm leading-7 text-slate-600">
  {yojna.summary}
</p>
        </div>

        {featured && (
  <div className="mt-auto rounded-lg bg-slate-50 p-3">
    <p className="text-xs text-muted-foreground">
      Department
    </p>

    <p className="font-medium text-slate-700">
      {yojna.department || 'Raipur District Administration'}
    </p>
  </div>
)}
      </div>

      <div className="flex items-center justify-between border-t border-border p-5 pt-4">
        <Link
  className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-50"
          href={`/yojnas/${yojna.slug}`}
        >
          View Details
          <ArrowRight aria-hidden className="size-4" />
        </Link>
        {yojna.externalLink ? (
          <Button
  asChild
  size="sm"
  className="bg-green-600 hover:bg-green-700"
>
            <Link href={yojna.externalLink} target="_blank">
              Apply Now
            </Link>
          </Button>
        ) : (
          <Button disabled size="sm" variant="outline">
            Not Open
          </Button>
        )}
      </div>
    </article>
  )
}
