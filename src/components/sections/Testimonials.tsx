import React from 'react'
import { motion } from 'framer-motion'
import { testimonialsData } from '../../data/testimonials'
import { Star, ArrowRight } from 'lucide-react'
import { cn } from '../../lib/utils'

export const Testimonials: React.FC = () => {
  // Only display the first 3 testimonials in a single row
  const activeTestimonials = testimonialsData.slice(0, 3)

  return (
    <section id="testimonials" className="py-16 md:py-20 relative overflow-hidden bg-brand-violet text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-purple-100 border border-white/20 mb-3.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lavender animate-pulse" />
            <span>Client Perspectives</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-white leading-[1.15]">
            Trusted by Builders.{' '}
            <span className="text-brand-lavender">
              Validated by Results.
            </span>
          </h2>

          <p className="mt-3.5 text-base sm:text-lg text-purple-100/90 font-normal leading-relaxed max-w-2xl mx-auto">
            Direct feedback from technical founders, CTOs, and product leaders who partner with PrismLogic for mission-critical software.
          </p>
        </motion.div>

        {/* 3-Column Single Row Grid on Desktop (1 column on mobile, 3 on lg breakpoint up) */}
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
                  'relative rounded-[22px] bg-[#3B0764]/90 border border-white/15 p-6 sm:p-7 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.35)]',
                  'flex flex-col justify-between h-full backdrop-blur-xl transition-all duration-300 group',
                  'hover:border-white/35 hover:-translate-y-1 hover:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.45)]'
                )}
              >
                {/* Faint Inner Top Sheen */}
                <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-white/[0.05] via-transparent to-transparent pointer-events-none" />

                <div>
                  {/* Top Row: 5 Gold Stars on Left + Stylized Quote Glyph on Right */}
                  <div className="flex items-center justify-between mb-4">
                    {/* 5 Warm Gold Stars */}
                    <div className="flex items-center space-x-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                      ))}
                    </div>

                    {/* Stylized Quote Mark Glyph */}
                    <svg
                      className="w-7 h-7 text-purple-300/40 group-hover:text-purple-200/60 transition-colors"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Body: Elegant Italic Quote with equalized min-height */}
                  <blockquote className="text-white text-sm sm:text-[14.5px] leading-relaxed italic font-normal mb-6 min-h-[96px] flex items-center">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Bottom Row: Subtle Divider + Author Strip with Initials Avatar */}
                <div className="pt-4 sm:pt-5 border-t border-white/15 flex items-center space-x-3.5 mt-auto">
                  {/* Circular Initials Avatar */}
                  <div
                    className={cn(
                      'w-11 h-11 rounded-full bg-brand-violet/30 border border-white/25',
                      'flex items-center justify-center font-display font-bold text-xs text-white shrink-0',
                      'shadow-inner group-hover:border-white/45 transition-colors'
                    )}
                  >
                    {item.initials}
                  </div>

                  {/* Author Name & Metadata */}
                  <div className="overflow-hidden">
                    <div className="text-sm font-bold text-white tracking-tight truncate group-hover:text-purple-200 transition-colors">
                      {item.name}
                    </div>
                    <div className="text-xs text-purple-200 truncate mt-0.5">
                      {item.role} &bull; <span className="text-brand-lavender font-medium">{item.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Display-only: no action on this demo site. */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            type="button"
            className="inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 px-7 py-3 rounded-xl gap-2 text-sm bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md group active:scale-[0.98] shadow-md"
          >
            <span>Explore More Stories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
