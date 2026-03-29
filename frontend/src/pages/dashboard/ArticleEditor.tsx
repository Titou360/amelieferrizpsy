import { useEffect, useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Placeholder from '@tiptap/extension-placeholder'
import {
  Bold, Italic, Underline as UnderlineIcon, List, ListOrdered,
  Heading2, Heading3, Link as LinkIcon, Image as ImageIcon,
  ArrowLeft, Save, Eye, Loader2, Quote, Upload, X
} from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'
import api from '../../lib/api'
import { useToast } from '../../components/ui/ToastProvider'

interface ArticleForm {
  title: string
  excerpt: string
  category: string
  coverImage: string
  published: boolean
}

function ToolbarBtn({
  onClick, active, title, children,
}: {
  onClick: () => void
  active?: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); onClick() }}
          className={`p-2 transition-colors ${active ? 'bg-orange text-white' : 'text-navy/50 hover:text-navy hover:bg-navy/5'}`}
        >
          {children}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content className="bg-navy text-cream text-xs px-2 py-1 z-50" sideOffset={4}>
          {title}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}

export default function ArticleEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { toast } = useToast()
  const isNew = !id || id === 'nouveau'

  const [form, setForm] = useState<ArticleForm>({
    title: '',
    excerpt: '',
    category: '',
    coverImage: '',
    published: false,
  })
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const [uploadingInline, setUploadingInline] = useState(false)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const inlineInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: 'Commencez à rédiger votre article ici…' }),
    ],
    editorProps: {
      attributes: {
        class: 'tiptap-content min-h-[400px] focus:outline-none p-6',
      },
    },
  })

  useEffect(() => {
    if (!isNew && id) {
      api.get(`/articles/${id}?byId=true`)
        .then((res) => {
          const a = res.data
          setForm({ title: a.title, excerpt: a.excerpt || '', category: a.category || '', coverImage: a.coverImage || '', published: a.published })
          editor?.commands.setContent(a.content)
        })
        .catch(() => { toast({ type: 'error', title: 'Article introuvable' }); navigate('/dashboard/articles') })
        .finally(() => setLoading(false))
    }
  }, [id, editor])

  const validateAndUpload = useCallback(async (file: File): Promise<string> => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      throw new Error('Format non supporté. Utilisez JPG, PNG ou WebP.')
    }
    if (file.size > 500 * 1024) {
      throw new Error('Image trop lourde. Maximum 500 Ko.')
    }
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = async () => {
        try {
          const res = await api.post('/upload', { data: reader.result as string })
          resolve(res.data.url)
        } catch (err: unknown) {
          const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error
          reject(new Error(msg || 'Échec de l\'upload Cloudinary'))
        }
      }
      reader.onerror = () => reject(new Error('Erreur de lecture du fichier'))
      reader.readAsDataURL(file)
    })
  }, [])

  const handleCoverUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingCover(true)
    try {
      const url = await validateAndUpload(file)
      setForm((f) => ({ ...f, coverImage: url }))
    } catch (err: unknown) {
      toast({ type: 'error', title: (err as Error).message })
    } finally {
      setUploadingCover(false)
      e.target.value = ''
    }
  }, [validateAndUpload, toast])

  const handleInlineImageUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingInline(true)
    try {
      const url = await validateAndUpload(file)
      editor?.chain().focus().setImage({ src: url }).run()
    } catch (err: unknown) {
      toast({ type: 'error', title: (err as Error).message })
    } finally {
      setUploadingInline(false)
      e.target.value = ''
    }
  }, [validateAndUpload, editor, toast])

  const handleSave = async (publish?: boolean) => {
    if (!form.title.trim()) { toast({ type: 'error', title: 'Le titre est requis' }); return }
    setSaving(true)
    const payload = {
      ...form,
      published: publish ?? form.published,
      content: editor?.getHTML() ?? '',
    }
    try {
      if (isNew) {
        await api.post('/articles', payload)
        toast({ type: 'success', title: 'Article créé !' })
      } else {
        await api.put(`/articles/${id}`, payload)
        toast({ type: 'success', title: 'Article enregistré' })
      }
      navigate('/dashboard/articles')
    } catch {
      toast({ type: 'error', title: 'Erreur lors de la sauvegarde' })
    } finally {
      setSaving(false)
    }
  }

  const addLink = useCallback(() => {
    const url = window.prompt('URL du lien :')
    if (url) editor?.chain().focus().setLink({ href: url }).run()
  }, [editor])

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 size={24} className="animate-spin text-navy/30" />
    </div>
  )

  return (
    <Tooltip.Provider delayDuration={300}>
      <div className="space-y-6 max-w-4xl">
        {/* Hidden file inputs */}
        <input ref={coverInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleCoverUpload} />
        <input ref={inlineInputRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleInlineImageUpload} />
        {/* Top bar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <button
            onClick={() => navigate('/dashboard/articles')}
            className="flex items-center gap-2 text-sm font-sans text-navy/50 hover:text-navy transition-colors"
          >
            <ArrowLeft size={16} /> Retour aux articles
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="btn-outline text-xs tracking-widest uppercase px-6 py-2.5 flex items-center gap-2"
            >
              {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
              Brouillon
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="btn-primary text-xs tracking-widest uppercase px-6 py-2.5 flex items-center gap-2"
            >
              {saving ? <Loader2 size={13} className="animate-spin" /> : <Eye size={13} />}
              Publier
            </button>
          </div>
        </div>

        <h1 className="font-serif text-3xl text-navy">
          {isNew ? 'Nouvel article' : 'Modifier l\'article'}
        </h1>

        {/* Metadata */}
        <div className="bg-white border border-navy/8 p-6 space-y-4">
          <div>
            <label className="label-xs">Titre de l'article *</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="input text-lg font-serif"
              placeholder="Titre de l'article…"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="label-xs">Extrait / description</label>
              <textarea
                value={form.excerpt}
                onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                className="input resize-none"
                rows={3}
                placeholder="Bref résumé affiché dans les listes…"
              />
            </div>
            <div>
              <label className="label-xs">Catégorie</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="input"
              >
                <option value="">Aucune catégorie</option>
                <option>Psychanalyse</option>
                <option>Vie intérieure</option>
                <option>Relations</option>
                <option>Enfants & Adolescents</option>
                <option>Bien-être</option>
                <option>Actualités</option>
              </select>
            </div>
          </div>

          {/* Cover image */}
          <div>
            <label className="label-xs">Image de couverture</label>
            <div className="mt-1 relative w-full h-48 border border-navy/10 overflow-hidden bg-navy/3 flex items-center justify-center">
              {uploadingCover ? (
                /* Spinner overlay pendant l'upload */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy/5">
                  <Loader2 size={28} className="animate-spin text-orange" />
                  <span className="text-xs font-sans text-navy/50">Upload en cours…</span>
                </div>
              ) : form.coverImage ? (
                <>
                  <img
                    src={form.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                  {/* Actions overlay au hover */}
                  <div className="absolute inset-0 bg-navy/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => coverInputRef.current?.click()}
                      className="flex items-center gap-1.5 bg-white px-3 py-2 text-xs font-sans text-navy hover:bg-orange hover:text-white transition-colors"
                    >
                      <Upload size={12} /> Remplacer
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, coverImage: '' }))}
                      className="flex items-center gap-1.5 bg-white px-3 py-2 text-xs font-sans text-navy hover:bg-orange hover:text-white transition-colors"
                    >
                      <X size={12} /> Supprimer
                    </button>
                  </div>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  className="flex flex-col items-center gap-2 text-navy/30 hover:text-navy/60 transition-colors py-6"
                >
                  <Upload size={22} />
                  <span className="text-xs font-sans">Choisir une image</span>
                  <span className="text-xs font-sans text-navy/25">JPG, PNG, WebP — max 500 Ko</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Editor */}
        <div className="bg-white border border-navy/8">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-0.5 border-b border-navy/8 px-3 py-2">
            <ToolbarBtn onClick={() => editor?.chain().focus().toggleBold().run()} active={editor?.isActive('bold')} title="Gras">
              <Bold size={15} />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor?.chain().focus().toggleItalic().run()} active={editor?.isActive('italic')} title="Italique">
              <Italic size={15} />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor?.chain().focus().toggleUnderline().run()} active={editor?.isActive('underline')} title="Souligné">
              <UnderlineIcon size={15} />
            </ToolbarBtn>
            <div className="w-px h-5 bg-navy/10 mx-1" />
            <ToolbarBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()} active={editor?.isActive('heading', { level: 2 })} title="Titre H2">
              <Heading2 size={15} />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()} active={editor?.isActive('heading', { level: 3 })} title="Titre H3">
              <Heading3 size={15} />
            </ToolbarBtn>
            <div className="w-px h-5 bg-navy/10 mx-1" />
            <ToolbarBtn onClick={() => editor?.chain().focus().toggleBulletList().run()} active={editor?.isActive('bulletList')} title="Liste à puces">
              <List size={15} />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor?.chain().focus().toggleOrderedList().run()} active={editor?.isActive('orderedList')} title="Liste numérotée">
              <ListOrdered size={15} />
            </ToolbarBtn>
            <ToolbarBtn onClick={() => editor?.chain().focus().toggleBlockquote().run()} active={editor?.isActive('blockquote')} title="Citation">
              <Quote size={15} />
            </ToolbarBtn>
            <div className="w-px h-5 bg-navy/10 mx-1" />
            <ToolbarBtn onClick={addLink} active={editor?.isActive('link')} title="Ajouter un lien">
              <LinkIcon size={15} />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => inlineInputRef.current?.click()}
              title={uploadingInline ? 'Upload en cours…' : 'Insérer une image'}
            >
              {uploadingInline ? <Loader2 size={15} className="animate-spin" /> : <ImageIcon size={15} />}
            </ToolbarBtn>
          </div>

          {/* Content area */}
          <EditorContent editor={editor} />
        </div>

        {/* Author signature preview */}
        <div className="bg-navy/5 border border-navy/10 p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-navy/10 overflow-hidden shrink-0">
            <img src="/avatar-amelie.jpg" alt="" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
          </div>
          <div>
            <p className="text-sm font-sans font-medium text-navy">Amélie Ferriz</p>
            <p className="text-xs font-sans text-navy/50">Psychanalyste — Narbonne · Signé automatiquement</p>
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  )
}
