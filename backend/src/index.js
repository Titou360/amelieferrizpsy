import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'

import authRouter from './routes/auth.js'
import reviewsRouter from './routes/reviews.js'
import articlesRouter from './routes/articles.js'
import contactRouter from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 3001

// Security
app.use(helmet())
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim())

app.use(cors({
  origin: (origin, cb) => {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return cb(null, true)
    if (allowedOrigins.some(o => origin === o || origin.endsWith('.vercel.app'))) {
      return cb(null, true)
    }
    cb(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))
app.use(express.json({ limit: '5mb' }))

// Rate limiting on contact/auth
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 30, standardHeaders: true, legacyHeaders: false })
app.use('/api/auth', limiter)
app.use('/api/contact', limiter)

// Routes
app.use('/api/auth', authRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/articles', articlesRouter)
app.use('/api/contact', contactRouter)

// Health check
app.get('/api/health', (_, res) => res.json({ ok: true }))

// Connect MongoDB then start
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/amelie-ferriz')
  .then(() => {
    console.log('✅ MongoDB connecté')
    app.listen(PORT, () => console.log(`🚀 API démarrée sur http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB :', err.message)
    process.exit(1)
  })
