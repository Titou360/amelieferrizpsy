export interface VilleSection {
  id: string        // ancre pour la table des matières (#id)
  title: string     // titre H2
  html: string      // contenu de la section
}

export interface Ville {
  slug: string
  name: string
  postalCode: string
  distanceKm: number
  metaTitle: string
  metaDescription: string
  intro: string
  sections: VilleSection[]
}

/**
 * Pages locales SEO. Chaque ville a un contenu RÉDIGÉ et différencié
 * (et non un gabarit recopié) afin de respecter les règles de Google
 * sur les pages locales et d'être réellement utile aux patients.
 */
export const villes: Ville[] = [
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'coursan',
    name: 'Coursan',
    postalCode: '11110',
    distanceKm: 7,
    metaTitle: 'Psychanalyste à Coursan (11110) — Amélie Ferriz, à 7 km',
    metaDescription:
      "Vous cherchez une psychanalyste près de Coursan ? Le cabinet d'Amélie Ferriz est à 7 km, à Narbonne. Psychanalyse, psychothérapie, suivi enfants et adultes.",
    intro:
      "Habitant·e de Coursan, vous envisagez d'entamer un travail sur vous-même ? Le cabinet d'Amélie Ferriz, psychanalyste, se situe à seulement 7 km, en plein cœur de Narbonne.",
    sections: [
      {
        id: 'proximite',
        title: 'Une psychanalyste à deux pas de Coursan',
        html: `
          <p>Coursan et Narbonne sont voisines : moins de dix minutes en voiture séparent le centre de Coursan du cabinet, situé 19 rue de Londres. Cette proximité est un atout réel pour une psychanalyse, qui repose sur la <strong>régularité</strong> des séances. Vous pouvez ainsi maintenir un rythme hebdomadaire sans que le trajet ne devienne un obstacle.</p>
          <p>Que vous soyez du centre, des hameaux ou des quartiers résidentiels de Coursan, le cabinet reste facilement accessible tout au long de l'année.</p>
        `,
      },
      {
        id: 'pourquoi-consulter',
        title: 'Pourquoi entreprendre une psychanalyse ?',
        html: `
          <p>On vient consulter pour des raisons très variées : une souffrance qui dure, des angoisses, une période de vie difficile, des répétitions dont on n'arrive pas à sortir, ou simplement le désir de mieux se comprendre.</p>
          <ul>
            <li>Mal-être, anxiété, épisodes dépressifs</li>
            <li>Deuil, séparation, transition de vie</li>
            <li>Difficultés relationnelles ou familiales</li>
            <li>Manque de confiance, sentiment de tourner en rond</li>
          </ul>
          <p>La psychanalyse offre un espace d'écoute confidentiel pour mettre des mots sur ce qui se joue, à votre rythme.</p>
        `,
      },
      {
        id: 'acces',
        title: 'Se rendre au cabinet depuis Coursan',
        html: `
          <p>Depuis Coursan, rejoignez Narbonne par la D6009 puis le centre-ville : comptez environ 10 minutes. Le cabinet est situé 19 rue de Londres, à proximité de stationnements.</p>
          <p>Pour les personnes à mobilité réduite ou les emplois du temps chargés, la <strong>téléconsultation</strong> reste possible, en complément ou en alternative aux séances au cabinet.</p>
        `,
      },
      {
        id: 'rendez-vous',
        title: 'Prendre rendez-vous',
        html: `
          <p>Le premier entretien permet de faire connaissance, d'exposer votre demande et de définir ensemble un cadre de travail. Vous pouvez réserver par téléphone ou via le formulaire de contact du site.</p>
        `,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'gruissan',
    name: 'Gruissan',
    postalCode: '11430',
    distanceKm: 10.5,
    metaTitle: 'Psychanalyste près de Gruissan (11430) — Amélie Ferriz',
    metaDescription:
      "Psychanalyste à 10 km de Gruissan : Amélie Ferriz vous reçoit à Narbonne, ou en téléconsultation. Accompagnement de l'anxiété, du mal-être et des transitions.",
    intro:
      "À Gruissan, le rythme des saisons façonne la vie quotidienne. Quand le besoin de parler se fait sentir, le cabinet d'Amélie Ferriz, psychanalyste, vous accueille à Narbonne, à une dizaine de kilomètres.",
    sections: [
      {
        id: 'accompagnement',
        title: 'Un accompagnement psychanalytique proche de Gruissan',
        html: `
          <p>Gruissan vit au rythme de la mer et du tourisme. Cette saisonnalité peut peser : intensité de l'été, calme parfois pesant de l'hiver, isolement hors saison, incertitudes liées aux activités saisonnières.</p>
          <p>Le cabinet, à environ 10 km, offre un espace où déposer ces ressentis et travailler en profondeur, loin de l'agitation.</p>
        `,
      },
      {
        id: 'anxiete-solitude',
        title: 'Anxiété, solitude, mal-être : mettre des mots',
        html: `
          <p>Le sentiment de solitude, l'anxiété ou la baisse de moral ne sont pas des faiblesses : ce sont des signaux. Les entendre et les explorer permet souvent de retrouver de l'élan.</p>
          <ul>
            <li>Angoisses, ruminations, troubles du sommeil</li>
            <li>Sentiment d'isolement, surtout hors saison</li>
            <li>Stress lié au travail saisonnier ou à l'incertitude</li>
            <li>Besoin de faire le point sur sa vie</li>
          </ul>
        `,
      },
      {
        id: 'cabinet-ou-visio',
        title: 'Au cabinet à Narbonne ou en téléconsultation',
        html: `
          <p>Vous pouvez être reçu·e au cabinet, 19 rue de Londres à Narbonne (environ 15 minutes depuis Gruissan). En période de forte activité ou de mauvais temps, la <strong>téléconsultation</strong> par visioconférence permet de maintenir un suivi régulier sans contrainte de déplacement.</p>
        `,
      },
      {
        id: 'contact',
        title: 'Contact et rendez-vous',
        html: `
          <p>Pour un premier échange, contactez Amélie Ferriz par téléphone ou via le formulaire du site. Vous y exposerez votre demande et conviendrez ensemble des modalités les plus adaptées.</p>
        `,
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'lezignan-corbieres',
    name: 'Lézignan-Corbières',
    postalCode: '11200',
    distanceKm: 18.6,
    metaTitle: 'Psychanalyste pour Lézignan-Corbières — Amélie Ferriz (Narbonne)',
    metaDescription:
      "Habitant·e de Lézignan-Corbières : consultez une psychanalyste à Narbonne (18 km) ou en téléconsultation. Psychanalyse, psychothérapie, suivi adultes, ados, couples.",
    intro:
      "À Lézignan-Corbières, l'offre de suivi analytique reste limitée. Amélie Ferriz, psychanalyste à Narbonne, propose un accompagnement au cabinet comme en téléconsultation, pour vous éviter la contrainte de la distance.",
    sections: [
      {
        id: 'consulter-depuis-lezignan',
        title: 'Consulter une psychanalyste depuis Lézignan-Corbières',
        html: `
          <p>Lézignan-Corbières se trouve à une vingtaine de kilomètres de Narbonne, facilement reliée par la N113 ou l'autoroute A61. Le cabinet, 19 rue de Londres, est accessible en une vingtaine de minutes.</p>
          <p>Pour celles et ceux qui préfèrent éviter le trajet régulier, la téléconsultation offre une alternative tout aussi efficace.</p>
        `,
      },
      {
        id: 'quand-consulter',
        title: 'Quand consulter ? Les raisons d\'un suivi',
        html: `
          <p>Il n'existe pas de « bon moment » universel : c'est souvent lorsqu'une difficulté devient envahissante que le besoin se précise.</p>
          <ul>
            <li>Angoisses, mal-être diffus, perte de sens</li>
            <li>Événements de vie : deuil, rupture, reconversion</li>
            <li>Schémas qui se répètent malgré soi</li>
            <li>Accompagnement d'un enfant, d'un adolescent ou d'un couple</li>
          </ul>
        `,
      },
      {
        id: 'teleconsultation',
        title: 'Téléconsultation : un suivi sans la distance',
        html: `
          <p>La distance ne doit pas être un frein. La <strong>téléconsultation</strong> par visioconférence permet de bénéficier du même cadre d'écoute depuis chez vous, à Lézignan-Corbières, avec la même régularité et la même confidentialité qu'au cabinet.</p>
        `,
      },
      {
        id: 'deroulement',
        title: 'Le déroulement d\'une séance',
        html: `
          <p>La première rencontre est un temps d'échange : vous exposez ce qui vous amène, et le cadre du travail se définit ensemble. Par la suite, la parole libre — « dire ce qui vient » — est au cœur de la démarche analytique.</p>
        `,
      },
      {
        id: 'rendez-vous',
        title: 'Prendre rendez-vous',
        html: `
          <p>Vous pouvez joindre Amélie Ferriz par téléphone ou via le formulaire de contact pour convenir d'un premier rendez-vous, au cabinet ou en visioconférence.</p>
        `,
      },
    ],
  },
]
