import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowLeft, User } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import SEO from '../components/seo/SEO'
import api from '../lib/api'

interface Article {
  _id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage?: string
  publishedAt: string
  category?: string
}

export default function ArticlePage() {
  const { slug } = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    api
      .get(`/articles/${slug}`)
      .then((res) => setArticle(res.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (notFound) return <Navigate to="/" replace />

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {loading ? (
        <div className="pt-40 pb-20 max-w-3xl mx-auto px-4 space-y-4">
          <div className="h-10 bg-navy/10 animate-pulse w-3/4" />
          <div className="h-4 bg-navy/5 animate-pulse w-1/3" />
          <div className="h-64 bg-navy/5 animate-pulse mt-8" />
        </div>
      ) : article ? (
        <>
          <SEO
            title={article.title}
            description={article.excerpt}
            canonical={`/article/${article.slug}`}
            ogImage={article.coverImage || 'https://www.amelieferrizpsychanalyste.fr/og-image.jpg'}
            ogType="article"
            articleAuthor="Amélie Ferriz"
            articlePublishedTime={article.publishedAt}
            schemas={[{
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": article.title,
              "description": article.excerpt,
              "author": { "@type": "Person", "name": "Amélie Ferriz", "jobTitle": "Psychanalyste" },
              "publisher": { "@type": "Person", "name": "Amélie Ferriz" },
              "datePublished": article.publishedAt,
              "image": article.coverImage || 'https://www.amelieferrizpsychanalyste.fr/og-image.jpg',
              "url": `https://www.amelieferrizpsychanalyste.fr/article/${article.slug}`,
              "inLanguage": "fr-FR"
            }]}
          />
          {/* Cover */}
          {article.coverImage && (
            <div className="relative h-72 sm:h-96 overflow-hidden">
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            </div>
          )}

          <div className={`max-w-3xl mx-auto px-4 sm:px-6 ${article.coverImage ? 'pt-12' : 'pt-32'} pb-20`}>
            <Breadcrumbs crumbs={[{ label: 'Articles', href: '/#articles' }, { label: article.title }]} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-8"
            >
              {article.category && (
                <span className="text-xs font-sans text-orange uppercase tracking-widest">
                  {article.category}
                </span>
              )}
              <h1 className="font-serif text-4xl sm:text-5xl text-navy font-light leading-tight mt-3 mb-6">
                {article.title}
              </h1>

              <div className="flex items-center gap-6 text-xs font-sans text-navy/40 mb-10 border-b border-navy/10 pb-8">
                <span className="flex items-center gap-1.5">
                  <User size={12} />
                  Amélie Ferriz, Psychanalyste
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </span>
              </div>

              <div
                className="tiptap-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />

              <div className="mt-16 pt-8 border-t border-navy/10">
                {/* Author signature */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-navy/10 overflow-hidden shrink-0">
                    <img src="/avatar-amelie.jpg" alt="Amélie Ferriz" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-medium text-navy">Amélie Ferriz</p>
                    <p className="font-sans text-xs text-navy/50">Psychanalyste — Narbonne</p>
                  </div>
                </div>

                <Link to="/" className="inline-flex items-center gap-2 mt-8 text-xs font-sans text-navy/50 hover:text-orange transition-colors uppercase tracking-widest">
                  <ArrowLeft size={14} /> Retour à l'accueil
                </Link>
              </div>
            </motion.div>
          </div>
        </>
      ) : null}

      <Footer />
    </div>
  )
}
