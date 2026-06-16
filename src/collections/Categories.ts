import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'color'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short public description shown on category cards and filters.',
      },
    },
    {
      name: 'icon',
      type: 'select',
      defaultValue: 'landmark',
      options: [
        { label: 'Heart Pulse', value: 'heart-pulse' },
        { label: 'Graduation Cap', value: 'graduation-cap' },
        { label: 'Users', value: 'users' },
        { label: 'Leaf', value: 'leaf' },
        { label: 'Landmark', value: 'landmark' },
        { label: 'Handshake', value: 'handshake' },
        { label: 'Baby', value: 'baby' },
        { label: 'Palette', value: 'palette' },
      ],
    },
    {
      name: 'color',
      type: 'select',
      defaultValue: 'primary',
      options: [
        { label: 'Primary Green', value: 'primary' },
        { label: 'Education Blue', value: 'education' },
        { label: 'Women & Livelihood Brown', value: 'women' },
        { label: 'Agriculture Green', value: 'agriculture' },
        { label: 'Governance Blue', value: 'governance' },
        { label: 'Welfare Saffron', value: 'welfare' },
        { label: 'Child Light Green', value: 'child' },
        { label: 'Culture Brown', value: 'culture' },
      ],
    },
    slugField({
      position: undefined,
    }),
  ],
}
