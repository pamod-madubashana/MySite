import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'
import connectDB, { isDatabaseConnected } from './config/database'
import authRoutes from './routes/auth'
import articleRoutes from './routes/articles'
import githubRoutes from './routes/github'
import settingsRoutes from './routes/settings'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Connect to MongoDB (non-blocking)
connectDB().catch(err => {
  console.error('Failed to connect to database:', err);
});

// Security middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use(limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/articles', articleRoutes)
app.use('/api/github', githubRoutes)
app.use('/api/settings', settingsRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:8080'}`);
  
  // Check database connection status after startup
  setTimeout(() => {
    if (isDatabaseConnected()) {
      console.log('✅ Database connection established');
    } else {
      console.log('⚠️  Database connection failed - running in limited mode');
      console.log('💡 Some features may not work without database connectivity');
    }
  }, 2000);
})

export default app