import {defineField, defineType} from 'sanity'
import {PinIcon} from '@sanity/icons/Pin'
import {imageAltField} from '../shared/imageAltField'

export const venue = defineType({
  name: 'venue',
  title: 'Venue',
  type: 'document',
  icon: PinIcon,
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
      description: 'Short description for venue listings and cards.',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      group: 'profile',
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'blockContent',
      group: 'profile',
      description: 'Full venue profile shown on the venue page.',
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      fields: [imageAltField],
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
      subtitle: 'address',
      media: 'picture',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled venue',
        subtitle: subtitle || undefined,
        media,
      }
    },
  },
})
