import { useEffect } from 'react'
import Header from './components/Header'
import { ScrollTrigger, useSmoothScroll } from './lib/motion'
import About from './sections/About'
import Admissions from './sections/Admissions'
import Branches from './sections/Branches'
import Campus from './sections/Campus'
import Clients from './sections/Clients'
import Contact from './sections/Contact'
import Events from './sections/Events'
import Footer from './sections/Footer'
import Hero from './sections/Hero'
import Leadership from './sections/Leadership'
import Placements from './sections/Placements'
import Testimonials from './sections/Testimonials'

/**
 * Section order. Layout families alternate: split hero → image+story →
 * card grid (tint) → bento gallery → stats+cards (tint) → three portraits →
 * featured+list (tint) → quotes → green band + FAQ (tint) → split form.
 */
export default function App() {
  useSmoothScroll()

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <div id="top" className="relative min-h-screen">
      <div id="top-sentinel" className="absolute top-0 h-px w-px" aria-hidden />
      <Header />
      <main>
        <Hero />
        <Clients />
        <About />
        <Branches />
        <Campus />
        <Placements />
        <Leadership />
        <Events />
        <Testimonials />
        <Admissions />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
