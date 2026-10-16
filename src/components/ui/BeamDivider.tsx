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
        {/* Left single beam line */}
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/60 to-brand-cyan relative">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 bg-brand-cyan shadow-[0_0_8px_#22D3EE]"
          />
        </div>

        {/* Center Prism Node */}
        <div className="relative mx-3 z-10 flex items-center justify-center">
          <div className="w-6 h-6 rounded-md rotate-45 bg-gradient-to-br from-brand-violet to-brand-indigo border border-violet-300/40 shadow-[0_0_15px_rgba(109,40,217,0.6)] flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-brand-cyan shadow-[0_0_6px_#22D3EE]" />
          </div>
        </div>

        {/* Right 3 parallel split lines (Motif: One beam into three lines) */}
        <div className="flex-1 flex flex-col justify-center gap-1.5 relative">
          {/* Line 1 - Top Lavender */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.85 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
            className="h-[1px] w-full origin-left bg-gradient-to-r from-brand-lavender via-brand-violet to-transparent shadow-[0_0_6px_rgba(196,181,253,0.4)]"
          />

          {/* Line 2 - Center Violet */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="h-[1.5px] w-full origin-left bg-gradient-to-r from-brand-violet via-brand-indigo to-transparent shadow-[0_0_8px_rgba(109,40,217,0.6)]"
          />

          {/* Line 3 - Bottom Cyan/Indigo */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.7 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
            className="h-[1px] w-full origin-left bg-gradient-to-r from-brand-indigo via-brand-cyan/40 to-transparent"
          />
        </div>
      </div>
    </div>
  )
}
