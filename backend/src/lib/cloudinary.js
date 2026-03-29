import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Extrait le public_id depuis une URL Cloudinary.
 * Ex: https://res.cloudinary.com/xxx/image/upload/v123/amelieFerriz/abc.webp
 *     → "amelieFerriz/abc"
 */
export function extractPublicId(url) {
  if (!url) return null
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/i)
  return match ? match[1] : null
}

export default cloudinary
