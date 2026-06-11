import { Router } from 'express'

const router = Router()

// Envoi via l'API HTTP de Brevo (https://api.brevo.com) plutôt que par SMTP :
// les ports SMTP sortants sont bloqués sur le plan gratuit de Render, alors que
// l'API passe par HTTPS (port 443).
router.post('/', async (req, res) => {
  const { name, email, phone, subject, message, consent } = req.body

  if (!name || !email || !subject || !message || !consent) {
    return res.status(400).json({ error: 'Données manquantes' })
  }

  // Basic email validation
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRe.test(email)) return res.status(400).json({ error: 'Email invalide' })

  const apiKey = process.env.BREVO_API_KEY
  const fromEmail = process.env.MAIL_FROM || process.env.SMTP_USER
  if (!apiKey || !fromEmail) {
    console.error('Config email manquante : BREVO_API_KEY ou MAIL_FROM/SMTP_USER absent')
    return res.status(500).json({ error: 'Configuration email manquante' })
  }

  const to = [process.env.CONTACT_EMAIL].filter(Boolean).map((e) => ({ email: e }))
  const cc = [process.env.CONTACT_EMAIL_CC].filter(Boolean).map((e) => ({ email: e }))

  const htmlContent = `
    <h2>Nouveau message depuis le site</h2>
    <table>
      <tr><td><strong>Nom</strong></td><td>${name}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email}</td></tr>
      ${phone ? `<tr><td><strong>Téléphone</strong></td><td>${phone}</td></tr>` : ''}
      <tr><td><strong>Sujet</strong></td><td>${subject}</td></tr>
    </table>
    <hr/>
    <p>${message.replace(/\n/g, '<br>')}</p>
  `

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { name: 'Site Amélie Ferriz', email: fromEmail },
        to,
        ...(cc.length ? { cc } : {}),
        replyTo: { email, name },
        subject: `[Contact] ${subject}`,
        htmlContent,
      }),
      // Évite que la requête reste bloquée si l'API ne répond pas
      signal: AbortSignal.timeout(15000),
    })

    if (!response.ok) {
      const detail = await response.text().catch(() => '')
      console.error('Brevo error:', response.status, detail)
      return res.status(500).json({ error: 'Erreur lors de l\'envoi' })
    }

    res.json({ ok: true })
  } catch (err) {
    console.error('Email error:', err.message)
    res.status(500).json({ error: 'Erreur lors de l\'envoi' })
  }
})

export default router
