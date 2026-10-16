const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const workDir = path.join('public', 'work');
if (!fs.existsSync(workDir)) {
  fs.mkdirSync(workDir, { recursive: true });
}

// 1. FITNESS MOCKUP SVG
function getFitnessSvg() {
  return `
  <svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="fitGlow" cx="50%" cy="35%" r="65%">
        <stop offset="0%" stop-color="#EC4899" stop-opacity="0.32"/>
        <stop offset="60%" stop-color="#6D28D9" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#080712" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="fitHRLin" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#38BDF8"/>
        <stop offset="40%" stop-color="#A855F7"/>
        <stop offset="75%" stop-color="#EC4899"/>
        <stop offset="100%" stop-color="#F43F5E"/>
      </linearGradient>
      <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#000000" flood-opacity="0.65"/>
      </filter>
    </defs>

    <!-- Canvas Base -->
    <rect width="800" height="500" fill="#090814"/>
    <rect width="800" height="500" fill="url(#fitGlow)"/>

    <!-- Geometric telemetry grid lines -->
    <g opacity="0.12" stroke="#EC4899" stroke-width="0.75" stroke-dasharray="4 6">
      <line x1="0" y1="100" x2="800" y2="100"/>
      <line x1="0" y1="230" x2="800" y2="230"/>
      <line x1="0" y1="360" x2="800" y2="360"/>
      <line x1="200" y1="0" x2="200" y2="500"/>
      <line x1="480" y1="0" x2="480" y2="500"/>
    </g>

    <!-- LAPTOP: ATHLETE TELEMETRY DASHBOARD -->
    <g transform="translate(48, 42) rotate(-3)" filter="url(#softShadow)">
      <!-- Bezel -->
      <rect x="0" y="0" width="570" height="364" rx="14" fill="#141124" stroke="rgba(255,255,255,0.18)" stroke-width="1.5"/>
      <circle cx="285" cy="11" r="3" fill="#EC4899" opacity="0.8"/>

      <!-- Screen -->
      <rect x="16" y="22" width="538" height="326" rx="8" fill="#0A0914"/>

      <!-- Laptop Window Header Bar -->
      <rect x="16" y="22" width="538" height="34" fill="#18152B"/>
      <circle cx="34" cy="39" r="4.5" fill="#EF4444" opacity="0.9"/>
      <circle cx="48" cy="39" r="4.5" fill="#F59E0B" opacity="0.9"/>
      <circle cx="62" cy="39" r="4.5" fill="#10B981" opacity="0.9"/>
      <rect x="160" y="31" width="220" height="17" rx="5" fill="rgba(255,255,255,0.06)"/>
      <text x="175" y="43" font-family="'Space Grotesk', sans-serif" font-size="9" font-weight="600" fill="#E4E4E7">exo-athlete.live/telemetry</text>
      
      <!-- Top Status Pill -->
      <rect x="420" y="30" width="118" height="18" rx="9" fill="rgba(236,72,153,0.2)" stroke="rgba(236,72,153,0.5)" stroke-width="1"/>
      <circle cx="432" cy="39" r="3" fill="#EC4899"/>
      <text x="442" y="43" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#FCE7F3">LIVE HEART SYNC</text>

      <!-- Dashboard Body Content -->
      <g transform="translate(32, 68)">
        <!-- Top Metrics Triple Bar -->
        <!-- Card 1: Heart Rate Zone -->
        <rect x="0" y="0" width="158" height="66" rx="8" fill="#16132A" stroke="rgba(236,72,153,0.3)" stroke-width="1"/>
        <text x="12" y="18" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#9CA3AF" letter-spacing="0.5">HEART RATE</text>
        <text x="12" y="42" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#F43F5E">164 <tspan font-size="11" font-weight="500" fill="#FDA4AF">BPM</tspan></text>
        <rect x="12" y="49" width="70" height="11" rx="5.5" fill="#E11D48" opacity="0.85"/>
        <text x="20" y="58" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#FFFFFF">ZONE 4 (88%)</text>

        <!-- Card 2: VO2 Max -->
        <rect x="174" y="0" width="158" height="66" rx="8" fill="#16132A" stroke="rgba(255,255,255,0.08)"/>
        <text x="186" y="18" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#9CA3AF" letter-spacing="0.5">EST. VO2 MAX</text>
        <text x="186" y="42" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#38BDF8">59.4 <tspan font-size="10" font-weight="500" fill="#BAE6FD">ml/kg</tspan></text>
        <text x="186" y="57" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#10B981">Top 2% Elite Athlete</text>

        <!-- Card 3: Energy Output -->
        <rect x="348" y="0" width="158" height="66" rx="8" fill="#16132A" stroke="rgba(255,255,255,0.08)"/>
        <text x="360" y="18" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#9CA3AF" letter-spacing="0.5">ACTIVE BURN</text>
        <text x="360" y="42" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#F59E0B">842 <tspan font-size="11" font-weight="500" fill="#FDE68A">KCAL</tspan></text>
        <text x="360" y="57" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#C4B5FD">Cadence 178 SPM</text>

        <!-- Telemetry ECG / Heart Rate Zone Chart -->
        <g transform="translate(0, 78)">
          <rect x="0" y="0" width="506" height="152" rx="10" fill="#110E21" stroke="rgba(255,255,255,0.08)"/>
          
          <text x="14" y="20" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Session Interval Telemetry (Sprint Block 4/8)</text>
          <text x="390" y="20" font-family="Inter, sans-serif" font-size="9" font-weight="600" fill="#EC4899">TARGET: 160-175 BPM</text>

          <!-- Zone Bands (horizontal) -->
          <rect x="14" y="32" width="478" height="24" fill="rgba(244,63,94,0.12)"/>
          <text x="20" y="48" font-family="Inter, sans-serif" font-size="7.5" fill="#FDA4AF">Zone 5 Peak (175+ BPM)</text>
          
          <rect x="14" y="56" width="478" height="28" fill="rgba(236,72,153,0.14)"/>
          <text x="20" y="74" font-family="Inter, sans-serif" font-size="7.5" fill="#F472B6">Zone 4 Threshold (160-174 BPM)</text>

          <rect x="14" y="84" width="478" height="28" fill="rgba(168,85,247,0.10)"/>
          <text x="20" y="102" font-family="Inter, sans-serif" font-size="7.5" fill="#C084FC">Zone 3 Aerobic (140-159 BPM)</text>

          <rect x="14" y="112" width="478" height="30" fill="rgba(56,189,248,0.08)"/>
          <text x="20" y="130" font-family="Inter, sans-serif" font-size="7.5" fill="#7DD3FC">Zone 2 Base Endurance (120-139 BPM)</text>

          <!-- Dynamic Wave Path -->
          <path d="M 14 130 Q 50 125 90 95 T 160 55 T 230 46 T 290 85 T 350 50 T 420 44 T 490 60" 
                fill="none" stroke="url(#fitHRLin)" stroke-width="3" stroke-linecap="round"/>
          
          <!-- Current Point Pulse Indicator -->
          <circle cx="420" cy="44" r="5" fill="#F43F5E"/>
          <circle cx="420" cy="44" r="9" fill="#F43F5E" opacity="0.3"/>
        </g>
      </g>
    </g>

    <!-- SMARTPHONE: LIVE COMPANION APP (OVERLAPPING RIGHT) -->
    <g transform="translate(560, 140) rotate(5.5)" filter="url(#softShadow)">
      <!-- Chassis -->
      <rect x="0" y="0" width="186" height="350" rx="32" fill="#131024" stroke="rgba(236,72,153,0.35)" stroke-width="2"/>
      <rect x="68" y="9" width="50" height="5" rx="2.5" fill="#282247"/>

      <!-- Phone Inner Screen -->
      <rect x="8" y="18" width="170" height="318" rx="26" fill="#0A0815"/>

      <!-- Dynamic Island -->
      <rect x="64" y="24" width="58" height="14" rx="7" fill="#000000"/>
      <circle cx="73" cy="31" r="3" fill="#EC4899"/>
      <text x="82" y="35" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#EC4899">164</text>

      <!-- App Header -->
      <g transform="translate(18, 54)">
        <text x="0" y="10" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Live Workout</text>
        <text x="0" y="22" font-family="Inter, sans-serif" font-size="8" fill="#9CA3AF">Track: Interval Sprint #4</text>

        <!-- Big Metric Pill Card -->
        <rect x="0" y="30" width="150" height="68" rx="10" fill="#18142F" stroke="rgba(236,72,153,0.25)"/>
        <text x="12" y="48" font-family="Inter, sans-serif" font-size="7.5" fill="#9CA3AF">PACE / KM</text>
        <text x="12" y="70" font-family="'Space Grotesk', sans-serif" font-size="20" font-weight="700" fill="#38BDF8">3:42 <tspan font-size="9" fill="#7DD3FC">/km</tspan></text>
        
        <circle cx="120" cy="62" r="16" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="4"/>
        <circle cx="120" cy="62" r="16" fill="none" stroke="#EC4899" stroke-width="4" stroke-dasharray="75 100"/>
        <text x="113" y="65" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#FFFFFF">88%</text>

        <!-- Split Times Card -->
        <rect x="0" y="106" width="150" height="82" rx="10" fill="#141126" stroke="rgba(255,255,255,0.06)"/>
        <text x="10" y="122" font-family="'Space Grotesk', sans-serif" font-size="8.5" font-weight="700" fill="#E4E4E7">INTERVAL SPLITS</text>
        
        <text x="10" y="140" font-family="Inter, sans-serif" font-size="8" fill="#D4D4D8">Lap 1 (400m)</text>
        <text x="110" y="140" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#10B981">1:12.4</text>

        <text x="10" y="156" font-family="Inter, sans-serif" font-size="8" fill="#D4D4D8">Lap 2 (400m)</text>
        <text x="110" y="156" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#10B981">1:10.8</text>

        <text x="10" y="172" font-family="Inter, sans-serif" font-size="8" fill="#D4D4D8">Lap 3 (400m)</text>
        <text x="110" y="172" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#F43F5E">1:09.1 🔥</text>

        <!-- Finish Session CTA -->
        <rect x="0" y="196" width="150" height="24" rx="12" fill="#EC4899"/>
        <text x="42" y="212" font-family="'Space Grotesk', sans-serif" font-size="9" font-weight="700" fill="#FFFFFF">SYNC WORKOUT</text>
      </g>
    </g>
  </svg>
  `;
}

// 2. COFFEE E-COMMERCE MOCKUP SVG
function getCoffeeSvg() {
  return `
  <svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="coffeeGlow" cx="45%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#F59E0B" stop-opacity="0.32"/>
        <stop offset="55%" stop-color="#8B5CF6" stop-opacity="0.16"/>
        <stop offset="100%" stop-color="#0B0914" stop-opacity="0"/>
      </radialGradient>
      <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#000000" flood-opacity="0.65"/>
      </filter>
    </defs>

    <!-- Canvas Base -->
    <rect width="800" height="500" fill="#0C0A14"/>
    <rect width="800" height="500" fill="url(#coffeeGlow)"/>

    <!-- Geometric warm ambient grid -->
    <g opacity="0.10" stroke="#F59E0B" stroke-width="0.75">
      <circle cx="260" cy="220" r="180"/>
      <circle cx="260" cy="220" r="320"/>
    </g>

    <!-- LAPTOP: SPECIALTY COFFEE STOREFRONT -->
    <g transform="translate(48, 42) rotate(-3)" filter="url(#softShadow)">
      <!-- Bezel -->
      <rect x="0" y="0" width="570" height="364" rx="14" fill="#151224" stroke="rgba(245,158,11,0.25)" stroke-width="1.5"/>
      <circle cx="285" cy="11" r="3" fill="#F59E0B" opacity="0.8"/>

      <!-- Screen -->
      <rect x="16" y="22" width="538" height="326" rx="8" fill="#0D0A17"/>

      <!-- Window Top Navigation -->
      <rect x="16" y="22" width="538" height="34" fill="#1C1733"/>
      <circle cx="34" cy="39" r="4.5" fill="#EF4444" opacity="0.9"/>
      <circle cx="48" cy="39" r="4.5" fill="#F59E0B" opacity="0.9"/>
      <circle cx="62" cy="39" r="4.5" fill="#10B981" opacity="0.9"/>
      <rect x="160" y="31" width="220" height="17" rx="5" fill="rgba(255,255,255,0.06)"/>
      <text x="175" y="43" font-family="'Space Grotesk', sans-serif" font-size="9" font-weight="600" fill="#FDE68A">saltycoffee.com/single-origin</text>

      <!-- Cart Icon / Count -->
      <rect x="440" y="30" width="98" height="18" rx="9" fill="rgba(245,158,11,0.2)" stroke="rgba(245,158,11,0.5)" stroke-width="1"/>
      <text x="454" y="42" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#FDE68A">CART: 2 ITEMS ($46)</text>

      <!-- Store Product Showcase Body -->
      <g transform="translate(32, 68)">
        <!-- Left: Artisanal Coffee Bag Mockup Container -->
        <g transform="translate(0, 0)">
          <rect x="0" y="0" width="168" height="236" rx="12" fill="#16122C" stroke="rgba(255,255,255,0.08)"/>
          
          <!-- Coffee Bag Graphic -->
          <rect x="24" y="20" width="120" height="180" rx="8" fill="#1F1A3A" stroke="#F59E0B" stroke-width="1.5"/>
          <!-- Coffee Bag Foil Seal -->
          <rect x="24" y="20" width="120" height="18" rx="4" fill="#F59E0B" opacity="0.9"/>
          <text x="56" y="32" font-family="'Space Grotesk', sans-serif" font-size="7" font-weight="800" fill="#000000">DIRECT TRADE</text>

          <!-- Coffee Bag Label -->
          <rect x="36" y="52" width="96" height="110" rx="4" fill="#FFFFFF"/>
          <text x="48" y="72" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="800" fill="#1F1A3A">SALTY COFFEE</text>
          <text x="56" y="84" font-family="Inter, sans-serif" font-size="7" font-weight="600" fill="#F59E0B">ETHIOPIA GUJI</text>
          
          <line x1="44" y1="92" x2="124" y2="92" stroke="#E5E7EB" stroke-width="1"/>
          
          <text x="44" y="104" font-family="Inter, sans-serif" font-size="6" fill="#4B5563">ALT: 2,150 MASL</text>
          <text x="44" y="114" font-family="Inter, sans-serif" font-size="6" fill="#4B5563">PROCESS: NATURAL</text>
          <text x="44" y="124" font-family="Inter, sans-serif" font-size="6" fill="#4B5563">HARVEST: 2026 LOT 8</text>
          
          <rect x="44" y="132" width="80" height="18" rx="3" fill="#FEF3C7"/>
          <text x="48" y="144" font-family="Inter, sans-serif" font-size="6.5" font-weight="700" fill="#B45309">CUPPING: 94.2 PTS</text>

          <text x="64" y="214" font-family="Inter, sans-serif" font-size="7.5" fill="#9CA3AF">250g / 8.8 oz</text>
        </g>

        <!-- Right: Product Information & Interactive Selectors -->
        <g transform="translate(186, 0)">
          <!-- Eyebrow Tag -->
          <rect x="0" y="2" width="130" height="16" rx="8" fill="rgba(245,158,11,0.18)"/>
          <text x="10" y="13" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#FBBF24">SINGLE-ORIGIN RESERVE</text>

          <!-- Title & Price -->
          <text x="0" y="38" font-family="'Space Grotesk', sans-serif" font-size="17" font-weight="800" fill="#FFFFFF">Ethiopia Guji Highland Natural</text>
          
          <text x="0" y="58" font-family="'Space Grotesk', sans-serif" font-size="18" font-weight="700" fill="#F59E0B">$24.00 <tspan font-size="10" font-weight="400" fill="#9CA3AF">USD • Free Express Shipping</tspan></text>

          <!-- Sensory Tasting Notes Chips -->
          <text x="0" y="78" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#D1D5DB" letter-spacing="0.5">TASTING NOTES:</text>
          <g transform="translate(0, 84)">
            <rect x="0" y="0" width="70" height="18" rx="9" fill="#1F1A3A" stroke="rgba(245,158,11,0.4)"/>
            <text x="10" y="12" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#FDE68A">Wild Peach</text>

            <rect x="76" y="0" width="80" height="18" rx="9" fill="#1F1A3A" stroke="rgba(245,158,11,0.4)"/>
            <text x="86" y="12" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#FDE68A">Bergamot</text>

            <rect x="162" y="0" width="76" height="18" rx="9" fill="#1F1A3A" stroke="rgba(245,158,11,0.4)"/>
            <text x="172" y="12" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#FDE68A">Meyer Lemon</text>

            <rect x="244" y="0" width="68" height="18" rx="9" fill="#1F1A3A" stroke="rgba(245,158,11,0.4)"/>
            <text x="254" y="12" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#FDE68A">Orange Blossom</text>
          </g>

          <!-- Grind Selection Row -->
          <text x="0" y="120" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#D1D5DB" letter-spacing="0.5">GRIND SELECTION:</text>
          <g transform="translate(0, 126)">
            <rect x="0" y="0" width="90" height="22" rx="6" fill="#F59E0B"/>
            <text x="14" y="14" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#000000">Whole Bean ✓</text>

            <rect x="96" y="0" width="70" height="22" rx="6" fill="#1F1A3A" stroke="rgba(255,255,255,0.1)"/>
            <text x="110" y="14" font-family="Inter, sans-serif" font-size="8" fill="#9CA3AF">Filter Drip</text>

            <rect x="172" y="0" width="70" height="22" rx="6" fill="#1F1A3A" stroke="rgba(255,255,255,0.1)"/>
            <text x="186" y="14" font-family="Inter, sans-serif" font-size="8" fill="#9CA3AF">Espresso</text>
          </g>

          <!-- Add to Cart CTA + Ratings -->
          <g transform="translate(0, 166)">
            <rect x="0" y="0" width="180" height="34" rx="8" fill="url(#coffeeGlow)" stroke="#F59E0B" stroke-width="1.5"/>
            <text x="36" y="21" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">ADD TO CART • $24</text>

            <g transform="translate(200, 8)">
              <text x="0" y="10" font-family="Inter, sans-serif" font-size="10" fill="#F59E0B">★★★★★</text>
              <text x="0" y="22" font-family="Inter, sans-serif" font-size="7.5" fill="#9CA3AF">4.9/5 (184 Verified Reviews)</text>
            </g>
          </g>

          <!-- Farmgate Transparency Banner -->
          <rect x="0" y="212" width="310" height="22" rx="6" fill="#141126" stroke="rgba(255,255,255,0.06)"/>
          <text x="10" y="226" font-family="Inter, sans-serif" font-size="7.5" font-weight="600" fill="#10B981">✓ Direct-Trade Fair Transparency: Farmgate $4.85/lb paid</text>
        </g>
      </g>
    </g>

    <!-- SMARTPHONE: QUICK MOBILE CHECKOUT -->
    <g transform="translate(560, 140) rotate(5.5)" filter="url(#softShadow)">
      <!-- Chassis -->
      <rect x="0" y="0" width="186" height="350" rx="32" fill="#151124" stroke="rgba(245,158,11,0.35)" stroke-width="2"/>
      <rect x="68" y="9" width="50" height="5" rx="2.5" fill="#282247"/>

      <!-- Phone Inner Screen -->
      <rect x="8" y="18" width="170" height="318" rx="26" fill="#0C0A15"/>

      <!-- Dynamic Island -->
      <rect x="64" y="24" width="58" height="14" rx="7" fill="#000000"/>
      <text x="76" y="34" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#F59E0B">CART (2)</text>

      <!-- Mobile Screen Content -->
      <g transform="translate(18, 54)">
        <text x="0" y="10" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Order Summary</text>
        <text x="0" y="22" font-family="Inter, sans-serif" font-size="7.5" fill="#9CA3AF">Free Express Delivery Unlocked</text>

        <!-- Cart Item 1 -->
        <rect x="0" y="32" width="150" height="48" rx="8" fill="#1A1530" stroke="rgba(255,255,255,0.06)"/>
        <rect x="8" y="40" width="30" height="32" rx="4" fill="#F59E0B" opacity="0.8"/>
        <text x="44" y="48" font-family="'Space Grotesk', sans-serif" font-size="8" font-weight="700" fill="#FFFFFF">Ethiopia Guji Natural</text>
        <text x="44" y="58" font-family="Inter, sans-serif" font-size="7" fill="#9CA3AF">Whole Bean • 250g</text>
        <text x="44" y="70" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#F59E0B">$24.00</text>

        <!-- Cart Item 2 -->
        <rect x="0" y="86" width="150" height="48" rx="8" fill="#1A1530" stroke="rgba(255,255,255,0.06)"/>
        <rect x="8" y="94" width="30" height="32" rx="4" fill="#8B5CF6" opacity="0.8"/>
        <text x="44" y="102" font-family="'Space Grotesk', sans-serif" font-size="8" font-weight="700" fill="#FFFFFF">Colombia Pink Bourbon</text>
        <text x="44" y="112" font-family="Inter, sans-serif" font-size="7" fill="#9CA3AF">Whole Bean • 250g</text>
        <text x="44" y="124" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#F59E0B">$22.00</text>

        <!-- Total Breakdown Card -->
        <rect x="0" y="142" width="150" height="52" rx="8" fill="#141126" stroke="rgba(255,255,255,0.05)"/>
        <text x="10" y="156" font-family="Inter, sans-serif" font-size="7.5" fill="#9CA3AF">Subtotal</text>
        <text x="115" y="156" font-family="Inter, sans-serif" font-size="7.5" fill="#FFFFFF">$46.00</text>
        <text x="10" y="168" font-family="Inter, sans-serif" font-size="7.5" fill="#9CA3AF">Shipping</text>
        <text x="120" y="168" font-family="Inter, sans-serif" font-size="7.5" font-weight="700" fill="#10B981">FREE</text>
        <line x1="10" y1="174" x2="140" y2="174" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
        <text x="10" y="186" font-family="Inter, sans-serif" font-size="8.5" font-weight="700" fill="#FFFFFF">Total</text>
        <text x="110" y="186" font-family="'Space Grotesk', sans-serif" font-size="9" font-weight="700" fill="#F59E0B">$46.00</text>

        <!-- 1-Click Apple Pay / Checkout -->
        <rect x="0" y="202" width="150" height="26" rx="13" fill="#F59E0B"/>
        <text x="32" y="218" font-family="'Space Grotesk', sans-serif" font-size="9" font-weight="700" fill="#000000">1-CLICK CHECKOUT</text>
      </g>
    </g>
  </svg>
  `;
}

// 3. EDU LMS PORTAL MOCKUP SVG
function getEduSvg() {
  return `
  <svg width="800" height="500" viewBox="0 0 800 500" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="eduGlow" cx="45%" cy="40%" r="65%">
        <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.32"/>
        <stop offset="55%" stop-color="#4F46E5" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#070914" stop-opacity="0"/>
      </radialGradient>
      <filter id="softShadow" x="-10%" y="-10%" width="130%" height="130%">
        <feDropShadow dx="0" dy="16" stdDeviation="22" flood-color="#000000" flood-opacity="0.65"/>
      </filter>
    </defs>

    <!-- Canvas Base -->
    <rect width="800" height="500" fill="#070A14"/>
    <rect width="800" height="500" fill="url(#eduGlow)"/>

    <!-- Geometric LMS Course Path Grid -->
    <g opacity="0.10" stroke="#06B6D4" stroke-width="0.75" stroke-dasharray="3 5">
      <circle cx="400" cy="250" r="150"/>
      <circle cx="400" cy="250" r="300"/>
    </g>

    <!-- LAPTOP: ADAPTIVE LEARNING PORTAL -->
    <g transform="translate(48, 42) rotate(-3)" filter="url(#softShadow)">
      <!-- Bezel -->
      <rect x="0" y="0" width="570" height="364" rx="14" fill="#0F172A" stroke="rgba(6,182,212,0.25)" stroke-width="1.5"/>
      <circle cx="285" cy="11" r="3" fill="#06B6D4" opacity="0.8"/>

      <!-- Screen -->
      <rect x="16" y="22" width="538" height="326" rx="8" fill="#0B1120"/>

      <!-- Window Top Navigation -->
      <rect x="16" y="22" width="538" height="34" fill="#141E33"/>
      <circle cx="34" cy="39" r="4.5" fill="#EF4444" opacity="0.9"/>
      <circle cx="48" cy="39" r="4.5" fill="#F59E0B" opacity="0.9"/>
      <circle cx="62" cy="39" r="4.5" fill="#10B981" opacity="0.9"/>
      <rect x="160" y="31" width="220" height="17" rx="5" fill="rgba(255,255,255,0.06)"/>
      <text x="175" y="43" font-family="'Space Grotesk', sans-serif" font-size="9" font-weight="600" fill="#CFFAFE">myeduhelp.portal/curriculum</text>

      <!-- Student Status Pill -->
      <rect x="420" y="30" width="118" height="18" rx="9" fill="rgba(6,182,212,0.18)" stroke="rgba(6,182,212,0.4)" stroke-width="1"/>
      <circle cx="432" cy="39" r="3" fill="#06B6D4"/>
      <text x="442" y="43" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#CFFAFE">ALEX C. • 96% GPA</text>

      <!-- Student Dashboard Body -->
      <g transform="translate(32, 68)">
        <!-- Top Track Banner -->
        <rect x="0" y="0" width="506" height="54" rx="10" fill="#111C38" stroke="rgba(6,182,212,0.25)" stroke-width="1"/>
        <text x="16" y="22" font-family="'Space Grotesk', sans-serif" font-size="13" font-weight="800" fill="#FFFFFF">Adaptive Module: Advanced Graph Algorithms &amp; Heuristics</text>
        <text x="16" y="36" font-family="Inter, sans-serif" font-size="8.5" fill="#94A3B8">Track Progress: 84% Completed • 7 of 9 Milestones Mastered</text>

        <!-- Progress Bar -->
        <rect x="16" y="42" width="340" height="5" rx="2.5" fill="rgba(255,255,255,0.1)"/>
        <rect x="16" y="42" width="285" height="5" rx="2.5" fill="#06B6D4"/>
        <text x="370" y="47" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#38BDF8">84% DONE</text>

        <!-- 3 Cards: Video Lesson, Mentor Status, Quiz Results -->
        <g transform="translate(0, 64)">
          <!-- Video Lesson Card -->
          <rect x="0" y="0" width="180" height="90" rx="8" fill="#132140" stroke="rgba(255,255,255,0.06)"/>
          <text x="12" y="18" font-family="Inter, sans-serif" font-size="7.5" font-weight="700" fill="#38BDF8">UP NEXT: VIDEO LECTURE</text>
          <text x="12" y="34" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Dijkstra vs A* Search</text>
          
          <rect x="12" y="44" width="70" height="20" rx="10" fill="#06B6D4"/>
          <text x="24" y="57" font-family="Inter, sans-serif" font-size="8" font-weight="700" fill="#042F2E">▶ 18:40 MIN</text>
          <text x="90" y="58" font-family="Inter, sans-serif" font-size="7.5" fill="#94A3B8">Module Quiz Unlocks</text>
          
          <rect x="12" y="72" width="156" height="10" rx="3" fill="#0B132B"/>
          <text x="18" y="80" font-family="Inter, sans-serif" font-size="6.5" fill="#64748B">Instructor: Dr. Marcus Vance, MIT</text>

          <!-- Mentor Match Card -->
          <rect x="194" y="0" width="150" height="90" rx="8" fill="#132140" stroke="rgba(255,255,255,0.06)"/>
          <text x="206" y="18" font-family="Inter, sans-serif" font-size="7.5" font-weight="700" fill="#A78BFA">1-ON-1 MENTOR</text>
          <text x="206" y="34" font-family="'Space Grotesk', sans-serif" font-size="10" font-weight="700" fill="#FFFFFF">Dr. Elena Rostova</text>
          
          <rect x="206" y="44" width="60" height="14" rx="7" fill="rgba(16,185,129,0.2)"/>
          <text x="214" y="54" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#34D399">● ONLINE</text>
          
          <text x="206" y="72" font-family="Inter, sans-serif" font-size="7.5" fill="#94A3B8">Match Score: 98.4%</text>
          <text x="206" y="82" font-family="Inter, sans-serif" font-size="7" font-weight="600" fill="#38BDF8">Next Review: Today 4:00 PM</text>

          <!-- Quiz Assessment Performance -->
          <rect x="356" y="0" width="150" height="90" rx="8" fill="#132140" stroke="rgba(255,255,255,0.06)"/>
          <text x="368" y="18" font-family="Inter, sans-serif" font-size="7.5" font-weight="700" fill="#34D399">COHORT RANKING</text>
          <text x="368" y="42" font-family="'Space Grotesk', sans-serif" font-size="22" font-weight="700" fill="#34D399">96.8%</text>
          <text x="368" y="58" font-family="Inter, sans-serif" font-size="8" fill="#94A3B8">Top 2% in Class</text>
          <rect x="368" y="66" width="126" height="14" rx="4" fill="rgba(6,182,212,0.15)"/>
          <text x="376" y="76" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#38BDF8">Certificate Ready in 2 Days</text>
        </g>

        <!-- Syllabus Timeline Progress -->
        <g transform="translate(0, 164)">
          <rect x="0" y="0" width="506" height="66" rx="8" fill="#0F1A33" stroke="rgba(255,255,255,0.05)"/>
          <text x="14" y="16" font-family="'Space Grotesk', sans-serif" font-size="9" font-weight="700" fill="#CFFAFE">Adaptive Learning Pathway</text>
          
          <!-- Node Steps -->
          <circle cx="40" cy="38" r="10" fill="#10B981"/>
          <text x="36" y="42" font-family="Inter, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF">✓</text>
          <text x="16" y="58" font-family="Inter, sans-serif" font-size="6.5" fill="#94A3B8">Big-O Bounds</text>

          <line x1="50" y1="38" x2="140" y2="38" stroke="#10B981" stroke-width="2"/>

          <circle cx="150" cy="38" r="10" fill="#10B981"/>
          <text x="146" y="42" font-family="Inter, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF">✓</text>
          <text x="126" y="58" font-family="Inter, sans-serif" font-size="6.5" fill="#94A3B8">Trees &amp; Heaps</text>

          <line x1="160" y1="38" x2="250" y2="38" stroke="#06B6D4" stroke-width="2"/>

          <circle cx="260" cy="38" r="10" fill="#06B6D4"/>
          <text x="256" y="42" font-family="Inter, sans-serif" font-size="9" font-weight="800" fill="#FFFFFF">▶</text>
          <text x="236" y="58" font-family="Inter, sans-serif" font-size="6.5" font-weight="700" fill="#38BDF8">Graph Search</text>

          <line x1="270" y1="38" x2="360" y2="38" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>

          <circle cx="370" cy="38" r="10" fill="#1E293B"/>
          <text x="366" y="42" font-family="Inter, sans-serif" font-size="8" fill="#64748B">4</text>
          <text x="350" y="58" font-family="Inter, sans-serif" font-size="6.5" fill="#64748B">Dynamic Prog.</text>

          <line x1="380" y1="38" x2="450" y2="38" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>

          <circle cx="460" cy="38" r="10" fill="#1E293B"/>
          <text x="456" y="42" font-family="Inter, sans-serif" font-size="8" fill="#64748B">5</text>
          <text x="440" y="58" font-family="Inter, sans-serif" font-size="6.5" fill="#64748B">Final Capstone</text>
        </g>
      </g>
    </g>

    <!-- SMARTPHONE: DAILY FLASHCARD & STREAK APP -->
    <g transform="translate(560, 140) rotate(5.5)" filter="url(#softShadow)">
      <!-- Chassis -->
      <rect x="0" y="0" width="186" height="350" rx="32" fill="#0F172A" stroke="rgba(6,182,212,0.35)" stroke-width="2"/>
      <rect x="68" y="9" width="50" height="5" rx="2.5" fill="#1E293B"/>

      <!-- Phone Inner Screen -->
      <rect x="8" y="18" width="170" height="318" rx="26" fill="#090E1A"/>

      <!-- Dynamic Island -->
      <rect x="64" y="24" width="58" height="14" rx="7" fill="#000000"/>
      <text x="74" y="34" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#38BDF8">21 DAYS 🔥</text>

      <!-- Mobile Screen Content -->
      <g transform="translate(18, 54)">
        <text x="0" y="10" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="#FFFFFF">Daily Adaptive Quiz</text>
        <text x="0" y="22" font-family="Inter, sans-serif" font-size="7.5" fill="#94A3B8">Streak: 21 Days Active 🔥</text>

        <!-- Flashcard Preview -->
        <rect x="0" y="32" width="150" height="106" rx="10" fill="#132140" stroke="rgba(6,182,212,0.3)"/>
        <text x="10" y="48" font-family="Inter, sans-serif" font-size="7.5" font-weight="700" fill="#38BDF8">QUESTION 8 OF 10</text>
        
        <text x="10" y="66" font-family="'Space Grotesk', sans-serif" font-size="8.5" font-weight="600" fill="#F8FAFC">What is the amortized</text>
        <text x="10" y="78" font-family="'Space Grotesk', sans-serif" font-size="8.5" font-weight="600" fill="#F8FAFC">time complexity of</text>
        <text x="10" y="90" font-family="'Space Grotesk', sans-serif" font-size="8.5" font-weight="600" fill="#F8FAFC">Fibonacci Heap decrease-key?</text>

        <!-- Answer Options -->
        <rect x="10" y="100" width="60" height="18" rx="4" fill="#06B6D4"/>
        <text x="22" y="112" font-family="'Space Grotesk', sans-serif" font-size="8" font-weight="800" fill="#000000">O(1) ✓</text>

        <rect x="76" y="100" width="64" height="18" rx="4" fill="#1E293B"/>
        <text x="86" y="112" font-family="Inter, sans-serif" font-size="8" fill="#94A3B8">O(log V)</text>

        <!-- Progress Indicator -->
        <rect x="0" y="150" width="150" height="42" rx="8" fill="#0F1B33" stroke="rgba(255,255,255,0.05)"/>
        <text x="10" y="166" font-family="Inter, sans-serif" font-size="7.5" fill="#94A3B8">Mastery Level</text>
        <text x="10" y="180" font-family="'Space Grotesk', sans-serif" font-size="11" font-weight="700" fill="#34D399">Master Level V</text>
        
        <circle cx="120" cy="171" r="12" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="3"/>
        <circle cx="120" cy="171" r="12" fill="none" stroke="#06B6D4" stroke-width="3" stroke-dasharray="60 100"/>
        <text x="114" y="174" font-family="Inter, sans-serif" font-size="7" font-weight="700" fill="#FFFFFF">94%</text>

        <!-- Submit CTA Button -->
        <rect x="0" y="202" width="150" height="26" rx="13" fill="#06B6D4"/>
        <text x="36" y="218" font-family="'Space Grotesk', sans-serif" font-size="9" font-weight="700" fill="#042F2E">SUBMIT ANSWERS</text>
      </g>
    </g>
  </svg>
  `;
}

async function run() {
  console.log('Generating distinct industry mockups...');

  // 1. Fitness
  const fitSvg = getFitnessSvg();
  const fitBuffer = Buffer.from(fitSvg);
  await sharp(fitBuffer).webp({ quality: 92 }).toFile(path.join(workDir, 'apex-fitness.webp'));
  await sharp(fitBuffer).webp({ quality: 92 }).toFile(path.join(workDir, 'flexi-fit.webp'));
  console.log('Generated apex-fitness.webp & flexi-fit.webp (Athlete Analytics)');

  // 2. Coffee
  const coffeeSvg = getCoffeeSvg();
  const coffeeBuffer = Buffer.from(coffeeSvg);
  await sharp(coffeeBuffer).webp({ quality: 92 }).toFile(path.join(workDir, 'cremo-coffee.webp'));
  await sharp(coffeeBuffer).webp({ quality: 92 }).toFile(path.join(workDir, 'drinky-coffee.webp'));
  console.log('Generated cremo-coffee.webp & drinky-coffee.webp (Direct-Trade Coffee)');

  // 3. Edu
  const eduSvg = getEduSvg();
  const eduBuffer = Buffer.from(eduSvg);
  await sharp(eduBuffer).webp({ quality: 92 }).toFile(path.join(workDir, 'quick-edu-help.webp'));
  console.log('Generated quick-edu-help.webp (Adaptive LMS & Learning)');

  console.log('All mockups generated successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
