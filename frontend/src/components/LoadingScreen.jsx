import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated planet ring */}
      <div style={{ position: 'relative', width: 120, height: 120, marginBottom: '2rem' }}>
        {/* Outer orbit ring */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid rgba(0, 212, 255, 0.2)',
          animation: 'spin 3s linear infinite'
        }} />
        {/* Satellite dot */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 10, height: 10, borderRadius: '50%',
          background: 'var(--neon-blue)',
          boxShadow: '0 0 12px var(--neon-blue)',
          animation: 'orbitSpin 3s linear infinite',
          transformOrigin: '0 0',
          marginLeft: -5, marginTop: -5,
        }} />
        {/* Core planet */}
        <div style={{
          position: 'absolute', inset: '25%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #1E3A5F, #050816)',
          boxShadow: '0 0 30px rgba(0, 212, 255, 0.4)',
        }} />
        {/* Inner glow ring */}
        <div className="loading-ring" style={{ position: 'absolute', inset: '5%' }} />
      </div>

      <motion.p
        className="font-orbitron text-sm tracking-widest"
        style={{ color: 'var(--neon-blue)' }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        INITIALIZING SYSTEM
      </motion.p>

      <div style={{
        marginTop: '1.5rem',
        width: 200,
        height: 3,
        background: 'rgba(255,255,255,0.05)',
        borderRadius: 2,
        overflow: 'hidden'
      }}>
        <motion.div
          style={{ height: '100%', borderRadius: 2, background: 'linear-gradient(90deg, #00D4FF, #8B5CF6)' }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />
      </div>

      <p style={{ marginTop: '1rem', color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', fontFamily: 'JetBrains Mono' }}>
        Balkrushna Naik · Portfolio v1.0
      </p>
    </motion.div>
  )
}
