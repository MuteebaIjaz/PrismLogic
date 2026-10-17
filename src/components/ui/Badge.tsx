import React from 'react'
import { cn } from '../../lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'violet' | 'cyan' | 'lavender' | 'subtle'
  size?: 'sm' | 'md'
  dot?: boolean
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = 'violet',
  size = 'md',
  dot = false,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center font-medium border select-none transition-colors'

  const sizeStyles = {
    sm: 'text-[11px] px-2.5 py-0.5 rounded-full gap-1.5',
    md: 'text-xs px-3 py-1 rounded-full gap-2',
  }

  const variantStyles = {
    violet: 'bg-primary-light text-primary border-primary/25',
    cyan: 'bg-primary-light text-primary border-primary/25',
    lavender: 'bg-primary-light text-primary border-primary/25',
    subtle: 'bg-primary-light/60 text-gray-800 border-indigo-100',
  }

  return (
    <div className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)} {...props}>
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full animate-pulse bg-primary'
          )}
        />
      )}
      {children}
    </div>
  )
}
