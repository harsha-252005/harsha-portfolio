'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold tracking-tight">
            Your Name
          </div>
          <div className="flex space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-sm text-secondary hover:text-primary underline-animation transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-sm text-secondary hover:text-primary underline-animation transition-colors"
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-sm text-secondary hover:text-primary underline-animation transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </motion.nav>
  )
}