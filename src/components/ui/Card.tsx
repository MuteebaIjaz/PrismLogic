import React from 'react'
import { cn } from '../../lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'featured' | 'interactive' | 'subtle'
  isGlowHover?: boolean
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', isGlowHover = true, children, ...props }, ref) => {
    const baseStyles = 'relative rounded-[18px] transition-all duration-300 overflow-hidden'

    const variantStyles = {
      default:
        'glass-card bg-background-card/80 border border-white/10 hover:border-violet-500/30',
      featured:
        'glass-card-featured border border-purple-400/30 hover:border-cyan-400/40',
      interactive:
        'glass-card bg-background-card/90 border border-white/10 hover:border-brand-violet/50 hover:-translate-y-1 hover:shadow-card-hover cursor-pointer',
      subtle:
        'bg-background-elevated/40 border border-white/5 backdrop-blur-sm hover:border-white/10',
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          isGlowHover && 'hover:shadow-[0_10px_30px_-10px_rgba(109,40,217,0.25)]',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
