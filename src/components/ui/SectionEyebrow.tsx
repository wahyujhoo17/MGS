import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface SectionEyebrowProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
}

export function SectionEyebrow({ label, className, ...props }: SectionEyebrowProps) {
  return (
    <div className={cn('inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-iron/10 shadow-sm mb-6', className)} {...props}>
      <span className="flex h-1.5 w-1.5 rounded-full bg-royal" aria-hidden="true" />
      <span className="font-barlow text-navy text-[10px] font-bold uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
