# Key Features

<cite>
**Referenced Files in This Document**
- [App.tsx](file://personalSite/src/App.tsx)
- [index.ts](file://server/src/index.ts)
- [package.json](file://personalSite/package.json)
- [package.json](file://server/package.json)
- [Dashboard.tsx](file://personalSite/src/pages/Admin/Dashboard.tsx)
- [dashboardApi.ts](file://personalSite/src/api/dashboardApi.ts)
- [dashboardController.ts](file://server/src/controllers/dashboardController.ts)
- [ArticleManager.tsx](file://personalSite/src/pages/Admin/ArticleManager.tsx)
- [articleApi.ts](file://personalSite/src/api/articleApi.ts)
- [articleController.ts](file://server/src/controllers/articleController.ts)
- [ProjectManager.tsx](file://personalSite/src/pages/Admin/ProjectManager.tsx)
- [projectApi.ts](file://personalSite/src/api/projectApi.ts)
- [projectController.ts](file://server/src/controllers/projectController.ts)
- [Projects.tsx](file://personalSite/src/pages/Projects.tsx)
- [ProjectDetail.tsx](file://personalSite/src/pages/ProjectDetail.tsx)
- [TimelineManager.tsx](file://personalSite/src/pages/Admin/TimelineManager.tsx)
- [timelineApi.ts](file://personalSite/src/api/timelineApi.ts)
- [timelineController.ts](file://server/src/controllers/timelineController.ts)
- [TechSkillsManager.tsx](file://personalSite/src/pages/Admin/TechSkillsManager.tsx)
- [InterestsManager.tsx](file://personalSite/src/pages/Admin/InterestsManager.tsx)
- [TechStackManager.tsx](file://personalSite/src/pages/Admin/TechStackManager.tsx)
- [MessagesManager.tsx](file://personalSite/src/pages/Admin/MessagesManager.tsx)
- [ContactSection.tsx](file://personalSite/src/components/sections/ContactSection.tsx)
- [contactApi.ts](file://personalSite/src/api/contactApi.ts)
- [contactController.ts](file://server/src/controllers/contactController.ts)
- [githubApi.ts](file://personalSite/src/api/githubApi.ts)
- [githubController.ts](file://server/src/controllers/githubController.ts)
- [AuthContext.tsx](file://personalSite/src/contexts/AuthContext.tsx)
- [Login.tsx](file://personalSite/src/pages/Auth/Login.tsx)
- [Register.tsx](file://personalSite/src/pages/Auth/Register.tsx)
- [RouteProtector.tsx](file://personalSite/src/components/RouteProtector.tsx)
- [AdminLayout.tsx](file://personalSite/src/components/layout/AdminLayout.tsx)
- [Navbar.tsx](file://personalSite/src/components/layout/Navbar.tsx)
- [Footer.tsx](file://personalSite/src/components/layout/Footer.tsx)
- [ProjectCard.tsx](file://personalSite/src/components/ui/ProjectCard.tsx)
- [HeroSection.tsx](file://personalSite/src/components/sections/HeroSection.tsx)
- [AboutSection.tsx](file://personalSite/src/components/sections/AboutSection.tsx)
- [ContactSection.tsx](file://personalSite/src/components/sections/ContactSection.tsx)
- [imageUploadHandler.ts](file://server/src/utils/imageUploadHandler.ts)
- [auth.ts](file://server/src/middleware/auth.ts)
- [Article.ts](file://server/src/models/Article.ts)
- [Project.ts](file://server/src/models/Project.ts)
- [Timeline.ts](file://server/src/models/Timeline.ts)
- [User.ts](file://server/src/models/User.ts)
</cite>

## Table of Contents
1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [Core Components](#core-components)
4. [Architecture Overview](#architecture-overview)
5. [Detailed Feature Documentation](#detailed-feature-documentation)
6. [Dependency Analysis](#dependency-analysis)
7. [Performance Considerations](#performance-considerations)
8. [Troubleshooting Guide](#troubleshooting-guide)
9. [Conclusion](#conclusion)

## Introduction
This document presents a comprehensive overview of the Personal Portfolio Platform’s core capabilities. It covers the responsive frontend built with modern UI patterns, the admin dashboard for content management, the blog/article publishing system with markdown rendering and media uploads, the project showcase with GitHub integration and filtering, the timeline and experience tracking system, the technology skills management, the contact form with notifications, and the RESTful backend with authentication and authorization. Practical examples and diagrams illustrate how features work together.

## Project Structure
The platform consists of:
- A React-based single-page application (frontend) with TypeScript and shadcn/ui components
- An Express.js backend with TypeScript, MongoDB via Mongoose, and REST APIs
- Shared UI components, routing, and authentication contexts
- Admin pages for managing content and settings
- Public pages for showcasing portfolio content

```mermaid
graph TB
subgraph "Frontend (React)"
A_App["App.tsx<br/>Routing & Layout"]
A_Admin["Admin Pages<br/>Dashboard, Managers"]
A_Public["Public Pages<br/>Home, Projects, Articles, About"]
A_API["API Clients<br/>dashboardApi, articleApi, projectApi, ..."]
A_Components["UI & Layout<br/>Navbar, Footer, ProjectCard"]
end
subgraph "Backend (Express)"
S_Index["index.ts<br/>Routes & Middleware"]
S_Routes["Routes<br/>/auth, /articles, /projects, /timeline, /contact, /github, /image-upload"]
S_Controllers["Controllers<br/>articleController, projectController, timelineController, contactController, githubController, imageUploadController"]
S_Middleware["Middleware<br/>auth, imageUploadHandler"]
S_Models["Models<br/>Article, Project, Timeline, User"]
end
A_App --> A_API
A_Admin --> A_API
A_Public --> A_API
A_API --> S_Index
S_Index --> S_Routes
S_Routes --> S_Controllers
S_Controllers --> S_Middleware
S_Controllers --> S_Models
```

**Diagram sources**
- [App.tsx](file://personalSite/src/App.tsx#L246-L355)
- [index.ts](file://server/src/index.ts#L1-L158)

**Section sources**
- [App.tsx](file://personalSite/src/App.tsx#L141-L356)
- [index.ts](file://server/src/index.ts#L1-L158)

## Core Components
- Routing and layout: Protected routes, lazy-loaded pages, and animated transitions
- Authentication context and guards for admin-only areas
- Admin dashboard with stats and recent activity
- Content managers for articles, projects, timeline, skills, interests, tech stack, and messages
- Public showcases for projects and articles with GitHub integration
- Contact form with notifications and message management
- REST endpoints for CRUD operations, media uploads, and GitHub data retrieval

**Section sources**
- [App.tsx](file://personalSite/src/App.tsx#L232-L355)
- [AuthContext.tsx](file://personalSite/src/contexts/AuthContext.tsx)
- [RouteProtector.tsx](file://personalSite/src/components/RouteProtector.tsx)
- [AdminLayout.tsx](file://personalSite/src/components/layout/AdminLayout.tsx)

## Architecture Overview
The frontend uses React Router for navigation and @tanstack/react-query for caching and optimistic updates. The backend exposes REST endpoints secured by JWT middleware and supports file uploads and GitHub API integration.

```mermaid
sequenceDiagram
participant Browser as "Browser"
participant Frontend as "React App"
participant Backend as "Express Server"
participant DB as "MongoDB"
Browser->>Frontend : Navigate to protected admin route
Frontend->>Frontend : Check AuthContext (token)
Frontend->>Backend : GET /dashboard/enhanced/dashboard (Bearer token)
Backend->>DB : Aggregate stats & recent activity
DB-->>Backend : Results
Backend-->>Frontend : Dashboard data
Frontend-->>Browser : Render dashboard cards & activity
```

**Diagram sources**
- [App.tsx](file://personalSite/src/App.tsx#L254-L343)
- [dashboardApi.ts](file://personalSite/src/api/dashboardApi.ts#L121-L146)
- [dashboardController.ts](file://server/src/controllers/dashboardController.ts#L6-L103)

**Section sources**
- [App.tsx](file://personalSite/src/App.tsx#L232-L355)
- [index.ts](file://server/src/index.ts#L102-L116)

## Detailed Feature Documentation

### Responsive Portfolio Website with Modern UI
- Navigation and layout: Navbar, Footer, and animated transitions between routes
- Public pages: Home, About, Projects, Articles, and Project detail
- UI primitives: Cards, forms, dialogs, tooltips, and responsive grids
- SEO and accessibility: Helmet-based meta tags and semantic markup

Practical example
- The Projects page filters by tags and search, and enriches data with GitHub stats.

**Section sources**
- [Navbar.tsx](file://personalSite/src/components/layout/Navbar.tsx)
- [Footer.tsx](file://personalSite/src/components/layout/Footer.tsx)
- [HeroSection.tsx](file://personalSite/src/components/sections/HeroSection.tsx)
- [AboutSection.tsx](file://personalSite/src/components/sections/AboutSection.tsx)
- [Projects.tsx](file://personalSite/src/pages/Projects.tsx#L108-L200)
- [ProjectDetail.tsx](file://personalSite/src/pages/ProjectDetail.tsx#L1-L200)

### Admin Dashboard
- Purpose: Centralized overview of portfolio metrics and recent activity
- Data: Articles, projects, timeline items, tech skills, and user counts
- Behavior: Fetches enhanced dashboard data with caching and displays stats cards and recent activity feed

```mermaid
flowchart TD
Start(["Open Admin Dashboard"]) --> Load["Fetch Enhanced Dashboard Data"]
Load --> CacheCheck{"Cached?"}
CacheCheck --> |Yes| Render["Render Cached Data"]
CacheCheck --> |No| Request["HTTP GET /dashboard/enhanced/dashboard"]
Request --> Store["Store in Cache (2 min TTL)"]
Store --> Render
Render --> End(["View Stats & Activity"])
```

**Diagram sources**
- [Dashboard.tsx](file://personalSite/src/pages/Admin/Dashboard.tsx#L79-L105)
- [dashboardApi.ts](file://personalSite/src/api/dashboardApi.ts#L121-L146)
- [dashboardController.ts](file://server/src/controllers/dashboardController.ts#L6-L103)

**Section sources**
- [Dashboard.tsx](file://personalSite/src/pages/Admin/Dashboard.tsx#L79-L345)
- [dashboardApi.ts](file://personalSite/src/api/dashboardApi.ts#L70-L151)
- [dashboardController.ts](file://server/src/controllers/dashboardController.ts#L6-L147)

### Blog and Article Publishing System
- Features: Create, edit, delete, publish/unpublish, search, and filter articles
- Markdown support: Rendering via react-markdown with GFM plugin
- Media: Featured images uploaded via multipart/form-data
- Workflow: Draft/published statuses, tagging, and slugs

```mermaid
sequenceDiagram
participant Admin as "Admin UI"
participant API as "articleApi.ts"
participant BE as "articleController.ts"
participant IMG as "imageUploadHandler.ts"
participant DB as "MongoDB"
Admin->>API : createArticleWithImage(formData)
API->>BE : POST /articles (multipart/form-data)
BE->>IMG : Upload & process image
IMG-->>BE : Image URL
BE->>DB : Insert Article (slug, tags, status)
DB-->>BE : Saved Article
BE-->>API : Article + URL
API-->>Admin : Success
```

**Diagram sources**
- [ArticleManager.tsx](file://personalSite/src/pages/Admin/ArticleManager.tsx#L44-L95)
- [articleApi.ts](file://personalSite/src/api/articleApi.ts)
- [articleController.ts](file://server/src/controllers/articleController.ts#L90-L194)
- [imageUploadHandler.ts](file://server/src/utils/imageUploadHandler.ts)

**Section sources**
- [ArticleManager.tsx](file://personalSite/src/pages/Admin/ArticleManager.tsx#L14-L200)
- [articleApi.ts](file://personalSite/src/api/articleApi.ts)
- [articleController.ts](file://server/src/controllers/articleController.ts#L6-L200)

### Project Showcase and Filtering
- Public listing: Paginated, searchable, and tag-filterable projects
- GitHub integration: Stars and forks shown for linked repositories
- Detail view: Markdown README rendering, screenshots carousel, links, and metadata
- Caching: LocalStorage-based cache for projects and README content

```mermaid
sequenceDiagram
participant User as "Visitor"
participant Proj as "Projects.tsx"
participant API as "projectApi.ts"
participant GH as "GitHub API"
participant Cache as "LocalStorage"
User->>Proj : Open Projects
Proj->>Cache : Read cached projects
alt Cache Miss
Proj->>API : GET /projects?published=true
API-->>Proj : Projects[]
Proj->>GH : Fetch repo stats (stars/forks)
GH-->>Proj : Stats
Proj->>Cache : Write projects + stats
else Cache Hit
Cache-->>Proj : Projects + Stats
end
Proj-->>User : Render cards & filters
```

**Diagram sources**
- [Projects.tsx](file://personalSite/src/pages/Projects.tsx#L108-L189)
- [ProjectDetail.tsx](file://personalSite/src/pages/ProjectDetail.tsx#L76-L118)

**Section sources**
- [Projects.tsx](file://personalSite/src/pages/Projects.tsx#L108-L200)
- [ProjectDetail.tsx](file://personalSite/src/pages/ProjectDetail.tsx#L1-L200)
- [projectController.ts](file://server/src/controllers/projectController.ts#L25-L125)

### Timeline and Experience Tracking
- Management: Create, update, delete timeline entries with drag-and-reorder ordering
- Icons: Selectable icons per entry
- Ordering: Utilities to maintain contiguous order during insert/update/delete

```mermaid
flowchart TD
Start(["Admin Edits Timeline"]) --> Reorder["Recompute Order"]
Reorder --> Save["POST/PUT /timeline"]
Save --> Refresh["Reload Timeline List"]
Refresh --> End(["Display Ordered Timeline"])
```

**Diagram sources**
- [TimelineManager.tsx](file://personalSite/src/pages/Admin/TimelineManager.tsx#L86-L148)
- [timelineController.ts](file://server/src/controllers/timelineController.ts#L30-L88)

**Section sources**
- [TimelineManager.tsx](file://personalSite/src/pages/Admin/TimelineManager.tsx#L25-L200)
- [timelineController.ts](file://server/src/controllers/timelineController.ts#L1-L88)

### Technology Skills Management
- Skills manager: CRUD operations for skills entries
- Tech stack categories: Manage categories used by skills
- Interests: Manage personal interests shown on the site

Note: The managers for skills, tech stack categories, and interests are implemented similarly to other managers, leveraging shared patterns for forms, validation, and API integration.

**Section sources**
- [TechSkillsManager.tsx](file://personalSite/src/pages/Admin/TechSkillsManager.tsx)
- [TechStackManager.tsx](file://personalSite/src/pages/Admin/TechStackManager.tsx)
- [InterestsManager.tsx](file://personalSite/src/pages/Admin/InterestsManager.tsx)

### Contact Form and Message Management
- Public contact form: Captures name, email, subject, and message
- Notifications: Backend sends email notifications via nodemailer
- Admin management: Messages listing and actions for administrators

```mermaid
sequenceDiagram
participant Visitor as "Visitor"
participant FE as "ContactSection.tsx"
participant API as "contactApi.ts"
participant BE as "contactController.ts"
participant Mail as "Nodemailer"
Visitor->>FE : Submit contact form
FE->>API : POST /contact
API->>BE : Create message record
BE->>Mail : Send notification email
Mail-->>BE : Delivery status
BE-->>API : Success
API-->>FE : Confirmation
FE-->>Visitor : Success message
```

**Diagram sources**
- [ContactSection.tsx](file://personalSite/src/components/sections/ContactSection.tsx)
- [contactApi.ts](file://personalSite/src/api/contactApi.ts)
- [contactController.ts](file://server/src/controllers/contactController.ts)

**Section sources**
- [ContactSection.tsx](file://personalSite/src/components/sections/ContactSection.tsx)
- [contactApi.ts](file://personalSite/src/api/contactApi.ts)
- [contactController.ts](file://server/src/controllers/contactController.ts)

### File Uploads and Image Processing
- Supported uploads: Articles (featured image), Projects (thumbnail, screenshots)
- Implementation: Multer-based handlers and custom image processing utilities
- Storage: Backend stores processed images and returns URLs for content creation

**Section sources**
- [ArticleManager.tsx](file://personalSite/src/pages/Admin/ArticleManager.tsx#L36-L95)
- [ProjectManager.tsx](file://personalSite/src/pages/Admin/ProjectManager.tsx#L57-L161)
- [imageUploadHandler.ts](file://server/src/utils/imageUploadHandler.ts)
- [articleController.ts](file://server/src/controllers/articleController.ts#L138-L145)
- [projectController.ts](file://server/src/controllers/projectController.ts#L148-L200)

### Authentication and Authorization
- JWT-based authentication: Login and registration pages manage tokens
- Protected routes: Admin pages require a valid token
- Middleware: Auth guard validates tokens on protected endpoints

```mermaid
sequenceDiagram
participant User as "User"
participant Login as "Login.tsx"
participant BE as "authController.ts"
participant Guard as "auth.ts (middleware)"
User->>Login : Submit credentials
Login->>BE : POST /auth/login
BE-->>Login : JWT token
Login-->>User : Redirect to Admin
User->>Guard : Access /admin/*
Guard-->>User : Authorized or 401
```

**Diagram sources**
- [Login.tsx](file://personalSite/src/pages/Auth/Login.tsx)
- [Register.tsx](file://personalSite/src/pages/Auth/Register.tsx)
- [AuthContext.tsx](file://personalSite/src/contexts/AuthContext.tsx)
- [RouteProtector.tsx](file://personalSite/src/components/RouteProtector.tsx)
- [auth.ts](file://server/src/middleware/auth.ts)

**Section sources**
- [Login.tsx](file://personalSite/src/pages/Auth/Login.tsx)
- [Register.tsx](file://personalSite/src/pages/Auth/Register.tsx)
- [AuthContext.tsx](file://personalSite/src/contexts/AuthContext.tsx)
- [RouteProtector.tsx](file://personalSite/src/components/RouteProtector.tsx)
- [auth.ts](file://server/src/middleware/auth.ts)

### RESTful API Architecture
- Base URL: Frontend API client configured centrally
- Routes: Auth, Articles, Projects, Timeline, Settings, Tech Skills, Interests, Tech Stack Categories, Image Upload, Contact, Admin Messages, GitHub
- Security: Helmet, CORS, rate limiting, and JWT auth middleware
- Models: Mongoose models for Article, Project, Timeline, User

```mermaid
graph LR
FE["Frontend API Clients"] --> R1["/auth"]
FE --> R2["/articles"]
FE --> R3["/projects"]
FE --> R4["/timeline"]
FE --> R5["/settings"]
FE --> R6["/tech-skills"]
FE --> R7["/interests"]
FE --> R8["/tech-stack-categories"]
FE --> R9["/image-upload"]
FE --> R10["/contact"]
FE --> R11["/api/admin/messages"]
FE --> R12["/github"]
```

**Diagram sources**
- [index.ts](file://server/src/index.ts#L102-L116)
- [package.json](file://server/package.json#L6-L11)

**Section sources**
- [index.ts](file://server/src/index.ts#L1-L158)
- [package.json](file://server/package.json#L1-L40)

### GitHub Integration for Repository Showcase
- Public projects page: Fetches GitHub stats (stars, forks) for linked repositories
- Project detail: Renders README content from GitHub with caching and sanitization
- API: Dedicated GitHub controller and client utilities

**Section sources**
- [Projects.tsx](file://personalSite/src/pages/Projects.tsx#L127-L184)
- [ProjectDetail.tsx](file://personalSite/src/pages/ProjectDetail.tsx#L120-L200)
- [githubController.ts](file://server/src/controllers/githubController.ts)
- [githubApi.ts](file://personalSite/src/api/githubApi.ts)

## Dependency Analysis
- Frontend dependencies include React, React Router, TanStack Query, Radix UI, Framer Motion, React Markdown, and Tailwind-based UI components
- Backend dependencies include Express, Mongoose, bcrypt, JWT, Multer, Nodemailer, Helmet, CORS, and rate limiting

```mermaid
graph TB
subgraph "Frontend Dependencies"
F1["@tanstack/react-query"]
F2["react-router-dom"]
F3["lucide-react"]
F4["react-markdown + remark-gfm"]
F5["framer-motion"]
end
subgraph "Backend Dependencies"
B1["express"]
B2["mongoose"]
B3["bcryptjs"]
B4["jsonwebtoken"]
B5["multer"]
B6["nodemailer"]
B7["helmet"]
B8["cors"]
B9["express-rate-limit"]
end
```

**Diagram sources**
- [package.json](file://personalSite/package.json#L15-L74)
- [package.json](file://server/package.json#L12-L26)

**Section sources**
- [package.json](file://personalSite/package.json#L1-L113)
- [package.json](file://server/package.json#L1-L40)

## Performance Considerations
- Client-side caching: React Query caches and TTLs for dashboard and analytics
- LocalStorage caching: Projects and README content cached locally to reduce network usage
- Pagination and filtering: Server-side pagination and client-side filtering minimize payload sizes
- Asset delivery: CDN-friendly static build with prerendering and sitemap generation

[No sources needed since this section provides general guidance]

## Troubleshooting Guide
Common issues and resolutions:
- Authentication failures: Verify JWT token presence and expiration; ensure auth middleware is applied to protected routes
- CORS errors: Confirm allowed origins and credentials configuration in environment variables
- Upload failures: Check Multer configuration, file size limits, and image processing errors
- GitHub API throttling: Implement retries and caching for README and repo stats
- Rate limiting: Reduce request frequency or adjust server-side limits

**Section sources**
- [index.ts](file://server/src/index.ts#L38-L93)
- [auth.ts](file://server/src/middleware/auth.ts)
- [imageUploadHandler.ts](file://server/src/utils/imageUploadHandler.ts)
- [ProjectDetail.tsx](file://personalSite/src/pages/ProjectDetail.tsx#L120-L161)

## Conclusion
The Personal Portfolio Platform combines a modern, responsive frontend with a robust admin dashboard and a secure, RESTful backend. Its features span content management, media handling, GitHub integration, and user authentication, delivering a complete solution for professionals to showcase their work and experiences effectively.