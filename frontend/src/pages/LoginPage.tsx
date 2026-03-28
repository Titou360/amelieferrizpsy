import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(password)
      navigate('/dashboard')
    } catch {
      setError('Mot de passe incorrect.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle, #E05C2A 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative w-full max-w-sm"
      >
        <div className="text-center mb-10">
          <p className="font-serif text-3xl text-cream mb-1">Amélie Ferriz</p>
          <p className="text-xs font-sans text-cream/40 tracking-[0.3em] uppercase">Espace privé</p>
        </div>

        <div className="bg-white/5 border border-cream/10 p-8">
          <div className="flex items-center justify-center w-12 h-12 bg-orange/20 mx-auto mb-8">
            <Lock size={20} className="text-orange" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-sans text-cream/50 uppercase tracking-widest mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/10 border border-cream/10 px-4 py-3 text-sm font-sans text-cream placeholder-cream/20 focus:outline-none focus:border-orange transition-colors pr-10"
                  placeholder="••••••••••••"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-cream/30 hover:text-cream/60 transition-colors"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-orange text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full btn-primary py-3 text-xs tracking-widest uppercase disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={14} className="animate-spin" /> Connexion...
                </span>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs text-cream/20 font-sans">
          Espace réservé à l'administration du site
        </p>
      </motion.div>
    </div>
  )
}
