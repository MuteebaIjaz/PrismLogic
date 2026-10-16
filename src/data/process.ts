import type { ProcessStep } from '../types'

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    number: 'Phase 01',
    title: 'Discover & Deconstruct',
    description: 'We dissect your technical bottlenecks, user requirements, and growth goals into an unambiguous architectural specification.',
    deliverables: [
      'Technical Feasibility Study',
      'System Architecture Blueprint',
      'Interactive Project Roadmap',
      'Fixed-Scope Milestones',
    ],
    duration: 'Week 1',
  },
  {
    step: '02',
    number: 'Phase 02',
    title: 'Design & Prototype',
    description: 'Interactive high-fidelity prototypes and atomic design systems that align engineering constraints with effortless user flows.',
    deliverables: [
      'Full Figma Component System',
      'Clickable Interactive Prototypes',
      'User Journey & Flow Diagrams',
      'Design Token Specifications',
    ],
    duration: 'Weeks 2–3',
  },
  {
    step: '03',
    number: 'Phase 03',
    title: 'Build & Automate',
    description: 'Rapid sprint cycles with test-driven development, continuous integration, and weekly preview deployments you can test live.',
    deliverables: [
      'Production-Grade Codebase',
      'Automated Test Suites (Unit + E2E)',
      'Staging Deployment Previews',
      'n8n & LLM Automation Pipelines',
    ],
    duration: 'Weeks 4–8',
  },
  {
    step: '04',
    number: 'Phase 04',
    title: 'Deploy, Scale & Support',
    description: 'Seamless zero-downtime cutover to production, comprehensive observability, and ongoing SLA-backed maintenance.',
    deliverables: [
      'Zero-Downtime Infrastructure Launch',
      'Real-Time Telemetry & APM Dashboards',
      'Detailed API Documentation',
      '24/7 Incident Escalation & Support',
    ],
    duration: 'Ongoing',
  },
]
