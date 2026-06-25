'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/shared/WhatsAppButton';
import { SectionEyebrow } from '@/components/ui/SectionEyebrow';
import { Button } from '@/components/ui/Button';
import { buildWALink } from '@/lib/whatsapp';
import { useState } from 'react';

export default function KontakPage() {
  const [formData, setFormData] = useState({
    nama: '',
    hp: '',
    jenis: 'Konsumen',
    pesan: ''
  });

  const handleKirimWA = () => {
    const text = `Halo MGS Jaya Abadi,\n\nNama: ${formData.nama}\nNo. HP: ${formData.hp}\nJenis: ${formData.jenis}\n\nPesan:\n${formData.pesan}`;
    window.open(buildWALink(text), '_blank');
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow pt-16 bg-offwhite min-h-[100dvh]">
        <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white border border-concrete shadow-sm overflow-hidden">
            
            {/* Kiri: Info & Maps */}
            <div className="bg-navy text-white p-8 md:p-12 flex flex-col justify-between">
              <div>
                <SectionEyebrow label="Hubungi Kami" className="[&_span]:text-steel [&_div]:bg-steel" />
                <h1 className="font-display font-bold text-4xl md:text-5xl uppercase tracking-tight mb-8">
                  Pusat Layanan MGS
                </h1>
                
                <div className="space-y-6 text-concrete">
                  <div>
                    <h3 className="font-barlow font-bold text-steel uppercase tracking-widest text-xs mb-1">Alamat Pabrik</h3>
                    <p className="leading-relaxed">
                      Jl. Industri No. 45, Komplek Pergudangan<br />
                      Surabaya, Jawa Timur 60123
                    </p>
                  </div>
                  <div>
                    <h3 className="font-barlow font-bold text-steel uppercase tracking-widest text-xs mb-1">Jam Operasional</h3>
                    <p>Senin - Sabtu: 08.00 - 16.00 WIB</p>
                  </div>
                  <div>
                    <h3 className="font-barlow font-bold text-steel uppercase tracking-widest text-xs mb-1">Telepon / WhatsApp</h3>
                    <p className="font-mono text-lg text-white mt-1">+62 812-3456-7890</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 aspect-[4/3] bg-charcoal border-2 border-steel/30 relative flex items-center justify-center p-4 text-center">
                 <span className="font-mono text-steel text-xs uppercase tracking-widest">
                   Google Maps Embed Placeholder
                 </span>
              </div>
            </div>

            {/* Kanan: Form */}
            <div className="p-8 md:p-12">
              <h2 className="font-display font-bold text-3xl text-navy uppercase mb-8">
                Kirim Pesan
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block font-barlow font-bold text-xs text-navy uppercase tracking-widest mb-2">
                    Nama Lengkap
                  </label>
                  <input 
                    type="text" 
                    className="w-full border border-concrete bg-offwhite px-4 py-3 text-sm focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal transition-all rounded-[4px]"
                    placeholder="Masukkan nama"
                    value={formData.nama}
                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block font-barlow font-bold text-xs text-navy uppercase tracking-widest mb-2">
                    Nomor WhatsApp
                  </label>
                  <input 
                    type="tel" 
                    className="w-full border border-concrete bg-offwhite px-4 py-3 text-sm focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal transition-all rounded-[4px]"
                    placeholder="Contoh: 0812..."
                    value={formData.hp}
                    onChange={(e) => setFormData({...formData, hp: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block font-barlow font-bold text-xs text-navy uppercase tracking-widest mb-3">
                    Status Anda
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="jenis" 
                        value="Konsumen" 
                        checked={formData.jenis === 'Konsumen'}
                        onChange={(e) => setFormData({...formData, jenis: e.target.value})}
                        className="accent-royal w-4 h-4"
                      />
                      <span className="text-sm font-medium text-iron">Konsumen Umum</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="jenis" 
                        value="Reseller" 
                        checked={formData.jenis === 'Reseller'}
                        onChange={(e) => setFormData({...formData, jenis: e.target.value})}
                        className="accent-royal w-4 h-4"
                      />
                      <span className="text-sm font-medium text-iron">Calon Reseller</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-barlow font-bold text-xs text-navy uppercase tracking-widest mb-2">
                    Pesan / Pertanyaan
                  </label>
                  <textarea 
                    rows={4}
                    className="w-full border border-concrete bg-offwhite px-4 py-3 text-sm focus:outline-none focus:border-royal focus:ring-1 focus:ring-royal transition-all rounded-[4px]"
                    placeholder="Tuliskan pesan Anda..."
                    value={formData.pesan}
                    onChange={(e) => setFormData({...formData, pesan: e.target.value})}
                  />
                </div>

                <Button variant="primary" size="full" onClick={handleKirimWA} className="mt-4">
                  Kirim via WhatsApp →
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
