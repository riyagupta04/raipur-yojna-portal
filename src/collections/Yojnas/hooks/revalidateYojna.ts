import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Yojna } from '../../../payload-types'

const revalidateYojnaPaths = (slug?: string | null) => {
  revalidatePath('/')
  revalidatePath('/yojnas')
  revalidateTag('yojnas-sitemap', 'max')

  if (slug) {
    revalidatePath(`/yojnas/${slug}`)
  }
}

export const revalidateYojna: CollectionAfterChangeHook<Yojna> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      payload.logger.info(`Revalidating yojna at path: /yojnas/${doc.slug}`)
      revalidateYojnaPaths(doc.slug)
    }

    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      payload.logger.info(`Revalidating old yojna at path: /yojnas/${previousDoc.slug}`)
      revalidateYojnaPaths(previousDoc.slug)
    }
  }

  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Yojna> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    revalidateYojnaPaths(doc?.slug)
  }

  return doc
}
