'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    // <article
    //   className={cn(
    //     'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
    //     className,
    //   )}
   <article
  className={cn(
    'group h-full rounded-2xl border border-slate-200 border-l-4 border-l-green-600 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl',
    className,
  )}
  ref={card.ref}
>
     {metaImage && (
  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
    {typeof metaImage !== 'string' && (
      <Media
        resource={metaImage}
        size="33vw"
        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
      />
    )}
  </div>
)}

<div className="flex flex-1 flex-col p-6">
  <div className="mb-4 flex items-center justify-between">
  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
    📢 Announcement
  </span>

  <span className="text-xs text-slate-500">
    Latest Update
  </span>
</div>
        {showCategories && hasCategories && (
          <div className="mb-4 flex flex-wrap gap-2">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category

                const categoryTitle = titleFromCategory || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <Fragment key={index}>
                    {categoryTitle}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                  </Fragment>
                )
              }

              return null
            })}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
           <h3 className="text-xl font-bold leading-snug text-slate-900 transition group-hover:text-green-700">
  <Link href={href} ref={link.ref}>
    {titleToUse}
  </Link>
</h3>
          </div>
        )}
        {description && (
  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
    {sanitizedDescription}
  </p>
)}
<div className="mt-auto pt-6 flex justify-end">
  <Link
    href={href}
   className="font-semibold text-green-700 hover:text-green-900"
  >
    Read More →
  </Link>
</div>
      </div>
    </article>
  )
}
