import { useEffect, useState, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Certifications from './components/Certifications'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'
import StarField from './components/StarField'
import LoadingScreen from './components/LoadingScreen'
import ScrollProgress from './components/ScrollProgress'

// ── Nebula background blobs ──
const NebulaBackground = () => (
  <div className="nebula-bg" aria-hidden="true">
    <div className="nebula-blob animate-nebula"
      style={{ width: 600, height: 600, top: '-10%', left: '-10%', background: 'radial-gradient(circle, rgba(0,212,255,1), transparent)' }}
    />
    <div className="nebula-blob animate-nebula"
      style={{ width: 500, height: 500, top: '30%', right: '-5%', background: 'radial-gradient(circle, rgba(139,92,246,1), transparent)', animationDelay: '3s' }}
    />
    <div className="nebula-blob animate-nebula"
      style={{ width: 400, height: 400, bottom: '10%', left: '30%', background: 'radial-gradient(circle, rgba(6,255,165,1), transparent)', animationDelay: '6s' }}
    />
  </div>
)

// ── Back to Top button ──
const BackToTop = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18,15 12,9 6,15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

// ── Custom cursor glow ──
const CursorGlow = () => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    const onMove = (e) => {
      el.style.left = e.clientX + 'px'
      el.style.top = e.clientY + 'px'
    }
    const onDown = () => el.classList.add('clicking')
    const onUp = () => el.classList.remove('clicking')

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return <div ref={cursorRef} className="cursor-glow" aria-hidden="true" />
}

// ── App ──
export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <AnimatePresence>
        {loading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {!loading && (
        <div className="relative min-h-screen" style={{ background: 'var(--space-black)' }}>
          <CursorGlow />
          <StarField />
          <NebulaBackground />
          <ScrollProgress />

          <div className="relative z-10">
            <Navbar />
            <main>
              <section id="hero"><Hero /></section>
              <section id="about"><About /></section>
              <section id="skills"><Skills /></section>
              <section id="projects"><Projects /></section>
              <section id="experience"><Experience /></section>
              <section id="certifications"><Certifications /></section>
              <section id="education"><Education /></section>
              <section id="contact"><Contact /></section>
            </main>
            <Footer />
          </div>

          <BackToTop />
        </div>
      )}
    </BrowserRouter>
  )
}
