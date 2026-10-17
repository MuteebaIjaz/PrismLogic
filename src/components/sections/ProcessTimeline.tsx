import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { processSteps } from '../../data/process'
import { SectionHeading } from '../ui/SectionHeading'
import { CheckCircle2, Clock } from 'lucide-react'
import { cn } from '../../lib/utils'

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0)

  return (
    <section id="process" className="py-16 md:py-20 relative overflow-hidden bg-[#FAF9F6] text-gray-950 border-t border-gray-200/80">
      {/* Background soft glow */}
      <div className="absolute right-0 top-1/3 w-96 h-96 bg-primary/5 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          className="mb-8 sm:mb-10"
          whiteTitle="How We"
          highlightTitle="Work"
        />

        {/* Desktop / Tablet Step Timeline Tabs */}
        <div className="hidden lg:grid grid-cols-4 gap-4 mb-8">
          {processSteps.map((step, idx) => {
            const isActive = activeStep === idx

            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={cn(
                  'p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer relative',
                  isActive
                    ? 'bg-primary-light border-primary text-primary shadow-sm'
                    : 'bg-white border-indigo-100 hover:border-primary/40 text-gray-800'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={cn('text-xs font-mono font-bold', isActive ? 'text-primary' : 'text-gray-500')}>
                    {step.step}
                  </span>
                  <span className="text-[11px] font-mono text-gray-600 flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-primary" />
                    {step.duration}
                  </span>
                </div>
                <div className={cn('text-sm font-bold', isActive ? 'text-gray-950' : 'text-gray-700')}>
                  {step.title}
                </div>
                {isActive && (
                  <motion.div
                    layoutId="active-timeline-indicator"
                    className="absolute -bottom-1 left-4 right-4 h-0.5 bg-primary"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* 4-Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((item, idx) => {
            const isHighlighted = activeStep === idx

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onMouseEnter={() => setActiveStep(idx)}
                className={cn(
                  'rounded-2xl p-7 flex flex-col justify-between border transition-all duration-300 relative group bg-white',
                  isHighlighted
                    ? 'border-2 border-primary shadow-lg -translate-y-1'
                    : 'border-indigo-100 hover:border-primary/40 shadow-sm'
                )}
              >
                {/* Step Number Glyph */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary-light border border-indigo-200 flex items-center justify-center font-display font-bold text-lg text-primary transition-colors">
                      {item.step}
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-primary-light text-primary border border-primary/20">
                      {item.duration}
                    </span>
                  </div>

                  <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block mb-1">
                    {item.number}
                  </span>

                  <h3 className="text-xl font-bold text-gray-950 mb-3 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-700 leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Deliverables List */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-2">
                    Key Deliverables
                  </div>
                  <ul className="space-y-1.5">
                    {item.deliverables.map((deliv, dIdx) => (
                      <li key={dIdx} className="flex items-center text-xs text-gray-800">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary mr-2 shrink-0" />
                        <span className="truncate">{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
