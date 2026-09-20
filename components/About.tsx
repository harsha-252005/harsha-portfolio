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

export default function About() {
  return (
    <section id="about" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
              About
            </h2>
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-6">
            <p className="text-base text-secondary leading-relaxed">
              I'm a passionate developer with expertise in modern web technologies. 
              I enjoy creating seamless user experiences and robust backend systems.
            </p>
            
            <p className="text-base text-secondary leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, 
              contributing to open source projects, or sharing knowledge with the developer community.
            </p>
            
            <div className="pt-4">
              <h3 className="text-lg font-semibold mb-4">Technologies I work with:</h3>
              <div className="grid grid-cols-2 gap-2 text-sm text-secondary">
                <div>React / Next.js</div>
                <div>TypeScript</div>
                <div>Node.js</div>
                <div>Python</div>
                <div>PostgreSQL</div>
                <div>AWS</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}