import React from 'react'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { ServicesBento } from './components/sections/ServicesBento'
import { WorkSection } from './components/sections/WorkSection'
import { Testimonials } from './components/sections/Testimonials'
import { ContactLeadFlow } from './components/sections/ContactLeadFlow'
import { Footer } from './components/layout/Footer'
import { ScrollingStrip } from './components/ui/ScrollingStrip'

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#FAF9F6] text-gray-950 flex flex-col font-sans selection:bg-primary selection:text-white">
      {/* Subtle Noise Texture */}
      <div className="fixed inset-0 bg-noise opacity-30 pointer-events-none z-40" />

      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* Hero Section with Signature Prism Refraction Centerpiece */}
        <Hero />

        {/* Continuous Scrolling Strip */}
        <ScrollingStrip />

        {/* Services Grid matching the inspiration layout */}
        <ServicesBento />

        

        {/* Redesigned Selected Work Section */}
        <WorkSection />

        {/* Redesigned Client Testimonials Section */}
        <Testimonials />

        {/* Replaced Contact / Lead Capture Section */}
        <ContactLeadFlow />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default App
