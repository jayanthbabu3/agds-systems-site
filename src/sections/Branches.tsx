import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import { Brain, Buildings, Cpu, Code, Gear, Lightning, ShareNetwork, ShieldCheck } from '@phosphor-icons/react'
import { Section } from '../components/ui'
import { CONTENT } from '../data/site'
import { useReveal } from '../lib/motion'

const ICONS: Record<string, PhosphorIcon> = {
  code: Code,
  brain: Brain,
  shield: ShieldCheck,
  circuit: Cpu,
  bolt: Lightning,
  gear: Gear,
  building: Buildings,
  network: ShareNetwork,
}

/** One soft, distinct tint per practice — the way a feature grid tells
    capabilities apart at a glance. The site's own accent still owns every
    button and link; these are small, contained, decorative chips. */
const TINTS: Record<string, { bg: string; fg: string; ring: string }> = {
  code: { bg: '#eef2ff', fg: '#4f46e5', ring: '#c7d2fe' },
  brain: { bg: '#f5f3ff', fg: '#7c3aed', ring: '#ddd6fe' },
  shield: { bg: '#fff1f2', fg: '#e11d48', ring: '#fecdd3' },
  circuit: { bg: '#f0fdfa', fg: '#0d9488', ring: '#99f6e4' },
  bolt: { bg: '#fffbeb', fg: '#d97706', ring: '#fde68a' },
  gear: { bg: '#f0f9ff', fg: '#0284c7', ring: '#bae6fd' },
  building: { bg: '#ecfdf5', fg: '#059669', ring: '#a7f3d0' },
  network: { bg: '#fff7ed', fg: '#ea580c', ring: '#fed7aa' },
}

/**
 * A quiet capability grid, not a photo-card wall: a centred pill + headline,
 * then icon-led items in a plain 4-column grid. Nothing to click, nothing
 * to load — this section's job is "what do you do" answered in one glance,
 * not another set of WhatsApp links (the CTA sections already carry that).
 */
export default function Branches() {
  const ref = useReveal<HTMLElement>({ stagger: 0.06 })
  const { branches } = CONTENT

  return (
    <Section id="branches" ref={ref} tint className="relative overflow-hidden">
      <div aria-hidden className="mesh-fade absolute inset-0" />

      <div className="relative">
        <div className="reveal mx-auto max-w-2xl text-center">
          <span className="label inline-flex rounded-full bg-accent-soft px-3 py-1.5 text-accent">Capabilities</span>
          <h2 className="display mt-5 text-[clamp(1.9rem,3.4vw,2.8rem)] text-ink text-balance">{branches.title}</h2>
          <p className="mt-5 text-[1.02rem] leading-[1.7] text-body">{branches.lede}</p>
        </div>

        <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {branches.items.map((b) => {
            const Icon = ICONS[b.icon] ?? Code
            const tint = TINTS[b.icon] ?? {
              bg: 'var(--color-accent-soft)',
              fg: 'var(--color-accent)',
              ring: 'var(--color-line)',
            }
            return (
              <li key={b.id} className="reveal group flex flex-col items-center text-center">
                <span
                  className="grid size-14 shrink-0 place-items-center rounded-2xl border transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-105"
                  style={{ backgroundColor: tint.bg, color: tint.fg, borderColor: tint.ring }}
                >
                  <Icon weight="duotone" className="size-7" />
                </span>
                <h3 className="mt-4 text-[1.02rem] font-semibold text-ink">{b.name}</h3>
                <p className="mt-1.5 max-w-[26ch] text-[0.88rem] leading-[1.55] text-muted">{b.body}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </Section>
  )
}
