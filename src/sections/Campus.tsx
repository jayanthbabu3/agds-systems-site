import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import {
  BookOpenText,
  Bus,
  ChatsCircle,
  Clock,
  GitBranch,
  HouseLine,
  Trophy,
  UsersFour,
  VideoCamera,
} from '@phosphor-icons/react'
import { Heading, Section } from '../components/ui'
import { CONTENT } from '../data/site'
import { useReveal } from '../lib/motion'

const FACILITY_ICONS: Record<string, PhosphorIcon> = { home: HouseLine, bus: Bus, book: BookOpenText, trophy: Trophy }

/** One icon per gallery tile, in `campus.gallery` order — a practice snapshot, not a photograph. */
const TILE_ICONS: PhosphorIcon[] = [VideoCamera, GitBranch, Clock, UsersFour, BookOpenText, ChatsCircle]

/**
 * "How we work" as a bento of practice tiles (icon + caption, generated
 * gradients) instead of a photo gallery — there is no office to honestly
 * photograph for a distributed team. Facilities stay a plain list below.
 */
export default function Campus() {
  const ref = useReveal<HTMLElement>({ stagger: 0.06 })
  const { campus } = CONTENT

  return (
    <Section id="campus" ref={ref}>
      <Heading title={campus.title} lede={campus.lede} />

      <ul className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4 md:gap-4">
        {campus.gallery.map((g, i) => {
          const Icon = TILE_ICONS[i % TILE_ICONS.length]
          return (
            <li
              key={g.id}
              className={`reveal ${g.span === 'wide' ? 'col-span-2 row-span-2' : g.span === 'tall' ? 'row-span-2' : ''}`}
            >
              <div
                className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-2xl p-5"
                style={{
                  backgroundImage: `radial-gradient(70% 90% at ${15 + i * 12}% 20%, color-mix(in oklab, var(--color-accent) 45%, transparent) 0%, transparent 65%), linear-gradient(160deg, #0b1c30 0%, #142049 100%)`,
                }}
              >
                <Icon
                  weight="duotone"
                  className="absolute top-5 left-5 size-7 text-white/70 transition-transform duration-500 group-hover:scale-110"
                />
                <p className="relative text-[0.92rem] font-medium leading-snug text-white">{g.caption}</p>
              </div>
            </li>
          )
        })}
      </ul>

      <ul className="mt-14 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {campus.facilities.map((f) => {
          const Icon = FACILITY_ICONS[f.icon] ?? HouseLine
          return (
            <li key={f.title} className="reveal border-t border-line pt-5">
              <Icon weight="duotone" className="size-6 text-accent" />
              <p className="mt-4 text-[1rem] font-semibold text-ink">{f.title}</p>
              <p className="mt-1.5 text-[0.88rem] leading-[1.6] text-body">{f.body}</p>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
