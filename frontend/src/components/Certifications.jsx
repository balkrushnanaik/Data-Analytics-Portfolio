import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const certifications = [
  {
    title: 'Full Stack Development Program',
    provider: 'UpGrad',
    year: '2025',
    icon: '🚀',
    color: '#8B5CF6',
    gradient: 'from-purple-900 to-indigo-900',
    skills: ['React.js', 'Node.js', 'Python', 'SQL', 'MongoDB'],
    description: 'Comprehensive full-stack program covering frontend, backend, databases, and deployment.',
  },
  {
    title: 'Data Analytics Job Simulation',
    provider: 'Deloitte Australia × Forage',
    year: '2026',
    icon: '📊',
    color: '#00D4FF',
    gradient: 'from-blue-900 to-cyan-900',
    skills: ['Data Analysis', 'Tableau', 'Business Insights', 'Visualization'],
    description: 'Industry-equivalent data analytics simulation — data cleaning, dashboard design, and business recommendations.',
  },
  {
    title: 'UI/UX Design Internship Certificate',
    provider: 'TechnoGrowth Software Solutions Pvt Ltd',
    year: '2026',
    icon: '🎨',
    color: '#06FFA5',
    gradient: 'from-teal-900 to-green-900',
    skills: ['Figma', 'Prototyping', 'User Research', 'UI Design'],
    description: 'Certified completion of the UI/UX Design Internship on the CareerHub iOS Application project.',
  },
]

function CertCard({ cert, index }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="glass-card overflow-hidden group"
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      style={{ perspective: 1000 }}
    >
      {/* Certificate banner */}
      <div className={`bg-gradient-to-br ${cert.gradient} p-6 relative overflow-hidden`}>
        {/* Decorative seal */}
        <div className="absolute top-3 right-4 w-16 h-16 rounded-full opacity-20"
          style={{ border: `2px solid ${cert.color}`, background: `radial-gradient(circle, ${cert.color}20, transparent)` }}
        />
        <div className="absolute top-5 right-6 w-12 h-12 rounded-full opacity-30"
          style={{ border: `1px solid ${cert.color}` }}
        />

        <div className="flex items-center gap-3 mb-3">
          <span style={{ fontSize: '2rem' }}>{cert.icon}</span>
          <div>
            <p className="font-mono-code text-xs mb-0.5" style={{ color: cert.color, letterSpacing: '0.1em' }}>CERTIFICATE OF COMPLETION</p>
            <p className="font-mono-code text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{cert.year}</p>
          </div>
        </div>

        <h3 className="font-orbitron font-bold text-white text-base leading-tight">{cert.title}</h3>
      </div>

      {/* Card body */}
      <div className="p-5">
        {/* Provider */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full" style={{ background: cert.color }} />
          <span className="font-mono-code text-xs" style={{ color: cert.color }}>{cert.provider}</span>
        </div>

        {/* Description */}
        <p className="text-xs mb-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {cert.description}
        </p>

        {/* Skills covered */}
        <div>
          <p className="font-orbitron text-xs mb-2" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>SKILLS COVERED</p>
          <div className="flex flex-wrap gap-1.5">
            {cert.skills.map(s => (
              <span key={s} className="text-xs px-2 py-0.5 rounded"
                style={{ background: `${cert.color}12`, color: cert.color, border: `1px solid ${cert.color}30` }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Verified badge */}
        <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill={cert.color}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-mono-code text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>Verified Credential · {cert.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
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
          <p className="section-subtitle">My Credentials</p>
          <h2 className="section-title">Certifications</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
