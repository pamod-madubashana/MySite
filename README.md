<div align="center">

# Personal Portfolio Platform

<img src="assets/favicon.png" width="200" alt="Personal Portfolio Platform Icon" />

Full-stack portfolio platform with admin dashboard and CMS capabilities.

</div>

## Tech Stack

- Frontend: React, TypeScript, Vite, Tailwind CSS, Framer Motion, React Router
- Backend: Node.js, Express, TypeScript, MongoDB, Mongoose
- Database: MongoDB
- Other: REST API, JWT Authentication, Multer (file upload), Nodemailer

## Why This Project Exists

- Problem: Need for a professional portfolio website with content management capabilities
- Goal: Create a customizable portfolio platform with admin dashboard for easy content updates
- Outcome: Fully functional portfolio site with blog, project showcase, and admin panel

## Project Structure

```
.
├── Frontend/               # Main frontend application (React/Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API clients
│   │   └── contexts/       # React contexts
│   └── package.json
├── Backend/                # Backend API (Express/Node.js)
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   └── middleware/     # Custom middleware
│   └── package.json
├── assets/                 # Static assets
└── README.md
```

## Screenshots

Screenshots will be added soon.

## Getting Started

### Prerequisites

- Node.js + npm
- MongoDB (for the backend)
- Git with submodule support

### Setup

```bash
git clone https://github.com/pamod-madubashana/MySite.git
cd MySite
git submodule update --init --recursive
npm install
cd Frontend && npm install && cd ..
cd Backend && npm install && cd ..
```

Then create the env files from the examples:

```bash
cp Frontend/.env.example Frontend/.env
cp Backend/.env.example Backend/.env
```

### Commands (run from repository root)

| Command | Description |
| --- | --- |
| `npm run dev` | Run frontend + backend together |
| `npm run dev:frontend` | Run only the frontend dev server |
| `npm run dev:backend` | Run only the backend dev server |
| `npm run build` | Production build of the frontend (sitemap + prerender) |
| `npm run start` | Start the compiled backend |

Or work inside an app directly:

```bash
cd Frontend && npm run dev   # Vite dev server
cd Backend && npm run dev    # Express dev server (nodemon)
```

## Key Features

- Responsive portfolio website with modern UI
- Admin dashboard for content management
- Blog/article publishing system
- Project showcase with detailed views
- Timeline and experience tracking
- Technology skills management
- Contact form with email notifications
- File upload capabilities
- User authentication and authorization
- RESTful API architecture
