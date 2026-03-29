import { useState, useCallback } from 'react'
import Cropper, { type Area } from 'react-easy-crop'
import * as Dialog from '@radix-ui/react-dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, ZoomIn, ZoomOut } from 'lucide-react'

interface Props {
  imageSrc: string          // data URL du fichier sélectionné
  aspect?: number           // ratio, ex: 16/9 ou undefined = libre
  onConfirm: (croppedBlob: Blob) => void
  onCancel: () => void
}

async function getCroppedBlob(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = imageSrc
  })

  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height)

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob)
      else reject(new Error('Échec de la génération du canvas'))
    }, 'image/webp', 0.88)
  })
}

export default function ImageCropModal({ imageSrc, aspect, onConfirm, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)
  const [confirming, setConfirming] = useState(false)

  const onCropComplete = useCallback((_: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels)
  }, [])

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return
    setConfirming(true)
    try {
      const blob = await getCroppedBlob(imageSrc, croppedAreaPixels)
      onConfirm(blob)
    } finally {
      setConfirming(false)
    }
  }

  return (
    <Dialog.Root open onOpenChange={(v) => !v && onCancel()}>
      <AnimatePresence>
        <Dialog.Portal forceMount>
          <Dialog.Overlay asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50"
            />
          </Dialog.Overlay>

          <Dialog.Content asChild>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white w-full max-w-2xl flex flex-col"
              style={{ maxHeight: '90vh' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-navy/10">
                <Dialog.Title className="font-sans text-sm font-medium text-navy tracking-wide">
                  Rogner l'image
                </Dialog.Title>
                <button onClick={onCancel} className="p-1 text-navy/30 hover:text-navy transition-colors">
                  <X size={16} />
                </button>
              </div>

              {/* Cropper area */}
              <div className="relative bg-navy/90" style={{ height: 380 }}>
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  aspect={aspect}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  showGrid={true}
                  style={{
                    containerStyle: { background: '#0f172a' },
                    cropAreaStyle: { border: '2px solid rgba(234,102,45,0.8)' },
                  }}
                />
              </div>

              {/* Zoom slider */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-navy/10">
                <ZoomOut size={14} className="text-navy/40 shrink-0" />
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="flex-1 accent-orange h-1 cursor-pointer"
                />
                <ZoomIn size={14} className="text-navy/40 shrink-0" />
                <span className="text-xs font-sans text-navy/40 w-10 text-right">
                  ×{zoom.toFixed(1)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between px-6 py-4">
                <p className="text-xs font-sans text-navy/35">
                  Glissez pour cadrer · molette ou slider pour zoomer
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={onCancel}
                    className="btn-outline text-xs tracking-widest uppercase px-5 py-2"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={confirming}
                    className="btn-primary text-xs tracking-widest uppercase px-5 py-2 flex items-center gap-2"
                  >
                    <Check size={13} />
                    {confirming ? 'Traitement…' : 'Valider'}
                  </button>
                </div>
              </div>
            </motion.div>
          </Dialog.Content>
        </Dialog.Portal>
      </AnimatePresence>
    </Dialog.Root>
  )
}
