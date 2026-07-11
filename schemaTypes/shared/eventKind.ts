export const EVENT_KINDS = ['standalone', 'series', 'instance'] as const

export type EventKind = (typeof EVENT_KINDS)[number]

export function isSeriesKind(kind: string | undefined): boolean {
  return kind === 'series'
}

export function isOccurrenceKind(kind: string | undefined): boolean {
  return kind === 'standalone' || kind === 'instance'
}

export function isInstanceKind(kind: string | undefined): boolean {
  return kind === 'instance'
}
