import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { therapies } from '../../lib/therapies'

const colorMap = {
  navy: {
    bg: 'bg-navy',
    imageBg: 'bg-navy-dark',
    text: 'text-cream',
    btnBg: 'bg-cream/10 text-cream border border-cream/30 hover:bg-cream/20',
  },
  orange: {
    bg: 'bg-orange',
    imageBg: 'bg-orange-dark',
    text: 'text-cream',
    btnBg: 'bg-cream/10 text-cream border border-cream/30 hover:bg-cream/20',
  },
  sage: {
    bg: 'bg-sage',
    imageBg: 'bg-sage-dark',
    text: 'text-cream',
    btnBg: 'bg-cream/10 text-cream border border-cream/30 hover:bg-cream/20',
  },
}

function TherapyCard({
  therapy,
  index,
}: {
  therapy: (typeof therapies)[0]
  index: number
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const colors = colorMap[therapy.color]
  const navigate = useNavigate()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative overflow-hidden group cursor-pointer flex flex-col"
      style={{ height: 480 }}
      onClick={() => navigate(`/therapie/${therapy.slug}`)}
    >
      {/* Image — occupe les 2/3 supérieurs, affichée en entièreté */}
      <div className={`relative flex-1 ${colors.imageBg} flex items-center justify-center overflow-hidden`}>
        <img
          src={therapy.image}
          alt={therapy.title}
          className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
        />
        {/* Léger gradient bas pour raccorder avec le bandeau */}
        <div className={`absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t ${
          therapy.color === 'navy' ? 'from-navy' :
          therapy.color === 'orange' ? 'from-orange' : 'from-sage'
        } to-transparent pointer-events-none`} />
      </div>

      {/* Bandeau bas — titre + bouton */}
      <div className={`${colors.bg} px-6 py-5 flex flex-col gap-3 shrink-0`}>
        <h3 className={`font-serif text-lg font-medium leading-snug ${colors.text}`}>
          {therapy.title}
        </h3>
        <button
          className={`self-start text-xs font-sans tracking-widest uppercase px-4 py-2 transition-all duration-300 ${colors.btnBg}`}
        >
          En savoir plus
        </button>
      </div>

      {/* Lignes décoratives coin bas-droit */}
      <div className="absolute bottom-0 right-0 w-20 h-20 opacity-10 pointer-events-none">
        <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
          <line x1="80" y1="0" x2="0" y2="80" stroke="white" strokeWidth="1.5" />
          <line x1="80" y1="20" x2="20" y2="80" stroke="white" strokeWidth="1" />
          <line x1="80" y1="40" x2="40" y2="80" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>
    </motion.div>
  )
}

// Card "Pourquoi choisir une thérapie ?"
function WhyCard({ index }: { index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-navy flex flex-col items-center justify-center p-10 text-center relative overflow-hidden"
      style={{ height: 480 }}
    >
      {/* Motif décoratif */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="w-10 h-px bg-orange mx-auto mb-8" />
        <p className="font-serif text-2xl text-cream font-light leading-relaxed mb-6">
          Pourquoi choisir de faire une thérapie ?
        </p>
        <div className="w-10 h-px bg-orange mx-auto mb-8" />
        <p className="font-serif text-xl text-cream/70 font-light italic">
          Et laquelle choisir ?
        </p>
      </div>
    </motion.div>
  )
}

export default function TherapiesSection() {
  return (
    <section id="accompagnement" className="relative py-24">
      <div className="absolute inset-0 bg-cream/90 z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-sans text-orange uppercase tracking-[0.3em]"
          >
            Accompagnement
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl text-navy mt-3 font-light"
          >
            Je vous accompagne
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <WhyCard index={0} />
          {therapies.map((t, i) => (
            <TherapyCard key={t.slug} therapy={t} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  )
}
