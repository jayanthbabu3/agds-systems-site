import type { ReactNode, Ref } from 'react'
import { ArrowRight } from '@phosphor-icons/react'

/** One container width for the whole page. */
export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>
}

export function Section({
  id,
  children,
  className = '',
  ref,
  tint,
}: {
  id?: string
  children: ReactNode
  className?: string
  ref?: Ref<HTMLElement>
  tint?: boolean
}) {
  return (
    <section
      id={id}
      ref={ref}
      className={`relative scroll-mt-24 py-20 md:py-28 ${tint ? 'bg-soft' : ''} ${className}`}
    >
      <Container>{children}</Container>
    </section>
  )
}

/** Section heading: title + optional lede, stacked. Max 2 lines of title. */
export function Heading({
  title,
  lede,
  align = 'left',
  className = '',
}: {
  title: string
  lede?: string
  align?: 'left' | 'center'
  className?: string
}) {
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <h2 className="reveal display text-[clamp(1.8rem,3vw,2.6rem)] text-ink">{title}</h2>
      {lede && <p className="reveal mt-5 max-w-2xl text-[1.02rem] leading-[1.7] text-body">{lede}</p>}
    </div>
  )
}

export function Button({
  href,
  children,
  variant = 'solid',
  external,
  className = '',
  size = 'md',
}: {
  href: string
  children: ReactNode
  variant?: 'solid' | 'ghost' | 'white'
  external?: boolean
  className?: string
  size?: 'md' | 'lg'
}) {
  const base =
    'group inline-flex items-center gap-2.5 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ease-out active:scale-[0.98]'
  const sz = size === 'lg' ? 'px-7 py-4 text-[0.95rem]' : 'px-6 py-3.5 text-[0.88rem]'
  const skin = {
    solid: 'bg-accent text-white hover:bg-accent-dim shadow-[0_10px_30px_-12px_color-mix(in_oklab,var(--color-accent)_60%,transparent)]',
    ghost: 'border border-line bg-raised text-ink hover:border-accent hover:text-accent',
    white: 'bg-white text-ink hover:bg-soft',
  }[variant]
  return (
    <a
      href={href}
      className={`${base} ${sz} ${skin} ${className}`}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
      <ArrowRight weight="bold" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  )
}
