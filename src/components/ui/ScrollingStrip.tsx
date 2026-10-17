import React from 'react'
import { motion } from 'framer-motion'
import {
  BrainCircuit,
  Code2,
  Smartphone,
  CloudCog,
  Palette,
  ShieldCheck,
  Zap,
  Layers,
  Globe,
  Workflow,
} from 'lucide-react'

interface StripItem {
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const stripItems: StripItem[] = [
  { label: 'AI & Autonomous Workflows', icon: BrainCircuit },
  { label: 'Custom Software Development', icon: Code2 },
  { label: 'Web & Mobile Applications', icon: Smartphone },
  { label: 'Cloud Infrastructure & DevOps', icon: CloudCog },
  { label: 'UI/UX & Product Design', icon: Palette },
  { label: 'Cybersecurity & Compliance', icon: ShieldCheck },
  { label: 'SaaS Engineering', icon: Layers },
  { label: 'n8n Workflow Automation', icon: Workflow },
  { label: 'Full-Stack Performance', icon: Zap },
  { label: 'Global Distributed Systems', icon: Globe },
]

export const ScrollingStrip: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden py-3.5 sm:py-4 bg-primary border-y border-indigo-500/30 shadow-[0_0_20px_rgba(79,70,229,0.25)] select-none"
    >
      {/* Subtle top/bottom sheen */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10 pointer-events-none" />

      {/* Left/Right Edge Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

      {/* Continuous scrolling container */}
      <div className="flex w-max animate-marquee">
        {/* Set 1 */}
        <div className="flex items-center space-x-8 sm:space-x-12 shrink-0 pr-8 sm:pr-12">
          {stripItems.map((item, idx) => (
            <div key={`set1-${idx}`} className="flex items-center space-x-3 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
              <span>{item.label}</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </span>
            </div>
          ))}
        </div>

        {/* Set 2 (Duplicated for seamless infinite loop without gaps) */}
        <div className="flex items-center space-x-8 sm:space-x-12 shrink-0 pr-8 sm:pr-12">
          {stripItems.map((item, idx) => (
            <div key={`set2-${idx}`} className="flex items-center space-x-3 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
              <span>{item.label}</span>
              <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                <item.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
