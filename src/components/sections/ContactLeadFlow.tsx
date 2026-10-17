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

  const {
    register,
    handleSubmit,
    reset,
    watch,
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
          colors: ['#6D28D9', '#4F46E5', '#C4B5FD', '#22D3EE'],
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
  }

  const firstName = submittedName.trim().split(' ')[0] || 'there'

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-white text-gray-900">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-brand-violet/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Large Rounded Split Container */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[24px] border border-gray-200/90 bg-gray-50/90 backdrop-blur-xl shadow-[0_24px_55px_-12px_rgba(15,23,42,0.14),0_12px_24px_-6px_rgba(15,23,42,0.08),0_0_0_1px_rgba(15,23,42,0.05)] overflow-hidden"
        >
          {/* Subtle noise texture */}
          <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />

          {/* Soft violet glow behind / within */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-brand-violet/5 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-brand-indigo/5 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 p-5 sm:p-8 md:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* LEFT COLUMN: ~40% (lg:col-span-5) */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
                <div>
                  {/* Eyebrow badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-brand-violet/10 text-brand-violet border border-brand-violet/20 mb-4 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-violet animate-pulse" />
                    <span>Contact</span>
                  </div>

                  {/* Heading */}
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight text-gray-900 leading-[1.15]">
                    Get in{' '}
                    <span className="bg-gradient-to-r from-brand-violet via-purple-600 to-brand-indigo bg-clip-text text-transparent">
                      touch
                    </span>
                  </h2>

                  {/* One-line subtext */}
                  <p className="mt-3.5 text-sm sm:text-base text-gray-600 font-normal leading-relaxed">
                    Tell us about your project. Our AI assistant reviews every inquiry instantly and a team member follows up with a tailored plan.
                  </p>
                </div>

                {/* Contact details */}
                <div className="space-y-3.5 pt-2">
                  <div className="p-3.5 rounded-xl bg-white border border-gray-200/85 shadow-[0_4px_14px_-2px_rgba(15,23,42,0.06)] hover:border-brand-violet/40 transition-all">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-brand-violet" />
                      <span>Email</span>
                    </div>
                    <a
                      href={`mailto:${contactData.email}`}
                      className="text-base sm:text-lg font-medium text-gray-900 hover:text-brand-violet transition-colors inline-block"
                    >
                      {contactData.email}
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-gray-200/85 shadow-[0_4px_14px_-2px_rgba(15,23,42,0.06)] hover:border-brand-violet/40 transition-all">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-brand-violet" />
                      <span>Phone</span>
                    </div>
                    <a
                      href={`tel:${contactData.phone.replace(/\s+/g, '')}`}
                      className="text-base sm:text-lg font-medium text-gray-900 hover:text-brand-violet transition-colors inline-block font-mono"
                    >
                      {contactData.phone}
                    </a>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-gray-200/85 shadow-[0_4px_14px_-2px_rgba(15,23,42,0.06)] hover:border-brand-violet/40 transition-all">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-gray-500 mb-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-violet" />
                      <span>Address</span>
                    </div>
                    <p className="text-base sm:text-lg font-medium text-gray-900">
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
                        className="w-10 h-10 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-white hover:border-brand-violet hover:bg-brand-violet hover:shadow-[0_0_12px_rgba(109,40,217,0.35)] transition-all flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet shadow-xs"
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
                      className="p-8 sm:p-10 rounded-2xl bg-white border border-brand-violet/30 text-center relative overflow-hidden shadow-[0_20px_50px_-12px_rgba(109,40,217,0.22),0_8px_20px_-4px_rgba(15,23,42,0.08),0_0_0_1px_rgba(109,40,217,0.25)]"
                      aria-live="polite"
                    >
                      {/* Prism glow centerpiece */}
                      <div className="absolute inset-0 bg-gradient-to-b from-brand-violet/10 via-transparent to-transparent pointer-events-none" />

                      {/* Animated check drawing in with prism beam motif */}
                      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                        <div className="absolute inset-0 bg-brand-violet/15 rounded-full blur-xl animate-pulse" />
                        <svg
                          className="w-20 h-20 text-brand-violet relative z-10"
                          viewBox="0 0 80 80"
                          fill="none"
                        >
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="34"
                            stroke="rgba(109, 40, 217, 0.2)"
                            strokeWidth="3"
                          />
                          <motion.circle
                            cx="40"
                            cy="40"
                            r="34"
                            stroke="#6D28D9"
                            strokeWidth="3"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                          />
                          <motion.path
                            d="M26 40L35 49L54 30"
                            stroke="#4F46E5"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.4, delay: 0.45, ease: 'easeOut' }}
                          />
                        </svg>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-bold font-display text-gray-900 mb-3">
                        Thanks, {firstName}!
                      </h3>

                      <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed mb-8">
                        Our AI assistant is reviewing your request and a team member will reach out shortly with a tailored plan.
                      </p>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-brand-violet hover:text-brand-indigo underline underline-offset-4 hover:no-underline transition-colors cursor-pointer"
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
                      className="p-5 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-[0_16px_36px_-8px_rgba(15,23,42,0.12),0_6px_16px_-4px_rgba(15,23,42,0.06),0_0_0_1px_rgba(15,23,42,0.05)] relative"
                    >
                      {/* Hidden Honeypot for spam protection */}
                      <div className="hidden" aria-hidden="true">
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          {...register('honeypot')}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                        {/* Row 1: Full Name */}
                        <div>
                          <label
                            htmlFor="contact-name"
                            className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                          >
                            Full Name <span className="text-brand-violet font-bold">*</span>
                          </label>
                          <input
                            id="contact-name"
                            type="text"
                            placeholder="Your full name"
                            disabled={submissionState === 'submitting'}
                            aria-invalid={errors.name ? 'true' : 'false'}
                            aria-describedby={errors.name ? 'name-error' : undefined}
                            className={cn(
                              'w-full px-4 py-3 rounded-[12px] bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm transition-all duration-200 outline-none',
                              'focus:bg-white focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:shadow-[0_0_15px_rgba(109,40,217,0.15)]',
                              errors.name && 'border-red-400 focus:border-red-500 focus:ring-red-400/20'
                            )}
                            {...register('name')}
                          />
                          {errors.name && (
                            <p
                              id="name-error"
                              className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1.5"
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
                            className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                          >
                            Business Email <span className="text-brand-violet font-bold">*</span>
                          </label>
                          <input
                            id="contact-email"
                            type="email"
                            placeholder="you@company.com"
                            disabled={submissionState === 'submitting'}
                            aria-invalid={errors.email ? 'true' : 'false'}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            className={cn(
                              'w-full px-4 py-3 rounded-[12px] bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm transition-all duration-200 outline-none',
                              'focus:bg-white focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:shadow-[0_0_15px_rgba(109,40,217,0.15)]',
                              errors.email && 'border-red-400 focus:border-red-500 focus:ring-red-400/20'
                            )}
                            {...register('email')}
                          />
                          {errors.email && (
                            <p
                              id="email-error"
                              className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1.5"
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
                            className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                          >
                            Company Name <span className="text-brand-violet font-bold">*</span>
                          </label>
                          <input
                            id="contact-company"
                            type="text"
                            placeholder="Your company name"
                            disabled={submissionState === 'submitting'}
                            aria-invalid={errors.company ? 'true' : 'false'}
                            aria-describedby={errors.company ? 'company-error' : undefined}
                            className={cn(
                              'w-full px-4 py-3 rounded-[12px] bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm transition-all duration-200 outline-none',
                              'focus:bg-white focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:shadow-[0_0_15px_rgba(109,40,217,0.15)]',
                              errors.company && 'border-red-400 focus:border-red-500 focus:ring-red-400/20'
                            )}
                            {...register('company')}
                          />
                          {errors.company && (
                            <p
                              id="company-error"
                              className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1.5"
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
                            className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                          >
                            Phone Number{' '}
                            <span className="text-gray-500 font-normal text-xs ml-1">(Optional)</span>
                          </label>
                          <input
                            id="contact-phone"
                            type="tel"
                            placeholder="+92 300 1234567"
                            disabled={submissionState === 'submitting'}
                            aria-invalid={errors.phone ? 'true' : 'false'}
                            aria-describedby={errors.phone ? 'phone-error' : undefined}
                            className={cn(
                              'w-full px-4 py-3 rounded-[12px] bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm transition-all duration-200 outline-none',
                              'focus:bg-white focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:shadow-[0_0_15px_rgba(109,40,217,0.15)]',
                              errors.phone && 'border-red-400 focus:border-red-500 focus:ring-red-400/20'
                            )}
                            {...register('phone')}
                          />
                          {errors.phone && (
                            <p
                              id="phone-error"
                              className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1.5"
                            >
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.phone.message}</span>
                            </p>
                          )}
                        </div>

                        {/* Row 3: Service Interested In */}
                        <div>
                          <label
                            htmlFor="contact-service"
                            className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                          >
                            Service Interested In{' '}
                            <span className="text-brand-violet font-bold">*</span>
                          </label>
                          <div className="relative">
                            <select
                              id="contact-service"
                              disabled={submissionState === 'submitting'}
                              aria-invalid={errors.service ? 'true' : 'false'}
                              aria-describedby={errors.service ? 'service-error' : undefined}
                              className={cn(
                                'w-full px-4 py-3 rounded-[12px] bg-gray-50 border border-gray-300 text-gray-900 text-sm transition-all duration-200 outline-none appearance-none cursor-pointer',
                                'focus:bg-white focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:shadow-[0_0_15px_rgba(109,40,217,0.15)]',
                                errors.service && 'border-red-400 focus:border-red-500 focus:ring-red-400/20'
                              )}
                              {...register('service')}
                            >
                              {serviceOptions.map((opt) => (
                                <option key={opt} value={opt} className="bg-white text-gray-900">
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-gray-500 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                          </div>
                          {errors.service && (
                            <p
                              id="service-error"
                              className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1.5"
                            >
                              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                              <span>{errors.service.message}</span>
                            </p>
                          )}
                        </div>

                        {/* Row 3: Budget Range (Optional) */}
                        <div>
                          <label
                            htmlFor="contact-budget"
                            className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                          >
                            Budget Range{' '}
                            <span className="text-gray-500 font-normal text-xs ml-1">(Optional)</span>
                          </label>
                          <div className="relative">
                            <select
                              id="contact-budget"
                              disabled={submissionState === 'submitting'}
                              aria-invalid={errors.budget ? 'true' : 'false'}
                              className={cn(
                                'w-full px-4 py-3 rounded-[12px] bg-gray-50 border border-gray-300 text-gray-900 text-sm transition-all duration-200 outline-none appearance-none cursor-pointer',
                                'focus:bg-white focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:shadow-[0_0_15px_rgba(109,40,217,0.15)]'
                              )}
                              {...register('budget')}
                            >
                              {budgetOptions.map((opt) => (
                                <option key={opt} value={opt} className="bg-white text-gray-900">
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="w-4 h-4 text-gray-500 pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        {/* Row 4: Project Details / Message (Full Width) */}
                        <div className="md:col-span-2">
                          <label
                            htmlFor="contact-message"
                            className="block text-xs sm:text-sm font-semibold text-gray-900 mb-2"
                          >
                            Project Details / Message{' '}
                            <span className="text-brand-violet font-bold">*</span>
                          </label>
                          <textarea
                            id="contact-message"
                            rows={5}
                            placeholder="Tell us about your project, business challenge, requirements, or automation goals..."
                            disabled={submissionState === 'submitting'}
                            aria-invalid={errors.message ? 'true' : 'false'}
                            aria-describedby={errors.message ? 'message-error' : undefined}
                            className={cn(
                              'w-full px-4 py-3 rounded-[12px] bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 text-sm transition-all duration-200 outline-none resize-y min-h-[120px]',
                              'focus:bg-white focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:shadow-[0_0_15px_rgba(109,40,217,0.15)]',
                              errors.message && 'border-red-400 focus:border-red-500 focus:ring-red-400/20'
                            )}
                            {...register('message')}
                          />
                          {errors.message && (
                            <p
                              id="message-error"
                              className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1.5"
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
                                    ? 'bg-gradient-to-r from-brand-violet to-brand-indigo border-brand-violet text-white shadow-[0_0_10px_rgba(109,40,217,0.4)]'
                                    : 'border-gray-300 bg-gray-50 group-hover:border-gray-400',
                                  errors.consent && 'border-red-400'
                                )}
                              >
                                {consentChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-700 leading-normal">
                              I agree to be contacted about my inquiry.{' '}
                              <span className="text-brand-violet font-bold">*</span>
                            </span>
                          </label>
                          {errors.consent && (
                            <p
                              id="consent-error"
                              className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1.5 pl-8"
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
                          className="mt-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                            <span>
                              {errorMessage || 'Something went wrong. Please try again or email us directly.'}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            className="px-3 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-800 font-semibold text-xs border border-red-300 transition-colors cursor-pointer shrink-0"
                          >
                            Retry
                          </button>
                        </div>
                      )}

                      {/* Submit Button */}
                      <div className="mt-6">
                        <button
                          type="submit"
                          disabled={submissionState === 'submitting'}
                          className={cn(
                            'w-full py-3.5 px-6 rounded-xl font-semibold text-sm sm:text-base text-white',
                            'bg-gradient-to-r from-brand-violet to-brand-indigo',
                            'hover:from-brand-violet/90 hover:to-brand-indigo/90 hover:shadow-[0_0_24px_rgba(109,40,217,0.45)]',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2',
                            'transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-glow-violet'
                          )}
                        >
                          {submissionState === 'submitting' ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <span>Send Inquiry</span>
                              <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </>
                          )}
                        </button>

                        {/* Confidentiality notice */}
                        <p className="mt-3 text-center text-xs text-gray-500 leading-normal">
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
