import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  articleAuthor?: string
  articlePublishedTime?: string
  schemas?: object[]
  noindex?: boolean
}

const SITE_URL = 'https://www.amelieferrizpsychanalyste.fr'
const SITE_NAME = 'Amélie Ferriz — Psychanalyste à Narbonne'
const DEFAULT_DESCRIPTION = 'Psychanalyste à Narbonne. Psychanalyse, psychothérapie, thérapie de couple, suivi enfants et adolescents, groupes de parole professionnels. Cabinet au 19 rue de Londres, 11100 Narbonne.'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`
const TWITTER_HANDLE = '@amelieferriz'   // ← à compléter si compte Twitter/X

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  articleAuthor,
  articlePublishedTime,
  schemas = [],
  noindex = false,
}: SEOProps) {
  const fullTitle = title ? `${title} — Amélie Ferriz` : SITE_NAME
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  useEffect(() => {
    // ── Title ──────────────────────────────────────────────────────────────
    document.title = fullTitle

    const set = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null
      if (!el) {
        if (selector.startsWith('link')) {
          el = document.createElement('link')
        } else {
          el = document.createElement('meta')
        }
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }

    const meta = (nameOrProp: string, content: string, useProperty = false) => {
      const attr = useProperty ? 'property' : 'name'
      const selector = useProperty
        ? `meta[property="${nameOrProp}"]`
        : `meta[name="${nameOrProp}"]`
      set(selector, 'content', content)
      const el = document.querySelector(selector) as HTMLMetaElement
      if (el) el.setAttribute(attr, nameOrProp)
    }

    // ── Base SEO ───────────────────────────────────────────────────────────
    meta('description', description)
    meta('robots', noindex ? 'noindex,nofollow' : 'index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1')
    meta('author', 'Amélie Ferriz')
    meta('geo.region', 'FR-OCC')
    meta('geo.placename', 'Narbonne')
    meta('language', 'fr')

    // ── Canonical ─────────────────────────────────────────────────────────
    let linkCanon = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!linkCanon) { linkCanon = document.createElement('link'); document.head.appendChild(linkCanon) }
    linkCanon.rel = 'canonical'
    linkCanon.href = canonicalUrl

    // ── Open Graph ────────────────────────────────────────────────────────
    meta('og:type', ogType, true)
    meta('og:url', canonicalUrl, true)
    meta('og:title', fullTitle, true)
    meta('og:description', description, true)
    meta('og:image', ogImage, true)
    meta('og:image:width', '1200', true)
    meta('og:image:height', '630', true)
    meta('og:image:alt', fullTitle, true)
    meta('og:site_name', SITE_NAME, true)
    meta('og:locale', 'fr_FR', true)

    if (ogType === 'article') {
      if (articleAuthor) meta('article:author', articleAuthor, true)
      if (articlePublishedTime) meta('article:published_time', articlePublishedTime, true)
      meta('article:section', 'Psychologie', true)
    }

    // ── Twitter / X Card ──────────────────────────────────────────────────
    meta('twitter:card', 'summary_large_image')
    meta('twitter:site', TWITTER_HANDLE)
    meta('twitter:creator', TWITTER_HANDLE)
    meta('twitter:title', fullTitle)
    meta('twitter:description', description)
    meta('twitter:image', ogImage)
    meta('twitter:image:alt', fullTitle)

    // ── Schema.org JSON-LD ────────────────────────────────────────────────
    // Supprime les anciens scripts schema injectés par ce composant
    document.querySelectorAll('script[data-seo="schema"]').forEach(el => el.remove())
    schemas.forEach(schema => {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-seo', 'schema')
      script.textContent = JSON.stringify(schema)
      document.head.appendChild(script)
    })
  }, [fullTitle, description, canonicalUrl, ogImage, ogType, noindex, schemas])

  return null
}
