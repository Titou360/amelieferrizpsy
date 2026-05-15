export interface Therapy {
  slug: string;
  title: string;
  shortTitle: string;
  color: "navy" | "orange" | "sage";
  image: string;
  description: string;
  content: string;
}

export const therapies: Therapy[] = [
  {
    slug: "psychanalyse",
    title: "La psychanalyse",
    shortTitle: "La psychanalyse",
    color: "orange",
    image: "/photo-psychanalyse.jpg",
    description:
      "Une écoute analytique pour explorer l'inconscient et trouver votre chemin intérieur.",
    content: `
    <h2>Le Principe de la psychanalyse</h2><br/>
    <p>Plusieurs raisons peuvent vous amenez à consulter :</p>
    <ul><li>Souffrance psychique</li>
    <li>Problèmes qui semblent insurmontables</li>
    <li>Phobies</li>
    <li>Dépression</li>
    <li>Angoisses face à la vie, à l’avenir, à la question de la mort</li>
    <li>Échecs récurrents, refaire les mêmes erreurs sans avancer dans sa vie.</li>
    <li>Mal être plus ou moins profond</li>
    <li>Avoir tout sans par venir au bonheur</li>
    <li>Modifications de l’humeur, pensées répétitives ou négatives</li>
    <li>Migraines, psoriasis, maux de ventre, asthme, insomnies, ou autres symptômes que la médecine traditionnelle ne parvient pas à solutionner (maladies psychosomatiques)</li></ul>
<p>Ou tout simplement :</p>
<ul><li>Vouloir apprendre à se connaître dans son entièreté</li>
<li>Découvrir son Moi profond</li>
<li>Interprétation des rêves (voie royale vers l’inconscient (S. Freud))</li></ul>
<p>Cette thérapie vise à libérer le patient de l’emprise de son inconscient qui agit en lui comme un sujet autonome et influence largement ses choix, actes, paroles. Le patient ainsi libéré ne subit plus et redevient maître de ses choix. Il est libéré de ses angoisses et peut continuer à avancer dans sa vie.</p><br/>
<p>La psychanalyse contribue à traiter des problèmes psychologiques, ayant leur source dans l’enfance, par la verbalisation,la parole et la technique dite de la « libre association » (accepter de dire tout ce qu’il vient à l’esprit).</p> <br/>
<h2>Déroulement</h2>
<p>Le cadre est précis : le patient est allongé sur un divan, tournant le dos au psychanalyste, laissant libre cours à ses pensées. Le lâcher prise est ainsi plus facile que lors d’un face à face.</p>
<p>La psychanalyse est l’archéologie de l’inconscient.</p>
<p>Le patient travaille sur lui même, l’analyste l’accompagne dans son histoire, son passé, son présent et le futur à venir. Le thérapeute a un rôle d’écoute neutre et bienveillante, ponctuation d’analyses.</p>
<p>Cette thérapie ne peut être nette et rapide, le travail dépend de l’investissement sincère personnel du patient et peut être plus ou moins long suivant ce patient.</p>
<p>Les séances durent 45 minutes en raison de 1 à 3 fois par semaine jusqu’à 1 séance tous les 15 jours suivant la profondeur du mal être ou suivant la demande du patient.</p>
<br/>
<ul>
  <li>50 € par séance de 45 minutes</li>
  <li>100 € pour une séance de 1 heure et 30 minutes</li>
</ul>`,
  },
  {
    slug: "enfants-adolescents",
    title: "Enfants & Adolescent·es",
    shortTitle: "Enfants & Ados",
    color: "sage",
    image: "/photo-enfants-ados.jpg",
    description:
      "Un accompagnement adapté pour les plus jeunes, dans un cadre sécurisant et bienveillant.",
    content: `<h2>Pourquoi consulter pour un enfant ou un adolescent ?</h2><br/>
    <p>Certaines situations peuvent déclencher une souffrance chez l’enfant (situation familiale ou scolaire difficile, séparation, maladie, évènements traumatisants, harcèlement scolaire par exemple). Les symptômes de cette souffrance psychologique sont multiples, ils peuvent se traduire par :</p><br/>
    <ul><h3>Chez l'enfant :</h3>
    <li>Une baisse des résultats scolaires</li>
    <li>Un mal être général, une régression</li>
    <li>Des troubles du sommeil et de l’appétit, manque de concentration</li>
    <li>Des pulsions agressives, des colères répétées, des caprices</li>
    </ul>
    <ul><h3>Chez l'adolescent :</h3>
    <li>Un mal être général, une régression</li>
    <li>Des troubles du sommeil et de l’appétit, manque de concentration</li>
    <li>Des pulsions agressives, des colères répétées, des caprices</li>
    <li>Une consommation de substances toxiques (alcool, drogue)</li>
    <li>Un repli sur soi, un isolement social</li>
    <li>Des troubles du comportement alimentaire (anorexie, boulimie)</li>
    </ul>
    <p>Chaque situation peut être apaisée, en collaboration avec le ou les  parents pour les plus jeunes (et l’équipe soignante si tel est le cas).</p>
    <h2>Déroulement</h2><br/>
    <p>La méthode utilisée peut être la verbalisation quand elle est possible avec une écoute bienveillante et neutre, mais aussi le dessin, le jeu, qui permettent d’expliquer l’inexplicable quand les mots manquent, pour les plus jeunes.</p>
    <p>Il s’agira dans un 1er temps d’installer un climat de confiance entre l’enfant ou l’adolescent, le thérapeute, et les parents ou éducateurs. Il est indispensable que le jeune patient se sente à l’aise.</p>
    <p>Quand les choses sont posées, le soulagement est presque immédiat, il s’agira ensuite de l’aider à s’exprimer sur ce qu’il ressent, ce qu’il pense et sur son environnement et l’aider à avancer avec assurance et confiance envers la vie et les adultes, sans jamais écarter son environnement familial.</p>
    <p>La durée de la séance sera adaptée à chaque enfant.</p>
    <p>La thérapie peut être courte à moyenne. Souvent peu de séances suffisent à régler une situation.
    <br/>
<ul>
  <li>50 € par séance de 45 minutes</li>
  <li>100 € pour une séance de 1 heure et 30 minutes</li>
</ul>
    `,
  },
  {
    slug: "therapie-couple-familiale",
    title: "Thérapie de couple & familiale",
    shortTitle: "Couple & Famille",
    color: "orange",
    image: "/photo-couple-famille.jpg",
    description:
      "Retrouver le dialogue et reconstruire des liens dans un cadre neutre et professionnel.",
    content: `<h2>Pourquoi consulter pour une thérapie de couple ou familiale ?</h2><br/>
    <p>La thérapie s’adresse aux couples ou aux personnes d’une même famille, traversant une période de questionnement, une crise passagère ou ayant laissé s’installer une routine.
Chacun pourra s’exprimer à tour de rôle, en posant des mots sur ce qu’il ressent et ses perceptions de la vie.
La thérapie permettra de lever des blocages, des non dits, pourra réinstaurer une communication.
Chacun pourra se retrouver dans la relation, sans une sensation de vie parallèle, où plus rien n’est partagé.</p><br/>
<h2>Déroulement</h2>
<p>Dans une écoute et un accompagnement bienveillant et sans jugement, le thérapeute travaillera avec chacune des personnes tour à tour mais en présence de tous les acteurs.
<p>Avant tout, chaque personne est reconnue individuellement, pour pouvoir définir sa place au sein du couple ou de la famille</p>
<p>La durée de la séance est en général de 75 minutes, mais peut être adaptée à chaque situation.
L’objectif sera de retrouver un équilibre, où chacun se reconnaîtra individuellement dans la relation de couple ou de famille (parent/enfant, parent/adolescent, fratrie, etc…), et ainsi apaiser les tensions, permettant ainsi de se projeter et avancer dans la vie sereinement.</p>
<ul>
  <li>70 € par séance de 1 heure 15 minutes</li>
</ul>
`,
  },
  {
    slug: "psychotherapie",
    title:
      "Psychothérapie analytique · Psychothérapie de soutien · Thérapie brève",
    shortTitle: "Psychothérapies",
    color: "navy",
    image: "/photo-psychotherapie.jpg",
    description:
      "Des approches complémentaires pour répondre à des besoins variés, à court ou long terme.",
    content: `<h2>Principe de la Psychothérapie analytique</h2><br/>
    <p>C’est une thérapie de courte durée, qui permet de trouver un soulagement, un accompagnement face à une épreuve actuelle, comme :</p>
    <ul>
    <li>une séparation</li>
    <li>un deuil</li>
    <li>un licenciement</li>
    <li>un évènement qui vient bouleverser l’équilibre psychique.</li>
    </ul>
    <br/>
<p>Elle traite des symptômes comme
<ul><li>l’anxiété ou l’angoisse</li><li>le mal être face à une situation ou une personne</li><li>un manque de confiance en soi>/li><li>des troubles du comportement (alimentaire par exemple..).</li><br/>
<p>C’est un accompagnement psychologique, qui aide à faire face à une situation, en renforçant les capacités d’adaptation du patient.</p><br/>
<p>Elle permet de faire le point sur sa vie, de retrouver confiance en soi, une meilleure estime de soi, mettre de l’ordre dans sa vie et ses pensées, retrouver un équilibre émotionnel et relationnel antérieur.</p><br/>
<h2>Déroulement</h2>
<p>C’est une thérapie de durée courte ou moyenne reprenant les techniques de la psychanalyse, par la verbalisation et la libre association d’idées, mais reste plus en « surface » que la psychanalyse.</p>
<p>Elle se déroule en face à face, dans un climat neutre et bienveillant et est une alternative au divan, qui peut être déstabilisant pour certaines personnes.</p>
<p>Elle peut déboucher sur une analyse plus longue si le patient le souhaite.</p><br/>
<ul>
  <li>50 € par séance de 45 minutes</li>
</ul>
`,
  },
  {
    slug: "groupe-de-parole",
    title: "Groupe de parole, professionnels",
    shortTitle: "Groupe de parole",
    color: "sage",
    image: "/photo-groupe-parole.jpg",
    description:
      "Des espaces collectifs pour partager, s'écouter et grandir ensemble dans un cadre professionnel.",
    content: `<p>Il s’agit d’une thérapie de groupe basée sur la parole et la libre expression. Elle permet à des personnes de se regrouper autour d’une problématique commune.</p>
<p>L’idée est donc de pouvoir partager expériences, chacun s’exprimant sur ses angoisses et ses souffrances, et apprenant aussi de l’expérience des autres.
Cela permet à chacun d'être authentique, sans crainte du jugement.</p>
<p>Elle permet entre autres de mobiliser les ressources nécessaires pour affronter la réalité. Par ailleurs, le fait de constater que d’autres vivent les mêmes difficultés et souffrances que soi permet aussi de relativiser ses propres problèmes.</p>
<p>C’est une approche thérapeutique qui permet aussi de réduire l’isolement social. Le thérapeute est ici un accompagnant qui permet la bonne communication et apaise les tensions.</p>
<p>En synthèse, le groupe de parole permet à chacun de devenir acteur de son changement, stimulé par la solidarité et la créativité que génère le groupe.</p>
<ul>
  <li>Tarif de séance sur devis</li>
</ul>`,
  },
];
