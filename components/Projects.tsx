'use client'

import { motion } from 'framer-motion'

const projects = [
  {
    number: '01',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with modern payment integration and admin dashboard.',
    tech: 'Next.js, TypeScript, Stripe, PostgreSQL',
    link: '#'
  },
  {
    number: '02',
    title: 'Task Management App',
    description: 'Collaborative project management tool with real-time updates and team features.',
    tech: 'React, Node.js, Socket.io, MongoDB',
    link: '#'
  },
  {
    number: '03',
    title: 'Analytics Dashboard',
    description: 'Data visualization platform for business intelligence and reporting.',
    tech: 'Vue.js, D3.js, Python, FastAPI',
    link: '#'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut'
    }
  }
}

export default function Projects() {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-20"
          >
            Selected Projects
          </motion.h2>
          
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={project.number}
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <div className="flex items-start gap-8 md:gap-16 py-8 border-b border-border/50 hover:border-border transition-colors">
                  <div className="text-2xl md:text-3xl font-bold text-secondary group-hover:text-primary transition-colors">
                    {project.number}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:underline-animation">
                      {project.title}
                    </h3>
                    
                    <p className="text-base text-secondary mb-4 max-w-2xl leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="text-sm text-secondary">
                      {project.tech}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}