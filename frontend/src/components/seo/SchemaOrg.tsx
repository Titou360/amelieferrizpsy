/**
 * Schema.org JSON-LD — Amélie Ferriz, Psychanalyste
 * À injecter dans <head> via le composant <SEO> sur chaque page.
 *
 * ⚠️  Compléter :
 *   - telephone : numéro exact
 *   - openingHoursSpecification : horaires réels
 *   - geo.latitude / geo.longitude : coordonnées GPS exactes du cabinet
 *   - sameAs : URLs des profils sociaux réels
 */

export const schemaOrg = {
  // ─── Fiche établissement (LocalBusiness) ───────────────────────────────────
  localBusiness: {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "MedicalBusiness", "Psychologist"],
    "@id": "https://www.amelieferrizpsychanalyste.fr/#business",
    "name": "Amélie Ferriz — Psychanalyste",
    "legalName": "Amélie Ferriz",
    "description": "Psychanalyste à Narbonne. Accompagnement en psychanalyse, psychothérapie analytique, psychothérapie de soutien, thérapie brève, thérapie de couple et familiale, suivi enfants et adolescents, groupes de parole professionnels.",
    "url": "https://www.amelieferrizpsychanalyste.fr",
    "telephone": "+33600000000",          // ← à compléter
    "email": "contact@amelieferriz.fr",
    "image": "https://www.amelieferrizpsychanalyste.fr/og-image.jpg",
    "logo": "https://www.amelieferrizpsychanalyste.fr/logo-amelie-ferriz-psychanalyste.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "19 rue de Londres",
      "addressLocality": "Narbonne",
      "postalCode": "11100",
      "addressCountry": "FR",
      "addressRegion": "Occitanie"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.1844,               // ← à affiner
      "longitude": 3.0032                // ← à affiner
    },
    "openingHoursSpecification": [       // ← à compléter avec les vrais horaires
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "priceRange": "€€",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Espèces, virement bancaire",
    "areaServed": {
      "@type": "City",
      "name": "Narbonne"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Thérapies proposées",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Psychanalyse" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Psychothérapie analytique" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Psychothérapie de soutien" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Thérapie brève" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Thérapie de couple et familiale" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Suivi enfants et adolescents" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Groupe de parole professionnels" } }
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/in/amelie-ferriz",   // ← à compléter
      "https://www.facebook.com/amelieferriz",        // ← à compléter
      "https://www.instagram.com/amelieferriz"        // ← à compléter
    ]
  },

  // ─── Personne (Person) ────────────────────────────────────────────────────
  person: {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://www.amelieferrizpsychanalyste.fr/#person",
    "name": "Amélie Ferriz",
    "jobTitle": "Psychanalyste",
    "worksFor": { "@id": "https://www.amelieferrizpsychanalyste.fr/#business" },
    "url": "https://www.amelieferrizpsychanalyste.fr",
    "image": "https://www.amelieferrizpsychanalyste.fr/avatar-amelie.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Narbonne",
      "postalCode": "11100",
      "addressCountry": "FR"
    },
    "knowsAbout": [
      "Psychanalyse", "Psychothérapie", "Santé mentale",
      "Thérapie de couple", "Psychologie de l'enfant et de l'adolescent",
      "Groupes de parole", "Thérapie brève"
    ]
  },

  // ─── Site web (WebSite) — active la SearchBox Google ─────────────────────
  website: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.amelieferrizpsychanalyste.fr/#website",
    "url": "https://www.amelieferrizpsychanalyste.fr",
    "name": "Amélie Ferriz — Psychanalyste à Narbonne",
    "inLanguage": "fr-FR",
    "publisher": { "@id": "https://www.amelieferrizpsychanalyste.fr/#person" }
  },

  // ─── BreadcrumbList (générique, à surcharger par page) ───────────────────
  breadcrumbHome: {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://www.amelieferrizpsychanalyste.fr"
      }
    ]
  },

  // ─── Sitelinks navigation (suggère à Google les sections du site) ─────────
  // Google affiche automatiquement des liens de navigation sous le résultat
  // principal quand il détecte une structure SiteNavigationElement claire.
  siteNavigation: {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Navigation principale",
    "itemListElement": [
      {
        "@type": "SiteLinksSearchBox",
        "target": [
          {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.amelieferrizpsychanalyste.fr/?q={search_term_string}"
          }
        ],
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.amelieferrizpsychanalyste.fr/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ]
  },

  // ─── SiteNavigationElement — les 4 liens à suggérer à Google ─────────────
  siteLinks: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://www.amelieferrizpsychanalyste.fr/#webpage",
    "url": "https://www.amelieferrizpsychanalyste.fr",
    "name": "Amélie Ferriz — Psychanalyste à Narbonne",
    "description": "Psychanalyste à Narbonne — Psychanalyse, psychothérapie, thérapie de couple, enfants & adolescents.",
    "breadcrumb": { "@id": "https://www.amelieferrizpsychanalyste.fr/#breadcrumb" },
    "significantLink": [
      "https://www.amelieferrizpsychanalyste.fr/#hero",
      "https://www.amelieferrizpsychanalyste.fr/#accompagnement",
      "https://www.amelieferrizpsychanalyste.fr/#consultations",
      "https://www.amelieferrizpsychanalyste.fr/#contact"
    ],
    "hasPart": [
      {
        "@type": "WebPageElement",
        "@id": "https://www.amelieferrizpsychanalyste.fr/#apropos",
        "name": "À propos",
        "description": "Découvrez Amélie Ferriz, psychanalyste à Narbonne.",
        "url": "https://www.amelieferrizpsychanalyste.fr/#hero"
      },
      {
        "@type": "WebPageElement",
        "@id": "https://www.amelieferrizpsychanalyste.fr/#therapies",
        "name": "Thérapies pratiquées",
        "description": "Psychanalyse, psychothérapie, thérapie de couple, enfants et adolescents, groupes de parole.",
        "url": "https://www.amelieferrizpsychanalyste.fr/#accompagnement"
      },
      {
        "@type": "WebPageElement",
        "@id": "https://www.amelieferrizpsychanalyste.fr/#consultation",
        "name": "Consultation",
        "description": "Au cabinet à Narbonne, à domicile ou en téléconsultation.",
        "url": "https://www.amelieferrizpsychanalyste.fr/#consultations"
      },
      {
        "@type": "WebPageElement",
        "@id": "https://www.amelieferrizpsychanalyste.fr/#contact-section",
        "name": "Contact",
        "description": "Prendre rendez-vous avec Amélie Ferriz, psychanalyste à Narbonne.",
        "url": "https://www.amelieferrizpsychanalyste.fr/#contact"
      }
    ]
  }
}

// Helper pour injecter plusieurs schemas en une fois
export function buildSchemaScript(schemas: object[]): string {
  return schemas.map(s => JSON.stringify(s)).join('\n')
}
