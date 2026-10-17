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
    <section id="faq" className="py-16 md:py-20 relative overflow-hidden bg-[#FAF9F6] text-gray-950 border-t border-gray-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          whiteTitle="Frequently Asked"
          highlightTitle="Questions"
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
                    ? 'bg-white border-primary shadow-md'
                    : 'bg-white border-indigo-100 hover:border-primary/40'
                )}
              >
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left text-gray-950 font-medium hover:text-primary transition-colors cursor-pointer select-none"
                >
                  <span className="text-base sm:text-lg font-semibold pr-4 font-sans">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full bg-primary-light border border-indigo-200 flex items-center justify-center shrink-0 transition-transform duration-200 text-primary',
                      isOpen && 'rotate-180 bg-primary text-white border-primary'
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
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-700 leading-relaxed border-t border-gray-100 mt-1 font-normal">
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
