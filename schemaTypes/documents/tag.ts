import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons/Tag'

export const tag = defineType({
  name: 'tag',
  title: 'Tag',
  type: 'document',
  icon: TagIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 3,
      description: 'Internal notes about how this tag is used on the site.',
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
    select: {title: 'title'},
    prepare({title}) {
      return {
        title: title || 'Untitled tag',
      }
    },
  },
})
