export interface Project {
  id: string
  title: string
  category: 'Web Development' | 'UI/UX Design' | 'AI & Automation' | 'Mobile Apps'
  description: string
  technologies: { name: string; icon: string }[]
  image: string // /work/<slug>.webp
  liveUrl: string
  metric?: string
  accent: string // per-card glow color
  previewTags?: string[]
}

export const projectsData: Project[] = [
  {
    id: 'exo-fitness',
    title: 'EXO Fitness — Athlete Analytics Engine',
    category: 'UI/UX Design',
    description:
      'Engineered an intuitive biometric telemetry dashboard for high-performance athletes, streamlining workout planning and live cardiovascular tracking.',
    technologies: [
      { name: 'HTML5', icon: 'Code' },
      { name: 'CSS3', icon: 'Palette' },
      { name: 'Tailwind CSS', icon: 'Wind' },
      { name: 'React JS', icon: 'Atom' },
    ],
    image: '/work/apex-fitness.webp',
    liveUrl: 'https://exo-fitness.example.com',
    accent: 'rgba(236, 72, 153, 0.4)',
    previewTags: ['React JS', 'UI/UX Design'],
  },
  {
    id: 'salty-coffee',
    title: 'Salty Coffee — Direct-Trade Store',
    category: 'UI/UX Design',
    description:
      'Crafted a sensory e-commerce experience showcasing single-origin bean traceability, bespoke subscription bundles, and sub-second checkout.',
    technologies: [
      { name: 'React JS', icon: 'Atom' },
      { name: 'Tailwind CSS', icon: 'Wind' },
      { name: 'JavaScript', icon: 'Code2' },
      { name: 'Figma', icon: 'Figma' },
    ],
    image: '/work/cremo-coffee.webp',
    liveUrl: 'https://salty-coffee.example.com',
    accent: 'rgba(245, 158, 11, 0.35)',
    previewTags: ['Tailwind CSS', 'Mobile First'],
  },
  {
    id: 'my-edu-help',
    title: 'My Edu Help — Adaptive Learning Portal',
    category: 'Web Development',
    description:
      'Transformed complex academic curricula into modular interactive learning tracks with automated progress assessment and mentor matchmaking.',
    technologies: [
      { name: 'WordPress', icon: 'Globe' },
      { name: 'CSS3', icon: 'Palette' },
      { name: 'Figma', icon: 'Figma' },
      { name: 'JavaScript', icon: 'Code2' },
    ],
    image: '/work/quick-edu-help.webp',
    liveUrl: 'https://my-edu-help.example.com',
        accent: 'rgba(6, 182, 212, 0.4)',
    previewTags: ['WordPress', 'Web Development'],
  },
  {
    id: 'fintech-dashboard',
    title: 'AuraPay — Global Settlement Terminal',
    category: 'Web Development',
    description:
      'Architected a low-latency financial operations workspace handling multi-currency treasury reconciliation and real-time Kafka event streaming.',
    technologies: [
      { name: 'React JS', icon: 'Atom' },
      { name: 'TypeScript', icon: 'FileCode' },
      { name: 'Tailwind CSS', icon: 'Wind' },
      { name: 'Node.js', icon: 'Server' },
    ],
    image: '/work/fintech-dashboard.webp',
    liveUrl: 'https://aurapay.example.com',
    accent: 'rgba(34, 211, 238, 0.45)',
    previewTags: ['React 19', 'Fintech'],
  },
  {
    id: 'ai-lead-qualification',
    title: 'CogniFlow — Autonomous Lead Qualification Tool',
    category: 'AI & Automation',
    description:
      'Built a multi-agent intake engine integrated with n8n and LLM agents that ingests raw project specifications and outputs quantified scope briefs.',
    technologies: [
      { name: 'n8n', icon: 'Workflow' },
      { name: 'Python', icon: 'Terminal' },
      { name: 'OpenAI', icon: 'Sparkles' },
      { name: 'LangChain', icon: 'Cpu' },
    ],
    image: '/work/ai-lead-qualification.webp',
    liveUrl: 'https://cogniflow.example.com',
    accent: 'rgba(16, 185, 129, 0.4)',
    previewTags: ['n8n Workflow', 'AI Agents'],
  },
  {
    id: 'ecommerce-platform',
    title: 'HyperCart — Omnichannel Commerce Platform',
    category: 'Web Development',
    description:
      'Engineered a headless storefront with dynamic edge inventory locking, localized payment rails, and fluid page transitions under 400ms.',
    technologies: [
      { name: 'Next.js', icon: 'Layers' },
      { name: 'Tailwind CSS', icon: 'Wind' },
      { name: 'TypeScript', icon: 'FileCode' },
      { name: 'Redis', icon: 'Database' },
    ],
    image: '/work/ecommerce-platform.webp',
    liveUrl: 'https://hypercart.example.com',
    accent: 'rgba(139, 92, 246, 0.45)',
    previewTags: ['Next.js', 'E-Commerce'],
  },
]

import type { ProjectCase } from '../types'

// Backward-compatible exports for any existing component references
export const featuredProjects: ProjectCase[] = projectsData.slice(0, 3).map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  client: p.title.split('—')[0].trim(),
  metric: p.metric || '+300%',
  metricLabel: 'Growth Metric',
  description: p.description,
  techStack: p.technologies.map((t) => t.name),
  gradient: 'from-violet-900/60 via-indigo-950/80 to-purple-900/40',
  link: p.liveUrl,
}))

export const allProjects: ProjectCase[] = projectsData.map((p) => ({
  id: p.id,
  title: p.title,
  category: p.category,
  client: p.title.split('—')[0].trim(),
  metric: p.metric || '+300%',
  metricLabel: 'Growth Metric',
  description: p.description,
  techStack: p.technologies.map((t) => t.name),
  gradient: 'from-violet-900/60 via-indigo-950/80 to-purple-900/40',
  link: p.liveUrl,
}))
