import {defineArrayMember, defineField, defineType} from 'sanity'
import {UserIcon} from '@sanity/icons/User'
import {imageAltField} from '../shared/imageAltField'

export const person = defineType({
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: UserIcon,
  groups: [
    {name: 'profile', title: 'Profile', default: true},
    {name: 'organization', title: 'Organization'},
    {name: 'links', title: 'Links'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
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
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      group: 'profile',
      options: {hotspot: true},
      fields: [imageAltField],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      group: 'profile',
      rows: 6,
      description: 'Archive bio and artist statement. Shown on artist profile pages.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'profile',
      of: [defineArrayMember({type: 'reference', to: [{type: 'tag'}]})],
      description: 'Roles and categories such as board member or visual artist.',
    }),
    defineField({
      name: 'legalName',
      title: 'Legal name',
      type: 'string',
      group: 'organization',
      description:
        'Formal or government name. Used on staff and board pages instead of the display name when set.',
    }),
    defineField({
      name: 'staffRole',
      title: 'Staff role',
      type: 'string',
      group: 'organization',
      description: 'Current staff title, if applicable.',
    }),
    defineField({
      name: 'boardRole',
      title: 'Board role',
      type: 'string',
      group: 'organization',
    }),
    defineField({
      name: 'boardTerm',
      title: 'Board term',
      type: 'string',
      group: 'organization',
    }),
    defineField({
      name: 'affiliation',
      title: 'Affiliation',
      type: 'string',
      group: 'organization',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      group: 'links',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'soundcloud',
      title: 'SoundCloud',
      type: 'url',
      group: 'links',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'spotify',
      title: 'Spotify',
      type: 'url',
      group: 'links',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'bandcamp',
      title: 'Bandcamp',
      type: 'url',
      group: 'links',
      validation: (rule) =>
        rule.uri({
          scheme: ['http', 'https'],
        }),
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
  preview: {
    select: {
      title: 'name',
      subtitle: 'staffRole',
      media: 'photo',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled person',
        subtitle: subtitle || undefined,
        media,
      }
    },
  },
})
