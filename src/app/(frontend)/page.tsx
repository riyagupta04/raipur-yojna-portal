

import type { Metadata } from 'next'

import {
  Baby,
  GraduationCap,
  Handshake,
  HeartPulse,
  Landmark,
  Leaf,
  Palette,
  Search,
  Users,
} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import DotGrid from '@/components/DotGrid'
import CategorySection from '@/components/CategorySection'
import { YojnaCard } from '@/components/YojnaCard'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { yojnaCategories } from '@/endpoints/seed/yojnas'

export const dynamic = 'force-static'
export const revalidate = 600

const categoryIcons = {
  baby: Baby,
  'graduation-cap': GraduationCap,
  handshake: Handshake,
  'heart-pulse': HeartPulse,
  landmark: Landmark,
  leaf: Leaf,
  palette: Palette,
  users: Users,
}

const categoryAccentClass = (color?: string | null) => {
  switch (color) {
    case 'education':
      return 'text-category-education bg-category-education/10'
    case 'women':
      return 'text-category-women bg-category-women/10'
    case 'agriculture':
      return 'text-category-agriculture bg-category-agriculture/10'
    case 'governance':
      return 'text-category-governance bg-category-governance/10'
    case 'welfare':
      return 'text-category-welfare bg-category-welfare/10'
    case 'child':
      return 'text-category-child bg-category-child/10'
    case 'culture':
      return 'text-category-culture bg-category-culture/10'
    default:
      return 'text-category-health bg-category-health/10'
  }
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const [categories, posts] = await Promise.all([
    payload
      .find({
        collection: 'categories',
        depth: 0,
        limit: 8,
        overrideAccess: false,
        sort: 'title',
        select: {
          color: true,
          description: true,
          icon: true,
          slug: true,
          title: true,
        },
      })
      .catch(() => ({
        docs: yojnaCategories,
      })),

    payload.find({
      collection: 'posts',
      depth: 0,
      limit: 2,
      overrideAccess: false,
      sort: '-publishedAt',
      select: {
        meta: true,
        publishedAt: true,
        slug: true,
        title: true,
      },
    }),
  ])

  const featuredYojnas = await payload
    .find({
      collection: 'yojnas',
      depth: 1,
      limit: 3,
      overrideAccess: false,
      sort: '-updatedAt',
      select: {
        category: true,
        department: true,
        externalLink: true,
        slug: true,
        status: true,
        summary: true,
        title: true,
      },
      where: {
        status: {
          in: ['active', 'upcoming'],
        },
      },
    })
    .catch(() => ({ docs: [] }))
    const allYojnas = await payload.find({
  collection: 'yojnas',
  depth: 1,
  limit: 100,
  overrideAccess: false,
  select: {
    title: true,
    slug: true,
    category: true,
  },
})
const sortedCategories = [...categories.docs].sort((a: any, b: any) => {
  const countA = allYojnas.docs.filter(
    (y: any) =>
      typeof y.category === 'object' &&
      y.category?.slug === a.slug,
  ).length

  const countB = allYojnas.docs.filter(
    (y: any) =>
      typeof y.category === 'object' &&
      y.category?.slug === b.slug,
  ).length

  return countB - countA
})
  // ✅ ONLY COUNT QUERY 
 const [yojnaCount, categoryCount, postCount] = await Promise.all([
  payload.count({ collection: 'yojnas' }),
  payload.count({ collection: 'categories' }),
  payload.count({ collection: 'posts' }),
])

  return (
    <main>
<section className="border-b bg-gradient-to-r from-green-50 to-white">
  <div className="container py-12">

    <div className="grid gap-10 lg:grid-cols-2 items-center">

      {/* LEFT CONTENT */}
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-700">
          District Administration Raipur
        </p>

        <h1 className="text-2xl font-bold leading-tight text-slate-900">
          रायपुर जिला प्रशासन द्वारा संचालित सभी जनकल्याणकारी योजनाओं की संपूर्ण जानकारी
        </h1>

        <p className="mt-5 text-lg text-slate-600">
          District Administration Raipur has launched several welfare schemes
          for women, youth, students, farmers and citizens of Chhattisgarh.
        </p>

        <p className="mt-4 text-slate-600">
          This portal provides complete information about government schemes,
          eligibility criteria, required documents, benefits and application
          procedures in one place.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/yojnas"
            className="rounded-lg bg-green-600 px-6 py-3 text-white font-semibold hover:bg-green-700"
          >
            Explore Schemes
          </Link>

          <Link
            href="/posts"
            className="rounded-lg border px-6 py-3 font-semibold hover:bg-slate-50"
          >
            Latest Updates
          </Link>
        </div>
      </div>

      {/* RIGHT BOX */}
      <div>
        <div className="rounded-2xl border bg-white p-8 shadow-sm">

          <h3 className="mb-5 text-xl font-bold text-green-700">
            Portal Objectives
          </h3>

          <ul className="space-y-4 text-slate-700">
            <li>✅ Easy access to government welfare schemes</li>
            <li>✅ Eligibility and benefit information</li>
            <li>✅ Application process guidance</li>
            <li>✅ Latest government announcements</li>
            <li>✅ Citizen-friendly digital platform</li>
          </ul>

        </div>
      </div>

    </div>

  </div>
</section>
<section className="container py-12">
  <div className="mb-8 text-center">
  <h2 className="text-3xl font-bold">
    Scheme Categories
  </h2>

  <p className="mt-2 text-lg font-medium text-green-700">
    योजना श्रेणियाँ एवं उपलब्ध योजनाएँ
  </p>

  <p className="mt-3 text-muted-foreground">
    Hover over a category to explore available schemes
  </p>

  <p className="text-sm text-slate-600">
    विभिन्न श्रेणियों के अंतर्गत उपलब्ध शासकीय योजनाओं की जानकारी प्राप्त करने हेतु संबंधित श्रेणी का चयन करें।
  </p>
</div>

  <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
    {sortedCategories.map((category: any) => {
      const Icon =
        categoryIcons[
          (category.icon || 'landmark') as keyof typeof categoryIcons
        ] || Landmark

      const categoryYojnas = allYojnas.docs.filter(
        (yojna: any) =>
          typeof yojna.category === 'object' &&
          yojna.category?.slug === category.slug,
      )
      const schemeCount = categoryYojnas.length
const sortedCategories = categories.docs
  .map((category: any) => ({
    ...category,
    schemeCount: allYojnas.docs.filter(
      (yojna: any) =>
        typeof yojna.category === 'object' &&
        yojna.category?.slug === category.slug,
    ).length,
  }))
  .sort((a: any, b: any) => b.schemeCount - a.schemeCount)
      return (
        <div
          key={category.id}
          className="group relative"
        >
          {/* Category Card */}
          <div
            className="
              h-full rounded-2xl border bg-white p-5
              text-center shadow-sm transition-all duration-300
              hover:-translate-y-1 hover:border-green-500 hover:shadow-xl
            "
          >
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
              <Icon className="h-7 w-7" />
            </div>

            <h3 className="font-bold text-base">
              {category.title}
            </h3>

            <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
              {category.description}
            </p>

          <div className="mt-3 text-xs font-semibold text-green-600">
  {schemeCount} Schemes
</div>
          </div>

          {/* Hover Dropdown */}
          <div
            className="
              invisible absolute left-0 top-full z-50 mt-2
              w-80 rounded-2xl border bg-white p-4
              opacity-0 shadow-2xl transition-all duration-300
              group-hover:visible group-hover:opacity-100
            "
          >
            <h4 className="mb-3 border-b pb-2 font-semibold text-green-700">
              {category.title}
            </h4>

            <div className="max-h-72 overflow-y-auto">
              {categoryYojnas.length > 0 ? (
                categoryYojnas.map((yojna: any) => (
                  <Link
                    key={yojna.slug}
                    href={`/yojnas/${yojna.slug}`}
                    className="
                      block rounded-lg px-3 py-2 text-sm
                      hover:bg-green-50 hover:text-green-700
                    "
                  >
                    {yojna.title}
                  </Link>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No schemes available
                </p>
              )}
            </div>
          </div>
        </div>
      )
    })}
  </div>
</section>
     
<section className="container py-12">
  <div className="text-center mb-10">
    <h2 className="text-3xl font-bold">
      योजनाओं का लाभ कैसे प्राप्त करें?
    </h2>

    <p className="mt-3 text-muted-foreground">
      सरकारी योजनाओं की जानकारी प्राप्त करने एवं आवेदन करने की सरल प्रक्रिया
    </p>
  </div>

  <div className="grid gap-6 md:grid-cols-3">

    
    <div className="rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:shadow-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
        1
      </div>

      <h3 className="mt-3 text-lg font-bold">
        योजना चुनें
      </h3>

      <p className="mt-3 text-sm text-muted-foreground">
        अपनी आवश्यकता के अनुसार संबंधित योजना श्रेणी का चयन करें।
      </p>
    </div>

  
    <div className="rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:shadow-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-2xl font-bold text-blue-700">
        2
      </div>

      <h3 className="mt-3 text-xl font-bold">
        पात्रता जाँचें
      </h3>

      <p className="mt-3 text-sm text-muted-foreground">
        योजना की पात्रता, आवश्यक दस्तावेज एवं लाभ की जानकारी प्राप्त करें।
      </p>
    </div>

    
    <div className="rounded-2xl border bg-white p-8 text-center shadow-sm transition hover:shadow-xl">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-2xl font-bold text-orange-700">
        3
      </div>

      <h3 className="mt-3 text-xl font-bold">
        आवेदन करें
      </h3>

      <p className="mt-3 text-sm text-muted-foreground">
        संबंधित विभाग द्वारा निर्धारित प्रक्रिया के अनुसार आवेदन करें।
      </p>
    </div>

  </div>
</section>

      {/* STATS SECTION  */}
      <section className="container py-10">
  <div className="grid grid-cols-2 gap-5 md:grid-cols-4">

    {[
  {
    label: 'Government Schemes',
    value: yojnaCount.totalDocs,
    color: 'text-green-600',
    icon: '📋',
  },
  {
    label: 'Categories',
    value: categoryCount.totalDocs,
    color: 'text-blue-600',
    icon: '📂',
  },
  {
    label: 'News',
    value: postCount.totalDocs,
    color: 'text-purple-600',
    icon: '📰',
  },
  {
    label: 'Featured Schemes',
    value: featuredYojnas.docs.length,
    color: 'text-orange-600',
    icon: '⭐',
  },
].map((item, i) => (
    <div
  key={i}
  className="rounded-2xl border bg-card p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
>
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-green-700 text-2xl text-white">
  {item.icon}
</div>

<h3 className={`text-3xl font-extrabold ${item.color}`}>
  {item.value}+
</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {item.label}
        </p>
      </div>
    ))}

  </div>
</section>

      {/* FEATURED */}
      <section className="container py-10 md:py-14">
       <div className="mb-8 text-center">
  <h2 className="text-3xl font-bold">
    Featured Government Schemes
  </h2>

  <p className="mt-2 text-muted-foreground">
    Explore high-priority welfare programs currently available for citizens.
  </p>
</div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredYojnas.docs.map((yojna: any) => (
            <YojnaCard key={yojna.id} yojna={yojna} featured />
          ))}
        </div>
      </section>
      {/* LATEST ANNOUNCEMENTS */}
<section className="container py-10 md:py-14">
  <div className="mb-8 flex flex-col items-center text-center">
  <h2 className="text-3xl font-bold">
    Latest Announcements
  </h2>

  <p className="mt-2 text-muted-foreground">
    Stay updated with the latest government notices, updates, and public announcements.
  </p>

  <Link
    href="/posts"
    className="mt-4 text-primary font-semibold hover:underline"
  >
    View All News →
  </Link>
</div>

  <div className="grid gap-6 md:grid-cols-2">
    {posts.docs.map((post: any) => (
      <Link
        key={post.id}
        href={`/posts/${post.slug}`}
        className="rounded-xl border bg-card p-6 shadow-sm hover:shadow-md transition"
      >
        <div className="flex items-center justify-between mb-3">
  <span className="text-xs text-primary font-medium">
    📢 Announcement
  </span>

  <span className="text-xs text-muted-foreground">
    {post.publishedAt
      ? new Date(post.publishedAt).toLocaleDateString()
      : 'Latest Update'}
  </span>
</div>

        <h3 className="text-xl font-bold mb-2">
          {post.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-3">
          {post.meta?.description ||
  'Latest announcement from Raipur District Administration.'}
        </p>

        <div className="mt-4 flex justify-end">
  <span className="text-primary font-semibold">
    Read More →
  </span>
</div>
      </Link>
    ))}
  </div>
</section>

    </main>
  )
}

export const metadata: Metadata = {
  title: 'Yojna Portal',
  description: 'Government Schemes Portal',
}