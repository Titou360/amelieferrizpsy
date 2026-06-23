import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import connectDB from './db.js'
import authRouter from './routes/auth.js'
import reviewsRouter from './routes/reviews.js'
import articlesRouter from './routes/articles.js'
import contactRouter from './routes/contact.js'
import uploadRouter from './routes/upload.js'
import faqsRouter from './routes/faqs.js'
import settingsRouter from './routes/settings.js'
import mediaRouter from './routes/media.js'

const app = express()

// Derrière le proxy Vercel : nécessaire pour express-rate-limit (X-Forwarded-For)
app.set('trust proxy', 1)

// Security
app.use(helmet())

const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())

app.use(cors({
  origin: (origin, cb) => {
    // Requêtes sans origine (apps mobiles, curl, même domaine…) autorisées
    if (!origin) return cb(null, true)
    if (allowedOrigins.some((o) => origin === o || origin.endsWith('.vercel.app'))) {
      return cb(null, true)
    }
    cb(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))

app.use(express.json({ limit: '5mb' }))

// Health check (liveness) — ne dépend pas de la base
app.get('/api/health', (_req, res) => res.json({ status: 'ok', ok: true }))

// Connexion MongoDB avant toute route qui en a besoin
app.use(async (_req, res, next) => {
  try {
    await connectDB()
    next()
  } catch (err) {
    console.error('❌ Erreur MongoDB :', err.message)
    res.status(503).json({ error: 'Service indisponible (base de données)' })
  }
})

// Rate limiting sur contact/auth
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false })
app.use('/api/auth', limiter)
app.use('/api/contact', limiter)

// Routes
app.use('/api/auth', authRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/contact', contactRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/faqs', faqsRouter)
app.use('/api/settings', settingsRouter)
app.use('/api/media', mediaRouter)

export default app
