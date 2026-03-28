import { useEffect, useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Star, Quote, ExternalLink } from 'lucide-react'
import api from '../../lib/api'

interface Review {
  _id: string
  author: string
  platform: 'google' | 'linkedin' | 'facebook' | 'other'
  rating: number
  content: string
  date: string
  profileUrl?: string
}

const platformColors: Record<string, string> = {
  google: 'text-[#4285F4]',
  linkedin: 'text-[#0077B5]',
  facebook: 'text-[#1877F2]',
  other: 'text-navy/40',
}

const platformLabels: Record<string, string> = {
  google: 'Google',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  other: 'Avis',
}

function ReviewCard({ review, index }: { review: Review; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white p-8 relative border border-navy/5 flex flex-col"
    >
      {/* Quote icon */}
      <Quote size={28} className="text-orange/20 mb-4" />

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < review.rating ? 'text-orange fill-orange' : 'text-navy/20'}
          />
        ))}
      </div>

      {/* Content */}
      <p className="font-sans text-sm text-navy/70 leading-relaxed flex-1 mb-6">
        "{review.content}"
      </p>

      {/* Author */}
      <div className="flex items-end justify-between">
        <div>
          <p className="font-sans text-sm font-medium text-navy">{review.author}</p>
          <p className={`text-xs font-sans mt-0.5 ${platformColors[review.platform] ?? 'text-navy/40'}`}>
            {platformLabels[review.platform]}
          </p>
        </div>
        {review.profileUrl && (
          <a
            href={review.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-navy/20 hover:text-navy/60 transition-colors"
            aria-label="Voir le profil"
          >
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </motion.div>
  )
}

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api
      .get('/reviews')
      .then((res) => setReviews(res.data))
      .catch(() => setReviews([]))
      .finally(() => setLoading(false))
  }, [])

  // Don't render section if no reviews
  if (!loading && reviews.length === 0) return null

  return (
    <section className="py-24 bg-cream relative overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-sans text-orange uppercase tracking-[0.3em]"
          >
            Avis patients
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl text-navy mt-3 font-light"
          >
            Ce qu'ils en disent
          </motion.h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/50 h-56 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <ReviewCard key={r._id} review={r} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
