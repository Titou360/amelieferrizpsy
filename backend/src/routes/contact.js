import { Router } from 'express'
import nodemailer from 'nodemailer'

const router = Router()

router.post('/', async (req, res) => {
  const { name, email, phone, subject, message, consent } = req.body

  if (!name || !email || !subject || !message || !consent) {
    return res.status(400).json({ error: 'Données manquantes' })
  }

  // Basic email validation
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) return res.status(400).json({ error: 'Email invalide' })

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Site Amélie Ferriz" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'contact@amelieferriz.fr',
      replyTo: email,
      subject: `[Contact] ${subject}`,
      html: `
        <h2>Nouveau message depuis le site</h2>
        <table>
          <tr><td><strong>Nom</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          ${phone ? `<tr><td><strong>Téléphone</strong></td><td>${phone}</td></tr>` : ''}
          <tr><td><strong>Sujet</strong></td><td>${subject}</td></tr>
        </table>
        <hr/>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error('Email error:', err.message)
    res.status(500).json({ error: 'Erreur lors de l\'envoi' })
  }
})

export default router
