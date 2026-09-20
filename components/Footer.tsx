'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="py-16 border-t border-border/50"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <p className="text-sm text-secondary">
            © {currentYear} Your Name. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  )
}