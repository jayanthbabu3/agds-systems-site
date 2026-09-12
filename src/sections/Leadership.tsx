import { Quotes } from '@phosphor-icons/react'
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

/** Three leaders: initials avatar, role, one line in their own words. */
export default function Leadership() {
  const ref = useReveal<HTMLElement>({ stagger: 0.1 })
  const { leadership } = CONTENT

  return (
    <Section id="leadership" ref={ref}>
      <Heading title={leadership.title} />
      <p className="reveal mt-6 max-w-2xl display text-[1.35rem] leading-[1.4] text-ink/85">
        “{leadership.message}”
        <span className="mt-2 block font-sans text-[0.8rem] font-semibold tracking-[0.08em] text-muted uppercase">
          {leadership.people[1].name}, {leadership.people[1].role}
        </span>
      </p>
      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {leadership.people.map((p) => (
          <li key={p.name} className="reveal card flex gap-5 p-5">
            <span className="grid size-[104px] shrink-0 place-items-center rounded-2xl bg-accent-soft font-mono text-[1.6rem] font-semibold text-accent sm:size-[120px]">
              {initials(p.name)}
            </span>
            <div className="min-w-0">
              <p className="text-[0.72rem] font-semibold tracking-[0.1em] text-accent uppercase">{p.role}</p>
              <h3 className="display mt-1.5 text-[1.45rem] leading-[1.1] text-ink">{p.name}</h3>
              <p className="mt-1 text-[0.8rem] text-muted">{p.creds}</p>
              <p className="mt-3 flex gap-2 text-[0.88rem] leading-[1.55] text-body">
                <Quotes weight="fill" className="mt-1 size-3.5 shrink-0 text-gold" />
                <span>{p.quote}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
