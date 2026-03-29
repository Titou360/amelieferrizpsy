import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, Home, Monitor } from 'lucide-react'

const consultations = [
  {
    icon: Building2,
    title: 'Au cabinet',
    subtitle: '19 rue de Londres, Narbonne',
    description:
      'Recevez-vous en séance individuelle, en couple ou en famille dans un cadre confidentiel et apaisant, au cœur de Narbonne.',
    note: null,
    color: 'navy',
  },
  {
    icon: Home,
    title: 'À domicile',
    subtitle: 'Sous conditions',
    description:
      'Pour les personnes en situation de mobilité réduite ou dans l\'incapacité de se déplacer, une consultation à domicile peut être envisagée.',
    note: '* Sous réserve de faisabilité et de disponibilité. Me contacter pour plus d\'informations.',
    color: 'sage',
  },
  {
    icon: Monitor,
    title: 'En téléconsultation',
    subtitle: 'Sous conditions',
    description:
      'La séance en ligne permet de maintenir le lien thérapeutique à distance, via une plateforme sécurisée et confidentielle.',
    note: '* Disponible sous conditions selon la nature de l\'accompagnement.',
    color: 'orange',
  },
]

const colorMap = {
  navy:   { iconBg: 'bg-navy text-cream',   accent: 'bg-navy',   border: 'border-navy/10' },
  sage:   { iconBg: 'bg-sage text-cream',   accent: 'bg-sage',   border: 'border-sage/20' },
  orange: { iconBg: 'bg-orange text-cream', accent: 'bg-orange', border: 'border-orange/20' },
}

// Composant séparé pour respecter les règles des hooks
function ConsultationCard({ c, i }: { c: typeof consultations[0]; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = c.icon
  const colors = colorMap[c.color as keyof typeof colorMap]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      className={`bg-white border ${colors.border} p-8 relative`}
    >
      <div className={`absolute top-0 left-0 right-0 h-1 ${colors.accent}`} />

      <div className={`inline-flex items-center justify-center w-12 h-12 ${colors.iconBg} mb-6`}>
        <Icon size={22} />
      </div>

      <h3 className="font-serif text-2xl text-navy mb-1">{c.title}</h3>
      <p className="text-xs font-sans text-orange/80 tracking-widest uppercase mb-5">
        {c.subtitle}
      </p>
      <p className="text-sm font-sans text-navy/60 leading-relaxed mb-4">
        {c.description}
      </p>
      {c.note && (
        <p className="text-xs font-sans text-navy/40 italic border-t border-navy/10 pt-4">
          {c.note}
        </p>
      )}
    </motion.div>
  )
}

export default function ConsultationsSection() {
  return (
    <section id="consultations" className="py-24 bg-cream-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-sans text-orange uppercase tracking-[0.3em]"
          >
            Modalités
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl text-navy mt-3 font-light"
          >
            Consultations possibles
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {consultations.map((c, i) => (
            <ConsultationCard key={c.title} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
