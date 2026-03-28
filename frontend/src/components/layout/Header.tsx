import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { Menu, X, ChevronDown } from 'lucide-react'
import { therapies } from '../../lib/therapies'

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/#hero' },
  { label: 'Thérapies pratiquées', href: '/#accompagnement', hasDropdown: true },
  { label: 'Consultations', href: '/#consultations' },
  { label: 'Contact', href: '/#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setDropdownOpen(false)
  }, [location])

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center py-3">
            <img
              src="/logo-amelie-ferriz-psychanalyste.png"
              alt="Amélie Ferriz — Psychanalyste"
              className="h-16 w-auto object-contain transition-opacity duration-300 hover:opacity-80"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.label} className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center gap-1 font-sans text-sm text-cream/80 hover:text-cream transition-colors duration-200 tracking-wide"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                    onClick={() => handleNavClick(link.href)}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <div className="bg-navy border border-cream/10 shadow-2xl rounded-sm overflow-hidden">
                          {therapies.map((t) => (
                            <Link
                              key={t.slug}
                              to={`/therapie/${t.slug}`}
                              className="block px-5 py-3 text-sm font-sans text-cream/70 hover:text-cream hover:bg-white/5 transition-colors duration-150 border-b border-cream/5 last:border-0"
                            >
                              {t.shortTitle}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-sans text-sm text-cream/80 hover:text-cream transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-cream p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-navy/98 backdrop-blur-md overflow-hidden"
          >
            <nav className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.label}>
                  <Link
                    to={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="block py-3 font-sans text-base text-cream/80 hover:text-cream border-b border-cream/5 transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.hasDropdown && (
                    <div className="pl-4 flex flex-col gap-0.5 pt-1 pb-2">
                      {therapies.map((t) => (
                        <Link
                          key={t.slug}
                          to={`/therapie/${t.slug}`}
                          className="py-2 text-sm text-cream/50 hover:text-cream/80 transition-colors"
                        >
                          → {t.shortTitle}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
