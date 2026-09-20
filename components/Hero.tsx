'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6"
          >
            Hi, I'm [Your Name]
          </motion.h1>
          
          <motion.h2
            variants={itemVariants}
            className="text-2xl md:text-3xl text-secondary font-medium mb-8"
          >
            Full Stack Developer & Designer
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-base text-secondary max-w-2xl mb-12 leading-relaxed"
          >
            I create digital experiences that combine thoughtful design with robust engineering. 
            Passionate about building products that make a difference.
          </motion.p>
          
          <motion.button
            variants={itemVariants}
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-border px-8 py-3 text-sm font-medium hover:bg-primary hover:text-background transition-all duration-300"
          >
            View My Work
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}