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
import { Badge } from '../ui/Badge'
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
    <section id="services" className="py-16 md:py-20 relative overflow-hidden bg-brand-violet text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          className="mb-8 sm:mb-10"
          whiteTitle="Engineering Solutions Engineered for"
          highlightTitle="Unfair Velocity"
          description="We build bespoke high-throughput software, production-ready AI pipelines, and modern mobile applications that scale predictably."
          descriptionClassName="text-purple-100/90"
        />

        {/* 3-Column Single Row Grid on Desktop (1 column on mobile, 3 from lg breakpoint up) */}
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
                    isFeatured
                      ? 'bg-[#3B0764]/95 border-2 border-cyan-400/50 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.45),0_0_20px_rgba(34,211,238,0.15)] hover:border-cyan-300 hover:shadow-[0_20px_42px_-6px_rgba(0,0,0,0.55),0_0_26px_rgba(34,211,238,0.25)]'
                      : 'bg-[#3B0764]/85 border border-white/15 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.35)] hover:border-white/30 hover:shadow-[0_16px_32px_-6px_rgba(0,0,0,0.45)]'
                  )}
                >
                  {/* Subtle inner top-light gradient */}
                  <div className="absolute inset-0 rounded-[22px] bg-gradient-to-b from-white/[0.05] via-transparent to-transparent pointer-events-none" />

                  {/* Card Content Top */}
                  <div className="relative z-10 flex flex-col flex-1">
                    {/* Top Squircle Icon & Optional Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={cn(
                          'w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-md p-3.5',
                          isFeatured
                            ? 'bg-gradient-to-tr from-brand-violet via-purple-700 to-cyan-500 border border-cyan-400/40 shadow-[0_0_16px_rgba(34,211,238,0.3)] group-hover:scale-105'
                            : 'bg-gradient-to-tr from-brand-violet via-purple-700 to-indigo-800 border border-white/20 shadow-md group-hover:scale-105'
                        )}
                      >
                        {iconMap[service.iconName]}
                      </div>

                      {service.badge && (
                        <Badge variant="cyan" dot size="sm">
                          {service.badge}
                        </Badge>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display tracking-tight group-hover:text-purple-200 transition-colors">
                      {service.title}
                    </h3>

                    {/* Description Paragraph with standardized height for visual alignment */}
                    <p className="text-sm text-purple-100/90 leading-relaxed mb-5 font-normal min-h-[44px]">
                      {service.description}
                    </p>

                    {/* Inset Inner Container Box (Feature Checklist [Max 3] + Tech Pill Badges) */}
                    <div className="rounded-xl bg-black/25 border border-white/10 p-4 mb-5 space-y-3.5 group-hover:border-white/20 transition-colors flex-1 flex flex-col justify-between">
                      {/* Feature Bullet Points (Max 3 items) */}
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, fIdx) => (
                          <li key={fIdx} className="flex items-center text-xs sm:text-[13px] text-purple-50 font-medium">
                            <CheckCircle2
                              className={cn(
                                'w-4 h-4 mr-2.5 shrink-0',
                                isFeatured ? 'text-brand-cyan' : 'text-brand-lavender'
                              )}
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Pill-Shaped Tech Badges */}
                      {service.technologies && (
                        <div className="pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                          {service.technologies.map((tech) => (
                            <span
                              key={tech}
                              className={cn(
                                'px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium transition-colors',
                                isFeatured
                                  ? 'bg-cyan-950/70 text-cyan-200 border border-cyan-400/30 hover:border-cyan-400/60'
                                  : 'bg-white/10 text-purple-100 border border-white/15 hover:border-white/30 hover:bg-white/15'
                              )}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom: EXPLORE CTA Link */}
                  <div className="pt-2 relative z-10 flex items-center justify-between border-t border-white/10">
                    <button
                      type="button"
                      aria-label={`Explore ${service.title}`}
                      className={cn(
                        'text-xs font-bold uppercase tracking-widest flex items-center space-x-1.5 transition-all duration-200 cursor-pointer group-hover:translate-x-1 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet rounded-lg py-1',
                        isFeatured
                          ? 'text-cyan-300 hover:text-white'
                          : 'text-brand-lavender hover:text-white'
                      )}
                    >
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                    {isFeatured && (
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-300/80">
                        High Demand
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Display-only: no action on this demo site. */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            type="button"
            className="inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 px-7 py-3 rounded-xl gap-2 text-sm bg-white/10 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md group active:scale-[0.98] shadow-md"
          >
            <span>Explore More Services</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
