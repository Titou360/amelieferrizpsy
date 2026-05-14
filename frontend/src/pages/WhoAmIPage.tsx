import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SEO from '../components/seo/SEO'
import Breadcrumbs from '../components/ui/Breadcrumbs'

const sections = [
  {
    title: 'Ma méthode',
    text: "Ma méthode de travail repose sur les techniques psychanalytiques, ainsi que sur les principes ultérieurs de la psychanalyse.\n\nJe crée un cadre sécurisé et bienveillant où mes patients peuvent explorer librement leurs pensées, leurs émotions, leurs rêves et leurs souvenirs pour mieux comprendre les dynamiques psychologiques qui influencent leur comportement et leur bien-être.\n\nJe prends en compte la singularité de chaque personne, et chaque souffrance ou questionnement est pris en charge en tenant compte de l'histoire et de la structure qui lui est propre, en aucun cas comme une généralité.",
  },
  {
    title: 'Mon objectif',
    text: "Mon objectif est d'aider mes patients à développer une meilleure connaissance d'eux-mêmes, à gagner en clarté sur leurs motivations, leurs croyances et leurs schémas de pensée, et à favoriser leur bien-être psychologique.",
  },
  {
    title: 'Mon engagement',
    text: "En tant que psychanalyste, je suis également engagée dans un travail continu de formation et de développement professionnel pour rester informée des dernières recherches et des meilleures pratiques dans le domaine de la psychanalyse. Je suis régulièrement supervisée comme le demande la pratique de cette science.\n\nJe suis membre de la Fédération Freudienne de Psychanalyse et je suis tenue au respect strict des normes éthiques et déontologiques de la profession.",
  },
]

const introParagraphs = [
  "Je suis membre de la Fédération Freudienne de Psychanalyse.",
  "Mon cursus de formation comprend l'aboutissement de ma propre cure analytique avec une psychanalyste didacticienne.",
  "J'ai étudié la psychanalyse dans les Instituts Freudiens de Psychanalyse de Narbonne et de Nîmes.",
  "Je suis psychanalyste certifiée.",
  "Diplômée également d'une Maîtrise en Langues Étrangères (Espagnol, Anglais).",
  "J'ai eu une longue expérience en tant que salariée et chef d'entreprise.",
  "En tant que psychanalyste, mon objectif est d'aider les personnes à mieux comprendre leur moi intérieur et à résoudre les défis psychologiques et émotionnels auxquels ils peuvent faire face. Forte de plusieurs années d'expérience dans le domaine, je suis passionnée par l'étude approfondie des processus psychiques, des émotions, des relations humaines avec leur environnement social, culturel et familial.",
]

export default function WhoAmIPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="Qui suis-je ?"
        description="Amélie Ferriz, psychanalyste certifiée à Narbonne, membre de la Fédération Freudienne de Psychanalyse. Découvrez son parcours, sa méthode et ses engagements."
        canonical="/qui-suis-je"
      />
      <Header />

      {/* Hero banner */}
      <div className="bg-navy pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs light crumbs={[{ label: 'Qui suis-je ?' }]} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-4xl sm:text-5xl text-cream font-light mt-6"
          >
            Qui suis-je&nbsp;?
          </motion.h1>
        </div>
      </div>

      {/* Section 1 — Photo + intro */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="aspect-[3/4] bg-navy/10 overflow-hidden"
          >
            <img
              src="/amelie-ferriz-portrait.jpg"
              alt="Amélie Ferriz, psychanalyste à Narbonne"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col gap-5 pt-2"
          >
            {introParagraphs.map((p, i) => (
              <p
                key={i}
                className={`font-sans text-base leading-relaxed ${
                  i === 3 ? 'text-navy font-medium' : 'text-navy/70'
                }`}
              >
                {p}
              </p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sections 2, 3, 4 */}
      <section className="bg-white border-t border-navy/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 flex flex-col gap-16">
          {sections.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8"
            >
              <div>
                <span className="text-xs font-sans text-orange uppercase tracking-[0.25em]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="font-serif text-2xl text-navy font-light mt-2">
                  {s.title}
                </h2>
              </div>
              <div className="flex flex-col gap-4">
                {s.text.split('\n\n').map((para, j) => (
                  <p key={j} className="font-sans text-base text-navy/70 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA finale */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5"
        >
          <p className="font-sans text-base text-navy/70 leading-relaxed">
            Si vous êtes à la recherche d'un soutien psychologique approfondi et d'une exploration en profondeur de votre moi intérieur, je serais ravie de vous accompagner.
          </p>
          <p className="font-sans text-base text-navy/70 leading-relaxed">
            N'hésitez pas à me contacter pour en savoir plus sur ma pratique et sur la manière dont je peux vous aider à mieux comprendre et à résoudre les défis psychologiques auxquels vous êtes confronté(e).
          </p>
        </motion.div>

        <div className="mt-12 pt-10 border-t border-navy/10 flex flex-col sm:flex-row justify-center gap-4">
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
      </section>

      <Footer />
    </div>
  )
}
