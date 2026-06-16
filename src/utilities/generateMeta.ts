import type { Metadata } from 'next'

import type { Media, Page, Post, Yojna, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/template.png'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | Partial<Yojna> | null
  pathPrefix?: string
}): Promise<Metadata> => {
  const { doc, pathPrefix = '' } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const siteTitle = 'Yojna Portal | Raipur District Government'

  const title = doc?.meta?.title ? doc?.meta?.title + ` | ${siteTitle}` : siteTitle
  const slug = Array.isArray(doc?.slug) ? doc?.slug.join('/') : doc?.slug
  const url = slug ? `${pathPrefix}/${slug}`.replace(/\/+/g, '/') : '/'

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url,
    }),
    title,
  }
}
