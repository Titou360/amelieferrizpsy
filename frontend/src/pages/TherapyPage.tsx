import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import SEO from '../components/seo/SEO'
import { schemaOrg } from '../components/seo/SchemaOrg'
import { therapies } from '../lib/therapies'

const colorMap = {
  navy: 'bg-navy',
  orange: 'bg-orange',
  sage: 'bg-sage',
}

export default function TherapyPage() {
  const { slug } = useParams()
  const therapy = therapies.find((t) => t.slug === slug)

  if (!therapy) return <Navigate to="/" replace />

  const accentBg = colorMap[therapy.color]

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://www.amelieferrizpsychanalyste.fr" },
      { "@type": "ListItem", "position": 2, "name": "Thérapies", "item": "https://www.amelieferrizpsychanalyste.fr/#accompagnement" },
      { "@type": "ListItem", "position": 3, "name": therapy.title, "item": `https://www.amelieferrizpsychanalyste.fr/therapie/${therapy.slug}` },
    ]
  }

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title={therapy.title}
        description={therapy.description}
        canonical={`/therapie/${therapy.slug}`}
        ogImage={`https://www.amelieferrizpsychanalyste.fr${therapy.image}`}
        schemas={[schemaOrg.localBusiness, breadcrumbSchema]}
      />
      <Header />

      {/* Hero band */}
      <div className={`${accentBg} pt-32 pb-20 px-4`}>
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            light
            crumbs={[
              { label: 'Thérapies', href: '/#accompagnement' },
              { label: therapy.shortTitle },
            ]}
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream font-light mt-8 leading-tight"
          >
            {therapy.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-cream/70 mt-6 max-w-xl leading-relaxed"
          >
            {therapy.description}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="tiptap-content"
          dangerouslySetInnerHTML={{ __html: therapy.content }}
        />

        <div className="mt-16 pt-10 border-t border-navy/10 flex flex-col sm:flex-row gap-4">
          <a
            href="/#contact"
            className="btn-primary text-xs tracking-widest uppercase px-10 py-3"
          >
            Prendre rendez-vous
          </a>
          <Link
            to="/"
            className="btn-outline text-xs tracking-widest uppercase px-10 py-3"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
