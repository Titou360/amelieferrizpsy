import SEO from '../components/seo/SEO'
import { schemaOrg } from '../components/seo/SchemaOrg'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import HeroSection from '../components/sections/HeroSection'
import TherapiesSection from '../components/sections/TherapiesSection'
import ConsultationsSection from '../components/sections/ConsultationsSection'
import ContactBanner from '../components/sections/ContactBanner'
import MapSection from '../components/sections/MapSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import ContactFormSection from '../components/sections/ContactFormSection'
import ArticlesSection from '../components/sections/ArticlesSection'

export default function HomePage() {
  return (
    <div className="relative">
      {/*
        Fixed background image — replace /bg-cabinet.jpg with actual image.
        The image is set on the outermost wrapper so every section sits above it.
      */}
      <div
        className="fixed inset-0 -z-10 fixed-bg bg-cream-dark"
        style={{
          backgroundImage: 'url(/bg-cabinet.jpg)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <SEO
        schemas={[schemaOrg.localBusiness, schemaOrg.person, schemaOrg.website, schemaOrg.breadcrumbHome, schemaOrg.siteLinks]}
      />
      <Header />
      <main>
        <HeroSection />
        <TherapiesSection />
        <ConsultationsSection />
        <ContactBanner />
        <MapSection />
        <TestimonialsSection />
        <ArticlesSection />
        <ContactFormSection />
      </main>
      <Footer />
    </div>
  )
}
