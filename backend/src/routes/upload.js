import { Router } from 'express'
import { saveMedia } from '../lib/media.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Protected: stocke une image (data-URI base64) dans MongoDB
// Body: { data: "data:image/...;base64,..." }
router.post('/', requireAuth, async (req, res) => {
  try {
    const { data } = req.body
    if (!data || !data.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Image base64 invalide' })
    }

    const url = await saveMedia(data, 'article')
    res.json({ url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
