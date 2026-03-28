import { Link } from 'react-router-dom'
import { Facebook, Linkedin, Instagram } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#111820] text-cream/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl text-cream mb-2">Amélie Ferriz</p>
            <p className="text-xs tracking-[0.2em] uppercase text-cream/40 mb-5">Psychanalyste — Narbonne</p>
            <p className="text-sm leading-relaxed text-cream/50 max-w-xs">
              Un espace d'écoute bienveillant pour traverser vos questionnements intérieurs et avancer vers mieux-être.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="#"
                aria-label="Facebook"
                className="text-cream/40 hover:text-orange transition-colors duration-200"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-cream/40 hover:text-orange transition-colors duration-200"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-cream/40 hover:text-orange transition-colors duration-200"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Thérapies */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-cream/30 mb-5">Thérapies</p>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'La psychanalyse', slug: 'psychanalyse' },
                { label: 'Enfants & Adolescent·es', slug: 'enfants-adolescents' },
                { label: 'Thérapie de couple', slug: 'therapie-couple-familiale' },
                { label: 'Psychothérapies', slug: 'psychotherapie' },
                { label: 'Groupe de parole', slug: 'groupe-de-parole' },
              ].map((t) => (
                <li key={t.slug}>
                  <Link
                    to={`/therapie/${t.slug}`}
                    className="hover:text-cream transition-colors duration-200"
                  >
                    {t.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <p className="text-xs tracking-[0.2em] uppercase text-cream/30 mb-5">Informations</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/mentions-legales" className="hover:text-cream transition-colors duration-200">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link to="/politique-cookies" className="hover:text-cream transition-colors duration-200">
                  Politique de cookies
                </Link>
              </li>
              <li>
                <Link to="/politique-confidentialite" className="hover:text-cream transition-colors duration-200">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="/conditions-utilisation" className="hover:text-cream transition-colors duration-200">
                  Conditions d'utilisation
                </Link>
              </li>
              <li>
                <button
                  onClick={() => (window as any).CookieConsent?.showPreferences()}
                  className="hover:text-cream transition-colors duration-200"
                >
                  Gérer les cookies
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/30">
          <p>
            © {year} Amélie Ferriz, Psychanalyste — Tous droits réservés
          </p>
          <p>
            Site réalisé par{' '}
            <a
              href="https://www.nemosolutions.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/50 hover:text-orange transition-colors duration-200"
            >
              Nemo Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
