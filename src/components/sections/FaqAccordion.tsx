import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { faqsData } from '../../data/faqs'
import { SectionHeading } from '../ui/SectionHeading'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export const FaqAccordion: React.FC = () => {
  const [openIds, setOpenIds] = useState<string[]>(['pricing'])

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Frequently Asked Questions"
          badgeVariant="violet"
          whiteTitle="Everything You Need to Know Before"
          highlightTitle="Partnering With Us"
          description="Clear answers regarding pricing models, engineering timelines, technology choices, and how our lead qualification pipeline works."
        />

        <div className="space-y-4">
          {faqsData.map((faq) => {
            const isOpen = openIds.includes(faq.id)

            return (
              <div
                key={faq.id}
                className={cn(
                  'rounded-2xl border transition-all duration-200 overflow-hidden',
                  isOpen
                    ? 'bg-background-card/90 border-brand-violet/40 shadow-glow-subtle'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                )}
              >
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-white font-medium hover:text-brand-lavender transition-colors cursor-pointer select-none"
                >
                  <span className="text-base sm:text-lg font-semibold pr-4 font-sans">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180 bg-brand-violet/20 border-brand-violet/40 text-brand-lavender'
                    )}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-btn-${faq.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-300 leading-relaxed border-t border-white/5 mt-1 font-normal">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
