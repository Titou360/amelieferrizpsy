import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

function svgBase(size: number, className: string) {
  return {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
}

function HeartPlusSvg({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
<svg {...svgBase(size, className)}>
      <path d="m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49" />
      <path d="M15 15h6" />
      <path d="M18 12v6" />
    </svg>
  );
}

function LinkedinSvg({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg {...svgBase(size, className)}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookSvg({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg {...svgBase(size, className)}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramSvg({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg {...svgBase(size, className)}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const cards = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "19 rue de Londres\n11100 Narbonne",
    href: "https://maps.google.com/?q=19+rue+de+Londres+Narbonne",
    external: true,
  },
  {
    icon: Phone,
    label: "Téléphone",
    value: "+33 (0)6 21 72 28 32",
    href: "tel:+33621272832",
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: "amelie.ferriz@laposte.net",
    href: "mailto:amelie.ferriz@laposte.net",
    external: false,
  },
  {
    icon: HeartPlusSvg,
    label: "Réseaux sociaux",
    value: "LinkedIn · Facebook\nInstagram",
    href: "#",
    external: true,
    socials: true,
  },
];

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
            N'hésitez pas à me contacter pour toute question ou pour prendre
            rendez-vous.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream/20">
          {cards.map((card, i) => {
            const Icon = card.icon;
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
                      <a
                        href="https://www.linkedin.com/in/amelie-ferriz/"
                        aria-label="LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cream/60 hover:text-cream transition-colors"
                      >
                        <LinkedinSvg size={20} />
                      </a>
                      {/* A réactiver quand les réseaux seront ouverts */}
                      {/* <a href="#" aria-label="Facebook" className="text-cream/60 hover:text-cream transition-colors">
                        <FacebookSvg size={20} />
                      </a> */}
                      <a href="https://www.instagram.com/amelie_ferriz_psychanalyste/" aria-label="Instagram" className="text-cream/60 hover:text-cream transition-colors">
                        <InstagramSvg size={20} />
                      </a>
                      
                    </div>
                  </div>
                ) : (
                  <a
                    href={card.href}
                    target={card.external ? "_blank" : undefined}
                    rel={card.external ? "noopener noreferrer" : undefined}
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
            );
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
              e.preventDefault();
              document
                .getElementById("formulaire")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="btn bg-cream text-navy hover:bg-cream-dark transition-colors duration-300 px-10 py-3 text-xs tracking-widest uppercase"
          >
            Envoyer un message
          </a>
        </motion.div>
      </div>
    </section>
  );
}
