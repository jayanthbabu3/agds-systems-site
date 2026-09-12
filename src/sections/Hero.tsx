import { Button, Container } from '../components/ui'
import { OrbitDiagram } from '../components/OrbitDiagram'
import { CONTENT } from '../data/site'
import { useCountUp, useEntrance } from '../lib/motion'

/* A handful of small squares drifting over the fine mesh — texture, not
   decoration for its own sake: it echoes the mesh's own grid unit. */
const FLOAT_CELLS = [
  { top: '14%', left: '4%', size: 14, tone: 'bg-accent/25' },
  { top: '26%', left: '9%', size: 9, tone: 'bg-ink/10' },
  { top: '60%', left: '3%', size: 12, tone: 'bg-accent/20' },
  { top: '74%', left: '11%', size: 16, tone: 'bg-accent/15' },
  { top: '10%', left: '46%', size: 10, tone: 'bg-ink/8' },
  { top: '82%', left: '40%', size: 13, tone: 'bg-accent/20' },
] as const

function GridField() {
  return (
    <>
      <div aria-hidden className="hero-mesh absolute inset-0" />
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {FLOAT_CELLS.map((cell, i) => (
          <span
            key={i}
            className={`float-cell ${cell.tone}`}
            style={{ top: cell.top, left: cell.left, width: cell.size, height: cell.size, animationDelay: `${i * 1.1}s` }}
          />
        ))}
      </div>
    </>
  )
}

export default function Hero() {
  const ref = useEntrance<HTMLElement>(0.15)
  const { hero } = CONTENT

  return (
    <header ref={ref} className="hero-field relative flex min-h-[100dvh] items-center overflow-hidden pt-[72px]">
      <GridField />
      <div aria-hidden className="grain absolute inset-0" />
      <Container className="relative z-10 grid w-full items-center gap-8 py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 lg:py-8">
        <div className="relative z-10 order-2 max-w-lg lg:order-1">
          <p data-entrance className="label inline-flex items-center gap-2.5 text-accent">
            <span className="inline-block h-px w-7 bg-accent/50" />
            {hero.eyebrow}
          </p>
          <h1
            data-entrance="lines"
            className="display mt-4 text-[clamp(2rem,3.6vw,3.4rem)] text-ink text-balance"
          >
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
          </h1>
          <p data-entrance="rise" className="mt-5 max-w-[42ch] text-[1.02rem] leading-[1.65] text-body">
            {hero.sub}
          </p>
          <div data-entrance="rise" className="mt-7 flex flex-wrap items-center gap-3">
            <Button href="#contact" size="lg">
              {hero.primaryCta}
            </Button>
            <Button href="#branches" variant="ghost" size="lg">
              {hero.secondaryCta}
            </Button>
          </div>
          <dl data-entrance="rise" className="mt-10 grid grid-cols-3 gap-x-8 gap-y-2 border-t border-line pt-6">
            {hero.stats.map((s) => (
              <Stat key={s.label} {...s} />
            ))}
          </dl>
        </div>

        <div data-entrance data-entrance-at="+=0.3" className="relative order-1 lg:order-2">
          <OrbitDiagram />
        </div>
      </Container>
    </header>
  )
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useCountUp(value)
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="text-[1.9rem] leading-none font-semibold text-ink tabular-nums sm:text-[2.2rem]">
        <span ref={ref} />
        <span className="text-accent">{suffix}</span>
      </dd>
      <p className="mt-2 text-[0.78rem] leading-[1.4] text-muted">{label}</p>
    </div>
  )
}
