import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Case Studies', href: '#work' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ]

  const serviceLinks = [
    'AI & Autonomous Workflows',
    'Custom Software Architecture',
    'Next-Gen Web & Mobile Apps',
    'Cloud Engineering & Kubernetes',
    'High-Conversion UI/UX Design',
    'SOC 2 & Cybersecurity',
  ]

  return (
    <footer className="relative bg-brand-violet text-white border-t border-violet-400/30 pt-16 pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#top" className="inline-block p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg">
              <img
                src="/brand/logo-full.svg"
                alt="PrismLogic Logo"
                className="h-8 w-auto object-contain brightness-110"
                style={{ maxHeight: '36px' }}
              />
            </a>

            <p className="text-sm text-purple-100/90 max-w-sm leading-relaxed font-normal">
              PrismLogic transforms complex technical friction into crystal-clear, high-velocity digital products. Specializing in bespoke software engineering, AI workflow automations, and resilient cloud infrastructure.
            </p>

          

            {/* Social links */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-purple-100 hover:text-white hover:border-white/40 hover:bg-white/20 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-purple-100 hover:text-white hover:border-white/40 hover:bg-white/20 transition-colors shadow-2xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-purple-100 hover:text-white hover:border-white/40 hover:bg-white/20 transition-colors shadow-2xs"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-purple-100/90">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm text-purple-100/90">
              {serviceLinks.map((item) => (
                <li key={item}>
                  <a href="#services" className="hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / Office */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Get in Touch
            </h4>
            <div className="space-y-3 text-sm text-purple-100/90">
              <p>
                Ready to accelerate your roadmap? Submit a brief for instant AI qualification.
              </p>
              <p className="text-xs text-white font-mono font-semibold">
                hello@prismlogic.io
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center text-xs font-semibold text-brand-cyan hover:underline"
                >
                  Start Project Qualification &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-200/90 gap-4 text-center sm:text-left">
          <p className="flex items-center justify-center sm:justify-start gap-1 flex-wrap">
            &copy; {new Date().getFullYear()} PrismLogic Inc. All rights reserved. Built with
            <Heart className="w-3 h-3 text-red-300 fill-current inline mx-0.5" /> for forward-thinking engineering teams.
          </p>

          <div className="flex items-center justify-center space-x-6 flex-wrap">
            <span className="text-purple-200/80">Privacy Policy</span>
            <span className="text-purple-200/80">Terms of Service</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-purple-200 hover:text-white transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
