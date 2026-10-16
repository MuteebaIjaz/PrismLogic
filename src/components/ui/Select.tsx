import React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: (SelectOption | string)[]
  error?: string
  hint?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, hint, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined)

    return (
      <div className="w-full text-left">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wider">
            {label}
            {props.required && <span className="text-brand-lavender ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full px-4 py-3 rounded-xl bg-background-card/90 border border-white/10 text-white text-sm transition-all duration-200 outline-none appearance-none cursor-pointer',
              'focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 focus:bg-background-elevated',
              error && 'border-red-500/60 focus:border-red-500 focus:ring-red-500/20',
              className
            )}
            {...props}
          >
            {options.map((opt) => {
              const val = typeof opt === 'string' ? opt : opt.value
              const text = typeof opt === 'string' ? opt : opt.label
              return (
                <option key={val} value={val} className="bg-background-elevated text-white">
                  {text}
                </option>
              )
            })}
          </select>

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        {error && <p className="mt-1.5 text-xs text-red-400 font-medium">{error}</p>}
        {hint && !error && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
