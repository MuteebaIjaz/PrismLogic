import type { ServiceItem } from '../types'

export const servicesData: ServiceItem[] = [
  {
    id: 'custom-software',
    title: 'Custom Software Development',
    description: 'We architect resilient, high-performance web systems and proprietary business platforms engineered to scale seamlessly.',
    features: [
      'Full-Stack System Architecture',
      'High-Throughput Database Design',
      'Event-Driven Microservices',
    ],
    technologies: ['TypeScript', 'Go', 'Node.js', 'PostgreSQL', 'Redis'],
    iconName: 'Code2',
    visible: true,
  },
  {
    id: 'ai-automation',
    title: 'AI & Autonomous Workflows',
    description: 'We build self-qualifying lead pipelines, intelligent autonomous agents, and production RAG models that streamline operations.',
    features: [
      'Autonomous n8n Lead Qualification',
      'Enterprise RAG & Vector Knowledge',
      'Self-Driving Operational Agents',
    ],
    technologies: ['n8n', 'LangChain', 'OpenAI', 'Claude 3.7', 'Python'],
    iconName: 'BrainCircuit',
    isFeatured: true,
    badge: 'Flagship Pipeline',
    visible: true,
  },
  {
    id: 'web-mobile-apps',
    title: 'Web & Mobile Applications',
    description: 'We build modern and scalable applications designed to deliver smooth 120fps performance, reliable functionality, and exceptional UX.',
    features: [
      'Cross-Platform Web & Native Apps',
      'Sub-Second First Paint Performance',
      'Real-Time Offline State Sync',
    ],
    technologies: ['Next.js 15', 'React 19', 'React Native', 'Tailwind CSS'],
    iconName: 'Smartphone',
    visible: true,
  },
  // The remaining 3 services are preserved for future reactivation:
  {
    id: 'cloud-devops',
    title: 'Cloud Infrastructure & DevOps',
    description: 'We engineer zero-downtime CI/CD pipelines, container orchestration, and serverless environments built for military-grade reliability.',
    features: [
      'Zero-Downtime Multi-Region Deploys',
      'Infrastructure as Code (IaC)',
      'Automated Container Orchestration',
    ],
    technologies: ['AWS', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform'],
    iconName: 'CloudCog',
    visible: false,
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX & Product Design',
    description: 'We craft intuitive and user-focused digital experiences that enhance usability, captivate visitors, and drive high conversion rates.',
    features: [
      'Interactive Design Tokens & Systems',
      'Comprehensive User Journey Mapping',
      'High-Fidelity Clickable Prototypes',
    ],
    technologies: ['Figma', 'Design Systems', 'Framer Motion', 'Tokens'],
    iconName: 'Palette',
    visible: false,
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity & Compliance',
    description: 'We implement rigorous penetration testing, zero-trust architectures, and data encryption protocols conforming to global standards.',
    features: [
      'SOC 2 Type II & HIPAA Readiness',
      'Automated Vulnerability Scanning',
      'Zero-Trust Network Perimeter',
    ],
    technologies: ['Zero-Trust', 'SOC 2', 'Pen Testing', 'OAuth2/OIDC'],
    iconName: 'ShieldCheck',
    visible: false,
  },
]
