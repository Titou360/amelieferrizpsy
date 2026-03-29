import { Router } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { requireAuth } from '../middleware/auth.js'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

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
