import { useEffect, useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SEO from '../components/seo/SEO'
import api from '../lib/api'

interface Faq {
  _id: string
  question: string
  answer: string
}

function FaqItem({ faq, i }: { faq: Faq; i: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.07 }}
      className="border-b border-navy/10 last:border-0"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
      >
        <span className="font-serif text-lg text-navy font-light group-hover:text-orange transition-colors">
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-orange transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm font-sans text-navy/60 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/faqs').then((res) => setFaqs(res.data)).finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Questions fréquentes"
        description="Réponses aux questions les plus fréquentes sur la psychanalyse, le déroulement des séances, les tarifs et les modalités de consultation avec Amélie Ferriz à Narbonne."
        canonical="/faq"
        schemas={[{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map((f) => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer },
          })),
        }]}
      />
      <Header />

      <div className="pt-32 pb-24 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-sans text-orange uppercase tracking-[0.3em]"
          >
            Questions fréquentes
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl text-navy mt-3 font-light"
          >
            F.A.Q
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-4 text-sm font-sans text-navy/50 max-w-md mx-auto"
          >
            Vous avez d'autres questions ? N'hésitez pas à me contacter directement.
          </motion.p>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="border-b border-navy/10 py-6">
                <div className="h-5 bg-navy/8 animate-pulse w-3/4" />
              </div>
            ))}
          </div>
        ) : faqs.length === 0 ? (
          <p className="text-center text-sm font-sans text-navy/40 py-12">
            Aucune question pour le moment.
          </p>
        ) : (
          <div className="bg-white border border-navy/8 px-8">
            {faqs.map((f, i) => (
              <FaqItem key={f._id} faq={f} i={i} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
