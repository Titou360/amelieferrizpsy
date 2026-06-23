import { Router } from 'express'
import Media from '../models/Media.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public : sert l'image décodée depuis MongoDB
router.get('/file/:filename', async (req, res) => {
  try {
    const media = await Media.findOne({ filename: req.params.filename })
    if (!media) return res.status(404).json({ error: 'Image introuvable' })

    const base64 = media.dataUri.split(',')[1] || ''
    const buffer = Buffer.from(base64, 'base64')
    res.set('Content-Type', media.mimetype)
    res.set('Cache-Control', 'public, max-age=31536000, immutable')
    res.send(buffer)
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Protégé : liste des médias (sans le dataUri, trop volumineux)
router.get('/', requireAuth, async (_req, res) => {
  try {
    const items = await Media.find()
      .select('filename mimetype size category createdAt')
      .sort({ createdAt: -1 })
    res.json(items.map((m) => ({
      filename: m.filename,
      mimetype: m.mimetype,
      size: m.size,
      category: m.category,
      createdAt: m.createdAt,
      url: `/api/media/file/${m.filename}`,
    })))
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Protégé : suppression
router.delete('/:filename', requireAuth, async (req, res) => {
  try {
    const result = await Media.deleteOne({ filename: req.params.filename })
    if (result.deletedCount === 0) return res.status(404).json({ error: 'Image introuvable' })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
