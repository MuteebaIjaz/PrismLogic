import React from 'react'
import { motion } from 'framer-motion'
import { testimonialsData } from '../../data/testimonials'
import { Star, ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

export const Testimonials: React.FC = () => {
  // Only display the first 3 testimonials in a single row
  const activeTestimonials = testimonialsData.slice(0, 3)

  return (
    <section id="testimonials" className="py-16 md:py-20 relative overflow-hidden bg-[#FAF9F6] text-gray-950 border-t border-gray-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-primary text-white border border-primary mb-3.5 shadow-xs">
            <span>Client Perspectives</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-gray-950 leading-[1.15]">
            What Our Clients{' '}
            <span className="text-primary inline-block">
              Say.
            </span>
          </h2>
        </motion.div>

        {/* 3-Column Single Row Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {activeTestimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
              className="h-full"
            >
              <div
                className={cn(
                  'relative rounded-[22px] bg-white border border-indigo-100 p-6 sm:p-7 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.06)]',
                  'flex flex-col justify-between h-full transition-all duration-300 group',
                  'hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_16px_36px_-8px_rgba(79,70,229,0.16)]'
                )}
              >
                <div>
                  {/* Top Row: Stars on Left + Stylized Quote Glyph on Right */}
                  <div className="flex items-center justify-between mb-4">
                    {/* Stars in primary color */}
                    <div className="flex items-center space-x-1 text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-primary" />
                      ))}
                    </div>

                    {/* Stylized Quote Mark Glyph */}
                    <svg
                      className="w-7 h-7 text-primary/30 group-hover:text-primary/60 transition-colors"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Body: Elegant Italic Quote */}
                  <blockquote className="text-gray-800 text-sm sm:text-[14.5px] leading-relaxed italic font-normal mb-6 min-h-[96px] flex items-center">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Bottom Row: Subtle Divider + Author Strip with Initials Avatar */}
                <div className="pt-4 sm:pt-5 border-t border-gray-100 flex items-center space-x-3.5 mt-auto">
                  {/* Circular Initials Avatar */}
                  <div
                    className={cn(
                      'w-11 h-11 rounded-full bg-primary-light border border-primary/25',
                      'flex items-center justify-center font-display font-bold text-xs text-primary shrink-0',
                      'shadow-inner group-hover:border-primary/50 transition-colors'
                    )}
                  >
                    {item.initials}
                  </div>

                  {/* Author Name & Metadata */}
                  <div className="overflow-hidden">
                    <div className="text-sm font-bold text-gray-950 tracking-tight truncate group-hover:text-primary transition-colors">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-600 truncate mt-0.5">
                      {item.role} &bull; <span className="text-primary font-semibold">{item.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore More Stories Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <a href="#contact">
            <Button
              variant="glow"
              size="lg"
              className="px-8 py-3.5 text-sm font-semibold rounded-xl shadow-md"
              rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            >
              Explore More Stories
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
