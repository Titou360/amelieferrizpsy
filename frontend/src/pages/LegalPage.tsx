import { Link } from 'react-router-dom'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Breadcrumbs from '../components/ui/Breadcrumbs'

type LegalType = 'mentions' | 'cookies' | 'confidentialite' | 'conditions'

const content: Record<LegalType, { title: string; body: string }> = {
  mentions: {
    title: 'Mentions légales',
    body: `
      <h2>Éditeur du site</h2>
      <p>Amélie Ferriz, Psychanalyste<br/>19 rue de Londres, 11100 Narbonne<br/>Email : contact@amelieferriz.fr</p>
      <h2>Hébergeur</h2>
      <p>Vercel Inc., 340 Pine Street Suite 700, San Francisco, CA 94104, USA</p>
      <h2>Propriété intellectuelle</h2>
      <p>L'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive d'Amélie Ferriz ou de ses partenaires. Toute reproduction est interdite sans autorisation préalable.</p>
      <h2>Responsabilité</h2>
      <p>L'éditeur ne saurait être tenu responsable des dommages résultant de l'utilisation du site ou d'informations qui y sont contenues.</p>
    `,
  },
  cookies: {
    title: 'Politique de cookies',
    body: `
      <h2>Qu'est-ce qu'un cookie ?</h2>
      <p>Un cookie est un petit fichier texte déposé sur votre terminal lors de la visite d'un site.</p>
      <h2>Cookies utilisés</h2>
      <p><strong>Cookies nécessaires</strong> : indispensables au bon fonctionnement du site, ils ne peuvent être désactivés.</p>
      <p><strong>Cookies analytiques</strong> : ils nous permettent de mesurer l'audience du site de manière anonyme.</p>
      <h2>Gestion</h2>
      <p>Vous pouvez gérer vos préférences à tout moment depuis le bandeau cookies ou via les paramètres de votre navigateur.</p>
    `,
  },
  confidentialite: {
    title: 'Politique de confidentialité',
    body: `
      <h2>Données collectées</h2>
      <p>Dans le cadre de l'utilisation de ce site, Amélie Ferriz est amenée à collecter des données personnelles (nom, email, message) uniquement via le formulaire de contact.</p>
      <h2>Finalité</h2>
      <p>Ces données sont utilisées exclusivement pour répondre à vos demandes. Elles ne sont ni cédées ni vendues à des tiers.</p>
      <h2>Durée de conservation</h2>
      <p>Les données sont conservées le temps nécessaire au traitement de votre demande, dans le respect du RGPD.</p>
      <h2>Vos droits</h2>
      <p>Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour l'exercer : contact@amelieferriz.fr</p>
    `,
  },
  conditions: {
    title: "Conditions d'utilisation",
    body: `
      <h2>Accès au site</h2>
      <p>L'accès au site est libre et gratuit. Amélie Ferriz se réserve le droit de modifier ou d'interrompre l'accès au site à tout moment, sans préavis.</p>
      <h2>Propriété intellectuelle</h2>
      <p>Tout contenu publié sur ce site est protégé. Toute reproduction partielle ou totale sans autorisation est interdite.</p>
      <h2>Liens externes</h2>
      <p>Le site peut contenir des liens vers des sites tiers. Amélie Ferriz ne saurait être tenue responsable de leur contenu.</p>
      <h2>Droit applicable</h2>
      <p>Le présent site est soumis au droit français. Tout litige sera soumis aux juridictions compétentes.</p>
    `,
  },
}

const labels: Record<LegalType, string> = {
  mentions: 'Mentions légales',
  cookies: 'Politique de cookies',
  confidentialite: 'Politique de confidentialité',
  conditions: "Conditions d'utilisation",
}

export default function LegalPage({ type }: { type: LegalType }) {
  const { title, body } = content[type]

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <div className="bg-navy pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs light crumbs={[{ label: labels[type] }]} />
          <h1 className="font-serif text-4xl text-cream font-light mt-6">{title}</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <div className="tiptap-content" dangerouslySetInnerHTML={{ __html: body }} />
        <Link to="/" className="inline-block mt-12 btn-outline text-xs tracking-widest uppercase px-8 py-3">
          Retour à l'accueil
        </Link>
      </div>

      <Footer />
    </div>
  )
}
