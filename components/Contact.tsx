'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut'
    }
  }
}

export default function Contact() {
  return (
    <section id="contact" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold tracking-tight mb-12"
          >
            Let's Work Together
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="mb-8"
          >
            <a
              href="mailto:your.email@example.com"
              className="text-2xl md:text-3xl font-medium underline-animation hover:text-secondary transition-colors"
            >
              your.email@example.com
            </a>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="flex justify-center space-x-8"
          >
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-primary underline-animation transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-primary underline-animation transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-secondary hover:text-primary underline-animation transition-colors"
            >
              Twitter
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}