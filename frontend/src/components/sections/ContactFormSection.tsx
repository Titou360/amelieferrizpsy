import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import api from '../../lib/api'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const schema = z.object({
  name: z.string().min(2, 'Veuillez saisir votre nom'),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Veuillez préciser le sujet'),
  message: z.string().min(20, 'Votre message doit comporter au moins 20 caractères'),
  consent: z.boolean().refine((v) => v, 'Vous devez accepter la politique de confidentialité'),
})
type FormData = z.infer<typeof schema>

export default function ContactFormSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    try {
      await api.post('/contact', data)
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="formulaire" className="py-24 bg-cream-light">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-sans text-orange uppercase tracking-[0.3em]"
          >
            Message
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="font-serif text-4xl sm:text-5xl text-navy mt-3 font-light"
          >
            Écrivez-moi
          </motion.h2>
        </div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-sage/10 border border-sage/30 p-10 text-center"
          >
            <CheckCircle size={40} className="text-sage mx-auto mb-4" />
            <p className="font-serif text-2xl text-navy mb-2">Message envoyé !</p>
            <p className="font-sans text-sm text-navy/60">
              Je reviendrai vers vous dans les meilleurs délais.
            </p>
            <button
              onClick={() => setStatus('idle')}
              className="mt-6 btn-outline text-xs tracking-widest uppercase px-8 py-3"
            >
              Envoyer un autre message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-sans text-navy/50 uppercase tracking-widest mb-2">
                  Nom complet *
                </label>
                <input
                  {...register('name', { required: 'Champ requis' })}
                  className="w-full border border-navy/15 bg-white px-4 py-3 text-sm font-sans text-navy placeholder-navy/30 focus:outline-none focus:border-orange transition-colors"
                  placeholder="Votre nom"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-orange">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-sans text-navy/50 uppercase tracking-widest mb-2">
                  Email *
                </label>
                <input
                  {...register('email', { required: 'Champ requis' })}
                  type="email"
                  className="w-full border border-navy/15 bg-white px-4 py-3 text-sm font-sans text-navy placeholder-navy/30 focus:outline-none focus:border-orange transition-colors"
                  placeholder="votre@email.fr"
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-orange">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-sans text-navy/50 uppercase tracking-widest mb-2">
                  Téléphone
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full border border-navy/15 bg-white px-4 py-3 text-sm font-sans text-navy placeholder-navy/30 focus:outline-none focus:border-orange transition-colors"
                  placeholder="+33 6 XX XX XX XX"
                />
              </div>
              <div>
                <label className="block text-xs font-sans text-navy/50 uppercase tracking-widest mb-2">
                  Sujet *
                </label>
                <select
                  {...register('subject', { required: 'Champ requis' })}
                  className="w-full border border-navy/15 bg-white px-4 py-3 text-sm font-sans text-navy focus:outline-none focus:border-orange transition-colors"
                >
                  <option value="">Sélectionner...</option>
                  <option>Prise de rendez-vous</option>
                  <option>Renseignements</option>
                  <option>Téléconsultation</option>
                  <option>Groupe de parole</option>
                  <option>Autre</option>
                </select>
                {errors.subject && (
                  <p className="mt-1 text-xs text-orange">{errors.subject.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-xs font-sans text-navy/50 uppercase tracking-widest mb-2">
                Message *
              </label>
              <textarea
                {...register('message', { required: 'Champ requis' })}
                rows={6}
                className="w-full border border-navy/15 bg-white px-4 py-3 text-sm font-sans text-navy placeholder-navy/30 focus:outline-none focus:border-orange transition-colors resize-none"
                placeholder="Décrivez votre demande..."
              />
              {errors.message && (
                <p className="mt-1 text-xs text-orange">{errors.message.message}</p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input
                {...register('consent', { required: true })}
                type="checkbox"
                id="consent"
                className="mt-0.5 accent-orange"
              />
              <label htmlFor="consent" className="text-xs font-sans text-navy/60 leading-relaxed">
                J'accepte que mes données soient utilisées dans le cadre de ma demande conformément à la{' '}
                <a href="/politique-confidentialite" className="underline hover:text-orange transition-colors">
                  politique de confidentialité
                </a>
                .
              </label>
            </div>
            {errors.consent && (
              <p className="text-xs text-orange">Vous devez accepter pour continuer.</p>
            )}

            {status === 'error' && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                <AlertCircle size={18} />
                Une erreur est survenue. Merci de réessayer ou de me contacter directement.
              </div>
            )}

            <div className="text-right">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary px-10 py-3 text-xs tracking-widest uppercase disabled:opacity-60"
              >
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" /> Envoi...
                  </span>
                ) : (
                  'Envoyer le message'
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
