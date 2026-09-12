import { useEffect, useRef } from 'react'
import { Quotes } from '@phosphor-icons/react'
import { Heading, Section } from '../components/ui'
import { CONTENT } from '../data/site'
import { gsap, prefersReducedMotion, useCountUp, useReveal } from '../lib/motion'

/**
 * Placements: four numbers, a branch-wise bar chart that fills on scroll,
 * six recent offers with student photos, a recruiter wall and one line from
 * an HR lead. This is the section parents read twice.
 */
export default function Placements() {
  const ref = useReveal<HTMLElement>({ stagger: 0.07 })
  const bars = useRef<HTMLUListElement>(null)
  const { placements } = CONTENT

  // Bars grow from zero when the chart enters. scaleX only.
  useEffect(() => {
    const el = bars.current
    if (!el) return
    const fills = el.querySelectorAll<HTMLElement>('[data-fill]')
    if (prefersReducedMotion()) {
      fills.forEach((f) => (f.style.transform = 'scaleX(1)'))
      return
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        fills,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 80%' } },
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <Section id="placements" ref={ref} tint>
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
        <Heading title={placements.title} lede={placements.lede} />
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:justify-self-end">
          {placements.stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </dl>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* by practice */}
        <div className="reveal card p-6 sm:p-8">
          <p className="text-[0.95rem] font-semibold text-ink">On-time delivery, by practice (2025)</p>
          <ul ref={bars} className="mt-6 grid gap-3.5">
            {placements.byBranch.map((b) => (
              <li key={b.branch} className="grid grid-cols-[6.5rem_1fr_3rem] items-center gap-3 text-[0.85rem]">
                <span className="truncate font-semibold text-ink">{b.branch}</span>
                <span className="relative h-2.5 overflow-hidden rounded-full bg-soft">
                  <span
                    data-fill
                    className="absolute inset-y-0 left-0 origin-left rounded-full bg-accent"
                    style={{ width: `${b.placed}%`, transform: 'scaleX(0)' }}
                  />
                </span>
                <span className="text-right font-semibold text-ink tabular-nums">{b.placed}%</span>
              </li>
            ))}
          </ul>
        </div>

        {/* HR quote */}
        <figure className="reveal flex flex-col justify-between rounded-2xl bg-accent p-7 text-white sm:p-8">
          <Quotes weight="fill" className="size-7 text-gold" />
          <blockquote className="display mt-6 text-[1.5rem] leading-[1.3]">“{placements.hrQuote.quote}”</blockquote>
          <figcaption className="mt-6 text-[0.85rem] text-white/80">
            <span className="font-semibold text-white">{placements.hrQuote.name}</span>, {placements.hrQuote.role}
          </figcaption>
        </figure>
      </div>

      <div className="mt-14">
        <p className="reveal text-[0.95rem] font-semibold text-ink">Recent engagements</p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {placements.recent.map((r) => (
            <li key={r.name} className="reveal card flex min-w-0 items-center gap-3 overflow-hidden p-4 sm:gap-4 sm:p-5">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-[1rem] font-semibold text-accent sm:size-[72px] sm:text-[1.2rem]">
                {initials(r.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[1rem] font-semibold text-ink">{r.name}</p>
                <p className="text-[0.82rem] text-muted">{r.branch} · {r.role}</p>
                <p className="mt-2 text-[0.88rem] text-body"><span className="font-semibold text-accent">{r.company}</span></p>
              </div>
              <div className="shrink-0 rounded-xl bg-accent-soft px-2.5 py-2 text-right sm:px-3">
                <p className="text-[0.62rem] font-semibold tracking-[0.12em] text-accent/80 uppercase">Result</p>
                <p className="text-[0.95rem] font-bold text-accent tabular-nums">{r.package}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

/** Two-letter initials for the avatar circle — there is no client photo to show. */
function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

function Stat({ value, suffix, label, decimals = 0 }: { value: number; suffix: string; label: string; decimals?: number }) {
  const ref = useCountUp(value, 1.8, 'en-IN', decimals)
  return (
    <div className="reveal">
      <dt className="sr-only">{label}</dt>
      <dd className="text-[1.9rem] leading-none font-semibold whitespace-nowrap text-ink tabular-nums sm:text-[2.7rem]">
        <span ref={ref} />
        <span className="text-accent">{suffix}</span>
      </dd>
      <p className="mt-2 text-[0.8rem] text-muted">{label}</p>
    </div>
  )
}
