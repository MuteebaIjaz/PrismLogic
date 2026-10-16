import type { FaqItem } from '../types'

export const faqsData: FaqItem[] = [
  {
    id: 'pricing',
    question: 'How do you structure project pricing and engagements?',
    answer: 'We provide both fixed-scope milestone deliverables (ideal for MVPs, specific automations, and defined system overhauls) and dedicated sprint-based pods for ongoing velocity. Every proposal breaks down exact deliverables, timelines, and guarantees — zero surprise invoices.',
  },
  {
    id: 'timeline',
    question: 'What is your typical turnaround timeline for a project?',
    answer: 'Focused deliverables and targeted AI automations typically launch in 2 to 4 weeks. Full-scale custom web and mobile applications or comprehensive platforms generally span 6 to 12 weeks with weekly testable staging releases.',
  },
  {
    id: 'tech-stack',
    question: 'What technologies and frameworks does PrismLogic specialize in?',
    answer: 'Our core stack centers on React 19 / Next.js 15, TypeScript, Node.js, Go, Python, PostgreSQL, Redis, Docker, and Kubernetes. For AI and workflow automation, we engineer production pipelines using n8n, LangChain, OpenAI, Anthropic Claude, and fine-tuned domain models.',
  },
  {
    id: 'process',
    question: 'How do we track progress during the build?',
    answer: 'You receive access to a dedicated Slack or Discord channel with our senior engineers, weekly live video demos, and continuous preview URLs deployed on staging. You can test and inspect real working software at every single milestone.',
  },
  {
    id: 'automation-n8n',
    question: 'How does your AI lead qualification automation work?',
    answer: 'When you submit our contact form, an event webhook instantaneously triggers a multi-stage n8n workflow. The workflow enriches company data, assesses technical requirements, and classifies priority before automatically scheduling the right technical lead.',
  },
  {
    id: 'support-maintenance',
    question: 'What kind of post-launch warranty and SLA support do you offer?',
    answer: 'All projects include a 30-day post-launch warranty with zero-cost bug resolution. Beyond launch, we offer enterprise SLA tiers providing 24/7 monitoring, security patching, cloud cost optimization, and ongoing feature sprints.',
  },
]
