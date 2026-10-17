import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface BeamDividerProps {
  className?: string
  variant?: 'split' | 'converge' | 'single'
}

export const BeamDivider: React.FC<BeamDividerProps> = ({ className }) => {
  return (
    <div className={cn('relative py-12 sm:py-16 flex items-center justify-center overflow-hidden', className)}>
      <div className="relative w-full max-w-5xl px-4 flex items-center justify-center">
        {/* Left beam line */}
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-primary relative">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 bg-primary shadow-[0_0_8px_rgba(79,70,229,0.5)]"
          />
        </div>

        {/* Center Prism Node */}
        <div className="relative mx-3 z-10 flex items-center justify-center">
          <div className="w-5 h-5 rounded-md rotate-45 bg-primary border border-indigo-200 shadow-[0_0_12px_rgba(79,70,229,0.3)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
        </div>

        {/* Right beam line */}
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-primary/40 to-primary relative">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 bg-primary shadow-[0_0_8px_rgba(79,70,229,0.5)]"
          />
        </div>
      </div>
    </div>
  )
}
