import { Router } from 'express'
import Faq from '../models/Faq.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public: liste des FAQ publiées (triées par order)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { published: true }
    const faqs = await Faq.find(filter).sort({ order: 1, createdAt: 1 })
    res.json(faqs)
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Protected: créer
router.post('/', requireAuth, async (req, res) => {
  try {
    const faq = new Faq(req.body)
    await faq.save()
    res.status(201).json(faq)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Protected: modifier
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const faq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!faq) return res.status(404).json({ error: 'FAQ introuvable' })
    res.json(faq)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Protected: supprimer
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const faq = await Faq.findByIdAndDelete(req.params.id)
    if (!faq) return res.status(404).json({ error: 'FAQ introuvable' })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
