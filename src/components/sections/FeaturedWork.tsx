import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { featuredProjects, allProjects } from '../../data/projects'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { ArrowUpRight, X, ExternalLink } from 'lucide-react'

export const FeaturedWork: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="work" className="py-16 md:py-20 relative overflow-hidden bg-[#FAF9F6] text-gray-950 border-t border-gray-200/80">
      {/* Background ambient light */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Proven Impact"
          badgeVariant="violet"
          whiteTitle="Real Systems."
          highlightTitle="Measurable Returns."
          description="A selection of high-concurrency systems, intelligent AI automation pipelines, and modern web platforms shipped for forward-thinking brands."
          descriptionClassName="text-gray-700"
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
                className="h-full flex flex-col justify-between group overflow-hidden bg-white border border-indigo-100 hover:border-primary shadow-sm"
              >
                <div>
                  {/* Metric Highlight Box */}
                  <div
                    className="relative h-48 sm:h-52 w-full rounded-t-xl bg-[#EEF2FF] p-6 flex flex-col justify-between overflow-hidden border-b border-indigo-100"
                  >
                    {/* Top Tag & Client */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white text-primary border border-primary/20">
                        {project.category}
                      </span>
                      <span className="text-xs font-mono text-gray-600 font-semibold">{project.client}</span>
                    </div>

                    {/* Prominent Result Metric */}
                    <div className="relative z-10">
                      <div className="text-4xl sm:text-5xl font-black font-display text-primary drop-shadow-xs">
                        {project.metric}
                      </div>
                      <div className="text-xs font-mono uppercase tracking-wider text-gray-700 mt-1 font-bold">
                        {project.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="text-xl font-bold text-gray-950 mb-3 group-hover:text-primary transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                      <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 ml-2" />
                    </h3>

                    <p className="text-sm text-gray-700 leading-relaxed mb-6 font-normal">
                      {project.description}
                    </p>

                    {/* Tech stack tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#FAF9F6] text-gray-800 border border-indigo-100"
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
            variant="glow"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-indigo-100 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
            >
              <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6 sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <div>
                  <h3 className="text-2xl font-bold font-display text-gray-950">Engineering Portfolio</h3>
                  <p className="text-sm text-gray-600">All recent client engagements and architectural impact.</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-950 hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {allProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-xl bg-[#FAF9F6] border border-indigo-100 hover:border-primary transition-colors"
                  >
                    <div className="flex items-center justify-between text-xs text-primary font-mono mb-2">
                      <span>{p.category}</span>
                      <span className="font-bold text-base text-primary">{p.metric}</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-950 mb-2">{p.title}</h4>
                    <p className="text-xs text-gray-600 mb-4">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.techStack.map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-gray-700 border border-gray-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <Button variant="primary" size="md" onClick={() => setModalOpen(false)}>
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
