import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setActive(href)
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-lg shadow-black/30' : 'py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between" aria-label="Main navigation">
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); navTo('#hero') }}
          className="font-orbitron font-bold text-lg"
          style={{ color: 'var(--neon-blue)', textDecoration: 'none' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          BN<span style={{ color: 'var(--neon-purple)' }}>.</span>
        </motion.a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => { e.preventDefault(); navTo(link.href) }}
                className="font-mono-code text-sm transition-all duration-200"
                style={{
                  color: active === link.href ? 'var(--neon-blue)' : 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  letterSpacing: '0.05em',
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--neon-blue)'}
                onMouseLeave={(e) => e.target.style.color = active === link.href ? 'var(--neon-blue)' : 'rgba(255,255,255,0.7)'}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Resume CTA */}
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block neon-btn text-xs"
          style={{ textDecoration: 'none' }}
        >
          Resume
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {[0, 1, 2].map((i) => (
            <span key={i} style={{
              display: 'block',
              width: 22, height: 2,
              background: 'var(--neon-blue)',
              borderRadius: 2,
              transition: 'all 0.3s ease',
              transform: mobileOpen
                ? i === 0 ? 'translateY(7px) rotate(45deg)'
                  : i === 1 ? 'scaleX(0)'
                  : 'translateY(-7px) rotate(-45deg)'
                : 'none',
              opacity: mobileOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden glass mx-4 mt-2 rounded-xl overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <ul className="flex flex-col p-4 gap-2 list-none">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); navTo(link.href) }}
                    className="block py-2 px-4 rounded-lg font-mono-code text-sm transition-all"
                    style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}
                    onMouseEnter={(e) => { e.target.style.color = 'var(--neon-blue)'; e.target.style.background = 'rgba(0,212,255,0.1)' }}
                    onMouseLeave={(e) => { e.target.style.color = 'rgba(255,255,255,0.8)'; e.target.style.background = 'transparent' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-btn text-xs mt-2 inline-block"
                  style={{ textDecoration: 'none' }}
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
