import { z } from 'zod'
import raw from '../../content/site.json'

/**
 * Every word on the page lives in content/site.json. This schema is the
 * contract: bad content fails the build instead of shipping broken.
 *
 * NOTE: AGDS Systems is a fictional software consultancy. Client names,
 * numbers and quotes are sample data for the demo build. See README.
 *
 * Field names below (branches, campus, placements, admissions, cutoffs...)
 * are inherited from the college-website template this was forked from —
 * they are repurposed here (branches→services, campus→how-we-work,
 * placements→results, admissions→engagement) rather than renamed, to keep
 * the component diff small. See each section component for the mapping.
 */

const stat = z.object({
  value: z.number(),
  suffix: z.string(),
  label: z.string(),
  decimals: z.number().int().optional(),
})

const schema = z.object({
  site: z.object({
    name: z.string(),
    fullName: z.string(),
    tagline: z.string(),
    city: z.string(),
    established: z.number().int(),
    phone: z.string().regex(/^\+\d{10,15}$/),
    phoneDisplay: z.string(),
    email: z.string().email(),
    address: z.string(),
    mapUrl: z.string().url(),
    counsellingCode: z.string(),
    applyUrl: z.string(),
    whatsappMessage: z.string(),
  }),
  nav: z.array(z.object({ href: z.string().startsWith('#'), label: z.string() })).min(3),
  hero: z.object({
    eyebrow: z.string(),
    headline: z.tuple([z.string(), z.string()]),
    sub: z.string(),
    primaryCta: z.string(),
    secondaryCta: z.string(),
    stats: z.array(stat).max(3),
  }),
  trust: z.array(z.string()).min(3),
  about: z.object({
    title: z.string(),
    body: z.string(),
    points: z.array(z.object({ title: z.string(), body: z.string() })).length(3),
  }),
  branches: z.object({
    title: z.string(),
    lede: z.string(),
    items: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
          short: z.string(),
          seats: z.number().int(),
          icon: z.string(),
          body: z.string(),
          tags: z.array(z.string()).max(3),
        }),
      )
      .min(4),
  }),
  campus: z.object({
    title: z.string(),
    lede: z.string(),
    gallery: z
      .array(
        z.object({
          id: z.string(),
          src: z.string(),
          alt: z.string(),
          caption: z.string(),
          span: z.enum(['wide', 'tall']).optional(),
        }),
      )
      .min(4),
    facilities: z.array(z.object({ icon: z.string(), title: z.string(), body: z.string() })).min(3),
  }),
  placements: z.object({
    title: z.string(),
    lede: z.string(),
    stats: z.array(stat).max(4),
    recent: z
      .array(
        z.object({
          name: z.string(),
          branch: z.string(),
          company: z.string(),
          role: z.string(),
          package: z.string(),
          photo: z.string(),
        }),
      )
      .min(3),
    recruiters: z.array(z.object({ name: z.string(), slug: z.string() })).min(6),
    byBranch: z.array(z.object({ branch: z.string(), placed: z.number() })).min(4),
    hrQuote: z.object({ quote: z.string(), name: z.string(), role: z.string() }),
  }),
  leadership: z.object({
    title: z.string(),
    message: z.string(),
    people: z
      .array(
        z.object({
          name: z.string(),
          role: z.string(),
          creds: z.string(),
          quote: z.string(),
          photo: z.string(),
        }),
      )
      .min(1),
  }),
  events: z.object({
    title: z.string(),
    items: z
      .array(
        z.object({
          date: z.string(),
          tag: z.string(),
          title: z.string(),
          body: z.string(),
          image: z.string(),
        }),
      )
      .min(3),
    upcoming: z.array(z.object({ date: z.string(), title: z.string(), body: z.string() })).min(1),
  }),
  testimonials: z
    .array(z.object({ quote: z.string(), name: z.string(), role: z.string(), photo: z.string() }))
    .min(2),
  admissions: z.object({
    title: z.string(),
    steps: z.array(z.object({ title: z.string(), body: z.string() })).length(3),
    fees: z.array(z.object({ item: z.string(), amount: z.string(), note: z.string() })).min(2),
    cutoffs: z.array(z.object({ branch: z.string(), rank: z.string() })).min(4),
  }),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
  contact: z.object({ title: z.string(), lede: z.string(), routes: z.array(z.string()).min(2) }),
})

export const CONTENT = schema.parse(raw)
export const SITE = CONTENT.site
export const NAV = CONTENT.nav

export const whatsappHref = (message: string = SITE.whatsappMessage) =>
  `https://wa.me/${SITE.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
