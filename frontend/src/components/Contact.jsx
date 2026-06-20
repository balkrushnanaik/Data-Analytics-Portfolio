import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/balkrushnanaik',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: '#fff',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/balkrushna02',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: '#0A66C2',
  },
  {
    label: 'Email',
    href: 'mailto:balkrushnanaik07@gmail.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    color: '#00D4FF',
  },
]

const contactInfo = [
  { label: 'Location', value: 'Pune, Maharashtra, India', icon: '📍' },
  { label: 'University', value: 'SPPU — B.E. Computer Engineering', icon: '🎓' },
  { label: 'Status', value: 'Available for Data Analyst Roles', icon: '⚡' },
  { label: 'Response Time', value: 'Within 24 hours', icon: '⏱️' },
]

export default function Contact() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // 'sending' | 'success' | 'error'
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = (field) => ({
    ...{ width: '100%', background: 'rgba(255,255,255,0.04)', border: `1px solid ${errors[field] ? '#FF006E' : 'rgba(255,255,255,0.1)'}`, borderRadius: 8, padding: '0.875rem 1.25rem', color: '#fff', fontFamily: 'Inter', fontSize: '0.9rem', outline: 'none', transition: 'all 0.3s ease' },
  })

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-subtitle">Get In Touch</p>
          <h2 className="section-title">Contact Me</h2>
          <p className="mt-4 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>
            Open to data analyst roles, internships, and analytics collaborations. Let's connect!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* Left — Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="font-orbitron font-bold text-white text-lg mb-6">Let's Work Together</h3>

            <div className="space-y-4 mb-8">
              {contactInfo.map(({ label, value, icon }) => (
                <div key={label} className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-xl">{icon}</span>
                  <div>
                    <p className="font-mono-code text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{label.toUpperCase()}</p>
                    <p className="text-sm text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <p className="font-orbitron text-xs mb-4" style={{ color: 'rgba(255,255,255,0.35)', letterSpacing: '0.15em' }}>FIND ME ON</p>
              <div className="flex gap-4">
                {SOCIAL_LINKS.map(({ label, href, icon, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = color; e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 0 20px ${color}40`; e.currentTarget.style.transform = 'translateY(-3px)' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="glass-card p-8">
              <form onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      style={inputStyle('name')}
                      aria-label="Your name"
                    />
                    {errors.name && <p className="text-xs mt-1" style={{ color: '#FF006E' }}>{errors.name}</p>}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      style={inputStyle('email')}
                      aria-label="Your email"
                    />
                    {errors.email && <p className="text-xs mt-1" style={{ color: '#FF006E' }}>{errors.email}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    style={inputStyle('subject')}
                    aria-label="Subject"
                  />
                  {errors.subject && <p className="text-xs mt-1" style={{ color: '#FF006E' }}>{errors.subject}</p>}
                </div>

                <div className="mb-6">
                  <textarea
                    rows={5}
                    placeholder="Your message..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 120 }}
                    aria-label="Your message"
                  />
                  {errors.message && <p className="text-xs mt-1" style={{ color: '#FF006E' }}>{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="neon-btn neon-btn-solid w-full text-center"
                  style={{ cursor: status === 'sending' ? 'not-allowed' : 'pointer', color: '#000', opacity: status === 'sending' ? 0.7 : 1 }}
                >
                  {status === 'sending' ? '⟳ Sending...' : 'Send Message →'}
                </button>

                {status === 'success' && (
                  <motion.p
                    className="mt-4 text-center text-sm"
                    style={{ color: '#06FFA5' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✓ Message sent! I'll get back to you within 24 hours.
                  </motion.p>
                )}
                {status === 'error' && (
                  <motion.p
                    className="mt-4 text-center text-sm"
                    style={{ color: '#FF006E' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    ✗ Something went wrong. Please try emailing directly.
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
