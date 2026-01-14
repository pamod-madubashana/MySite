import { motion } from "framer-motion";
import { Code2, Palette, Zap, Globe } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "React, TypeScript, Next.js, Tailwind CSS",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Backend Development",
    description: "Node.js, Express, PostgreSQL, MongoDB",
    color: "secondary",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Figma, Framer, Motion Design",
    color: "accent",
  },
  {
    icon: Globe,
    title: "DevOps & Cloud",
    description: "AWS, Docker, CI/CD, Vercel",
    color: "primary",
  },
];

const techStack = [
  { name: "React", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "PostgreSQL", level: 80 },
  { name: "AWS", level: 75 },
];

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full mb-4">
            About Me
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Crafting Digital <span className="text-gradient">Experiences</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            With over 5 years of experience in full-stack development, I specialize in building scalable web applications that users love.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-xl glass hover-lift cursor-pointer"
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${skill.color}/10 group-hover:shadow-glow transition-shadow duration-300`}
              >
                <skill.icon className={`w-6 h-6 text-${skill.color}`} />
              </div>
              <h3 className="text-lg font-semibold mb-2">{skill.title}</h3>
              <p className="text-sm text-muted-foreground">{skill.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Progress */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="text-xl font-semibold mb-8 text-center">
            Technical Proficiency
          </h3>
          <div className="space-y-6">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-sm">{tech.name}</span>
                  <span className="text-sm text-muted-foreground">{tech.level}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${tech.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
