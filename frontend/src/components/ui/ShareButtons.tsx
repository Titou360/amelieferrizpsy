import { useState } from 'react'
import { Facebook, Instagram, Linkedin, Mail, Link2, Check } from 'lucide-react'
import { useToast } from './ToastProvider'

// Logo X (Twitter) — pas d'icône officielle dans lucide
function XIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

interface Props {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: Props) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const enc = encodeURIComponent
  const openPopup = (shareUrl: string) =>
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=640')

  const shareFacebook = () =>
    openPopup(`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`)

  const shareX = () =>
    openPopup(`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`)

  const shareLinkedIn = () =>
    openPopup(`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`)

  const shareEmail = () => {
    window.location.href = `mailto:?subject=${enc(title)}&body=${enc(`${title}\n\n${url}`)}`
  }

  const copyLink = async (notice?: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast({ type: 'success', title: notice || 'Lien copié !' })
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast({ type: 'error', title: 'Impossible de copier le lien' })
    }
  }

  // Instagram n'expose pas d'URL de partage web. Sur mobile on ouvre le partage
  // natif (qui propose Instagram & co) ; sinon on copie le lien à coller.
  const shareInstagram = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        /* partage annulé par l'utilisateur — on ne fait rien */
      }
      return
    }
    copyLink('Lien copié — collez-le dans votre story ou bio Instagram')
  }

  const buttons = [
    { label: 'Partager sur Facebook', onClick: shareFacebook, icon: <Facebook size={16} /> },
    { label: 'Partager sur X', onClick: shareX, icon: <XIcon /> },
    { label: 'Partager sur LinkedIn', onClick: shareLinkedIn, icon: <Linkedin size={16} /> },
    { label: 'Partager sur Instagram', onClick: shareInstagram, icon: <Instagram size={16} /> },
    { label: 'Partager par email', onClick: shareEmail, icon: <Mail size={16} /> },
    {
      label: copied ? 'Lien copié' : 'Copier le lien',
      onClick: () => copyLink(),
      icon: copied ? <Check size={16} /> : <Link2 size={16} />,
    },
  ]

  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3">
      <span className="text-xs font-sans text-navy/50 uppercase tracking-widest">
        Partager cet article
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {buttons.map((b) => (
          <button
            key={b.label}
            type="button"
            onClick={b.onClick}
            aria-label={b.label}
            title={b.label}
            className="w-10 h-10 flex items-center justify-center border border-navy/15 text-navy/60 hover:text-white hover:bg-orange hover:border-orange transition-colors"
          >
            {b.icon}
          </button>
        ))}
      </div>
    </div>
  )
}
