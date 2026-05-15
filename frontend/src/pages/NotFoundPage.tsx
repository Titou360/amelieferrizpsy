import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const fragments = [
  { text: "Cette page semble avoir glissé dans l'inconscient.", x: '10%', y: '20%', delay: 0 },
  { text: "L'adresse demandée n'existe plus\u2026 ou pas encore.", x: '55%', y: '65%', delay: 0.8 },
  { text: '\u2014 S. Freud', x: '70%', y: '30%', delay: 1.4 },
  { text: '404', x: '20%', y: '70%', delay: 0.4 },
]

function CursorTrail() {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([])
  const counterRef = useRef(0)

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      counterRef.current += 1
      const id = counterRef.current
      setTrail((prev) => [...prev.slice(-10), { x: e.clientX, y: e.clientY, id }])
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return (
    <>
      {trail.map((pt, i) => (
        <div
          key={pt.id}
          className="fixed pointer-events-none z-50 rounded-full bg-orange"
          style={{
            left: pt.x - 2,
            top: pt.y - 2,
            width: 4,
            height: 4,
            opacity: (i + 1) / trail.length * 0.6,
            transform: `scale(${0.4 + (i + 1) / trail.length * 0.6})`,
          }}
        />
      ))}
    </>
  )
}

function FloatingFragment({ text, x, y, delay }: { text: string; x: string; y: string; delay: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: [0, 0.18, 0.12, 0.18],
        y: [10, 0, -6, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute font-serif text-navy/20 text-sm sm:text-base italic select-none pointer-events-none max-w-[200px]"
      style={{ left: x, top: y }}
    >
      {text}
    </motion.p>
  )
}

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen bg-cream flex flex-col overflow-hidden">
      <CursorTrail />
      <Header />

      {/* Overlay gradient top — rend le header lisible */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-navy/80 to-transparent z-10 pointer-events-none" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      {/* Fragments flottants */}
      {fragments.map((f) => (
        <FloatingFragment key={f.text} {...f} />
      ))}

      {/* Contenu principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-20 text-center max-w-xl mx-auto px-4 flex-1 flex flex-col items-center justify-center py-32"
      >
        <span className="text-xs font-sans text-orange uppercase tracking-[0.3em]">
          Erreur 404
        </span>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy font-light mt-4 leading-snug">
          L'inconscient a déplacé<br />
          <em className="italic text-orange/80">cette page</em>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-6 font-sans text-sm text-navy/50 leading-relaxed"
        >
          La page que vous cherchez a peut-être été déplacée,<br />
          supprimée, ou n'a jamais existé.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="btn-primary text-xs tracking-widest uppercase px-8 py-3"
          >
            Retour à l'accueil
          </Link>
          <a
            href="/#contact"
            className="btn-outline text-xs tracking-widest uppercase px-8 py-3"
          >
            Prendre rendez-vous
          </a>
          <Link
            to="/#articles"
            className="btn-outline text-xs tracking-widest uppercase px-8 py-3"
          >
            Explorer les articles
          </Link>
        </motion.div>
      </motion.div>

      {/* Ligne décorative basse */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.2, ease: 'easeOut' }}
        className="w-24 h-px bg-orange/40 z-20 mx-auto mb-8"
      />
      <Footer />
    </div>
  )
}
