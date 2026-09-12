import { Plus } from '@phosphor-icons/react'
import { Button, Heading, Section } from '../components/ui'
import { CONTENT } from '../data/site'
import { useReveal } from '../lib/motion'

/**
 * Engagement: the accent band with three steps, then the two things every
 * buyer asks first (pricing, response SLAs) side by side, then the FAQ.
 */
export default function Admissions() {
  const ref = useReveal<HTMLElement>({ stagger: 0.08 })
  const { admissions, faq, site } = CONTENT

  return (
    <Section id="admissions" ref={ref} tint>
      <div className="reveal overflow-hidden rounded-3xl bg-accent text-white">
        <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-14">
          <div>
            <h2 className="display text-[clamp(1.8rem,3vw,2.6rem)] text-white">{admissions.title}</h2>
            <p className="mt-4 max-w-md text-[0.98rem] leading-[1.7] text-white/80">
              {site.counsellingCode}. Talk to the desk at {site.phoneDisplay}, 9 am to 6 pm.
            </p>
            <div className="mt-7">
              <Button href="#contact" variant="white">
                Talk to us
              </Button>
            </div>
          </div>
          <ol className="grid gap-4 sm:grid-cols-3">
            {admissions.steps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-white/15 bg-white/10 p-5">
                <p className="display text-[2.4rem] leading-none text-gold">{String(i + 1).padStart(2, '0')}</p>
                <p className="mt-4 text-[1rem] font-semibold">{s.title}</p>
                <p className="mt-1.5 text-[0.86rem] leading-[1.6] text-white/80">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="reveal card p-6 sm:p-8">
          <p className="text-[0.95rem] font-semibold text-ink">Engagement models</p>
          <ul className="mt-5 divide-y divide-line">
            {admissions.fees.map((f) => (
              <li key={f.item} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-6">
                <div>
                  <p className="text-[0.95rem] font-medium text-ink">{f.item}</p>
                  <p className="text-[0.8rem] text-muted">{f.note}</p>
                </div>
                <p className="text-[1.05rem] font-semibold text-accent tabular-nums">{f.amount}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.78rem] text-muted">Indicative figures for the demo. Every engagement gets a written, scoped quote.</p>
        </div>

        <div className="reveal card p-6 sm:p-8">
          <p className="text-[0.95rem] font-semibold text-ink">Response SLA, by engagement type</p>
          <ul className="mt-5 grid gap-x-6 gap-y-3">
            {admissions.cutoffs.map((c) => (
              <li key={c.branch} className="flex items-baseline justify-between border-b border-line py-2 text-[0.9rem]">
                <span className="font-medium text-ink">{c.branch}</span>
                <span className="text-body">{c.rank}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[0.78rem] text-muted">Business days, from a signed scope. Sample figures for the demo.</p>
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Heading title="Questions clients ask" />
        <div className="border-t border-line">
          {faq.map((item, i) => (
            <details key={item.q} className="faq reveal group border-b border-line" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-[1.02rem] font-semibold text-ink transition-colors hover:text-accent">
                {item.q}
                <span className="faq-icon mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-300">
                  <Plus weight="bold" className="size-3.5" />
                </span>
              </summary>
              <div className="faq-body">
                <div>
                  <p className="max-w-2xl pb-6 text-[0.92rem] leading-[1.7] text-body">{item.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
