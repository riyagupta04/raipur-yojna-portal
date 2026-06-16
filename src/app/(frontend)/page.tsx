// import type { Metadata } from 'next'

// import {
//   Baby,
//   GraduationCap,
//   Handshake,
//   HeartPulse,
//   Landmark,
//   Leaf,
//   Palette,
//   Search,
//   Users,
// } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'
// import DotGrid from '@/components/DotGrid'

// import { YojnaCard } from '@/components/YojnaCard'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
// import { yojnaCategories } from '@/endpoints/seed/yojnas'
// import HeroSlider from '@/components/HeroSlider'
// export const dynamic = 'force-static'
// export const revalidate = 600

// const categoryIcons = {
//   baby: Baby,
//   'graduation-cap': GraduationCap,
//   handshake: Handshake,
//   'heart-pulse': HeartPulse,
//   landmark: Landmark,
//   leaf: Leaf,
//   palette: Palette,
//   users: Users,
// }

// const categoryAccentClass = (color?: string | null) => {
//   switch (color) {
//     case 'education':
//       return 'text-category-education bg-category-education/10'
//     case 'women':
//       return 'text-category-women bg-category-women/10'
//     case 'agriculture':
//       return 'text-category-agriculture bg-category-agriculture/10'
//     case 'governance':
//       return 'text-category-governance bg-category-governance/10'
//     case 'welfare':
//       return 'text-category-welfare bg-category-welfare/10'
//     case 'child':
//       return 'text-category-child bg-category-child/10'
//     case 'culture':
//       return 'text-category-culture bg-category-culture/10'
//     default:
//       return 'text-category-health bg-category-health/10'
//   }
// }

// export default async function HomePage() {
//   const payload = await getPayload({ config: configPromise })

//   const [categories, posts] = await Promise.all([
//     payload
//       .find({
//         collection: 'categories',
//         depth: 0,
//         limit: 8,
//         overrideAccess: false,
//         sort: 'title',
//         select: {
//           color: true,
//           description: true,
//           icon: true,
//           slug: true,
//           title: true,
//         },
//       })
//       .catch(() => ({
//         docs: yojnaCategories.map((category) => ({
//           color: category.color,
//           description: category.description,
//           icon: category.icon,
//           id: category.slug,
//           slug: category.slug,
//           title: category.title,
//         })),
//       })),
//     payload.find({
//       collection: 'posts',
//       depth: 0,
//       limit: 2,
//       overrideAccess: false,
//       sort: '-publishedAt',
//       select: {
//         meta: true,
//         publishedAt: true,
//         slug: true,
//         title: true,
//       },
//     }),
//   ])
//   const featuredYojnas = await payload
//     .find({
//       collection: 'yojnas',
//       depth: 1,
//       limit: 3,
//       overrideAccess: false,
//       sort: '-updatedAt',
//       select: {
//         category: true,
//         department: true,
//         externalLink: true,
//         slug: true,
//         status: true,
//         summary: true,
//         title: true,
//       },
//       where: {
//         status: {
//           in: ['active', 'upcoming'],
//         },
//       },
//     })
//     .catch(() => ({ docs: [] }))
//     const [yojnaCount, categoryCount, postCount] = await Promise.all([
//   payload.find({
//     collection: 'yojnas',
//     limit: 1,
//   }),
//   payload.find({
//     collection: 'categories',
//     limit: 1,
//   }),
//   payload.find({
//     collection: 'posts',
//     limit: 1,
//   }),
// ])

//   return (
//     <main>
//       {/* <section className="relative isolate overflow-hidden border-b border-border bg-civic-surface">
//         <div className="absolute inset-0 -z-10 opacity-25">
//           <DotGrid
//             dotSize={4}
//             gap={50}
//             baseColor="#056c00"
//             activeColor="#056c00"
//             proximity={150}
//             speedTrigger={100}
//             shockRadius={250}
//             shockStrength={5}
//             maxSpeed={5000}
//             resistance={750}
//             returnDuration={1.5}
//             style={{ height: '100%', width: '100%' }}
//           />
//         </div>
//         <div className="container relative py-14 text-center md:py-20">
//           <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
//             Government of Chhattisgarh
//           </p>
//           <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-[-0.02em] text-foreground md:text-6xl">
//             Empowering Citizens through Schemes
//           </h1>
//           <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
//             Discover government initiatives, welfare programs, and developmental schemes designed
//             for the citizens of Raipur District.
//           </p>

//           <form action="/yojnas" className="mx-auto mt-8 flex max-w-3xl gap-3">
//             <span className="relative flex-1">
//               <Search
//                 aria-hidden
//                 className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
//               />
//               <Input
//                 className="h-12 rounded-lg bg-card pl-12"
//                 name="q"
//                 placeholder="Search for Government Schemes (e.g., Health, Education)..."
//               />
//             </span>
//             <Button className="h-12 px-7" type="submit">
//               Search
//             </Button>
//           </form>
//         </div>
//       </section> */}
//   <section className="relative isolate overflow-hidden border-b border-border min-h-[650px]">
//     <HeroSlider />
//   {/* Dark Overlay */}
  

//   <div className="container relative z-10 py-20 text-center md:py-32">
//     <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-green-300">
//       Government of Chhattisgarh
//     </p>
//          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
//   <div className="rounded-xl bg-white/10 backdrop-blur-md p-4 text-white">
//     <h3 className="text-3xl font-bold">{yojnaCount.totalDocs}+</h3>
//     <p className="text-sm text-white/80">Government Schemes</p>
//   </div>

//   <div className="rounded-xl bg-white/10 backdrop-blur-md p-4 text-white">
//     <h3 className="text-3xl font-bold">{categoryCount.totalDocs}</h3>
//     <p className="text-sm text-white/80">Categories</p>
//   </div>

//   <div className="rounded-xl bg-white/10 backdrop-blur-md p-4 text-white">
//     <h3 className="text-3xl font-bold">{postCount.totalDocs}</h3>
//     <p className="text-sm text-white/80">Announcements</p>
//   </div>

//   <div className="rounded-xl bg-white/10 backdrop-blur-md p-4 text-white">
//     <h3 className="text-3xl font-bold">{featuredYojnas.docs.length}</h3>
//     <p className="text-sm text-white/80">Featured Schemes</p>
//   </div>
// </div>
//     <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-[-0.02em] text-white md:text-6xl">
//       Empowering Citizens Through Government Schemes
//     </h1>

//     <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/90 md:text-lg">
//       Discover government initiatives, welfare programs, and development schemes
//       designed to improve the lives of citizens across Raipur District.
//     </p>

//     <form action="/yojnas" className="mx-auto mt-10 flex max-w-3xl gap-3">
//       <span className="relative flex-1">
//         <Search
//           aria-hidden
//           className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
//         />

//         <Input
//           className="h-12 rounded-lg bg-white pl-12 text-black"
//           name="q"
//           placeholder="Search Government Schemes..."
//         />
//       </span>

//       <Button className="h-12 px-7 bg-green-600 hover:bg-green-700" type="submit">
//         Search
//       </Button>
//     </form>
//   </div>
// </section>
// {/* STATS SECTION */}
// <section className="container py-10 md:py-14">
//   <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

//     <div className="rounded-xl border bg-card p-5 text-center">
//       <h3 className="text-3xl font-bold text-primary">
//         {yojnaCount.totalDocs}+
//       </h3>
//       <p className="text-sm text-muted-foreground">
//         Government Schemes
//       </p>
//     </div>

//     <div className="rounded-xl border bg-card p-5 text-center">
//       <h3 className="text-3xl font-bold text-primary">
//         {categoryCount.totalDocs}
//       </h3>
//       <p className="text-sm text-muted-foreground">
//         Categories
//       </p>
//     </div>

//     <div className="rounded-xl border bg-card p-5 text-center">
//       <h3 className="text-3xl font-bold text-primary">
//         {postCount.totalDocs}
//       </h3>
//       <p className="text-sm text-muted-foreground">
//         Announcements
//       </p>
//     </div>

//     <div className="rounded-xl border bg-card p-5 text-center">
//       <h3 className="text-3xl font-bold text-primary">
//         {featuredYojnas.docs.length}
//       </h3>
//       <p className="text-sm text-muted-foreground">
//         Featured Schemes
//       </p>
//     </div>

//   </div>
// </section>
//       <section className="container py-10 md:py-14">
//         <div className="mb-6 flex items-end justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-bold">Explore by Category</h2>
//             <p className="mt-1 text-sm text-muted-foreground">
//               Browse all 8 official scheme categories from the district catalog.
//             </p>
//           </div>
//           <Link
//             className="hidden text-sm font-semibold text-primary hover:underline md:block"
//             href="/yojnas"
//           >
//             View all schemes
//           </Link>
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
//           {categories.docs.map((category) => {
//             const Icon =
//               categoryIcons[(category.icon || 'landmark') as keyof typeof categoryIcons] || Landmark

//             return (
//               <Link
//                 className="group rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-[0_8px_24px_rgba(24,28,32,0.06)]"
//                 href={`/yojnas?category=${category.slug}`}
//                 key={category.id}
//               >
//                 <span
//                   className={`mb-4 inline-flex size-12 items-center justify-center rounded-md ${categoryAccentClass(category.color)}`}
//                 >
//                   <Icon aria-hidden className="size-6" />
//                 </span>
//                 <h3 className="font-bold text-card-foreground group-hover:text-primary">
//                   {category.title}
//                 </h3>
//                 {category.description && (
//                   <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
//                     {category.description}
//                   </p>
//                 )}
//               </Link>
//             )
//           })}
//         </div>
//       </section>

//       <section className="border-y border-border bg-civic-surface-low py-10 md:py-14">
//         <div className="container">
//           <div className="mb-6 flex items-end justify-between gap-4">
//             <div>
//               <h2 className="text-2xl font-bold">Featured Schemes</h2>
//               <p className="mt-1 text-sm text-muted-foreground">
//                 High-priority initiatives currently active in Raipur District.
//               </p>
//             </div>
//             <Link className="text-sm font-semibold text-primary hover:underline" href="/yojnas">
//               View All Schemes
//             </Link>
//           </div>

//           <div className="grid gap-6 md:grid-cols-3">
//             {featuredYojnas.docs.map((yojna) => (
//               <YojnaCard featured key={yojna.id} yojna={yojna} />
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="container py-10 md:py-14">
//         <h2 className="mb-6 text-2xl font-bold">Latest Announcements</h2>
//         <div className="rounded-lg border border-border bg-card">
//           {posts.docs.length > 0 ? (
//             posts.docs.map((post) => (
//               <Link
//                 className="grid gap-3 border-b border-border p-5 last:border-b-0 hover:bg-muted/50 md:grid-cols-[5rem_1fr]"
//                 href={`/posts/${post.slug}`}
//                 key={post.id}
//               >
//                 <span className="text-sm font-bold text-primary">
//                   {post.publishedAt
//                     ? new Date(post.publishedAt).toLocaleDateString('en-IN', {
//                         day: '2-digit',
//                         month: 'short',
//                       })
//                     : 'News'}
//                 </span>
//                 <span>
//                   <strong className="block text-sm">{post.title}</strong>
//                   {post.meta?.description && (
//                     <span className="mt-1 block text-sm text-muted-foreground">
//                       {post.meta.description}
//                     </span>
//                   )}
//                 </span>
//               </Link>
//             ))
//           ) : (
//             <p className="p-5 text-sm text-muted-foreground">
//               Announcements from Raipur District Administration will appear here.
//             </p>
//           )}
//         </div>
//       </section>
//     </main>
//   )
// }

// export const metadata: Metadata = {
//   description:
//     'Browse government schemes, welfare programs, and development initiatives for citizens of Raipur District.',
//   title: 'Yojna Portal | Raipur District Government',
// }


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
import HeroSlider from '@/components/HeroSlider'
import { YojnaCard } from '@/components/YojnaCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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

  // ✅ ONLY COUNT QUERY 
 const [yojnaCount, categoryCount, postCount] = await Promise.all([
  payload.count({ collection: 'yojnas' }),
  payload.count({ collection: 'categories' }),
  payload.count({ collection: 'posts' }),
])
  return (
    <main>

      {/* HERO SECTION */}
      <section className="relative isolate overflow-hidden border-b border-border h-[420px]">
        <HeroSlider />

        {/* <div className="absolute inset-0 bg-black/35 z-0"></div> */}

        <div className="container relative z-30 py-12 text-center md:py-32">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-green-300">
            Government of Chhattisgarh
          </p>

          <h1 className="mx-auto max-w-4xl text-3xl font-bold text-white md:text-5xl">
  Government Welfare Schemes Portal
</h1>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/90">
  Access government welfare schemes, eligibility criteria,
  application links, and latest citizen service updates
  from Raipur District Administration.
</p>

          <form action="/yojnas" className="mx-auto mt-10 flex max-w-3xl gap-3">
            <Input
              name="q"
              className="h-12 bg-white text-black"
              placeholder="Search schemes..."
            />
            <Button className="h-12 bg-green-600">Search</Button>
          </form>
          
          <div className="mt-6 flex flex-wrap justify-center gap-3">


</div>
        </div>
        
      </section>
      <section className="container py-8">
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

    <div className="rounded-xl border bg-card p-5 text-center shadow-sm">
      <div className="text-3xl">🔍</div>
      <h3 className="mt-2 font-bold">Easy Search</h3>
      <p className="text-sm text-muted-foreground">
        Find schemes quickly
      </p>
    </div>

    <div className="rounded-xl border bg-card p-5 text-center shadow-sm">
      <div className="text-3xl">✅</div>
      <h3 className="mt-2 font-bold">Eligibility Check</h3>
      <p className="text-sm text-muted-foreground">
        Check eligibility instantly
      </p>
    </div>

    <div className="rounded-xl border bg-card p-5 text-center shadow-sm">
      <div className="text-3xl">📄</div>
      <h3 className="mt-2 font-bold">Application Guide</h3>
      <p className="text-sm text-muted-foreground">
        Application process details
      </p>
    </div>

    <div className="rounded-xl border bg-card p-5 text-center shadow-sm">
      <div className="text-3xl">📢</div>
      <h3 className="mt-2 font-bold">Latest Updates</h3>
      <p className="text-sm text-muted-foreground">
        Government announcements
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

      {/* CATEGORY SECTION */}
      <section className="container py-10">
  <div className="rounded-3xl border border-green-100 bg-white p-10 text-center shadow-lg">
    <h2 className="text-3xl font-bold text-green-700 md:text-4xl">
      Welcome to Raipur District Yojna Portal
    </h2>

    <p className="mt-4 max-w-3xl mx-auto text-gray-600 text-lg leading-8">
      This portal provides citizens with easy access to government welfare
      schemes, development programs, eligibility criteria, application details,
      and latest updates from Raipur District Administration.
    </p>
  </div>
</section>
      <section className="container py-10 md:py-14">
        <h2 className="text-2xl font-bold mb-6">Explore Categories</h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.docs.map((category: any) => {
            const Icon =
              categoryIcons[(category.icon || 'landmark') as keyof typeof categoryIcons] ||
              Landmark

            return (
           <Link
  key={category.id}
  href={`/yojnas?category=${category.slug}`}
  className="group rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
>
  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 transition group-hover:scale-110">
    <Icon className="h-6 w-6" />
  </div>

  <h3 className="text-lg font-bold transition group-hover:text-green-700">
    {category.title}
  </h3>

  <p className="mt-2 text-sm text-muted-foreground">
    {category.description}
  </p>
</Link>
            )
          })}
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