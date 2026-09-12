import { useEffect, useRef } from 'react'
import { ChatCircleDots, Target, UsersThree } from '@phosphor-icons/react'
import { Container } from '../components/ui'
import { CONTENT } from '../data/site'
import { gsap, prefersReducedMotion, useReveal } from '../lib/motion'

const ICONS = [UsersThree, ChatCircleDots, Target]

const COLS = 24
const ROWS = 7

/** Deterministic, not random — a genuine trend (busier in recent weeks,
    quieter on weekends) plus a fixed variation term, so the grid reads as
    real activity rather than visual noise, and never re-shuffles on re-render. */
function levelAt(col: number, row: number) {
  const trend = col / (COLS - 1)
  const weekend = row >= 5 ? 0.45 : 1
  const variation = ((col * 37 + row * 53) % 11) / 10
  const raw = (trend * 0.55 + variation * 0.45) * weekend
  return Math.min(4, Math.round(raw * 4))
}

const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => levelAt(i % COLS, Math.floor(i / COLS)))

const LEVELS = ['bg-white/[0.06]', 'bg-accent-glow/25', 'bg-accent-glow/45', 'bg-accent-glow/70', 'bg-accent-glow/95']

const METRICS = [
  { key: 'hubs', value: 'BLR · PUN · LDN' },
  { key: 'sprint', value: '10 business days' },
  { key: 'coverage', value: '>94% baseline' },
  { key: 'deploy', value: 'continuous gitops' },
]

/**
 * The about block: a commit-activity heatmap, not another dashboard mockup
 * — the panel that used to sit here (first a light stat card, then a
 * terminal log window) was always a still image of numbers. This one
 * actually does something: 168 cells sweep to life on scroll, in reading
 * order, the way a real contribution graph feels when it first renders.
 * The story sits beside it, with three facts underneath.
 */
export default function About() {
  const ref = useReveal<HTMLElement>({ stagger: 0.1 })
  const grid = useRef<HTMLDivElement>(null)
  const { about, site } = CONTENT

  useEffect(() => {
    const el = grid.current
    if (!el) return
    const cells = el.querySelectorAll<HTMLElement>('[data-cell]')
    if (prefersReducedMotion()) {
      cells.forEach((c) => {
        c.style.opacity = '1'
        c.style.transform = 'none'
      })
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cells,
        { opacity: 0, scale: 0.3 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'back.out(2)',
          stagger: { each: 0.006, from: 'start' },
          scrollTrigger: { trigger: el, start: 'top 85%' },
        },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="about" ref={ref} className="relative scroll-mt-24 border-t border-line/70">
      <Container className="py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="reveal relative">
            <div className="w-full overflow-hidden rounded-2xl bg-ink p-6 text-white sm:p-8">
              <div className="flex items-center justify-between">
                <span className="label text-white/50">Operations Index</span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.66rem] tracking-[0.1em] text-white/50 uppercase">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-glow opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-accent-glow" />
                  </span>
                  live
                </span>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="font-mono text-[2.1rem] leading-none font-bold text-white">2,840+</p>
                  <p className="mt-1.5 text-[0.78rem] text-white/50">production PRs, last 24 weeks</p>
                </div>
              </div>

              <div ref={grid} className="mt-6 grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}>
                {CELLS.map((level, i) => (
                  <span key={i} data-cell className={`aspect-square rounded-[3px] ${LEVELS[level]}`} />
                ))}
              </div>
              <div className="mt-3 flex items-center justify-end gap-1.5 text-[0.65rem] text-white/40">
                <span>Less</span>
                {LEVELS.map((l, i) => (
                  <span key={i} className={`size-2.5 rounded-[2px] ${l}`} />
                ))}
                <span>More</span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-5 font-mono text-[0.78rem]">
                {METRICS.map((m) => (
                  <p key={m.key} className="flex flex-col gap-0.5">
                    <span className="text-white/40">{m.key}</span>
                    <span className="font-semibold text-white">{m.value}</span>
                  </p>
                ))}
              </div>
            </div>
            <div className="absolute -right-4 -bottom-6 hidden rounded-2xl border border-line bg-raised p-5 md:block">
              <p className="display text-[2.6rem] leading-none text-accent">{site.established}</p>
              <p className="mt-1 text-[0.8rem] text-muted">Founded, {site.city.split(',')[0]}</p>
            </div>
          </div>
          <div>
            <h2 className="reveal display text-[clamp(1.8rem,3vw,2.6rem)] text-ink">{about.title}</h2>
            <p className="reveal mt-6 max-w-[58ch] text-[1.02rem] leading-[1.75] text-body">{about.body}</p>
            <ul className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-1 lg:gap-5">
              {about.points.map((p, i) => {
                const Icon = ICONS[i]
                return (
                  <li key={p.title} className="reveal flex gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                      <Icon weight="duotone" className="size-5" />
                    </span>
                    <div>
                      <p className="text-[1rem] font-semibold text-ink">{p.title}</p>
                      <p className="mt-1 text-[0.9rem] leading-[1.6] text-body">{p.body}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
