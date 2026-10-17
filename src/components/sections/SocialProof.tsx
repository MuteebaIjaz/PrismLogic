import React, { useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { statsData, clientLogos } from '../../data/stats'
import { Cloud, Zap, Activity, Cpu, Maximize2, Shield } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  Cloud: <Cloud className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Maximize2: <Maximize2 className="w-5 h-5" />,
  Shield: <Shield className="w-5 h-5" />,
}

function Counter({ value, suffix, prefix }: { value: number; suffix?: string; prefix?: string }) {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 1600
    const steps = 60
    const stepTime = duration / steps
    const increment = value / steps
    const isFloat = value % 1 !== 0

    const timer = setInterval(() => {
      start += increment
      if (start >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {displayValue}
      {suffix}
    </span>
  )
}

export const SocialProof: React.FC = () => {
  return (
    <section className="py-12 border-y border-gray-200/80 bg-[#FAF9F6] text-gray-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Key Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-12 border-b border-gray-200/80">
          {statsData.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center sm:text-left p-4 rounded-xl bg-white border border-indigo-100 shadow-sm hover:border-primary/40 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-bold font-display text-primary mb-1">
                <Counter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>
              <div className="text-sm font-semibold text-gray-950">{stat.label}</div>
              <div className="text-xs text-gray-600 mt-0.5">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>

        {/* Client Logos Strip */}
        <div className="pt-8">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-gray-600 mb-6">
            Trusted by engineering teams and hyper-growth enterprises worldwide
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
            {clientLogos.map((client, idx) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="flex items-center justify-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200 py-2 group cursor-default"
              >
                <div className="text-primary transition-colors">
                  {iconMap[client.icon]}
                </div>
                <span className="font-display font-medium text-sm tracking-tight text-gray-800 group-hover:text-primary">
                  {client.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
