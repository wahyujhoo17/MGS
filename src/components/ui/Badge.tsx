import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'produksi' | 'grosir' | 'halal' | 'bestseller';
}

export function Badge({ className, variant = 'produksi', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center text-xs font-medium uppercase tracking-wider px-2 py-0.5 rounded-[4px]',
        {
          'bg-royal text-white': variant === 'produksi',
          'bg-sky text-white': variant === 'grosir',
          'bg-halal text-white': variant === 'halal',
          'bg-signal text-navy': variant === 'bestseller',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
