import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import SEO from "../components/seo/SEO";
import Breadcrumbs from "../components/ui/Breadcrumbs";

const paragraphs = [
  "La psychanalyse est une méthode d'investigation de processus mentaux et de traitement de divers troubles et souffrances psychiques somatisés ou pas.",
  "Elle aide à dépasser les traumatismes, et grâce au récit de sa propre souffrance, le patient va pouvoir en faire autre chose et décider de ne plus la subir.",
  "En effet la cure est fondée sur la parole et l'introspection. Pour des souffrances moins profondes et plus actuelles, ou simplement des questionnements sur soi, des thérapies plus courtes peuvent vous être proposées.",
  "Quelque soit votre âge, celui de votre enfant ou membre de votre famille, je vous propose des solutions pour vous accompagner. Décider de consulter est un premier pas vers l'équilibre émotionnel, et la reprise en main de votre bien-être.",
  "Amélie Ferriz, psychanalyste certifiée à Narbonne vous accompagne dans vos démarches thérapeutiques.",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SEO
        title="À propos"
        description="Amélie Ferriz, psychanalyste certifiée à Narbonne. Découvrez sa démarche thérapeutique fondée sur la parole et l'introspection, pour vous accompagner vers l'équilibre émotionnel."
        canonical="/a-propos"
      />
      <Header />

      <div className="bg-navy pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs light crumbs={[{ label: "À propos" }]} />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-serif text-4xl sm:text-5xl text-cream font-light mt-6"
          >
            À propos
          </motion.h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex flex-col gap-6">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`font-sans text-base leading-relaxed ${
                i === paragraphs.length - 1
                  ? "text-navy font-medium mt-4"
                  : "text-navy/70"
              }`}
            >
              {text}
            </motion.p>
          ))}
        </div>

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
          <Link
            to="/qui-suis-je"
            className="btn-outline text-xs tracking-widest uppercase px-10 py-3"
          >
            Qui suis-je&nbsp;?
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
