import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'full';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-bold tracking-wide transition-all focus:outline-none focus:ring-2 focus:ring-royal focus:ring-offset-2 rounded-full',
          {
            'bg-navy text-white hover:bg-royal hover:shadow-lg hover:-translate-y-0.5': variant === 'primary',
            'bg-white border border-iron/20 text-navy hover:border-navy hover:shadow-sm': variant === 'secondary',
            'bg-charcoal text-white hover:bg-navy hover:shadow-lg hover:-translate-y-0.5': variant === 'dark',
            'bg-transparent text-navy hover:bg-iron/10': variant === 'ghost',
            'px-5 py-2 text-xs': size === 'sm',
            'px-7 py-3 text-sm': size === 'md',
            'px-9 py-4 text-base': size === 'lg',
            'w-full px-7 py-3 text-sm': size === 'full',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
