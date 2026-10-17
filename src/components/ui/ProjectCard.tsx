import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import {
  ExternalLink,
  ArrowRight,
  Code2,
  Globe,
  Palette,
  Atom,
  Wind,
  Server,
  Database,
  Workflow,
  Terminal,
  Sparkles,
  Cpu,
  Layers,
  FileCode,
} from 'lucide-react'
import type { Project } from '../../data/projects'
import { cn } from '../../lib/utils'

interface ProjectCardProps {
  project: Project
  index: number
}

// Icon mapper for tech chips - white icons
const techIconMap: Record<string, React.ReactNode> = {
  Code: <Code2 className="w-3 h-3 text-white" />,
  Code2: <Code2 className="w-3 h-3 text-white" />,
  Palette: <Palette className="w-3 h-3 text-white" />,
  Wind: <Wind className="w-3 h-3 text-white" />,
  Atom: <Atom className="w-3 h-3 text-white" />,
  Globe: <Globe className="w-3 h-3 text-white" />,
  Server: <Server className="w-3 h-3 text-white" />,
  Database: <Database className="w-3 h-3 text-white" />,
  Workflow: <Workflow className="w-3 h-3 text-white" />,
  Terminal: <Terminal className="w-3 h-3 text-white" />,
  Sparkles: <Sparkles className="w-3 h-3 text-white" />,
  Cpu: <Cpu className="w-3 h-3 text-white" />,
  Layers: <Layers className="w-3 h-3 text-white" />,
  FileCode: <FileCode className="w-3 h-3 text-white" />,
  Figma: <Palette className="w-3 h-3 text-white" />,
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="h-full"
    >
      <div
        ref={cardRef}
        tabIndex={0}
        role="article"
        aria-label={project.title}
        className={cn(
          'relative rounded-[22px] p-5 sm:p-6 h-full flex flex-col justify-between transition-all duration-300 group overflow-hidden',
          'bg-primary text-white border border-white/20 shadow-[0_12px_32px_-6px_rgba(79,70,229,0.35)]',
          'hover:shadow-[0_18px_42px_-6px_rgba(79,70,229,0.5)] hover:-translate-y-1.5',
          'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 outline-none'
        )}
      >
        {/* Subtle top sheen */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[22px] pointer-events-none z-0" />

        {/* Card Content Top Container */}
        <div className="relative z-10 flex flex-col flex-1">
          {/* Mockup Preview Area */}
          <div className="relative h-48 sm:h-52 w-full overflow-hidden rounded-xl border border-white/20 shadow-md bg-primary-dark/40 mb-4.5">
            {/* Top-Right Tags */}
            <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 max-w-[65%] flex-wrap justify-end">
              {project.previewTags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-white text-primary shadow-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Metric Badge Accent */}
            {project.metric && (
              <div className="absolute top-2.5 left-2.5 z-20">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-white text-primary shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  {project.metric}
                </span>
              </div>
            )}

            {/* Mockup Image */}
            <img
              src={project.image}
              alt={`${project.title} Preview Mockup`}
              loading="lazy"
              width="800"
              height="500"
              className={cn(
                'w-full h-full object-cover object-center',
                'transition-transform duration-500 ease-out group-hover:scale-[1.03]'
              )}
            />
          </div>

          {/* Category Badge */}
          <div className="mb-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white text-primary shadow-xs">
              {project.category}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-3.5 tracking-tight leading-snug min-h-[56px] flex items-center">
            {project.title}
          </h3>

          {/* Inset Inner Feature Card (Pure White with Dark Text & Primary Accents) */}
          <div className="rounded-xl bg-white p-4 sm:p-4.5 mb-4 space-y-3 flex-1 flex flex-col justify-between shadow-sm border border-white text-gray-900">
            {/* Description */}
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary font-bold mb-1.5">
                <span>Description</span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/30 to-transparent" />
              </div>
              <p className="text-xs sm:text-[13px] text-gray-700 leading-relaxed line-clamp-3 min-h-[50px]">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
            <div className="pt-2.5 border-t border-gray-100">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary font-bold mb-2">
                <span>Technologies</span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-primary/30 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-1.5 min-h-[30px] items-center">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-primary text-white border border-primary hover:bg-primary-dark transition-colors shadow-2xs"
                  >
                    {techIconMap[tech.icon] || <Code2 className="w-3 h-3 text-white" />}
                    <span className="text-white">{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Card Bottom: Live Demo & Action Button */}
        <div className="pt-3 relative z-10 flex items-center justify-between border-t border-white/20 mt-auto">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-all duration-200 cursor-pointer group-hover:translate-x-0.5 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg py-1 text-white hover:text-white/80"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-white" />
          </a>

          {/* Circular White Action Button with Primary Arrow */}
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${project.title} live preview`}
            className={cn(
              'w-9 h-9 rounded-full bg-white text-primary',
              'flex items-center justify-center shadow-md transition-all duration-300',
              'hover:bg-white/95 group-hover:scale-110 group-hover:rotate-[-45deg]'
            )}
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </motion.div>
  )
}
