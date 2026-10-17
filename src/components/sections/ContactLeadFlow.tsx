import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import {
  Send,
  Loader2,
  AlertCircle,
  Check,
  ChevronDown,
  RotateCcw,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react'
import { submitLead } from '../../lib/submitLead'
import {
  contactData,
  serviceOptions,
  budgetOptions,
} from '../../data/contact'
import { cn } from '../../lib/utils'

// Social links with clean SVGs
const socialPlatforms = [
  {
    name: 'LinkedIn',
    svg: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'X',
    svg: (
      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    svg: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    svg: (
      <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
]

// Schema & inferred types
const contactSchema = z.object({
  name: z.string().trim().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().trim().email({ message: 'Please enter a valid business email' }),
  company: z.string().trim().min(2, { message: 'Company name must be at least 2 characters' }),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^[0-9+\s()-]+$/.test(val), {
      message: 'Please enter a valid phone number',
    }),
  service: z.enum(serviceOptions, {
    message: 'Please select a service',
  }),
  budget: z.enum(budgetOptions).optional(),
  message: z
    .string()
    .trim()
    .min(20, { message: 'Message must be at least 20 characters' })
    .max(2000, { message: 'Message cannot exceed 2000 characters' }),
  consent: z.literal(true, {
    message: 'Please agree to be contacted',
  }),
  honeypot: z.string().optional(),
})

export type ContactFormData = z.infer<typeof contactSchema>

export const ContactLeadFlow: React.FC = () => {
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [submittedName, setSubmittedName] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false)
  const [isBudgetDropdownOpen, setIsBudgetDropdownOpen] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      service: 'AI Automation',
      budget: 'Not decided yet',
      message: '',
      consent: false as unknown as true,
      honeypot: '',
    },
  })

  const consentChecked = watch('consent')
  const currentService = watch('service')
  const currentBudget = watch('budget')

  const onSubmit = async (data: ContactFormData) => {
    setSubmissionState('submitting')
    setErrorMessage('')

    try {
      await submitLead({
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone || '',
        service: data.service,
        budget: data.budget || 'Not decided yet',
        message: data.message,
        consent: true,
        honeypot: data.honeypot,
      })

      setSubmittedName(data.name)
      setSubmissionState('success')

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#6366F1', '#818CF8', '#C7D2FE'],
        })
      } catch {
        // Fallback gracefully
      }
    } catch (err: unknown) {
      setSubmissionState('error')
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or email us directly.'
      )
    }
  }

  const handleReset = () => {
    reset()
    setSubmissionState('idle')
    setErrorMessage('')
    setSubmittedName('')
    setIsServiceDropdownOpen(false)
    setIsBudgetDropdownOpen(false)
  }

  const firstName = submittedName.trim().split(' ')[0] || 'there'

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-[#FAF9F6] text-gray-950 border-t border-gray-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Rounded Split Container */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-2xl sm:rounded-[24px] border border-indigo-100 bg-white shadow-[0_16px_40px_-10px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          <div className="relative z-10 p-4 sm:p-7 lg:p-9">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* LEFT COLUMN: ~40% (lg:col-span-5) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-5 sm:space-y-6">
                <div>
                  {/* Eyebrow badge matching What Our Clients Say label */}
                  <div className="inline-flex items-center px-3.5 py-1 rounded-full text-xs font-semibold bg-primary text-white border border-primary mb-3 sm:mb-3.5 shadow-xs">
                    <span>Contact</span>
                  </div>

                  {/* Heading */}
                  <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-bold font-display tracking-tight text-gray-950 leading-[1.15]">
                    Get in{' '}
                    <span className="text-primary inline-block">
                      Touch.
                    </span>
                  </h2>

                  <p className="text-sm text-gray-600 mt-2 max-w-sm leading-relaxed">
                    Have a project in mind or need engineering advisory? Reach out directly or fill out the form.
                  </p>
                </div>

                {/* Contact details: Primary cards with white icons */}
                <div className="space-y-2.5 pt-0.5">
                  {/* Email Card */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-primary text-white border border-white/20 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
                    <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/80 mb-0.5 flex items-center gap-2">
                      <div className="w-5.5 h-5.5 rounded-md bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                        <Mail className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-semibold text-white/90">Email</span>
                    </div>
                    <a
                      href={`mailto:${contactData.email}`}
                      className="text-sm sm:text-base font-bold text-white hover:text-white/80 transition-colors inline-block"
                    >
                      {contactData.email}
                    </a>
                  </div>

                  {/* Phone Card */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-primary text-white border border-white/20 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
                    <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/80 mb-0.5 flex items-center gap-2">
                      <div className="w-5.5 h-5.5 rounded-md bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                        <Phone className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-semibold text-white/90">Phone</span>
                    </div>
                    <a
                      href="tel:+16267305710"
                      className="text-sm sm:text-base font-bold text-white hover:text-white/80 transition-colors inline-block font-mono"
                    >
                      (626) 730-5710
                    </a>
                  </div>

                  {/* Address Card */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-primary text-white border border-white/20 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all group">
                    <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/80 mb-0.5 flex items-center gap-2">
                      <div className="w-5.5 h-5.5 rounded-md bg-white/20 border border-white/30 flex items-center justify-center shrink-0">
                        <MapPin className="w-3 h-3 text-white" />
                      </div>
                      <span className="font-semibold text-white/90">Address</span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-white leading-snug">
                      {contactData.address}
                    </p>
                  </div>
                </div>

                {/* Follow Us Round Icon Buttons */}
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-gray-500 block mb-2.5">
                    Follow us
                  </span>
                  <div className="flex items-center gap-2.5">
                    {socialPlatforms.map((platform) => (
                      <button
                        key={platform.name}
                        type="button"
                        aria-label={`Follow on ${platform.name}`}
                        className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-800 hover:text-white hover:border-primary hover:bg-primary transition-all flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-xs"
                      >
                        {platform.svg}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: ~60% (lg:col-span-7) */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  {submissionState === 'success' ? (
                    <motion.div
                      key="success-card"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="p-8 sm:p-10 rounded-[22px] bg-primary text-white border border-white/20 text-center relative overflow-hidden shadow-xl"
                      aria-live="polite"
                    >
                      {/* Subtle top sheen */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

                      {/* Animated checkmark */}
                      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                        <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse" />
                        <svg
                          className="w-20 h-20 text-white relative z-10"
                          viewBox="0 0 80 80"
                          fill="none"
                        >
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="34"
                            stroke="rgba(255, 255, 255, 0.25)"
                            strokeWidth="3"
                          />
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="34"
                            stroke="#FFFFFF"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                          />
                          <motion.path
                            d="M26 40L35 49L54 30"
                            stroke="#FFFFFF"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 0.45, ease: 'easeOut' }}
                          />
                        </svg>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-3">
                        Thanks, {firstName}!
                      </h3>

                      <p className="text-sm sm:text-base text-white/85 max-w-md mx-auto leading-relaxed mb-8">
                        Our team has received your message and will review your specifications shortly.
                      </p>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-primary bg-white hover:bg-white/90 px-5 py-2.5 rounded-xl shadow-md transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Send another inquiry</span>
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="contact-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className={cn(
                        'relative p-5 sm:p-7 lg:p-8 rounded-xl sm:rounded-[22px] overflow-hidden',
                        'bg-primary text-white border border-white/20',
                        'shadow-[0_12px_32px_-6px_rgba(79,70,229,0.35)]'
                      )}
                    >
                      {/* Subtle top sheen */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-xl sm:rounded-[22px] pointer-events-none" />

                      {/* Hidden Honeypot for spam protection */}
                      <div className="hidden" aria-hidden="true">
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          {...register('honeypot')}
                        />
                      </div>

                      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-4.5">
                        {/* Row 1: Full Name */}
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-xs sm:text-sm font-semibold text-white mb-2"
                          >
                            Full Name <span className="text-white font-bold">*</span>
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            placeholder="Your full name"
                            disabled={submissionState === 'submitting'}
                            aria-invalid={errors.name ? 'true' : 'false'}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            className={cn(
                              'w-full px-4 py-3 rounded-xl bg-white border border-white text-gray-950 placeholder-gray-400 text-sm transition-all duration-200 outline-none shadow-xs',
                              'focus:ring-2 focus:ring-white/80 focus:shadow-md',
                              errors.name && 'ring-2 ring-red-400'
                            )}
                            {...register('name')}
                          />
                          {errors.name && (
                            <p
                              id="name-error"
                              className="mt-1.5 text-xs text-white bg-red-500/90 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 shadow-sm"
                            >
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.name.message}</span>
                            </p>
                          )}
                        </div>

                        {/* Row 1: Business Email */}
                        <div>
                          <label
                            htmlFor="contact-email"
                            className="block text-xs sm:text-sm font-semibold text-white mb-2"
                          >
                            Business Email <span className="text-white font-bold">*</span>
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            placeholder="you@company.com"
                            disabled={submissionState === 'submitting'}
                            aria-invalid={errors.email ? 'true' : 'false'}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            className={cn(
                              'w-full px-4 py-3 rounded-xl bg-white border border-white text-gray-950 placeholder-gray-400 text-sm transition-all duration-200 outline-none shadow-xs',
                              'focus:ring-2 focus:ring-white/80 focus:shadow-md',
                              errors.email && 'ring-2 ring-red-400'
                            )}
                            {...register('email')}
                          />
                          {errors.email && (
                            <p
                              id="email-error"
                              className="mt-1.5 text-xs text-white bg-red-500/90 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 shadow-sm"
                            >
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.email.message}</span>
                            </p>
                          )}
                        </div>

                        {/* Row 2: Company Name */}
                        <div>
                          <label
                            htmlFor="contact-company"
                            className="block text-xs sm:text-sm font-semibold text-white mb-2"
                          >
                            Company Name <span className="text-white font-bold">*</span>
                          </label>
                          <input
                            id="contact-company"
                            type="text"
                            placeholder="Your company name"
                            disabled={submissionState === 'submitting'}
                            aria-invalid={errors.company ? 'true' : 'false'}
                            aria-describedby={errors.company ? 'company-error' : undefined}
                            className={cn(
                              'w-full px-4 py-3 rounded-xl bg-white border border-white text-gray-950 placeholder-gray-400 text-sm transition-all duration-200 outline-none shadow-xs',
                              'focus:ring-2 focus:ring-white/80 focus:shadow-md',
                              errors.company && 'ring-2 ring-red-400'
                            )}
                            {...register('company')}
                          />
                          {errors.company && (
                            <p
                              id="company-error"
                              className="mt-1.5 text-xs text-white bg-red-500/90 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 shadow-sm"
                            >
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.company.message}</span>
                            </p>
                          )}
                        </div>

                        {/* Row 2: Phone Number (Optional) */}
                        <div>
                          <label
                            htmlFor="contact-phone"
                            className="block text-xs sm:text-sm font-semibold text-white mb-2"
                          >
                            Phone Number{' '}
                            <span className="text-white/70 font-normal text-xs ml-1">(Optional)</span>
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            placeholder="(626) 730-5710"
                            disabled={submissionState === 'submitting'}
                            aria-invalid={errors.phone ? 'true' : 'false'}
                            aria-describedby={errors.phone ? 'phone-error' : undefined}
                            className={cn(
                              'w-full px-4 py-3 rounded-xl bg-white border border-white text-gray-950 placeholder-gray-400 text-sm transition-all duration-200 outline-none shadow-xs',
                              'focus:ring-2 focus:ring-white/80 focus:shadow-md',
                              errors.phone && 'ring-2 ring-red-400'
                            )}
                            {...register('phone')}
                          />
                          {errors.phone && (
                            <p
                              id="phone-error"
                              className="mt-1.5 text-xs text-white bg-red-500/90 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 shadow-sm"
                            >
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.phone.message}</span>
                            </p>
                          )}
                        </div>

                        {/* Row 3: Service Interested In (Custom Dropdown) */}
                        <div className="relative">
                          <label
                            htmlFor="contact-service-btn"
                            className="block text-xs sm:text-sm font-semibold text-white mb-2"
                          >
                            Service Interested In{' '}
                            <span className="text-white font-bold">*</span>
                          </label>
                          <div className="relative">
                            {/* Hidden input for react-hook-form registration */}
                            <input type="hidden" {...register('service')} />

                            <button
                              id="contact-service-btn"
                              type="button"
                              disabled={submissionState === 'submitting'}
                              aria-haspopup="listbox"
                              aria-expanded={isServiceDropdownOpen}
                              onClick={() => {
                                setIsBudgetDropdownOpen(false)
                                setIsServiceDropdownOpen((prev) => !prev)
                              }}
                              className={cn(
                                'w-full px-4 py-3 rounded-xl bg-white border border-white text-gray-950 text-sm transition-all duration-200 outline-none cursor-pointer shadow-xs flex items-center justify-between font-medium text-left',
                                'focus:ring-2 focus:ring-white/80 focus:shadow-md',
                                isServiceDropdownOpen && 'ring-2 ring-white/90',
                                errors.service && 'ring-2 ring-red-400'
                              )}
                            >
                              <span className="truncate">{currentService || 'Select a service'}</span>
                              <div
                                className={cn(
                                  'w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 transition-transform duration-200',
                                  isServiceDropdownOpen && 'rotate-180 bg-primary/10'
                                )}
                              >
                                <ChevronDown className="w-3.5 h-3.5 text-primary stroke-[2.5]" />
                              </div>
                            </button>

                            {/* Outside click backdrop */}
                            {isServiceDropdownOpen && (
                              <div
                                className="fixed inset-0 z-30"
                                onClick={() => setIsServiceDropdownOpen(false)}
                                aria-hidden="true"
                              />
                            )}

                            {/* Custom animated dropdown panel */}
                            <AnimatePresence>
                              {isServiceDropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                  transition={{ duration: 0.18, ease: 'easeOut' }}
                                  className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-40 p-1.5 space-y-1 max-h-60 overflow-y-auto"
                                  role="listbox"
                                >
                                  {serviceOptions.map((opt) => {
                                    const isSelected = currentService === opt
                                    return (
                                      <button
                                        key={opt}
                                        type="button"
                                        role="option"
                                        aria-selected={isSelected}
                                        onClick={() => {
                                          setValue('service', opt as ContactFormData['service'], { shouldValidate: true })
                                          setIsServiceDropdownOpen(false)
                                        }}
                                        className={cn(
                                          'w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer',
                                          isSelected
                                            ? 'bg-primary text-white font-semibold shadow-xs'
                                            : 'text-gray-800 hover:bg-indigo-50 hover:text-primary'
                                        )}
                                      >
                                        <span className="truncate">{opt}</span>
                                        {isSelected && <Check className="w-4 h-4 text-white stroke-[2.5] shrink-0 ml-2" />}
                                      </button>
                                    )
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                          {errors.service && (
                            <p
                              id="service-error"
                              className="mt-1.5 text-xs text-white bg-red-500/90 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 shadow-sm"
                            >
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.service.message}</span>
                            </p>
                          )}
                        </div>

                        {/* Row 3: Budget Range (Custom Dropdown) */}
                        <div className="relative">
                          <label
                            htmlFor="contact-budget-btn"
                            className="block text-xs sm:text-sm font-semibold text-white mb-2"
                          >
                            Budget Range{' '}
                            <span className="text-white/70 font-normal text-xs ml-1">(Optional)</span>
                          </label>
                          <div className="relative">
                            {/* Hidden input for react-hook-form registration */}
                            <input type="hidden" {...register('budget')} />

                            <button
                              id="contact-budget-btn"
                              type="button"
                              disabled={submissionState === 'submitting'}
                              aria-haspopup="listbox"
                              aria-expanded={isBudgetDropdownOpen}
                              onClick={() => {
                                setIsServiceDropdownOpen(false)
                                setIsBudgetDropdownOpen((prev) => !prev)
                              }}
                              className={cn(
                                'w-full px-4 py-3 rounded-xl bg-white border border-white text-gray-950 text-sm transition-all duration-200 outline-none cursor-pointer shadow-xs flex items-center justify-between font-medium text-left',
                                'focus:ring-2 focus:ring-white/80 focus:shadow-md',
                                isBudgetDropdownOpen && 'ring-2 ring-white/90'
                              )}
                            >
                              <span className="truncate">{currentBudget || 'Select budget'}</span>
                              <div
                                className={cn(
                                  'w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0 transition-transform duration-200',
                                  isBudgetDropdownOpen && 'rotate-180 bg-primary/10'
                                )}
                              >
                                <ChevronDown className="w-3.5 h-3.5 text-primary stroke-[2.5]" />
                              </div>
                            </button>

                            {/* Outside click backdrop */}
                            {isBudgetDropdownOpen && (
                              <div
                                className="fixed inset-0 z-30"
                                onClick={() => setIsBudgetDropdownOpen(false)}
                                aria-hidden="true"
                              />
                            )}

                            {/* Custom animated dropdown panel */}
                            <AnimatePresence>
                              {isBudgetDropdownOpen && (
                                <motion.div
                                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                  transition={{ duration: 0.18, ease: 'easeOut' }}
                                  className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden z-40 p-1.5 space-y-1 max-h-60 overflow-y-auto"
                                  role="listbox"
                                >
                                  {budgetOptions.map((opt) => {
                                    const isSelected = currentBudget === opt
                                    return (
                                      <button
                                        key={opt}
                                        type="button"
                                        role="option"
                                        aria-selected={isSelected}
                                        onClick={() => {
                                          setValue('budget', opt as ContactFormData['budget'], { shouldValidate: true })
                                          setIsBudgetDropdownOpen(false)
                                        }}
                                        className={cn(
                                          'w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer',
                                          isSelected
                                            ? 'bg-primary text-white font-semibold shadow-xs'
                                            : 'text-gray-800 hover:bg-indigo-50 hover:text-primary'
                                        )}
                                      >
                                        <span className="truncate">{opt}</span>
                                        {isSelected && <Check className="w-4 h-4 text-white stroke-[2.5] shrink-0 ml-2" />}
                                      </button>
                                    )
                                  })}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>

                        {/* Row 4: Project Details / Message (Full Width) */}
                        <div className="md:col-span-2">
                          <label
                            htmlFor="contact-message"
                            className="block text-xs sm:text-sm font-semibold text-white mb-2"
                          >
                            Project Details / Message{' '}
                            <span className="text-white font-bold">*</span>
                          </label>
                          <textarea
                            id="contact-message"
                            rows={4}
                            placeholder="Tell us about your project, business challenge, requirements, or automation goals..."
                            disabled={submissionState === 'submitting'}
                            aria-invalid={errors.message ? 'true' : 'false'}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                            className={cn(
                              'w-full px-4 py-3 rounded-xl bg-white border border-white text-gray-950 placeholder-gray-400 text-sm transition-all duration-200 outline-none resize-y min-h-[120px] shadow-xs',
                              'focus:ring-2 focus:ring-white/80 focus:shadow-md',
                              errors.message && 'ring-2 ring-red-400'
                            )}
                            {...register('message')}
                          />
                          {errors.message && (
                            <p
                              id="message-error"
                              className="mt-1.5 text-xs text-white bg-red-500/90 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 shadow-sm"
                            >
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.message.message}</span>
                            </p>
                          )}
                        </div>

                        {/* Row 5: Consent Checkbox (Full Width) */}
                        <div className="md:col-span-2 pt-1">
                          <label
                            htmlFor="contact-consent"
                            className="flex items-start gap-3 cursor-pointer select-none group"
                          >
                            <div className="relative flex items-center justify-center mt-0.5">
                              <input
                                id="contact-consent"
                                type="checkbox"
                                disabled={submissionState === 'submitting'}
                                aria-invalid={errors.consent ? 'true' : 'false'}
                                aria-describedby={errors.consent ? 'consent-error' : undefined}
                                className="sr-only peer"
                                {...register('consent')}
                              />
                              <div
                                className={cn(
                                  'w-5 h-5 rounded-[6px] border transition-all flex items-center justify-center',
                                  consentChecked
                                    ? 'bg-white border-white text-primary shadow-xs'
                                    : 'border-white/50 bg-white/20 group-hover:border-white',
                                  errors.consent && 'border-red-300'
                                )}
                              >
                                {consentChecked && <Check className="w-3.5 h-3.5 stroke-[3] text-primary" />}
                              </div>
                            </div>
                            <span className="text-xs sm:text-sm text-white/95 leading-normal font-medium">
                              I agree to be contacted about my inquiry.{' '}
                              <span className="text-white font-bold">*</span>
                            </span>
                          </label>
                          {errors.consent && (
                            <p
                              id="consent-error"
                              className="mt-1.5 text-xs text-white bg-red-500/90 px-2.5 py-1 rounded-lg font-medium flex items-center gap-1.5 pl-8 shadow-sm"
                            >
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.consent.message}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Error banner if submission failed */}
                      {submissionState === 'error' && (
                        <div
                          role="alert"
                          aria-live="polite"
                          className="mt-5 p-4 rounded-xl bg-red-600/90 border border-red-400 text-white text-xs sm:text-sm flex items-center justify-between gap-3 shadow-md"
                        >
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-white shrink-0" />
                            <span>
                              {errorMessage || 'Something went wrong. Please try again or email us directly.'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            className="px-3 py-1 rounded-lg bg-white hover:bg-white/90 text-primary font-bold text-xs shadow-xs transition-colors cursor-pointer shrink-0"
                          >
                            Retry
                          </button>
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="mt-5 sm:mt-6 relative z-10">
                        <button
                          type="submit"
                          disabled={submissionState === 'submitting'}
                          className={cn(
                            'w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base',
                            'bg-white text-primary hover:bg-white/95 hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white',
                            'transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-md'
                          )}
                        >
                          {submissionState === 'submitting' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-primary" />
                              <span>Sending Inquiry...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Inquiry</span>
                              <Send className="w-4 h-4 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </>
                          )}
                        </button>

                        {/* Confidentiality notice */}
                        <p className="mt-3 text-center text-xs text-white/75 leading-normal font-medium">
                          By submitting, you agree to our confidential inquiry handling. We never share your data.
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
