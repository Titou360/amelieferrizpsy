import mongoose from 'mongoose'

const mediaSchema = new mongoose.Schema({
  filename: { type: String, required: true, unique: true, index: true },
  dataUri:  { type: String, required: true },  // data:<mime>;base64,<...>
  mimetype: { type: String, required: true },
  size:     { type: Number, default: 0 },       // octets (approx.)
  category: { type: String, default: 'general' },
}, { timestamps: true })

export default mongoose.model('Media', mediaSchema)
