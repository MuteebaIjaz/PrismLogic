import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export interface SectionHeadingProps {
  badge?: string
  badgeVariant?: string
  whiteTitle: string
  highlightTitle?: string
  description?: string
  align?: 'center' | 'left'
  className?: string
  titleClassName?: string
  descriptionClassName?: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  whiteTitle,
  highlightTitle,
  description,
  align = 'center',
  className,
  titleClassName,
  descriptionClassName,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'max-w-2xl mb-6 sm:mb-6',
        align === 'center' ? 'mx-auto text-center' : 'text-left',
        className
      )}
    >
      <h2 className={cn('text-3xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-gray-950 leading-[1.15]', titleClassName)}>
        {whiteTitle}{' '}
        {highlightTitle && (
          <span className="text-primary inline-block">
            {highlightTitle}
          </span>
        )}
      </h2>

      {description && (
        <p className={cn('mt-4 text-base sm:text-base text-gray-700 font-normal leading-relaxed max-w-2xl mx-auto', descriptionClassName)}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
