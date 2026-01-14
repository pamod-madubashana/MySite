import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    slug: "building-scalable-react-apps",
    title: "Building Scalable React Applications: A Complete Guide",
    excerpt: "Learn the architectural patterns and best practices for building React applications that can grow with your team and user base.",
    date: "2024-01-15",
    readTime: "12 min",
    tags: ["React", "Architecture", "TypeScript"],
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: 2,
    slug: "mastering-typescript-generics",
    title: "Mastering TypeScript Generics for Better Code",
    excerpt: "Deep dive into TypeScript generics and how to use them to write more flexible, reusable, and type-safe code.",
    date: "2024-01-08",
    readTime: "8 min",
    tags: ["TypeScript", "JavaScript", "Tutorial"],
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: 3,
    slug: "modern-css-techniques",
    title: "Modern CSS Techniques You Should Know in 2024",
    excerpt: "Explore the latest CSS features like container queries, cascade layers, and subgrid that are changing how we style web applications.",
    date: "2024-01-02",
    readTime: "10 min",
    tags: ["CSS", "Design", "Frontend"],
    image: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: 4,
    slug: "api-design-best-practices",
    title: "REST API Design Best Practices",
    excerpt: "A comprehensive guide to designing RESTful APIs that are intuitive, scalable, and maintainable.",
    date: "2023-12-20",
    readTime: "15 min",
    tags: ["API", "Backend", "Node.js"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    id: 5,
    slug: "database-optimization-tips",
    title: "Database Optimization Tips for Better Performance",
    excerpt: "Learn how to optimize your database queries and schema design for maximum performance in production applications.",
    date: "2023-12-15",
    readTime: "11 min",
    tags: ["Database", "PostgreSQL", "Performance"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop",
    featured: false,
  },
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const Articles = () => {
  const featuredArticle = articles.find((a) => a.featured);
  const regularArticles = articles.filter((a) => a.id !== featuredArticle?.id);

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
              <span className="inline-block px-4 py-1 text-sm font-medium text-accent bg-accent/10 rounded-full mb-6">
                Blog
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Thoughts & <span className="text-gradient">Ideas</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Writing about web development, programming best practices, and lessons 
                learned from building software at scale.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Featured Article */}
        {featuredArticle && (
          <section className="py-8">
            <div className="container mx-auto px-4">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group rounded-2xl overflow-hidden glass hover-lift"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 text-sm font-medium bg-primary text-primary-foreground rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredArticle.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {featuredArticle.readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {featuredArticle.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-3 py-1 text-xs font-mono bg-muted/50 rounded-full"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/articles/${featuredArticle.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-medium group/link"
                    >
                      Read Article
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group rounded-xl overflow-hidden glass hover-lift"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(article.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-mono bg-muted/50 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/articles/${article.slug}`}
                      className="inline-flex items-center gap-2 text-sm text-primary font-medium group/link"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Articles;
