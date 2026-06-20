import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Skill data ──
const skillCategories = [
  {
    title: 'Programming Languages',
    icon: '{ }',
    color: '#00F5FF',
    skills: [
      { name: 'Python', pct: 85 },
      { name: 'SQL', pct: 90 },
      { name: 'Java', pct: 40 },
      { name: 'JavaScript', pct: 40 },
    ],
  },
  {
    title: 'Data Analysis',
    icon: '📊',
    color: '#BC13FE',
    skills: [
      { name: 'Pandas', pct: 85 },
      { name: 'NumPy', pct: 80 },
      { name: 'Data Cleaning', pct: 90 },
      { name: 'EDA', pct: 85 },
      { name: 'Data Wrangling', pct: 82 },
    ],
  },
  {
    title: 'Visualization',
    icon: '📈',
    color: '#06FFA5',
    skills: [
      { name: 'Power BI', pct: 87 },
      { name: 'Tableau', pct: 75 },
      { name: 'Excel', pct: 88 },
      { name: 'Matplotlib', pct: 80 },
      { name: 'Seaborn', pct: 78 },
    ],
  },
  {
    title: 'Databases',
    icon: '🗄️',
    color: '#FF006E',
    skills: [
      { name: 'MySQL', pct: 84 },
      { name: 'MongoDB', pct: 20 },
    ],
  },
  {
    title: 'Development',
    icon: '⚙️',
    color: '#06FFA5',
    skills: [
      { name: 'React.js', pct: 35 },
      { name: 'Flask', pct: 50 },
      { name: 'Git / GitHub', pct: 85 },
      { name: 'Figma', pct: 80 },
    ],
  },
]

// All skills flat list for carousel
const carouselItems = skillCategories.flatMap(cat => cat.skills.map(s => ({ ...s, category: cat.title, color: cat.color })))

// ── Carousel row ──
function SkillCarousel({ items, reverse = false }) {
  const doubled = [...items, ...items]

  return (
    <div className="skills-carousel mb-4 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
      <div className="skills-track" style={{ animationDirection: reverse ? 'reverse' : 'normal', animationDuration: '35s' }}>
        {doubled.map((skill, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-2 mx-2 px-4 py-2 rounded-full"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${skill.color}30`,
              whiteSpace: 'nowrap',
              flexShrink: 0,
              transition: 'all 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${skill.color}15`
              e.currentTarget.style.borderColor = skill.color
              e.currentTarget.style.boxShadow = `0 0 15px ${skill.color}30`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              e.currentTarget.style.borderColor = `${skill.color}30`
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: skill.color, boxShadow: `0 0 6px ${skill.color}`, flexShrink: 0 }} />
            <span className="font-mono-code text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{skill.name}</span>
            <span className="font-mono-code text-xs" style={{ color: skill.color }}>{skill.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Skill Category Card ──
function SkillCard({ cat, delay }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
          style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}40` }}>
          {cat.icon}
        </div>
        <h3 className="font-orbitron text-sm font-bold text-white">{cat.title}</h3>
      </div>

      <div className="space-y-4">
        {cat.skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1.5">
              <span className="font-mono-code text-xs" style={{ color: 'rgba(255,255,255,0.8)' }}>{skill.name}</span>
              <span className="font-mono-code text-xs" style={{ color: cat.color }}>{skill.pct}%</span>
            </div>
            <div className="skill-bar">
              <motion.div
                className="skill-bar-fill"
                initial={{ width: 0 }}
                animate={inView ? { width: `${skill.pct}%` } : {}}
                transition={{ duration: 1.4, ease: 'easeOut', delay: delay + 0.3 }}
                style={{ background: `linear-gradient(90deg, ${cat.color}, ${cat.color}80)`, boxShadow: `0 0 8px ${cat.color}` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// ── Main Section ──
export default function Skills() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const row1 = carouselItems.slice(0, Math.ceil(carouselItems.length / 2))
  const row2 = carouselItems.slice(Math.ceil(carouselItems.length / 2))

  return (
    <section className="py-24 relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-subtitle">What I Know</p>
          <h2 className="section-title">Technical Skills</h2>
        </motion.div>

        {/* Carousels */}
        <div className="mb-16">
          <SkillCarousel items={row1} />
          <SkillCarousel items={row2} reverse />
        </div>

        {/* Skill category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ gridAutoRows: '1fr' }}>
          {skillCategories.map((cat, i) => (
            <SkillCard key={cat.title} cat={cat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
