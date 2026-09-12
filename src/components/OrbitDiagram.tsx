import type { Icon as PhosphorIcon } from '@phosphor-icons/react'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Briefcase,
  ChatsCircle,
  CloudArrowUp,
  Cpu,
  RocketLaunch,
  UsersFour,
} from '@phosphor-icons/react'
import Mark from './Mark'
import { SITE } from '../data/site'

const RADIUS = 40 // percent, from centre

function polar(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: 50 + r * Math.cos(rad), y: 50 + r * Math.sin(rad) }
}

type Item = { icon: PhosphorIcon; title: string; sub: string }
type Node = Item & { x: number; y: number }

const ITEMS: Item[] = [
  { icon: Cpu, title: 'AI Services', sub: 'Build with intelligence' },
  { icon: RocketLaunch, title: 'Product Development', sub: 'Scalable digital products' },
  { icon: Briefcase, title: 'Freelancing', sub: 'On-demand expertise' },
  { icon: CloudArrowUp, title: 'Cloud & DevOps', sub: 'Build. Deploy. Scale.' },
  { icon: UsersFour, title: 'Dedicated Teams', sub: 'Your extended engineering team' },
  { icon: ChatsCircle, title: 'Consulting', sub: 'From idea to impact' },
]

// Six nodes, evenly spaced, starting at 12 o'clock and going clockwise.
const NODES: Node[] = ITEMS.map((item, i) => ({ ...item, ...polar(i * 60, RADIUS) }))

// Small marker dots at the midpoint between each pair of nodes.
const MARKERS = NODES.map((_, i) => polar(30 + i * 60, RADIUS))

/**
 * The mechanism: AGDS at the centre of its own practices, not a product
 * screenshot. No narrator walking a highlight around the dial — every
 * card already carries its own full title and line, so there's nothing
 * for a spotlight to explain. Instead each node just breathes gently in
 * place, each on its own offset, the way a constellation reads as alive
 * without any single star doing anything. Everything freezes under
 * prefers-reduced-motion (handled globally in index.css).
 */
export function OrbitDiagram() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[34rem]">
      {/* Handwritten annotations */}
      <p className="hand absolute -top-2 right-2 hidden -rotate-6 text-[1.4rem] leading-[1.05] text-accent sm:block">
        Ideas engineered
        <br />
        for what&apos;s next
        <ArrowDownLeft weight="bold" className="mt-1 ml-auto size-5 text-accent/70" />
      </p>
      <p className="hand absolute -bottom-3 -left-2 hidden rotate-3 text-[1.4rem] leading-[1.05] text-accent sm:block">
        <ArrowUpRight weight="bold" className="mb-1 size-5 text-accent/70" />
        People
        <br />
        Process
        <br />
        Possibility
      </p>

      {/* Fixed dashed ring + marker dots */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          stroke="var(--color-accent)"
          strokeOpacity="0.25"
          strokeWidth="0.5"
          strokeDasharray="2.2 3"
        />
        {MARKERS.map((m, i) => (
          <circle
            key={i}
            className="orbit-dot"
            cx={m.x}
            cy={m.y}
            r="1.1"
            fill="var(--color-accent)"
            style={{ transformOrigin: `${m.x}px ${m.y}px`, animationDelay: `${i * 0.4}s` }}
          />
        ))}
      </svg>

      {/* Ambient glow behind the hub */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          backgroundImage:
            'radial-gradient(closest-side, color-mix(in oklab, var(--color-accent) 14%, transparent), transparent)',
        }}
      />

      {/* Centre hub */}
      <div className="absolute top-1/2 left-1/2 flex size-[46%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-2 rounded-full border border-line bg-raised text-center">
        <Mark className="size-10 sm:size-12" />
        <div>
          <p className="display text-[1.1rem] leading-none text-ink sm:text-[1.3rem]">{SITE.name}</p>
          <p className="label mt-1.5 text-[0.55rem] leading-tight text-muted sm:text-[0.6rem]">
            Software Engineering
            <br />& Applied AI
          </p>
        </div>
      </div>

      {/* The six practice nodes — each breathes gently, on its own offset.
          Centering (translate -50%/-50%) and the float animation each need
          the `transform` property, so they live on separate elements —
          a CSS animation's transform replaces the whole property, it
          doesn't compose with a sibling utility class. */}
      {NODES.map((node, i) => (
        <div
          key={node.title}
          className="group absolute w-[9.5rem] sm:w-[11rem]"
          style={{ left: `${node.x}%`, top: `${node.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div
            className="node-float flex flex-col items-center text-center"
            style={{ animationDelay: `${i * 0.6}s` }}
          >
            <span
              className="z-10 grid size-11 shrink-0 place-items-center rounded-full border border-line text-accent transition-colors duration-300 group-hover:border-accent/50"
              style={{
                backgroundImage:
                  'linear-gradient(160deg, color-mix(in oklab, var(--color-accent) 16%, white) 0%, color-mix(in oklab, var(--color-accent) 6%, white) 100%)',
              }}
            >
              <node.icon weight="duotone" className="size-5" />
            </span>
            <div className="card -mt-3 w-full pt-5 pb-3">
              <p className="text-[0.82rem] leading-tight font-semibold text-ink">{node.title}</p>
              <p className="mt-0.5 px-2 text-[0.7rem] leading-snug text-muted">{node.sub}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
