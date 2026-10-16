const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const workDir = path.join('public', 'work');
if (!fs.existsSync(workDir)) {
  fs.mkdirSync(workDir, { recursive: true });
}

const projects = [
  {
    slug: 'flexi-fit',
    title: 'Flexi Fitness',
    accent1: '#6D28D9',
    accent2: '#EC4899',
    subtitle: 'High-Performance Athlete Analytics',
    stats: '14,280 kcal • 98.4 BPM',
    colorMode: 'dark',
    type: 'fitness',
  },
  {
    slug: 'drinky-coffee',
    title: 'Drinky Coffee',
    accent1: '#8B5CF6',
    accent2: '#F59E0B',
    subtitle: 'Single-Origin Direct Trade Store',
    stats: 'Ethiopia Yirgacheffe • 94.2 Score',
    colorMode: 'warm-dark',
    type: 'coffee',
  },
  {
    slug: 'quick-edu-help',
    title: 'QuickEduHelp',
    accent1: '#4F46E5',
    accent2: '#06B6D4',
    subtitle: 'Adaptive Learning and Mentorship Portal',
    stats: '45,000+ Students • 99.2% Passing',
    colorMode: 'indigo',
    type: 'edu',
  },
  {
    slug: 'fintech-dashboard',
    title: 'AuraPay Fintech Terminal',
    accent1: '#7C3AED',
    accent2: '#22D3EE',
    subtitle: 'Global Treasury and Settlement Cluster',
    stats: '$45.8M Daily Volume • 12ms API',
    colorMode: 'violet-cyan',
    type: 'fintech',
  },
  {
    slug: 'ai-lead-qualification',
    title: 'CogniFlow AI Qualifier (n8n)',
    accent1: '#6366F1',
    accent2: '#10B981',
    subtitle: 'Autonomous Multi-Agent Ingestion Pipeline',
    stats: '99.4% Qualification • Sub-60s SLA',
    colorMode: 'emerald-violet',
    type: 'ai-flow',
  },
  {
    slug: 'ecommerce-platform',
    title: 'HyperCart Omnichannel',
    accent1: '#9333EA',
    accent2: '#38BDF8',
    subtitle: 'Sub-second Headless Global Commerce',
    stats: '+310% Conversion • 420ms TTFB',
    colorMode: 'purple-blue',
    type: 'commerce',
  },
];

async function generateMockups() {
  for (const proj of projects) {
    const svgContent = `
    <svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Background Ambient Glow -->
        <radialGradient id="bgGlow" cx="45%" cy="40%" r="65%">
          <stop offset="0%" stop-color="${proj.accent1}" stop-opacity="0.38"/>
          <stop offset="55%" stop-color="${proj.accent2}" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#0A0A14" stop-opacity="0"/>
        </radialGradient>
        
        <linearGradient id="laptopBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.2)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.03)"/>
        </linearGradient>

        <linearGradient id="phoneBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.3)"/>
          <stop offset="100%" stop-color="rgba(34,211,238,0.2)"/>
        </linearGradient>
        
        <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="18" stdDeviation="24" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
      </defs>

      <!-- Background Canvas -->
      <rect width="800" height="500" fill="#0C0B16"/>
      <rect width="800" height="500" fill="url(#bgGlow)"/>

      <!-- Subtle background grid lines -->
      <line x1="0" y1="120" x2="800" y2="120" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      <line x1="0" y1="260" x2="800" y2="260" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      <line x1="0" y1="380" x2="800" y2="380" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      <line x1="240" y1="0" x2="240" y2="500" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      <line x1="520" y1="0" x2="520" y2="500" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

      <!-- LAPTOP MOCKUP (Tilted slightly and bleeding off the edges) -->
      <g transform="translate(60, 45) rotate(-3.5)" filter="url(#softShadow)">
        <!-- Laptop Top Bezel -->
        <rect x="0" y="0" width="560" height="360" rx="14" fill="#121124" stroke="url(#laptopBorder)" stroke-width="1.5"/>
        
        <!-- Laptop Camera Notch -->
        <circle cx="280" cy="10" r="3" fill="#3B356D"/>
        
        <!-- Laptop Inner Screen -->
        <rect x="16" y="22" width="528" height="322" rx="8" fill="#07060E"/>
        
        <!-- Screen Top Navigation Bar -->
        <rect x="16" y="22" width="528" height="32" fill="#151329"/>
        <circle cx="34" cy="38" r="4" fill="#EF4444" opacity="0.8"/>
        <circle cx="48" cy="38" r="4" fill="#F59E0B" opacity="0.8"/>
        <circle cx="62" cy="38" r="4" fill="#10B981" opacity="0.8"/>
        <rect x="180" y="30" width="200" height="16" rx="4" fill="rgba(255,255,255,0.08)"/>
        <text x="210" y="42" font-family="Inter, sans-serif" font-size="9" fill="#A1A1AA">${proj.slug}.prismlogic.io</text>

        <!-- Screen Content Mockup -->
        <g transform="translate(32, 70)">
          <!-- Header Banner -->
          <rect x="0" y="0" width="496" height="48" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)"/>
          <text x="16" y="28" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="700" fill="#FFFFFF">${proj.title}</text>
          <text x="16" y="42" font-family="Inter, sans-serif" font-size="9" fill="#9CA3AF">${proj.subtitle}</text>
          
          <rect x="380" y="14" width="100" height="22" rx="11" fill="${proj.accent1}" opacity="0.8"/>
          <text x="402" y="28" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="#FFFFFF">ACTIVE</text>

          <!-- Metrics Cards Row -->
          <rect x="0" y="60" width="156" height="68" rx="8" fill="#141228" stroke="rgba(255,255,255,0.05)"/>
          <text x="14" y="80" font-family="Inter, sans-serif" font-size="8" fill="#9CA3AF" text-transform="uppercase">Metric Value</text>
          <text x="14" y="104" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="700" fill="${proj.accent2}">+384.2%</text>

          <rect x="170" y="60" width="156" height="68" rx="8" fill="#141228" stroke="rgba(255,255,255,0.05)"/>
          <text x="184" y="80" font-family="Inter, sans-serif" font-size="8" fill="#9CA3AF" text-transform="uppercase">Latency / SLA</text>
          <text x="184" y="104" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="700" fill="#C4B5FD">99.99%</text>

          <rect x="340" y="60" width="156" height="68" rx="8" fill="#141228" stroke="rgba(255,255,255,0.05)"/>
          <text x="354" y="80" font-family="Inter, sans-serif" font-size="8" fill="#9CA3AF" text-transform="uppercase">System Load</text>
          <text x="354" y="104" font-family="'Space Grotesk', sans-serif" font-size="16" font-weight="700" fill="#22D3EE">Optimal</text>

          <!-- Visual Chart / Node Diagram -->
          <rect x="0" y="140" width="496" height="110" rx="8" fill="#110F24" stroke="rgba(255,255,255,0.05)"/>
          <!-- Polyline chart representation -->
          <path d="M 20 220 Q 80 160 140 180 T 260 160 T 360 200 T 476 150" fill="none" stroke="${proj.accent1}" stroke-width="2.5"/>
          <path d="M 20 220 Q 80 160 140 180 T 260 160 T 360 200 T 476 150 L 476 240 L 20 240 Z" fill="url(#bgGlow)" opacity="0.3"/>
          <circle cx="476" cy="150" r="4" fill="${proj.accent2}"/>
        </g>
      </g>

      <!-- PHONE MOCKUP (Overlapping laptop on bottom right, bleeding off edge) -->
      <g transform="translate(560, 150) rotate(5.5)" filter="url(#softShadow)">
        <!-- Phone Outer Chassis -->
        <rect x="0" y="0" width="180" height="340" rx="30" fill="#0E0C1C" stroke="url(#phoneBorder)" stroke-width="2"/>
        
        <!-- Phone Speaker Pill -->
        <rect x="65" y="8" width="50" height="5" rx="2.5" fill="#252243"/>
        
        <!-- Phone Screen -->
        <rect x="8" y="18" width="164" height="308" rx="24" fill="#090814"/>

        <!-- Phone Dynamic Island -->
        <rect x="62" y="24" width="56" height="14" rx="7" fill="#000000"/>

        <!-- Phone Header -->
        <text x="20" y="62" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">${proj.title}</text>
        <text x="20" y="74" font-family="Inter, sans-serif" font-size="7" fill="#9CA3AF">${proj.stats}</text>

        <!-- Phone Interactive Cards -->
        <rect x="18" y="86" width="144" height="65" rx="8" fill="#171530" stroke="rgba(255,255,255,0.08)"/>
        <circle cx="36" cy="106" r="10" fill="${proj.accent1}" opacity="0.8"/>
        <text x="52" y="104" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#FFFFFF">Direct Connect</text>
        <text x="52" y="115" font-family="Inter, sans-serif" font-size="6.5" fill="#9CA3AF">Active Node Ready</text>
        <rect x="28" y="128" width="124" height="12" rx="6" fill="${proj.accent2}" opacity="0.9"/>
        <text x="60" y="137" font-family="Inter, sans-serif" font-size="6.5" font-weight="700" fill="#000000">CONFIRMED</text>

        <rect x="18" y="160" width="144" height="70" rx="8" fill="#131126" stroke="rgba(255,255,255,0.05)"/>
        <text x="28" y="178" font-family="Inter, sans-serif" font-size="7" fill="#C4B5FD">PERFORMANCE INDEX</text>
        <text x="28" y="196" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="700" fill="#FFFFFF">+98.2%</text>
        <rect x="28" y="206" width="124" height="4" rx="2" fill="rgba(255,255,255,0.1)"/>
        <rect x="28" y="206" width="94" height="4" rx="2" fill="${proj.accent1}"/>
      </g>
    </svg>
    `;

    const outputPath = path.join(workDir, `${proj.slug}.webp`);
    await sharp(Buffer.from(svgContent))
      .webp({ quality: 90 })
      .toFile(outputPath);
    console.log(`Generated ${outputPath}`);
  }
}

generateMockups().catch((err) => {
  console.error('Error generating mockups:', err);
  process.exit(1);
});
