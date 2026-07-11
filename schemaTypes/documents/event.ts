import {defineArrayMember, defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons/Calendar'
import {isInstanceKind, isOccurrenceKind, isSeriesKind} from '../shared/eventKind'
import {imageAltField} from '../shared/imageAltField'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
  groups: [
    {name: 'details', title: 'Details', default: true},
    {name: 'media', title: 'Media'},
    {name: 'people', title: 'People'},
    {name: 'relations', title: 'Relations'},
    {name: 'links', title: 'Links'},
    {name: 'internal', title: 'Internal'},
  ],
  fields: [
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      group: 'details',
      options: {
        list: [
          {title: 'Standalone event', value: 'standalone'},
          {title: 'Series', value: 'series'},
          {title: 'Series instance', value: 'instance'},
        ],
        layout: 'radio',
      },
      initialValue: 'standalone',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'details',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'details',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'parentEvent',
      title: 'Series',
      type: 'reference',
      group: 'details',
      to: [{type: 'event'}],
      hidden: ({document}) => !isInstanceKind(document?.kind as string | undefined),
      options: {
        filter: 'kind == "series"',
      },
      validation: (rule) =>
        rule.custom((parentEvent, context) => {
          const kind = context.document?.kind
          if (kind === 'instance' && !parentEvent) {
            return 'Series instances must reference a parent series event'
          }
          if (kind !== 'instance' && parentEvent) {
            return 'Only series instances can reference a parent series'
          }
          return true
        }),
    }),
    defineField({
      name: 'seriesOrder',
      title: 'Order in series',
      type: 'number',
      group: 'details',
      hidden: ({document}) => !isInstanceKind(document?.kind as string | undefined),
      validation: (rule) => rule.min(0).integer(),
      description: 'Optional sort order when displaying instances on a series page.',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      group: 'details',
      rows: 3,
      hidden: ({document}) => !isSeriesKind(document?.kind as string | undefined),
      description: 'Short description for series listings and cards.',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      group: 'details',
      hidden: ({document}) => isSeriesKind(document?.kind as string | undefined),
      validation: (rule) =>
        rule.custom((date, context) => {
          const kind = context.document?.kind
          if (isOccurrenceKind(kind as string | undefined) && !date) {
            return 'Date is required for standalone events and series instances'
          }
          return true
        }),
      description: 'Used for sorting, filtering by year, and archive timelines in the Next.js site.',
    }),
    defineField({
      name: 'startDate',
      title: 'Start date',
      type: 'date',
      group: 'details',
      hidden: ({document}) => !isSeriesKind(document?.kind as string | undefined),
    }),
    defineField({
      name: 'endDate',
      title: 'End date',
      type: 'date',
      group: 'details',
      hidden: ({document}) => !isSeriesKind(document?.kind as string | undefined),
      validation: (rule) =>
        rule.custom((endDate, context) => {
          const startDate = context.document?.startDate
          if (startDate && endDate && endDate < startDate) {
            return 'End date must be on or after the start date'
          }
          return true
        }),
    }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'blockContent',
      group: 'details',
      description: 'Full description shown on the event or series page.',
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      group: 'media',
      options: {hotspot: true},
      fields: [imageAltField],
    }),
    defineField({
      name: 'posterDesigner',
      title: 'Poster designer',
      type: 'string',
      group: 'media',
      hidden: ({document}) => isSeriesKind(document?.kind as string | undefined),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      group: 'media',
      hidden: ({document}) => isSeriesKind(document?.kind as string | undefined),
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [imageAltField],
        }),
      ],
      validation: (rule) => rule.max(10).warning('Keep to 5–10 photos for best site performance'),
      description: 'Event documentation photos. Prefer web-sized images.',
    }),
    defineField({
      name: 'photoCredit',
      title: 'Photo credit',
      type: 'string',
      group: 'media',
      hidden: ({document}) => isSeriesKind(document?.kind as string | undefined),
      description: 'Photographer or credit line for event photos.',
    }),
    defineField({
      name: 'musicalArtists',
      title: 'Musical artists',
      type: 'array',
      group: 'people',
      hidden: ({document}) => isSeriesKind(document?.kind as string | undefined),
      of: [defineArrayMember({type: 'reference', to: [{type: 'person'}]})],
      description: 'Performing musicians and DJs at this event.',
    }),
    defineField({
      name: 'visualArtists',
      title: 'Visual artists',
      type: 'array',
      group: 'people',
      hidden: ({document}) => isSeriesKind(document?.kind as string | undefined),
      of: [defineArrayMember({type: 'reference', to: [{type: 'person'}]})],
      description: 'Visual performers and artists presenting work at this event.',
    }),
    defineField({
      name: 'presenters',
      title: 'Presenters',
      type: 'array',
      group: 'people',
      hidden: ({document}) => isSeriesKind(document?.kind as string | undefined),
      of: [defineArrayMember({type: 'reference', to: [{type: 'person'}]})],
      description:
        'Speakers, panelists, tech demos, and partner-presented events that are not strictly musical or visual.',
    }),
    defineField({
      name: 'venues',
      title: 'Venues',
      type: 'array',
      group: 'relations',
      hidden: ({document}) => isSeriesKind(document?.kind as string | undefined),
      of: [defineArrayMember({type: 'reference', to: [{type: 'venue'}]})],
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'array',
      group: 'relations',
      of: [defineArrayMember({type: 'reference', to: [{type: 'partner'}]})],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'relations',
      of: [defineArrayMember({type: 'reference', to: [{type: 'tag'}]})],
      description: 'Public-facing filters and categories for the archive.',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      group: 'links',
      description: 'Link to an external page such as Facebook or a series website.',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'organizerNote',
      title: 'Organizer note',
      type: 'string',
      group: 'links',
      hidden: ({document}) => isSeriesKind(document?.kind as string | undefined),
      description: 'Legacy free-text organizer label. Prefer linking partners or presenters when possible.',
    }),
    defineField({
      name: 'organizerEmail',
      title: 'Organizer contact email',
      type: 'string',
      group: 'internal',
      hidden: ({document}) => isSeriesKind(document?.kind as string | undefined),
      validation: (rule) => rule.email(),
      description: 'Internal contact only. Not intended for public display on the website.',
    }),
    defineField({
      name: 'attendance',
      title: 'Attendance (approx.)',
      type: 'number',
      group: 'internal',
      hidden: ({document}) => isSeriesKind(document?.kind as string | undefined),
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'airtableId',
      title: 'Airtable record ID',
      type: 'string',
      readOnly: true,
      hidden: ({value}) => value === undefined,
      group: 'internal',
      description: 'Temporary import identifier. Safe to remove after migration is complete.',
    }),
  ],
  orderings: [
    {
      title: 'Date, newest first',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Date, oldest first',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
    {
      title: 'Series start, newest first',
      name: 'startDateDesc',
      by: [{field: 'startDate', direction: 'desc'}],
    },
    {
      title: 'Title A–Z',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      kind: 'kind',
      date: 'date',
      startDate: 'startDate',
      endDate: 'endDate',
      media: 'poster',
    },
    prepare({title, kind, date, startDate, endDate, media}) {
      const kindLabel =
        kind === 'series' ? 'Series' : kind === 'instance' ? 'Instance' : 'Event'

      let subtitle: string | undefined
      if (kind === 'series') {
        subtitle =
          startDate && endDate && startDate !== endDate
            ? `${kindLabel} · ${startDate} – ${endDate}`
            : kindLabel
      } else {
        subtitle = date ? `${kindLabel} · ${date}` : kindLabel
      }

      return {
        title: title || 'Untitled event',
        subtitle,
        media,
      }
    },
  },
})
