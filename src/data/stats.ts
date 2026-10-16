import type { StatItem } from '../types'

export const statsData: StatItem[] = [
  {
    id: 'projects',
    value: 120,
    suffix: '+',
    label: 'High-Impact Builds',
    sublabel: 'Delivered across Fintech, Health, & AI',
  },
  {
    id: 'uptime',
    value: 99.98,
    suffix: '%',
    label: 'Production Uptime',
    sublabel: 'Across mission-critical client deployments',
  },
  {
    id: 'experience',
    value: 8,
    suffix: '+',
    label: 'Years of Engineering',
    sublabel: 'Decades of combined senior leadership',
  },
  {
    id: 'rating',
    value: 4.9,
    suffix: '/5.0',
    label: 'Client Satisfaction',
    sublabel: 'Verified reviews on Clutch & G2',
  },
]

export const clientLogos = [
  { name: 'ApexCloud', icon: 'Cloud' },
  { name: 'Novafy Global', icon: 'Zap' },
  { name: 'HyperFlow', icon: 'Activity' },
  { name: 'Synapse Core', icon: 'Cpu' },
  { name: 'VectorScale', icon: 'Maximize2' },
  { name: 'OrbitSecure', icon: 'Shield' },
]
