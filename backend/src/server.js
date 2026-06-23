import 'dotenv/config'
import app from './app.js'
import connectDB from './db.js'

// Capture les erreurs non catchées pour les voir dans les logs (local)
process.on('uncaughtException', (err) => {
  console.error('💥 uncaughtException:', err)
  process.exit(1)
})
process.on('unhandledRejection', (reason) => {
  console.error('💥 unhandledRejection:', reason)
  process.exit(1)
})

const PORT = process.env.PORT || 3001

connectDB()
  .then(() => {
    console.log('✅ MongoDB connecté')
    app.listen(PORT, () => console.log(`🚀 API démarrée sur http://localhost:${PORT}`))
  })
  .catch((err) => {
    console.error('❌ Erreur MongoDB :', err.message)
    process.exit(1)
  })
