import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    role: 'UI/UX Designer Intern',
    company: 'TechnoGrowth Software Solutions Pvt Ltd',
    duration: 'January 2026',
    project: 'CareerHub iOS Application',
    type: 'Internship',
    color: '#00D4FF',
    icon: '🎨',
    responsibilities: [
      'Conducted user research to understand pain points in job-seeking applications',
      'Designed wireframes and interactive prototypes for CareerHub iOS app',
      'Created high-fidelity UI screens following Apple Human Interface Guidelines',
      'Collaborated with development team for design handoff and implementation',
      'Performed usability testing and iterated designs based on feedback',
    ],
    tools: ['Figma', 'Canva', 'Adobe XD'],
    skills: ['Wireframing', 'Prototyping', 'User Research', 'UI Design', 'UX Design'],
  },
]

export default function Experience() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-subtitle">Where I've Worked</p>
          <h2 className="section-title">Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div
            className="absolute left-8 top-0 bottom-0 w-px hidden sm:block"
            style={{ background: 'linear-gradient(to bottom, var(--neon-blue), var(--neon-purple), transparent)' }}
          />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="relative sm:pl-20 mb-12"
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
            >
              {/* Timeline dot */}
              <div
                className="absolute left-5 top-5 w-6 h-6 rounded-full hidden sm:flex items-center justify-center -translate-x-1/2"
                style={{
                  background: exp.color,
                  boxShadow: `0 0 20px ${exp.color}80`,
                  zIndex: 10,
                  fontSize: '0.75rem',
                }}
              >
                ●
              </div>

              {/* Card */}
              <div className="glass-card p-6 sm:p-8">
                {/* Header row */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}40` }}
                    >
                      {exp.icon}
                    </div>
                    <div>
                      <h3 className="font-orbitron font-bold text-white text-lg">{exp.role}</h3>
                      <p style={{ color: exp.color, fontSize: '0.9rem', fontFamily: 'JetBrains Mono' }}>{exp.company}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-bold"
                      style={{ background: `${exp.color}20`, color: exp.color, border: `1px solid ${exp.color}40`, fontFamily: 'Orbitron' }}
                    >
                      {exp.type}
                    </span>
                    <span className="font-mono-code text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      📅 {exp.duration}
                    </span>
                  </div>
                </div>

                {/* Project */}
                <div
                  className="mb-5 px-4 py-3 rounded-lg"
                  style={{ background: `${exp.color}08`, border: `1px solid ${exp.color}20` }}
                >
                  <span className="font-mono-code text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>PROJECT: </span>
                  <span className="font-mono-code text-xs" style={{ color: exp.color }}>{exp.project}</span>
                </div>

                {/* Responsibilities */}
                <div className="mb-6">
                  <h4 className="font-orbitron text-xs text-white mb-3" style={{ letterSpacing: '0.1em' }}>RESPONSIBILITIES</h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((r, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                        <span style={{ color: exp.color, marginTop: 2 }}>›</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools + skills */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-orbitron text-xs text-white mb-2" style={{ letterSpacing: '0.1em' }}>TOOLS</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.tools.map(t => (
                        <code key={t} className="text-xs px-2 py-0.5 rounded"
                          style={{ background: `${exp.color}12`, color: exp.color, border: `1px solid ${exp.color}30`, fontFamily: 'JetBrains Mono' }}>
                          {t}
                        </code>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-orbitron text-xs text-white mb-2" style={{ letterSpacing: '0.1em' }}>SKILLS APPLIED</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(s => (
                        <span key={s} className="text-xs px-2 py-0.5 rounded"
                          style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
