import { Router } from 'express'
import cloudinary from '../lib/cloudinary.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Protected: upload image to Cloudinary (amelieFerriz folder)
// Body: { data: "data:image/...;base64,..." }
router.post('/', requireAuth, async (req, res) => {
  try {
    const { data } = req.body
    if (!data || !data.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Image base64 invalide' })
    }

    const result = await cloudinary.uploader.upload(data, {
      folder: 'amelieFerriz',
      resource_type: 'image',
    })

    res.json({ url: result.secure_url, public_id: result.public_id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router
