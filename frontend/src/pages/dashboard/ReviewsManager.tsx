import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import * as Tooltip from '@radix-ui/react-tooltip'
import { useForm } from 'react-hook-form'
import { Star, Pencil, Trash2, Plus, X, Loader2, Eye } from 'lucide-react'
import api from '../../lib/api'
import { useToast } from '../../components/ui/ToastProvider'

interface Review {
  _id: string
  author: string
  platform: 'google' | 'linkedin' | 'facebook' | 'other'
  rating: number
  content: string
  date: string
  profileUrl?: string
}

type FormData = Omit<Review, '_id'>

const platforms = ['google', 'linkedin', 'facebook', 'other'] as const

const platformLabels = {
  google: 'Google',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  other: 'Autre',
}

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          className="focus:outline-none"
        >
          <Star size={20} className={i <= value ? 'text-orange fill-orange' : 'text-navy/20'} />
        </button>
      ))}
    </div>
  )
}

function DeleteConfirmModal({
  open,
  onConfirm,
  onCancel,
  loading,
  authorName,
}: {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  loading: boolean
  authorName: string
}) {
  const [typed, setTyped] = useState('')
  const PHRASE = 'Je supprime cet avis'

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onCancel()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-50"
              />
            </Dialog.Overlay>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 w-full max-w-md pointer-events-auto shadow-2xl"
              >
                <Dialog.Title className="font-serif text-2xl text-navy mb-2">
                  Confirmer la suppression
                </Dialog.Title>
                <p className="text-sm font-sans text-navy/60 mb-6">
                  Vous allez supprimer l'avis de <strong>{authorName}</strong>. Cette action est irréversible.
                  <br /><br />
                  Pour confirmer, tapez exactement :{' '}
                  <span className="font-mono text-orange bg-orange/10 px-1 rounded">{PHRASE}</span>
                </p>
                <input
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  className="w-full border border-navy/20 px-4 py-2.5 text-sm font-mono mb-6 focus:outline-none focus:border-orange"
                  placeholder={PHRASE}
                />
                <div className="flex gap-3">
                  <button onClick={onCancel} className="btn-outline flex-1 text-xs tracking-widest uppercase py-2.5">
                    Annuler
                  </button>
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
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Review | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [rating, setRating] = useState(5)
  const { toast } = useToast()

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const fetchReviews = async () => {
    try {
      const res = await api.get('/reviews?all=true')
      setReviews(res.data)
    } catch {
      toast({ type: 'error', title: 'Erreur de chargement' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchReviews() }, [])

  const openCreate = () => {
    setEditing(null)
    setRating(5)
    reset({ platform: 'google', date: new Date().toISOString().split('T')[0] })
    setFormOpen(true)
  }

  const openEdit = (r: Review) => {
    setEditing(r)
    setRating(r.rating)
    reset({ author: r.author, platform: r.platform, content: r.content, date: r.date.split('T')[0], profileUrl: r.profileUrl })
    setFormOpen(true)
  }

  const onSubmit = async (data: FormData) => {
    setSaving(true)
    try {
      if (editing) {
        await api.put(`/reviews/${editing._id}`, { ...data, rating })
        toast({ type: 'success', title: 'Avis modifié' })
      } else {
        await api.post('/reviews', { ...data, rating })
        toast({ type: 'success', title: 'Avis ajouté', description: 'Il est maintenant visible sur le site.' })
      }
      setFormOpen(false)
      fetchReviews()
    } catch {
      toast({ type: 'error', title: 'Erreur lors de la sauvegarde' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeleting(true)
    try {
      await api.delete(`/reviews/${deleteTarget._id}`)
      toast({ type: 'success', title: 'Avis supprimé' })
      setDeleteTarget(null)
      fetchReviews()
    } catch {
      toast({ type: 'error', title: 'Erreur lors de la suppression' })
    } finally {
      setDeleting(false)
    }
  }

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-serif text-3xl text-navy">Avis patients</h1>
            <p className="font-sans text-sm text-navy/50 mt-1">
              Collez ici les avis Google, LinkedIn, Facebook de vos patients.
            </p>
          </div>
          <button onClick={openCreate} className="btn-primary text-xs tracking-widest uppercase px-6 py-2.5 flex items-center gap-2">
            <Plus size={15} /> Ajouter un avis
          </button>
        </div>

        {/* Guide */}
        <div className="bg-orange/5 border border-orange/20 p-5">
          <p className="text-xs font-sans text-orange font-medium uppercase tracking-widest mb-2">
            Comment ajouter un avis ?
          </p>
          <ol className="text-sm font-sans text-navy/60 space-y-1 list-decimal pl-4">
            <li>Copiez le nom de l'auteur, le contenu et la date depuis Google, LinkedIn ou Facebook.</li>
            <li>Cliquez sur <strong>Ajouter un avis</strong> et collez les informations dans le formulaire.</li>
            <li>Sélectionnez la source (plateforme) et la note attribuée.</li>
            <li>Validez — l'avis apparaîtra automatiquement sur le site.</li>
          </ol>
        </div>

        {/* List */}
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => <div key={i} className="h-20 bg-white animate-pulse border border-navy/8" />)}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white border border-navy/8 p-12 text-center">
            <Star size={36} className="text-navy/15 mx-auto mb-4" />
            <p className="font-sans text-navy/40 text-sm">Aucun avis pour le moment.</p>
            <button onClick={openCreate} className="btn-primary text-xs tracking-widest uppercase px-8 py-2.5 mt-6">
              Ajouter le premier avis
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {reviews.map((r) => (
              <div key={r._id} className="bg-white border border-navy/8 p-5 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="font-sans text-sm font-medium text-navy">{r.author}</span>
                    <span className="text-xs font-sans text-navy/40 bg-navy/5 px-2 py-0.5">
                      {platformLabels[r.platform]}
                    </span>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < r.rating ? 'text-orange fill-orange' : 'text-navy/15'} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-sans text-navy/60 leading-relaxed line-clamp-2">"{r.content}"</p>
                  <p className="text-xs text-navy/30 mt-2">
                    {new Date(r.date).toLocaleDateString('fr-FR')}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button onClick={() => openEdit(r)} className="p-2 text-navy/30 hover:text-navy transition-colors">
                        <Pencil size={15} />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="bg-navy text-cream text-xs px-2 py-1 z-50" sideOffset={4}>
                        Modifier
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>

                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <button onClick={() => setDeleteTarget(r)} className="p-2 text-navy/30 hover:text-orange transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content className="bg-navy text-cream text-xs px-2 py-1 z-50" sideOffset={4}>
                        Supprimer
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Form Modal */}
        <Dialog.Root open={formOpen} onOpenChange={setFormOpen}>
          <AnimatePresence>
            {formOpen && (
              <Dialog.Portal forceMount>
                <Dialog.Overlay asChild>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 z-50" />
                </Dialog.Overlay>
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <Dialog.Content asChild>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="bg-white p-8 w-full max-w-lg max-h-[90vh] overflow-auto pointer-events-auto shadow-2xl"
                  >
                    <Dialog.Close className="absolute top-4 right-4 text-navy/30 hover:text-navy">
                      <X size={18} />
                    </Dialog.Close>
                    <Dialog.Title className="font-serif text-2xl text-navy mb-6">
                      {editing ? 'Modifier l\'avis' : 'Ajouter un avis'}
                    </Dialog.Title>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div>
                        <label className="label-xs">Nom de l'auteur *</label>
                        <input {...register('author', { required: true })}
                          className="input" placeholder="Jean Dupont" />
                      </div>

                      <div>
                        <label className="label-xs">Plateforme *</label>
                        <select {...register('platform', { required: true })} className="input">
                          {platforms.map((p) => (
                            <option key={p} value={p}>{platformLabels[p]}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="label-xs">Note *</label>
                        <StarRating value={rating} onChange={setRating} />
                      </div>

                      <div>
                        <label className="label-xs">Contenu de l'avis *</label>
                        <textarea {...register('content', { required: true })}
                          rows={5} className="input resize-none"
                          placeholder="Collez ici le texte de l'avis..." />
                      </div>

                      <div>
                        <label className="label-xs">Date de l'avis *</label>
                        <input type="date" {...register('date', { required: true })} className="input" />
                      </div>

                      <div>
                        <label className="label-xs">Lien vers le profil (optionnel)</label>
                        <input {...register('profileUrl')} className="input"
                          placeholder="https://..." type="url" />
                      </div>

                      <div className="flex gap-3 pt-2">
                        <Dialog.Close asChild>
                          <button type="button" className="btn-outline flex-1 text-xs tracking-widest uppercase py-3">
                            Annuler
                          </button>
                        </Dialog.Close>
                        <button type="submit" disabled={saving}
                          className="btn-primary flex-1 text-xs tracking-widest uppercase py-3 disabled:opacity-50">
                          {saving ? <Loader2 size={14} className="animate-spin" /> : editing ? 'Enregistrer' : 'Ajouter'}
                        </button>
                      </div>
                    </form>
                  </motion.div>
                </Dialog.Content>
                </div>
              </Dialog.Portal>
            )}
          </AnimatePresence>
        </Dialog.Root>

        {/* Delete confirm */}
        {deleteTarget && (
          <DeleteConfirmModal
            open={!!deleteTarget}
            authorName={deleteTarget.author}
            onConfirm={handleDelete}
            onCancel={() => setDeleteTarget(null)}
            loading={deleting}
          />
        )}
      </div>
    </Tooltip.Provider>
  )
}
