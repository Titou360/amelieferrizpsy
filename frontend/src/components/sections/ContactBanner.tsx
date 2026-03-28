import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Facebook, Linkedin, Instagram } from 'lucide-react'

const cards = [
  {
    icon: MapPin,
    label: 'Adresse',
    value: '19 rue de Londres\n11100 Narbonne',
    href: 'https://maps.google.com/?q=19+rue+de+Londres+Narbonne',
    external: true,
  },
  {
    icon: Phone,
    label: 'Téléphone',
    value: '+33 (0)6 XX XX XX XX',
    href: 'tel:+336XXXXXXXX',
    external: false,
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contact@amelieferriz.fr',
    href: 'mailto:contact@amelieferriz.fr',
    external: false,
  },
  {
    icon: Linkedin,
    label: 'Réseaux sociaux',
    value: 'LinkedIn · Facebook\nInstagram',
    href: '#',
    external: true,
    socials: true,
  },
]

export default function ContactBanner() {
  return (
    <section id="contact" className="bg-sage py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl sm:text-5xl text-cream font-light"
          >
            Prenons contact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-sans text-cream/70 mt-4 max-w-md mx-auto text-sm leading-relaxed"
          >
            N'hésitez pas à me contacter pour toute question ou pour prendre rendez-vous.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/20">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {card.socials ? (
                  <div className="bg-sage-dark p-8 text-center flex flex-col items-center gap-4 h-full">
                    <div className="flex items-center justify-center w-12 h-12 bg-cream/10">
                      <Icon size={22} className="text-cream" />
                    </div>
                    <p className="text-xs font-sans text-cream/50 uppercase tracking-widest">
                      {card.label}
                    </p>
                    <div className="flex items-center gap-5 mt-1">
                      <a href="#" aria-label="LinkedIn" className="text-cream/60 hover:text-cream transition-colors">
                        <Linkedin size={20} />
                      </a>
                      <a href="#" aria-label="Facebook" className="text-cream/60 hover:text-cream transition-colors">
                        <Facebook size={20} />
                      </a>
                      <a href="#" aria-label="Instagram" className="text-cream/60 hover:text-cream transition-colors">
                        <Instagram size={20} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <a
                    href={card.href}
                    target={card.external ? '_blank' : undefined}
                    rel={card.external ? 'noopener noreferrer' : undefined}
                    className="group bg-sage-dark p-8 text-center flex flex-col items-center gap-4 h-full hover:bg-navy transition-colors duration-300"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-cream/10 group-hover:bg-orange/20 transition-colors">
                      <Icon size={22} className="text-cream" />
                    </div>
                    <p className="text-xs font-sans text-cream/50 uppercase tracking-widest">
                      {card.label}
                    </p>
                    <p className="font-sans text-sm text-cream/80 text-center leading-relaxed whitespace-pre-line">
                      {card.value}
                    </p>
                  </a>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Contact form teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="#formulaire"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('formulaire')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn bg-cream text-navy hover:bg-cream-dark transition-colors duration-300 px-10 py-3 text-xs tracking-widest uppercase"
          >
            Envoyer un message
          </a>
        </motion.div>
      </div>
    </section>
  )
}
