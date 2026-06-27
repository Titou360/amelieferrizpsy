import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, ArrowLeft } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import SEO from '../components/seo/SEO'
import { schemaOrg } from '../components/seo/SchemaOrg'
import { villes } from '../lib/villes'

const SITE_URL = 'https://www.amelieferrizpsychanalyste.fr'
const PHONE_DISPLAY = '06 21 72 28 32'
const PHONE_HREF = 'tel:+33621722832'

export default function LocalPage() {
  const { slug } = useParams()
  const ville = villes.find((v) => v.slug === slug)

  if (!ville) return <Navigate to="/pages-locales" replace />

  const url = `${SITE_URL}/pages-locales/${ville.slug}`

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Pages locales', item: `${SITE_URL}/pages-locales` },
      { '@type': 'ListItem', position: 3, name: ville.name, item: url },
    ],
  }

  // LocalBusiness avec la zone desservie = cette ville
  const localBusinessForCity = {
    ...schemaOrg.localBusiness,
    areaServed: { '@type': 'City', name: `${ville.name} (${ville.postalCode})` },
  }

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title={ville.metaTitle}
        description={ville.metaDescription}
        canonical={`/pages-locales/${ville.slug}`}
        schemas={[localBusinessForCity, breadcrumbSchema]}
      />
      <Header />

      {/* Hero band */}
      <div className="bg-navy pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            light
            crumbs={[
              { label: 'Pages locales', href: '/pages-locales' },
              { label: ville.name },
            ]}
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream font-light mt-8 leading-tight"
          >
            Psychanalyste à {ville.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-cream/70 mt-3 flex items-center gap-2 text-sm"
          >
            <MapPin size={15} className="text-orange" />
            {ville.name} ({ville.postalCode}) — à {ville.distanceKm} km du cabinet de Narbonne
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-sans text-cream/70 mt-6 max-w-2xl leading-relaxed"
          >
            {ville.intro}
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Image localisée */}
        <img
          src="/amelie-ferriz-portrait.jpg"
          alt={`logo-amelie-ferriz-psychanalyste-narbonne-${ville.slug}`}
          className="w-64 h-64 object-cover object-top mx-auto mb-12 rounded-2xl border border-navy/10 shadow-md"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />

        {/* Table des matières */}
        <nav aria-label="Sommaire" className="bg-white border border-navy/10 p-6 mb-12">
          <p className="text-xs font-sans text-navy/50 uppercase tracking-widest mb-4">
            Sur cette page
          </p>
          <ul className="space-y-2">
            {ville.sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="font-sans text-sm text-navy/70 hover:text-orange transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sections */}
        {ville.sections.map((s) => (
          <section key={s.id} id={s.id} className="scroll-mt-28 mb-12">
            <h2 className="font-serif text-2xl sm:text-3xl text-navy font-light mb-4">
              {s.title}
            </h2>
            <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: s.html }} />
          </section>
        ))}

        {/* CTA */}
        <div className="mt-12 pt-10 border-t border-navy/10 bg-cream">
          <p className="font-serif text-2xl text-navy font-light mb-6">
            Prendre rendez-vous
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={PHONE_HREF}
              className="btn-primary text-xs tracking-widest uppercase px-8 py-3 flex items-center justify-center gap-2"
            >
              <Phone size={14} /> Prendre rdv par téléphone — {PHONE_DISPLAY}
            </a>
            <a
              href="/#contact"
              className="btn-outline text-xs tracking-widest uppercase px-8 py-3 flex items-center justify-center gap-2"
            >
              <Mail size={14} /> Contactez-moi
            </a>
          </div>

          <Link
            to="/pages-locales"
            className="inline-flex items-center gap-2 mt-8 text-xs font-sans text-navy/50 hover:text-orange transition-colors uppercase tracking-widest"
          >
            <ArrowLeft size={14} /> Toutes les villes
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
