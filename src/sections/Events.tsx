import { CalendarBlank } from '@phosphor-icons/react'
import { Heading, Section } from '../components/ui'
import { CONTENT } from '../data/site'
import { useReveal } from '../lib/motion'

/** A generated gradient stand-in for a thumbnail — no stock photography per post. */
function tileStyle(i: number) {
  return {
    backgroundImage: `radial-gradient(65% 85% at ${25 + i * 10}% 25%, color-mix(in oklab, var(--color-accent) 45%, transparent) 0%, transparent 65%), linear-gradient(160deg, #0b1c30 0%, #142049 100%)`,
  }
}

/** One featured update large, three recent beside it, and what is coming up. */
export default function Events() {
  const ref = useReveal<HTMLElement>({ stagger: 0.08 })
  const { events } = CONTENT
  const [lead, ...rest] = events.items

  return (
    <Section id="events" ref={ref} tint>
      <Heading title={events.title} />
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="reveal group relative overflow-hidden rounded-3xl">
          <div
            className="aspect-[16/11] w-full transition-transform duration-700 ease-out group-hover:scale-[1.02] lg:h-full lg:aspect-auto"
            style={tileStyle(0)}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent p-6 pt-24 text-white sm:p-8">
            <p className="text-[0.78rem] font-semibold tracking-[0.1em] text-white/75 uppercase">
              {lead.tag} · {lead.date}
            </p>
            <h3 className="display mt-2 text-[clamp(1.7rem,3vw,2.6rem)] leading-[1.05]">{lead.title}</h3>
            <p className="mt-2 max-w-xl text-[0.92rem] leading-[1.6] text-white/85">{lead.body}</p>
          </div>
        </article>

        <ul className="grid gap-4">
          {rest.map((e, i) => (
            <li key={e.title} className="reveal card flex gap-4 p-4">
              <div
                className="size-24 shrink-0 rounded-xl sm:size-28"
                style={tileStyle(i + 1)}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="text-[0.74rem] font-semibold tracking-[0.1em] text-accent uppercase">
                  {e.tag} · {e.date}
                </p>
                <h3 className="mt-1.5 text-[1.05rem] leading-[1.35] font-semibold text-ink">{e.title}</h3>
                <p className="mt-1.5 text-[0.86rem] leading-[1.55] text-body">{e.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="reveal mt-8 rounded-3xl border border-line bg-raised p-6 sm:p-8">
        <p className="flex items-center gap-2 text-[0.95rem] font-semibold text-ink">
          <CalendarBlank weight="duotone" className="size-5 text-accent" />
          Coming up
        </p>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {events.upcoming.map((u) => (
            <li key={u.title} className="flex gap-4 border-t border-line pt-4">
              <span className="w-[5.5rem] shrink-0 text-[0.8rem] font-semibold text-accent">{u.date}</span>
              <div>
                <p className="text-[0.95rem] font-semibold text-ink">{u.title}</p>
                <p className="mt-1 text-[0.84rem] leading-[1.55] text-body">{u.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
