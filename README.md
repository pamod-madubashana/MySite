# Personal Portfolio Platform

A futuristic personal portfolio platform with React frontend and Express backend featuring an admin panel for content management. Built with clean architecture and designed for easy deployment.

## 🚀 Features

- **Modern UI**: Futuristic, responsive design with smooth animations
- **Admin Panel**: Secure content management system
- **Blog System**: Article publishing with drafts and publishing controls
- **Project Showcase**: Portfolio project management with featured options
- **Dynamic Settings**: Configurable site settings and appearance
- **GitHub Integration**: Automatic fetching of GitHub repositories
- **Dark Mode**: Default dark theme with smooth transitions
- **SEO Optimized**: Proper meta tags and structured data

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Radix UI, Framer Motion
- **Backend**: Express.js, TypeScript, MongoDB with Mongoose
- **Authentication**: JWT-based authentication with role-based access
- **Deployment**: GitHub Pages (frontend), Render/Railway (backend)

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local instance or Atlas)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/mySite.git
cd mySite
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Or install both at root level
cd ..
npm install
```

### 3. Configure Environment Variables

#### Backend Configuration

Create `.env` file in the `backend` directory:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Port
PORT=5000

# Frontend URL
FRONTEND_URL=http://localhost:8080

# GitHub Username (for fetching repositories)
GITHUB_USERNAME=your-github-username

# GitHub API Token (optional - for enhanced GitHub integration)
GITHUB_TOKEN=your_github_token
```

#### Frontend Configuration

Create `.env` file in the `frontend` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Run the Application

#### Development Mode

```bash
# From the root directory
npm run dev

# Or separately
cd backend && npm run dev
cd frontend && npm run dev
```

#### Production Mode

```bash
# Build frontend
cd frontend && npm run build

# Start backend
cd backend && npm start
```

## 🔐 Admin Panel Access

1. Register an account through the `/register` endpoint
2. Update the user's role to `admin` in the database directly:
   ```javascript
   db.users.updateOne(
     { email: "your-email@example.com" },
     { $set: { role: "admin" } }
   )
   ```
3. Access the admin panel at `/admin`

## 📦 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Articles
- `GET /api/articles` - Get published articles
- `GET /api/articles/:id` - Get specific article
- `GET /api/articles/all` - Get all articles (admin only)
- `POST /api/articles` - Create article (admin only)
- `PUT /api/articles/:id` - Update article (admin only)
- `DELETE /api/articles/:id` - Delete article (admin only)

### Projects
- `GET /api/projects` - Get published projects
- `GET /api/projects/:id` - Get specific project
- `GET /api/projects/all` - Get all projects (admin only)
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Settings
- `GET /api/settings` - Get site settings
- `PUT /api/settings` - Update site settings (admin only)

## 🚢 Deployment

### Frontend to GitHub Pages

1. Update `base` in `frontend/vite.config.ts` to match your repository name
2. Push to main branch
3. GitHub Actions workflow will automatically deploy to GitHub Pages

### Backend to Render/Railway

1. Create an account on Render or Railway
2. Connect your GitHub repository
3. Set environment variables in the platform dashboard
4. Deploy the backend service

### Manual Deployment

For Render, add this to your `backend/package.json`:

```json
{
  "scripts": {
    "start": "node dist/index.js",
    "heroku-postbuild": "echo 'Build completed'"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

If you encounter any issues or have questions, please open an issue in the repository.