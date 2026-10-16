export interface LeadFormData {
  name: string
  email: string
  company: string
  phone?: string
  service: string
  budget?: string
  message: string
  consent: boolean
  honeypot?: string
}

export interface LeadSubmissionPayload {
  name: string
  email: string
  company: string
  phone?: string
  service: string
  budget?: string
  message: string
  consent: boolean
  source: string
  submittedAt: string
  pageUrl: string
}

export interface ServiceItem {
  id: string
  title: string
  description: string
  features: string[]
  iconName: string
  isFeatured?: boolean
  colSpan?: string
  badge?: string
  technologies?: string[]
  visible?: boolean
}

export interface ProcessStep {
  step: string
  number: string
  title: string
  description: string
  deliverables: string[]
  duration: string
}

export interface ProjectCase {
  id: string
  title: string
  category: string
  client: string
  metric: string
  metricLabel: string
  description: string
  techStack: string[]
  gradient: string
  link?: string
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  company: string
  quote: string
  initials: string
  avatarColor: string
  highlightMetric?: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  category?: string
}

export interface StatItem {
  id: string
  value: number
  suffix?: string
  prefix?: string
  label: string
  sublabel: string
}
