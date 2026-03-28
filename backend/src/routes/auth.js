import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router = Router()

// Single-user: password only auth (no username needed)
// The hashed password is stored in env (ADMIN_PASSWORD_HASH)
router.post('/login', async (req, res) => {
  const { password } = req.body
  if (!password) return res.status(400).json({ error: 'Mot de passe requis' })

  const hash = process.env.ADMIN_PASSWORD_HASH
  if (!hash) return res.status(500).json({ error: 'Configuration manquante' })

  const valid = await bcrypt.compare(password, hash)
  if (!valid) return res.status(401).json({ error: 'Mot de passe incorrect' })

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.json({ token })
})

export default router
