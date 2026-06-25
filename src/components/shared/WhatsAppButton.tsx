'use client';

import { WhatsappLogo } from '@phosphor-icons/react';
import { buildWALink } from '@/lib/whatsapp';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function WhatsAppButton() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHasScrolled(true);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!hasScrolled) return null;

  return (
    <a
      href={buildWALink('Halo MGS Jaya Abadi')}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-lg shadow-black/20 hover:-translate-y-1 hover:shadow-xl transition-all"
      aria-label="Chat WhatsApp"
    >
      <WhatsappLogo weight="fill" className="w-7 h-7" />
    </a>
  );
}
