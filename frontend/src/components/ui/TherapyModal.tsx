import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Therapy } from '../../lib/therapies'

interface Props {
  therapy: Therapy | null
  onClose: () => void
}

const colorAccent: Record<string, string> = {
  navy: 'bg-navy',
  orange: 'bg-orange',
  sage: 'bg-sage',
}

export default function TherapyModal({ therapy, onClose }: Props) {
  return (
    <Dialog.Root open={!!therapy} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {therapy && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>

            {/* Conteneur centrant — fixed plein écran, flex centré */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl max-h-[85vh] bg-white overflow-auto focus:outline-none pointer-events-auto shadow-2xl"
              >
                {/* Header accent */}
                <div className={`h-1.5 w-full ${colorAccent[therapy.color]}`} />

                <div className="p-8 sm:p-10">
                  {/* Close */}
                  <Dialog.Close asChild>
                    <button
                      onClick={onClose}
                      className="absolute top-5 right-5 text-navy/30 hover:text-navy transition-colors p-1"
                      aria-label="Fermer"
                    >
                      <X size={20} />
                    </button>
                  </Dialog.Close>

                  <Dialog.Title className="font-serif text-3xl text-navy font-light leading-snug mb-6 pr-8">
                    {therapy.title}
                  </Dialog.Title>

                  <div
                    className="tiptap-content"
                    dangerouslySetInnerHTML={{ __html: therapy.content }}
                  />

                  <div className="mt-8 pt-6 border-t border-navy/10 flex items-center justify-between gap-4 flex-wrap">
                    <Link
                      to={`/therapie/${therapy.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-2 text-xs font-sans text-orange hover:text-orange-dark transition-colors uppercase tracking-widest"
                    >
                      Page dédiée <ExternalLink size={12} />
                    </Link>
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault()
                        onClose()
                        setTimeout(() => {
                          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                        }, 200)
                      }}
                      className="btn-primary text-xs tracking-widest uppercase px-8 py-3"
                    >
                      Prendre rendez-vous
                    </a>
                  </div>
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
