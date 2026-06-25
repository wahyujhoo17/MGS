'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { List, X } from '@phosphor-icons/react';
import { cn } from '@/lib/utils';
import { buildWALink } from '@/lib/whatsapp';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Produk', href: '/produk' },
    { label: 'Tentang', href: '/tentang' },
    { label: 'Kontak', href: '/kontak' },
  ];

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 inset-x-0 z-50 h-20 flex items-center transition-all duration-300',
          scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-concrete shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto w-full px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-50" onClick={() => setIsOpen(false)}>
            <div className="relative w-32 h-10">
               <Image src="/img/MGS.png" alt="MGS Logo" fill className="object-contain object-left" priority />
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-navy hover:text-royal transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-4 relative z-50">
            <a
              href={buildWALink('Halo MGS Jaya Abadi')}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center bg-navy text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest rounded-full hover:bg-royal hover:shadow-lg hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-royal focus:ring-offset-2"
            >
              Hubungi Kami
            </a>
            
            <button
              className="md:hidden text-navy p-2 -mr-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X weight="bold" className="w-6 h-6" /> : <List weight="bold" className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-charcoal pt-20 px-6 pb-6 flex flex-col justify-between md:hidden animate-in fade-in duration-200">
          <ul className="flex flex-col gap-6 mt-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-display font-bold text-white uppercase tracking-wider"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="mt-auto">
            <hr className="border-iron/30 mb-6" />
            <a
              href={buildWALink('Halo MGS Jaya Abadi')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center bg-royal text-white px-6 py-4 text-sm font-semibold uppercase tracking-widest rounded-[4px]"
            >
              Hubungi via WhatsApp
            </a>
          </div>
        </div>
      )}
    </>
  );
}
