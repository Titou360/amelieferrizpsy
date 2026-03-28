import { Router } from 'express'
import Review from '../models/Review.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public: get published reviews (or all if admin query)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ date: -1 })
    res.json(reviews)
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Protected: create
router.post('/', requireAuth, async (req, res) => {
  try {
    const review = await Review.create(req.body)
    res.status(201).json(review)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Protected: update
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!review) return res.status(404).json({ error: 'Avis introuvable' })
    res.json(review)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Protected: delete
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id)
    if (!review) return res.status(404).json({ error: 'Avis introuvable' })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
