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
  icon: React.ReactNode
}

const stripItems: StripItem[] = [
  { label: 'AI & Autonomous Workflows', icon: <BrainCircuit className="w-4 h-4 text-brand-cyan" /> },
  { label: 'Custom Software Development', icon: <Code2 className="w-4 h-4 text-brand-lavender" /> },
  { label: 'Web & Mobile Applications', icon: <Smartphone className="w-4 h-4 text-cyan-300" /> },
  { label: 'Cloud Infrastructure & DevOps', icon: <CloudCog className="w-4 h-4 text-purple-200" /> },
  { label: 'UI/UX & Product Design', icon: <Palette className="w-4 h-4 text-brand-lavender" /> },
  { label: 'Cybersecurity & Compliance', icon: <ShieldCheck className="w-4 h-4 text-brand-cyan" /> },
  { label: 'SaaS Engineering', icon: <Layers className="w-4 h-4 text-purple-300" /> },
  { label: 'n8n Workflow Automation', icon: <Workflow className="w-4 h-4 text-brand-cyan" /> },
  { label: 'Full-Stack Performance', icon: <Zap className="w-4 h-4 text-yellow-300" /> },
  { label: 'Global Distributed Systems', icon: <Globe className="w-4 h-4 text-brand-lavender" /> },
]

export const ScrollingStrip: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden py-3.5 sm:py-4 bg-gradient-to-r from-brand-violet via-purple-700 to-brand-indigo border-y border-violet-400/30 shadow-[0_0_25px_rgba(109,40,217,0.35)] select-none"
    >
      {/* Subtle top/bottom sheen */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/15 pointer-events-none" />

      {/* Left/Right Edge Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-brand-violet via-brand-violet/40 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-brand-indigo via-brand-indigo/40 to-transparent z-10 pointer-events-none" />

      {/* Continuous scrolling container */}
      <div className="flex w-max animate-marquee">
        {/* Set 1 */}
        <div className="flex items-center space-x-8 sm:space-x-12 shrink-0 pr-8 sm:pr-12">
          {stripItems.map((item, idx) => (
            <div key={`set1-${idx}`} className="flex items-center space-x-3 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
              <span>{item.label}</span>
              <span className="p-1 rounded-md bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center shrink-0">
                {item.icon}
              </span>
            </div>
          ))}
        </div>

        {/* Set 2 (Duplicated for seamless infinite loop without gaps) */}
        <div className="flex items-center space-x-8 sm:space-x-12 shrink-0 pr-8 sm:pr-12">
          {stripItems.map((item, idx) => (
            <div key={`set2-${idx}`} className="flex items-center space-x-3 text-white font-display font-bold text-xs sm:text-sm uppercase tracking-wider whitespace-nowrap">
              <span>{item.label}</span>
              <span className="p-1 rounded-md bg-black/20 backdrop-blur-sm border border-white/10 flex items-center justify-center shrink-0">
                {item.icon}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
