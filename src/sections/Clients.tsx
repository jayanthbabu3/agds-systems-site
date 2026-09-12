import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import {
  Buildings,
  ChartLineUp,
  CloudCheck,
  Database,
  Heartbeat,
  Hexagon,
  Sparkle,
  Stack,
} from '@phosphor-icons/react'
import { Container } from '../components/ui'
import { CONTENT } from '../data/site'
import { useReveal } from '../lib/motion'

const ICONS: PhosphorIcon[] = [Buildings, Hexagon, Heartbeat, CloudCheck, Stack, Sparkle, ChartLineUp, Database]

/** Each client gets its own colour, the way a real logo wall would —
    the site itself stays single-accent; these are third-party marks. */
const COLORS: Record<string, string> = {
  finvox: '#2563eb',
  hyperscale: '#7c3aed',
  'nexus-health': '#e11d48',
  'terra-cloud': '#059669',
  'datalink-ai': '#ea580c',
  'quantum-ventures': '#4f46e5',
  vertex: '#0d9488',
  'omicron-data': '#d97706',
}

/**
 * The client wall as a marquee — the mechanics of the shadcn
 * "marquee-logo-scroller" pattern (seamless loop, pause-on-hover, edge
 * mask, colour reveal per tile), rebuilt on this project's own tokens
 * rather than shadcn's `bg-background`/`cn()` conventions, since there is
 * no shadcn install here and one component doesn't warrant starting one.
 * No borrowed brand logos either — we have no rights to Clerk's or
 * Figma's mark, so every tile is our own client's name, set in type, each
 * carrying its own colour the way a real logo would.
 */
export default function Clients() {
  const ref = useReveal<HTMLElement>()
  const { recruiters } = CONTENT.placements
  const loop = [...recruiters, ...recruiters]

  return (
    <section id="clients" ref={ref} className="w-full border-t border-line/70 pt-16 pb-6 md:pt-20 md:pb-8">
      <Container>
        <div className="reveal grid grid-cols-1 gap-6 border-b border-line pb-8 lg:grid-cols-[3fr_2fr] lg:gap-8">
          <h2 className="display text-[clamp(1.8rem,3vw,2.4rem)] text-ink text-balance">
            Clients we&apos;ve delivered for
          </h2>
          <p className="max-w-[46ch] text-[1rem] leading-relaxed text-body lg:self-end lg:justify-self-end lg:text-right">
            Founders and engineering leaders across fintech, health and B2B SaaS bring us the
            engagement they can&apos;t afford to get wrong.
          </p>
        </div>

        <div
          className="marquee mt-10 w-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 4%, black 96%, transparent)',
          }}
        >
          <div className="marquee-track flex w-max items-center gap-4 py-1 pr-4">
            {loop.map((client, i) => {
              const Icon = ICONS[i % ICONS.length]
              const color = COLORS[client.slug] ?? 'var(--color-accent)'
              return (
                <div
                  key={`${client.slug}-${i}`}
                  className="group relative flex h-24 w-44 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-line bg-raised transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ ['--brand' as string]: color }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.08] transition-opacity duration-300 group-hover:opacity-[0.16]"
                    style={{ backgroundImage: 'linear-gradient(155deg, var(--brand) 0%, transparent 75%)' }}
                  />
                  <div className="relative flex flex-col items-center gap-2">
                    <Icon weight="duotone" className="size-6" style={{ color: 'var(--brand)' }} />
                    <span className="text-[1rem] font-bold tracking-[-0.01em] text-ink">{client.name}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
