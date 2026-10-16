export interface ContactInfo {
  email: string
  phone: string
  address: string
}

export interface SocialLink {
  name: string
  href: string
  icon: 'LinkedIn' | 'Twitter' | 'GitHub' | 'Instagram'
}

export interface WhatHappensStep {
  step: number
  title: string
  description?: string
}

export const contactData: ContactInfo = {
  email: 'hello@prismlogic.com',
  phone: '+92 300 1234567',
  address: 'Hyderabad, Sindh, Pakistan',
}

export const socialLinks: SocialLink[] = [
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'LinkedIn' },
  { name: 'X / Twitter', href: 'https://x.com', icon: 'Twitter' },
  { name: 'GitHub', href: 'https://github.com', icon: 'GitHub' },
  { name: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
]

export const whatHappensNextSteps: WhatHappensStep[] = [
  { step: 1, title: 'You submit your inquiry' },
  { step: 2, title: 'Our AI qualifies it instantly' },
  { step: 3, title: 'A team member follows up' },
]

export const serviceOptions = [
  'AI Automation',
  'Custom Software Development',
  'Web & Mobile Applications',
  'Cloud Infrastructure & DevOps',
  'UI/UX & Product Design',
  'Cybersecurity & Compliance',
  'Not sure yet',
] as const

export const budgetOptions = [
  'Not decided yet',
  'Under $2k',
  '$2k - $5k',
  '$5k - $15k',
  '$15k - $50k',
  '$50k+',
] as const
