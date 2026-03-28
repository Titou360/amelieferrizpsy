import { Router } from 'express'
import Article from '../models/Article.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// Public: list published articles (admin gets all with ?all=true + token)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { published: true }
    const articles = await Article.find(filter)
      .select('title slug excerpt category published publishedAt coverImage')
      .sort({ publishedAt: -1 })
    res.json(articles)
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Public: get article by slug (or by id with ?byId=true)
router.get('/:ref', async (req, res) => {
  try {
    const filter = req.query.byId === 'true'
      ? { _id: req.params.ref }
      : { slug: req.params.ref, published: true }
    const article = await Article.findOne(filter)
    if (!article) return res.status(404).json({ error: 'Article introuvable' })
    res.json(article)
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

// Protected: create
router.post('/', requireAuth, async (req, res) => {
  try {
    const article = new Article(req.body)
    await article.save()
    res.status(201).json(article)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Protected: update
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).json({ error: 'Article introuvable' })
    Object.assign(article, req.body)
    await article.save()
    res.json(article)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Protected: delete
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id)
    if (!article) return res.status(404).json({ error: 'Article introuvable' })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'Erreur serveur' })
  }
})

export default router
