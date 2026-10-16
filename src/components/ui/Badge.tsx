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
    violet: 'bg-brand-violet/15 text-brand-lavender border-brand-violet/30 shadow-[0_0_12px_rgba(109,40,217,0.2)]',
    cyan: 'bg-cyan-950/40 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(34,211,238,0.2)]',
    lavender: 'bg-purple-950/40 text-purple-200 border-purple-400/25',
    subtle: 'bg-white/5 text-gray-300 border-white/10',
  }

  return (
    <div className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)} {...props}>
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full animate-pulse',
            variant === 'cyan' ? 'bg-brand-cyan' : 'bg-brand-lavender'
          )}
        />
      )}
      {children}
    </div>
  )
}
