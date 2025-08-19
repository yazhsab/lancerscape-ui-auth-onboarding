import React, { ReactNode } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  onClick,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-honey-500 text-charcoal-900 hover:bg-honey-400 focus:ring-honey-500 shadow-sm hover:shadow-md',
    secondary: 'bg-charcoal-600 text-white hover:bg-charcoal-700 focus:ring-charcoal-500 shadow-sm hover:shadow-md',
    outline: 'border-2 border-honey-500 text-honey-600 hover:bg-honey-50 focus:ring-honey-500',
    ghost: 'text-charcoal-600 hover:bg-secondary-100 focus:ring-charcoal-500'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading && <LoadingSpinner size="sm" className="mr-2" />}
      {children}
    </button>
  );
};