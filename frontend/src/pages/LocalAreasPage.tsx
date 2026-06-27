import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Breadcrumbs from '../components/ui/Breadcrumbs'
import SEO from '../components/seo/SEO'
import { schemaOrg } from '../components/seo/SchemaOrg'
import { villes } from '../lib/villes'

const SITE_URL = 'https://www.amelieferrizpsychanalyste.fr'

export default function LocalAreasPage() {
  const sorted = [...villes].sort((a, b) => a.distanceKm - b.distanceKm)

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: "Zones d'intervention — Amélie Ferriz, psychanalyste",
    itemListElement: sorted.map((v, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Psychanalyste à ${v.name}`,
      url: `${SITE_URL}/pages-locales/${v.slug}`,
    })),
  }

  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Pages locales — Psychanalyste autour de Narbonne"
        description="Amélie Ferriz, psychanalyste à Narbonne, accompagne les habitant·es des communes alentour : Coursan, Gruissan, Lézignan-Corbières et bien d'autres, au cabinet ou en téléconsultation."
        canonical="/pages-locales"
        schemas={[schemaOrg.localBusiness, itemListSchema]}
      />
      <Header />

      {/* Hero band */}
      <div className="bg-navy pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs light crumbs={[{ label: 'Pages locales' }]} />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-cream font-light mt-8 leading-tight"
          >
            Psychanalyste autour de Narbonne
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-cream/70 mt-6 max-w-2xl leading-relaxed"
          >
            Le cabinet d'Amélie Ferriz est à Narbonne, et reçoit les habitant·es des
            communes alentour — au cabinet ou en téléconsultation. Trouvez votre commune
            ci-dessous.
          </motion.p>
        </div>
      </div>

      {/* Liste des villes */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sorted.map((v) => (
            <li key={v.slug}>
              <Link
                to={`/pages-locales/${v.slug}`}
                className="group flex items-center gap-3 bg-white border border-navy/10 hover:border-orange/40 transition-colors px-5 py-4"
              >
                <MapPin size={18} className="text-orange shrink-0" />
                <span className="flex-1 font-sans text-sm text-navy/80">
                  Amélie Ferriz à <strong className="font-medium">{v.name}</strong>, à {v.distanceKm} km du cabinet
                </span>
                <ArrowRight
                  size={15}
                  className="text-navy/20 group-hover:text-orange transition-colors shrink-0"
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </div>
  )
}
