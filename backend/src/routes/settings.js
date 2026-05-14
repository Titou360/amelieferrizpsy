import { Router } from 'express'
import Settings from '../models/Settings.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

async function getOrCreate() {
  let s = await Settings.findOne({ _singleton: 'main' })
  if (!s) s = await Settings.create({ _singleton: 'main' })
  return s
}

// Public: lire les paramètres
router.get('/', async (req, res) => {
  try {
    const settings = await getOrCreate()
    res.json(settings)
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Protected: mettre à jour
router.put('/', requireAuth, async (req, res) => {
  try {
    const settings = await getOrCreate()
    Object.assign(settings, req.body)
    await settings.save()
    res.json(settings)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router
