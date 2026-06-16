import type { Metadata } from 'next'

import { CalendarDays, FileText, Mail, Phone, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'

import type { Yojna } from '@/payload-types'

import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Media } from '@/components/Media'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import { YojnaStatusBadge } from '@/components/YojnaStatusBadge'
import configPromise from '@payload-config'
import { generateMeta } from '@/utilities/generateMeta'
import { getPayload } from 'payload'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const yojnas = await payload
    .find({
      collection: 'yojnas',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })
    .catch(() => ({ docs: [] }))

  return yojnas.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const getCategoryTitle = (yojna: Yojna) => {
  return typeof yojna.category === 'object' ? yojna.category.title : 'Scheme'
}

const formatDate = (date?: string | null) => {
  if (!date) return 'To be notified'
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const RichSection: React.FC<{
  data?: Yojna['benefits'] | Yojna['eligibility'] | Yojna['howToApply']
  fallback: string
  icon: React.ReactNode
  title: string
}> = ({ data, fallback, icon, title }) => (
  <section className="rounded-lg border border-border bg-card p-6">
    <div className="mb-4 flex items-center gap-3">
      <span className="inline-flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
        {icon}
      </span>
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
    {data ? (
      <RichText className="prose-sm max-w-none" data={data} enableGutter={false} />
    ) : (
      <p className="text-sm leading-6 text-muted-foreground">{fallback}</p>
    )}
  </section>
)

export default async function YojnaPage({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/yojnas/${decodedSlug}`
  const yojna = await queryYojnaBySlug({ slug: decodedSlug })

  if (!yojna) return <PayloadRedirects url={url} />

  return (
    <article className="bg-background pb-16">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      <header className="border-b border-border bg-civic-surface">
        <div className="container py-8">
          <nav className="mb-5 text-sm text-muted-foreground">
            Home <span className="mx-2">›</span> Schemes <span className="mx-2">›</span>{' '}
            {yojna.title}
          </nav>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                {getCategoryTitle(yojna)}
              </p>
              <h1 className="max-w-4xl text-4xl font-bold tracking-[-0.02em] md:text-5xl">
                {yojna.title}
              </h1>
            </div>
            <YojnaStatusBadge status={yojna.status} />
          </div>
        </div>
      </header>

      <div className="container grid gap-8 py-8 lg:grid-cols-[1fr_20rem]">
        <main className="space-y-8">
          <section>
            {yojna.heroImage && typeof yojna.heroImage === 'object' ? (
              <div className="overflow-hidden rounded-lg border border-border">
                <Media priority resource={yojna.heroImage} size="(max-width: 1024px) 100vw, 760px" />
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-linear-to-br from-primary/15 via-civic-surface-low to-secondary/20 p-10">
                <p className="text-2xl font-bold text-primary">
                  Empowering Lives, Restoring Smiles.
                </p>
              </div>
            )}
            <p className="mt-5 leading-7 text-muted-foreground">{yojna.summary}</p>
          </section>

          <div className="grid gap-5 md:grid-cols-2">
            <RichSection
              data={yojna.eligibility}
              fallback="Eligibility details will be published by the department."
              icon={<ShieldCheck aria-hidden className="size-5" />}
              title="Eligibility"
            />
            <RichSection
              data={yojna.benefits}
              fallback="Scheme benefits will be published by the department."
              icon={<FileText aria-hidden className="size-5" />}
              title="Benefits"
            />
          </div>

          <RichSection
            data={yojna.howToApply}
            fallback="Application instructions will be published by the department."
            icon={<FileText aria-hidden className="size-5" />}
            title="How to Apply"
          />

          {yojna.content && (
            <section className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-4 text-2xl font-bold">Scheme Details</h2>
              <RichText className="max-w-none" data={yojna.content} enableGutter={false} />
            </section>
          )}

          {Array.isArray(yojna.relatedNews) && yojna.relatedNews.length > 0 && (
            <section>
              <h2 className="mb-4 border-l-4 border-secondary pl-3 text-2xl font-bold">
                Scheme Updates & News
              </h2>
              <div className="rounded-lg border border-border bg-card">
                {yojna.relatedNews
                  .filter((post) => typeof post === 'object')
                  .map((post) => (
                    <Link
                      className="block border-b border-border p-5 last:border-b-0 hover:bg-muted/50"
                      href={`/posts/${post.slug}`}
                      key={post.id}
                    >
                      <strong className="text-sm">{post.title}</strong>
                      {post.meta?.description && (
                        <p className="mt-1 text-sm text-muted-foreground">{post.meta.description}</p>
                      )}
                    </Link>
                  ))}
              </div>
            </section>
          )}
        </main>

        <aside className="space-y-5">
          <section className="rounded-lg border border-border bg-civic-surface-container p-6">
            <h2 className="mb-4 text-xl font-bold">Scheme Summary</h2>
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted-foreground">
                  Owning Department
                </dt>
                <dd>{yojna.department || 'Raipur District Administration'}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted-foreground">
                  Target Beneficiaries
                </dt>
                <dd>{yojna.beneficiaries || 'Citizens of Raipur District'}</dd>
              </div>
              <div>
                <dt className="font-semibold uppercase tracking-wide text-muted-foreground">
                  Launch Date
                </dt>
                <dd className="flex items-center gap-2">
                  <CalendarDays aria-hidden className="size-4 text-primary" />
                  {formatDate(yojna.launchDate)}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-lg bg-[#2d3135] p-6 text-white">
            <h2 className="text-xl font-bold text-secondary">Need Help?</h2>
            <p className="mt-2 text-sm text-white/75">
              Contact the dedicated helpdesk for assistance with the application process or scheme
              details.
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <p className="flex items-center gap-2">
                <Phone aria-hidden className="size-4" />
                1800-123-4567
              </p>
              <p className="flex items-center gap-2">
                <Mail aria-hidden className="size-4" />
                helpdesk@raipur.gov.in
              </p>
            </div>
            {yojna.externalLink && (
              <Button asChild className="mt-5 w-full bg-secondary text-secondary-foreground">
                <Link href={yojna.externalLink} target="_blank">
                  Apply Now
                </Link>
              </Button>
            )}
          </section>

          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="mb-4 font-bold">Quick Links</h2>
            <div className="space-y-3 text-sm">
              <Link className="block text-civic-blue hover:underline" href="/yojnas">
                All schemes
              </Link>
              <Link className="block text-civic-blue hover:underline" href="/search">
                Search portal
              </Link>
              <Link className="block text-civic-blue hover:underline" href="/">
                Raipur District home
              </Link>
            </div>
          </section>
        </aside>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const yojna = await queryYojnaBySlug({ slug: decodedSlug })

  return generateMeta({ doc: yojna, pathPrefix: '/yojnas' })
}

const queryYojnaBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload
    .find({
      collection: 'yojnas',
      depth: 2,
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        slug: {
          equals: slug,
        },
      },
    })
    .catch(() => ({ docs: [] }))

  return result.docs?.[0] || null
})
