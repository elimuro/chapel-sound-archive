import {defineField} from 'sanity'

export const imageAltField = defineField({
  name: 'alt',
  title: 'Alternative text',
  type: 'string',
  validation: (rule) =>
    rule.custom((alt, context) => {
      const hasImage = Boolean((context.parent as {asset?: {_ref?: string}})?.asset?._ref)
      if (hasImage && !alt) {
        return 'Alt text is required when an image is set'
      }
      return true
    }),
})
