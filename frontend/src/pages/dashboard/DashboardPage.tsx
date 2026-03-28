import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LayoutDashboard, Star, FileText, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import DashboardHome from './DashboardHome'
import ReviewsManager from './ReviewsManager'
import ArticlesManager from './ArticlesManager'
import ArticleEditor from './ArticleEditor'

const navItems = [
  { label: 'Tableau de bord', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Avis patients', href: '/dashboard/avis', icon: Star },
  { label: 'Articles', href: '/dashboard/articles', icon: FileText },
]

// Icon legend for dashboard actions
const ICON_LEGEND = [
  { icon: '✏️', label: 'Modifier' },
  { icon: '🗑️', label: 'Supprimer' },
  { icon: '👁️', label: 'Voir' },
  { icon: '✅', label: 'Publier / Activer' },
]

export default function DashboardPage() {
  const { logout } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F4F2EE] flex">
      {/* Sidebar */}
      <>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed top-0 left-0 h-full w-64 bg-navy z-40 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Brand */}
          <div className="px-6 py-8 border-b border-cream/10">
            <p className="font-serif text-xl text-cream">Amélie Ferriz</p>
            <p className="text-xs font-sans text-cream/40 tracking-widest uppercase mt-0.5">
              Administration
            </p>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-3 py-6 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = location.pathname === item.href || (item.href !== '/dashboard' && location.pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-sans transition-all duration-200 ${
                    active
                      ? 'bg-orange text-white'
                      : 'text-cream/60 hover:text-cream hover:bg-white/5'
                  }`}
                >
                  <Icon size={17} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Icon legend */}
          <div className="px-5 py-4 border-t border-cream/10">
            <p className="text-xs font-sans text-cream/30 uppercase tracking-widest mb-3">
              Légende des icônes
            </p>
            <div className="space-y-1.5">
              {ICON_LEGEND.map((l) => (
                <div key={l.label} className="flex items-center gap-2 text-xs font-sans text-cream/50">
                  <span>{l.icon}</span>
                  <span>{l.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="px-3 py-4 border-t border-cream/10">
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 w-full text-sm font-sans text-cream/40 hover:text-cream hover:bg-white/5 transition-colors"
            >
              <LogOut size={17} />
              Déconnexion
            </button>
          </div>
        </aside>
      </>

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="bg-white border-b border-navy/8 px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden text-navy/60 hover:text-navy"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <Menu size={22} />
          </button>
          <p className="font-sans text-sm text-navy/40">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto text-xs font-sans text-navy/40 hover:text-orange transition-colors tracking-wide"
          >
            Voir le site →
          </a>
        </header>

        <main className="p-6 lg:p-8">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="avis" element={<ReviewsManager />} />
            <Route path="articles" element={<ArticlesManager />} />
            <Route path="articles/nouveau" element={<ArticleEditor />} />
            <Route path="articles/:id" element={<ArticleEditor />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
