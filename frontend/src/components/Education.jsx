import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const education = [
  {
    degree: 'Diploma in Information Technology',
    institution: 'Amrutvahini Polytechnic, Sangamner',
    period: '2020 – 2023',
    grade: '80.50%',
    gradeLabel: 'Percentage',
    status: 'Completed',
    color: '#8B5CF6',
    icon: '🎓',
    highlights: [
      'Strong foundation in programming, networking, and database management',
      'Developed problem-solving and analytical skills through project work',
      'Graduated with distinction in Information Technology',
    ],
    courses: ['Programming', 'Database', 'Networking', 'Web Technology', 'Data Structures'],
  },
  {
    degree: 'Bachelor of Engineering (Computer Engineering)',
    institution: 'Savitribai Phule Pune University (SPPU)',
    period: '2023 – 2027',
    grade: '7.5 CGPA',
    gradeLabel: 'CGPA',
    status: 'In Progress',
    color: '#00D4FF',
    icon: '🏛️',
    highlights: [
      'Specializing in Data Analytics, Machine Learning, and Business Intelligence',
      'Working on industry-scale analytics projects and dashboards',
      'Active in data science communities and technical events',
    ],
    courses: ['Data Structures', 'Machine Learning', 'Database Systems', 'Computer Networks', 'Software Engineering', 'Data Analytics'],
  },
]

function EduCard({ edu, index, inView }) {
  const isRight = index % 2 === 1

  return (
    <motion.div
      className={`relative flex items-center gap-8 mb-12 ${isRight ? 'flex-row-reverse' : ''}`}
      initial={{ opacity: 0, x: isRight ? 60 : -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Card */}
      <div className="glass-card p-6 flex-1 max-w-xl">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: `${edu.color}15`, border: `1px solid ${edu.color}40` }}
          >
            {edu.icon}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span
                className="px-2 py-0.5 rounded text-xs font-bold"
                style={{
                  background: edu.status === 'In Progress' ? 'rgba(0,212,255,0.15)' : 'rgba(6,255,165,0.15)',
                  color: edu.status === 'In Progress' ? '#00D4FF' : '#06FFA5',
                  border: `1px solid ${edu.status === 'In Progress' ? '#00D4FF' : '#06FFA5'}40`,
                  fontFamily: 'Orbitron',
                  fontSize: '0.65rem',
                  letterSpacing: '0.05em',
                }}
              >
                {edu.status === 'In Progress' ? '⚡ IN PROGRESS' : '✓ COMPLETED'}
              </span>
            </div>
            <h3 className="font-orbitron font-bold text-white text-sm leading-snug">{edu.degree}</h3>
          </div>
        </div>

        {/* Institution + period */}
        <p className="font-mono-code text-xs mb-1" style={{ color: edu.color }}>{edu.institution}</p>
        <p className="font-mono-code text-xs mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>📅 {edu.period}</p>

        {/* Grade */}
        <div
          className="inline-flex items-center gap-3 px-4 py-2 rounded-lg mb-5"
          style={{ background: `${edu.color}10`, border: `1px solid ${edu.color}30` }}
        >
          <div>
            <p className="font-mono-code text-xs" style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{edu.gradeLabel}</p>
            <p className="font-orbitron font-bold" style={{ color: edu.color, fontSize: '1.1rem' }}>{edu.grade}</p>
          </div>
        </div>

        {/* Highlights */}
        <ul className="space-y-2 mb-5">
          {edu.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <span style={{ color: edu.color, flexShrink: 0, marginTop: 1 }}>›</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Courses */}
        <div>
          <p className="font-orbitron text-xs mb-2" style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>KEY COURSES</p>
          <div className="flex flex-wrap gap-1.5">
            {edu.courses.map(c => (
              <span key={c} className="text-xs px-2 py-0.5 rounded"
                style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Center dot */}
      <div
        className="hidden lg:flex w-10 h-10 rounded-full items-center justify-center flex-shrink-0 z-10"
        style={{
          background: edu.color,
          boxShadow: `0 0 25px ${edu.color}60`,
          fontSize: '1.2rem',
        }}
      >
        {edu.icon}
      </div>

      {/* Spacer */}
      <div className="hidden lg:block flex-1 max-w-xl" />
    </motion.div>
  )
}

export default function Education() {
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
          <p className="section-subtitle">Academic Background</p>
          <h2 className="section-title">Education</h2>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Center line (desktop) */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, var(--neon-blue), var(--neon-purple), transparent)' }}
          />

          {education.map((edu, i) => (
            <EduCard key={i} edu={edu} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
