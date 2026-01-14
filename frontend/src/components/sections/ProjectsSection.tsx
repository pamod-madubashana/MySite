import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Github, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "A full-featured e-commerce solution with real-time inventory, payment processing, and admin dashboard.",
    language: "TypeScript",
    stars: 128,
    forks: 34,
    topics: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    name: "AI Content Generator",
    description: "GPT-powered content generation tool with custom fine-tuning capabilities and multi-language support.",
    language: "Python",
    stars: 256,
    forks: 67,
    topics: ["FastAPI", "OpenAI", "React", "Redis"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    name: "Real-time Collaboration",
    description: "Figma-like collaborative canvas with real-time sync, cursors, and version history.",
    language: "TypeScript",
    stars: 89,
    forks: 21,
    topics: ["WebSocket", "Canvas", "CRDT", "Yjs"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  Python: "bg-yellow-500",
  JavaScript: "bg-amber-500",
  Go: "bg-cyan-500",
};

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 md:py-32 relative bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 text-sm font-medium text-secondary bg-secondary/10 rounded-full mb-4">
            Featured Work
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Recent <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of my recent work. Each project represents a unique challenge and learning experience.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-xl overflow-hidden glass hover-lift"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
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
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Button asChild variant="outline" size="lg" className="group">
            <Link to="/projects">
              <Code className="w-5 h-5 mr-2" />
              View All Projects
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
