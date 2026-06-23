import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/amelie-ferriz'

// Connexion Mongoose mise en cache entre les invocations.
// Sur Vercel (serverless), chaque appel peut réutiliser une fonction « chaude » :
// on évite ainsi de rouvrir une connexion à chaque requête.
let cached = global._mongoose
if (!cached) {
  cached = global._mongoose = { conn: null, promise: null }
}

export default async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    const opts = { bufferCommands: false }

    // DEV UNIQUEMENT : contourne l'inspection HTTPS de l'antivirus en local
    // (« unable to verify the first certificate »). Jamais en production.
    if (process.env.DEV_TLS_INSECURE === 'true') {
      opts.tlsAllowInvalidCertificates = true
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m)
  }

  try {
    cached.conn = await cached.promise
  } catch (err) {
    cached.promise = null
    throw err
  }
  return cached.conn
}
