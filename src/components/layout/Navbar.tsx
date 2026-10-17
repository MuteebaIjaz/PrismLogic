import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
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

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

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
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-primary border-b border-indigo-500/40 shadow-md',
          isScrolled ? 'py-3' : 'py-3.5 sm:py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Brand: Prism geometric mark + crisp brand typography */}
            <a
              href="#top"
              id="nav-logo"
              aria-label="PrismLogic Home"
              className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg py-1 px-2 -ml-2 transition-transform duration-200"
            >
              <img
                src="/brand/logo-mark.svg"
                alt="PrismLogic Mark"
                className="h-8 sm:h-9 w-auto object-contain brightness-0 invert group-hover:scale-105 transition-transform"
                style={{ maxHeight: '36px' }}
              />
              <span className="font-display text-xl sm:text-2xl tracking-tight text-white transition-colors whitespace-nowrap">
                <span className="font-black text-white">Prism</span>
                <span className="font-light text-white/90 ml-0.5">Logic</span>
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 lg:space-x-9">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-sm lg:text-base font-semibold text-white/90 hover:text-white transition-colors py-1 relative group cursor-pointer"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
                </a>
              ))}
            </nav>

            {/* Desktop CTA Button: Clean white button with no arrow icon */}
            <div className="hidden md:flex items-center">
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                id="nav-cta-desktop"
              >
                <Button
                  variant="white"
                  size="md"
                  className="px-6 py-2.5 text-sm sm:text-base font-bold shadow-md hover:shadow-xl rounded-xl"
                >
                  Book Call
                </Button>
              </a>
            </div>

            {/* Mobile Hamburger Button Only - No Book Call button on mobile navbar bar */}
            <div className="flex md:hidden items-center">
              <button
                id="mobile-menu-toggle"
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-xl text-white hover:bg-white/15 transition-colors focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Off-Canvas Right Sidebar Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 md:hidden"
            />

            {/* Right Sliding Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-primary z-50 p-6 flex flex-col justify-between shadow-2xl md:hidden border-l border-white/20"
            >
              <div>
                {/* Drawer Header: Brand + Close button */}
                <div className="flex items-center justify-between pb-5 border-b border-white/20">
                  <div className="flex items-center gap-2">
                    <img
                      src="/brand/logo-mark.svg"
                      alt="PrismLogic"
                      className="h-7 w-auto object-contain brightness-0 invert"
                    />
                    <span className="font-display text-xl tracking-tight text-white">
                      <span className="font-black text-white">Prism</span>
                      <span className="font-light text-white/90 ml-0.5">Logic</span>
                    </span>
                  </div>

                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-white hover:bg-white/15 transition-colors focus:outline-none cursor-pointer"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Drawer Nav Links */}
                <nav className="mt-6 flex flex-col space-y-1.5">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="px-4 py-3 rounded-xl text-lg font-semibold text-white/90 hover:text-white hover:bg-white/15 transition-all cursor-pointer"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Drawer Bottom CTA: Book Call Button (No arrow icon) */}
              <div className="pt-6 border-t border-white/20">
                <a
                  href="#contact"
                  onClick={(e) => handleLinkClick(e, '#contact')}
                  className="block w-full"
                >
                  <Button
                    variant="white"
                    size="lg"
                    className="w-full py-3.5 text-base font-bold shadow-md rounded-xl"
                  >
                    Book Call
                  </Button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
