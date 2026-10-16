import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200/80 shadow-xs py-3.5'
          : 'bg-white/90 backdrop-blur-md border-b border-gray-100 py-4'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand: Prism geometric mark + crisp brand typography */}
          <a
            href="#top"
            id="nav-logo"
            aria-label="PrismLogic Home"
            className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet rounded-lg py-1 px-2 -ml-2 transition-transform duration-200"
          >
            <img
              src="/brand/logo-mark.svg"
              alt="PrismLogic Mark"
              className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
              style={{ maxHeight: '34px' }}
            />
            <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-gray-900 group-hover:text-black transition-colors whitespace-nowrap">
              Prism<span className="text-brand-violet">Logic</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-gray-50/90 border border-gray-200/80 px-3.5 py-1.5 rounded-full shadow-2xs">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3.5 py-1.5 text-xs lg:text-sm font-medium text-gray-700 hover:text-gray-950 rounded-full transition-colors hover:bg-white relative group"
              >
                {link.label}
                <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-brand-violet scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right CTA Button */}
          <div className="hidden sm:flex items-center space-x-3">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              id="nav-cta-desktop"
            >
              <Button
                variant="glow"
                size="sm"
                className="shadow-sm"
                rightIcon={<ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />}
              >
                Book a Call
              </Button>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden items-center space-x-2">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="sm:hidden"
            >
              <Button variant="primary" size="sm" className="px-3 py-1.5 text-xs">
                Book
              </Button>
            </a>

            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-700 hover:text-gray-950 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-violet"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-2xl border-b border-gray-200 px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className="block w-full"
            >
              <Button variant="glow" size="md" className="w-full" leftIcon={<Sparkles className="w-4 h-4" />}>
                Book a Call & Consultation
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
