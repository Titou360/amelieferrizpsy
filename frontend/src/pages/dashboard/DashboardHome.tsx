import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, FileText, MessageSquare, ArrowRight } from 'lucide-react'
import api from '../../lib/api'

export default function DashboardHome() {
  const [stats, setStats] = useState({ reviews: 0, articles: 0 })

  useEffect(() => {
    Promise.all([
      api.get('/reviews').then((r) => r.data.length).catch(() => 0),
      api.get('/articles').then((r) => r.data.length).catch(() => 0),
    ]).then(([reviews, articles]) => setStats({ reviews, articles }))
  }, [])

  const cards = [
    {
      label: 'Avis patients',
      value: stats.reviews,
      icon: Star,
      href: '/dashboard/avis',
      desc: 'Gérer les avis Google, LinkedIn et Facebook',
      color: 'bg-orange/10 text-orange',
    },
    {
      label: 'Articles publiés',
      value: stats.articles,
      icon: FileText,
      href: '/dashboard/articles',
      desc: 'Rédiger et gérer vos articles de blog',
      color: 'bg-navy/10 text-navy',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-navy">Bonjour, Amélie 👋</h1>
        <p className="font-sans text-sm text-navy/50 mt-1">
          Bienvenue dans votre espace d'administration.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.label}
              to={card.href}
              className="bg-white border border-navy/8 p-6 flex items-start gap-5 hover:border-orange/30 hover:shadow-sm transition-all duration-200 group"
            >
              <div className={`w-12 h-12 flex items-center justify-center shrink-0 ${card.color}`}>
                <Icon size={22} />
              </div>
              <div className="flex-1">
                <p className="font-sans text-2xl font-medium text-navy">{card.value}</p>
                <p className="font-sans text-sm font-medium text-navy/70">{card.label}</p>
                <p className="font-sans text-xs text-navy/40 mt-1 leading-relaxed">{card.desc}</p>
              </div>
              <ArrowRight size={16} className="text-navy/20 group-hover:text-orange transition-colors mt-1" />
            </Link>
          )
        })}
      </div>

      {/* Quick actions */}
      <div className="bg-white border border-navy/8 p-6">
        <p className="font-sans text-sm font-medium text-navy/60 uppercase tracking-widest mb-4">
          Actions rapides
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/dashboard/avis" className="btn-primary text-xs tracking-widest uppercase px-6 py-2.5">
            + Ajouter un avis
          </Link>
          <Link to="/dashboard/articles/nouveau" className="btn-outline text-xs tracking-widest uppercase px-6 py-2.5">
            + Nouvel article
          </Link>
        </div>
      </div>
    </div>
  )
}
