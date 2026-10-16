import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Users } from 'lucide-react'
import { Button } from '../ui/Button'

export const Hero: React.FC = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="top" className="relative pt-28 pb-14 md:pt-36 md:pb-16 overflow-hidden bg-white text-gray-900">
      {/* Background Soft Ambient Purple Wash */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[680px] pointer-events-none -z-10 overflow-hidden">
        {/* Soft blurred violet/indigo glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[450px] bg-gradient-to-b from-brand-violet/10 via-brand-indigo/5 to-transparent blur-[120px] rounded-full pointer-events-none" />

        {/* Ambient pinpoint accent */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[300px] h-[180px] bg-brand-cyan/10 blur-[90px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex justify-center mb-5"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-brand-violet/10 text-brand-violet border border-brand-violet/20 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-brand-violet animate-pulse" />
            <span>Enterprise Software &amp; AI Engineering Studio</span>
          </div>
        </motion.div>

        {/* Main Headline: Authoritative Prominence with Brand Purple Gradient Accent */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-3xl sm:text-5xl lg:text-[3.65rem] font-extrabold tracking-[-0.035em] text-gray-950 max-w-5xl mx-auto leading-[1.12] sm:leading-[1.08]"
        >
          Transform Complex Demands into{' '}
          <span className="bg-gradient-to-r from-brand-violet via-purple-600 to-brand-indigo bg-clip-text text-transparent inline-block">
            High-Velocity Digital Reality.
          </span>
        </motion.h1>

        {/* Refined Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          We engineer enterprise-grade web applications, autonomous AI pipelines, and resilient cloud systems with crystal clarity in every build.
        </motion.p>

        {/* Dual CTAs with balanced spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5"
        >
          <a href="#contact" onClick={scrollToContact} className="w-full sm:w-auto">
            <Button
              variant="glow"
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-3.5 shadow-sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Get a Free Consultation
            </Button>
          </a>

          <a href="#work" onClick={scrollToWork} className="w-full sm:w-auto group">
            <Button
              variant="secondary-light"
              size="lg"
              className="w-full sm:w-auto text-base px-8 py-3.5"
              rightIcon={<ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-brand-violet group-hover:translate-x-0.5 transition-all" />}
            >
              See Our Work
            </Button>
          </a>
        </motion.div>

        {/* Credibility Strip beneath */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-11 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6 sm:gap-9 text-xs sm:text-sm text-gray-600"
        >
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              {['bg-violet-600', 'bg-indigo-600', 'bg-cyan-600', 'bg-purple-600'].map((bg, idx) => (
                <div
                  key={idx}
                  className={`w-6 h-6 rounded-full border-2 border-white shadow-xs flex items-center justify-center text-[9px] font-bold text-white ${bg}`}
                >
                  ✓
                </div>
              ))}
            </div>
            <span className="text-gray-800 font-medium">100% In-House Senior Engineers</span>
          </div>

          <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />

          <div className="flex items-center space-x-1.5">
            <span className="text-amber-500">★★★★★</span>
            <span className="text-gray-800 font-semibold">4.9/5 Rating</span>
          </div>

          <div className="h-4 w-[1px] bg-gray-200 hidden sm:block" />

          <div className="flex items-center space-x-2 text-gray-800">
            <Users className="w-4 h-4 text-brand-violet" />
            <span className="font-medium">Trusted By 100+ Clients</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
