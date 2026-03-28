import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.3,
      })
      gsap.from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        delay: 0.7,
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const scrollDown = () => {
    document.getElementById('accompagnement')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/80 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={{ opacity: 1, letterSpacing: '0.3em' }}
          transition={{ duration: 1, delay: 0.1 }}
          className="inline-block text-xs font-sans text-orange uppercase tracking-[0.3em] mb-8"
        >
          Psychanalyste — Narbonne
        </motion.span>

        <h1
          ref={titleRef}
          className="font-serif text-5xl sm:text-6xl lg:text-7xl text-cream font-light leading-tight mb-6"
        >
          Un espace{' '}
          <em className="italic text-orange/90">d'écoute</em>
          <br />
          pour avancer
        </h1>

        <p
          ref={subtitleRef}
          className="font-sans text-base sm:text-lg text-cream/70 leading-relaxed max-w-xl mx-auto mb-12"
        >
          Amélie Ferriz vous accompagne dans votre cheminement intérieur avec bienveillance et professionnalisme,
          au cabinet à Narbonne, à domicile ou en téléconsultation.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-primary px-8 py-3 text-sm tracking-widest uppercase"
          >
            Prendre rendez-vous
          </a>
          <a
            href="#accompagnement"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('accompagnement')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-ghost px-8 py-3 text-sm tracking-widest uppercase"
          >
            Découvrir
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-cream/40 hover:text-cream transition-colors flex flex-col items-center gap-2"
        aria-label="Défiler"
      >
        <span className="text-xs font-sans tracking-[0.2em] uppercase">Défiler</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.button>
    </section>
  )
}
