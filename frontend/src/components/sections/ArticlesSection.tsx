import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { Calendar, ArrowRight, FileText } from 'lucide-react'
import api from '../../lib/api'

interface Article {
  _id: string
  title: string
  slug: string
  excerpt?: string
  category?: string
  coverImage?: string
  publishedAt: string
}

function ArticleCard({ article, i }: { article: Article; i: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.12 }}
    >
      <Link
        to={`/article/${article.slug}`}
        className="group block bg-white border border-navy/8 hover:border-orange/30 transition-colors overflow-hidden"
      >
        {/* Cover image */}
        <div className="relative h-52 overflow-hidden bg-navy/5">
          {article.coverImage ? (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileText size={36} className="text-navy/15" />
            </div>
          )}
          {article.category && (
            <span className="absolute top-3 left-3 bg-white/90 text-orange text-xs font-sans uppercase tracking-widest px-2.5 py-1">
              {article.category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-1.5 text-xs font-sans text-navy/40 mb-3">
            <Calendar size={11} />
            {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </div>

          <h3 className="font-serif text-xl text-navy font-light leading-snug mb-3 group-hover:text-orange transition-colors">
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="text-sm font-sans text-navy/50 leading-relaxed line-clamp-2 mb-4">
              {article.excerpt}
            </p>
          )}

          <span className="inline-flex items-center gap-1.5 text-xs font-sans text-orange uppercase tracking-widest">
            Lire l'article <ArrowRight size={12} />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export default function ArticlesSection() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/articles')
      .then((res) => setArticles(res.data.slice(0, 3)))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (!loading && articles.length === 0) return null

  return (
    <section id="articles" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-sans text-orange uppercase tracking-[0.3em]"
          >
            Ressources
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl text-navy mt-3 font-light"
          >
            Articles & réflexions
          </motion.h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-navy/8 overflow-hidden">
                <div className="h-52 bg-navy/5 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-navy/8 animate-pulse w-1/3" />
                  <div className="h-5 bg-navy/8 animate-pulse w-3/4" />
                  <div className="h-3 bg-navy/5 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((a, i) => (
              <ArticleCard key={a._id} article={a} i={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
