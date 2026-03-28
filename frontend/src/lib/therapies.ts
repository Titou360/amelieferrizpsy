export interface Therapy {
  slug: string
  title: string
  shortTitle: string
  color: 'navy' | 'orange' | 'sage'
  image: string
  description: string
  content: string
}

export const therapies: Therapy[] = [
  {
    slug: 'psychanalyse',
    title: 'La psychanalyse',
    shortTitle: 'La psychanalyse',
    color: 'orange',
    image: '/photo-psychanalyse.jpg',
    description: 'Une écoute analytique pour explorer l\'inconscient et trouver votre chemin intérieur.',
    content: `<p>La psychanalyse est une méthode d'investigation psychologique fondée par Sigmund Freud. Elle permet d'explorer les processus inconscients qui influencent nos pensées, nos émotions et nos comportements.</p>
<p>Par le biais d'un espace de parole libre et bienveillant, vous pouvez progressivement accéder à une meilleure compréhension de vous-même et de vos relations.</p>
<h2>Pour qui ?</h2>
<p>La psychanalyse s'adresse à toute personne souhaitant comprendre en profondeur ses fonctionnements intérieurs, traverser des moments de crise, ou simplement évoluer personnellement.</p>`,
  },
  {
    slug: 'enfants-adolescents',
    title: 'Enfants & Adolescent·es',
    shortTitle: 'Enfants & Ados',
    color: 'sage',
    image: '/photo-enfants-ados.jpg',
    description: 'Un accompagnement adapté pour les plus jeunes, dans un cadre sécurisant et bienveillant.',
    content: `<p>Le suivi des enfants et adolescents nécessite une approche spécifique, adaptée à leur âge et à leur développement. L'espace thérapeutique devient un lieu de jeu, d'expression et d'écoute.</p>
<p>Difficultés scolaires, troubles du comportement, anxiété, deuil, séparation parentale — chaque situation est unique et traitée avec attention.</p>`,
  },
  {
    slug: 'therapie-couple-familiale',
    title: 'Thérapie de couple & familiale',
    shortTitle: 'Couple & Famille',
    color: 'orange',
    image: '/photo-couple-famille.jpg',
    description: 'Retrouver le dialogue et reconstruire des liens dans un cadre neutre et professionnel.',
    content: `<p>La thérapie de couple ou familiale offre un espace pour verbaliser les tensions, restaurer la communication et retrouver un équilibre relationnel.</p>
<p>Conflits répétitifs, crises, transition de vie, deuil relationnel — ces espaces permettent de dépasser les impasses et d'évoluer ensemble.</p>`,
  },
  {
    slug: 'psychotherapie',
    title: 'Psychothérapie analytique · Psychothérapie de soutien · Thérapie brève',
    shortTitle: 'Psychothérapies',
    color: 'navy',
    image: '/photo-psychotherapie.jpg',
    description: 'Des approches complémentaires pour répondre à des besoins variés, à court ou long terme.',
    content: `<p>La <strong>psychothérapie analytique</strong> s'inspire des concepts psychanalytiques pour explorer les conflits inconscients et favoriser le changement psychique.</p>
<p>La <strong>psychothérapie de soutien</strong> vise à renforcer les capacités d'adaptation du patient face à une période difficile.</p>
<p>La <strong>thérapie brève</strong> se concentre sur des objectifs précis en un nombre limité de séances, idéale pour des problématiques ciblées.</p>`,
  },
  {
    slug: 'groupe-de-parole',
    title: 'Groupe de parole, professionnels',
    shortTitle: 'Groupe de parole',
    color: 'sage',
    image: '/photo-groupe-parole.jpg',
    description: 'Des espaces collectifs pour partager, s\'écouter et grandir ensemble dans un cadre professionnel.',
    content: `<p>Les groupes de parole professionnels permettent à des équipes ou des individus exerçant des métiers à forte charge émotionnelle de partager leurs vécus dans un cadre confidentiel et bienveillant.</p>
<p>Ces espaces favorisent la prévention du burn-out, le renforcement des liens d'équipe et l'amélioration des pratiques professionnelles.</p>`,
  },
]
