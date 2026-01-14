import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Star, GitFork, ExternalLink, Github, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const allProjects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard. Built with a focus on performance and scalability.",
    language: "TypeScript",
    stars: 128,
    forks: 34,
    topics: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    name: "AI Content Generator",
    description: "GPT-powered content generation tool with custom fine-tuning capabilities and multi-language support. Includes a beautiful dashboard for analytics.",
    language: "Python",
    stars: 256,
    forks: 67,
    topics: ["FastAPI", "OpenAI", "React", "Redis"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 3,
    name: "Real-time Collaboration",
    description: "Figma-like collaborative canvas with real-time sync, cursors, and version history. Uses CRDTs for conflict-free editing.",
    language: "TypeScript",
    stars: 89,
    forks: 21,
    topics: ["WebSocket", "Canvas", "CRDT", "Yjs"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 4,
    name: "DevOps Dashboard",
    description: "Kubernetes cluster monitoring with real-time metrics, alerting, and deployment automation. Integrates with major cloud providers.",
    language: "Go",
    stars: 145,
    forks: 38,
    topics: ["Kubernetes", "Prometheus", "Grafana", "React"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    name: "Social Media Analytics",
    description: "Comprehensive analytics platform for social media managers. Track engagement, schedule posts, and generate reports.",
    language: "TypeScript",
    stars: 72,
    forks: 15,
    topics: ["Next.js", "Chart.js", "Twitter API", "Meta API"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 6,
    name: "IoT Home Automation",
    description: "Smart home control system with voice commands, scheduling, and energy monitoring. Works with major IoT protocols.",
    language: "Python",
    stars: 98,
    forks: 28,
    topics: ["Raspberry Pi", "MQTT", "React Native", "TensorFlow"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

const languages = ["All", "TypeScript", "Python", "Go", "JavaScript"];

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  Python: "bg-yellow-500",
  JavaScript: "bg-amber-500",
  Go: "bg-cyan-500",
};

const Projects = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = allProjects.filter((project) => {
    const matchesLanguage = selectedLanguage === "All" || project.language === selectedLanguage;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLanguage && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <span className="inline-block px-4 py-1 text-sm font-medium text-secondary bg-secondary/10 rounded-full mb-6">
                My Work
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Featured <span className="text-gradient">Projects</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                A collection of projects I've built over the years. From full-stack applications 
                to open-source tools, each represents a unique challenge and learning experience.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col md:flex-row items-center justify-between gap-6 p-6 rounded-xl glass"
            >
              {/* Search */}
              <div className="relative w-full md:w-auto md:flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-background border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                />
              </div>

              {/* Language Filter */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <Filter className="w-4 h-4 text-muted-foreground" />
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 text-sm rounded-full transition-all duration-200 ${
                      selectedLanguage === lang
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted/50 text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLanguage + searchQuery}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project, index) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group rounded-xl overflow-hidden glass hover-lift"
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      {project.featured && (
                        <span className="absolute top-3 left-3 z-10 px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                          Featured
                        </span>
                      )}
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4 gap-2">
                        <Button size="sm" variant="secondary" className="gap-1" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                            Live
                          </a>
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="w-4 h-4" />
                            Code
                          </a>
                        </Button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`w-3 h-3 rounded-full ${languageColors[project.language] || "bg-muted"}`} />
                        <span className="text-xs font-mono text-muted-foreground">
                          {project.language}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Topics */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-1 text-xs font-mono bg-muted/50 rounded-md"
                          >
                            {topic}
                          </span>
                        ))}
                        {project.topics.length > 3 && (
                          <span className="px-2 py-1 text-xs text-muted-foreground">
                            +{project.topics.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4" />
                          {project.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <GitFork className="w-4 h-4" />
                          {project.forks}
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-muted-foreground">No projects found matching your criteria.</p>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
