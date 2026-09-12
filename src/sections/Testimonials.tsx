import { Heading, Section } from '../components/ui'
import { CONTENT } from '../data/site'
import { useReveal } from '../lib/motion'

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
}

/** Three short quotes with initials, not stock faces. Max three lines each. */
export default function Testimonials() {
  const ref = useReveal<HTMLElement>({ stagger: 0.1 })

  return (
    <Section id="voices" ref={ref}>
      <Heading title="In their words" align="center" />
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {CONTENT.testimonials.map((t) => (
          <li key={t.name} className="reveal card flex flex-col justify-between p-7">
            <p className="display text-[1.35rem] leading-[1.35] text-ink">“{t.quote}”</p>
            <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
              <span className="grid size-12 place-items-center rounded-full bg-accent-soft font-mono text-[0.85rem] font-semibold text-accent">
                {initials(t.name)}
              </span>
              <div>
                <p className="text-[0.92rem] font-semibold text-ink">{t.name}</p>
                <p className="text-[0.8rem] text-muted">{t.role}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
