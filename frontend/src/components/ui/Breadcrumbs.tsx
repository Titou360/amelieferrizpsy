import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

interface Crumb {
  label: string
  href?: string
}

interface Props {
  crumbs: Crumb[]
  light?: boolean
}

export default function Breadcrumbs({ crumbs, light = false }: Props) {
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
