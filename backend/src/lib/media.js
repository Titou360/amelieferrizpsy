import crypto from 'crypto'
import Media from '../models/Media.js'

const MIME_EXT = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
}

/**
 * Enregistre une image (data-URI base64) dans MongoDB et renvoie son URL
 * publique relative `/api/media/file/<filename>`.
 */
export async function saveMedia(dataUri, category = 'general') {
  const match = /^data:([^;]+);base64,(.+)$/s.exec(dataUri || '')
  if (!match) throw new Error('Image base64 invalide')

  const mimetype = match[1]
  const base64 = match[2]
  const size = Math.floor((base64.length * 3) / 4)
  const ext = MIME_EXT[mimetype] || 'bin'
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}.${ext}`

  await Media.create({ filename, dataUri, mimetype, size, category })
  return `/api/media/file/${filename}`
}

/**
 * Supprime l'image correspondant à une URL `/api/media/file/...`.
 * No-op silencieux pour les anciennes URL Cloudinary ou externes.
 */
export async function deleteMediaByUrl(url) {
  if (!url) return
  const m = /\/api\/media\/file\/([^/?#]+)/.exec(url)
  if (!m) return
  await Media.deleteOne({ filename: m[1] }).catch(() => {})
}
