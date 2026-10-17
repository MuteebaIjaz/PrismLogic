import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projectsData } from '../../data/projects'
import { ProjectCard } from '../ui/ProjectCard'
import { Button } from '../ui/Button'
import { ArrowRight, X, ExternalLink, ChevronDown, Check } from 'lucide-react'
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
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  // Default 'All' filter shows 3 projects in one row. Category filters show their respective projects.
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projectsData.slice(0, 3)
    return projectsData.filter((p) => p.category === activeFilter)
  }, [activeFilter])

  return (
    <section id="work" className="py-16 md:py-20 relative overflow-hidden bg-[#FAF9F6] text-gray-950 border-t border-gray-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with natural heading and no label */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center mb-8 sm:mb-10"
        >
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-gray-950 leading-[1.15]">
            Selected{' '}
            <span className="text-primary inline-block">
              Projects.
            </span>
          </h2>
        </motion.div>

        {/* Mobile View: Custom Designed Dropdown (< 640px) */}
        <div className="relative w-full max-w-xs mx-auto mb-8 sm:hidden z-30">
          <button
            type="button"
            onClick={() => setIsMobileDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm text-sm font-semibold text-gray-900 hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            aria-expanded={isMobileDropdownOpen}
            aria-haspopup="listbox"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-gray-500 font-normal text-xs uppercase tracking-wider">Filter:</span>
              <span className="font-semibold text-gray-900">{activeFilter}</span>
            </div>
            <ChevronDown
              className={cn(
                'w-4 h-4 text-gray-500 transition-transform duration-200',
                isMobileDropdownOpen && 'rotate-180 text-primary'
              )}
            />
          </button>

          {/* Dismiss backdrop on tap outside */}
          {isMobileDropdownOpen && (
            <div
              className="fixed inset-0 z-30"
              onClick={() => setIsMobileDropdownOpen(false)}
            />
          )}

          {/* Dropdown Options Menu */}
          <AnimatePresence>
            {isMobileDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-40 p-1.5 space-y-1"
                role="listbox"
              >
                {filterCategories.map((category) => {
                  const isSelected = activeFilter === category
                  return (
                    <button
                      key={category}
                      type="button"
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => {
                        setActiveFilter(category)
                        setIsMobileDropdownOpen(false)
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer',
                        isSelected
                          ? 'bg-primary text-white font-semibold shadow-xs'
                          : 'text-gray-800 hover:bg-gray-100 hover:text-gray-950'
                      )}
                    >
                      <span>{category}</span>
                      {isSelected && <Check className="w-4 h-4 text-white stroke-[2.5]" />}
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop View: Solid Non-Transparent Tabs (>= 640px) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.45, delay: 0.1, ease: 'easeOut' }}
          className="hidden sm:flex items-center justify-center flex-wrap gap-2.5 sm:gap-3 mb-10"
        >
          {filterCategories.map((category) => {
            const isActive = activeFilter === category

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveFilter(category)}
                className={cn(
                  'px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none',
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/25 border border-primary scale-[1.02]'
                    : 'bg-white text-gray-700 hover:text-primary hover:border-primary/50 border border-gray-200 shadow-2xs hover:shadow-xs'
                )}
              >
                {category}
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
              className="mt-3 text-primary underline hover:text-primary-dark cursor-pointer font-medium"
            >
              Reset to view all work
            </button>
          </div>
        )}

        {/* Footer of Section: Centered "View All Projects" Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <Button
            variant="glow"
            size="lg"
            onClick={() => setModalOpen(true)}
            rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            className="px-8 py-3.5 text-sm font-semibold rounded-xl shadow-md"
          >
            View All Projects
          </Button>
        </div>
      </div>

      {/* Interactive Modal: All Projects Overview */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-indigo-150 rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl"
            >
              <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6 sticky top-0 bg-white/95 backdrop-blur-md z-10">
                <div>
                  <h3 className="text-2xl font-bold font-display text-gray-950">Full Engineering Archive</h3>
                  <p className="text-sm text-gray-600">Complete catalog of shipped digital products and benchmarks.</p>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-2 rounded-lg text-gray-500 hover:text-gray-950 hover:bg-gray-100 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectsData.map((p) => (
                  <div
                    key={p.id}
                    className="p-5 rounded-xl bg-[#FAF9F6] border border-indigo-100 hover:border-primary transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-primary font-mono mb-2">
                        <span>{p.category}</span>
                      </div>
                      <h4 className="text-base font-bold text-gray-950 mb-2">{p.title}</h4>
                      <p className="text-xs text-gray-600 mb-4">{p.description}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {p.technologies.slice(0, 3).map((t) => (
                          <span key={t.name} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white text-gray-700 border border-gray-200">
                            {t.name}
                          </span>
                        ))}
                      </div>

                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:text-primary-dark flex items-center gap-1 font-semibold"
                      >
                        Demo <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
                <Button variant="primary" size="md" onClick={() => setModalOpen(false)}>
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
