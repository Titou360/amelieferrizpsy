import mongoose from 'mongoose'

function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  excerpt: { type: String, trim: true },
  content: { type: String, default: '' },
  category: { type: String, trim: true },
  coverImage: { type: String },
  published: { type: Boolean, default: false },
  publishedAt: { type: Date, default: Date.now },
  // Author always = Amélie Ferriz
}, { timestamps: true })

articleSchema.pre('save', async function (next) {
  if (!this.slug || this.isModified('title')) {
    let base = slugify(this.title)
    let slug = base
    let i = 1
    while (await mongoose.model('Article').exists({ slug, _id: { $ne: this._id } })) {
      slug = `${base}-${i++}`
    }
    this.slug = slug
  }
  next()
})

export default mongoose.model('Article', articleSchema)
