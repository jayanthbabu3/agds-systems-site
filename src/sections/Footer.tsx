import { Container } from '../components/ui'
import Mark from '../components/Mark'
import { NAV, SITE } from '../data/site'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-soft pt-16 pb-10">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Mark className="size-11" />
              <div className="leading-tight">
                <p className="display text-[1.6rem] font-semibold text-ink">{SITE.fullName}</p>
                <p className="text-[0.72rem] font-semibold tracking-[0.14em] text-muted uppercase">{SITE.tagline}</p>
              </div>
            </div>
            <p className="mt-5 max-w-md text-[0.9rem] leading-[1.65] text-body">{SITE.address}</p>
          </div>
          <div>
            <p className="label text-muted">On this page</p>
            <ul className="mt-4 grid gap-2">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[0.92rem] text-ink transition-colors hover:text-accent">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label text-muted">Reach us</p>
            <ul className="mt-4 grid gap-2 text-[0.92rem]">
              <li><a href={`tel:${SITE.phone}`} className="text-ink hover:text-accent">{SITE.phoneDisplay}</a></li>
              <li><a href={`mailto:${SITE.email}`} className="text-ink hover:text-accent">{SITE.email}</a></li>
              <li className="text-body">{SITE.counsellingCode}</li>
            </ul>
          </div>
        </div>
        <p className="mt-12 border-t border-line pt-6 text-[0.78rem] text-muted">
          © {new Date().getFullYear()} {SITE.fullName}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
