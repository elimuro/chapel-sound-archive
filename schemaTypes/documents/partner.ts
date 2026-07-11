import {defineField, defineType} from 'sanity'
import {HeartIcon} from '@sanity/icons/Heart'
import {imageAltField} from '../shared/imageAltField'

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  icon: HeartIcon,
  groups: [
    {name: 'profile', title: 'Profile', default: true},
    {name: 'media', title: 'Media'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'profile',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'profile',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'profile',
      rows: 3,
      description: 'Short description for partner listings and cards.',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'blockContent',
      group: 'profile',
      description: 'Full partner profile shown on the partner page.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      fields: [imageAltField],
    }),
    defineField({
      name: 'airtableId',
      title: 'Airtable record ID',
      type: 'string',
      readOnly: true,
      hidden: ({value}) => value === undefined,
      description: 'Temporary import identifier. Safe to remove after migration is complete.',
    }),
  ],
  orderings: [
    {
      title: 'Title A–Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'logo',
    },
    prepare({title, media}) {
      return {
        title: title || 'Untitled partner',
        media,
      }
    },
  },
})
