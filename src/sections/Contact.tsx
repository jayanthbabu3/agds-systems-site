import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { EnvelopeSimple, MapPin, Phone, WhatsappLogo } from '@phosphor-icons/react'
import { Heading, Section } from '../components/ui'
import { CONTENT, SITE, whatsappHref } from '../data/site'
import { EMPTY_ENQUIRY, submitEnquiry, type Enquiry, type EnquiryErrors } from '../lib/enquiry'
import { useReveal } from '../lib/motion'

/** Contact methods left, zod-validated form right. Opens WhatsApp on submit. */
export default function Contact() {
  const ref = useReveal<HTMLElement>({ stagger: 0.08 })
  const [form, setForm] = useState<Enquiry>(EMPTY_ENQUIRY)
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [sent, setSent] = useState(false)
  const fields = useRef<Record<string, HTMLElement | null>>({})
  const { contact, branches } = CONTENT

  const set = (key: keyof Enquiry) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const result = await submitEnquiry(form)
    if (!result.ok) {
      setErrors(result.errors)
      const first = (Object.keys(result.errors) as (keyof Enquiry)[])[0]
      fields.current[first]?.focus()
      return
    }
    setErrors({})
    setSent(true)
    window.open(result.href, '_blank', 'noreferrer')
  }

  const input =
    'mt-2 w-full rounded-xl border bg-raised px-4 py-3 text-[0.95rem] text-ink placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none'
  const border = (k: keyof Enquiry) => (errors[k] ? 'border-alert' : 'border-line')

  return (
    <Section id="contact" ref={ref}>
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Heading title={contact.title} lede={contact.lede} />
          <ul className="mt-10 grid gap-5">
            <Row icon={<Phone weight="duotone" className="size-5" />} label="Consultation line">
              <a href={`tel:${SITE.phone}`} className="hover:text-accent">{SITE.phoneDisplay}</a>
            </Row>
            <Row icon={<WhatsappLogo weight="duotone" className="size-5" />} label="WhatsApp">
              <a href={whatsappHref()} target="_blank" rel="noreferrer" className="hover:text-accent">Message the desk</a>
            </Row>
            <Row icon={<EnvelopeSimple weight="duotone" className="size-5" />} label="Email">
              <a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a>
            </Row>
            <Row icon={<MapPin weight="duotone" className="size-5" />} label="Office">
              <a href={SITE.mapUrl} target="_blank" rel="noreferrer" className="hover:text-accent">{SITE.address}</a>
            </Row>
          </ul>
          <div className="reveal mt-8">
            <p className="text-[0.74rem] font-semibold tracking-[0.1em] text-muted uppercase">Global hubs</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {contact.routes.map((r) => (
                <li key={r} className="rounded-full border border-line bg-raised px-3 py-1.5 text-[0.8rem] font-medium text-ink">
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <form onSubmit={onSubmit} noValidate className="reveal card grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
          <Field label="Full name" error={errors.name}>
            <input ref={(el) => { fields.current.name = el }} value={form.name} onChange={set('name')} autoComplete="name" placeholder="Alexander Reed" className={`${input} ${border('name')}`} />
          </Field>
          <Field label="Phone" error={errors.phone}>
            <input ref={(el) => { fields.current.phone = el }} value={form.phone} onChange={set('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" className={`${input} ${border('phone')}`} />
          </Field>
          <Field label="Email (optional)" error={errors.email}>
            <input ref={(el) => { fields.current.email = el }} value={form.email} onChange={set('email')} type="email" autoComplete="email" placeholder="you@company.com" className={`${input} ${border('email')}`} />
          </Field>
          <Field label="Practice area of interest">
            <select ref={(el) => { fields.current.programme = el }} value={form.programme} onChange={set('programme')} className={`${input} ${border('programme')}`}>
              <option value="">Not sure yet</option>
              {branches.items.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Project details" error={errors.message} className="sm:col-span-2">
            <textarea ref={(el) => { fields.current.message = el }} value={form.message} onChange={set('message')} rows={4} placeholder="Current stack, scale targets, timeline — anything." className={`${input} ${border('message')} resize-y`} />
          </Field>
          <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-accent-dim active:scale-[0.98]">
              <WhatsappLogo weight="bold" className="size-4" />
              Send on WhatsApp
            </button>
            <p className="text-[0.8rem] text-muted" aria-live="polite">
              {sent ? 'WhatsApp opened with your message. Tap again if it did not.' : 'Opens WhatsApp. Nothing is stored on this site.'}
            </p>
          </div>
        </form>
      </div>
    </Section>
  )
}

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="reveal flex gap-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">{icon}</span>
      <div>
        <p className="text-[0.74rem] font-semibold tracking-[0.1em] text-muted uppercase">{label}</p>
        <p className="mt-1 text-[0.95rem] leading-[1.5] font-medium text-ink">{children}</p>
      </div>
    </li>
  )
}

function Field({ label, error, className = '', children }: { label: string; error?: string; className?: string; children: ReactNode }) {
  return (
    <label className={`block text-[0.82rem] font-semibold text-ink ${className}`}>
      {label}
      {children}
      {error && <span className="mt-1.5 block text-[0.78rem] font-normal text-alert">{error}</span>}
    </label>
  )
}
