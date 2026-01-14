import mongoose, { Document, Schema } from 'mongoose'

export interface ISettings extends Document {
  aboutContent: string
  featuredRepos: string[]
  themeOptions: {
    primaryColor: string
    secondaryColor: string
    fontFamily: string
  }
  siteSections: {
    showAbout: boolean
    showProjects: boolean
    showArticles: boolean
    showContact: boolean
  }
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
  }
  githubUsername?: string
  updatedAt: Date
}

const settingsSchema = new Schema<ISettings>({
  aboutContent: {
    type: String,
    default: 'Welcome to my portfolio!'
  },
  featuredRepos: [{
    type: String,
    default: []
  }],
  themeOptions: {
    primaryColor: {
      type: String,
      default: '#3b82f6'
    },
    secondaryColor: {
      type: String,
      default: '#8b5cf6'
    },
    fontFamily: {
      type: String,
      default: 'Inter, sans-serif'
    }
  },
  siteSections: {
    showAbout: {
      type: Boolean,
      default: true
    },
    showProjects: {
      type: Boolean,
      default: true
    },
    showArticles: {
      type: Boolean,
      default: true
    },
    showContact: {
      type: Boolean,
      default: true
    }
  },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
    email: String
  },
  githubUsername: {
    type: String,
    default: process.env.GITHUB_USERNAME || ''
  }
}, {
  timestamps: true
})

export default mongoose.model<ISettings>('Settings', settingsSchema)