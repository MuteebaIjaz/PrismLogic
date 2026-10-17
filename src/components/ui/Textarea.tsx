import React from 'react'
import { cn } from '../../lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, rows = 4, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="w-full text-left">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            {label}
            {props.required && <span className="text-primary ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            rows={rows}
            className={cn(
              'w-full px-4 py-3 rounded-xl bg-white border border-gray-300 text-gray-950 placeholder-gray-400 text-sm transition-all duration-200 outline-none resize-y min-h-[100px]',
              'focus:border-primary focus:ring-2 focus:ring-primary/20',
              error && 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          />
        </div>

        {error && <p className="mt-1.5 text-xs text-red-400 font-medium">{error}</p>}
        {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
