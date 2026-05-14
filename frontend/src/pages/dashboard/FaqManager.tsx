import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import * as Dialog from '@radix-ui/react-dialog'
import { Plus, Pencil, Trash2, GripVertical, Loader2, X, HelpCircle } from 'lucide-react'
import api from '../../lib/api'
import { useToast } from '../../components/ui/ToastProvider'

interface Faq {
  _id: string
  question: string
  answer: string
  order: number
  published: boolean
}

interface FaqForm {
  question: string
  answer: string
  published: boolean
}

const EMPTY: FaqForm = { question: '', answer: '', published: true }

function FaqModal({
  open,
  initial,
  onClose,
  onSave,
  saving,
}: {
  open: boolean
  initial: FaqForm
  onClose: () => void
  onSave: (f: FaqForm) => void
  saving: boolean
}) {
  const [form, setForm] = useState<FaqForm>(initial)
  useEffect(() => { setForm(initial) }, [initial, open])

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
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
                className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:translate-x-[-50%] lg:left-[calc(50%+8rem)] z-50 bg-white p-8 w-full max-w-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <Dialog.Title className="font-serif text-2xl text-navy">
                    {initial.question ? 'Modifier la question' : 'Nouvelle question'}
                  </Dialog.Title>
                  <button onClick={onClose} className="text-navy/30 hover:text-navy p-1">
                    <X size={18} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="label-xs">Question *</label>
                    <input
                      value={form.question}
                      onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))}
                      className="input"
                      placeholder="Ex : Combien de temps dure une séance ?"
                    />
                  </div>
                  <div>
                    <label className="label-xs">Réponse *</label>
                    <textarea
                      value={form.answer}
                      onChange={(e) => setForm((f) => ({ ...f, answer: e.target.value }))}
                      className="input resize-none"
                      rows={5}
                      placeholder="Réponse complète…"
                    />
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                      className="accent-orange"
                    />
                    <span className="text-sm font-sans text-navy/70">Visible sur le site</span>
                  </label>
                </div>

                <div className="flex gap-3 mt-8">
                  <button onClick={onClose} className="btn-outline flex-1 text-xs tracking-widest uppercase py-2.5">
                    Annuler
                  </button>
                  <button
                    onClick={() => onSave(form)}
                    disabled={saving || !form.question.trim() || !form.answer.trim()}
                    className="btn-primary flex-1 text-xs tracking-widest uppercase py-2.5 flex items-center justify-center gap-2 disabled:opacity-40"
                  >
                    {saving && <Loader2 size={13} className="animate-spin" />}
                    Enregistrer
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

export default function FaqManager() {
  const [faqs, setFaqs] = useState<Faq[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Faq | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const { toast } = useToast()

  const fetch = async () => {
    try {
      const res = await api.get('/faqs?all=true')
      setFaqs(res.data)
    } catch {
      toast({ type: 'error', title: 'Erreur de chargement' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetch() }, [])

  const openNew = () => { setEditing(null); setModalOpen(true) }
  const openEdit = (f: Faq) => { setEditing(f); setModalOpen(true) }

  const handleSave = async (form: FaqForm) => {
    setSaving(true)
    try {
      if (editing) {
        await api.put(`/faqs/${editing._id}`, { ...form, order: editing.order })
        toast({ type: 'success', title: 'Question modifiée' })
      } else {
        await api.post('/faqs', { ...form, order: faqs.length })
        toast({ type: 'success', title: 'Question ajoutée' })
      }
      setModalOpen(false)
      fetch()
    } catch {
      toast({ type: 'error', title: 'Erreur lors de la sauvegarde' })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await api.delete(`/faqs/${id}`)
      toast({ type: 'success', title: 'Question supprimée' })
      fetch()
    } catch {
      toast({ type: 'error', title: 'Erreur lors de la suppression' })
    } finally {
      setDeletingId(null)
    }
  }

  const togglePublish = async (f: Faq) => {
    try {
      await api.put(`/faqs/${f._id}`, { published: !f.published })
      fetch()
    } catch {
      toast({ type: 'error', title: 'Erreur' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-navy">FAQ</h1>
          <p className="font-sans text-sm text-navy/50 mt-1">
            Questions & réponses affichées sur la page /faq du site.
          </p>
        </div>
        <button onClick={openNew} className="btn-primary text-xs tracking-widest uppercase px-6 py-2.5 flex items-center gap-2">
          <Plus size={15} /> Ajouter
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 bg-white animate-pulse border border-navy/8" />)}
        </div>
      ) : faqs.length === 0 ? (
        <div className="bg-white border border-navy/8 p-12 text-center">
          <HelpCircle size={36} className="text-navy/15 mx-auto mb-4" />
          <p className="font-sans text-navy/40 text-sm">Aucune question pour le moment.</p>
          <button onClick={openNew} className="btn-primary text-xs tracking-widest uppercase px-8 py-2.5 mt-6">
            Créer la première question
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {faqs.map((f, i) => (
            <div key={f._id} className="bg-white border border-navy/8 p-4 flex items-start gap-3">
              <GripVertical size={16} className="text-navy/20 mt-0.5 shrink-0 cursor-grab" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-sans text-navy/30 w-5">#{i + 1}</span>
                  <span className="font-sans text-sm font-medium text-navy">{f.question}</span>
                  <span className={`text-xs px-2 py-0.5 font-sans ${f.published ? 'bg-sage/20 text-sage-dark' : 'bg-navy/10 text-navy/50'}`}>
                    {f.published ? 'Visible' : 'Masquée'}
                  </span>
                </div>
                <p className="text-xs font-sans text-navy/40 line-clamp-1 ml-7">{f.answer}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => togglePublish(f)}
                  className="text-xs font-sans text-navy/40 hover:text-navy px-2 py-1 transition-colors"
                >
                  {f.published ? 'Masquer' : 'Afficher'}
                </button>
                <button onClick={() => openEdit(f)} className="p-2 text-navy/30 hover:text-navy transition-colors">
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => handleDelete(f._id)}
                  disabled={deletingId === f._id}
                  className="p-2 text-navy/30 hover:text-orange transition-colors"
                >
                  {deletingId === f._id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <FaqModal
        open={modalOpen}
        initial={editing ? { question: editing.question, answer: editing.answer, published: editing.published } : EMPTY}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  )
}
