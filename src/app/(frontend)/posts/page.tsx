import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 0,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      meta: true,
    },
  })

  return (
    <div className="pb-24">
      <PageClient />
     <div className="relative overflow-hidden bg-gradient-to-r from-blue-200 via-blue-250 to-indigo-900 text-white">
  <div className="container py-16">
  <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur">
    Government of Chhattisgarh
  </span>

  <h1 className="mt-6 text-4xl font-bold md:text-6xl">
    Latest News & Announcements
  </h1>

  <p className="mt-4 max-w-3xl text-lg text-blue-30">
    Stay updated with official notifications, welfare scheme updates,
    district initiatives and public announcements from Raipur District Administration.
  </p>

  <div className="mt-6 inline-flex items-center rounded-full bg-white text-blue-900 px-5 py-2 font-semibold">
    {posts.totalDocs} Published News Articles
  </div>
</div>
</div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Yojna Portal | Raipur District Government Posts`,
  }
}
