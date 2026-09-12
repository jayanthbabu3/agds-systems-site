import { useEffect, useState } from 'react'
import { List, X, Phone } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'motion/react'
import { NAV, SITE } from '../data/site'
import { Container } from './ui'
import Mark from './Mark'

/**
 * One-line nav, 72px, gains a hairline and blur once the page scrolls.
 * Below lg the links live in a sheet behind a menu button.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    // A sentinel at the top of the page; cheaper and steadier than scrollY.
    const sentinel = document.getElementById('top-sentinel')
    if (!sentinel) return
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting))
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const targets = NAV.map((l) => document.querySelector(l.href)).filter((el): el is Element => !!el)
    if (!targets.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (top?.target.id) setActive(`#${top.target.id}`)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.2, 0.5] },
    )
    targets.forEach((t) => io.observe(t))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
        scrolled || open
          ? 'border-b border-line/80 bg-ground/85 backdrop-blur-xl shadow-[0_10px_30px_-24px_rgba(15,26,23,0.35)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between">
        <a href="#top" className="flex items-center gap-3" aria-label={`${SITE.fullName}, home`}>
          <Mark className="size-10" />
          <span className="flex flex-col leading-tight">
            <span className="display text-[1.35rem] font-semibold text-ink">{SITE.name}</span>
            <span className="text-[0.62rem] font-semibold tracking-[0.16em] text-muted uppercase">
              {SITE.tagline}
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? 'true' : undefined}
              className={`relative text-[0.86rem] font-medium transition-colors duration-200 hover:text-accent ${
                active === l.href ? 'text-accent' : 'text-ink/80'
              }`}
            >
              {l.label}
              <span
                className={`absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ${
                  active === l.href ? 'w-full' : 'w-0'
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${SITE.phone}`}
            className="hidden items-center gap-2 rounded-full border border-line bg-raised px-4 py-2.5 text-[0.82rem] font-semibold text-ink transition-colors hover:border-accent hover:text-accent md:inline-flex"
          >
            <Phone weight="bold" className="size-4" />
            {SITE.phoneDisplay}
          </a>
          <a
            href="#contact"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-[0.82rem] font-semibold text-white transition-colors hover:bg-accent-dim sm:inline-flex"
          >
            Book a call
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid size-11 place-items-center rounded-full border border-line bg-raised text-ink lg:hidden"
          >
            {open ? <X weight="bold" className="size-5" /> : <List weight="bold" className="size-5" />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-[72px] h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-ground lg:hidden"
          >
            <Container className="flex flex-col py-6">
              {NAV.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="display border-b border-line py-4 text-[2rem] text-ink"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-6 py-4 text-[0.95rem] font-semibold text-white"
              >
                Talk to us
              </a>
              <a href={`tel:${SITE.phone}`} className="mt-4 text-center text-[0.9rem] font-medium text-body">
                {SITE.phoneDisplay}
              </a>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
