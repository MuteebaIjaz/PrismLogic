import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight, Code2, Globe, Palette, Atom, Wind, Server, Database, Workflow, Terminal, Sparkles, Cpu, Layers, FileCode } from 'lucide-react'
import type { Project } from '../../data/projects'
import { cn } from '../../lib/utils'

interface ProjectCardProps {
  project: Project
  index: number
}

// Icon mapper for tech chips
const techIconMap: Record<string, React.ReactNode> = {
  Code: <Code2 className="w-3 h-3 text-brand-lavender" />,
  Code2: <Code2 className="w-3 h-3 text-brand-lavender" />,
  Palette: <Palette className="w-3 h-3 text-pink-400" />,
  Wind: <Wind className="w-3 h-3 text-cyan-400" />,
  Atom: <Atom className="w-3 h-3 text-sky-400" />,
  Globe: <Globe className="w-3 h-3 text-indigo-400" />,
  Server: <Server className="w-3 h-3 text-emerald-400" />,
  Database: <Database className="w-3 h-3 text-amber-400" />,
  Workflow: <Workflow className="w-3 h-3 text-brand-cyan" />,
  Terminal: <Terminal className="w-3 h-3 text-green-400" />,
  Sparkles: <Sparkles className="w-3 h-3 text-purple-300" />,
  Cpu: <Cpu className="w-3 h-3 text-cyan-300" />,
  Layers: <Layers className="w-3 h-3 text-violet-300" />,
  FileCode: <FileCode className="w-3 h-3 text-blue-400" />,
  Figma: <Palette className="w-3 h-3 text-purple-400" />,
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

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
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        role="article"
        aria-label={project.title}
        className={cn(
          'relative rounded-[24px] bg-white border border-gray-200/95',
          'shadow-[0_20px_45px_-10px_rgba(15,23,42,0.14),0_10px_22px_-6px_rgba(15,23,42,0.08),0_0_0_1px_rgba(15,23,42,0.06)]',
          'transition-all duration-300 ease-out group overflow-hidden flex flex-col justify-between h-full',
          'hover:-translate-y-2 hover:border-brand-violet/40 hover:shadow-[0_30px_60px_-12px_rgba(109,40,217,0.28),0_14px_28px_-6px_rgba(15,23,42,0.1),0_0_0_1.5px_rgba(109,40,217,0.35)]',
          'focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2 outline-none'
        )}
      >
        {/* Cursor-following subtle spotlight glow */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0 opacity-100"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(109, 40, 217, 0.08), transparent 70%)`,
            }}
          />
        )}

        {/* Faint Inner Top-Down Gradient Sheen */}
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-b from-black/[0.01] via-transparent to-transparent pointer-events-none" />

        {/* TOP AREA (Preview Mockup ~45% height) */}
        <div className="relative h-60 sm:h-64 w-full overflow-hidden rounded-t-[23px] border-b border-gray-200/80 z-10 bg-[#0C0B16]">
          {/* Per-card custom radial glow backdrop */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-100 opacity-60"
            style={{
              background: `radial-gradient(circle at 60% 40%, ${project.accent}, transparent 65%)`,
            }}
          />

          {/* Top-Right Glass-Style Pills */}
          <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 max-w-[55%] flex-wrap justify-end">
            {project.previewTags?.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md border border-white/20 text-white shadow-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Result Metric Badge Accent */}
          {project.metric && (
            <div className="absolute top-3.5 left-3.5 z-20">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/60 text-brand-lavender border border-brand-violet/40 shadow-xs flex items-center gap-1.5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-pulse" />
                {project.metric}
              </span>
            </div>
          )}

          {/* Project Mockup Image: laptop + phone bleeding off edge */}
          <div className="relative w-full h-full flex items-center justify-center p-2.5">
            <img
              src={project.image}
              alt={`${project.title} Preview Mockup`}
              loading="lazy"
              width="800"
              height="500"
              className={cn(
                'w-full h-full object-cover object-center rounded-lg shadow-xl',
                'transition-transform duration-500 ease-out group-hover:scale-[1.03] group-hover:-translate-y-0.5'
              )}
            />
          </div>
        </div>

        {/* BODY AREA (Below Preview) */}
        <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 z-10 relative">
          <div>
            {/* 1. Category Pill */}
            <div className="mb-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-violet/10 text-brand-violet border border-brand-violet/25">
                {project.category}
              </span>
            </div>

            {/* 2. Project Title with equalized minimum height */}
            <h3 className="text-lg sm:text-xl font-bold font-display text-gray-950 mb-3 tracking-tight leading-snug group-hover:text-brand-violet transition-colors min-h-[52px] flex items-center">
              {project.title}
            </h3>

            {/* 3. Description Micro-Label with Thin Line */}
            <div className="mb-4">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-brand-violet font-semibold mb-1.5">
                <span>Description</span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-brand-violet/25 to-transparent" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3 min-h-[56px]">
                {project.description}
              </p>
            </div>

            {/* 4. Technologies Micro-Label with Thin Line */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-brand-violet font-semibold mb-2">
                <span>Technologies</span>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-brand-violet/25 to-transparent" />
              </div>
              <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center">
                {project.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-gray-50 border border-gray-200 text-gray-700 group-hover:border-gray-300 transition-colors shadow-2xs"
                  >
                    {techIconMap[tech.icon] || <Code2 className="w-3 h-3 text-brand-violet" />}
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 5. Divider Line & Footer Row */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-violet hover:text-brand-indigo transition-colors group/link"
              onClick={(e) => {
                // Prevent bubbling to card
                e.stopPropagation()
              }}
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
            </a>

            {/* Circular Arrow Button */}
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} live preview`}
              className={cn(
                'w-9 h-9 rounded-full bg-gradient-to-r from-brand-violet to-brand-indigo',
                'flex items-center justify-center text-white shadow-glow-violet transition-all duration-300',
                'group-hover:shadow-[0_0_20px_rgba(109,40,217,0.5)] group-hover:scale-110 group-hover:rotate-[-45deg]'
              )}
            >
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
