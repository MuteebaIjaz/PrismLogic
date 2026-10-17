import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Star, ShieldCheck } from 'lucide-react'
import { Button } from '../ui/Button'

export const Hero: React.FC = () => {
  const [isHovered, setIsHovered] = React.useState(false)
  const [hoveredCard, setHoveredCard] = React.useState<number | null>(null)
  const [screenWidth, setScreenWidth] = React.useState(1200)

  React.useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth, { passive: true })
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const isMobile = screenWidth < 640
  const isTablet = screenWidth < 1024

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Dynamic responsive card offsets
  const leftRestX = isMobile
    ? [-38, -44, -34, -38]
    : isTablet
    ? [-50, -56, -44, -50]
    : [-62, -70, -56, -62]

  const rightRestX = isMobile
    ? [38, 44, 34, 38]
    : isTablet
    ? [50, 56, 44, 50]
    : [62, 70, 56, 62]

  const cardOrderlyOffset = isMobile ? 56 : isTablet ? 78 : 96

  return (
    <section id="top" className="relative pt-32 pb-14 sm:pt-28 sm:pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-[#FAF9F6] text-gray-950">
      {/* Background Soft Ambient Primary Wash */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] sm:h-[680px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] lg:w-[850px] h-[320px] sm:h-[450px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Top Column on Mobile / Left Column on Desktop */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
            
            {/* Rating Above Heading (Clean, unboxed without label/button) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 sm:gap-2.5 mb-5 select-none justify-center lg:justify-start"
            >
              {/* Animated 5 Stars popping & filling with color one by one without delay */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => {
                  const t_start = 0.04 + i * 0.09
                  const t_peak = t_start + 0.04
                  const t_settle = t_start + 0.08
                  const t_reset_start = 0.82
                  const t_reset_end = 0.88

                  return (
                    <div key={i} className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center">
                      {/* Empty star outline */}
                      <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300 stroke-[1.5] fill-none" />

                      {/* Filled star popping directly into place at that exact moment */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                          scale: [0, 0, 1.45, 1, 1, 0, 0],
                          opacity: [0, 0, 1, 1, 1, 0, 0],
                          rotate: [0, 0, -18, 0, 0, 0, 0],
                        }}
                        transition={{
                          duration: 3.6,
                          repeat: Infinity,
                          ease: 'easeOut',
                          times: [0, t_start, t_peak, t_settle, t_reset_start, t_reset_end, 1],
                        }}
                      >
                        <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-primary text-primary drop-shadow-[0_2px_6px_rgba(79,70,229,0.45)]" />
                      </motion.div>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm">
                <span className="font-extrabold text-black tracking-tight">4.9/5</span>
                <span className="font-semibold text-primary">Rating</span>
                <span className="text-gray-500 font-normal hidden sm:inline">• 120+ Verified Client Reviews</span>
              </div>
            </motion.div>

            {/* Main Headline: Centered on mobile, Left Aligned on desktop */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-[clamp(2.15rem,8.8vw,2.85rem)] leading-[1.08] sm:text-4xl md:text-5xl lg:text-[3.35rem] font-extrabold tracking-[-0.04em] text-gray-950 max-w-2xl text-center lg:text-left mx-auto lg:mx-0 sm:leading-[1.12] w-full break-words"
            >
              <span className="sm:hidden">
                <span className="block">We Turn Ambitious</span>
                <span className="block">Ideas Into</span>
                <span className="block text-primary">World-Class Software.</span>
              </span>
              <span className="hidden sm:inline">
                We Turn Ambitious Ideas Into{' '}
                <span className="text-primary inline-block">
                  World-Class Software.
                </span>
              </span>
            </motion.h1>

            {/* Natural & Concise Subheading: Centered on mobile, Left on desktop */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="mt-5 text-xs sm:text-base md:text-lg text-gray-700 max-w-xl text-center lg:text-left mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              From modern web apps to smart AI solutions, we build fast, reliable products that help your business grow.
            </motion.p>

            {/* Dual CTAs: Single Horizontal Row on Mobile (Left: Get a Consultation, Right: See Our Work) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="mt-10 sm:mt-8 flex flex-row flex-nowrap items-center justify-center lg:justify-start gap-2.5 sm:gap-4 w-full max-w-[350px] sm:max-w-none mx-auto lg:mx-0"
            >
              <a href="#contact" onClick={scrollToContact} className="flex-1 sm:flex-initial flex">
                <Button
                  variant="glow"
                  size="md"
                  className="w-full sm:w-auto text-[13px] sm:text-base px-3 py-3 sm:px-8 sm:py-3.5 justify-center text-center font-bold whitespace-nowrap bg-primary text-white border border-indigo-400/40 shadow-[0_4px_16px_-2px_rgba(79,70,229,0.42),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-4px_rgba(79,70,229,0.52),0_4px_8px_-2px_rgba(0,0,0,0.08)] hover:bg-primary-dark active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
                  rightIcon={<ArrowRight className="w-4 h-4 hidden sm:inline" />}
                >
                  <span className="sm:hidden">Get a Consultation</span>
                  <span className="hidden sm:inline">Get a Free Consultation</span>
                </Button>
              </a>

              <a href="#work" onClick={scrollToWork} className="flex-1 sm:flex-initial flex group">
                <Button
                  variant="secondary-light"
                  size="md"
                  className="w-full sm:w-auto text-[13px] sm:text-base px-3 py-3 sm:px-8 sm:py-3.5 justify-center text-center font-semibold whitespace-nowrap bg-white text-gray-950 border border-gray-300/80 shadow-[0_4px_16px_-3px_rgba(15,23,42,0.12),0_2px_6px_-1px_rgba(15,23,42,0.06),0_0_0_1px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-4px_rgba(15,23,42,0.18),0_4px_8px_-2px_rgba(15,23,42,0.08)] hover:border-gray-400 hover:text-primary active:translate-y-0 active:scale-[0.98] transition-all duration-200 ease-out"
                  rightIcon={<ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-primary group-hover:translate-x-0.5 transition-all hidden sm:inline" />}
                >
                  See Our Work
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Cards: Placed BELOW the CTA buttons on mobile! */}
          <div className="lg:col-span-5 flex items-center justify-center relative w-full pt-4 sm:pt-6 lg:pt-0">
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => {
                setIsHovered(false)
                setHoveredCard(null)
              }}
              className="relative w-full max-w-[300px] sm:max-w-[420px] h-[250px] sm:h-[350px] lg:h-[420px] flex items-center justify-center cursor-pointer select-none"
            >
              
              {/* Ambient Glow behind cards */}
              <div className="absolute w-40 sm:w-56 h-40 sm:h-56 bg-primary/20 rounded-full blur-[50px] sm:blur-[80px] pointer-events-none" />

              {/* Card 2: 99.8% On-Time Delivery */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 0, y: 30, rotate: 0 }}
                animate={
                  isHovered
                    ? {
                        x: 0,
                        y: hoveredCard === 2 ? (isMobile ? -10 : -20) : 0,
                        rotate: 0,
                        scale: hoveredCard === 2 ? 1.05 : 0.98,
                        zIndex: hoveredCard === 2 ? 40 : 20,
                        opacity: 1,
                      }
                    : {
                        x: leftRestX,
                        y: isMobile ? [6, 2, 10, 6] : [12, 4, 20, 12],
                        rotate: [-14, -17, -11, -14],
                        scale: 1,
                        zIndex: 10,
                        opacity: 1,
                      }
                }
                transition={
                  isHovered
                    ? { duration: 0.35, ease: 'easeOut' }
                    : {
                        opacity: { duration: 0.6, delay: 0.3 },
                        scale: { duration: 0.6, delay: 0.3 },
                        x: { duration: 5.6, repeat: Infinity, ease: 'easeInOut' },
                        y: { duration: 5.6, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 5.6, repeat: Infinity, ease: 'easeInOut' },
                      }
                }
                onMouseEnter={() => setHoveredCard(2)}
                className={`absolute bg-primary text-white w-[145px] sm:w-[195px] lg:w-[220px] h-[200px] sm:h-[260px] lg:h-[285px] rounded-2xl p-3.5 sm:p-5 border border-white/25 shadow-[0_14px_30px_rgba(79,70,229,0.35)] flex flex-col justify-between cursor-pointer select-none overflow-hidden transition-shadow duration-300 ${
                  hoveredCard === 2 ? 'shadow-[0_22px_45px_rgba(79,70,229,0.6)] border-white/40' : ''
                }`}
              >
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

                {/* Top Corner Index */}
                <div className="flex items-center justify-between text-xs font-mono relative z-10">
                  <span className="text-white font-bold text-xs sm:text-sm tracking-wider">#02</span>
                  <span className="text-[8px] sm:text-[10px] tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-white/15 text-white font-medium">Speed</span>
                </div>

                {/* Center Content */}
                <div className="space-y-1.5 sm:space-y-2 relative z-10">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/15 flex items-center justify-center text-white">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-none">99.8%</div>
                  <div className="text-xs sm:text-sm lg:text-base font-bold text-white leading-tight">On-Time Delivery</div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[9px] sm:text-[11px] text-white/80 relative z-10">
                  <span>Enterprise SLA</span>
                  <span className="text-white font-semibold">Guaranteed</span>
                </div>
              </motion.div>

              {/* Card 1: 100% In-House Senior Engineers */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 0, y: 30, rotate: 0 }}
                animate={
                  isHovered
                    ? {
                        x: -cardOrderlyOffset,
                        y: hoveredCard === 1 ? (isMobile ? -10 : -20) : 0,
                        rotate: 0,
                        scale: hoveredCard === 1 ? 1.05 : 0.98,
                        zIndex: hoveredCard === 1 ? 40 : 15,
                        opacity: 1,
                      }
                    : {
                        x: [0, 3, -3, 0],
                        y: isMobile ? [-14, -20, -10, -14] : [-22, -30, -16, -22],
                        rotate: [2, 0, 5, 2],
                        scale: 1,
                        zIndex: 20,
                        opacity: 1,
                      }
                }
                transition={
                  isHovered
                    ? { duration: 0.35, ease: 'easeOut' }
                    : {
                        opacity: { duration: 0.6, delay: 0.4 },
                        scale: { duration: 0.6, delay: 0.4 },
                        x: { duration: 6.2, repeat: Infinity, ease: 'easeInOut' },
                        y: { duration: 6.2, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 6.2, repeat: Infinity, ease: 'easeInOut' },
                      }
                }
                onMouseEnter={() => setHoveredCard(1)}
                className={`absolute bg-primary text-white w-[145px] sm:w-[195px] lg:w-[220px] h-[200px] sm:h-[260px] lg:h-[285px] rounded-2xl p-3.5 sm:p-5 border border-white/30 shadow-[0_18px_40px_rgba(79,70,229,0.45)] flex flex-col justify-between cursor-pointer select-none overflow-hidden transition-shadow duration-300 ${
                  hoveredCard === 1 ? 'shadow-[0_24px_50px_rgba(79,70,229,0.6)] border-white/40' : ''
                }`}
              >
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent pointer-events-none" />

                {/* Top Corner Index */}
                <div className="flex items-center justify-between text-xs font-mono relative z-10">
                  <span className="text-white font-bold text-xs sm:text-sm tracking-wider">#01</span>
                  <span className="text-[8px] sm:text-[10px] tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-white/15 text-white font-medium">Talent</span>
                </div>

                {/* Center Content */}
                <div className="space-y-1.5 sm:space-y-2 relative z-10">
                  <div className="flex -space-x-1 sm:-space-x-1.5">
                    {[0, 1, 2, 3].map((idx) => (
                      <div
                        key={idx}
                        className="w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-primary bg-white text-primary flex items-center justify-center text-[8px] sm:text-[10px] font-bold shadow-xs"
                      >
                        ✓
                      </div>
                    ))}
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-none">100%</div>
                  <div className="text-xs sm:text-sm lg:text-base font-bold text-white leading-tight">In-House Senior Engineers</div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[9px] sm:text-[11px] text-white/80 relative z-10">
                  <span>Zero Outsourcing</span>
                  <span className="text-white font-semibold">Elite Team</span>
                </div>
              </motion.div>

              {/* Card 3: Trusted By 100+ Clients */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 0, y: 30, rotate: 0 }}
                animate={
                  isHovered
                    ? {
                        x: cardOrderlyOffset,
                        y: hoveredCard === 3 ? (isMobile ? -10 : -20) : 0,
                        rotate: 0,
                        scale: hoveredCard === 3 ? 1.05 : 0.98,
                        zIndex: hoveredCard === 3 ? 40 : 15,
                        opacity: 1,
                      }
                    : {
                        x: rightRestX,
                        y: isMobile ? [8, 14, 4, 8] : [14, 22, 6, 14],
                        rotate: [16, 18, 13, 16],
                        scale: 1,
                        zIndex: 10,
                        opacity: 1,
                      }
                }
                transition={
                  isHovered
                    ? { duration: 0.35, ease: 'easeOut' }
                    : {
                        opacity: { duration: 0.6, delay: 0.5 },
                        scale: { duration: 0.6, delay: 0.5 },
                        x: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
                        y: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
                        rotate: { duration: 5.2, repeat: Infinity, ease: 'easeInOut' },
                      }
                }
                onMouseEnter={() => setHoveredCard(3)}
                className={`absolute bg-primary text-white w-[145px] sm:w-[195px] lg:w-[220px] h-[200px] sm:h-[260px] lg:h-[285px] rounded-2xl p-3.5 sm:p-5 border border-white/25 shadow-[0_14px_30px_rgba(79,70,229,0.35)] flex flex-col justify-between cursor-pointer select-none overflow-hidden transition-shadow duration-300 ${
                  hoveredCard === 3 ? 'shadow-[0_22px_45px_rgba(79,70,229,0.6)] border-white/40' : ''
                }`}
              >
                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

                {/* Top Corner Index */}
                <div className="flex items-center justify-between text-xs font-mono relative z-10">
                  <span className="text-white font-bold text-xs sm:text-sm tracking-wider">#03</span>
                  <span className="text-[8px] sm:text-[10px] tracking-wider uppercase px-1.5 sm:px-2 py-0.5 rounded-full bg-white/15 text-white font-medium">Scale</span>
                </div>

                {/* Center Content */}
                <div className="space-y-1.5 sm:space-y-2 relative z-10">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white/15 flex items-center justify-center text-white">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-none">100+</div>
                  <div className="text-xs sm:text-sm lg:text-base font-bold text-white leading-tight">Trusted Clients</div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[9px] sm:text-[11px] text-white/80 relative z-10">
                  <span>Global Products</span>
                  <span className="text-white font-semibold">12+ Countries</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
