/** The AGDS mark — the client's logo, keyed to transparent. `className` sets
    a square bounding box; `object-contain` preserves the mark's own ratio
    inside it rather than stretching it to fit. */
export default function Mark({ className = 'size-10' }: { className?: string }) {
  return <img src="/agds-mark.png" alt="AGDS" className={`${className} object-contain`} />
}
