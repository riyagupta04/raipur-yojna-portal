import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'
import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidateYojna } from './hooks/revalidateYojna'

const richTextField = (name: string, label: string, required = false) => ({
  name,
  type: 'richText' as const,
  label,
  required,
  editor: lexicalEditor({
    features: ({ rootFeatures }) => [
      ...rootFeatures,
      HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
      FixedToolbarFeature(),
      InlineToolbarFeature(),
      HorizontalRuleFeature(),
    ],
  }),
})

export const Yojnas: CollectionConfig = {
  slug: 'yojnas',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    category: true,
    summary: true,
    status: true,
    heroImage: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'yojnas',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'yojnas',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
            },
            {
              name: 'summary',
              type: 'textarea',
              required: true,
            },
            richTextField('content', 'Overview', true),
            richTextField('eligibility', 'Eligibility'),
            richTextField('benefits', 'Benefits'),
            richTextField('howToApply', 'How to Apply'),
          ],
        },
        {
          label: 'Scheme Details',
          fields: [
            {
              name: 'category',
              type: 'relationship',
              relationTo: 'categories',
              required: true,
            },
            {
              name: 'department',
              type: 'text',
              required: true,
              defaultValue: 'Raipur District Administration',
            },
            {
              name: 'beneficiaries',
              type: 'textarea',
            },
            {
              name: 'status',
              type: 'select',
              defaultValue: 'active',
              options: [
                { label: 'Active', value: 'active' },
                { label: 'Upcoming', value: 'upcoming' },
                { label: 'Closed', value: 'closed' },
              ],
              required: true,
            },
            {
              name: 'launchDate',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayOnly',
                },
              },
            },
            {
              name: 'externalLink',
              type: 'text',
              admin: {
                description: 'Official application or information URL.',
              },
            },
            {
              name: 'relatedNews',
              type: 'relationship',
              hasMany: true,
              relationTo: 'posts',
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateYojna],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
