import React, { forwardRef } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  showPasswordToggle = false,
  onTogglePassword,
  className = '',
  type = 'text',
  ...props
}, ref) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          className={`
            w-full px-3 py-2 border rounded-lg transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent
            ${error ? 'border-error-500' : 'border-secondary-300'}
            ${showPasswordToggle ? 'pr-10' : ''}
            ${className}
          `}
          {...props}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 hover:text-charcoal-600 transition-colors"
          >
            {type === 'password' ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-error-600 animate-fade-in">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';