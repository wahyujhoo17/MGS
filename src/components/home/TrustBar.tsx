'use client';

import { CalendarBlank, Package, UsersThree, ShieldCheck } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

export function TrustBar({ className = '' }: { className?: string }) {
  const metrics = [
    {
      value: '2002',
      label: 'Tahun Berdiri',
      sublabel: '20+ Th Pengalaman',
      icon: CalendarBlank,
    },
    {
      value: '50+',
      label: 'Varian Produk',
      sublabel: 'Pedas, Gurih, Manis',
      icon: Package,
    },
    {
      value: '500+',
      label: 'Reseller Aktif',
      sublabel: 'Seluruh Indonesia',
      icon: UsersThree,
    },
    {
      value: '100%',
      label: 'Halal & BPOM',
      sublabel: 'Higienis & Teruji',
      icon: ShieldCheck,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full ${className}`}
    >
      {/* Outer Shell (Double-Bezel Architecture) */}
      <div className="p-1 sm:p-1.5 rounded-2xl lg:rounded-full bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_16px_40px_-12px_rgba(11,31,107,0.08),0_2px_6px_rgba(11,31,107,0.03)] ring-1 ring-navy/5">
        {/* Inner Core */}
        <div className="rounded-[calc(1rem-2px)] sm:rounded-[calc(1rem-1px)] lg:rounded-full bg-gradient-to-b from-white/95 to-white/75 border border-white/90 px-2.5 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-3 gap-x-1.5 sm:gap-4 md:gap-0 md:divide-x md:divide-concrete/50">
            {metrics.map((metric, idx) => {
              const Icon = metric.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-center justify-start md:justify-center gap-2 sm:gap-3.5 px-1.5 sm:px-4 py-1 transition-all duration-300"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-royal/[0.06] text-royal flex items-center justify-center shrink-0 border border-royal/10 group-hover:scale-105 group-hover:bg-royal/10 group-hover:text-navy transition-all duration-300">
                    <Icon size={16} className="sm:hidden" weight="bold" />
                    <Icon size={18} className="hidden sm:block" weight="bold" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-extrabold text-lg sm:text-2xl lg:text-[1.65rem] text-navy tracking-tight leading-none group-hover:text-royal transition-colors duration-200">
                        {metric.value}
                      </span>
                    </div>
                    <span className="font-barlow font-bold text-[9.5px] sm:text-[11px] text-iron uppercase tracking-wider leading-tight mt-0.5 truncate">
                      {metric.label}
                    </span>
                    <span className="text-[10px] text-steel font-medium font-sans hidden xl:block leading-none mt-0.5">
                      {metric.sublabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
