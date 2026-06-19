import type { Metadata } from 'next'

import Link from 'next/link'
import React from 'react'

import { YojnaCard } from '@/components/YojnaCard'
import { YojnaFilters } from '@/components/YojnaFilters'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-dynamic'
export const revalidate = 600

type Args = {
  searchParams: Promise<{
    category?: string
    page?: string
    q?: string
    status?: string
  }>
}

export default async function YojnasPage({ searchParams }: Args) {
  const { category: categorySlug = '', page = '1', q = '', status = '' } = await searchParams
  const currentPage = Math.max(1, Number(page) || 1)
  const payload = await getPayload({ config: configPromise })
const yojnaCount = await payload.count({
  collection: 'yojnas',
})
  const categories = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 100,
    overrideAccess: false,
    sort: 'title',
    select: {
      slug: true,
      title: true,
    },
  })

  const selectedCategory = categorySlug
    ? await payload.find({
        collection: 'categories',
        depth: 0,
        limit: 1,
        overrideAccess: false,
        pagination: false,
        where: {
          slug: {
            equals: categorySlug,
          },
        },
      })
    : null

  const andFilters = []

  if (selectedCategory?.docs?.[0]?.id) {
    andFilters.push({
      category: {
        equals: selectedCategory.docs[0].id,
      },
    })
  }

  if (status) {
    andFilters.push({
      status: {
        equals: status,
      },
    })
  }
if (q) {
  andFilters.push({
    title: {
      like: q,
    },
  })
}
  
  const yojnas = await payload
    .find({
      collection: 'yojnas',
      depth: 1,
      limit: 12,
      overrideAccess: false,
      page: currentPage,
      sort: 'title',
      where: andFilters.length
        ? {
            and: andFilters,
          }
        : undefined,
      select: {
        category: true,
        department: true,
        externalLink: true,
        slug: true,
        status: true,
        summary: true,
        title: true,
      },
    })
    .catch(() => ({
      docs: [],
      hasNextPage: false,
      hasPrevPage: false,
      nextPage: null,
      page: 1,
      prevPage: null,
      totalPages: 0,
    }))
let filteredDocs = yojnas.docs

if (q.trim()) {
  const searchText = q.toLowerCase()

  filteredDocs = yojnas.docs.filter((yojna: any) =>
    yojna.title?.toLowerCase().includes(searchText) ||
    yojna.summary?.toLowerCase().includes(searchText) ||
    yojna.department?.toLowerCase().includes(searchText)
  )
}
  const makePageHref = (targetPage: number) => {
    const params = new URLSearchParams()
    if (categorySlug) params.set('category', categorySlug)
    if (status) params.set('status', status)
    if (q) params.set('q', q)
    params.set('page', String(targetPage))
    return `/yojnas?${params.toString()}`
  }

  return (
    <main className="bg-background">
      <section className="border-b border-border bg-gradient-to-r from-green-50 to-green-100">
  <div className="container py-12">
          <nav className="mb-6 text-sm text-muted-foreground">
            Home <span className="mx-2">›</span> Schemes
          </nav>
          <h1 className="text-5xl font-bold tracking-[-0.02em] text-green-800">
  Government Schemes Portal
</h1>
<div className="mt-4 inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">
  {yojnaCount.totalDocs} Available Schemes
</div>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
           Explore welfare schemes, citizen services, development programs, and government initiatives available for the citizens of Raipur District.
          </p>
        </div>
      </section>

      <section className="container py-8">
        <YojnaFilters
          categories={categories.docs}
          search={q}
          selectedCategory={categorySlug}
          selectedStatus={status}
        />
        <div className="mt-8 flex items-center justify-between">
  <h2 className="text-xl font-bold">
    Showing {yojnas.docs.length} Schemes
  </h2>

  <span className="text-sm text-muted-foreground">
    Page {yojnas.page} of {yojnas.totalPages || 1}
  </span>
</div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredDocs.map((yojna) => (
            <YojnaCard key={yojna.id} yojna={yojna} />
          ))}
        </div>

        {yojnas.docs.length === 0 && (
          <div className="mt-8 rounded-lg border border-border bg-card p-8 text-center">
            <h2 className="text-xl font-bold">No schemes found</h2>
            <p className="mt-2 text-muted-foreground">
              Try changing your category, status, or search filters.
            </p>
          </div>
        )}

        {yojnas.totalPages > 1 && (
          <nav
            aria-label="Yojna pagination"
            className="mt-10 flex items-center justify-center gap-2"
          >
            {yojnas.hasPrevPage && yojnas.prevPage && (
              <Link
                className="rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold hover:bg-muted"
                href={makePageHref(yojnas.prevPage)}
              >
                Previous
              </Link>
            )}
            <span className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground">
              {yojnas.page}
            </span>
            {yojnas.hasNextPage && yojnas.nextPage && (
              <Link
                className="rounded-md border border-border bg-card px-3 py-2 text-sm font-semibold hover:bg-muted"
                href={makePageHref(yojnas.nextPage)}
              >
                Next
              </Link>
            )}
          </nav>
        )}
      </section>
    </main>
  )
}

export const metadata: Metadata = {
  description: 'Browse and filter Raipur District Government schemes by category and status.',
  title: 'Browse Schemes | Yojna Portal',
}
