import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
import { FileText, Pencil, Trash2, Plus, Eye, Loader2, X } from 'lucide-react'
import api from '../../lib/api'
import { useToast } from '../../components/ui/ToastProvider'

interface Article {
  _id: string
  title: string
  slug: string
  excerpt: string
  publishedAt: string
  category?: string
  published: boolean
}

function DeleteConfirmModal({
  open,
  onConfirm,
  onCancel,
  loading,
  title,
}: {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
  title: string
}) {
  const [typed, setTyped] = useState('')
  const PHRASE = 'Je supprime cet article'

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onCancel()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50" />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-8 w-full max-w-md"
              >
                <Dialog.Title className="font-serif text-2xl text-navy mb-2">
                  Supprimer l'article
                </Dialog.Title>
                <p className="text-sm font-sans text-navy/60 mb-6">
                  Vous allez supprimer <strong>"{title}"</strong>. Cette action est définitive.
                  <br /><br />
                  Pour confirmer, tapez :{' '}
                  <span className="font-mono text-orange bg-orange/10 px-1">{PHRASE}</span>
                </p>
                <input
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  className="w-full border border-navy/20 px-4 py-2.5 text-sm font-mono mb-6 focus:outline-none focus:border-orange"
                  placeholder={PHRASE}
                />
                <div className="flex gap-3">
                  <button onClick={onCancel} className="btn-outline flex-1 text-xs tracking-widest uppercase py-2.5">Annuler</button>
                  <button
                    onClick={onConfirm}
                    disabled={typed !== PHRASE || loading}
                    className="btn-primary flex-1 text-xs tracking-widest uppercase py-2.5 disabled:opacity-40"
                  >
                    {loading ? <Loader2 size={14} className="animate-spin" /> : 'Supprimer'}
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

export default function ArticlesManager() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteTarget, setDeleteTarget] = useState<Article | null>(null)
  const [deleting, setDeleting] = useState(false)
  const { toast } = useToast()

  const fetchArticles = async () => {
    try {
      const res = await api.get('/articles?all=true')
      setArticles(res.data)
    } catch {
      toast({ type: 'error', title: 'Erreur de chargement' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchArticles() }, [])

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await api.delete(`/articles/${deleteTarget._id}`)
      toast({ type: 'success', title: 'Article supprimé' })
      setDeleteTarget(null)
      fetchArticles()
    } catch {
      toast({ type: 'error', title: 'Erreur lors de la suppression' })
    } finally {
      setDeleting(false)
    }
  }

  const togglePublish = async (a: Article) => {
    try {
      await api.put(`/articles/${a._id}`, { published: !a.published })
      toast({ type: 'success', title: a.published ? 'Article dépublié' : 'Article publié' })
      fetchArticles()
    } catch {
      toast({ type: 'error', title: 'Erreur' })
    }
  }

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-navy">Articles</h1>
            <p className="font-sans text-sm text-navy/50 mt-1">
              Rédigez et publiez vos articles. Ils sont signés automatiquement en votre nom.
            </p>
          </div>
          <Link to="/dashboard/articles/nouveau" className="btn-primary text-xs tracking-widest uppercase px-6 py-2.5 flex items-center gap-2">
            <Plus size={15} /> Nouvel article
          </Link>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2].map((i) => <div key={i} className="h-20 bg-white animate-pulse border border-navy/8" />)}
          </div>
        ) : articles.length === 0 ? (
          <div className="bg-white border border-navy/8 p-12 text-center">
            <FileText size={36} className="text-navy/15 mx-auto mb-4" />
            <p className="font-sans text-navy/40 text-sm">Aucun article rédigé pour le moment.</p>
            <Link to="/dashboard/articles/nouveau" className="btn-primary text-xs tracking-widest uppercase px-8 py-2.5 mt-6 inline-block">
              Rédiger le premier article
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {articles.map((a) => (
              <div key={a._id} className="bg-white border border-navy/8 p-5 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-sans text-sm font-medium text-navy">{a.title}</span>
                    <span className={`text-xs px-2 py-0.5 font-sans ${a.published ? 'bg-sage/20 text-sage-dark' : 'bg-navy/10 text-navy/50'}`}>
                      {a.published ? 'Publié' : 'Brouillon'}
                    </span>
                    {a.category && (
                      <span className="text-xs font-sans text-navy/40 bg-navy/5 px-2 py-0.5">{a.category}</span>
                    )}
                  </div>
                  <p className="text-sm font-sans text-navy/50 line-clamp-1">{a.excerpt}</p>
                  <p className="text-xs text-navy/30 mt-1.5">
                    {new Date(a.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <a href={`/article/${a.slug}`} target="_blank" rel="noopener noreferrer"
                        className="p-2 text-navy/30 hover:text-navy transition-colors">
                        <Eye size={15} />
                      </a>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="bg-navy text-cream text-xs px-2 py-1 z-50" sideOffset={4}>Voir sur le site</Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <Link to={`/dashboard/articles/${a._id}`} className="p-2 text-navy/30 hover:text-navy transition-colors">
                        <Pencil size={15} />
                      </Link>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="bg-navy text-cream text-xs px-2 py-1 z-50" sideOffset={4}>Modifier</Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button onClick={() => setDeleteTarget(a)} className="p-2 text-navy/30 hover:text-orange transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="bg-navy text-cream text-xs px-2 py-1 z-50" sideOffset={4}>Supprimer</Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
              </div>
            ))}
          </div>
        )}

        {deleteTarget && (
          <DeleteConfirmModal
            open={!!deleteTarget}
            title={deleteTarget.title}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            loading={deleting}
          />
        )}
      </div>
    </Tooltip.Provider>
  )
}
