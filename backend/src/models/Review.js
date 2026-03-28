import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  author: { type: String, required: true, trim: true },
  platform: { type: String, enum: ['google', 'linkedin', 'facebook', 'other'], default: 'google' },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  profileUrl: { type: String, trim: true },
}, { timestamps: true })

export default mongoose.model('Review', reviewSchema)
