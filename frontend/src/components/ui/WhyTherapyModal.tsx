import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

const section1 = [
  "Cette approche unique de la thérapie peut vous offrir des avantages significatifs pour votre bien-être mental et émotionnel.",
  "La psychanalyse est une méthode de traitement psychologique fondée sur les théories développées par Sigmund Freud au début du XXe siècle. Elle vise à explorer les profondeurs de l'inconscient pour comprendre les origines des troubles psychologiques et émotionnels. Voici quelques raisons pour lesquelles vous pourriez choisir d'être accompagné sur des séances de psychanalyse.",
  "Comprendre les origines profondes de vos problèmes à travers une approche en profondeur pour comprendre les origines de vos troubles psychologiques, tels que l'anxiété, la dépression, les problèmes relationnels, les comportements compulsifs, et bien d'autres. Elle explore les couches cachées de l'inconscient pour vous aider à identifier et à comprendre les expériences passées, les émotions refoulées et les conflits internes qui peuvent influencer votre comportement actuel.",
  "Cette thérapie vise à libérer le patient de l'emprise de son inconscient qui agit en lui comme un sujet autonome et influence largement ses choix, actes, paroles. Le patient ainsi libéré ne subit plus et redevient maître de ses choix. Il est libéré de ses angoisses et peut continuer à avancer dans sa vie.",
  "La psychanalyse contribue à traiter des problèmes psychologiques, ayant leur source dans l'enfance, par la verbalisation, la parole et la technique dite de la « libre association » (accepter de dire tout ce qu'il vient à l'esprit).",
]

const section2 = [
  "Gagner en auto-connaissance, vous offrir la possibilité de mieux vous connaître et découvrir votre moi profond.",
  "En explorant vos pensées, vos émotions, vos rêves et vos souvenirs, vous pouvez prendre conscience de vos schémas de pensée et de comportement, de vos motivations et de vos désirs les plus profonds. Cette prise de conscience peut vous aider à mieux vous comprendre et à vous accepter tel que vous êtes.",
  "Favoriser la croissance personnelle en vous aidant à surmonter les obstacles internes qui vous empêchent d'atteindre votre plein potentiel. En identifiant et en travaillant sur les schémas de pensée et de comportement limitants, vous pouvez vous ouvrir à de nouvelles perspectives, à de nouvelles possibilités et à un développement personnel plus profond.",
  "Vous aider à mieux comprendre vos relations avec les autres, que ce soit dans votre vie personnelle ou professionnelle. En explorant vos modèles de relations, vos croyances inconscientes et vos émotions refoulées, vous pouvez acquérir une compréhension plus profonde des dynamiques relationnelles et apprendre à mieux communiquer, à établir des limites saines et à cultiver des relations plus épanouissantes.",
  "La psychanalyse traite également les maladies psychosomatiques en considérant l'ensemble de la personne dans sa singularité — son corps, son esprit, ses émotions et ses expériences de vie. Elle cherche à comprendre les liens complexes entre les symptômes physiques et les aspects psychologiques et émotionnels du patient, en explorant les significations symboliques et les processus inconscients qui sous-tendent les symptômes, avec une approche bienveillante, respectueuse et confidentielle. Je m'engage à vous offrir un cadre sûr, neutre et bienveillant, pour explorer les dimensions psychologiques de vos symptômes et vous soutenir dans votre cheminement vers la guérison.",
  "D'autres thérapies plus courtes et plus en « surface » peuvent vous être proposées, je vous laisse les découvrir.",
]

export default function WhyTherapyModal({ open, onClose }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, y: 40, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full max-w-2xl max-h-[85vh] bg-white overflow-auto focus:outline-none pointer-events-auto shadow-2xl"
                >
                  {/* Barre accent */}
                  <div className="h-1.5 w-full bg-orange" />

                  <div className="p-8 sm:p-10">
                    {/* Bouton fermer */}
                    <Dialog.Close asChild>
                      <button
                        onClick={onClose}
                        className="absolute top-5 right-5 text-navy/30 hover:text-navy transition-colors p-1"
                        aria-label="Fermer"
                      >
                        <X size={20} />
                      </button>
                    </Dialog.Close>

                    {/* Section 1 */}
                    <Dialog.Title className="font-serif text-2xl text-navy font-light leading-snug mb-6 pr-8">
                      Pourquoi choisir une thérapie&nbsp;?
                    </Dialog.Title>

                    <div className="flex flex-col gap-4">
                      {section1.map((p, i) => (
                        <p key={i} className="font-sans text-sm text-navy/70 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Séparateur */}
                    <div className="my-8 border-t border-navy/10" />

                    {/* Section 2 */}
                    <h3 className="font-serif text-2xl text-navy font-light leading-snug mb-6">
                      Laquelle choisir&nbsp;?
                    </h3>

                    <div className="flex flex-col gap-4">
                      {section2.map((p, i) => (
                        <p key={i} className="font-sans text-sm text-navy/70 leading-relaxed">
                          {p}
                        </p>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-navy/10 flex justify-end">
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
