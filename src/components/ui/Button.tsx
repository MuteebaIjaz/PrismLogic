import React from 'react'
import { cn } from '../../lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'secondary-light' | 'outline' | 'ghost' | 'glow'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]'

    const sizeStyles = {
      sm: 'text-xs px-3.5 py-1.5 rounded-lg gap-1.5',
      md: 'text-sm px-5 py-2.5 rounded-xl gap-2',
      lg: 'text-base px-7 py-3.5 rounded-xl gap-2.5 font-semibold',
    }

    const variantStyles = {
      primary:
        'bg-gradient-to-r from-brand-violet to-brand-indigo text-white shadow-glow-violet hover:shadow-lg hover:from-purple-600 hover:to-indigo-500 border border-violet-400/20',
      glow:
        'bg-gradient-to-r from-brand-violet via-purple-600 to-brand-indigo text-white shadow-glow-violet hover:shadow-[0_0_30px_rgba(109,40,217,0.7)] border border-violet-300/30 font-semibold',
      secondary:
        'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 backdrop-blur-md',
      'secondary-light':
        'bg-white hover:bg-violet-50/50 text-gray-900 hover:text-brand-violet border border-gray-200/90 hover:border-brand-violet/40 shadow-[0_2px_8px_-2px_rgba(15,23,42,0.06),0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_20px_-6px_rgba(109,40,217,0.18)] font-semibold',
      outline:
        'bg-transparent hover:bg-white/5 text-gray-200 border border-white/15 hover:border-brand-lavender/40 hover:text-white',
      ghost:
        'bg-transparent hover:bg-white/5 text-gray-300 hover:text-white',
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'
