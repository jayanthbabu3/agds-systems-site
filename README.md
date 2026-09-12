# Nirmaan Institute of Technology — demo college website

Single-page marketing site for a **fictional** engineering college in
Vijayawada. React 19 + TypeScript + Tailwind v4 + GSAP/ScrollTrigger + Lenis +
Motion, Vite build. Same stack and hero pattern as the sibling projects
(EPM-consulting, my-wardrob, cameraman-portfolio): copy left, film right.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build → dist/
```

## Sections

| # | Section | Layout |
| --- | --- | --- |
| 1 | Hero | copy left, campus-gate film right (masked into the page), 3 counters |
| 2 | About | accreditation marquee, aerial photo + story + 3 facts |
| 3 | Branches | 8 elegant cards, CSE featured in green, each links to WhatsApp with the branch pre-filled |
| 4 | Campus | 9-photo bento gallery with lightbox (Esc / arrows), 4 facilities |
| 5 | Placements | 4 counters, 6 recent offers with student photos, recruiter wall |
| 6 | Leadership | 3 portraits with a line in their own words |
| 7 | Events | 1 featured + 3 in a column |
| 8 | Testimonials | 3 quotes |
| 9 | Admissions | green band with 3 steps, FAQ |
| 10 | Contact | zod-validated form → WhatsApp, contact methods |

Header: one-line nav, phone, Apply; sheet menu below `lg`.

## Palette and type

White `#fbfbf9` ground, forest green `#0f5d47` accent (7.3:1), a single gold
`#d9a441` used only for the mark and step numbers. Cormorant Garamond for
display (italic for the emphasised headline line), Manrope for everything else.
Tokens live in `src/index.css` and nowhere else.

## Generated assets (all AI, all placeholders)

Every photograph was generated with ChatGPT image generation on 6 Sep 2026
and is a stand-in until a real college supplies its own:

- `public/campus/*.jpg` — gate, aerial, library, CS lab, workshop, sports,
  fest, placement day, cafeteria, classroom (1400px, q82)
- `public/people/*.jpg` — 3 leadership portraits, 6 students (synthetic
  people; not real persons)
- `public/film/campus.mp4` + `campus.webp` — the hero film, 36.8 s, 3.9 MB,
  1152×648. Five Google Flow / Veo clips cut with 0.8 s crossfades, telling
  the four years: gate on day one → first-year lecture → robotics workshop →
  placement interview → offer letter on the steps. Gate clip is Veo 3.1
  (third attempt; the first two misspelled the signboard), the other four are
  Veo 3.1 Lite at 10 credits each. Raw clips are in `gen/` (`gate_veo.mp4`,
  `flow_1..5.mp4`); rebuild with the ffmpeg xfade chain in the session notes
  or re-cut in any editor.
- Originals at 1456×820 are in `gen/` for re-cropping.

## Sample data

The college, its people, numbers, quotes and recruiters are invented sample
content in `content/site.json` (validated by `src/data/site.ts`). Recruiter
names are real companies shown as plain wordmarks. Replace before any real
use.

## Verified

- `tsc -b`, `oxlint`, `vite build` clean. Bundle 212 kB gzipped.
- Every section screenshotted at 1920 and at 360 / 390 / 768 (iframes):
  no horizontal overflow, headline 2 lines at every width.
- Not verified live: the mobile sheet menu (the automation window would not
  resize) — code path is simple; check once on a phone.
