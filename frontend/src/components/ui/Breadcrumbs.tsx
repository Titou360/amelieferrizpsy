import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const SITE_URL = 'https://www.amelieferrizpsychanalyste.fr'

interface Crumb {
  label: string
  href?: string
}

interface Props {
  crumbs: Crumb[]
  light?: boolean
}

export default function Breadcrumbs({ crumbs, light = false }: Props) {
  useEffect(() => {
    const allItems = [
      { label: 'Accueil', href: '/' },
      ...crumbs,
    ]
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: allItems.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: crumb.label,
        ...(crumb.href ? { item: `${SITE_URL}${crumb.href}` } : {}),
      })),
    }
    let script = document.querySelector('script[data-breadcrumb]') as HTMLScriptElement | null
    if (!script) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.setAttribute('data-breadcrumb', 'true')
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(schema)
    return () => { script?.remove() }
  }, [crumbs])

  const color = light ? 'text-cream/60' : 'text-navy/40'
  const activeColor = light ? 'text-cream/90' : 'text-navy'
  const hoverColor = light ? 'hover:text-cream' : 'hover:text-orange'

  return (
    <nav aria-label="Fil d'Ariane" className={`flex items-center gap-1 text-xs font-sans ${color}`}>
      <Link to="/" className={`${hoverColor} transition-colors flex items-center gap-1`}>
        <Home size={12} />
        <span>Accueil</span>
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={12} />
          {crumb.href ? (
            <Link to={crumb.href} className={`${hoverColor} transition-colors`}>
              {crumb.label}
            </Link>
          ) : (
            <span className={activeColor}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
