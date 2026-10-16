import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { featuredProjects, allProjects } from '../../data/projects'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { ArrowUpRight, X, ExternalLink } from 'lucide-react'

export const FeaturedWork: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="work" className="py-24 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-brand-violet/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Proven Impact"
          badgeVariant="violet"
          whiteTitle="Real Systems."
          highlightTitle="Measurable Returns."
          description="A selection of high-concurrency systems, intelligent AI automation pipelines, and modern web platforms shipped for forward-thinking brands."
        />

        {/* 3 Featured Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              <Card
                variant="default"
                className="h-full flex flex-col justify-between group overflow-hidden border-white/10 hover:border-brand-violet/40"
              >
                <div>
                  {/* Abstract Gradient Thumbnail with Metric Highlight */}
                  <div
                    className={`relative h-52 sm:h-56 w-full rounded-t-xl bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between overflow-hidden border-b border-white/10`}
                  >
                    {/* Noise & Mesh Texture */}
                    <div className="absolute inset-0 bg-noise opacity-30" />
                    <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-brand-violet/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />

                    {/* Top Tag & Client */}
                    <div className="relative z-10 flex items-center justify-between">
                      <Badge variant="subtle" size="sm" className="bg-black/40 backdrop-blur-md">
                        {project.category}
                      </Badge>
                      <span className="text-xs font-mono text-gray-400">{project.client}</span>
                    </div>

                    {/* Prominent Result Metric */}
                    <div className="relative z-10">
                      <div className="text-4xl sm:text-5xl font-black font-display text-white text-gradient-white-lavender drop-shadow-md">
                        {project.metric}
                      </div>
                      <div className="text-xs font-mono uppercase tracking-wider text-brand-cyan mt-1 font-semibold">
                        {project.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-brand-lavender transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-brand-lavender transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 ml-2" />
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-gray-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-14 text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setModalOpen(true)}
            rightIcon={<ExternalLink className="w-4 h-4" />}
          >
            View All Projects & Architecture Breakdowns
          </Button>
        </div>
      </div>

      {/* Interactive Modal: All Projects */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-background-elevated border border-white/15 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl shadow-brand-violet/30"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6 sticky top-0 bg-background-elevated/90 backdrop-blur-md z-10">
                <div>
                  <h3 className="text-2xl font-bold text-white">Engineering Portfolio</h3>
                  <p className="text-sm text-gray-400">All recent client engagements and architectural impact.</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-brand-violet/40 transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-brand-cyan font-mono mb-2">
                      <span>{p.category}</span>
                      <span className="font-bold text-base text-brand-lavender">{p.metric}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">{p.title}</h4>
                    <p className="text-xs text-gray-400 mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.techStack.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <Button variant="secondary" size="md" onClick={() => setModalOpen(false)}>
                  Close Portfolio
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
