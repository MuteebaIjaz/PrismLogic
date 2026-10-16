import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsData } from '../../data/projects'
import { ProjectCard } from '../ui/ProjectCard'
import { Button } from '../ui/Button'
import { ArrowRight, X, ExternalLink } from 'lucide-react'
import { cn } from '../../lib/utils'

type FilterCategory = 'All' | 'Web Development' | 'UI/UX Design' | 'AI & Automation' | 'Mobile Apps'

const filterCategories: FilterCategory[] = [
  'All',
  'Web Development',
  'UI/UX Design',
  'AI & Automation',
  'Mobile Apps',
]

export const WorkSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All')
  const [modalOpen, setModalOpen] = useState(false)

  // Default 'All' filter shows 3 projects in one row. Category filters show their respective projects.
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsData.slice(0, 3)
    return projectsData.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  return (
    <section id="work" className="py-16 md:py-20 relative overflow-hidden bg-white text-gray-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-brand-violet/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with reduced vertical gap */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-8 sm:mb-10"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-violet/10 text-brand-violet border border-brand-violet/20 mb-3.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-pulse" />
            <span>Selected Work</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-gray-900 leading-[1.15]">
            Work that ships.{' '}
            <span className="bg-gradient-to-r from-brand-violet via-purple-600 to-brand-indigo bg-clip-text text-transparent">
              Results that last.
            </span>
          </h2>

          {/* One-line subtext */}
          <p className="mt-3.5 text-base sm:text-lg text-gray-600 font-normal leading-relaxed max-w-2xl mx-auto">
            Delivering measurable commercial outcomes through production-hardened engineering and bespoke design systems.
          </p>
        </motion.div>

        {/* Filter Chips Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="flex items-center justify-center flex-wrap gap-2 mb-10"
        >
          {filterCategories.map((category) => {
            const isActive = activeFilter === category

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={cn(
                  'relative px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer select-none',
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeWorkFilter"
                    className="absolute inset-0 bg-gradient-to-r from-brand-violet to-brand-indigo rounded-full shadow-glow-violet border border-violet-400/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            )
          })}
        </motion.div>

        {/* Responsive Grid with automatic centering for < 3 cards */}
        <motion.div
          layout
          className={cn(
            'gap-6 sm:gap-8 items-stretch',
            filteredProjects.length < 3
              ? 'flex flex-wrap justify-center'
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                className={cn(
                  'w-full',
                  filteredProjects.length < 3 && 'max-w-md lg:w-[calc(33.333%-1.35rem)]'
                )}
              >
                <ProjectCard project={project} index={idx} />
              </div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Fallback if category has no projects */}
        {filteredProjects.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-sm">
            <p>No projects currently categorized under {activeFilter}.</p>
            <button
              onClick={() => setActiveFilter('All')}
              className="mt-3 text-brand-violet underline hover:text-brand-indigo cursor-pointer font-medium"
            >
              Reset to view all work
            </button>
          </div>
        )}

        {/* Footer of Section: Centered "View All Projects" Button */}
        <div className="mt-12 text-center">
          <Button
            variant="secondary"
            size="lg"
            onClick={() => setModalOpen(true)}
            rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            className="px-8 py-3.5 text-sm font-semibold rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 shadow-sm hover:text-gray-900"
          >
            View All Projects
          </Button>
        </div>
      </div>

      {/* Interactive Modal: All Projects Overview */}
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
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6 sticky top-0 bg-background-elevated/95 backdrop-blur-md z-10">
                <div>
                  <h3 className="text-2xl font-bold font-display text-white">Full Engineering Archive</h3>
                  <p className="text-sm text-gray-400">Complete catalog of shipped digital products and benchmarks.</p>
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
                {projectsData.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-brand-violet/40 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-brand-cyan font-mono mb-2">
                        <span>{p.category}</span>
                      </div>
                      <h4 className="text-base font-bold text-white mb-2">{p.title}</h4>
                      <p className="text-xs text-gray-400 mb-4">{p.description}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {p.technologies.slice(0, 3).map((t) => (
                          <span key={t.name} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-300">
                            {t.name}
                          </span>
                        ))}
                      </div>

                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-lavender hover:text-white flex items-center gap-1 font-semibold"
                      >
                        Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
                <Button variant="secondary" size="md" onClick={() => setModalOpen(false)}>
                  Close Archive
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
