export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      text: "Makaroninya enak, garing tahan lama. Reseller kami selalu repeat order tiap minggu! Konsistensi rasa dari MGS patut diacungi jempol.",
      author: "Budi S.",
      location: "Surabaya",
      role: "Pemilik Toko Kelontong",
    },
    {
      id: 2,
      text: "Sejak bergabung jadi agen grosir MGS, perputaran barang sangat cepat. Support dari pabrik juga responsif untuk restock.",
      author: "Ibu Siti",
      location: "Sidoarjo",
      role: "Agen Makanan Ringan",
    },
    {
      id: 3,
      text: "Basrengnya beda dari yang lain, bumbunya pas dan pedasnya mantap. Pengiriman selalu aman dan tepat waktu sampai ke toko.",
      author: "Agus T.",
      location: "Malang",
      role: "Distributor Snack",
    }
  ];

  return (
    <section className="bg-offwhite py-24 border-t border-concrete">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-navy uppercase tracking-tight">
            Dipercaya Ribuan Pelanggan
          </h2>
          <div className="w-16 h-1 bg-royal mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testi) => (
            <div key={testi.id} className="bg-white p-8 border-l-4 border-royal shadow-sm">
              <div className="text-royal text-xl mb-4 tracking-widest">★★★★★</div>
              <p className="text-iron leading-relaxed mb-8 italic">
                &quot;{testi.text}&quot;
              </p>
              <hr className="mb-6 border-concrete" />
              <div>
                <strong className="block font-display font-bold text-lg text-navy uppercase tracking-wide">
                  {testi.author} — {testi.location}
                </strong>
                <span className="text-iron text-sm font-medium">
                  {testi.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
