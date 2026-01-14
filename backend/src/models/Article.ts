import mongoose, { Document, Schema } from 'mongoose'

export interface IArticle extends Document {
  title: string
  slug: string
  content: string
  excerpt: string
  status: 'draft' | 'published'
  tags: string[]
  featuredImage?: string
  author: mongoose.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const articleSchema = new Schema<IArticle>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: [true, 'Slug is required'],
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    maxlength: 500,
    default: ''
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  tags: [{
    type: String,
    trim: true
  }],
  featuredImage: {
    type: String,
    default: ''
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

// Index for search optimization
articleSchema.index({ title: 'text', content: 'text', tags: 'text' })
articleSchema.index({ status: 1, createdAt: -1 })

export default mongoose.model<IArticle>('Article', articleSchema)