export function TrustBar() {
  const metrics = [
    { value: '2002', label: 'Tahun Berdiri' },
    { value: '50+', label: 'Varian Produk' },
    { value: '500+', label: 'Reseller Aktif' },
    { value: '✓', label: 'Halal & BPOM' },
  ];

  return (
    <section className="bg-white py-8 md:py-12 border-b border-concrete">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-4">
              <span className="font-display font-bold text-4xl text-navy tracking-tight uppercase mb-1">
                {metric.value}
              </span>
              <span className="font-barlow font-bold text-xs text-iron uppercase tracking-widest">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
