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
        'bg-white border border-indigo-100 hover:border-primary/40 shadow-sm',
      featured:
        'bg-white border-2 border-primary shadow-md hover:shadow-lg',
      interactive:
        'bg-white border border-indigo-100 hover:border-primary hover:-translate-y-1 hover:shadow-lg cursor-pointer',
      subtle:
        'bg-[#FAF9F6] border border-indigo-100 hover:border-primary/30',
    }

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          isGlowHover && 'hover:shadow-[0_10px_30px_-10px_rgba(79,70,229,0.25)]',
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
