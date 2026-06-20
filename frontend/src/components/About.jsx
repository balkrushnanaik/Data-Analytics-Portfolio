import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const focusAreas = [
  { icon: '🧹', label: 'Data Cleaning' },
  { icon: '📊', label: 'Data Analysis' },
  { icon: '📈', label: 'Dashboard Dev' },
  { icon: '💡', label: 'Business Insights' },
  { icon: '🎨', label: 'Visualization' },
  { icon: '📝', label: 'Reporting' },
]

const techStack = ['Python', 'SQL', 'Power BI', 'Pandas', 'NumPy', 'Tableau', 'Excel', 'React.js', 'Flask', 'MySQL']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-subtitle">Get to Know Me</p>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Profile visual */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              {/* Profile image placeholder */}
              <div
                className="relative w-72 h-72 rounded-2xl overflow-hidden"
                style={{
                  border: '2px solid rgba(0,212,255,0.4)',
                  boxShadow: '0 0 60px rgba(0,212,255,0.2), 0 0 120px rgba(139,92,246,0.1)',
                }}
              >
                {/* Replace src with your actual photo */}
                <img
                  src="/profile.jpg"
                  alt="Balkrushna Naik"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    // Fallback avatar if no photo
                    e.target.style.display = 'none'
                    e.target.parentElement.style.background = 'linear-gradient(135deg, #0F172A, #1E3A5F)'
                    e.target.parentElement.innerHTML = `
                      <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:1rem;background:linear-gradient(135deg,#0D1B2A,#1E3A5F)">
                        <span style="font-family:Orbitron,sans-serif;font-size:4rem;color:#00D4FF;font-weight:700">BN</span>
                        <span style="font-family:JetBrains Mono,monospace;font-size:0.7rem;color:rgba(255,255,255,0.4);letter-spacing:0.15em">DATA ANALYST</span>
                      </div>`
                  }}
                />
              </div>

              {/* Floating badge — top right */}
              <motion.div
                className="glass-card absolute -top-4 -right-4 px-3 py-2"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ minWidth: 110 }}
              >
                <div className="font-mono-code text-xs" style={{ color: 'var(--neon-cyan)' }}>⚡ SPPU · 7.5 CGPA</div>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                className="glass-card absolute -bottom-4 -left-4 px-3 py-2"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                style={{ minWidth: 120 }}
              >
                <div className="font-mono-code text-xs" style={{ color: 'var(--neon-purple)' }}>📊 10+ Projects</div>
              </motion.div>

              {/* Corner glow dots */}
              {['-top-1 -left-1', '-top-1 -right-1', '-bottom-1 -left-1', '-bottom-1 -right-1'].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-3 h-3 rounded-full`}
                  style={{ background: i % 2 ? 'var(--neon-purple)' : 'var(--neon-blue)', boxShadow: `0 0 8px ${i % 2 ? 'var(--neon-purple)' : 'var(--neon-blue)'}` }}
                />
              ))}
            </div>
          </motion.div>

          {/* Right — Story */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="font-mono-code text-sm mb-3" style={{ color: 'var(--neon-blue)' }}>
              // my story
            </div>

            <h3 className="font-orbitron font-bold text-2xl text-white mb-5">
              Turning Data into <span className="neon-text-blue">Decisions</span>
            </h3>

            <div className="space-y-4 mb-8" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.8 }}>
              <p>
                I'm <strong style={{ color: '#fff' }}>Balkrushna Naik</strong>, a Computer Engineering student at Savitribai Phule Pune University. My journey started with software development — building full-stack applications with Java, JavaScript, and React.
              </p>
              <p>
                As I explored data-driven decision-making, I discovered my passion for <span style={{ color: 'var(--neon-blue)' }}>Data Analytics</span>, <span style={{ color: 'var(--neon-purple)' }}>Business Intelligence</span>, and <span style={{ color: 'var(--neon-cyan)' }}>Data Visualization</span>. I began working on real-world analytics projects, transforming raw datasets into actionable insights.
              </p>
              <p>
                I hold an 80.50% in Diploma (IT) from Amrutvahini Polytechnic and am currently pursuing my B.E. (CE) with a 7.5 CGPA, expected to graduate in 2027.
              </p>
            </div>

            {/* Focus areas */}
            <div className="mb-8">
              <div className="font-mono-code text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>FOCUS AREAS</div>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map(({ icon, label }) => (
                  <span key={label} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                    style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)', color: 'rgba(255,255,255,0.8)' }}>
                    {icon} {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech stack */}
            <div>
              <div className="font-mono-code text-xs mb-3" style={{ color: 'rgba(255,255,255,0.4)' }}>TECH STACK</div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <code key={tech} className="px-2.5 py-1 rounded text-xs"
                    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: 'var(--neon-purple)', fontFamily: 'JetBrains Mono' }}>
                    {tech}
                  </code>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
