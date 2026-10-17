import React from 'react'
import { motion } from 'framer-motion'
import {
  Code2,
  BrainCircuit,
  Smartphone,
  CloudCog,
  Palette,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { servicesData } from '../../data/services'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-white" />,
  BrainCircuit: <BrainCircuit className="w-6 h-6 text-white" />,
  Smartphone: <Smartphone className="w-6 h-6 text-white" />,
  CloudCog: <CloudCog className="w-6 h-6 text-white" />,
  Palette: <Palette className="w-6 h-6 text-white" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-white" />,
}

export const ServicesBento: React.FC = () => {
  // Only display the 3 active services in a single row
  const activeServices = servicesData.filter((s) => s.visible !== false).slice(0, 3)

  return (
    <section id="services" className="py-16 md:py-20 relative overflow-hidden bg-[#FAF9F6] text-gray-950 border-t border-gray-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          className="mb-8 sm:mb-10"
          whiteTitle="Our Core"
          highlightTitle="Services"
        />

        {/* 3-Column Single Row Grid on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {activeServices.map((service, idx) => {
            const isFeatured = service.isFeatured

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <div
                  className={cn(
                    'relative rounded-[22px] p-6 sm:p-7 h-full flex flex-col justify-between transition-all duration-300 group',
                    'bg-primary text-white border border-white/20 shadow-[0_12px_32px_-6px_rgba(79,70,229,0.35)]',
                    'hover:shadow-[0_18px_42px_-6px_rgba(79,70,229,0.5)] hover:-translate-y-1',
                    isFeatured && 'ring-2 ring-white/30'
                  )}
                >
                  {/* Subtle top sheen */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[22px] pointer-events-none" />

                  {/* Middle Card Circular Stamp (Straight, Positioned Just Slightly Overlapping Outside Top-Right Corner) */}
                  {isFeatured && (
                    <div className="absolute -top-2.5 -right-2.5 sm:-top-3 sm:-right-3 z-20 pointer-events-none select-none">
                      <div className="w-[78px] h-[78px] sm:w-[86px] sm:h-[86px] rounded-full bg-white text-primary p-1 shadow-[0_6px_20px_rgba(0,0,0,0.2)] border-2 border-primary flex items-center justify-center">
                        <div className="w-full h-full rounded-full border border-dashed border-primary flex flex-col items-center justify-center p-1 text-center">
                          <span className="text-[8px] sm:text-[9px] text-primary leading-none mb-0.5">★</span>
                          <span className="font-mono font-black text-[9px] sm:text-[10px] uppercase tracking-wider leading-[1.1] text-primary">
                            HIGH IN
                          </span>
                          <span className="font-mono font-black text-[10px] sm:text-[11px] uppercase tracking-wider leading-[1.1] text-primary">
                            DEMAND
                          </span>
                          <span className="text-[8px] sm:text-[9px] text-primary leading-none mt-0.5">★</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Content Top */}
                  <div className="relative z-10 flex flex-col flex-1">
                    {/* Top Row: Square White Icon */}
                    <div className="mb-5">
                      <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-white text-primary flex items-center justify-center transition-all duration-300 shadow-md p-3 group-hover:scale-105 shrink-0 border border-white inline-flex">
                        {React.cloneElement(iconMap[service.iconName] as React.ReactElement<{ className?: string }>, {
                          className: 'w-6 h-6 text-primary',
                        })}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display tracking-tight">
                      {service.title}
                    </h3>

                    {/* Description Paragraph */}
                    <p className="text-sm text-white/85 leading-relaxed mb-5 font-normal min-h-[44px]">
                      {service.description}
                    </p>

                    {/* Inset Inner Feature Card (Pure White with Dark Text & Primary Accents) */}
                    <div className="rounded-xl bg-white p-4 sm:p-4.5 mb-5 space-y-3.5 flex-1 flex flex-col justify-between shadow-sm border border-white">
                      {/* Feature Bullet Points */}
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center text-xs sm:text-[13px] text-gray-900 font-medium">
                            <CheckCircle2 className="w-4 h-4 mr-2.5 shrink-0 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Pill-Shaped Tech Badges */}
                      {service.technologies && (
                        <div className="pt-2.5 border-t border-gray-100 flex flex-wrap gap-1.5">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-primary text-white border border-primary shadow-2xs hover:bg-primary-dark transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: EXPLORE CTA Link */}
                  <div className="pt-3 relative z-10 flex items-center justify-between border-t border-white/15">
                    <button
                      type="button"
                      aria-label={`Explore ${service.title}`}
                      className="text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5 transition-all duration-200 cursor-pointer group-hover:translate-x-1 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg py-1 text-white hover:text-white/80"
                    >
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Explore More Services Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <a href="#contact">
            <Button
              variant="glow"
              size="lg"
              className="px-8 py-3.5 text-sm font-semibold rounded-xl shadow-md"
              rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            >
              Explore More Services
            </Button>
          </a>
        </div>
      </div>
    </section>
  )
}
